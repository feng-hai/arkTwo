<template>
  <div id="mapApp">
    <div id="container"></div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
export default {
  name: 'gaode-map',
  // props: {
  //   getProvince: {
  //     type: String
  //   }
  // },
  props: {
    getProvince: {
      type: String
    }
  },
  data(){
    return{
      map:null,  //地图对象
      markersMap:{},   //存放地图上的点对象
      mapDataTimeout:null,
      apiState:null,
      district: null,
      polygons: [],
      arr: []
    }
  },
  mounted(){
    this.createMap([112.098822,33.61833], 5);   //初始化地图
    this.getMapData();  //获取地图数据
    this.drawBounds(this.getProvince);
  },
  computed: {
    ...mapGetters([
      // 'getProvince',
      'getEcharts'
    ])
  },
  watch: {
  'getProvince':function(nv, ov){
    let _self = this;
    _self.drawBounds(nv)
  }
},
  methods:{
    ...mapActions([
      'getEchartData',
    ]),
    wsOnmessage(data){
      debugger;
      console.log(data, 'dataaaaaaaaaa')
    },
    //初始化地图
    createMap(centerObj,zoomObj){
      let _this = this;
      _this.map = new AMap.Map('container', {
        center: centerObj,
        zoom: zoomObj,
        features: ['bg', 'road']
      })
      // 显示行政省会
      _this.map.plugin([ "AMap.ToolBar" ], function() {
        var toolBar = new AMap.ToolBar();
        _this.map.addControl(toolBar);});
      _this.map.plugin([ "AMap.MapType" ], function() {});
      
       //鼠标滚动式触发
      AMap.event.addListener(_this.map, "zoomend", _this.zoomend);
      //鼠标移动结束时触发事件
      AMap.event.addListener(_this.map, "dragend", _this.dragend);

    },
    //渲染省会边界
    drawBounds(val){
      let _this = this;
        //加载行政区划插件
        //加载行政区划插件
        // var district = null;
        // var polygons=[];
        if(!_this.district){
            //实例化DistrictSearch
            var opts = {
                subdistrict: 0,   //获取边界不需要返回下级行政区
                extensions: 'all',  //返回行政区边界坐标组等具体信息
                level: 'district'  //查询行政级别为 市
            };
            AMap.plugin('AMap.DistrictSearch', function () {
              _this.district = new AMap.DistrictSearch(opts);
            })    
        }
        if(val){
          //行政区查询
         _this.district.search(val, function(status, result) {
           if(_this.polygons.length > 0){
            _this.map.remove(_this.polygons)//清除上次结果
            _this.polygons = [];
            // console.log(_this.polygons, 'polygons');
           } 
            var bounds = result.districtList[0].boundaries;
            if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                    //生成行政区划polygon
                    var polygon = new AMap.Polygon({
                        strokeWeight: 0,
                        path: bounds[i],
                        fillOpacity: 0.4,
                        fillColor: '#80d8ff',
                        strokeColor: '#0091ea'
                    });
                    _this.polygons.push(polygon);
                }
            }
            _this.map.add(_this.polygons);
            _this.map.setFitView();//视口自适应
        });
        }

    },
    //获取地图数据
    getMapData(){
      const _this = this;
      const windowLatLon = _this.windowLatLon();
      let mapZone = this.getZoom();
      this.getEchartData({
        rectangle:windowLatLon.upperLef[0] +"," +windowLatLon.upperLef[1] +"," +windowLatLon.lowerRight[0] +"," +  windowLatLon.lowerRight[1],
        // zone:18,
        zone:mapZone,
        t:new Date()
      }).then(res => {
        //_this.mapDate=res;
        _this.mapDataFormat(res);
        res = null;  //释放内存
      }).catch(err => {
        console.log(err)
      })
    },
    /*地图数据格式化处理*/
    mapDataFormat(even){
      const _this = this;
      let deletemarker=[];  //需要删除的marker点
      var mapData=[];  //处理后的  地图数据
      if(even.length == 0){
        //数据异常、、先不处理。。
      }else if(even.length >1){
        //省市区聚合数据
        even.forEach((obj)=>{
          // 0,0 点不需要处理
          if(obj.calLat != 0 && obj.calLon !=0){
            mapData.push({
              unid:obj.aiid,   //该数据的唯一标识
              calLat:obj.calLat,
              calLon:obj.calLon,
              text:obj.count,   //marker点需要显示的数据
              type:0    //0:省市区聚合数据   1:车辆具体数据
            });
          }
        });
      }else{
        //具体车辆数据--格式化处理
        const vehicles = even[0].vehicles;
        vehicles.forEach((obj) =>{
          let lon=0;
          let lat=0;
          const entryObj = obj.snapshot.entry;  //获取redis中的数据
          entryObj.forEach((entry) =>{
            if(entry.key === "calLat"){
              lat=entry.value;
            }else if(entry.key === "calLon"){
              lon=entry.value;
            }
          })
          if(lat != 0 && lon != 0){
            mapData.push({
              unid:obj.unid,   //该数据的唯一标识
              calLat:lat,
              calLon:lon,
              text:obj.licence,   //marker点需要显示的数据
              type:1    //0:省市区聚合数据   1:车辆具体数据
            });
          }

        });
      }
      //-------------数据处理完毕------mapData=[]---------------

      //遍历数据
      mapData.forEach((obj)=>{
        //判断该点是否已经存在map中
        if(_this.markersMap[obj.unid]){
          const arkerObj=_this.markersMap[obj.unid];
          //判断该点位置是否发生变化
          if(arkerObj.lon != obj.calLon || arkerObj.lat != obj.calLat){
            //车辆位置发生了变化
            deletemarker.push(arkerObj.marker);  //记录需要删除的点
          }else{
            //车辆位置未发生变化
            return true;
          }
        }
        const marker=_this.addMarker(obj.calLat,obj.calLon, obj.text,obj.type);  //打点操作
        // marker 点 绑定事件
        AMap.event.addListener(marker, "click", function(e) {
          if(obj.type == 0){
            _this.map.setZoom(_this.map.getZoom() + 2); // 点击后当前显示级别+2
            _this.map.setCenter([obj.calLon,obj.calLat]); // 中心回到鼠标点击中心
          }else{
            _this.$emit("mapMarkerClick", obj);
          }
        });
        const arkerObjNew={
          unid:obj.unid,
          lon:obj.calLon,
          lat:obj.calLat,
          count:obj.text,
          marker:marker
        }
        _this.markersMap[obj.unid] = arkerObjNew;
      });

      //------------删除不需要的marker点-----------------
      let delMapKey=[];
      for(let key in _this.markersMap){
        let isExis = false;  //默认不存在
        mapData.forEach((obj) => {
          if(key == obj.unid){
            isExis = true;
          }
        });
        if(!isExis){
          deletemarker.push(_this.markersMap[key].marker);  //记录需要删除的点
          delMapKey.push(key);
        }
      }
      delMapKey.forEach((delKey) => {
        delete _this.markersMap[delKey];//将该点信息，在全局map中删除
      })
      //删除不存在的点
      deletemarker.forEach((marker) => {
        _this.map.remove(marker); //清除地图上的点
      })
    },
    addMarker: function(lon, lat, text, type) {
      //0:省市区聚合数据   1:车辆具体数据
      let _this = this;
      let html='';
      if(type == 0){
        html ='<div class="markerDaping"><span name="infoBtn" class="dapingSpan">' + text + '</span></div>';
      }else{
        html ='<div class="markerDaping2"><span name="infoBtn" class="dapingSpan2">' + text + '</span></div>';
      }
      var marker = new AMap.Marker({
        map: _this.map,
        position: [lat,lon],

        offset: new AMap.Pixel(-60, -30), //自定义点标记覆盖物内容
        content: html
      });
      return marker;
            },
    /*获取当前屏幕经纬度方法*/
    windowLatLon: function() {
      const _this = this;
      var lowerLeft = [
        _this.map.getBounds().getSouthWest().getLng(),
        _this.map.getBounds().getSouthWest().getLat()
      ]; //左下角经纬度
      var upperRight = [
        _this.map.getBounds().getNorthEast().getLng(),
        _this.map.getBounds().getNorthEast().getLat()
      ]; //右上角经纬度
      if (_this.getZoom() >= 13) {
        var upperLef = [lowerLeft[0] - 0.01, upperRight[1] + 0.01]; // 左上
        var lowerRight = [upperRight[0] + 0.01, lowerLeft[1] - 0.01]; // 右下
      } else {
        var upperLef = [lowerLeft[0], upperRight[1]]; // 左上
        var lowerRight = [upperRight[0], lowerLeft[1]]; // 右下
      }
      return {
        upperLef: upperLef,
        lowerRight: lowerRight
      };
    },
     /*地图发生移动事件*/
    mapEvent(){
      let _this = this;
      if(_this.mapDataTimeout){
          clearInterval(_this.mapDataTimeout);
      }
      _this.mapDataTimeout = setTimeout(function(){
          _this.getMapData();   //获取数据
          _this.mapDataTimeout=null;
      },1000);
    },
    /*鼠标滚动式触发*/
    zoomend: function() {
      this.mapEvent();
    },
    /* 鼠标移动结束时触发事件 */
    dragend: function() {
      this.mapEvent();
    },
    /*获取当前地图级别*/
    getZoom: function() {
      return this.map.getZoom();
    },
}}
</script>

<style>
#container {
  width: 100%;
  height: 100%;
}
#container div{
  overflow: initial !important;
}
#mapApp {
  width: 100%;
  height: 100vh;
  position: relative;
}
.selectDiv{
  position: absolute;
  z-index: 99;
  left: 20px;
  top: 70px;
}


/*body.custom-white #container .markerDaping {

  background-position: 0px 0px;
}
body.custom-blue #container .markerDaping {
 background-position: 0px -38px;
}
body.custom-black #container .markerDaping {
  background-position: 0px -76px;
}



body.custom-white #container .markerDaping2 {

  background-position: 0px -116px;
}
body.custom-blue #container .markerDaping2 {
 background-position: 0px -154px;
}
body.custom-black #container .markerDaping2 {
  background-position: 0px -193px;
}*/

/* 大屏marker */
#container .markerDaping {
  position: absolute;
  color: #000000;
  cursor: pointer;
  width:75px;
  height: 38px;
  background: url(../img/map-bg.png) no-repeat;
}

#container .markerDaping2 {
  position: absolute;
  color: #000000;
  cursor: pointer;
  width:115px;
  height: 38px;
  background: url(../img/marker_daping_white.png) no-repeat;
}

#container .dapingSpan {
    width: 50px;
    position: absolute;
    bottom: 0px;
    left: 22px;
    font-size: 14px;
    text-align: center;
    color: #10192a;
    line-height: 45px;
    overflow: hidden;
}
#container .dapingSpan2 {
    width: 98px;
    position: absolute;
    bottom: 0px;
    left: 17px;
    font-size: 14px;
    text-align: center;
    color: #10192a;
    line-height: 45px;
    overflow: hidden;
}

</style>
