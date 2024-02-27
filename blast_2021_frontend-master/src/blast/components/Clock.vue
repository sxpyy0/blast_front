<template>
  <div class="timer light_text"  style="text-align: right">
    {{curTime}}
  </div>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      curTime: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
    }
  },
  methods: {
    update_time() {
      this.curTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted() {
    this.timer = setInterval(this.update_time, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>
.timer{
  color: lightgray;
  font-size: 20px;
  margin-right:2vw;
  font-family: LED_font;
}


@font-face {
  font-family: LED_font;

  src: url('~@/../public/font/LCD.TTF');

  /*src: url('~@/../public/font/led16sgmnt2-Regular.ttf');*/
}
</style>