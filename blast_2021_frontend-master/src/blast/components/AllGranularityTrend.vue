<template>

    <div>
      <BaseLine
          chart_name="十分钟"
          ref='ten_minutes_chart'
          :chart_height=height
          :data="{x:index_data['ten_minutes']['x_data'],
          y:[index_data['ten_minutes']['y_data']],
          names:['十分钟']}"
          class="mt-2"
          style="background: rgba(25, 25, 112, 0.7)"
          :markArea="false"
      />
      <BaseLine
          chart_name="小时"
          ref='hour_chart'
          :chart_height=height
          :data="{x:index_data['hour']['x_data'],
          y:[index_data['hour']['y_data']],
          names:['小时']}"
          class="mt-2"
          :markArea="false"
          style="background: rgba(25, 25, 112, 0.7)"
      />
     <BaseLine
         chart_name="班次"
         ref='class_chart'
        :chart_height=height
         :data="{x:index_data['class']['x_data'],
         y:[index_data['class']['y_data']],
         names:['班次']}"
         class="mt-2"
         :markArea="false"
         style="background: rgba(25, 25, 112, 0.7)"
     />

      <BaseLine
          chart_name="天均"
          ref='day_chart'
          :chart_height=height
          :data="{x:index_data['day']['x_data'],
          y:[index_data['day']['y_data']],
          names:['天均']}"
          class="mt-2"
          :markArea="false"
          style="background: rgba(25, 25, 112, 0.7)"
      />
     <BaseLine
         chart_name="周均"
         ref='week_chart'
        :chart_height=height
         :data="{x:index_data['week']['x_data'],
         y:[index_data['week']['y_data']],
         names:['周均']}"
         class="mt-2"
         :markArea="false"
         style="background: rgba(25, 25, 112, 0.7)"
     />
    </div>

</template>

<script>
import BaseLine from "@/echarts/BaseLine";

export default {
  components: {
    BaseLine
  },
  props: {
    height:{
      default: "150",
    },
    blast_id: {
      default() {
        return "BF004"
      }
    },
    start_time: {
      default: function () {
        return this.$moment().add(-48, "h").format("YYYY-MM-DD HH:mm:ss"); //取24小时之前的时间
      },
    },
    end_time: {
      default: function () {
        return this.$moment().format("YYYY-MM-DD HH:mm:ss");
      },
    }
  },
  watch: {
    blast_id() {
      this.get_data()
    },
    end_time() {
      this.get_data()
    }
  },
  mounted() {
    this.get_data()
  },
  computed: {
    index_data() {
      let res = {};
      for (let key in this.raw_data) {
        res[key] = {}
        res[key]['x_data'] = []
        res[key]['y_data'] = []
        this.raw_data[key].forEach(data => {
          res[key]['x_data'].push(data.generateDate.slice(5,-3));  //去掉 年份 和 秒
          res[key]['y_data'].push(data.index_value*100); // 后端数据×100再呈现
        })
      }
      return res;
    }
  },
  methods: {
    showLoadingAll() {
      // console.log(this.$refs)
      this.$refs.ten_minutes_chart.showLoading();  //可能是由于在v-for中，这里的refs是list
      this.$refs.hour_chart.showLoading();
      // this.$refs.class_chart.showLoading();
      this.$refs.day_chart.showLoading();
      // this.$refs.week_chart.showLoading();
    },
    hideLoadingAll() {
      this.$refs.ten_minutes_chart.hideLoading();
      this.$refs.hour_chart.hideLoading();
      // this.$refs.class_chart.hideLoading();
      this.$refs.day_chart.hideLoading();
      // this.$refs.week_chart.hideLoading();
    },
    get_data() {
      this.get_data_by_granularity('ten_minutes');
      this.get_data_by_granularity('hour');
      this.get_data_by_granularity('class');
      this.get_data_by_granularity('day');
      this.get_data_by_granularity('week');
    },


    get_data_by_granularity(granularity){
      let url = "/api/get_index_trend_by_blast_id"
      let start_end_time = this.get_start_end_time(granularity);
      let params = {
        start_time: start_end_time.start_time,
        end_time: start_end_time.end_time,
        blast_id: this.blast_id,
        granularity:granularity
      }
      let chart_ref= this.get_ref(granularity);
      chart_ref.showLoading();
      this.axios.get(url, {params: params}).then((response) => {
        this.raw_data[granularity] = response.data;
        chart_ref.hideLoading();
      }).catch(error => {
        console.log(error)
        alert("获取所有时间粒度趋势数据失败")
        chart_ref.hideLoading();
      })
    },

    get_ref(granularity){
      let tran={
        'ten_minutes':this.$refs.ten_minutes_chart,
        'hour':this.$refs.hour_chart,
        'day':this.$refs.day_chart,
        'class':this.$refs.class_chart,
      'week':this.$refs.week_chart,
      }
      return tran[granularity];
    },
    granularity_zh(gran) {
      let tran = {
        'ten_minutes': "十分钟级",
        "hour": "小时级",
        "class": "班次级",
        "day": "天均",
        "week": "周均"
      }
      return tran[gran];
    }
  },
  data() {
    return {
      raw_data: {
        "ten_minutes": [
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
        "hour": [
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
        "class": [
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
        "day": [
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
        "week": [
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
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>