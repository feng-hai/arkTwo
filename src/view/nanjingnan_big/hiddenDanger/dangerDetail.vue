<template>
  <div class="dangerDetail">
    <img :src="imgUrl"  style="width: 100%;height:100px;" />
    <div class="content">
    <div>
      <span class="lef" >隐患级别:</span>
      <span class="rig">{{message.level}}</span></div>
      <div>
      <span class="lef" >隐患类型:</span>
      <span class="rig">{{message.type}}</span></div>
      <div>
      <span class="lef" >隐患描述:</span>
      <span class="rig">{{message.message}}</span></div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        imgUrl:{
            type:String,
            default:require('@/assets/images/login.jpg')
        },
        message:{
            type:Object,
            default:{
                level:'终端隐患',
                type:'生产设备',
                message:'隐患测试'
                 }
        }

    },
    data(){
        return{}
    }
}
</script>
<style lang="less">
.dangerDetail {
  .content {

    .lef {
      width: 60%;
      text-align: right;
      font-size: 10px;
    }
    .rig {
      padding-left: 10px;
      width: 40%;
      text-align: left;
    }
  }
}
</style>