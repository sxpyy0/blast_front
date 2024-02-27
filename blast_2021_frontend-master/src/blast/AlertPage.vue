<template>
  <div>
    <b-container fluid>
      <b-row align-h="center" align-v="center" style="height: 100px">
        <b-col md="3"></b-col>
        <b-col md="6">
          <h4 class="page_title">高炉炉况预警信息查询</h4>
        </b-col>
        <b-col md="2"></b-col>
         <!-- 返回主页-->
         <b-col md="1">
             <b-button class="btn_back" size="sm" @click="kill_page(form.blast_id)" variant="outline-light"> 返回</b-button>
            </b-col>
      </b-row>
      


      <b-row align-h="center" style="font-size: 80%">
        <b-col md="10" style="background: rgba(25, 25, 112, 0.7)">
          <b-row style="color:#fff">
            <!--            起始日期-->
            <b-col md="4">
              <b-form-group
                  label="起始日期"
                  label-for="start_date"
                  :label-cols-md="3" label-class="light_text"
              >
                <b-form-datepicker
                    v-model="form.start_date"
                    dark
                    locale="zh"
                    aria-controls="example-input"

                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-timepicker locale="zh" v-model="form.start_time" :hour12=false></b-form-timepicker>
            </b-col>

            <!--            终止日期-->
            <b-col md="4">
              <b-form-group
                  label="终止日期"
                  label-for="end_date"
                  :label-cols-md="3" label-class="light_text"
              >
                <b-form-datepicker
                    v-model="form.end_date"
                    dark
                    locale="zh"
                    aria-controls="example-input"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-timepicker dark   locale="zh" v-model="form.end_time" :hour12=false></b-form-timepicker>
            </b-col>


          </b-row>

          <b-row>
            <b-col md="3">
              <b-form>
                <b-form-group
                    style="color: #fff"
                    id="input-group-1"
                    label="高炉:"
                    label-for="input-1"
                    description="" label-class="light_text"
                    :label-cols="4"
                >
                  <b-form-select class="dark_select"
                                 id="input-1"
                                 v-model="form.blast_id"
                                 :options="blast_options"
                                 required
                  ></b-form-select>
                </b-form-group>
              </b-form>
            </b-col>
            <b-col md="3">
              <b-form-group
                  label="时间粒度"
                  label-for="basicSelect"
                  :label-cols="4" label-class="light_text"
              >
                <b-form-select
                    id="basicSelect" class="dark_select"
                    :options="granularity_options"
                    v-model="form.granularity"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="5">
              <b-form-group label="报警等级：" label-class="light_text" style="color: #fff" :label-cols="2">
                <b-form-radio-group
                    id="checkbox-group-1"
                    v-model="form.level_selected"
                    :options="level_options"
                    name="flavour-1"
                ></b-form-radio-group>
              </b-form-group>
            </b-col>

            <b-col md="1">
              <b-button block size="sm" type="submit" @click="query_data" variant="primary"> 查询</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>


      <b-row align-h="center" style="font-size: 100%">
        <!-- 表格主体 -->
        <b-col md="10" style="background: rgba(25, 25, 112, 0.7)">
          <b-table
              size="sm"
              dark
              striped
              table-variant="transparent"
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              :busy="isBusy"
              fixed responsive
              show-empty
          >

            <template #empty="">
                <p style="{font-size: 30px;color: white;}; text-align: center">暂无报警信息</p>
            </template>
            <!--            查看建议按钮-->
            <template #cell(actions)="data">
              <b-button size="sm" variant="outline-info" @click="open_suggestion_modal(data.item)">查看</b-button>
            </template>

            <!--            显示报警等级-->
            <template #cell(level)="data">
              <b-button size="sm" :style="'font-weight:bold;color:gray;background: '+level2color[data.item.level]">
                {{ level2zh[data.item.level] }}
              </b-button>
            </template>
            <!--            设置查询等待动画-->
            <template #table-busy>
              <div class="text-center text-info my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>加载中</strong>
              </div>
            </template>

            <!--            设置列宽-->
            <template #table-colgroup="scope">
              <col
                  v-for="field in scope.fields"
                  :key="field.key"
                  :style="{width:col_width[field.key]}"
              >
            </template>


          </b-table>

          <b-pagination
              :per-page="perPage"
              v-model="currentPage"
              :total-rows="totalRows"
              class="customPagination"
              style="margin-right: 0"
          >

          </b-pagination>
        </b-col>
      </b-row>

    


    </b-container>

    <!--    显示建议的模态框-->
    <b-modal id="suggestion-modal"
             v-model="showModel"
             ok-only centered
             ok-title="确定"
             :title="this.info_modal.title"
             header-bg-variant="dark"
             header-text-variant="light"
             body-bg-variant="dark"
             body-text-variant="light"
             footer-bg-variant="dark"
             footer-text-variant="light"
    >
      {{ this.info_modal.suggestion }}
    </b-modal>

  </div>
</template>


<style scoped>
.customPagination > li > a {
  color: red;
}

.customPagination > li.active > a,
.customPagination > li > a:hover {
  color: white;
  background-color: green !important;
}

.test {
  color: #d82052;
}
</style>


<script>
export default {

  methods: {
    query_data() {
      let url = "/api/get_alerts";
      // console.log(this.form.start_date, this.$moment().format(" HH:mm:ss"))
      let params = {
        start_time: this.form.start_date + this.$moment().format(" HH:mm:ss"),
        end_time: this.form.end_date + this.$moment().format(" HH:mm:ss"),
      }
      if (this.form.blast_id !== "all") {
        params['blast_id'] = this.form.blast_id
      }
      if (this.form.granularity !== 'all') {
        // console.log("时间粒度不为零")
        params['granularity'] = this.form.granularity
      }
      if (this.form.level_selected !== 'all') {
        params['level'] = this.form.level_selected
      }
      this.isBusy = true;
      // console.log(params)
      this.axios.get(url, {params: params}).then(response => {
        this.raw_data = response.data
        if (response.data == '') {
          this.raw_data = []
        }
        else{
          this.raw_data = response.data
        }
        this.isBusy = false
      }).catch(error => {
        console.log(error)
        alert("获取失败")
        this.isBusy = false
      })
    },
    open_suggestion_modal(item) {
      this.info_modal.suggestion = item.suggestion;
      this.info_modal.title = item.reason;
      this.showModel = true;
    },
  },
  mounted() {
    this.query_data()
  },
  data() {
    return {
      info_modal: {
        suggestion: "",
        title: ""
      },
      col_width: {
        "blast_name": "100px",
        "reason": "400px",
        "time_granularity": "100px",
        "time": "150px",
        "level": "100px",
        "actions": "100px",
      },
      showModel: false,
      form: {
        blast_id: this.get_query_variable_blast_id(), // 从这个方法里面取默认的blastId
        start_date: this.$moment().add(-7, "d").format("YYYY-MM-DD"),
        end_date: this.$moment().format("YYYY-MM-DD"),
        granularity: "ten_minutes",
        level_selected: 1,
        start_time: this.$moment().format("HH:mm:ss"),
        end_time:this.$moment().format("HH:mm:ss"),
      },
      isBusy: false,
      currentPage: 1,
      perPage: 10,
      granularity_int2zh: {1: "十分钟", 2: "小时", 3: "班次", 4: "天均", 5: "周均"},
      level2color: {1: "red", 2: "orange", 3: "RGB(246,246,0)", 4: "blue"},
      level2zh: {1: "一级", 2: "二级", 3: "三级", 4: "四级"},
      fields: [
        {key: "blast_name", label: "高炉名称", tdClass: 'td_blast_name', thClass: 'th_style'},
        {key: "time_granularity", label: "时间粒度", tdClass: 'td_granularity', thClass: 'th_style'},
        {key: "reason", label: "推送术语", tdClass: 'td_reason', thClass: 'th_reason'},

        {key: "time", label: "发生时间", tdClass: 'td_time', thClass: 'th_style'},
        {key: "level", label: "报警等级", tdClass: 'td_style', thClass: 'th_style'},
        {key: "actions", label: "应对措施", tdClass: 'td_style', thClass: 'th_style'},
      ],
      granularity_options: [
        {value: "ten_minutes", text: "十分钟"},
        {value: "hour", text: "小时"},
        {value: "class", text: "班次"},
        {value: "day", text: "天均"},
        {value: "week", text: "周均"},
        {value: "all", text: "全部"},
      ],
      level_options: [
        {text: "一级", value: 1,},
        {text: "二级", value: 2,},
        {text: "三级", value: 3,},
        {text: "四级", value: 4,},
        {text: "全部", value: 'all',},
      ],
      blast_options:
      [
        {value: "all", text: "全部"},
      ].concat(this.$store.state.blast_list_options),
      raw_data: [{
        alert_log_id: "rid1202102181122",
        generate_date: "2021-02-18 11:22:35",
        alert_info_id: "rid1",
        blast_name: "高炉名称",
        alert_level: 3,
        time_granularity: 1,
        alert_info: {
          alertId: "BFAI00001",
          // alertName: "出现料难行，注意防范悬料啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
          alertName: "出现料难行，注意防范悬料等",
          suggestion:
              "1、立即减风300-500m3/min,料不动继续减风，同时调整氧量、喷煤、顶压，必要时停TRT、锁定调压阀组；\r\n2、料下后，检查风口状况；确认出渣铁状况，储渣铁高则强化出渣铁；确认炉温情况，炉温过高则大幅撤下部热量；确认炉墙情况，有粘接采取洗炉措施；确认原燃料情况，有异常则提高焦比10-15kg；确认气流与炉况，顺行不好调整气流、退矿焦比；\r\n3、瞬间突然料难行，检查直吹管是否有掉砖；\r\n4、严格按照差压操作，避免悬料。",
        },
      },
        {
          alert_log_id: "rid1202102181122",
          generate_date: "2021-02-18 11:22:35",
          alert_info_id: "rid1",
          blast_name: "高炉名称",
          time_granularity: 1,
          alert_level: 2,
          alert_info: {
            alertId: "BFAI00001",
            alertName: "出现料难行，",
            suggestion:
                "2、料下后，检查风口状况；确认出渣铁状况，储渣铁高则强化出渣铁；确认炉温情况，炉温过高则大幅撤下部热量；确认炉墙情况，有粘接采取洗炉措施；确认原燃料情况，有异常则提高焦比10-15kg；确认气流与炉况，顺行不好调整气流、退矿焦比；\r\n3、瞬间突然料难行，检查直吹管是否有掉砖；\r\n4、严格按照差压操作，避免悬料。",
          },

        },
        {
          alert_log_id: "rid1202102181122",
          generate_date: "2021-02-18 11:22:35",
          alert_info_id: "rid1",
          blast_name: "高炉名称",
          time_granularity: 1,
          alert_level: 1,
          alert_info: {
            alertId: "BFAI00001",
            alertName: "出现料难行，",
            suggestion:
                "2、料下后，检查风口状况；确认出渣铁状况，储渣铁高则强化出渣铁；确认炉温情况，炉温过高则大幅撤下部热量；确认炉墙情况，有粘接采取洗炉措施；确认原燃料情况，有异常则提高焦比10-15kg；确认气流与炉况，顺行不好调整气流、退矿焦比；\r\n3、瞬间突然料难行，检查直吹管是否有掉砖；\r\n4、严格按照差压操作，避免悬料。",
          }
        },
        {
          alert_log_id: "rid1202102181122",
          generate_date: "2021-02-18 11:22:35",
          alert_info_id: "rid1",
          blast_name: "高炉名称",
          time_granularity: 1,
          alert_level: 4,
          alert_info: {
            alertId: "BFAI00001",
            alertName: "出现料难行，",
            suggestion:
                "2、料下后，检查风口状况；确认出渣铁状况，储渣铁高则强化出渣铁；确认炉温情况，炉温过高则大幅撤下部热量；确认炉墙情况，有粘接采取洗炉措施；确认原燃料情况，有异常则提高焦比10-15kg；确认气流与炉况，顺行不好调整气流、退矿焦比；\r\n3、瞬间突然料难行，检查直吹管是否有掉砖；\r\n4、严格按照差压操作，避免悬料。",
          }
        },
      ],
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
    items() {
      // console.log(this.raw_data);
      return this.raw_data.map(alter_data => {
        return {
          blast_name: alter_data.blast_name,
          reason: alter_data.alert_info.alertName,
          level: alter_data.alert_level,
          time_granularity: this.granularity_int2zh[alter_data.time_granularity],
          time: alter_data.generate_date,
          suggestion: alter_data.alert_info.suggestion
        }
      })

    }
  },
};
</script>

<style scoped>
.th_style {
  color: lightyellow;
  text-align: center
}

.th_reason {
  color: lightyellow;
  text-align: left;
}

.td_style {
  color: lightblue;
  text-align: center;
}

.td_reason {
  color: lightblue;
  text-align: left;
}


.td_time{
  color:lightgoldenrodyellow;
  text-align:center

}

.td_granularity{
  color:lightseagreen;
  text-align:center

}
.td_blast_name{
  color:lightgreen;
  text-align:center
}

</style>

