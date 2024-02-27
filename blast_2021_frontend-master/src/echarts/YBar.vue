<template>
  <div>
    <v-chart ref="bar_chart" :options="bar_y_category_option" :style="{height:`${this.chart_height}px`}"/>
  </div>
</template>

<script>
import "echarts/lib/chart/bar";

export default {
  props: {
    chart_height:{
      default: 850
    },
    chart_width:{
      default: 500
    },
    index_data: { //这里要求没有空值
      default: function () {
        return [
          {name: "宝山#1高炉", value: 0.81},
          {name: "宝山#2高炉", value: 0.86},
          {name: "宝山#3高炉", value: 0.74},
          {name: "宝山#4高炉", value: 0.73},
          {name: "青山#4高炉", value: 0.73},
          {name: "青山#5高炉", value: 0.84},
          {name: "青山#6高炉", value: 0.77},
          {name: "青山#7高炉", value: 0.89},
          {name: "青山#8高炉", value: 0.73},
          {name: "东山#1高炉", value: 0.91},
          {name: "东山#2高炉", value: 0.82},
          {name: "东山#3高炉", value: 0.88},
          {name: "梅山#2高炉", value: 0.77},
          {name: "梅山#4高炉", value: 0.94},
          {name: "梅山#5高炉", value: 0},
        ];
      },
    },
  },
  watch: {
    chart_height(){
      this.$refs.bar_chart.resize({height:this.chart_height});
    }
  },
  mounted(){
    this.$refs.bar_chart.resize({height:this.chart_height});
  },
  methods: {
    get_bar_color(params) {
      let value=params.value;
      let blue = "#01cce2";
      let yellow = "#f8f406";
      let orange = "#fd6605";
      let red = "#fc0505";

      return value < 0.35 ? red :
          value <0.6 ? orange :
              value <0.8? yellow: blue
      /**
       * 深黄（0-0.35）,3：浅黄（0.35-0.6）,4：浅绿（0.6-0.8）,5：绿色（0.8以上）
       */
    },
    showLoading() {
      this.$refs.bar_chart.showLoading({
        text: '加载中…',
        color: '#0f34f5',
        maskColor: 'rgba(1, 1, 1, 0.4)',
        textColor: '#fff',
        fontSize: '20px'
      });
    },
    hideLoading() {
      this.$refs.bar_chart.hideLoading();
    }
  },
  computed: {
    line_height(){
      return this.chart_height/15;
    },
    sorted_data: function () {
      let tmp = JSON.parse(JSON.stringify(this.index_data));
      tmp.sort(function (a, b) {
        return b.value - a.value;
      });
      return tmp;
    },
    value_data: function () {
      return this.sorted_data.map((data) => data.value);
    },
    label_data: function () {
      return this.sorted_data.map((data) => data.name);
    },
    //将空值转换为0
    value_data_show: function () {
      return this.value_data.map((data) => {
        if (data === 0) {
          return "暂无数据";
        } else {
          return data;
        }
      });
    },
    back_ground_bar_value: function () {
      let len = this.index_data.length;
      let vals = [];
      for (let i = 0; i < len; i++) {
        vals.push(1);
      }
      return vals;
    },
    rank_label_value: function () {
      let len = this.index_data.length;
      let vals = [];
      for (let i = 0; i < len; i++) {
        vals.push(1 + i);
      }
      return vals;
    },
    bar_y_category_option: function () {
      return {
        color: "#17f054",
        // title: {
        //   text: "",
        //   show: false,
        //   // subtext: "数据来自网络",
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            let res = "";
            // console.log(params);
            params.forEach((element) => {
              if (element.seriesName === "稳定性指数") {
                res += "稳定性指数: " + element.value;
              }
            });
            return res;
          },
        },
        grid: {
          left: "-15%",
          right: "0%",
          width: "100%",
          // height: "150%",
          bottom: "0%",
          top: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          // boundaryGap: [0, 0.01],
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            // show: false,
          },
          axisLine: {
            // show: false,
          },
        },
        yAxis: [
          //左边的圆点
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisPointer: {
              label: {
                show: true,
                //margin: 30
              },
            },
            padding: [5, 0, 0, 0],
            position: "left",
            data: this.rank_label_value,
            axisLabel: {
              margin: 30,
              fontSize: this.xAxisFontSize,
              align: "left",
              padding: [2, 0, 0, 0],
              color: "#000",
              rich: {
                nt1: {
                  color: "#fff",
                  backgroundColor: "#EB3B5A",
                  width: this.xAxisFontSize,
                  height: this.xAxisFontSize,
                  fontSize: this.xAxisFontSize,
                  align: "center",
                  borderRadius: 100,
                  lineHeight: "5",
                  padding: [0, 1, 2, 1],
                  // padding:[0,0,2,0],
                },
                nt2: {
                  color: "#fff",
                  backgroundColor: "#FA8231",
                  width: this.xAxisFontSize,
                  height: this.xAxisFontSize,
                  fontSize: this.xAxisFontSize,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                },
                nt3: {
                  color: "#fff",
                  backgroundColor: "#F7B731",
                  width: this.xAxisFontSize,
                  height: this.xAxisFontSize,
                  fontSize: this.xAxisFontSize,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                },
                nt: {
                  color: "#fff",
                  backgroundColor: "#3860FC",
                  width: this.xAxisFontSize,
                  height: this.xAxisFontSize,
                  fontSize: this.xAxisFontSize,
                  align: "center",
                  lineHeight: 3,
                  borderRadius: 100,
                  padding: [0, 1, 2, 1],
                },
              },
              formatter: function (value, index) {
                // index = contains(attaName, value) + 1;
                index = index + 1;
                // console.log(value, index);
                if (index < 3) {
                  return ["{nt" + index + "|" + index + "}"].join("\n");
                } else {
                  return ["{nt|" + index + "}"].join("\n");
                }
              },
            },
          },
          //上面的文字
          {
            type: "category",
            offset: -8,
            position: "left",

            axisLine: {
              show: false,
            },
            inverse: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: ["#fff"],
              align: "left",
              verticalAlign: "bottom",
              lineHeight:this.line_height*0.8,
              fontSize: this.xAxisFontSize,
            },
            data: this.label_data,
          },
          {
            //右边的文字
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: this.xAxisFontSize,
              },
            },
            data: this.value_data_show,
          },
        ],
        series: [
          {
            zlevel: 1,
            barWidth: this.line_height*0.4,
            barCategoryGap:'100%',
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                // color:this.get_bar_color
              },
            },
            label: {
              show: true,
              fontSize: this.xAxisFontSize*0.8,
              color: "#fff",
              textBorderWidth: 2,
              padding: [2, 0, 0, 0],
            },
            align: "center",
            name: "稳定性指数",
            type: "bar",
            data: this.value_data,
          },
          { //背景颜色
            name: "",
            type: "bar",
            barWidth: this.line_height*0.4,
            barGap: "-100%",
            barCategoryGap:'100%',

            margin: "20",
            data: this.back_ground_bar_value,
            textStyle: {
              //图例文字的样式
              fontSize: this.xAxisFontSize,
              color: "#fff",
            },
            itemStyle: {
              normal: {
                color: "#05325F",
                //width:"100%",
                fontSize: this.xAxisFontSize,
                barBorderRadius: 30,
              },
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      xAxisFontSize: 20,
    };
  },
};
</script>

<style>
</style>