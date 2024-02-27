<template>
  <div style="background:rgba(25,25,112,0.7);">
    <b-table  size="sm" dark table-variant="transparent" :items="items.slice(0,2)" :fields="fields"> 
      <template #cell(actions)="">
        <b-button size="sm"  variant="success">
          查看
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [
          {
            blast_name: "宝山基地#1高炉",
            param_name: "料难行情况",
            reason: "出现料难行，注意防止悬料",
            level: 2,
            time_granularity: "小时级",
            time: "2021-2-3 17:30",
            push_module: "下料",
            // _classes: "backgroud:#fff",
          },
          {
            blast_name: "宝山基地#1高炉",
            param_name: "顶压冒尖情况",
            reason: "出现顶压冒尖，注意防止管道",
            level: 1,
            time_granularity: "小时级",
            time: "2021-2-3 17:30",
            push_module: "下料",
          },
          {
            blast_name: "#3高炉",
            param_name: "崩滑料指数",
            reason: "崩滑料指数高，注意防止炉况失常",
            level: 3,
            time_granularity: "天级",
            time: "2021-2-3 17:30",
            push_module: "下料",
          },
          {
            blast_name: "#4高炉",
            param_name: "铁水温度",
            reason: "炉温过低，注意防范炉凉",
            level: 2,
            time_granularity: "小时级",
            time: "2021-2-3 17:30",
            push_module: "炉缸工况",
          },
          {
            blast_name: "#5高炉",
            param_name: "炉缸储渣量",
            reason: "炉缸储渣过高，注意防范憋高炉及设备故障时的安全风险",
            level: 3,
            time_granularity: "十分钟级",
            time: "2021-2-3 17:30",
            push_module: "炉缸工况",
          },
        ];
      },
    },
    fields: {
      type: Array,
      default() {
        return [
          { key: "blast_name", label: "高炉名称" },
          // { key: "param_name", label: "属性名称" },
          // { key: "push_module", label: "推送模块" },
          { key: "reason", label: "异常情况" },
          { key: "time_granularity", label: "时间粒度" },
          { key: "time", label: "发生时间" },
          { key: "level", label: "报警等级" },
          {key:"actions",label:"应对措施"},
        ];
      },
    },
    caption: {
      type: String,
      default: "Table",
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>