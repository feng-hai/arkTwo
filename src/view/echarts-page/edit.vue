<template>
<drag-drawer v-model="showContainerBDrawer" :width.sync="width2" min-width="30px" :inner="true" :transfer="false" :placement="placementComputed" :draggable="draggable" @on-resize="handleResize" :scrollable="true">
  <div slot="header">
    <Icon type="md-aperture" :size="18"></Icon>
    <b>图表设置</b>
  </div>
  <Form :model="formItem" :label-width="80">
    <FormItem label="数据源">
      <Select v-model="formItem.resource" filterable @on-change="resourceChange">
            <Option  v-for="item in functions" :key="item.unid" :label="item.name" :value="item.unid"></Option>
    </Select>
    </FormItem>
    <FormItem label="图表类型">
      <RadioGroup v-model="formItem.chartType">
        <Radio label="0">折线图</Radio>
        <Radio label="2">饼状图</Radio>
        <Radio label="1">柱状图</Radio>
        <Radio label="3">条形图</Radio>
        <!-- <Radio label="4">环形图</Radio>
        <Radio label="5">瀑布图</Radio>
        <Radio label="6">漏斗图</Radio>
        <Radio label="7">雷达图</Radio>
        <Radio label="40">热力图</Radio>
        <Radio label="50">散点图</Radio> -->
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
    <Button type="primary" @click="submit">提交</Button>
    <Button style="margin-left: 8px" @click="close">取消</Button>
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
  name: 'edit',
  props: {
    showContainerBDrawers: {
      type: Boolean,
      default () {
        return false;
      }
    }

  },
  data() {
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
        direction: '',
        xAxisType: '',
        url: '',
        chartType:0
      }
    }
  },
  computed: {
    ...mapGetters([
      'getTableInfoById',
      "getOrganizationInfo",
      "getMenusInfo",
      "getRolesInfo",
      "getOrgTreeInfo"
    ]),

    placementComputed() {
      return this.placement ? 'left' : 'right'
    }
  },
  methods: {
    open(setting) {

      this.showContainerBDrawer = true;
      this.formItem = setting;
      this.handleTablesInfo(this.formItem.resource).then(res => {
        if (res.columns) {
          this.formItem.url = res.url;
          this.functionsItems = res.columns
        }
        console.log(this.url)
      })
    },
    submit() {
      this.$emit("input", this.formItem);
      this.showContainerBDrawer = false;
    },
    close() {
      this.showContainerBDrawer = false;
    },
    xChange(value) {
      var temp = [];
      value.forEach(item => {
        temp.push({
          id: item.split('|')[0],
          name: item.split('|')[1]
        })
      })
      this.formItem.xArrayObject = temp;
    },
    yChange(value) {
      var temp = [];
      value.forEach(item => {
        temp.push({
          id: item.split('|')[0],
          name: item.split('|')[1]
        })
      })
      this.formItem.yArrayObject = temp;
    },
    resourceChange(value) {
      this.formItem.x = [];
      this.formItem.y = [];
      this.formItem.yArrayObject = [];
      this.formItem.xArrayObject = [];
      this.formItem.xAxisType = ''
      this.handleTablesInfo(value).then(res => {
        if (res.columns) {
          this.formItem.url = res.url;
          this.functionsItems = res.columns
        }
        console.log(this.url)
      })
    },
    // ...mapState (['menus']),
    ...mapActions([
      'getAlltableInfo',
      'handleTablesInfo'
    ]),
    handleResize(event) {
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

  }
}
</script>
