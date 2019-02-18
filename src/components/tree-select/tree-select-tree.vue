<template>
<Tree :data="data" @on-check-change="handleCheckSelect" @on-select-change="handleSelectClick" v-on="parent.$listeners" v-bind="parent.$attrs" :load-data="loadDataCallback" :show-checkbox="isCheck"></Tree>
</template>

<script>
import Emitter from 'iview/src/mixins/emitter.js'

const arrayEqual = (arr1, arr2) => {
  // 判断数组的长度
  if (arr1.length !== arr2.length) {
    return false
  } else {
    // 循环遍历数组的值进行比较
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }
    return true
  }
}

export default {
  name: 'TreeSelectTree',
  mixins: [Emitter],
  props: {
    data: {
      type: [Array, String],
      default: () => []
    },
    selectedArray: {
      type: [Array, String],
      default: () => []
    },
    isCheck: {
      type: Boolean,
      default: () => true
    },
    loadData: Function
  },
  data() {
    return {
      flatDic: {},
      checkedArray: []
    }
  },
  inject: ['parent'],
  computed: {
    expandAll() {
      return this.parent.$attrs['expand-all']
    }
  },
  watch: {
    data(newData, oldVal) {

      this.updateFlagDic(newData)
      let selectArray = []
      if (typeof this.selectedArray == "string") {
        if (this.selectedArray in this.flatDic)
          selectArray.push(this.selectedArray)
      } else {
        this.selectedArray.forEach(id => {
          if (id in this.flatDic) selectArray.push(id)
        })
      }
      this.$emit('on-check', selectArray.map(id => this.flatDic[id]));
      if (this.expandAll) this.checkData(newData, false, true)

    },
    selectedArray(newVal, oldVal) {
      if (this.isCheck) {
        if (arrayEqual(newVal, oldVal)) return
        const filtedNewVal = newVal.filter(id => id in this.flatDic)
        this.$emit('on-check', filtedNewVal.map(id => this.flatDic[id]))
        this.$emit('on-clear')
        this.$nextTick(() => {
          this.checkData(this.data, true)
        })
      } else {
        if (arrayEqual(newVal, oldVal)) return
        if (typeof newVal == "string") {
          newVal = [newVal]
        }


        const filtedNewVal = newVal.filter(id => id in this.flatDic)
        this.$emit('on-check', filtedNewVal.map(id => this.flatDic[id]))
        this.$emit('on-clear')
        this.$nextTick(() => {
          this.checkData(this.data, true)
        })
      }
    }
  },
  methods: {
    checkEmit(value, label) {
      this.dispatch('iSelect', 'on-select-selected', {
        value,
        label
      })
      this.$emit('on-select-selected', {
        value,
        label
      })
    },
    updateFlagDic(newData) {
      let newFlagDic = {}
      this.setFlagDic(newData, item => {
        newFlagDic[item.id] = item
      })
      this.flatDic = newFlagDic
    },
    setFlagDic(data, callback) {
      data.forEach(item => {
        if (item.children && item.children.length) {
          this.setFlagDic(item.children, callback)
        }
        callback(item)
      })
    },
    handleSelectClick(selectArray, selectItem) {
      if (!this.isCheck) {
        console.log(selectArray)
        this.$emit('on-check', selectArray)
        this.parent.$emit('on-change', selectArray)
      }

    },
    handleCheckSelect(selectArray, selectItem) {
      if (this.isCheck) {
        this.$emit('on-check', selectArray)
        this.parent.$emit('on-change', selectArray)
      }
    },
    checkData(data, emit, expandAll) {
      data.forEach(item => {
        if (this.selectedArray.includes(item.id)) {
          this.$set(item, 'checked', true)
          this.checkedArray.push(item)
          if (emit) this.checkEmit(item.id, item.title)
        } else this.$set(item, 'checked', false)
        if (item.children && item.children.length) {
          if (this.expandAll && expandAll) this.$set(item, 'expand', true)
          this.checkData(item.children, emit, expandAll)
        }
      })
    },
    loadDataCallback(item, callback) {
      this.loadData(item, data => {
        return (() => {
          callback(data)
          this.updateFlagDic(this.data)
        })(data)
      })
    }
  },
  mounted() {
    this.checkData(this.data, false, true)
    this.$nextTick(() => {
      this.$emit('on-check', this.checkedArray)
    })
  }
}
</script>

<style></style>
