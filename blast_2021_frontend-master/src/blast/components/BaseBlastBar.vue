<template>
  <div>
    <v-chart :options="bar_option" :style="{margin:'0 auto',height:chart_height+'px',width:chart_width+'px'}">

    </v-chart>
  </div>
</template>

<script>
export default {
  name: "BaseBlastBar",
  props: {
    chart_height: {
      default: 150
    },
    chart_width: {
      default: 150
    },
    x_data: {
      default() {
        return ['1#', '1#', '3#', '4#']
      }
    },
    y_data: {
      default() {
        return [0.8, 0.97, 0.6, 0.76]
      }
    }

  },
  computed: {
    bar_option() {
      return {
        grid: {
          top: 0
        },
        xAxis: {
          type: 'category',
          data: this.x_data,
          axisLabel: {color: 'white'},
          axisLine: {show: false},
          axisTick: {show: false}, //坐标刻度


        },
        yAxis: {
          type: 'value',
          axisLabel: {show: false},
          max: 1,
          min: 0,
          splitLine: {show: false}, //分隔线
          axisTick: {show: false}, //坐标刻度
          axisLine: {show: false} //坐标线
        },
        visualMap: {
          // top: 50,
          // right: 10,
          show: false,
          pieces: [{
            gt: 0,
            lte: 0.6,
            color: 'rgb(210,54,90,0.5)'
          }, {
            gt: 0.6,
            lte: 1,
            color: 'rgba(33,44,234,0.5)'
          }],
          outOfRange: {
            color: 'yellow'
          }
        },
        series: [{
          data: this.y_data,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          label: {
            show: true,
            position: 'inside'
          },
        }, {
          type: "line",
          markLine: {
            silent: true,
            lineStyle: {
              color: '#f56800'
            },
            label: {show: false},
            symbol: ['none', 'none'],
            data: [{
              yAxis: 0.6
            }]
          }
        }]

      }
    }
  }
}
</script>

<style scoped>

</style>