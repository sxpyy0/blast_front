<template>
  <div>
    <v-chart
      ref="line_chart"
      :options="line_chart"
      theme="mytheme"
      :style="{ height: chart_height + 'px' }"
      :autoresize="true"
      :manual-update="true"
    />
  </div>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
/**
 * 传入的data是一个对象，里面有x和y属性，x是x轴的list，y是一个list，里面每一个都是一个list，
 */
export default {
  // watch:{
  //   line_chart(old_val,new_val){
  //     console.log("新旧对象是否相同")
  //     console.log(old_val===new_val);
  //   }
  // },
  props: {
    chart_name: {
      default: "默认折线图",
    },
    data_name: {
      default: "",
    },
    unit_name: {
      default: "",
    },
    md_size: {
      default: function () {
        return 4;
      },
    },
    chart_height: {
      default: function () {
        return 200;
      },
    },
    zero2one: {
      default: true, //是否只显示0到1
    },
    markLine: {
      default: true,
    },
    markArea: {
      default: true,
    },
    data: {
      default: function () {
        return {
          x: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],
          y: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],

            // [0.6, 0.7, 0.8, 0.78, 0.85, 0.89, 0.98],
            // [0.7, 0.67, 0.85, 0.78, 0.78, 0.85, 0.95],
            // [0.76, 0.81, 0.83, 0.824, 0.873, 0.88, 0.87],
            // [0.6, 0.7, 0.73, 0.68, 0.8, 0.78, 0.72],
          ],
          names: ["A", "B", "C", "D"],
          // watched_data:[this.no_data_graphic,this.series_data,this.data.x,this.data.y,this.data.names],
        };
      },
    },
  },
  methods: {
    showLoading() {
      this.$refs.line_chart.showLoading({
        text: "加载中…",
        color: "#0f34f5",
        maskColor: "rgba(1, 1, 1, 0.4)",
        textColor: "#fff",
        fontSize: "20px",
      });
    },
    hideLoading() {
      this.$refs.line_chart.hideLoading();
    },
  },
  computed: {
    no_data_graphic: function () {
      if (
        this.data == null ||
        this.data.x == null ||
        this.data.x.length === 0
      ) {
        return this.graphic_config;
      } else {
        return [];
      }
    },
    series_data: function () {
      return this.data.y.map((cur, index) => {
        return {
          data: cur.map((value) => {
            return parseFloat(value.toFixed(2));
          }),
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          name: this.data.names[index],
          markArea: this.markArea ? this.markArea_config : null,
          markLine: this.markLine
            ? {
                // silent: true,
                symbol: ["none", "none"],
                lineStyle: {
                  color: "orange",
                },
                data: [{ yAxis: 0.6 * 100 }],
              }
            : null,
        };
      });
    },
    line_chart: function () {
      let option = {
        title: {
          text: this.chart_name,
          left: "center",
          show: true,
          textStyle: {
            color: "lightgray",
            fontSize: 21,
            fontWeight: "normal",
          },
        },
        color: ["#3fb1e3", "#6be6c1", "#d87a80", "#a0a7e6"],
        grid: {
          left: "40px",
          right: "30px",
          top: "28px",
          bottom: "20px",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        toolbox: {
          show: false,
          feature: {
            magicType: {
              type: ["line", "bar"],
            },
          },
        },
        xAxis: {
          splitLine: {
            show: false,
          },
          type: "category",
          data: this.data.x,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c3dbff", //更改坐标轴文字颜色
              fontSize: 15, //更改坐标轴文字大小
            },
          },
          axisLine: {
            lineStyle: {
              // color: "#0087ED",
              width: 1,
            },
          }, //这里是为了突出显示加上的
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
            },
          },
          axisLabel: {
            formatter: "{value}" + this.unit_name, //y轴数据单位
            show: true,
            textStyle: {
              color: "#c3dbff", //更改坐标轴文字颜色
              fontSize: 15, //更改坐标轴文字大小
            },
          },
        },
        legend: {
          data: [this.data_name],
        },
        series: this.series_data,
        graphic: this.no_data_graphic,
      };

      if (this.zero2one) {
        option["yAxis"]["max"] = 100;
        option["yAxis"]["min"] = 0;
      }

      if (this.$refs.line_chart) {
        this.$refs.line_chart.clear();
        this.$refs.line_chart.mergeOptions(option, true);
        // console.log("update")
      }
      return option;
    },
  },
  data() {
    return {
      markArea_config: {
        data: [
          //深黄（0-0.35）rgba(255,215,0,0.7) ,3：浅黄（0.35-0.6）  "rgba(240,230,140,0.7)",
          // 4：浅绿（0.6-0.8） rgba(	144,238,144,0.7) ,5：绿色（0.8以上） rgba(	50,205,50,0.7)
          [
            {
              yAxis: 0,
              itemStyle: {
                // color: "rgba(255,215,0,0.7)",
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(240,230,140,0.7)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(255,215,0,0.7)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            {
              yAxis: 0.35,
            },
          ],
          [
            {
              yAxis: 0.35,
              itemStyle: {
                // color: "rgba(240,230,140,0.7)",
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(255,250,205,0.7)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(240,230,140,0.7)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            {
              yAxis: 0.6 * 100,
            },
          ],
          [
            {
              yAxis: 0.6 * 100,
              itemStyle: {
                // color: "rgba(	144,238,144,0.7)",
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(	144,238,144,0.7)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(	255,250,205,0.7)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            {
              yAxis: 0.8 * 100,
            },
          ],
          [
            {
              yAxis: 0.8 * 100,
              itemStyle: {
                // color: "rgba(	50,205,50,0.7)",
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(	50,205,50,0.7)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(	144,238,144,0.7)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            {
              yAxis: 1 * 100,
            },
          ],
        ],
      },
      graphic_config: [
        {
          type: "group",
          invisible: true,
          bounding: "raw",
          left: "center",
          top: "center",
          z: 100,
          children: [
            {
              type: "rect",
              left: "center",
              top: "center",
              z: 100,
              shape: {
                width: 200,
                height: 50,
              },
              style: {
                fill: "rgba(255,255,255,0.5)",
              },
            },
            {
              type: "text",
              left: "center",
              top: "center",
              z: 100,
              style: {
                fill: "#f8f8f8",
                text: "暂无数据",
                font: "bold 20px sans-serif",
              },
            },
          ],
        },
      ],
    };
  },
};
</script>
