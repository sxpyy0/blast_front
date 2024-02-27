<template>
  <div>
    <YBar :index_data="index_data" ref="chart"  :chart_height="chart_height" :chart_width="chart_width"/>
    <!-- <a @click="get_data"> 获取</a> -->
  </div>
</template>

<script>
import YBar from "@/echarts/YBar";
export default {
  components: {
    YBar,
  },
  props:{
    granularity:{
      default(){
        return "class"
      }
    },
    chart_height:{
      default:500
    },
    chart_width:{
      default:400
    }
  },
  computed: {
    index_data() {
      let res = [];
      for (let key in this.raw_data) {
        let data = {};
        data["name"]= key;
        let value = this.raw_data[key];
        if (value != null) {
          data["value"]= parseFloat((value.index_value).toFixed(2))*100;  //TODO  这转成了0-100
          data["value"]= parseFloat((data["value"]).toFixed(0)); // 把转为0-100的值再去掉小数点
        }else {
           data["value"] = 0;
          }
        // console.log(data)
        res.push(data);
      }
      return res;
    },
  },

  methods: {
    get_data() {
      this.$refs.chart.showLoading()
      let url = "/api/get_all_blast_latest_index";
      let params={granularity: this.granularity};
      // console.log("开始获取");
      this.axios.get(url,{params:params}).then((response) => {
        // console.log(response.data);
        this.raw_data = response.data;
        this.$refs.chart.hideLoading()
      }).catch(error=>{
        console.log(error)
        alert("获取各高炉总体稳定性出错")
        this.$refs.chart.hideLoading()
      });
    },
  },
  watch:{
    granularity(){
      this.get_data();
    },
    // chart_height(){
    //   console.log("中间层 change")
    //   console.log(this.chart_height)
    // }
  },
  data() {
    return {
      raw_data: [],
    };
  },
  mounted() {
    this.get_data();
  },
};
</script>

<style>
</style>