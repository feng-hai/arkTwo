<template>
<div class="tables-edit-outer">
  <div v-if="!isEditting" class="tables-edit-con">
    <span class="value-con">{{label}}</span>
    <Button v-if="editable" @click="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text"><Icon type="md-create"></Icon></Button>
  </div>
  <div v-else class="tables-editting-con">
    <div v-if="isEditType=='text'" class="tables-editting-con" style="float:left">
      <Input :value="value" @input="handleInput" style="width:150px" class="tables-edit-input" />
    </div>
    <div v-else-if="isEditType=='select'" class="tables-editting-con" style="float:left">
      <span v-if="isServer">
        <Select :value="value"  filterable  remote  :remote-method="remoteMethod" :loading="isLoading" @on-change="handleInput">
                <Option v-for="(option, index) in selectListData" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
      </span>

      <span v-else>
          <Select :value="value"   filterable   style="width:150px" @on-change="handleInput">
            <Option v-for="item in selectListData" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </span>
    </div>
    <div v-else-if="isEditType=='selectTree'" style="float:left">
      <!-- <v-select-tree :data="selectList" @node-select="handleInput" :radio="true"/> -->
      <tree-select :placeholder="params.column.title " :value="value" style="width:150px;" check-strictly :expand-all="true" @on-change="handleInput" :data="selectListData"></tree-select>
    </div>
    <div v-else-if="isEditType=='fun'" style="float:left">
      <!-- <v-select-tree :data="selectList" @node-select="handleInput" :radio="true"/> -->
      <!-- <Select ref="agency" clearable :value="value" @on-change="handleInput" :label="label" filterable remote :remote-method="remoteMethod" :loading="isLoading">
               <Option v-for="(option, index) in dataList" :value="option.value" :key="index">{{option.label}}</Option>
      </Select> -->
      <Select ref="agency1" clearable v-model="value1" @on-change="handleInput" :label="label" filterable remote :remote-method="remoteMethod" :loading="isLoading">
               <Option v-for="(option, index) in dataList" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
    </div>

    <span v-if="!allEdit">
    <Button @click="saveEdit" style="padding: 6px 4px;" type="text"><Icon type="md-checkmark"></Icon></Button>
    <Button @click="canceltEdit" style="padding: 6px 4px;" type="text"><Icon type="md-close"></Icon></Button>
  </span>
  </div>
</div>
</template>

<script>
import {
  breadthQuery
} from '@/libs/util'
import {
  getDataByParams
} from '@/api/handle'
// import {
//   getDataByParams
// } from '@/api/handle'
import TreeSelect from '_c/tree-select'
export default {
  name: 'TablesEdit',
  components: {
    TreeSelect
  },
  data() {
    return {
      isLoading: false,
      treeValue: '',
      label: '',
      funValue: '', //函数是用
      dataList: [],
      value1: '' //測試用
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
    selectList: Array,

  },
  computed: {
    selectListData() {
      if (this.dataType) {
        return this.$store.getters.getInfo(this.dataType)
      } else {
        return this.selectList
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
      return this.editType
    },
    isEditting() {
      var that = this;
      if (this.editType == 'fun' && this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}`) {

        this.$nextTick(() => {

          that.$refs['agency1'].query = this.label;
          //that.value1 = this.value;
        })
      }
      return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}` || this.allEdit
    },
    getSelectListText() {
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
        if (this.params.column.selectListFunText && typeof(this.params.column.selectListFunText) === 'function') {
          this.params.column.selectListFunText(getDataByParams, this.params, function(item) {

            that.label = item

          }, this)
        }
      }
    }
  },
  mounted() {
    this.getSelectListText;
  },
  methods: {
    remoteMethod(val) {
      var that = this;
      if (this.params.column.selectListFun && typeof(this.params.column.selectListFun) === 'function') {
        this.params.column.selectListFun(getDataByParams, val, function(item) {
          console.log(item)
          that.dataList = item
        }, this)
      }
      // if (val != this.value) {
      //   this.$emit('on-search-edit', val)
      // }
    },
    handleInput(val) {
      this.$emit('input', val, this.params)
    },
    startEdit() {

      // var that = this;
      //
      // if (this.editType == 'fun') {
      //
      //   this.$nextTick(() => {
      //     console.log(that.$refs['agency'])
      //     that.$refs['agency'].query = this.label;
      //   })
      // }

      this.$emit('on-start-edit', this.params)
    },
    saveEdit() {
      this.$emit('on-save-edit', this.params)
      // this.getSelectListText
    },
    canceltEdit() {
      this.$emit('on-cancel-edit', this.params)
    }
  },
  watch: {
    value(val, new1) {
      this.funValue = val;
      // this.treeValue = val;
      // console.log("watch", val)
      //  if (val.length != new1.length)
      //console.log("val", new1, val)
    }
  }
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
