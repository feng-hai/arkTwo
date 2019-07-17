<template>
  <div>
    <tablesPage :viewId="viewId" @on-edit="editPage"></tablesPage>
    <Modal v-model="model1" title="权限分配" :scrollable="true" @on-ok="ok" @on-cancel="cancel">
      <input
        class="tree-search-input"
        type="text"
        v-model.lazy="searchword"
        placeholder="search..."
      />
      <button class="tree-search-btn" type="button" @click="search">搜索</button>
      <v-tree ref="tree" :data="treeData1" :multiple="true" :halfcheck="true" />
    </Modal>
  </div>
</template>
<script>
import tablesPage from '@/view/tables/template'
import {
  mapActions
  // mapGetters,
  // mapState
} from 'vuex'
export default {
  name: 'rolePage',
  components: {
    tablesPage
  },

  data () {
    return {
      viewId: '93B1B06A08C448E0B423427C618E4BD0',
      model1: false,
      searchword: '',
      roleid: '',
      options: {
        showCheckbox: true,
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeData1: [
        {
          title: 'node1',
          expanded: true,
          children: [
            {
              title: 'node 1-1',
              expanded: true,
              children: [
                {
                  checked: true,
                  title: 'node 1-1-1'
                },
                {
                  checked: true,
                  title: 'node 1-1-2',
                  children: [
                    {
                      checked: true,
                      title: 'node 1-1-1',
                      children: [
                        {
                          checked: true,
                          title: 'node 1-1-1'
                        },
                        {
                          checked: true,
                          title: 'node 1-1-2',
                          children: [
                            {
                              checked: true,
                              title: 'node 1-1-1',
                              children: [
                                {
                                  checked: true,
                                  title: 'node 1-1-1'
                                },
                                {
                                  title: 'node 1-1-3'
                                }
                              ]
                            },
                            {
                              checked: true,
                              title: 'node 1-1-2'
                            },
                            {
                              title: 'node 1-1-3'
                            }
                          ]
                        },
                        {
                          title: 'node 1-1-3'
                        }
                      ]
                    },
                    {
                      checked: true,
                      title: 'node 1-1-2'
                    },
                    {
                      title: 'node 1-1-3'
                    }
                  ]
                },
                {
                  title: 'node 1-1-3'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  //   computed: {
  //   ...mapGetters([
  //     "getMenusInfo"
  //   ])
  // },
  methods: {
    ...mapActions(['getMenusByRoleId', 'bindRoleAndMenus']),
    search () {
      this.$refs.tree.searchNodes(this.searchword)
    },
    editPage (params, vm) {
      var that = this
      console.log('触发角色修改页面', params)
      this.model1 = true
      this.roleid = params.row.unid
      this.getMenusByRoleId({
        roleid: params.row.unid
      })
        .then(res => {
          console.log(res, '返回数据')
          var cmenus = res.cmenus
          var menus = res.menus
          var tree = []
          for (var i = 0; i < cmenus.length; i++) {
            var node = cmenus[i]
            var isChecked = menus.indexOf(node.id) > -1
            var newNode = {
              title: node.meta.title,
              id: node.id,
              checked: isChecked
              // expanded: true
            }
            if (node.children) {
              newNode.children = []

              node.children.forEach(element => {
                var isChecked = menus.indexOf(element.id) > -1
                newNode.children.push({
                  title: element.meta.title,
                  id: element.id,
                  checked: isChecked
                })
              })
            }
            tree.push(newNode)
          }

          that.treeData1 = tree
        })
        .catch(err => {
          console.log('获取角色失败', err)
        })
    },
    ok () {
      console.log(this.$refs.tree.getCheckedNodes(), 'selected')

      var selecteds = this.$refs.tree.getCheckedNodes()
      var temp = selecteds.map(item => {
        return item.id
      })

      this.bindRoleAndMenus({
        roleid: this.roleid,
        menus: temp.join(',')
      }).then(res => {
        this.$Message.info('Clicked ok')
      })
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  },
  mounted () {
    // var menus=this.getMenusInfo;
  }
}
</script>
