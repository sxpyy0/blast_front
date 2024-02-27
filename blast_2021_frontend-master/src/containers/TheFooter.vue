<template>
  <div class="fluid-container footer">
    <p class="text-center">
      Copyright copy 2018, ABC Marketing. All Rights Reserved.
    </p>
  </div>
</template>
<script></script>
<style scoped>
div {
  color: white;
  background-color: #003459;
}

.fluid-container.footer {
  background: blue;
  width: 100%;
  height: 30px; /* footer的高度一定要是固定值*/
  position: relative ;
  bottom: 0px;
  left: 0px;
}
/* .fluid-container.footer > *:last-child {
  margin-bottom: 0px;
  color: #fff;
} */
</style>