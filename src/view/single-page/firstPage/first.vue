<template>
  <Row>
    <Col span="12">
      <Row>
        <Col span="12" class="statusShow">
          <statusShow
            title="南京动车所"
            @on-click="turnToPage('homeForBigger')"
            grade="96"
            :list="dongche"
          ></statusShow>
        </Col>
        <Col span="12" style="padding-left:0px" class="statusShow">
          <statusShow
            title="南京南动车所"
            @on-click="turnToPage('homeForBigger')"
            grade="98"
            :list="dongchenan"
          ></statusShow>
        </Col>
      </Row>
      <Row>
        <Col span="12" class="statusShow">
          <statusShow
            title="徐州东动车所"
            @on-click="turnToPage('homeForBigger')"
            grade="99"
            :list="xuzhoudong"
          ></statusShow>
        </Col>
        <Col span="12" style="padding-left:0px" class="statusShow">
          <statusShow
            title="合肥南动车所"
            @on-click="turnToPage('homeForBigger')"
            grade="99"
            :list="hefeinan"
          ></statusShow>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="alarmInfo">
          <alarmInfo></alarmInfo>
        </Col>
      </Row>
    </Col>
    <Col span="12" class="mapEcharts">
      <mapEcharts></mapEcharts>
    </Col>
  </Row>
</template>
<script>
// import statusShow from './components/statusShow/statusShow.vue'
import statusShow from './components/token/index.vue'
import alarmInfo from './components/alarmInfo.vue'
import { mapEcharts } from '_c/charts'
export default {
  components: {
    statusShow,
    mapEcharts,
    alarmInfo
  },
  methods: {
    turnToPage (to) {
      this.$router.push({
        name: to,
        meta: {
          title: `视图管理`,
          notCache: false
        }
      })
    }
  },
  data () {
    return {
      dongche: [
        {
          color: '#5bf4fd',
          num: 1230,
          name: '正常'
        },
        {
          color: '#ff5050',
          num: 12,
          name: '故障'
        },
        {
          color: '#ff9900',
          num: 13,
          name: '报警'
        },
        {
          color: '#678af2',
          num: 3,
          name: '屏蔽'
        }
      ],
      dongchenan: [
        {
          color: '#5bf4fd',
          num: 1200,
          name: '正常'
        },
        {
          color: '#ff5050',
          num: 10,
          name: '故障'
        },
        {
          color: '#ff9900',
          num: 13,
          name: '报警'
        },
        {
          color: '#678af2',
          num: 3,
          name: '屏蔽'
        }
      ],
      xuzhoudong: [
        {
          color: '#5bf4fd',
          num: 1200,
          name: '正常'
        },
        {
          color: '#ff5050',
          num: 10,
          name: '故障'
        },
        {
          color: '#ff9900',
          num: 13,
          name: '报警'
        },
        {
          color: '#678af2',
          num: 3,
          name: '屏蔽'
        }
      ],
      hefeinan: [
        {
          color: '#5bf4fd',
          num: 1210,
          name: '正常'
        },
        {
          color: '#ff5050',
          num: 10,
          name: '故障'
        },
        {
          color: '#ff9900',
          num: 13,
          name: '报警'
        },
        {
          color: '#678af2',
          num: 3,
          name: '屏蔽'
        }
      ]
    }
  }
}
</script>
<style>
.statusShow {
  height: 240px;
  width: 50%;
  padding: 0px 10px 10px 10px;
}
.alarmInfo {
  height: calc(100vh - 590px);
  padding: 0px 10px 10px 10px;
  /*background-color: rgba(24,35,50,0.5);*/
}
.mapEcharts {
  height: calc(100vh - 120px);
  padding: 0px 20px 10px 0px;
  background-color: rgba(24, 35, 50, 0.1);
}
</style>
