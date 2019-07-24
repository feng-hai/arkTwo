<template>
  <div>

    <statusShow title="合肥南动车所" @on-click="turnToPage('homeForBigger')" grade="99" :list="hefeinan"></statusShow>
  </div>
</template>

<script>
import statusShow from "../components/token/index.vue";
export default {
  components: {
    statusShow

    // content
  },
  props: [
    "text" // 这里是我们刚才创建vue实例传入的props
  ]
};
</script>
