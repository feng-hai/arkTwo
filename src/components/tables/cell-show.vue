<template>
<div class="tables-edit-outer">

  <div v-if="!istooltip">
    <div v-if="!isEditting" class="tables-edit-con">
      <a v-if="isLink" v-on:click="turnTo">    <span class="value-con" v-html="label"></span></a>
      <span v-else class="value-con" v-html="label.length>40?label.substring(0, 13) + '.....':label"></span>
      <!-- <Button v-if="editable" @click="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text"><Icon type="md-create"></Icon></Button> -->
    </div>
  </div>
  <Tooltip v-else placement="bottom-end">

    <div v-if="!isEditting" class="tables-edit-con">
      <a v-if="isLink" v-on:click="turnTo">    <span class="value-con" v-html="label"></span></a>
      <span v-else class="value-con" v-html="label.length>40?label.substring(0, 13) + '.....':label"></span>
      <!-- <Button v-if="editable" @click="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text"><Icon type="md-create"></Icon></Button> -->
    </div>
    <div slot="content" style="white-space: normal;">
      {{label}}
    </div>
  </Tooltip>
  <!-- <div v-else class="tables-editting-con">
    <div v-if="isEditType" class="tables-editting-con" style="float:left">
      <Input :value="value" @input="handleInput" style="width:150px" class="tables-edit-input" />
    </div>
    <div v-else class="tables-editting-con" style="float:left">
      <span v-if="isServer">
        <Select :value="value"  filterable  remote  :remote-method="remoteMethod" :loading="isLoading" @on-change="handleInput">
                <Option v-for="(option, index) in selectList" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
      </span>
      <span v-else>
          <Select :value="value"   filterable   style="width:150px" @on-change="handleInput">
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </span>
    </div>
    <span v-if="!allEdit">
    <Button @click="saveEdit" style="padding: 6px 4px;" type="text"><Icon type="md-checkmark"></Icon></Button>
    <Button @click="canceltEdit" style="padding: 6px 4px;" type="text"><Icon type="md-close"></Icon></Button>
  </span>
  </div> -->
</div>
</template>

<script>
import {
  getDataByParams
} from '@/api/handle'
import {
  breadthQuery,
  toJson
} from '@/libs/util'
export default {
  name: 'TablesEdit',
  data() {
    return {
      isLoading: false,
      label: ''
    }
  },
  props: {
    value: [String, Number, Boolean, Object],
    edittingCellId: String,
    allEdit: Boolean,
    params: Object,
    editable: Boolean,
    editType: String,
    dataType: String,
    selectList: Array

  },
  mounted() {;
    this.getSelectListText()
  },
  computed: {
    istooltip() {
      return this.params.column.tooltip;
    },
    isLink() {
      return (this.params.column.linkFun && typeof(this.params.column.linkFun) === 'function')
    },

    selectListData() {
      if (this.dataType) {
        return this.$store.getters.getInfo(this.dataType)
      } else {
        return selectList
      }
    },

    // isLoading(){
    //   console.log(this.params.column.isLoading)
    //     return this.params.column.isLoading?true:false
    // },
    isServer() {
      return this.params.column.isServer
    },
    isEditType() {
      return this.editType === 'text'
    },
    isEditting() {
      return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}` || this.allEdit
    }

  },
  methods: {
    turnTo() {
      if (this.params.column.linkFun && typeof(this.params.column.linkFun) === 'function') {
        this.params.column.linkFun(getDataByParams, this.params, function() {}, this)
      }
    },
    getSelectListText() {
      var that = this;
      if (this.editType == 'text') {
        if (this.value == '') {
          return '空'
        }
        if (this.params.column.formateFun && typeof(this.params.column.formateFun) === 'function') {
          var that = this
          this.params.column.formateFun(getDataByParams, this.value, function(item) {
            that.label = item
          }, this)
        } else {
          this.label = this.value
        }
      }
      // else if (this.params.column.selectListFunText && typeof(this.params.column.selectListFunText) === 'function') {
      //   console.log(this.params,"params")
      //   this.params.column.selectListFunText(getDataByParams, this.params, function(item) {
      //     // console.log(item)
      //     that.label = item
      //   }, this)
      // }
      else if (this.editType == 'date') {
        if (this.value == '') {
          this.label = '空'
          return
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

        if (this.params.column.selectListFunText && typeof(this.params.column.selectListFunText) === 'function') {
          this.params.column.selectListFunText(getDataByParams, this.params, function(item) {
            // console.log(item)

            that.label = item
          }, this)
        }
      }
    },
    getData() {
      return getDataByParams
    },
    remoteMethod(val) {
      if (val != this.value) {
        this.$emit('on-search-edit', val)
      }
    },
    handleInput(val) {
      this.$emit('input', val, this.params)
    },
    startEdit() {
      this.$emit('on-start-edit', this.params)
    },
    saveEdit() {
      this.$emit('on-save-edit', this.params)
      // this.getSelectListText
    },
    canceltEdit() {
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
