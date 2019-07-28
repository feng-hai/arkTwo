<template>
<div class="template-page backImage" >
  <p>
    <i> 图标</i><span>{{title}}</span>
  </p>
  <div class="conten">
    <div class="conten-left">
      <span>98</span>
    </div>
    <ul class="conten-rig">
      <li v-for="(item , index) in list" :key="index">
        <span class="lef" :style="{color:item.color}">{{item.num}}</span> <span class="rig">{{item.name}}</span>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    turnToPage() {
      console.log("turnToPage")
      this.$emit("on-click");
    }
  },
  data() {
    return {
      title: '文字标题',
      list: [{
          color: '#5bf4fd',
          num: 123,
          name: '正常'
        },
        {
          color: '#ff5050',
          num: 123,
          name: '故障'
        },
        {
          color: '#ff9900',
          num: 13,
          name: '报警'
        },
        {
          color: '#678af2',
          num: 3,
          name: '屏蔽'
        },
      ]
    }
  }
}
</script>
<style lang="scss" >
.template-page {
    background-color: rgba(24,35,50,0.2);
    padding: 15px;
    p {
        padding-bottom: 10px;
        text-align: left;
        i {
            font-size: 14px;
            color: #5bf4fd;
        }
        span {
            font-size: 14px;
            color: #fff;
            padding-left: 8px;
        }
    }
    .conten {
        display: flex;
        justify-content: center;
        align-items: center;
        ul.conten-rig {
            flex: 1;
            li {
                line-height: 38px;
                span {
                    color: #fff;
                    font-size: 14px;
                    display: inline-block;
                }
                .lef {
                    width: 60%;
                    text-align: right;
                    font-size: 26px;
                }
                .rig {
                    padding-left: 10px;
                    width: 40%;
                    text-align: left;
                }
            }
        }
    }
}
.conten-left {
    height: 103px;
    background: url("./122.png") no-repeat center;
    span {
        color: #5bf4fd;
        font-size: 40px;
        line-height: 103px;
        text-align: center;
    }
}
.conten div {
    width: 160px;
    text-align: center;
}
</style>
