<template>
  <div>
    <!-- <b-row>
    <CircleGroup :circle_data="data3"/> 
    </b-row>

    <b-row><CircleGroup :circle_data="data4" /></b-row> -->
    <b-row><CircleGroup :circle_data="data5" /></b-row>

  </div>
</template>

<script>
import CircleGroup from "@/echarts/CircleGroup";

export default {
  components: {
    CircleGroup,
  },
  data() {
    return {
      data3: [
        {
          name: "1#",
          value: 0.85,
        },
        {
          name: "2#",
          value: 0.75,
        },
        {
          name: "3#",
          value: 0.5,
        },
      ],
      data4: [
        {
          name: "1#",
          value: 0.85,
        },
        {
          name: "2#",
          value: 0.75,
        },
        {
          name: "3#",
          value: 0.5,
        },
        {
          name: "4#",
          value: 0.2,
        },
      ],
      data5: [
        {
          name: "1#",
          value: 0.85,
        },
        {
          name: "2#",
          value: 0.75,
        },
        {
          name: "3#",
          value: 0.5,
        },
        {
          name: "4#",
          value: 0.2,
        },
        {
          name: "5#",
          value: 0.9,
        },
      ],
    };
  },
};
</script>

<style>
</style>