 <template>
        <div class="drag">
            <div  v-for="item in ar"  :ref="item.ref"  class="drag_box" v-drag="{set:set}">{{item.title}}</div>

        </div>
    </template>

<script>
export default {
  name: 'drag',
  data () {
    return {
      ar: [
        {
          title: '01',
          ref: 'div1'
        },
        {
          title: '02',
          ref: 'div2'
        }
      ]
    }
  },
  methods: {
    set () {
      console.log(this.$refs.div2, this.$refs.div1)
      console.log(this.$refs.div2.top, 'height of div2')
      console.log(this.$refs.div1, 'height of div1')
    }
  },
  // 注册局部组件指令
  directives: {
    drag: function (el, binding) {
      var that = this
      let dragBox = el // 获取当前元素

      dragBox.onmousedown = e => {
        // 算出鼠标相对元素的位置
        let disX = e.clientX - dragBox.offsetLeft
        let disY = e.clientY - dragBox.offsetTop
        dragBox.style.position = 'relative'
        document.onmousemove = e => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX
          let top = e.clientY - disY
          // 移动当前元素
          dragBox.style.left = left + 'px'
          dragBox.style.top = top + 'px'
          // console.log(that);
          // console.log(that.$refs.div1.offsetTop,"height of div1")
          console.log(binding, binding.value)
          binding.value.set()
        }
        document.onmouseup = e => {
          dragBox.style.position = 'static'

          // 鼠标弹起来的时候不再移动
          document.onmousemove = null
          // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null
        }
      }
    }
  }
}
</script>
    <style scoped>
    .drag {
        width: 100%;
        height: 500px;
        background-color: #fff;
        position: relative;
    }
    .drag_box {
        width: 150px;
        height: 90px;
        border: 1px solid #666;
        background-color: #ccc;
        /* 使用定位，脱离文档流 */
        position:static;
        top: 100px;
        left: 100px;
        /* 鼠标移入变成拖拽手势 */
        cursor: move;
        z-index: 3000;
    }
    </style>
