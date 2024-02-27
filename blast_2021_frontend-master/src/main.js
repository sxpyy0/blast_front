import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack
import scroll from 'vue-seamless-scroll'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueKonva from 'vue-konva'



Vue.use(scroll,{componentName: 'vue-scroll-seamless'})
Vue.component('v-chart', ECharts)
Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'));
Vue.use(VueKonva)

Vue.config.productionTip = false

// register component to use
Vue.component('v-chart', ECharts)
import theme from "./echarts/theme.json";
ECharts.registerTheme("mytheme", theme);


import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";

import "echarts/lib/component/dataZoom";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/grid";
import "echarts/lib/component/title";
import "echarts/lib/component/graphic";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/markArea";



Vue.prototype.getRandom = function (start, end, num) {
  let res = []
  for (let i = 0; i < num; i++) {
    res.push(
      start + Math.random() * (end - start)
    );
  }
  return res;
}

Vue.prototype.get_start_time = function () {
  return Vue.moment().format("YYYY-MM-DD")+" 00:00:00"; //取当天零点的时间
  // return "2022-07-31 00:00:00"; //取当天零点的时间
}

Vue.prototype.get_end_time=function (){
  return Vue.moment().format("YYYY-MM-DD HH:mm:ss");
  // return "2021-08-01 00:00:00";
}


Vue.prototype.get_start_end_time = function(granularity){
  let start_time=Vue.moment().format("YYYY-MM-DD HH:mm:ss");
  let end_time=Vue.moment().format("YYYY-MM-DD HH:mm:ss");

  if (granularity==="ten_minutes"){
    start_time=Vue.moment().add(-12,'hour').format("YYYY-MM-DD HH:mm:ss");
  }else if(granularity==="hour"){
    start_time=Vue.moment().add(-24,'hour').format("YYYY-MM-DD HH:mm:ss");
  }else if(granularity==="class"){
    start_time=Vue.moment().add(-7,'day').format("YYYY-MM-DD HH:mm:ss");
  }else if(granularity==="day"){
    start_time=Vue.moment().add(-14,'day').format("YYYY-MM-DD HH:mm:ss");
  }else if(granularity==="week"){
    start_time=Vue.moment().add(-30,'day').format("YYYY-MM-DD HH:mm:ss");
  }
  return{
    start_time:start_time,
    end_time:end_time
  }
  // console.log(granularity);
  // return{
  //   start_time: "2021-03-13 14:10:00",
  //   end_time: "2021-03-14 07:30:00"
  // }
}

//0-1 的数字，输出为百分比
Vue.prototype.index_formatter = function(index_value){
  let is_percent = true;
  if(is_percent){
    if(typeof(index_value)==='string'){
      return parseFloat(index_value)*100;
    }else if(typeof(index_value)==='number'){
      return index_value*100;
    }
    return index_value ;
  }else{
    return index_value;
  }

}

//获取地址栏参数blastId，如果没有此参数则返回BF001
Vue.prototype.get_query_variable_blast_id = function(){
  // 从地址栏里面取blastId这个参数
  var query = window.location.href.split("?");
  if (query.length != 1){ // 如果url传入了参数
    var vars = query[1].split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if(pair[0] == "blastId"){
        return pair[1];
      }
    }
  }
  return "BF001"; // 否则均返回默认的BF001
}

//三个子页面右上角的“返回”按钮，但功能其实是关闭本页面
Vue.prototype.kill_page = function(blast_id) {
  // console.log(blast_id);
  let blast_id_zh = this.$store.state.blast_id2_zh[blast_id]
  let base_prefix = blast_id_zh.substring(0,2);
  let url = ''

  // 宝钢跳到http://10.70.17.6:9090/auto/iPlatV66-index.jsp#//auto/web/BFDP40  
  // 东山41 青山42 眉山43
  switch (base_prefix) {
    case '宝山':
      url = 'http://10.70.17.6:9090/auto/iPlatV66-index.jsp#//auto/web/BFDP40'
      break;
    case '东山':
      url = 'http://10.70.17.6:9090/auto/iPlatV66-index.jsp#//auto/web/BFDP41'
      break;
    case '青山':
      url = 'http://10.70.17.6:9090/auto/iPlatV66-index.jsp#//auto/web/BFDP42'
      break;
    case '梅山':
      url = 'http://10.70.17.6:9090/auto/iPlatV66-index.jsp#//auto/web/BFDP43'
      break;
    default:
      break;
  }
  // console.log(url);
  window.top.location.href = url
}

import router from './router'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
