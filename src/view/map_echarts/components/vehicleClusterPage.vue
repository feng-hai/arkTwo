<template>
<echartsMap ref="map" :maxCount="maxCount" :dataArray="dataArray" @proviceClick="proviceClick">
</echartsMap>
</template>
<script>
import echartsMap from '_c/distribution/index.js'
import {
  mapActions,
  mapGetters
  // mapState
} from 'vuex'
export default {
    components: {
        echartsMap
    },
    data() {
        return {
            dataArray: [],
            maxCount: 600
        }
    },
    methods: {
      ...mapActions([
        'getEchartData',

      ]),
        proviceClick(params) {

            if (params.data && params.data.code) {
                this.getEchartData({
                    super_code: params.data.code
                }).then(res => {
                    var temp = [];
                    var maxTemp=0;
                    res.forEach(item => {
                        if (item.title) {
                            temp.push({
                                name: item.title,
                                value: item.count * 1
                            });
                            if(item.count*1>maxTemp)
                            {
                              maxTemp=item.count*1;
                            }
                        }

                    });
                    this.$refs.map.renderMap(params.name, temp,maxTemp);
                })
            }else{
                this.$emit("clickCity",params)
            }
        }
    },
    mounted() {
        var that = this;
        this.getEchartData({
            zone: 1
        }).then(res => {
            var temp = [];
            that.maxCount = 0;
            res.forEach(item => {
                if (item.title) {
                    temp.push({
                        name: item.title.replace("省", "").replace("市", ""),
                        value: item.count * 1,
                        code: item.code
                    });
                    if (item.count * 1 > that.maxCount) {
                        that.maxCount = item.count * 1;
                    }
                }
            });
            that.dataArray = temp;
        })
    }
}
</script>
