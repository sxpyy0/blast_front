<template>
  <div>
    <p class="light_text" style="text-align: center; font-size: 30px">
      总体稳定性指数值:
      <span :style="{ color: value2color(index_data) }">{{
        this.index_formatter(index_data).toFixed(0)
      }}</span>
    </p>
    <BlastImg
      :text="this.sub_index_data"
      :text_color="color_data"
      :container_width="container_width"
    />
  </div>
</template>

<script>
import BlastImg from "@/blast/components/BlastImg";
export default {
  name: "BlastImgV",
  components: {
    BlastImg,
  },
  props: {
    container_width: {
      default: 400,
    },
    blast_id: {
      default: "BF004",
    },
    granularity: {
      default: "ten_minutes",
    },
  },
  watch: {
    blast_id() {
      this.get_data();
    },
    granularity() {
      this.get_data();
    },
  },
  mounted() {
    this.get_data();
  },
  methods: {
    get_data() {
      this.get_index_data();
      this.get_sub_index_data();
    },
    get_index_data() {
      let url = "/api/get_latest_index";
      let params = {
        blast_id: this.blast_id,
        granularity: this.granularity,
      };
      this.axios
        .get(url, { params: params })
        .then((response) => {
          if (response.data == "") {
            return;
          } else {
            this.index_raw = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("获取总体稳定性指数信息失败");
        });
    },
    get_sub_index_data() {
      let url = "/api/get_all_subIndex";
      let params = {
        blast_id: this.blast_id,
        granularity: this.granularity,
      };
      this.axios
        .get(url, { params: params })
        .then((response) => {
          for (const key in response.data) {
            if (Object.hasOwnProperty.call(response.data, key)) {
              const element = response.data[key];
              if (element != null) {
                this.sub_index_raw[key] = element;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          alert("获取子指数信息失败");
        });
    },
    value2color(value) {
      let blue = "#01cce2";
      let yellow = "#f8f406";
      let orange = "#fd6605";
      let red = "#fc0505";

      return value < 0.35
        ? red
        : value < 0.6
        ? orange
        : value < 0.8
        ? yellow
        : blue;
      /**
       * 深黄（0-0.35）,3：浅黄（0.35-0.6）,4：浅绿（0.6-0.8）,5：绿色（0.8以上）
       */
    },
  },
  computed: {
    color_data() {
      return this.sub_index_data.map(this.value2color);
    },
    index_data() {
      return this.index_raw.index_value.toFixed(2);
    },
    sub_index_data() {
      return [
        this.sub_index_raw["煤气流分布稳定性"].subIndexValue,
        this.sub_index_raw["下料稳定性"].subIndexValue,
        this.sub_index_raw["操作炉型稳定性"].subIndexValue,
        this.sub_index_raw["压量关系稳定性"].subIndexValue,
        this.sub_index_raw["炉缸工况稳定性"].subIndexValue,
      ]
        .map(this.index_formatter)
        .map((value) => Math.round(value).toFixed(0));
    },
  },
  data() {
    return {
      index_raw: {
        IndexID: "indexid",
        generateDate: "2021-02-24 15:30",
        index_value: 0.8,
      },
      sub_index_raw: {
        下料稳定性: { subIndexValue: 0.8 },
        压量关系稳定性: { subIndexValue: 0.8 },
        炉缸工况稳定性: { subIndexValue: 0.8 },
        操作炉型稳定性: { subIndexValue: 0.8 },
        煤气流分布稳定性: { subIndexValue: 0.8 },
      },
    };
  },
};
</script>

<style scoped></style>
