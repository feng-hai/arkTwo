<template>
<div class="tree">
  <Card style="margin-top:20px">
    <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="search..." />
    <button class=" tree-search-btn" type="button" @click="search">搜索</button>
    <v-tree ref='tree' :data='treeData1' :radio="true" :multiple="false" :halfcheck='true' />
      <!-- <v-tree ref='tree1' :data='treeData3' :radio="true" :multiple="false" :halfcheck='true' /> -->
  </Card>
</div>
</template>

<script>
// import {
//   mapActions,
//   mapGetters,
//   mapState
// } from 'vuex'
export default {
  name: 'HelloWorld',
  computed: {
    // ...mapGetters([
    //   "getOrgTreeInfo"
    // ])
  },
  mounted () {
    // this.treeData1 = []; // this.getOrgTreeInfo;
    // var that = this;
    // if (this.treeData1.length == 0) {
    //   this.getOrgInfoAction().then(res => {
    //     that.treeData1 = that.getOrgTreeInfo;

    //   })
    // }
  },
  data () {
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
      // this.treeData1 = []; // this.getOrgTreeInfo;
      // this.treeData1 = this.getOrgTreeInfo;
      // var that = this;
      // if (this.treeData1.length == 0) {
      //   this.getOrgInfoAction().then(res => {
      //     that.treeData1 = that.getOrgTreeInfo;

      //   })
      // }
    }
  },
  methods: {

    search () {
      this.$refs.tree.searchNodes(this.searchword)
    },
    search1 () {
      var that = this
      that.treeData1 = that.getOrgTreeInfo
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
