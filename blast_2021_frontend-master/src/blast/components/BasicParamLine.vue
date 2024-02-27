<template>
  <div>
    <b-container fluid>
      <b-row align-h="center">
        <b-col md="12" style="">
          <b-row style="color: #fff">
            <!--            起始日期-->
            <b-col md="6">
              <b-form-group
                  label="起始日期"
                  label-for="start_date"
                  :label-cols-md="3"

              >
                <b-form-datepicker
                    v-model="start_date"
                    dark
                    locale="zh"
                    aria-controls="example-input"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-timepicker
                  locale="zh"
                  v-model="start_time"
                  :hour12="false"
              ></b-form-timepicker>
            </b-col>
          </b-row>
          <!--            终止日期-->
          <b-row>
            <b-col md="6">
              <b-form-group
                  label="终止日期"
                  label-for="end_date"
                  :label-cols-md="3"

              >
                <b-form-datepicker
                    v-model="end_date"
                    dark
                    locale="zh"
                    aria-controls="example-input"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-timepicker
                  dark
                  locale="zh"
                  v-model="end_time"
                  :hour12="false"
              ></b-form-timepicker>
            </b-col>
            <b-col md="2">
              <b-button
                  block

                  type="submit"
                  @click="get_data"
                  variant="primary"
              >
                查询
              </b-button
              >
            </b-col>
          </b-row>

          <b-row>
            <!--            <b-col md="6">-->
            <!--              <b-form>-->
            <!--                <b-form-group-->
            <!--                  style="color: #fff"-->
            <!--                  id="input-group-1"-->
            <!--                  label="高炉:"-->
            <!--                  label-for="input-1"-->
            <!--                  description=""-->

            <!--                  :label-cols="3"-->
            <!--                >-->
            <!--                  <b-form-select-->

            <!--                    id="input-1"-->
            <!--                    v-model="blast_id"-->
            <!--                    :options="this.$store.state.blast_list_options"-->
            <!--                    required-->
            <!--                  ></b-form-select>-->
            <!--                </b-form-group>-->
            <!--              </b-form>-->
            <!--            </b-col>-->
            <b-col md="6"></b-col>
            <!--            <b-col md="2">-->
            <!--              <b-button-->
            <!--                block-->
            <!--                size="sm"-->
            <!--                type="submit"-->
            <!--                @click="get_data"-->
            <!--                variant="primary"-->
            <!--              >-->
            <!--                查询</b-button-->
            <!--              >-->
            <!--            </b-col>-->

          </b-row>
        </b-col>
      </b-row>

      <b-row align-h="center">
        <b-col md="12">
          <BaseLine
              chart_name=""
              ref="line_chart"
              :chart_height="height"
              class="mt-2"
              :data="{x:index_data['x_data'],
         y:[index_data['y_data']],
         names:[this.basic_param_id]}"
              style=""
              :zero2one="false"
              :mark-line="false"
              :mark-area="false"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BaseLine from "@/echarts/BaseLine";

export default {
  components: {BaseLine},
  props: {
    height: {
      default: "500",
    },
    granularity: {
      default: "hour",
    },
    basic_param_id: {
      default: "BPI200018", //炉缸热负荷
    },
    blast_id: {
      default: "BF004",
    },
  },
  methods: {
    get_data() {
      let url = "/api/get_basic_param_trend"
      console.log(this.form_data)
      this.$refs.line_chart.showLoading()
      this.axios.get(url, {params: this.form_data}).then(res => {
        this.raw_data = res.data;
        this.$refs.line_chart.hideLoading();
      }).catch(err => {
        console.log(err);
        this.$refs.line_chart.hideLoading();
      })
    },
  },
  computed: {
    index_data() {
      let res = {};
      res["x_data"] = [];
      res["y_data"] = [];
      this.raw_data.forEach((data) => {
        res["x_data"].push(data.fetchTime.slice(5, -3)); //去掉 年份 和 秒
        res["y_data"].push(data.dataValue);
      });
      return res;
    },
    form_data() {
      return {
        granularity: this.granularity,
        startTime: this.start_date + " " + this.start_time,
        endTime: this.end_date + " " + this.end_time,
        blastId: this.blast_id,
        basicParamId: this.basic_param_id,
      };
    },
  },
  watch: {
    form_data() {
      this.get_data();
    },
  },
  mounted() {
    let start_end_time = this.get_start_end_time(this.granularity);
    console.log(start_end_time)
    this.start_time = start_end_time['start_time'].slice(-8);
    this.end_time = start_end_time['end_time'].slice(-8);
    this.start_date = start_end_time['start_time'].slice(0,10);
    this.end_date = start_end_time['end_time'].slice(0,10);
    this.get_data();
  },
  data() {
    return {
      start_date: "2021-02-01",
      end_date: "2021-03-01",
      start_time: "00:00:00",
      end_time: "00:00:00",
      raw_data: [
        {
          basicParamId: "BPI200018",
          fetchTime: "2021-02-22 02:00:01",
          blastId: null,
          dataValue: 0,
          basicParamName: null,
          unit: null,
        },
        {
          basicParamId: "BPI200018",
          fetchTime: "2021-02-22 03:00:01",
          blastId: null,
          dataValue: 0,
          basicParamName: null,
          unit: null,
        },
        {
          basicParamId: "BPI200018",
          fetchTime: "2021-02-22 04:00:01",
          blastId: null,
          dataValue: 0,
          basicParamName: null,
          unit: null,
        },
        {
          basicParamId: "BPI200018",
          fetchTime: "2021-02-22 05:00:01",
          blastId: null,
          dataValue: 0,
          basicParamName: null,
          unit: null,
        }
      ],
    };
  },
};
</script>

<style>
</style>