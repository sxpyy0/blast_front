<template>
  <div>
    <BaseLine
        ref="chart"
      :chart_name="base_name"
      :chart_height="chart_height"
      :data="{ x: x_data, y: y_data, names: name_data }"
        :markArea="false"
      class="mt-2"
      style="background: rgba(25, 25, 112, 0.7)"
    />
  </div>
</template>

<script>
// 显示某基地的所有高炉的变化趋势折线图
import BaseLine from "@/echarts/BaseLine/";
export default {
  components: {
    BaseLine,
  },
  props: {
    chart_height:{
      default:200
    },
    base_name: {
      default: "宝山基地",
    },
    granularity:{
      default:"hour"
    },
    start_time: {
      default: function () {
        return this.$moment().add(-24, "h").format("YYYY-MM-DD HH:mm:ss"); //取24小时之前的时间
      },
    },
    end_time: {
      default: function () {
        return this.$moment().format("YYYY-MM-DD HH:mm:ss");
      },
    },
  },
  mounted() {
    this.get_data();
  },
  methods: {
    get_data() {
      let url = "/api/get_index_trend_by_base/";

      // if(this.base_name!=="宝山基地"){
      //   this.raw_data = {}
      //   return;
      // }

      let start_end_time = this.get_start_end_time(this.granularity);
      let params = {
        base_name: this.base_name,
        granularity: this.granularity,
        start_time: start_end_time.start_time,
        end_time: start_end_time.end_time
      };
      this.$refs.chart.showLoading();
      this.axios.get(url,{params:params}).then((response) => {
        this.raw_data = response.data; //这里的data是map TODO
        this.$refs.chart.hideLoading();
      }).catch(error=>{
        console.log(error)
        alert(`获取${this.base_name}的${this.granularity_zh(this.granularity)}数据失败`)
        this.$refs.chart.hideLoading();
      });
    },
  },
  computed: {},
  watch: {
    granularity:function(){
      this.get_data();
    },
    end_time:function (){
      this.get_data(); //假设开始时间和结束时间一起变
    },
    raw_data: {
      immediate:true,
      deep:true,
      handler: function () {
        this.y_data = [];
        this.name_data = [];
        this.x_data = [];
        for (let key in this.raw_data) {

          if(this.raw_data[key]==null||this.raw_data[key].length===0){
            continue;
          }
          this.name_data.push(key);
          let index_value = this.raw_data[key].map((item) => {
            return item.index_value*100;
          });
        
          this.y_data.push(index_value);
          //获取第一个的时间列表
          if (this.x_data.length === 0) { //此时还没获取到x轴数据
            this.x_data = this.raw_data[key].map((item) => {
              return item.generateDate.slice(5,-3);  //把年份去掉
            });
          }
        }
      },
    },
  },
  data() {
    return {
      y_data: [],
      x_data: [],
      name_data: [],
      raw_data: {
        宝山1号高炉: [
          {
            IndexId: "",
            generateDate: "2021-02-19 15:30",
            index_value: 0,
          },
          {
            IndexId: "",
            generateDate: "2021-02-19 16:00",
            index_value: 0,
          },
        ],
        宝山2号高炉: [
          {
            IndexId: "",
            generateDate: "2021-02-19 15:30",
            index_value: 0,
          },
          {
            IndexId: "",
            generateDate: "2021-02-19 16:00",
            index_value: 0,
          },
        ],
        宝山3号高炉: [
          {
            IndexId: "",
            generateDate: "2021-02-19 15:30",
            index_value: 0,
          },
          {
            IndexId: "",
            generateDate: "2021-02-19 16:00",
            index_value: 0,
          },
        ],
        宝山4号高炉: [
          {
            IndexId: "",
            generateDate: "2021-02-19 15:30",
            index_value: 0,
          },
          {
            IndexId: "",
            generateDate: "2021-02-19 16:00",
            index_value: 0,
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>