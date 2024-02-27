import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    blast_list_options: [
        {value: "BF001", text: "宝山1号高炉", disabled: false},
        {value: "BF002", text: "宝山2号高炉", disabled: false},
        {value: "BF003", text: "宝山3号高炉", disabled: false},
        {value: "BF004", text: "宝山4号高炉", disabled: false},
        {value: "BF005", text: "东山1号高炉", disabled: false},
        {value: "BF006", text: "东山2号高炉", disabled: false},
        {value: "BF007", text: "东山3号高炉", disabled: false},
        {value: "BF008", text: "梅山2号高炉", disabled: false},
        {value: "BF009", text: "梅山4号高炉", disabled: false},
        {value: "BF010", text: "梅山5号高炉", disabled: false},
        {value: "BF011", text: "青山4号高炉", disabled: false},
        {value: "BF012", text: "青山5号高炉", disabled: false},
        {value: "BF013", text: "青山6号高炉", disabled: false},
        {value: "BF014", text: "青山7号高炉", disabled: false},
        {value: "BF015", text: "青山8号高炉", disabled: false},
    ],
    blast_id2_zh: {
        "BF001": "宝山1号高炉",
        "BF002": "宝山2号高炉",
        "BF003": "宝山3号高炉",
        "BF004": "宝山4号高炉",
        "BF005": "东山1号高炉",
        "BF006": "东山2号高炉",
        "BF007": "东山3号高炉",
        "BF008": "梅山2号高炉",
        "BF009": "梅山4号高炉",
        "BF010": "梅山5号高炉",
        "BF011": "青山4号高炉",
        "BF012": "青山5号高炉",
        "BF013": "青山6号高炉",
        "BF014": "青山7号高炉",
        "BF015": "青山8号高炉",
    },
    granularity_options: [
        {value: "ten_minutes", text: "十分钟"},
        {value: "hour", text: "小时"},
        {value: "class", text: "班次"},
        {value: "day", text: "天均"},
        {value: "week", text: "周均"},
    ],
    granularity_str2zh: {
        "ten_minutes": "十分钟",
        "hour": "小时",
        "class": "班次",
        "day": "天均",
        "week": "周均"
    },
    update_interval:1000*60*10
}

const mutations = {
    set(state, [variable, value]) {
        state[variable] = value
    }
}

export default new Vuex.Store({
    state,
    mutations
})