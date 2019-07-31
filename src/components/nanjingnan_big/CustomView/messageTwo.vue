<template>
  <div>{{ text }}。。。</div>
</template>

<script>
export default {
  props: [
    'text' // 这里是我们刚才创建vue实例传入的props
  ],
  beforeDestroy(){
    console.log("destroyed")
  }, mounted(){
    console.log("订阅事件02")
    this.$store.on("test",function(){
      console.log("触发了test事件")
    })
  }
}
</script>
