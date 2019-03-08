<template>
<div class="tables-edit-outer">
  <div v-if="!isEditting" class="tables-edit-con">
    <span class="value-con">{{label}}</span>
    <!-- <Button v-if="editable" @click="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text"><Icon type="md-create"></Icon></Button> -->
  </div>
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
    value: [String, Number, Boolean,Object],
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
        for (var index in this.selectList) {
          var item = this.selectList[index]
          if (this.value == item.value) {
            text = item.label
            break
          }
        }
        this.label = text
      } else if (this.editType == 'selectTree') {
        let text = '没有匹配项目'
        var node = breadthQuery(this.selectList, this.value)
        if (node) {
          text = node.title
        }
        this.label = text
      } else if (this.editType == 'fun') {
        var that = this

        if (this.params.column.selectListFunText && typeof (this.params.column.selectListFunText) === 'function') {
          this.params.column.selectListFunText(getDataByParams, this.params, function (item) {
            //console.log(item)

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
