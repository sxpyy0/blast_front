<template>
  <div ref="main_div">
    <b-row align-h="center" align-v="center" style="height: 70px">
      <b-col md="2">
        <b-row align-h="center" align-v="center" style="text-align: center">
          <b-col md="4" class="form_label light_text">
            <div style="text-align: end">高炉：</div>
          </b-col>
          <b-col md="8">
            <b-form-select
              class="dark_select"
              sizw="sm"
              v-model="blast_selected"
              :options="this.$store.state.blast_list_options"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="2">
        <b-row align-h="center" align-v="center" style="text-align: center">
          <b-col md="6" class="form_label light_text">
            <div style="text-align: end">诊断周期：</div>
          </b-col>
          <b-col md="6">
            <b-form-select
              class="dark_select"
              sizw="sm"
              v-model="granularity_selected"
              :options="this.$store.state.granularity_options"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="4" class="page_title">
        <h4 style="margin-top: 10px">
          {{ this.$store.state.blast_id2_zh[blast_selected] }}
          {{
            this.$store.state.granularity_str2zh[granularity_selected]
          }}稳定性子指数解析
        </h4>
      </b-col>
      <b-col md="3">
        <Clock />
      </b-col>
      <!-- 返回主页-->
      <b-col md="1">
        <b-button
          class="btn_back"
          block
          size="sm"
          type="submit"
          @click="kill_page(blast_selected)"
          variant="outline-light"
        >
          返回</b-button
        >
      </b-col>
    </b-row>

    <b-row style="margin-top: 0" align-h="between">
      <b-col md="4">
        <!-- 趋势图 -->
        <AllSubIndexTrend
          :blast_id="blast_selected"
          :granularity="granularity_selected"
          :start_time="start_time"
          :end_time="end_time"
          :chart_height="((main_div_height - 70) * 0.94) / 5"
        />
      </b-col>

      <b-col ref="blast_col" md="4" style="text-align: center">
        <b-row>
          <div style="height: 70px"></div>
        </b-row>

        <BlastImgV
          :container_width="blast_img_width * 0.95"
          :granularity="granularity_selected"
          :blast_id="blast_selected"
        />
      </b-col>
      <b-col
        md="4"
        :style="{
          height: this.main_div_height - 70 + 'px',
          overflow: 'auto',
          width: '33vw',
          'text-align': 'center',
        }"
      >
        <div style="overflow-y: auto; overflow-x: hidden">
          <b-row>
            <b-col class="no-gutters">
              <BaseParamTable
                class="base-param-table"
                v-on:table_click="table_click"
                caption="下料稳定性"
                :items="item_dict['xialiao']"
                :is-busy="isBusy"
                style="max-height: 190px; overflow-y: auto"
              />
            </b-col>
          </b-row>

          <b-row>
            <b-col class="no-gutters">
              <BaseParamTable
                class="base-param-table"
                v-on:table_click="table_click"
                caption="压量关系稳定性"
                :items="item_dict['yaliang']"
                :is-busy="isBusy"
                style="max-height: 190px; overflow-y: auto"
              />
            </b-col>
          </b-row>

          <b-row>
            <b-col class="no-gutters">
              <BaseParamTable
                class="base-param-table"
                v-on:table_click="table_click"
                caption="炉缸工况稳定性"
                :items="item_dict['lugang']"
                :is-busy="isBusy"
                style="max-height: 190px; overflow-y: auto"
              />
            </b-col>
          </b-row>

          <b-row>
            <b-col class="no-gutters">
              <BaseParamTable
                class="base-param-table"
                v-on:table_click="table_click"
                caption="操作炉型稳定性"
                :items="item_dict['luxing']"
                :is-busy="isBusy"
                style="max-height: 190px; overflow-y: auto"
              />
            </b-col>
          </b-row>

          <b-row>
            <b-col class="no-gutters">
              <BaseParamTable
                class="base-param-table"
                v-on:table_click="table_click"
                caption="煤气流分布稳定性"
                :items="item_dict['meiqi']"
                :is-busy="isBusy"
                style="max-height: 190px; overflow-y: auto"
              />
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <!-- 基本参数的趋势的模态框 -->
    <b-modal
      v-model="show_basic_param_modal"
      size="xl"
      :title="
        this.clicked_basic_param_name +
        '-' +
        this.$store.state.blast_id2_zh[this.blast_selected]
      "
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      ok-only
      centered
      ok-title="确定"
    >
      <BasicParamLine
        :basic_param_id="this.clicked_basic_param_id"
        :blast_id="this.blast_selected"
        :granularity="granularity_selected"
      />
    </b-modal>
  </div>
</template>

<script>
import BaseParamTable from "@/blast/components/BaseParamTable";
import AllSubIndexTrend from "@/blast/components/AllSubIndexTrend";
import Clock from "@/blast/components/Clock";
import BlastImgV from "@/blast/components/BlastImgV";
import BasicParamLine from "@/blast/components/BasicParamLine";
export default {
  components: {
    BaseParamTable,
    AllSubIndexTrend,
    Clock,
    BlastImgV,
    BasicParamLine,
  },
  mounted() {
    this.get_data();
    this.update_timer = setInterval(
      this.update_page_data,
      this.$store.state.update_interval
    ); //十分钟更新一次页面
    this.blast_img_width = this.$refs.blast_col.clientWidth;
    this.main_div_height = this.$refs.main_div.clientHeight;
    // console.log("main div height"+this.main_div_height)
  },
  beforeDestroy() {
    clearInterval(this.update_timer);
  },
  computed: {
    item_dict() {
      let res = {};
      let tran = function (param) {
        return {
          name: param.basicParamName,
          // "value": param.dataValue + " " + param.unit
          value: param.dataValue, //不显示单位
          id: param.basicParamId,
        };
      };
      res["xialiao"] = this.raw_data["下料稳定性"].map(tran);
      res["yaliang"] = this.raw_data["压量关系稳定性"].map(tran);
      res["lugang"] = this.raw_data["炉缸工况稳定性"].map(tran);
      res["luxing"] = this.raw_data["操作炉型稳定性"].map(tran);
      res["meiqi"] = this.raw_data["煤气流分布稳定性"].map(tran);
      return res;
    },
  },
  watch: {
    granularity_selected() {
      this.get_data();
    },
    blast_selected() {
      this.get_data();
    },
  },
  methods: {
    table_click(data) {
      this.clicked_basic_param_id = data.id;
      this.clicked_basic_param_name = data.name;
      this.show_basic_param_modal = true;
      // console.log(`接收到${data.name}`);
    },
    update_page_data() {
      this.get_data(); //更新参数值
      this.start_time = this.get_start_time();
      this.end_time = this.get_end_time();
    },
    get_data() {
      let url = "/api/get_latest_basic_param_map";
      let params = {
        blast_id: this.blast_selected,
        granularity: this.granularity_selected,
      };

      this.isBusy = true;

      this.axios
        .get(url, { params: params })
        .then((response) => {
          this.raw_data = response.data;
          this.isBusy = false;
        })
        .catch((error) => {
          console.log(error);
          alert("获取基本参数失败");
          this.isBusy = false;
        });
    },
  },
  data() {
    return {
      main_div_height: 1000,
      show_basic_param_modal: false,
      clicked_basic_param_id: "",
      clicked_basic_param_name: "",
      blast_img_width: 1,
      isBusy: false,
      granularity_selected: "hour",
      granularity_options: [
        { value: "ten_minutes", text: "十分钟" },
        { value: "hour", text: "小时" },
        { value: "class", text: "班次" },
        { value: "day", text: "天均" },
        { value: "week", text: "周均" },
      ],
      blast_selected: this.get_query_variable_blast_id(), // 从这个方法里面取默认的blastId
      start_time: this.get_start_time(), //取24小时之前的时间,
      end_time: this.get_end_time(),

      small: true, // 为了示例，假设 small 是一个布尔类型的数据属性，并设置为 true
      dark: true, // 为了示例，假设 dark 是一个布尔类型的数据属性，并设置为 false

      raw_data: {
        操作炉型稳定性: [
          {
            basicParamId: "BPI100016",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: -0.0025,
            basicParamName: "炉顶煤气氢含量偏差",
            unit: "%",
          },
          {
            basicParamId: "BPI100017",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 6871.887,
            basicParamName: "总热负荷",
            unit: "107J/h",
          },
          {
            basicParamId: "BPI100018",
            fetchTime: "2021-02-22 08:07:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "下部静压力波动次数",
            unit: "次",
          },
        ],
        压量关系稳定性: [
          {
            basicParamId: "BPI100006",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 1.0,
            basicParamName: "压差超过上限值总次数",
            unit: "次",
          },
          {
            basicParamId: "BPI100008",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 173.1344,
            basicParamName: "高炉全压差十分钟均值",
            unit: "100pa",
          },
          {
            basicParamId: "BPI100009",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 2.3976,
            basicParamName: "K值",
            unit: "/",
          },
        ],
        炉缸工况稳定性: [
          {
            basicParamId: "BPI100010",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "侧壁温度最高值",
            unit: "℃",
          },
          {
            basicParamId: "BPI100011",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "侧壁温度高温点上升最大值",
            unit: "℃",
          },
          {
            basicParamId: "BPI100012",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 1530.0,
            basicParamName: "铁水温度",
            unit: "℃",
          },
          {
            basicParamId: "BPI100013",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 0.45,
            basicParamName: "铁水含[Si]",
            unit: "%",
          },
          {
            basicParamId: "BPI100014",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "炉缸储渣量",
            unit: "t",
          },
          {
            basicParamId: "BPI100015",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 1227.168,
            basicParamName: "炉缸热负荷",
            unit: "107J/h",
          },
        ],
        煤气流分布稳定性: [
          {
            basicParamId: "BPI100020",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 50.0929,
            basicParamName: "η-co均值",
            unit: "%",
          },
          {
            basicParamId: "BPI100022",
            fetchTime: "2021-02-22 08:07:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "上部静压力波动次数",
            unit: "次",
          },
          {
            basicParamId: "BPI100024",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "炉喉钢砖温度极差",
            unit: "℃",
          },
          {
            basicParamId: "BPI100025",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "十字测温边缘四点温度极差",
            unit: "℃",
          },
          {
            basicParamId: "BPI100026",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 799.0392,
            basicParamName: "R段热负荷",
            unit: "107J/h",
          },
        ],
        下料稳定性: [
          {
            basicParamId: "BPI100001",
            fetchTime: "2021-02-22 08:00:04",
            blastId: null,
            dataValue: 41548.0,
            basicParamName: "探尺打横总次数",
            unit: "次",
          },
          {
            basicParamId: "BPI100003",
            fetchTime: "2021-02-22 08:00:00",
            blastId: null,
            dataValue: 0.0,
            basicParamName: "顶压冒尖总次数",
            unit: "次",
          },
          {
            basicParamId: "BPI100005",
            fetchTime: "2021-02-19 09:51:59",
            blastId: null,
            dataValue: 1.0,
            basicParamName: "崩滑料指数",
            unit: "次",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.form_label {
  color: rgb(255, 255, 255);
  font-size: medium;
}
</style>
