<template>
  <div id="root">
    <div class="c-body">
      <b-container fluid>
        <transition name="fade" mode="out-in">
          <router-view :key="$route.path"></router-view>
        </transition>
      </b-container>
    </div>
  </div>
</template>

<script>
// import TheHeader from "./TheHeader";
// import TheFooter from "./TheFooter";

export default {
  components: {
    // TheHeader,
    // TheFooter
  },
};
</script>


<style>
h3,
h4 {
  color: lightgray;
  text-align: center;
}

.page_title{
  text-shadow: 0 0 10px #1c55c4,0 0 20px #1c55c4,0 0 20px #1c55c4,0 0 20px #1c55c4;
}
.light_text{
  color: lightgray;
  text-shadow: 0 0 10px #1c55c4,0 0 20px #1c55c4,0 0 20px #1c55c4,0 0 20px #1c55c4;

}


.dark_select{
  color: lightgray;
  /*text-shadow: 0 0 5px #1c55c4,0 0 5px #1c55c4,0 0 5px #1c55c4,0 0 5px #1c55c4;*/
  height: 42px;
  background: RGB(6,11,82)
}

.btn_back{
  margin-left: 30px;
  width: 50px;
  border-radius: 5px;
  box-shadow: 0 0 10px #1c55c4,0 0 5px #1c55c4,0 0 5px #1c55c4,0 0 5px #1c55c4,0 0 5px;
  /* text-shadow: 0 0 10px #1c55c4,0 0 20px #1c55c4,0 0 20px #1c55c4,0 0 20px #1c55c4,0 0 5px; */
}

.btn_back:hover{
  color: white;
  background: RGB(6,11,82);
}

.title {
  color: lightgray;
  text-align: center;
  font-size:25px;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#root {
  display: flex;
  display: -webkit-flex;
  min-height: 100vh;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;

  background: url("~@/../public/img/background_2023_12_26_1.png") no-repeat;
  background-size: 100% 100%;
  -webkit-background-origin: content-box; /*Safari */
  background-origin: content-box;

}

</style>