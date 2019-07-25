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
  }
}
</script>
