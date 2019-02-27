<template>
<drag-drawer v-model="showContainerBDrawer" :width.sync="width2" min-width="30px" :inner="true" :transfer="false" :placement="placementComputed" :draggable="draggable" @on-resize="handleResize" :scrollable="true">
  <div slot="header">
    <Icon type="md-aperture" :size="18"></Icon>
    <b>图表设置</b>
  </div>
  <Form :model="formItem" :label-width="80">
    <FormItem label="数据源">
      <Select v-model="formItem.resource" filterable @on-change="resourceChange">
            <Option  v-for="item in dataType" :key="item.id" :label="item.name" :value="item.id"></Option>
    </Select>
    </FormItem>
    <FormItem label="图表类型">
      <RadioGroup v-model="formItem.chartType">
        <Radio label="0">折线图</Radio>
        <Radio label="2">饼状图</Radio>
        <Radio label="1">柱状图</Radio>
        <Radio label="3">条形图</Radio>
        <Radio label="4">环形图</Radio>
        <Radio label="5">瀑布图</Radio>
        <Radio label="6">漏斗图</Radio>
        <Radio label="7">雷达图</Radio>
        <Radio label="40">热力图</Radio>
        <Radio label="50">散点图</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="数据方向">
      <RadioGroup v-model="formItem.direction">
        <Radio label="1">按行展示</Radio>
        <Radio label="2">按列展示</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="x轴">
      <Select multiple v-model="formItem.x" filterable @on-change="xChange">
              <Option v-for="item in functionsItems" :key="item.key" :label="item.title" :value="item.key+'|'+item.title"></Option>

    </Select>
    </FormItem>
    <FormItem label="x轴类型">
      <Select v-model="formItem.xAxisType" filterable>
              <Option v-for="item in xAxisTypes"  :key="item.id" :label="item.name" :value="item.id"></Option>
    </Select>
    </FormItem>
    <FormItem label="y轴">
      <Select multiple filterable v-model="formItem.y" @on-change="yChange">
              <Option v-for="item in functionsItems"  :key="item.key" :label="item.title" :value="item.key+'|'+item.title"></Option>

    </Select>
    </FormItem>
    <FormItem label="y轴规整零" filterable>
      <Select multiple v-model="formItem.zeroFields">
              <Option v-for="item in formItem.yArrayObject"  :key="item.id" :label="item.name" :value="item.id"></Option>
    </Select>
    </FormItem>
  </Form>
  <div slot="footer">
    <Button type="primary">Submit</Button>
    <Button style="margin-left: 8px">Cancel</Button>
  </div>
</drag-drawer>
</template>
<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import DragDrawer from '_c/drag-drawer'
export default {
  components: {
    DragDrawer
  },
  name: 'editVechicle',
  props: {
    showContainerBDrawers: {
      type: Boolean,
      default () {
        return false
      }
    }

  },
  data () {
    return {
      // showWindowBDrawer: false,
      showContainerBDrawer: false,
      functionsItems: [],
      functions: [],
      dataType: [{
        id: '1',
        name: '国标'
      }, {
        id: '2',
        name: '企标'
      }],
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
  },
  watch: {
    showContainerBDrawers(value) {
      this.showContainerBDrawer = value;
    }
  }
}
</script>
