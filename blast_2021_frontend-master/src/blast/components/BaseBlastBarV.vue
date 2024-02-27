<template>
  <div>
    <span style="color:white">{{base_name}}：{{avg_value}}  </span><span></span>
    <BaseBlastBar :x_data="chart_data['blast']" :y_data="chart_data['value']">

    </BaseBlastBar>
  </div>
</template>

<script>
import BaseBlastBar from "@/blast/components/BaseBlastBar";

export default {
  name: "BaseBlastBarV",
  components: {
    BaseBlastBar
  },
  props: {
    base_name: {
      default: "宝山基地"
    }
  },
  computed: {
    chart_data() {
      return this.base_data[this.base_name];
    },
    avg_value(){
      return (this.chart_data['value'].reduce((a,b)=>a+b)/this.chart_data['value'].length).toFixed(2);
    }
  },
  data() {
    return {
      base_data: {
        "梅山基地": {
          blast: ['2#', '4#', '5#'],
          value: [0.59, 0.8, 0.87]
        },
        "东山基地": {
          blast: ['1#', '2#', '3#'],
          value: [0.78, 0.89, 0.94,]
        },
        "青山基地": {
          blast: ['4#', '5#', '6#', '7#', '8#'],
          value: [0.75, 0.55, 0.94, 0.98,0.78]
        },
        "宝山基地": {
          blast: ['1#', '2#', '3#', '4#'],
          value: [0.77, 0.93, 0.85, 0.79]
        },
      }
    }
  }
}
</script>

<style scoped>

</style>