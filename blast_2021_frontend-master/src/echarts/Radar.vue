<template>
  <v-chart
    ref="radarchart"
    :options="radar_option"
    theme="mytheme"
    :style="{ height: chart_height + 'px' }"
    :autoresize="true"
  ></v-chart>
</template>

<script>
import "echarts/lib/chart/radar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

//在模拟的默认变量上写完了，还没写数据获取的 TODO
export default {
  props: {
    blast_id: {
      default: function () {
        return "BF004";
      },
    },
    chart_height: {
      default: function () {
        return 400;
      },
    },
    radius: {
      default: 50,
    },
  },
  mounted() {
    this.get_all_data();
  },
  watch: {
    blast_id() {
      this.get_all_data();
    },
  },
  methods: {
    get_data(blast_id, granularity, call_back) {
      let url = "/api/get_all_subIndex";
      let params = {
        blast_id: blast_id,
        granularity: granularity,
      };
      this.axios.get(url, { params: params }).then((response) => {
        call_back(response);
      });
    },
    get_all_data() {
      this.get_data(this.blast_id, "ten_minutes", (response) => {
        this.ten_minutes_data_raw = response.data;
      });
      this.get_data(this.blast_id, "hour", (response) => {
        this.hour_data_raw = response.data;
      });
      this.get_data(this.blast_id, "class", (response) => {
        this.class_data_raw = response.data;
      });
      this.get_data(this.blast_id, "day", (response) => {
        this.day_data_raw = response.data;
      });
      this.get_data(this.blast_id, "week", (response) => {
        this.week_data_raw = response.data;
      });
    },
    processData(name, raw_data) {
      let indicator = [];
      let value = [];
      let key_list = [
        "下料稳定性",
        "压量关系稳定性",
        "炉缸工况稳定性",
        "操作炉型稳定性",
        "煤气流分布稳定性",
      ]; //确保都是按照这个顺序的
      key_list.forEach((key) => {
        // console.log(key)
        // console.log(raw_data)
        // console.log(value)
        indicator.push({ text: key.replace("稳定性", ""), max: 1 * 100 });
        value.push(
          raw_data[key] != null
            ? raw_data[key]["subIndexValue"].toFixed(2) * 100
            : "暂无"
        );
      });

      return {
        indicator: indicator,
        name: name.replace("稳定性", ""),
        value: value,
      };
    },
  },
  data() {
    return {
      splitArea: {
        areaStyle: {
          color: ["RGB(18,21,97)", "RGB(18,21,97)", "RGB(18,21,97)"],
        },
      },
      axisLine: {
        lineStyle: {
          color: "gray",
        },
      },
      splitLine: {
        lineStyle: {
          color: "gray",
          // type:'dash'
        },
      },
      ten_minutes_data_raw: {
        下料稳定性: { subIndexValue: 0.8 },
        压量关系稳定性: { subIndexValue: 0.8 },
        炉缸工况稳定性: { subIndexValue: 0.8 },
        操作炉型稳定性: { subIndexValue: 0.8 },
        煤气流分布稳定性: { subIndexValue: 0.8 },
      },
      hour_data_raw: {
        下料稳定性: { subIndexValue: 0.76 },
        压量关系稳定性: { subIndexValue: 0.76 },
        炉缸工况稳定性: { subIndexValue: 0.76 },
        操作炉型稳定性: { subIndexValue: 0.76 },
        煤气流分布稳定性: { subIndexValue: 0.76 },
      },
      class_data_raw: {
        下料稳定性: { subIndexValue: 0.94 },
        压量关系稳定性: { subIndexValue: 0.94 },
        炉缸工况稳定性: { subIndexValue: 0.94 },
        操作炉型稳定性: { subIndexValue: 0.94 },
        煤气流分布稳定性: { subIndexValue: 0.94 },
      },
      day_data_raw: {
        下料稳定性: { subIndexValue: 0.89 },
        压量关系稳定性: { subIndexValue: 0.89 },
        炉缸工况稳定性: { subIndexValue: 0.89 },
        操作炉型稳定性: { subIndexValue: 0.89 },
        煤气流分布稳定性: { subIndexValue: 0.89 },
      },
      week_data_raw: {
        下料稳定性: { subIndexValue: 0.65 },
        压量关系稳定性: { subIndexValue: 0.65 },
        炉缸工况稳定性: { subIndexValue: 0.65 },
        操作炉型稳定性: { subIndexValue: 0.65 },
        煤气流分布稳定性: { subIndexValue: 0.65 },
      },
    };
  },
  computed: {
    ten_minutes_data() {
      return this.processData("十分钟级", this.ten_minutes_data_raw);
    },
    hour_data() {
      return this.processData("小时级", this.hour_data_raw);
    },
    class_data() {
      return this.processData("班次级", this.class_data_raw);
    },
    day_data() {
      return this.processData("天均", this.day_data_raw);
    },
    week_data() {
      return this.processData("周均", this.week_data_raw);
    },
    series: function () {
      let res = [];
      let blast_data = [
        this.ten_minutes_data,
        this.hour_data,
        this.class_data,
        this.day_data,
        this.week_data,
      ];
      blast_data.forEach((element) => {
        res.push({
          type: "radar",
          // radarIndex: index,
          radarIndex: 0,

          tooltip: {
            trigger: "item",
          },
          areaStyle: {},
          data: [
            {
              value: element["value"], //数值，需要与indicator对应
              name: element["name"], // 当前时间粒度
            },
          ],
        });
      });
      return res;
    },
    radar_option: function () {
      return {
        title: {
          text: "多雷达图",
          show: false,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "center",
          data: ["十分钟级", "小时级", "班次级", "天均", "周均"],
          selected: {
            十分钟级: false,
            小时级: true,
            班次级: false,
            天均: false,
            周均: false,
          },
          textStyle: { fontSize: 20 },
        },
        radar: [
          // { //十分钟
          //   splitNumber: 3,
          //   indicator: this.ten_minutes_data.indicator,
          //   center: ["20%", "20%"],
          //   radius: this.radius,
          //   name: {
          //     textStyle: {
          //       color: "RGB(46,199,201)",
          //     },
          //     show:false //不显示文字
          //   },
          //   splitArea: this.splitArea,
          //
          // },
          {
            //小时
            splitNumber: 3,
            indicator: this.hour_data.indicator,
            radius: this.radius + 100,
            center: ["50%", "55%"],
            name: {
              textStyle: {
                color: "#aaaaaa",
                fontSize: 18,
                // color: "RGB(216,122,128)",
              },
            },
            axisLine: this.axisLine,
            splitLine: this.splitLine,
            splitArea: this.splitArea,
          },
          // {
          //   splitNumber: 3,
          //   indicator: this.class_data.indicator,
          //   center: ["80%", "20%"],
          //   radius: this.radius,
          //   name: {
          //     textStyle: {
          //       color: "RGB(151,181,82)",
          //     },
          //     show:false //不显示文字
          //
          //   },
          //   splitArea: this.splitArea,
          //   axisLine: this.axisLine,
          //   splitLine: this.splitLine,
          // },
          // {
          //   splitNumber: 3,
          //   indicator: this.day_data.indicator,
          //   radius: this.radius,
          //   center: ["20%", "85%"],
          //   name: {
          //     textStyle: {
          //       color: "RGB(255,185,128)",
          //     },
          //     show:false //不显示文字
          //   },
          //   splitArea: this.splitArea,
          //   axisLine: this.axisLine,
          //   splitLine: this.splitLine,
          // },

          // {
          //   splitNumber: 3,
          //   indicator: this.week_data.indicator,
          //   center: ["80%", "85%"],
          //   radius: this.radius,
          //   name: {
          //     textStyle: {
          //       color: "RGB(182,162,222)",
          //     },
          //     show:false //不显示文字
          //   },
          //   splitArea: this.splitArea,
          //   axisLine: this.axisLine,
          //   splitLine: this.splitLine,
          // },
        ],
        series: this.series,
      };
    },
  },
};
</script>

<style></style>
