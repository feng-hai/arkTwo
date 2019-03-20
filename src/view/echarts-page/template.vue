<template>
<Card>
  <search @open="open" :vehicleIDP="vehicleID" :setItem="setting" @values="values" :getEndDate="getEndDate" :checkHasNext="checkHasNext" :getDataLength="getDataLength" :formatHistoryData="handleFunction"> </search>
  <echarts-t ref="echarts" :setItem="setting" :columns="chartData.columns" :rows="chartData.rows" style="margin-top:20px"></echarts-t>
  <edit ref="edit" @input="setChange"></edit>
</Card>
</template>

<script>
import echartsT from './echarts-t'
import edit from './edit'
import search from './search'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import {
  formatData,
  toJson,
  toDate,
  setCookies,
  getCookiesValueByKey
} from '@/libs/util'
export default {
  components: {
    edit,
    echartsT,
    search
  },
  data() {
    return {
      pageId: 'echartsTemplate',
      vehicleID: '',
      setting: {},
      chartData: {
        columns: [],
        rows: []
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
    ])
  },
  methods: {
    getEndDate(res) {
      var datas = res.datas;
      var data = datas[datas.length - 1];
      console.log("datatime", data);
      var tempData = "";
      console.log(data.pairs)
      data.pairs.forEach(item => {
        if (item.key == "DATIME_RX") {
          tempData = item.value.replace(" ", "T");
        }
      });
      return tempData;
      // this.lastDate = data[data.length - 1]["DATIME_RX"].replace(" ", "T");

    },
    checkHasNext(res) {
      return res.hasNext;
    },
    getDataLength(res) {
      var data = res.datas;
      return data.length-1;
    },
    handleFunction(res) { //格式化数据

      var data = res.datas;

      var temps = []
      data.map(items => {
        var temp = {};
        items.pairs.forEach(item => {
          temp[item.key] = item.value;
        })
        temps.push(temp);
      })
      return temps;

    },
    values(value) {
      console.log("values", value)
      var tempids = this.setting.yArrayObject.map(item => {
        return item.id
      })
      this.chartData.rows = formatData(tempids, value, this.setting.zeroFields);
    },
    open() {
      this.$refs['edit'].open(this.setting)
    },
    setChange(item) { // 修改了图表设置
      var columns = []
      this.setting.xArrayObject.forEach(item => {
        columns.push(item.id)
      })
      this.setting.yArrayObject.forEach(item => {
        columns.push(item.id)
      })
      this.chartData.columns = columns
      this.setting = item
      this.$refs['echarts'].setChart(item.chartType, true)
      setCookies(this.pageId + 'setting', item)
    },
    ...mapActions([
      'getVehicleInfoAction',
      'getVehicleHistoryAction'
    ])
  },
  mounted() {
    this.$nextTick(function() {
      var cookieValue = toJson(getCookiesValueByKey(this.pageId + 'setting'))
      if (cookieValue) {
        this.setting = cookieValue;
        var columns = []
        this.setting.xArrayObject.forEach(item => {
          columns.push(item.id)
        })
        this.setting.yArrayObject.forEach(item => {
          columns.push(item.id)
        })
        this.chartData.columns = columns
        this.$refs['echarts'].setChart(0, true)
        this.chartData.rows = []
      }
    })
    // this.options2 = toJson(getCookiesValueByKey(this.pageId + "vehicleID-option"))

    // this.dateS = toJson(getCookiesValueByKey(this.pageId + "times"));
    // this.start = this.dateS[0].replace(" ", "T");
    // this.end = this.dateS[1].replace(" ", "T");
    // var that = this;
    // this.$nextTick(function() {
    //   // Code that will run only after the
    //   // entire view has been rendered
    //   var temp = toJson(getCookiesValueByKey(that.pageId + "vehicleID"));
    //   that.vin = temp.label;
    //   that.$refs["agency"].query = temp.label;
    //
    //   that.loading2 = false;
    //   that.vehicleID = temp.value;
    // })
  }
}
</script>
