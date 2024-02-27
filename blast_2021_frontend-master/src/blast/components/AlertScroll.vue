<template>
  <div>
    <div v-if="raw_data.length===0" id="no_data_div" :style="{height: height+'px'}">
      <p style="{font-size: 30px;color: white;}">暂无报警信息</p>
    </div>
    <vue-scroll-seamless v-else
                         :data="roll_data" :class-option="{limitMoveNum:1,step:0.5, singleHeight: 66,waitTime:2000}"
                         :style="{height: height+'px', overflow: 'hidden'}"
    >
      <ul class="item">
        <li v-for="(item, index) in roll_data" :key="index">
          <div class="span_time">
            <span>{{ item.time }}</span>
          </div>
          <div class="span_level" :style="'color:'+level2color[item.level]">
            <span>{{ level2zh[item.level] }}</span>
          </div>
          <div class="span_granularity">
            <span>{{ item.time_granularity }}</span>
          </div>

          <div class="span_blast_name">
            <span>{{ item.blast_name }}</span>
          </div>

          <br>
          <div class="span_alert_name">
            <span>{{ item.alert_name }}</span>
          </div>
          <!--          <div class="span_suggestion">-->
          <!--            <span>{{ item.suggestion }}</span>-->
          <!--          </div>-->
        </li>
      </ul>
    </vue-scroll-seamless>
  </div>
</template>

<script>
export default {
  props: {
    blast_id: {
      default: null
    },
    granularity: {
      default: null
    },
    limit: {
      default: 10,
    },
    start_time:{
      default(){
        return this.$moment().add(-3,'day').format("YYYY-MM-DD HH:mm:ss")
      }
    },
    end_time:{
      default(){
        return this.$moment().format("YYYY-MM-DD HH:mm:ss")
      }
    },
    height: {
      default: 200
    }
  },
  computed: {
    roll_data: function () {
      return this.raw_data.map(data => {
        return {
          time: data.generate_date,
          alert_name: data.alert_info.alertName,
          suggestion: data.alert_info.suggestion,
          blast_name: this.blast_zh2bf[data.blast_name],
          time_granularity: this.granularity_int2zh[data.time_granularity],
          level: data.alert_level
        }
      })
    },
  },
  mounted() {
    this.get_data();
  },
  watch: {
    blast_id() {
      this.get_data()
    },
    granularity() {
      this.get_data()
    }
  },
  methods: {
    get_data() {
      //获取数据
      let url = "/api/get_alerts";
      let params = {
        start_time:this.start_time,
        end_time:this.end_time
      };
      if (this.blast_id != null) {
        params['blast_id'] = this.blast_id
      }

      if (this.granularity != null) {
        params['granularity'] = this.granularity
      }
      if (this.limit != null) {
        params['limit'] = this.limit;
      }

      this.axios.get(url, {params: params}).then((response) => {
        this.raw_data = response.data;
      }).catch(error => {
        console.log(error)
        alert("获取预警信息失败")
      })
    }
  },
  data: function () {

    return {
      granularity_int2zh: {1: "十分钟级", 2: "小时级", 3: "班次级", 4: "天级", 5: "周级"},
      level2zh: {1: "一级", 2: "二级", 3: "三级", 4: "四级"},
      level2color: {1: "red", 2: "orange", 3: "RGB(246,246,0)", 4: "blue"},
      blast_zh2bf: {
        "宝山4号高炉": "宝山4BF",
        "宝山1号高炉": "宝山1BF",
        "宝山2号高炉": "宝山2BF",
        "宝山3号高炉": "宝山3BF",
      },

      raw_data: [
        // {
        //   alert_log_id: "rid1202102181122",
        //   generate_date: "2021-02-18 11:22:35",
        //   alert_info_id: "rid1",
        //   blast_name: "高炉名称",
        //   alert_info: {
        //     alertId: "BFAI00001",
        //     alertName: "出现料难行，注意防范悬料",
        //     suggestion:
        //         "1、立即减风300-500m3/min,料不动继续减风，同时调整氧量、喷煤、顶压，必要时停TRT、锁定调压阀组；\r\n2、料下后，检查风口状况；确认出渣铁状况，储渣铁高则强化出渣铁；确认炉温情况，炉温过高则大幅撤下部热量；确认炉墙情况，有粘接采取洗炉措施；确认原燃料情况，有异常则提高焦比10-15kg；确认气流与炉况，顺行不好调整气流、退矿焦比；\r\n3、瞬间突然料难行，检查直吹管是否有掉砖；\r\n4、严格按照差压操作，避免悬料。",
        //   },
        // },
        // {
        //   alert_log_id: "rid1202102181122",
        //   generate_date: "2021-02-18 11:22:35",
        //   alert_info_id: "rid1",
        //   blast_name: "高炉名称",
        //
        //   alert_info: {
        //     alertId: "BFAI00001",
        //     alertName: "出现料难行，",
        //     suggestion:
        //         "2、料下后，检查风口状况；确认出渣铁状况，储渣铁高则强化出渣铁；确认炉温情况，炉温过高则大幅撤下部热量；确认炉墙情况，有粘接采取洗炉措施；确认原燃料情况，有异常则提高焦比10-15kg；确认气流与炉况，顺行不好调整气流、退矿焦比；\r\n3、瞬间突然料难行，检查直吹管是否有掉砖；\r\n4、严格按照差压操作，避免悬料。",
        //   },
        //
        // },

      ],
    };
  },
};
</script>

<style scoped>
.span_time {
  width: 10vw;
  color: lightgray;
  float: left;
  /*margin-left: 1vw;*/
}

.span_alert_name {
  width: 40vw;
  color: lightgray;
  float: left;
}

.span_granularity {
  width: 6vw;
  color: lightgray;
  float: left;
}

.span_level {
  width: 4vw;
  color: lightgray;
  float: left;
  text-align: center;
}

.span_blast_name {
  width: 6vw;
  color: lightgray;
  float: left;
}

.span_suggestion {
  width: 48vw;
  color: lightgray;
  float: left;
}

li {
  list-style-type: none;
  font-size: 0.9vw;
  overflow: auto;
  line-height: 30px;
  /*width: 97.5vw;*/
  width: 45vw;
  float: left;

  /*background-color: rgba(255, 255, 255, 0.3);*/
  background-color: rgba(25, 25, 112, 0.7);
  margin-top: 6px;

}

ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
}

#no_data_div {
  /*height: this.height;*/
  text-align: center;
  /*padding: 100px;*/
  /*background-color: rgba(255, 255, 255, 0.3);*/
  background-color: rgba(25, 25, 112, 0.7);
  margin-top: 0.6vh;
  /*width: 45vw;*/

}
</style>