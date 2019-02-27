<template>
<Card>
  <Button @click="showContainerBDrawer = !showContainerBDrawer" type="primary" style="margin-left: 10px">{{ showContainerBDrawer ? '关闭' : '打开' }}容器内抽屉</Button>
  <div>
    <ve-line :data="chartData"></ve-line>
  </div>

  <edit-vechicle :showContainerBDrawers="showContainerBDrawer"></edit-vechicle>

</Card>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import editVechicle from './editVechicle'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
export default {
  components: {
    VeLine,

    editVechicle
  },

  data () {
    return {
      // showWindowBDrawer: false,
      showContainerBDrawer: false,
      functionsItems: [],
      functions: [],
      xAxisTypes: [{
        name: '类别',
        id: 'category'
      }, {
        name: '数值',
        id: 'value'
      },
      {
        name: '时间',
        id: 'time'
      },
      {
        name: 'log',
        id: 'log'
      }
      ],
      // showBDrawer3: false,
      // width1: 300,
      width2: 300,
      placement: false,
      draggable: true,
      formItem: {
        resource: '',
        zeroFields: [],
        yArrayObject: [],
        y: [],
        xArrayObject: [],
        x: [],
        direction: ''
        // input: '',
        // select: '',
        // radio: 'male',
        // checkbox: [],
        // switch: true,
        // date: '',
        // time: '',
        // slider: [20, 50],
        // textarea: ''
      },
      chartData: {
        columns: ['date', 'PV'],
        rows: [{
          'date': '01-01',
          'PV': 1231
        },
        {
          'date': '01-02',
          'PV': 1223
        },
        {
          'date': '01-03',
          'PV': 2123
        },
        {
          'date': '01-04',
          'PV': 4123
        },
        {
          'date': '01-05',
          'PV': 3123
        },
        {
          'date': '01-06',
          'PV': 7123
        }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'getTableInfoById',
      'getOrganizationInfo',
      'getMenusInfo',
      'getRolesInfo',
      'getOrgTreeInfo'
    ]),
    placementComputed () {
      return this.placement ? 'left' : 'right'
    }
  },
  methods: {
    xChange (value) {
      var temp = []
      value.forEach(item => {
        temp.push({
          id: item.split('|')[0],
          name: item.split('|')[1]
        })
      })
      this.formItem.xArrayObject = temp
    },
    yChange (value) {
      var temp = []
      value.forEach(item => {
        temp.push({
          id: item.split('|')[0],
          name: item.split('|')[1]
        })
      })
      this.formItem.yArrayObject = temp
    },
    resourceChange (value) {
      this.handleTablesInfo(value).then(res => {
        if (res.columns) { this.functionsItems = res.columns }
      })
    },
    // ...mapState (['menus']),
    ...mapActions([
      'getAlltableInfo',
      'handleTablesInfo'
    ]),
    handleResize (event) {
      const {
        atMin
      } = event
      /* eslint-disable */
      console.log(atMin);
    },

  },
  mounted() {

    this.getAlltableInfo().then(res => {
      if (res.data && res.data.length > 0)
        this.functions = res.data
    })
  }
}
</script>
