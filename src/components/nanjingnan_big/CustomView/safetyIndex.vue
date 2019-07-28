<template>
  <div>
    <statusShow title="合肥南动车所" grade="99" ></statusShow>
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
