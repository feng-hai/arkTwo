<template>
<span>

  <Select v-show="selectedShow" ref="agency" clearable v-model="vehicleID" @on-change="changeVehicle" :label="vin" :label-in-value="true" filterable remote :remote-method="remoteMethod2" :loading="loading2" style="width: 300px; margin-right:10px;">
           <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
  </Select>
  <DatePicker type="datetimerange" v-model="dateS" @on-change="changeDate" placeholder="Select date and time" style="width: 300px; margin-right:10px;"></DatePicker>
  <Button type="primary" @click="getChartsData">查询</Button><Button type="primary" @click="showMore" style="margin-left:10px;">更多</Button>
  <Button @click="open" type="primary" style="margin-left: 10px">设置</Button>
  <Card v-show="isMore"style="margin-top:10px;">
  <span>每次加载条数：</span>
<Select v-model="pageSize" style="width:200px">
      <Option v-for="item in pageSizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
<span style=";margin-left:10px;">最大加载条数：</span>
<Select v-model="maxSize" style="width:200px;margin-right:10px;">
      <Option v-for="item in maxSizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
<span>当前已经加载数据：{{count}}条</span>
</Card>

</span>
</template>
<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import {
  toJson,
  toDate,
  setCookies,
  getCookiesValueByKey,
  formatData,
  formatHistoryData

} from '@/libs/util'
export default {
  name: 'search',
  components: {

  },
  props: {
    vehicleIDP: {
      type: String,
      default () {
        return ''
      }
    },
    setItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      historyData: [],
      pageId: 'echartsTemplate',
      dateS: [],
      loading2: false,
      pageSize: 1000,
      maxSize: 5000, // 最大获取数据条数
      options2: [],
      vehicleID: '',

      vin: '',
      count: 0, // 当前已经获取的条数
      isMore: false,
      pageSizeList: [{
        value: 1000,
        label: '1K'
      }, {
        value: 1500,
        label: '1.5K'
      }],
      maxSizeList: [{
        value: 5000,
        label: '5K'
      }, {
        value: 10000,
        label: '10K'
      }, {
        value: 15000,
        label: '15K'
      }]
    }
  },
  computed: {
    selectedShow () {
      if (this.vehicleIDP == '') {
        return true
      } else {
        return false
      }
    },

    ...mapGetters([
      'getTableInfoById',
      'getOrganizationInfo',
      'getMenusInfo',
      'getRolesInfo',
      'getOrgTreeInfo'
    ])
  },
  methods: {
    showMore () {
      this.isMore = !this.isMore
    },
    changeVehicle (value) {
      setCookies(this.pageId + 'vehicleID', value)
      setCookies(this.pageId + 'vehicleID-option', this.options2)
    },
    changeDate (selected, d) {
      setCookies(this.pageId + 'times', selected)
      this.start = selected[0].replace(' ', 'T')
      this.end = selected[1].replace(' ', 'T')
    },
    remoteMethod2 (query) {
      if (query !== '') {
        this.loading2 = true
        this.getVehicleInfoAction({
          order: 'asc',
          page_id: 0,
          page_size: 5,
          q: query
        }).then(res => {
          const list = res.map(item => {
            this.loading2 = false
            return {
              value: item.unid,
              label: item.vin
            }
          })
          this.options2 = list
        })
      } else {
        this.options2 = []
      }
    },
    getChartsData () {
      var that = this
      that.count = 0
      that.historyData = []
      var fields = ['TIMES', 'DATIME_RX'] // 接口bug，必须传Times才能查到对应的值
      var columns = []
      this.setItem.xArrayObject.forEach(item => {
        if (item.id != 'DATIME_RX') {
          fields.push(item.id)
        }
        columns.push(item.name)
      })
      this.setItem.yArrayObject.forEach(item => {
        if (item.id != 'DATIME_RX') {
          fields.push(item.id)
        }
        columns.push(item.name)
      })
      var tempDate = toDate(this.start)
      var tempTimes = tempDate == null ? 0 : tempDate.getTime()
      var url = that.setItem.url + '/' + (that.vehicleIDP == '' ? that.vehicleID : that.vehicleIDP)
      var vehicleInfos = function (end) {
        that.getVehicleHistoryAction({
          url: url,
          params: {
            order: 'asc',
            // page_id: that.pagination.currentPage - 1,
            number: that.pageSize,
            date_from: that.start,
            date_to: end,
            // vin: that.selectedVehicle,
            // status: that.vehicleStatus,
            field: fields.join(',')
          }
        }).then(res => {
          that.count = that.count + res.rows.length - 1
          var current = res.rows[res.rows.length - 1].column[0]
          var tempids = that.setItem.yArrayObject.map(item => {
            return item.id
          })
          var temp = formatHistoryData(res.rows)

          that.historyData = that.historyData.concat(temp)
          if (current * 1 > tempTimes && res.rows.length == 1001 && res.hasNext == 'true' && that.maxSize > that.count) {
            vehicleInfos(res.rows[res.rows.length - 1].column[2].replace(' ', 'T'))
          } else {
            var formateDatas = formatData(tempids, that.historyData, that.setItem.zeroFields)
            that.$emit('formateData', formateDatas)
            that.$Notice.success({
              title: '数据加载提示',
              desc: '数据加载完成'
            })
          }
        })
      }
      vehicleInfos(this.end)
    },
    open () {
      this.$emit('open')
    },

    // ...mapState (['menus']),
    ...mapActions([
      'getVehicleInfoAction',
      'getVehicleHistoryAction'
    ])
  },
  mounted () {
    this.options2 = toJson(getCookiesValueByKey(this.pageId + 'vehicleID-option'))
    this.setting = toJson(getCookiesValueByKey(this.pageId + 'setting'))
    this.dateS = toJson(getCookiesValueByKey(this.pageId + 'times'))
    this.start = this.dateS[0].replace(' ', 'T')
    this.end = this.dateS[1].replace(' ', 'T')
    var that = this
    this.$nextTick(function () {
      var temp = toJson(getCookiesValueByKey(that.pageId + 'vehicleID'))
      that.vin = temp.label
      that.$refs['agency'].query = temp.label
      that.loading2 = false
      that.vehicleID = temp.value
    })
  }
}
</script>
