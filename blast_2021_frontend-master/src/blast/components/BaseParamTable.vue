<template>
  <div>
    <p class="title" style="font-size: 138%; color: lightgray">{{ caption }}</p>
    <div
      style="background: rgba(25, 25, 112, 0.7); font-size: 115%; color: orange"
    >
      <b-table
        :busy="isBusy"
        dark
        caption-top
        striped
        table-variant="transparent"
        :items="items_2"
        :fields="fields_2"
        small
      >
        <template #cell(value_1)="data">
          <div @click="table_click(data, 1)">
            {{ dataFormatter(data.item.value_1, data.item.name_1) }}
          </div>
        </template>

        <template #cell(value_2)="data">
          <div @click="table_click(data, 2)">
            {{ dataFormatter(data.item.value_2, data.item.name_2) }}
          </div>
        </template>

        <template #cell(name_1)="data">
          <div @click="table_click(data, 1)">{{ data.item.name_1 }}</div>
        </template>

        <template #cell(name_2)="data">
          <div @click="table_click(data, 2)">{{ data.item.name_2 }}</div>
        </template>

        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{ width: field.key.includes('value') ? '180px' : '200px' }"
          />
        </template>
        <template #table-busy>
          <div class="text-center text-info my-1">
            <b-spinner small class="align-middle"></b-spinner>
            <strong>加载中</strong>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      default: "参数值",
    },
    isBusy: {
      default: false,
    },
    items: {
      default: function () {
        return [
          {
            name: "K值",
            value: "1",
            id: "id1",
          },
        ];
      },
    },
  },
  computed: {
    items_2() {
      let res = [];
      let i = 1;
      for (; i < this.items.length; i += 2) {
        res.push({
          name_1: this.items[i - 1]["name"],
          name_2: this.items[i]["name"],
          value_1: this.items[i - 1]["value"],
          value_2: this.items[i]["value"],
          id_1: this.items[i - 1]["id"],
          id_2: this.items[i]["id"],
        });
      }
      //最后一行
      if (this.items.length % 2 !== 0) {
        res.push({
          name_1: this.items[this.items.length - 1]["name"],
          name_2: "",
          value_1: this.items[this.items.length - 1]["value"],
          value_2: "",
          id_1: this.items[i - 1]["id"],
          id_2: "",
        });
      }
      return res;
    },
  },
  methods: {
    dataFormatter(value, name) {
      if (name === "") {
        //最后一行的空位置的value是字符类型，不能用toFIxed
        return "";
      }
      if (
        name.indexOf("温度") !== -1 ||
        name.indexOf("热负荷") !== -1 ||
        name.indexOf("鼓风动能") !== -1
      ) {
        return value.toFixed(0);
      } else {
        return value.toFixed(2);
      }
    },
    table_click(data, col_index) {
      // console.log(data)
      if (col_index === 1) {
        console.log(data.item.name_1);
        console.log(data.item.id_1);
        this.$emit("table_click", {
          id: data.item.id_1,
          name: data.item.name_1,
        });
      } else if (col_index === 2) {
        console.log(data.item.name_2);
        console.log(data.item.id_2);
        this.$emit("table_click", {
          id: data.item.id_2,
          name: data.item.name_2,
        });
      }
    },
  },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "属性名",
          tdClass: "name_style",
          thClass: "hidden_header",
        },
        {
          key: "value",
          label: "当前值",
          tdClass: "value_style",
          thClass: "hidden_header",
        },
      ],
      fields_2: [
        {
          key: "name_1",
          label: "属性名",
          tdClass: "name_style",
          thClass: "hidden_header",
        },
        {
          key: "value_1",
          label: "当前值",
          tdClass: "value_style",
          thClass: "hidden_header",
        },
        {
          key: "name_2",
          label: "属性名",
          tdClass: "name_style",
          thClass: "hidden_header",
        },
        {
          key: "value_2",
          label: "当前值",
          tdClass: "value_style",
          thClass: "hidden_header",
        },
      ],
    };
  },
};
</script>

<style scoped>
.th_style {
  color: lightgray;
}

.value_style {
  color: lightyellow;
}

.name_style {
  color: lightblue;
}

.hidden_header {
  display: none;
}
</style>
