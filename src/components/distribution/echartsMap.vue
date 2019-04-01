<template>
<div class="echarts">
    <div v-if="option.title.subtext!='china'" class="iconBack" @click="toChina">
          <Button>返回上一级</Button>
    </div>
    <div :style="{height:'100%',width:'100%'}" ref="myEchart"></div>
</div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js' // 引入中国地图数据
import './data.js'
// 地图需要导入

export default {
    name: 'echartsMap',
    props: {
        dataArray: {
            type: Array
        },
        maxCount: {
          type:Number,
          default(){
            return 600;
          }
        }
    },
    data() {
        return {
            chart: null,
            selectedProvince: '',
            dataArr: [],



            //34个省、市、自治区的名字拼音映射数组
            provinces: {
                //23个省
                "台湾": "taiwan",
                "河北": "hebei",
                "山西": "shanxi",
                "辽宁": "liaoning",
                "吉林": "jilin",
                "黑龙江": "heilongjiang",
                "江苏": "jiangsu",
                "浙江": "zhejiang",
                "安徽": "anhui",
                "福建": "fujian",
                "江西": "jiangxi",
                "山东": "shandong",
                "河南": "henan",
                "湖北": "hubei",
                "湖南": "hunan",
                "广东": "guangdong",
                "海南": "hainan",
                "四川": "sichuan",
                "贵州": "guizhou",
                "云南": "yunnan",
                "陕西": "shanxi1",
                "甘肃": "gansu",
                "青海": "qinghai",
                //5个自治区
                "新疆": "xinjiang",
                "广西": "guangxi",
                "内蒙古": "neimenggu",
                "宁夏": "ningxia",
                "西藏": "xizang",
                //4个直辖市
                "北京": "beijing",
                "天津": "tianjin",
                "上海": "shanghai",
                "重庆": "chongqing",
                //2个特别行政区
                "香港": "xianggang",
                "澳门": "aomen"
            },
            option: {
                title: {
                    text: '全国分布图',
                    subtext: '三级下钻',

                    left: 'center',
                    textStyle: {
                        color: '#ccc',
                        fontSize: 16,
                        fontWeight: 'normal',
                        fontFamily: "Microsoft YaHei"
                    },
                    subtextStyle: {
                        color: '#ccc',
                        fontSize: 13,
                        fontWeight: 'normal',
                        fontFamily: "Microsoft YaHei"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(item) {
                        if (item.name) {
                            return item.name + ":" + item.value;
                        }
                    }
                },
                visualMap: {
                    min: 0,
                    max: 600,
                    align: "auto",
                    calculable: true,
                    inRange: {
                        color: ['#20C6B8', '#3149A4']
                    },
                    textStyle: {
                        color: '#111'
                    }
                },

            }
        }
    },
    // computed: {
    //   ...mapGetters([
    //     'getProvince',
    //   ])
    // },
    mounted() {
        this.chinaConfigure()
    },

    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    watch: {
        dataArray: function(nv, ov) {
            this.dataArr = nv;
            this.renderMap('china', nv,this.maxCount);
        }
    },
    methods: {
        toChina() {
            this.option.title.text = "全国分布图"
            this.renderMap('china', this.dataArr,this.maxCount);
        },
        renderMap(map, data, maxCount) {
            this.option.title.subtext = map;
            this.option.visualMap.max = maxCount;
            this.option.series = [{
                name: map,
                type: 'map',
                mapType: map,
                roam: false,
                nameMap: {
                    'china': '中国'
                },
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#999',
                            fontSize: 13
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 13
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#fff',
                        borderColor: 'dodgerblue'
                    },
                    emphasis: {
                        areaColor: 'darkorange'
                    }
                },
                data: data
            }];
            //渲染地图
            this.chart.setOption(this.option);
        },
        chinaConfigure() {
            this.dataArr = this.dataArray
            var that = this
            this.chart = echarts.init(this.$refs.myEchart)
            // 这里是为了获得容器所在位置
            window.onresize = this.chart.resize

            this.renderMap('china', this.dataArr,this.maxCount);

            this.chart.on('click', function(param) {
                that.$emit("proviceClick", param)
                // if (param.name in that.provinces) {
                //     that.renderMap(param.name, [{
                //         name: '济南市',
                //         value: 212
                //     }]);
                // }
                // let that = this
                // for (var i = 0, l = that.option.series[0].data.length; i < l; i++) {
                //   var name = that.option.series[0].data[i].name
                //   that.option.series[0].data[i].selected = false
                //   if (param.name == name) {
                //     that.selectedProvince = name
                //     // 设置海南，有两个海南
                //     if (that.selectedProvince == '海南') {
                //       that.selectedProvince = '海南省'
                //     }
                //     option.series[0].data[i].selected = true
                //     that.$emit('getProvince', that.selectedProvince)
                //   }
                // }
                // if(this.selectedProvince != 'undefined'){
                //   for(var i=0; i< that.dataArr.length; i++){
                //     if(that.dataArr[i] == that.selectedProvince){
                //       that.dataArr[i].selected = true;
                //     }
                //   }
                // }
                // if (typeof this.selectedProvince === 'undefined') {
                //   that.option.series.splice(1)
                //   that.option.legend = null
                //   // option.dataRange = null;
                //   this.chart.setOption(option, true) // 默认是合并，设置true后完全替换
                // }
            })
        }
    }
}
</script>

<style>
.echarts {

    width: 100%;
    margin-top: 10px;
    height: calc(100vh - 366px);
}

.iconBack {
    left: 100px;
    position: absolute;
    top: 20px;
    z-index: 100;
}
</style>
