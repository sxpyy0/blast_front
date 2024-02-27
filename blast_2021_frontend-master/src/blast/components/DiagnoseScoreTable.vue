<template>
  <div >
    <b-table :busy="isBusy" dark table-variant="transparent" :fields="fields" :items="items" style="font-size:20px;color: lightgray">
      <template #table-busy>
        <div class="text-center text-info my-1">
          <b-spinner small class="align-middle"></b-spinner>
          <strong>加载中</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    blast_id: {
      default: "BF004"
    }
  },
  watch: {
    blast_id() {
      this.get_data();
    }
  },
  mounted() {
    this.get_data()
  },
  methods: {
    get_data() {
      let url = "/api/get_all_granularity_index";
      let params = {blast_id: this.blast_id};
      this.isBusy = true;
      this.axios.get(url, {params: params}).then((response) => {
        this.raw_data = response.data;
        this.isBusy = false;
      }).catch(error => {
        console.log(error)
        alert("获取所有时间粒度指数失败")
        this.isBusy = false;
        this.raw_data = {
          "ten_minutes": {index_value: "获取失败"},
          "hour": {index_value: "获取失败"},
          "class": {index_value: "获取失败"},
          "day": {index_value: "获取失败"},
          "week": {index_value: "获取失败"}
        }
      })
    },
    data_formatter(value){
      if (isNaN(value) == false) {
        return (value.toFixed(2)*100).toFixed(0)
      }
      else{
        return value;
      }
    }
  },
  computed: {
    items() {
      return [
        {
          ten_minute_value: this.raw_data['ten_minutes'] ? this.raw_data['ten_minutes']['index_value'] : "暂无",
          hour_value: this.raw_data['hour'] ? this.raw_data['hour']['index_value'] : "暂无",
          class_value: this.raw_data['class'] ? this.raw_data['class']['index_value'] : "暂无",
          day_value: this.raw_data['day'] ? this.raw_data['day']['index_value'] : "暂无",
          week_value: this.raw_data['week'] ? this.raw_data['week']['index_value'] : "暂无"
        }
      ]
    }
  },
  data() {
    return {
      isBusy: false,
      raw_data: {
        "ten_minutes": {index_value: 0},
        "hour": {index_value: 0},
        "class": {index_value: 0},
        "day": {index_value: 0},
        "week": {index_value: 0}
      },
      fields: [
        {key: "ten_minute_value", label: "十分钟" ,formatter:this.data_formatter},
        {key: "hour_value", label: "小时",formatter:this.data_formatter},
        {key: "class_value", label: "班次",formatter:this.data_formatter},
        {key: "day_value", label: "日均",formatter:this.data_formatter},
        {key: "week_value", label: "周均",formatter:this.data_formatter},
      ],
    };
  },
};
</script>

<style>
</style>