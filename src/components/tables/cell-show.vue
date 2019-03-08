<template>
<div class="tables-edit-outer">
  <div v-if="!isEditting" class="tables-edit-con">
    <span class="value-con">{{label}}</span>
  </div>

</div>
</template>

<script>
import {
  getDataByParams
} from '@/api/handle'
import {
  breadthQuery
} from '@/libs/util'
export default {
  name: 'TablesEdit',
  data () {
    return {
      isLoading: false,
      label: ''
    }
  },
  props: {
    value: [String, Number, Boolean],
    edittingCellId: String,
    allEdit: Boolean,
    params: Object,
    editable: Boolean,
    editType: String,
    dataType: String,
    selectList: Array

  },
  mounted () {
    this.getSelectListText()
  },
  computed: {
    selectListData () {
      if (this.dataType) {
        this.$store.getters.getInfo(this.dataType)
      } else {
        return selectList
      }
    },
    // isLoading(){
    //   console.log(this.params.column.isLoading)
    //     return this.params.column.isLoading?true:false
    // },
    isServer () {
      return this.params.column.isServer
    },
    isEditType () {
      return this.editType === 'text'
    },
    isEditting () {
      return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}` || this.allEdit
    }

  },
  methods: {
    getSelectListText () {
      if (this.editType == 'text') {
        if (this.value == '') {
          return '空'
        }
        this.label = this.value
      } else if (this.editType == 'select') {
        let text = '没有匹配项目'
        for (var index in this.selectListData) {
          var item = this.selectListData[index]
          if (this.value == item.value) {
            text = item.label
            break
          }
        }
        this.label = text
      } else if (this.editType == 'selectTree') {
        let text = '没有匹配项目'
        var node = breadthQuery(this.selectListData, this.value)
        if (node) {
          text = node.title
        }
        this.label = text
      } else if (this.editType == 'fun') {
        var that = this
        if (this.params.column.selectListFun && typeof (this.params.column.selectListFun) === 'function') {
          this.params.column.selectListFun(getDataByParams, this.params, function (item) {
            console.log(item)
            that.label = item
          }, this)
        }
      }
    },
    getData () {
      return getDataByParams
    },
    remoteMethod (val) {
      if (val != this.value) {
        this.$emit('on-search-edit', val)
      }
    },
    handleInput (val) {
      this.$emit('input', val, this.params)
    },
    startEdit () {
      this.$emit('on-start-edit', this.params)
    },
    saveEdit () {
      this.$emit('on-save-edit', this.params)
      // this.getSelectListText
    },
    canceltEdit () {
      this.$emit('on-cancel-edit', this.params)
    }
  }
  //,
  // watch: {
  //   selectList(val, new1) {
  //     //  if (val.length != new1.length)
  //     //console.log("val", new1, val)
  //   }
  // }
}
</script>

<style lang="less">
.tables-edit-outer {
    height: 100%;
    .tables-edit-con {
        position: relative;
        height: 100%;
        .value-con {
            vertical-align: middle;
        }
        .tables-edit-btn {
            position: absolute;
            right: 10px;
            top: 0;
            display: none;
        }
        &:hover {
            .tables-edit-btn {
                display: inline-block;
            }
        }
    }
    .tables-editting-con {
        .tables-edit-input {
            width: ~"calc(100% - 60px)";
        }
    }
}
</style>
