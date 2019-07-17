<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :autoSize="true"
    :margin="[10, 10]"
    :use-css-transforms="true"
  >
    <Button type="dashed" @click="addWidgets" style="margin-left:10px;">新增</Button>
    <Button type="dashed" @click="saveWidgets" style="margin-left:10px;">保存</Button>

    <grid-item
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
    >
      <!-- {{item.i}} -->
      <div :id="'page'+item.i" style="height:100%"></div>
    </grid-item>
  </grid-layout>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
import panel from '../CustomView/panel'
import createMessage from '../CustomView/container.js'
var testLayout = [
  { x: 0, y: 0, w: 2, h: 4, i: '0', title: '自定义', component: 'demo' },
  { x: 2, y: 0, w: 2, h: 4, i: '1', title: '自定义' },
  { x: 4, y: 0, w: 2, h: 5, i: '2' },
  { x: 6, y: 0, w: 2, h: 3, i: '3' },
  { x: 8, y: 0, w: 2, h: 3, i: '4' },
  { x: 10, y: 0, w: 2, h: 3, i: '5' },
  { x: 0, y: 5, w: 2, h: 5, i: '6' },
  { x: 2, y: 5, w: 2, h: 5, i: '7' },
  { x: 4, y: 5, w: 2, h: 5, i: '8' },
  { x: 6, y: 3, w: 2, h: 4, i: '9' },
  { x: 8, y: 4, w: 2, h: 4, i: '10' },
  { x: 10, y: 4, w: 2, h: 4, i: '11' },
  { x: 0, y: 10, w: 2, h: 5, i: '12' },
  { x: 2, y: 10, w: 2, h: 5, i: '13' },
  { x: 4, y: 8, w: 2, h: 4, i: '14' },
  { x: 6, y: 8, w: 2, h: 4, i: '15' },
  { x: 8, y: 10, w: 2, h: 5, i: '16' },
  { x: 10, y: 4, w: 2, h: 4, i: '17' },
  { x: 0, y: 9, w: 2, h: 4, i: '18' },
  { x: 2, y: 6, w: 2, h: 4, i: '19' }
]
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    panel: panel
  },
  data () {
    return {
      layout: testLayout,
      controls: [
        {
          id: 1,
          controlId: 'panel1',
          containId: 'containId1'
        },
        {
          id: 2,
          controlId: 'panel2',
          containId: 'containId2'
        }
      ]
    }
  },
  methods: {
    saveWidgets () {
      console.log(this.layout)
      localStorage.setItem('layout', JSON.stringify(this.layout))
      this.$Notice.success({
        title: '提示信息',
        desc: '保存成功'
      })
    },
    addWidgets () {
      var len = this.layout.length
      this.layout.push({ x: 0, y: 0, w: 2, h: 4, i: this.layout.length })
      console.log(this.layout)
      this.$nextTick(function () {
        this.createControl({
          id: len,
          controlId: 'panel' + len,
          containId: 'containId' + len
        })
      })
    },
    remove (j) {
      // 删除控件
      var index = -1
      for (var i = 0; i < this.layout.length; i++) {
        if (this.layout[i].i == j) {
          this.layout.splice(i, 1)
          break
        }
      }
      // this.layout.forEach(function(value, i) {
      // var item = {
      //   id: value.i,
      //   controlId: "panel" + value.i,
      //   containId: "containId" + value.i
      // };
      // that.createControl(item);
      // });
    },
    save (option) {
      console.log(option, 'save')
      var that = this

      for (var i = 0; i < this.layout.length; i++) {
        if (this.layout[i].i == option.id) {
          this.layout[i].title = option.title
          this.layout[i].component = option.component
          break
        }
      }
      console.log(this.layout, 'saved')
    },
    createControl (item) {
      var that = this
      this.$nextTick(function () {
        createMessage({
          id: 'page' + item.id,
          controlId: item.controlId,
          control: panel,
          props: {
            containId: item.containId,
            title: item.title ? item.title : '自定义' + item.id,
            component: item.component
          },
          remove: that.remove,
          save: that.save
        })
      })

      // createMessage({
      //     id:'2',
      //     controlId:'panel02',
      //     control:panel,
      //     props: {
      //         containId:'contain01'
      //     }
      // });
    }
  },
  mounted () {
    var that = this
    var tempLayout = localStorage.getItem('layout')
    console.log(tempLayout)

    if (tempLayout) {
      this.layout = JSON.parse(tempLayout)
      console.log('init', this.layout)
    }
    this.$nextTick(function () {
      this.layout.forEach(function (value, i) {
        var item = {
          id: value.i,
          controlId: 'panel' + value.i,
          containId: 'containId' + value.i,
          title: value.title,
          component: value.component
        }
        that.createControl(item)
      })
    })
  }
}
</script>
