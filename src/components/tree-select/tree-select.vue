<template>
<div>
  <Input ref="treeInput" v-model="inputValue" :icon="icon" style="width: auto" v-bind="$attrs" @on-focus="openEvent" @on-click="dropdownEvent" />
  <Card v-show="isShowList" style="width: auto; position:absolute; z-index: 100; max-height:300px;  overflow-y: auto;     min-width: 200px;">
    <Input search suffix="ios-search" placeholder="分组名称" style="width: auto" @on-search="search" v-model.lazy="searchword" />
    <v-tree slot ref='tree' :data='data' label="test" :radio="true" :multiple="false" :halfcheck='true' @node-click="handleTreeSelected" />
  </Card>
</div>
</template>

<script>
import {
  breadthQuery
} from '@/libs/util'
// import Emitter from 'iview/src/mixins/emitter'
// import TreeSelectTreeItem from './tree-select-tree.vue'
export default {
  name: 'TreeSelect',
  // mixins: [Emitter],
  // components: {
  //   TreeSelectTreeItem
  // },
  props: {
    value: {
      type: [Array, String], //
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      inputValue: '',
      isShowList: false,
      icon: 'ios-arrow-down',
      selected: '',
      searchword: ''
    }
  },
  // provide() {
  //   return {
  //     parent: this
  //   }
  // },
  methods: {
    search() {
      this.$refs.tree.searchNodes(this.searchword)
    },
    openEvent() {
      this.isShowList = true;
      this.icon = "ios-arrow-up"
    },
    dropdownEvent() {
      this.isShowList = !this.isShowList;
      if (this.isShowList) {
        this.icon = "ios-arrow-up"
      } else {
        this.icon = "ios-arrow-down"
          this.setTitle(this.selected)
      }

    },

    handleTreeSelected(node) {
      this.$emit('on-change', node.id)
      //  this.$refs["treeInput"].value=node.title;
      this.inputValue = node.title;
      this.selected = node.id;
      this.close();
    },
    close() {
      this.isShowList = false
      this.icon = "ios-arrow-down"
      this.setTitle(this.selected)
    },
    setTitle(value) {
      if (value) {
        var node = breadthQuery(this.data, value)
        if (node) {
          this.inputValue = node.title;
        } else {
          this.inputValue = "";
        }
      }
    }
  },
  watch: {
    // value(newValue, oldValue) {
    //   console.log("newValue", newValue);
    //   if (newValue != oldValue)
    //     var node = this.breadthQuery(this.data, newValue)
    //   if (node) {
    //     this.inputValue = node.title;
    //   } else {
    //     this.inputValue = "";
    //   }
    // }
  },
  mounted() {
    var that = this;
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.close();

      }
    })
    this.selected = this.value;
    this.setTitle(this.value)
  }
}
</script>

<style lang="less">
.tree-select {
    .ivu-select-dropdown {
        padding: 0 6px;
    }
}
</style>
