<template>
<div class="tree">
  <Card style="margin-top:20px">
    <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="search..." />
    <button class=" tree-search-btn" type="button" @click="search">GO</button>
    <button class=" tree-search-btn" type="button" @click="search1">GO</button>
    <v-tree ref='tree' :data='treeData1' :radio="true" :multiple="false" :halfcheck='true' />
      <v-tree ref='tree1' :data='treeData3' :radio="true" :multiple="false" :halfcheck='true' />
  </Card>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters([
      "getOrgTreeInfo"
    ])
  },
  mounted() {
    this.treeData1 = []; // this.getOrgTreeInfo;
    var that = this;
    if (this.treeData1.length == 0) {
      this.getOrgInfoAction().then(res => {
        that.treeData1 = that.getOrgTreeInfo;

      })
    }
  },
  data() {
    return {
      searchword: '',
      initSelected: ['node-1'],
      treeData1: [],
      treeData2: [{
        title: 'node1',
        expanded: false,
        async: true
      }],

      treeData3: [{
        title: 'node1',
        expanded: false,
        children: [{
          title: 'node 1-1',
          expanded: true,
          children: [{
            title: 'node 1-1-1'
          }, {
            title: 'node 1-1-2'
          }, {
            title: 'node 1-1-3'
          }]
        }]
      }]
    }
  },
  watch: {
    '$route' (to, from) {
      this.treeData1 = []; // this.getOrgTreeInfo;
      this.treeData1 = this.getOrgTreeInfo;
      var that = this;
      if (this.treeData1.length == 0) {
        this.getOrgInfoAction().then(res => {
          that.treeData1 = that.getOrgTreeInfo;

        })
      }
    }
  },
  methods: {
    ...mapActions([
      'getOrgInfoAction'

    ]),

    // tpl (node, ctx, parent, index, props) {
    tpl(...args) {
      let {
        0: node,
        2: parent,
        3: index
      } = args

      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      return <span >
        <
        button class = "treebtn1"
      onClick = {
        () => this.$refs.tree.addNode(node, {
          title: 'sync node'
        })
      } > + < /button> <
      span class = {
        titleClass
      }
      domPropsInnerHTML = {
        node.title
      }
      onClick = {
        () => {
          this.$refs.tree.nodeSelected(node)
        }
      } > < /span> <
      button class = "treebtn2"
      onClick = {
        () => this.asyncLoad(node)
      } > async < /button> <
      button class = "treebtn3"
      onClick = {
        () => this.$refs.tree.delNode(node, parent, index)
      } > delete < /button> < /
      span >
    },
    async asyncLoad(node) {
      this.$set(node, 'loading', true)
      let pro = new Promise(resolve => {
        setTimeout(resolve, 2000, ['async node1', 'async node2'])
      })
      this.$refs.tree1.addNodes(node, await pro)
      this.$set(node, 'loading', false)
    },
    search() {
      this.$refs.tree.searchNodes(this.searchword)
    },
    search1() {
      var that = this;
      that.treeData1 = that.getOrgTreeInfo;
      // this.getOrgInfoAction().then(res => {
      //
      //
      // })
    }
  }
}
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
