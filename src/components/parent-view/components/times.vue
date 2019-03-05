<template>
<div class="clock">
  <p>{{nowTime}}</p>
</div>
</template>
<script>
export default {
  name: 'showCurrentTime',
  data() {
    return {
      nowTime: '',
      timer: ''
    }
  },

  methods: {
    // 获取当前时间函数
    timeFormate(timeStamp) {

      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm + ":" + ss;
      // console.log(this.nowTime);
    },
    setTimer: function() {
      var that = this;　　　　
      this.timer = setInterval(() => {　　
        console.log("times");　　　　　
        that.timeFormate(new Date())　　　
      }, 1000)　　
    }
  },
  // 挂载完成时
  mounted() {
    this.setTimer();
  },
  distroyed: function() {　　
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
.count-style {
    font-size: 50px;
}
.clock {
    width: 300px;
    color: white;
    // font-style: italic;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    font-family: "SimHei";
}
</style>
