<template>
  <!-- 获取并显示某高炉，某时间粒度下的所有子指数信息 -->
  <div>
    <div v-for="(value, name, index) in sub_index_data" :key="index">
      <BaseLine
        :chart_name="name"
        :ref="name + '_chart'"
        :chart_height="chart_height"
        :data="{ x: x_data, y: [value], names: [name] }"
        class="mt-2"
        style="background: rgba(25, 25, 112, 0.7)"
        :markArea="false"
      />
    </div>
  </div>
</template>

<script>
import BaseLine from "@/echarts/BaseLine";

export default {
  components: {
    BaseLine,
  },
  props: {
    blast_id: {
      default: "BF004",
    },
    chart_height: {
      default: 170,
    },
    granularity: {
      default: "ten_minutes",
    },
    start_time: {
      default: function () {
        return this.$moment().add(-24, "d").format("YYYY-MM-DD HH:mm:ss");
      },
    },
    end_time: {
      default: function () {
        return this.$moment().format("YYYY-MM-DD HH:mm:ss");
      },
    },
  },
  methods: {
    get_data() {
      let url = "/api/get_all_subIndex_trend";
      this.showLoadingAll();
      let start_end_time = this.get_start_end_time(this.granularity);
      let params = {
        blast_id: this.blast_id,
        granularity: this.granularity,
        start_time: start_end_time.start_time,
        end_time: start_end_time.end_time,
      };

      // console.log(params)
      this.axios
        .get(url, { params: params })
        .then((response) => {
          this.raw_data = response.data;
          this.hideLoadingAll();
        })
        .catch((error) => {
          console.log(error);
          alert("获取所有子指数的趋势失败");
          this.hideLoadingAll();
        });
    },
    showLoadingAll() {
      for (let key in this.$refs) {
        this.$refs[key][0].showLoading();
      }
    },
    hideLoadingAll() {
      // console.log(this.$refs)
      for (let key in this.$refs) {
        this.$refs[key][0].hideLoading();
      }
    },
  },
  watch: {
    params: {
      deep: true,
      handler: function () {
        this.get_data();
      },
    },
  },
  mounted() {
    this.get_data();
  },
  computed: {
    params() {
      return {
        blast_id: this.blast_id,
        granularity: this.granularity,
      };
    },
    sub_index_data() {
      let data = {};
      for (let key in this.raw_data) {
        data[key] = this.raw_data[key].map((item) => {
          return item.subIndexValue * 100;
        });
      }

      // 保证顺序
      let data_sorted = {};
      data_sorted = {
        下料稳定性: data["下料稳定性"],
        压量关系稳定性: data["压量关系稳定性"],
        炉缸工况稳定性: data["炉缸工况稳定性"],
        操作炉型稳定性: data["操作炉型稳定性"],
        煤气流分布稳定性: data["煤气流分布稳定性"],
      };
      return data_sorted;
    },

    x_data() {
      // 获取当前时间的时间戳
      let currentTime = new Date().getTime(); //获取x轴的时间

      let data = [];
      for (let key in this.raw_data) {
        data = this.raw_data[key].map((item) => {
          // 将时间字符串转换为时间戳
          let itemTime = new Date(item.generateTime).getTime(); // 计算时间差（以分钟为单位）
          let timeDiff = (currentTime - itemTime) / (1000 * 60); // 如果时间差大于 8 分钟，则保留该时间点，否则返回空字符串
          return timeDiff > 8 ? item.generateTime.slice(5, -3) : "";
        });
        break;
      }
      return data.filter((time) => time !== ""); // 去除空字符串;
    },
  },

  data: function () {
    return {
      raw_data: {
        下料稳定性: [
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:10",
          },
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:20",
          },
        ],
        压量关系稳定性: [
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:10",
          },
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:20",
          },
        ],
        炉缸工况稳定性: [
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:10",
          },
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:20",
          },
        ],
        操作炉型稳定性: [
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:10",
          },
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:20",
          },
        ],
        煤气流分布稳定性: [
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:10",
          },
          {
            subIndexId: "",
            subIndexValue: 0,
            generateTime: "9:20",
          },
        ],
      },
      subIndexNames_: [
        "下料稳定性",
        "压量关系稳定性",
        "炉缸工况稳定性",
        "操作炉型稳定性",
        "煤气流分布稳定性",
      ],
      x_data_: ["9:00", "9:10", "9:20", "9:30", "9:40", "9:50", "10:00"],
      subIndexDataList_: [
        [this.getRandom(0.75, 0.95, 7)],
        [this.getRandom(0.75, 0.95, 7)],
        [this.getRandom(0.75, 0.9, 7)],
        [this.getRandom(0.75, 0.9, 7)],
        [this.getRandom(0.75, 0.9, 7)],
      ],
    };
  },
};
</script>

<style></style>
