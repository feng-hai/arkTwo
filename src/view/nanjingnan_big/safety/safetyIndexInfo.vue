<template>
  <div class="contentinfo">
    <!-- <p class="pTitle">
      <span class="active">安全指数</span>
    </p> -->
    <Row >
      <Col span="12">
        <safetyIndexEcharts :options="option1" title="消防设施(42/45)" :chartsHeight="chartsHeight"></safetyIndexEcharts>
      </Col>
      <Col span="12">
        <safetyIndexTable  :dataTable="dataTable1" :scollHeight="scollHeight" style="padding-bottom:10px"></safetyIndexTable>
      </Col>
    </Row>
      <Row>
      <Col span="12">
        <safetyIndexEcharts :options="option2" title="消防管理(42/45)" :chartsHeight="chartsHeight"></safetyIndexEcharts>
      </Col>
      <Col span="12">
        <safetyIndexTable :dataTable="dataTable2"  :scollHeight="scollHeight" style="padding-bottom:10px"></safetyIndexTable>
      </Col>
    </Row>
      <Row>
      <Col span="12">
        <safetyIndexEcharts :options="option3"  title="客观情况(42/45)" :chartsHeight="chartsHeight"></safetyIndexEcharts>
      </Col>
      <Col span="12">
        <safetyIndexTable :dataTable="dataTable3" :scollHeight="scollHeight" style="padding-bottom:10px"></safetyIndexTable>
      </Col>
    </Row>
  </div>
</template>
<script>
import safetyIndexTable from "./safetyIndexTable.vue";
import safetyIndexEcharts from "./safetyIndexEcharts.vue";
import { windowHeight } from "@/libs/util";
export default {
  name: "alarmInfo",
  components: {
    safetyIndexTable,
    safetyIndexEcharts
  },
  data() {
    return {
      chartsHeight: (windowHeight() - 120) /3,
      scollHeight: (windowHeight() - 120) / 3 - 10 - 23,
      dataTable1:[],
      dataTable2:[ 
        {
          number: '1',
          typename: '人员值守',
      
        },
        {
         number: '3',
          typename: '日常巡检',
        
        }],
      dataTable3:[ ],
      option1:{
        title: {
          text: '消防设施(45/45)'
        },
        // tooltip: {},
        // legend: {
        //   data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        // },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
             // backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "火灾自动报警系统", max: 8 },
            { name: "消防栓系统", max: 10 },
            { name: "消防水炮系统", max: 3 },
            { name: "自动喷水灭火系统", max: 8 },
            { name: "气体灭火系统", max: 2 },
            { name: "防排烟系统", max: 3 }
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [8, 10, 3, 8, 2, 3],
                name: "预算分配（Allocated Budget）"
              } 
            ]
          }
        ]
      },
      option2:{
        title: {
          text: '消防管理(41/45)'
        },
        // tooltip: {},
        // legend: {
        //   data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        // },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              //backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "人员值守", max: 5 },
            { name: "制度架构", max: 15 },
            { name: "日常巡查", max: 15},
            { name: "应急处置", max:5 },
        
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4, 15, 12, 5],
                name: "预算分配（Allocated Budget）"
              } 
            ]
          }
        ]
      },
      option3:{
        title: {
          text: '客观情况(10/10)'
        },
        // tooltip: {},
        // legend: {
        //   data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        // },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
            //  backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "天气", max: 2 },
            { name: "雷电", max: 1 },
            { name: "老化", max:2.5 },
            { name: "出租房", max: 2.5 },
             { name: "危险品", max: 2 },
         
          ]
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [2, 1, 2.5,2.5, 2],
                name: "预算分配（Allocated Budget）"
              } 
            ]
          }
        ]
      }
    
    
    
    };
  }
};
</script>
<style lang="less">
.contentinfo {
  position: relative;
  //  height: calc(100vh - 104px);
  overflow: hidden;
}

.pTitle {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  span {
    cursor: pointer;
    cursor: hand;
    padding: 10px; // Border: 1px solid #000;
  }
  .active {
    color: #fff;
  }
  .noactive {
    color: #bbb;
  }
}
</style>
