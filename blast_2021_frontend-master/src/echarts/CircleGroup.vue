<template>
  <div>
    <v-chart style="height: 150px; width: 150px" :options="circle_group_option">
    </v-chart>
  </div>
</template>

<script>
export default {
  props: {
    circle_data: {
      default() {
        return [
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
          {
            name: "4#",
            value: 0.2,
          },
        ];
      },
    },
  },
  computed: {
    circle_group_option() {
      let series = this.circle_data.map(this.data2series);
      let subtexts = this.circle_data.map(this.data2title);

      if (this.circle_data.length === 3) {
        series[0]["right"] = "33.3%";
        series[0]["left"] = "33.3%";
        series[0]["top"] = "0%";
        series[0]["bottom"] = "66%";

        subtexts[0]['left'] = "43.3%";
        subtexts[0]['top'] = "23%";


        series[1]["left"] = "12%";
        series[1]["right"] = "54.6%";
        series[1]["top"] = "36%";
        series[1]["bottom"] = "30%";

        subtexts[1]['left'] = "25%";
        subtexts[1]['top'] = "58%";


        series[2]["left"] = "54.6%";
        series[2]["right"] = "12%";
        series[2]["top"] = "36%";
        series[2]["bottom"] = "30%";

        subtexts[2]['left'] = "70%";
        subtexts[2]['top'] = "58%";

      } else if (this.circle_data.length === 4) {
        series[0]["right"] = "50%";
        series[0]["left"] = "16%";
        series[0]["top"] = "0%";
        series[0]["bottom"] = "66%";

        subtexts[0]['left'] = "30%";
        subtexts[0]['top'] = "18%";

        series[1]["right"] = "16%";
        series[1]["left"] = "50%";
        series[1]["top"] = "0%";
        series[1]["bottom"] = "66%";

        subtexts[1]['left'] = "65%";
        subtexts[1]['top'] = "18%";

        series[2]["right"] = "50%";
        series[2]["left"] = "16%";
        series[2]["top"] = "33%";
        series[2]["bottom"] = "33%";

        subtexts[2]['left'] = "30%";
        subtexts[2]['top'] = "52%";


        series[3]["right"] = "16%";
        series[3]["left"] = "50%";
        series[3]["top"] = "33%";
        series[3]["bottom"] = "33%";

        subtexts[3]['left'] = "65%";
        subtexts[3]['top'] = "52%";

      } else if (this.circle_data.length === 5) {
        series[0]["left"] = "33.3%";
        series[0]["right"] = "33.3%";
        series[0]["top"] = "0%";
        series[0]["bottom"] = "66.6%";
        subtexts[0]['left'] = "45%";
        subtexts[0]['top'] = "20%";

        series[1]["left"] = "0%";
        series[1]["right"] = "66.6%";
        series[1]["top"] = "20%";
        series[1]["bottom"] = "46.6%";
        subtexts[1]['left'] = "13%";
        subtexts[1]['top'] = "40%";

        series[2]["left"] = "66.66%";
        series[2]["right"] = "0%";
        series[2]["top"] = "20%";
        series[2]["bottom"] = "46.6%";
        subtexts[2]['left'] = "80%";
        subtexts[2]['top'] = "40%";

        series[3]["left"] = "10%";
        series[3]["right"] = "56.66%";
        series[3]["top"] = "50%";
        series[3]["bottom"] = "0%";
        subtexts[3]['left'] = "25%";
        subtexts[3]['top'] = "80%";


        series[4]["left"] = "56.6%";
        series[4]["right"] = "10%";
        series[4]["top"] = "50%";
        series[4]["bottom"] = "0%";
        subtexts[4]['left'] = "70%";
        subtexts[4]['top'] = "80%";

      }

      let option = {
        grid:{top:0,left:0,right:0,bottom:0},
        series: series,
        title:subtexts
      };
      return option;
    },
  },
  methods: {
    data_with_empty(a_data) {
      let empty_value = 1 - a_data.value;
      return [
        a_data,
        {
          name: "",
          value: empty_value,
        },
      ];
    },
    data2series(data) {
      return {
        type: "pie",
        radius: ["0%", "80%"],
        center: ["50%", "50%"],
        data: this.data_with_empty(data),
        // data:[{name:data.name,value:1},{name:"",value:0}],
        label: {
          show:false,
          normal: {
            show: true,
            position: "center",
            formatter: function (params) {
              if(params.dataIndex===0){
                return  params.value.toFixed(2)*100;
              }else{
                return ""}
            },
            textStyle: {
              fontSize: 20,
              color: "#000099",
            },
          },
        },

        itemStyle: {
          borderWidth:0,
          color: function (params) {
            // console.log(params);
            let value2color = function (value) {
              /**
               * 1:休风（指数值为0）,2：深黄（0-0.35）,3：浅黄（0.35-0.6）,4：浅绿（0.6-0.8）,5：绿色（0.8以上）
               */
              const yellow = "#FFFF00";
              const light_yellow = "#FFFF99";
              const light_green = "#99CC33";
              const green = "#339933";
              return value >= 0.8
                ? green
                : value >= 0.6
                ? light_green
                : value >= 0.35
                ? yellow
                : light_yellow;
            };

            if (params.dataIndex === 0) {
              return value2color(params.value); // 有数据的地方的颜色
            } else if (params.dataIndex === 1) {
              return value2color(1-params.value); // 空白处颜色
            }
          },
        },
      };
    },
    data2title(data){
      let title = {
        subtext:data.name,
        textAlign:'center',
        subtextStyle:{
          color:"#ffffff",
          fontSize:"15"
        }
      }
      return title;
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>