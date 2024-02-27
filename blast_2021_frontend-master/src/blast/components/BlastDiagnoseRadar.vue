<!--
 * @FileDescription: 显示高炉5个时间粒度的5个子指数维度的5个雷达图
 * @Author: haoyun
 * @Date: 2021.2.15

 负责数据的请求，然后把数据输入到负责显示的echart组件中。
 -->
<template>
  <RadarChart  :blast_id="blast_id" :chart_height="chart_height" :chart_width="chart_width"
  ></RadarChart>
</template>

<script>
import RadarChart from "@/echarts/Radar.vue"
export default {
    components:{
        RadarChart
    },
    props:["blast_id",'chart_height','chart_width']
}
</script>

<style>

</style>