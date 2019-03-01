<template>
<div style="float:left">
  <div v-if="isEditType=='text'" class="tables-editting-con" style="margin-right:5px">
    <Input :value="value" @input="handleInput" :placeholder="params.column.title " class="tables-edit-input" />
  </div>
  <div v-else-if="isEditType=='selectTree'" style="margin-right:5px" >
    <!-- <v-select-tree :data="selectList" @node-select="handleInput" :radio="true" /> -->
     <tree-select  v-model="treeValue"  :placeholder="params.column.title " check-strictly :expand-all="true" @on-change="handleInput" :data="selectList"></tree-select>
  </div>
  <div v-else class="tables-editting-con" style="margin-right:5px">
    <span v-if="isServer">
      <Select :value="value" :placeholder="params.column.title "   filterable  remote  :remote-method="remoteMethod" :loading="isLoading" @on-change="handleInput">
              <Option v-for="(option, index) in selectList" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
    </span>
    <span v-else>
        <Select :value="value" :placeholder="params.column.title "   filterable   @on-change="handleInput">
          <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </span>
  </div>
</div>
</template>

<script>
// import {
//   getDataByParams
// } from '@/api/handle'
import TreeSelect from '_c/tree-select'
export default {
  name: 'search',
  components: {
    TreeSelect
  },
  data () {
    return {
      isLoading: false,
      treeValue: ''
    }
  },
  props: {
    value: [String, Number],
    edittingCellId: String,
    allEdit: Boolean,
    params: Object,
    selectList: {
      type: Array,
      default () {
        return []
      }
    }

  },
  computed: {
    isServer () {
      return this.params.column.isServer
    },
    isEditType () {
      return this.params.column.editType
    },
    isEditting () {
      // return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}` || this.allEdit
    },
    getSelectListText () {
      if (this.params.column.editType == 'text') {
        return this.value
      } else {
        let text = '没有匹配项目'
        for (var index in this.selectList) {
          var item = this.selectList[index]
          if (this.value == item.value) {
            text = item.label
            break
          }
        }
        return text
      }
    }
  },
  methods: {
    remoteMethod (val) {
      if (val != this.value) {
        this.$emit('on-search-edit', val)
      }
    },
    handleInput (val) {
      console.log('input', val)
      this.$emit('input', val, this.params)
    },
    startEdit () {
      this.$emit('on-start-edit', this.params)
    },
    saveEdit () {
      console.log('value', this.value)
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
