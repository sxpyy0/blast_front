<template>
  <div ref="main_div">
    <b-row align-h="center" align-v="center" style="height:70px">
      <b-col md="4">
        <!--        选取高炉-->
        <b-row align-h="center" align-v="center" style="text-align: center">
          <b-col md="3" class="form_label light_text">
            <div style="text-align: end">高炉：</div>
          </b-col>
          <b-col md="9">
            <b-form-select class="dark_select" sizw="sm" v-model="blast_selected"
                           :options="this.$store.state.blast_list_options"></b-form-select>
          </b-col>
        </b-row>
      </b-col>
      <!--      标题-->
      <b-col md="4" class="page_title">
        <h4 style="margin-top: 10px">{{ this.$store.state.blast_id2_zh[this.blast_selected] }}稳定性指数概览</h4>
      </b-col>
      <!--      时钟-->
      <b-col md="3">
        <Clock/>
      </b-col>
      <!--  返回主页-->
      <b-col md="1">
        <b-button class="btn_back" block size="sm" type="submit" @click="kill_page(blast_selected)" variant="outline-light" > 返回</b-button>
      </b-col>
    </b-row>

    <b-row style="margin-top:2vh">
<!--      左边一列-->
      <b-col md="4">
        <b-row>
          <!-- 炉况诊断得分 -->
          <b-col>
            <p class="title light_text">炉况诊断得分</p>
            <DiagnoseScoreTable
                :blast_id="this.blast_selected"
                class="mt-2"
                style="font-size: 70%; background: rgba(25, 25, 112, 0.7)"
                ref="score_table"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- 雷达图 -->
            <p class="title light_text">子指数雷达图</p>
            <BlastDiagnoseRadar
                class="mt-2"
                :blast_id="this.blast_selected"
                style="background: rgba(25, 25, 112, 0.7)"
                ref="radar"
                chart_height="400"
                chart_width="400"
            />
          </b-col>
        </b-row>
        <b-row style="margin-top: 10px;">
          <b-col>
            <p class="title light_text">{{ this.$store.state.blast_id2_zh[blast_selected] }}预警信息</p>
            <AlertScroll :blast_id="this.blast_selected" style="margin-top: 5px" :height="main_div_height-70-200-400-170"
                         ref="alert_scroll"
            />
          </b-col>

        </b-row>
      </b-col>

<!--      中间一列-->
      <b-col ref="blast_col" md="4" style="margin: auto; text-align: left">
        <b-form-group label="诊断粒度" label-class="light_text title" style="color: #fff;text-align: center">
          <b-form-radio-group style="color: #fff"
                              id="checkbox-group-1"
                              v-model="granularity_selected"
                              :options="this.$store.state.granularity_options"
                              name="flavour-1"
          ></b-form-radio-group>
        </b-form-group>
        <BlastImgV style="margin-top:-10px" :container_width="blast_img_width*0.95" :granularity="granularity_selected" :blast_id="blast_selected"/>
      </b-col>
<!--      右边一列-->
      <b-col md="4">
        <!-- 趋势图 -->
        <p class="title light_text">稳定性指数趋势图</p>
        <AllGranularityTrend
            :start_time="this.start_time"
            :end_time="this.end_time"
            :blast_id="this.blast_selected"
            :height="(main_div_height-70)*0.85/5"
        />
      </b-col>
    </b-row>
    <b-row align-h="center">

    </b-row>

  </div>
</template>

<script>
import BlastDiagnoseRadar from "@/blast/components/BlastDiagnoseRadar";
import DiagnoseScoreTable from "@/blast/components/DiagnoseScoreTable";

import AllGranularityTrend from "@/blast/components/AllGranularityTrend";
import AlertScroll from "@/blast/components/AlertScroll";
import Clock from "@/blast/components/Clock";
import BlastImgV from "@/blast/components/BlastImgV";

export default {
  components: {
    BlastDiagnoseRadar,
    DiagnoseScoreTable,
    AllGranularityTrend,
    AlertScroll,
    Clock,
    BlastImgV
  },
  mounted() {
    this.update_timer = setInterval(this.update_page_data, this.$store.state.update_interval); //十分钟更新一次页面
    this.blast_img_width = this.$refs.blast_col.clientWidth;
    this.main_div_height = this.$refs.main_div.clientHeight;
  },
  beforeDestroy() {
    clearInterval(this.update_timer);
  },
  methods: {
    update_page_data() {
      this.start_time = this.get_start_time()
      this.end_time = this.get_end_time()
      this.$refs.score_table.get_data()
      this.$refs.radar.get_data();
      this.$refs.alert_scroll.get_data();
    }
  },
  computed: {},
  data() {
    return {
      main_div_height:1000,
      blast_img_width: 1,
      start_time: this.get_start_time(),
      end_time: this.get_end_time(),
      blast_selected: this.get_query_variable_blast_id(), // 从这个方法里面取默认的blastId
      granularity_selected: "ten_minutes"
    };
  },
};
</script>

<style>
</style>