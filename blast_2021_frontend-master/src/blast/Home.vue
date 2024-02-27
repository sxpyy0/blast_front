<template>
  <div class="main" id="main" ref="main_div">
    <!--    时间粒度选择-->
    <b-row align-h="center" align-v="center" style="height: 80px">
      <b-col md="2">
        <b-row align-h="center" align-v="center" style="text-align: center">
          <b-col md="6" class="form_label light_text">
<!--            <div style="text-align: end">诊断周期：</div>-->
          </b-col>
          <b-col md="6">
<!--            <b-form-select class="dark_select" sizw="sm" v-model="granularity_selected"-->
<!--                           :options="this.$store.state.granularity_options"></b-form-select>-->
            <b-col md="2"></b-col>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="2"></b-col>
      <b-col md="4" class="page_title">
      </b-col>
      <b-col md="4">
        <Clock/>
      </b-col>
    </b-row>
    <!--    左上柱状图-->
    <div class="row">
      <div class="main_tab1">
        <div class="tab1_title">  </div>
        <div class="rank_granularity_select">
                  <b-row align-h="end" align-v="center" style="text-align: center">
          <b-col md="2.2" class="form_label light_text">
            <div style="text-align: end">诊断周期：</div>
          </b-col>
          <b-col md="3.5">
            <b-form-select class="dark_select" sizw="sm" v-model="granularity_selected_rank"
                           :options="this.$store.state.granularity_options"></b-form-select>
          </b-col>
        </b-row>
        </div>
        <BlastDiagnoseBar
            :granularity="granularity_selected_rank"
            class="mt-3"
            style="background: rgba(25, 25, 112, 0.4)"
            ref="diagnose_bar"
            :chart_height="main_div_height*0.83"
        />
      </div>
      <!--    中间地图-->

      <div class="tab_center">
        <div class="tab_gd">
          <div class="guangdian" id="guangdian1"></div>
          <div class="guangdian" id="guangdian2"></div>
          <div class="guangdian" id="guangdian3"></div>
          <div class="guangdian" id="guangdian4"></div>
        </div>
        <div>
          <div class="shuju" id="qingshan_base" style="text-align:center;">
            <CircleGroupV base_name="qingshan" :granularity="granularity_selected_map" />
          </div>
          <div class="shuju" id="dongshan_base" style="text-align:center;">
            <CircleGroupV base_name="dongshan" :granularity="granularity_selected_map"/>
          </div>
          <div class="shuju" id="meishan_base" style="text-align:center;">
            <CircleGroupV base_name="meishan" :granularity="granularity_selected_map"/>
          </div>
          <div class="shuju" id="baoshan_base" style="text-align:center;">
            <CircleGroupV base_name="baoshan" :granularity="granularity_selected_map"/>
          </div>
          <div class="map_granularity_select">
            <b-row align-h="end" align-v="center" style="text-align: center">
              <b-col md="2.2" class="form_label light_text">
                <div style="text-align: end">诊断周期：</div>
              </b-col>
              <b-col md="3.5">
                <b-form-select class="dark_select" sizw="sm" v-model="granularity_selected_map"
                               :options="this.$store.state.granularity_options"></b-form-select>
              </b-col>
            </b-row>
          </div>
        </div>

      </div>
      <!--      右边各基地折线图-->
      <div class="main_tab2">
        <div class="tab2_title"></div>

        <div class="index_granularity_select">
          <b-row align-h="end" align-v="center" style="text-align: center">
            <b-col md="2.2" class="form_label light_text">
              <div style="text-align: end">诊断周期：</div>
            </b-col>
            <b-col md="3.5">
              <b-form-select class="dark_select" sizw="sm" v-model="granularity_selected_index"
                             :options="this.$store.state.granularity_options"></b-form-select>
            </b-col>
          </b-row>
        </div>
        <div class="tab2_chars">
          <BaseIndexTrend
              base_name="宝山基地"
              :start_time="start_time"
              :end_time="end_time"
              :granularity="granularity_selected_index"
              :chart_height="base_index_trend_height"
          />
          <BaseIndexTrend
              base_name="青山基地"
              :start_time="start_time"
              :end_time="end_time"
              :granularity="granularity_selected_index"
              :chart_height="base_index_trend_height"
          />
          <BaseIndexTrend
              base_name="东山基地"
              :start_time="start_time"
              :end_time="end_time"
              :granularity="granularity_selected_index"
              :chart_height="base_index_trend_height"
          />
          <BaseIndexTrend
              base_name="梅山基地"
              :start_time="start_time"
              :end_time="end_time"
              :granularity="granularity_selected_index"
              :chart_height="base_index_trend_height"
          />

        </div>
      </div>
    </div>
    <!-- 底部预警信息   -->
    <div class="main_tab3">
      <div class="tab3_title"></div>
      <AlertScroll
          ref="alert_scroll"
      />
    </div>
  </div>
</template>

<script>
import BlastDiagnoseBar from "./components/BlastDiagnoseBar";
import AlertScroll from "./components/AlertScroll";
import BaseIndexTrend from "@/blast/components/BaseIndexTrend";
import Clock from "@/blast/components/Clock";
// import BaseBlastBarV from "@/blast/components/BaseBlastBarV";
import CircleGroupV from "@/blast/components/CircleGroupV";
export default {
  components: {
    BlastDiagnoseBar,
    AlertScroll,
    BaseIndexTrend,
    Clock,
    CircleGroupV
    // BaseBlastBarV
  },
  mounted() {
    this.update_timer = setInterval(this.update_page_data,this.$store.state.update_interval); //十分钟更新一次页面
    this.main_div_height = this.$refs.main_div.clientHeight
  },
  watch:{

  },
  beforeDestroy() {
    clearInterval(this.update_timer);
  },
  data() {
    return {
      main_div_height:1000,
      granularity_selected_rank: "day",
      granularity_selected_index: "hour",
      granularity_selected_map:"week",
      start_time: this.get_start_time(), //取24小时之前的时间,
      end_time: this.get_end_time(),
    };
  },
  computed: {
    base_index_trend_height(){
      return (this.main_div_height)*0.83/4-5;
    },
  },
  methods:{
    update_page_data() {
      this.start_time = this.get_start_time(); //取24小时之前的时间,
      this.end_time = this.get_end_time();  //更新起止时间，带起止时间的组件就会更新
      this.$refs.diagnose_bar.get_data(); //更新左上 柱状图
      this.$refs.alert_scroll.get_data();
    }
  }
};
</script>

<style>
/*body样式*/
body {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
  width: 100% !important;
  height: 100% !important;
}



.tab_gd {
  position: absolute;
}

.main {
  width: 100%;
  height: 100%;
  background: url("~@/../public/img/稳定背景.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  margin: -0.75vh 0 0 -0.8vw;
}

.main_tab1 {
  height: 64vh;
  width: 31vw;
  margin-top: 0vh;
  margin-left: 1.7vw;
  font-size: 1.1vw;
  float: left;
}

.tab1_title {
  width: 20vw;
  height: 4vh;
  background: url("~@/../public/img/排名.png") no-repeat;
  background-size: 100% 100%;
}



.rank_granularity_select{
  margin-top:-4vh;
}

.tab_center {
  height: 64vh;
  width: 40.5vw;
  margin-top: 0vh;
  float: left;
}



.guangdian {
  height: 6vh;
  width: 6vw;
  background: url("~@/../public/img/光点.png") no-repeat;
}

#guangdian1 {
  float: left;
  margin-left: 12.5vw;
  margin-top: 18vh;
}

#guangdian2 {
  float: left;
  margin-left: 2vw;
  margin-top: 12vh;
}

#guangdian3 {
  float: left;
  margin-left: -2vw;
  margin-top: 15vh;
}

#guangdian4 {
  float: left;
  margin-left: -25vw;
  margin-top: 55vh;
}

.shuju {
  height: 13vh;
  width: 8vw;
  /*background: url("~@/../public/img/高炉黑框.png") no-repeat;*/
  /* background-color: rgba(0,0,0,0.27); */
  text-align: center;
  background-size: 100% 100%;
}



.line1 span {
  text-align: center;
}


#qingshan_base {
  margin-left: 10.5vw;
  margin-top: 10.5vh;
}

#dongshan_base {
  margin-left: 3.5vw;
  margin-top: 24vh;
}



#meishan_base {
  margin-left: 18.5vw;
  margin-top: -56vh;
}


/*宝山*/
#baoshan_base{
  margin-left: 26vw;
  margin-top: -5vh;
}

.map_granularity_select{
  margin-top: -25vh;
  margin-right:2vw;
}

.main_tab2 {
  height: 64vh;
  width: 26.5vw;
  margin-top: 0;
  margin-right: 1vw;
  font-size: 1.1vw;
  float: left;
}

.tab2_title {
  width: 20vw;
  height: 4vh;
  background: url("~@/../public/img/稳定.png") no-repeat;
  background-size: 100% 100%;
}

.index_granularity_select{
  margin-top:-4vh;
}

.tab2_chars {
  height: 60vh;
  width: 26.5vw;
}


.main_tab3 {
  height: 26vh;
  width: 38vw;
  margin-top: 0vh;
  margin-right: 33.3vw;
  margin-left: 33.3vw;
  font-size: 1.1vw;
  /*float: center;*/
  overflow: hidden;

}

.tab3_title {
  width: 20vw;
  height: 4vh;
  background: url("~@/../public/img/预警.png") no-repeat;
  background-size: 100% 100%;
}

ul {
  overflow: hidden;
}


</style>