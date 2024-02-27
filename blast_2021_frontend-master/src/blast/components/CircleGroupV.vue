<template>
  <div style="text-align: center">
    <span style="color: white">{{ base_name2zh[base_name] }} </span>
    <CircleGroup :circle_data="this.index_data[this.base_name]"/>
  </div>
</template>

<script>
import CircleGroup from "@/echarts/CircleGroup";

export default {
  components: {
    CircleGroup,
  },
  props: {
    base_name: {
      default: "宝山基地",
    },
    granularity: {
      default: "week"
    },

  },
  watch: {
    granularity: {
      handler() {
        this.get_data()
      },
      immediate: true,
    }
  },
  computed: {
    circle_data() {
      // if (this.base_name === "宝山基地") {
      //   return this.baoshan;
      // } else if (this.base_name === "东山基地") {
      //   return this.dongshan;
      // } else if (this.base_name === "青山基地") {
      //   return this.qingshan;
      // } else if (this.base_name === "梅山基地") {
      //   return this.meishan;
      // } else {
      //   return null;
      // }
      return this.index_data[this.base_name]
    },
  },
  methods: {
    get_blast_index_data(blast_id, granularity, list_index, base_name) {
      let url = "/api/get_latest_index";
      let params = {
        blast_id: blast_id,
        granularity: granularity
      };
      this.axios.get(url, {params: params}).then(res => {
        // console.log(res.data)
        this.index_data[base_name][list_index]['value'] = typeof(res.data.index_value) == "undefined"? 0 : res.data.index_value;
        // console.log(this.index_data[base_name][list_index])
      }).catch(err => {
        console.log(err)
        alert(`获取${blast_id},${granularity}失败`)
      })
    },
    get_baoshan_data() {
      // console.log("获取宝山数据")
      this.get_blast_index_data("BF001", this.granularity, 0, 'baoshan')
      this.get_blast_index_data("BF002", this.granularity, 1, 'baoshan')
      this.get_blast_index_data("BF003", this.granularity, 2, 'baoshan')
      this.get_blast_index_data("BF004", this.granularity, 3, 'baoshan')
    },
    get_data() {
      if (this.base_name === "baoshan") {
        this.get_baoshan_data();
      }
    }
  },
  data() {
    return {
      base_name2zh:{
        baoshan:"宝山基地",
        meishan:"梅山基地",
        qingshan:"青山基地",
        dongshan:"东山基地"
      },
      index_data: {
        dongshan: [
          {
            name: "1#",
            value: 0.85,
          },
          {
            name: "2#",
            value: 0.75,
          },
          {
            name: "3#",
            value: 0.5,
          },
        ],
        meishan: [
          {
            name: "2#",
            value: 0.85,
          },
          {
            name: "4#",
            value: 0.75,
          },
          {
            name: "5#",
            value: 0.5,
          },
        ],
        baoshan: [
          {
            name: "1#",
            value: 0,
          },
          {
            name: "2#",
            value: 0.75,
          },
          {
            name: "3#",
            value: 0.5,
          },
          {
            name: "4#",
            value: 0.2,
          },
        ],
        qingshan: [
          {
            name: "4#",
            value: 0.85,
          },
          {
            name: "5#",
            value: 0.75,
          },
          {
            name: "6#",
            value: 0.5,
          },
          {
            name: "7#",
            value: 0.2,
          },
          {
            name: "8#",
            value: 0.9,
          },
        ],
      },

    };
  },
};
</script>

<style>
</style>