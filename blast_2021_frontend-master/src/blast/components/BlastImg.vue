<template>
  <div>
    <v-stage :config="configKonva" :scaleX="scale" :scaleY="scale">
      <v-layer ref="layer">
        <v-image :config="configImage" />
        <v-text :config="configText_1" ref="text_1"></v-text>
        <v-text :config="configText_2" ref="text_2"></v-text>
        <v-text :config="configText_3" ref="text_3"></v-text>
        <v-text :config="configText_4" ref="text_4"></v-text>
        <v-text :config="configText_5" ref="text_5"></v-text>

        <v-rect :config="configRect_1" @click="click_1"></v-rect>
        <v-rect :config="configRect_2" @click="click_2"></v-rect>
        <v-rect :config="configRect_3" @click="click_3"></v-rect>
        <v-rect :config="configRect_4" @click="click_4"></v-rect>
        <v-rect :config="configRect_5" @click="click_5"></v-rect>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = 1105 / 2;
const height = 1319 / 2;

export default {
  props: {
    text: {
      default: function () {
        return ["0.98", "0.76", "0.89", "0.87", "0.96"];
      },
    },
    container_width:{
      default:569.5
    },
    text_color:{
      default(){
      return [ '#fff','#fff','#fff','#fff','#fff'];
      }
    }
  },
  name: "BlastImg",
  created() {
    const image = new window.Image();
    image.src = "img/blast3.17.png";
    image.onload = () => {
      // set image only when it is loaded
      this.image_ = image;
    };
  },
  methods: {
    click_1() {
      this.count = this.count + 1;
      this.$emit("click_1");
      console.log("click_1");
    },
    click_2() {
      this.count = this.count + 1;
      this.$emit("click_2");
      console.log("click_2");
    },
    click_3() {
      this.count = this.count + 1;
      console.log("click_3");
      this.$emit("click_3");
    },
    click_4() {
      this.count = this.count + 1;
      this.$emit("click_4");
      console.log("click_4");
    },
    click_5() {
      this.count = this.count + 1;
      console.log("click_5");
      this.$emit("click_5");
    },
  },
  computed: {
    configKonva() {
      return{
        width: width*this.scale,
        height: height*this.scale,
        fill: "red",
      }
    },
    scale(){
      if(this.container_width){
        return this.container_width/width;
      }else{
        return 1}
    },
    configImage() {
      return {
        image: this.image_,
        x: 0,
        y: 0,
        width: 1105 / 2,
        height: 1319 / 2,
      };
    },
    configRect_1() {
      let config = JSON.parse(JSON.stringify(this.rect_base_config));
      config["x"] = 40 + this.x_offset;
      config["y"] = 110 + this.y_offset;
      return config;
    },
    configRect_2() {
      let config = JSON.parse(JSON.stringify(this.rect_base_config));
      config["x"] = 430 + this.x_offset;
      config["y"] = 190 + this.y_offset;
      return config;
    },
    configRect_3() {
      let config = JSON.parse(JSON.stringify(this.rect_base_config));
      config["x"] = 40 + this.x_offset;
      config["y"] = 300 + this.y_offset;
      return config;
    },
    configRect_4() {
      let config = JSON.parse(JSON.stringify(this.rect_base_config));
      config["x"] = 435 + this.x_offset;
      config["y"] = 400 + this.y_offset;
      return config;
    },
    configRect_5() {
      let config = JSON.parse(JSON.stringify(this.rect_base_config));
      config["x"] = 40 + this.x_offset;
      config["y"] = 525 + this.y_offset;
      return config;
    },
    configText_1() {
      return {
        x: 80 + this.x_offset+10,
        y: 155 + this.y_offset,
        text: this.text[0] ,
        fontSize: this.fontSize,
        fill: this.text_color[0],
      };
    },
    configText_2() {
      return {
        x: 475 + this.x_offset+10,
        y: 230 + this.y_offset,
        text: this.text[1] ,
        fontSize: this.fontSize,
        fill: this.text_color[1],
      };
    },
    configText_3() {
      return {
        x: 80 + this.x_offset+10,
        y: 340 + this.y_offset,
        text: this.text[2] ,
        fontSize: this.fontSize,
        fill: this.text_color[2],
      };
    },
    configText_4() {
      return {
        x: 480 + this.x_offset+10,
        y: 435 + this.y_offset,
        text: this.text[3] ,
        fontSize: this.fontSize,
        fill: this.text_color[3],
      };
    },
    configText_5() {
      return {
        x: 80 + this.x_offset+10,
        y: 570 + this.y_offset,
        text: this.text[4] ,
        fontSize: this.fontSize,
        fill: this.text_color[4],
      };
    },
  },

  data() {
    return {
      count: 0,
      x_offset: -30,
      y_offset: -10,
      rect_base_config: {
        x: 40,
        y: 70,
        strokeWidth: 5,
        // fill: "RGBA(255,60,141,0.3)",
        fill: "RGBA(62,60,141,0)",

        width: 140,
        height: 75,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.2,
        cornerRadius: 10,
      },
      image_: null,
      fontSize: 25,


    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
