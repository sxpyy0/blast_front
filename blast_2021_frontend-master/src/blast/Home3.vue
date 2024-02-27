<template>
  <div>
    <!--    标题，-->
    <b-row>
      <b-col></b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>

    <!--    主体内容-->
    <b-row>
      <!--      左边：排行-->
      <b-col md="4">
<!--        <BlastDiagnoseBar-->
<!--            granularity="ten_minutes"-->
<!--            class="mt-3"-->
<!--            style="background: rgba(25, 25, 112, 0.4)"-->
<!--            ref="diagnose_bar"-->
<!--            chart_height="600" chart_width="200"-->
<!--        />-->
      </b-col>
      <!--      中间：每个基地柱状图-->
      <b-col md="4" style="text-align: center">
        <b-row>
          <b-col md="6">
            <p class="light_text">宝山基地 平均分:0.8</p>
            <BaseBlastBar/>
          </b-col>
          <b-col md="6">
            <p class="light_text">青山基地 平均分:0.8</p>
            <BaseBlastBar/></b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <p class="light_text">东山基地 平均分:0.8</p>
            <BaseBlastBar></BaseBlastBar>
          </b-col>
          <b-col md="6">
            <p class="light_text">梅山基地 平均分:0.8</p>
            <BaseBlastBar/></b-col>
        </b-row>
      </b-col>
      <!--      右边：每个基地的平均分变化趋势 -->
      <b-col md="4"></b-col>


    </b-row>


  </div>
</template>

<script>
import BaseBlastBar from "@/blast/components/BaseBlastBar";
// import BlastDiagnoseBar from "@/blast/components/BlastDiagnoseBar";
export default {
  name: "home3",
  components: {
    BaseBlastBar,
    // BlastDiagnoseBar
  }
}
</script>

<style scoped>

</style>