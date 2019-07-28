/*
 * @Descripttion: 控件的容器，用户写好的控件通过此容器添加到面板上。
 * @version: 0.1
 * @Author: fh
 * @Date: 2019-06-29 12:50:02
 * @LastEditors: fh
 * @LastEditTime: 2019-07-28 08:37:46
 */

import Vue from 'vue'
import store from '@/store'

const createMessage = (options) => {
  // var obj = document.getElementById(options.id);
  // console.log(obj)
  // if(obj){
  //  obj.innerHTML = "";//删除div内容
  // 　　//删除div
  // 　　var parentObj = obj.parentNode;//获取div的父对象
  // 　　parentObj.removeChild(obj);//通过div的父对象把它删除
  // }
  // 获取body并且创建一个新的div节点
  let body = document.getElementById(options.id),
    bindPhone = document.createElement('div')
  if (body.innerHTML) {
  //  if( this.$refs['ref-'+options.id]){
  //    console.log("找到老的组件")
  //  }
    body.innerHTML = '' // 删除div内容
  }
  // 给创建的div设置id=message，并且添加到body后
  bindPhone.setAttribute('id', options.controlId)
  body.appendChild(bindPhone)
  console.log(options.props, '创建代码')
  // 这里我们return一个新的Vue实例并且将实例挂载到我们刚创建的DOM节点上
  return new Vue({
    store,
    render: (h) => {
      return h(
        options.control, {
          props: options.props,
          // attrs: {
          //   ref: 'ref-'+options.id
          // },
          on: {
            remove: function (event) { // 定义remove方法，用于调用删除功能
              console.log(options.id)
              if (options.remove) {
                options.remove(event)
              }
            },
            save: function (option) {
              if (options.save) {
                options.save(option)
              }
            },
            click: function (option, type) {
              if (options.click) {
                options.click(option, type)
              }
            }
          }
        }
      )
    }
  }).$mount('#' + options.controlId)
}

export default createMessage
