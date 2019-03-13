<template>
  <div>
    <div class="search-con">
      <Select class="search-col">
        <Option value="搜索"></Option>
      </Select>
      <Input placeholder="输入关键字搜索" class="search-input" />
      <Button class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
    </div>
    <Table border :columns="columns5" :data="data5" @on-row-click="handleClick">
    </Table>
<!--     <Button @click="handleSelectAll(true)">Set all selected</Button>
    <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
  </div>
</template>

<script>
export default {
  name: 'DataTables',
  
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
       columns5: [
        {
            title: 'VIN',
            key: 'VIN',
            sortable: true
        },
        {
            title: 'Licence',
            key: 'licence'
        },
        {
            title: 'Name',
            key: 'name',
            sortable: true
        },
        {
            title: 'Model',
            key: 'model'
        },
        {
            title: 'Data',
            key: 'data'
        },
        {
          title: 'Address',
          key: 'address',
           width: 300,
          align: 'center'
        },
        {
            title: 'Status',
            key: 'status',
            width: 80,
            align: 'center'
        }
    ],
    data5: [
        {
            VIN: 'LY1CA1287F0000170',
            licence: '鲁HH7522',
            name: '150320',
            model: 'YTK6660GEV',
            data: '2019-02-25 10:04:07',
            address: '山东省济宁市汶上县中都街道汶上县银和商贸汽车销售有限公司',
            status: '在线'
        },
    ]
    }
  },
  methods: {
    handleClick(row){
    //转到详细页面
     const id = '12DC873E90B24F12BD0FE14029DC438A';
      const route = {
        name: 'veichle_details',
        params: {
          id
        },
        meta: {
          title: `动态路由-${id}`
        }
      }
      this.$router.push(route)
    },
        // 建立webscoket连接
    websocketFunc(){
      let _this = this;
      setTimeout(function(){
        
        _this.ws = new WebSocket("ws://58.213.131.5/ws");  //建立连接
        _this.ws.onopen = function(){
          _this.ws.send('{"pageId":"1","vehicleId":"12DC873E90B24F12BD0FE14029DC438A"}');
        }
        _this.ws.onmessage = function(e) {
          let jsonObj=JSON.parse(e.data);  //解析json数据--》对象
          if(jsonObj.type==1){
            _this.$store.dispatch('getWebscokets', jsonObj.canModel.list)
          } 
          //内存释放
          jsonObj=null;
          e=null;
          }
        _this.ws.onclose = function() {
          _this.ws = null;
          _this.websocketFunc();
        }
      }, 10)
    }
  },
  watch: {
    // columns (columns) {
    //   this.handleColumns(columns)
    //   this.setDefaultSearchKey()
    // },
    // value (val) {
    //   this.handleTableData()
    //   if (this.searchable) this.handleSearch()
    // }
  },
  mounted () {
    this.websocketFunc();  //建立webscoket
  }
}
</script>

<style>
.search-con{
padding: 10px 0;
display: flex;
}
.ivu-input-wrapper{
  width: 20%;
  padding: 0 10px;
}
.ivu-select{
  width: 14%;
}
</style>
