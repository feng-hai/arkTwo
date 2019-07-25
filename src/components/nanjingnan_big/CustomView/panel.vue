<!--
 * @Descripttion: 自定义视图面板，用于放控件的容器
 * @version: 0.1
 * @Author: fh
 * @Date: 2019-06-29 12:43:50
 * @LastEditors: fh
 * @LastEditTime: 2019-07-25 22:06:25
 -->
 <template>
  <Card style="width:100%;height:100%" :bordered="false" :class="formItem.lType">
    <!-- <p v-if=false ref="head01" slot="title">

      <span v-text="formItem.title"></span>
    </p>-->
    <a ref="head02" href="#" slot="extra">
      <Icon type="md-settings" @click.prevent="setMessage" />
      <Icon type="md-remove" @click.prevent="setRemove" />
    </a>
    <div :id="containId" @click.prevent="click"></div>
    <drag-drawer
      v-model="showWindowBDrawer"
      :width.sync="width1"
      :min-width="300"
      :placement="placementComputed"
      :draggable="draggable"
      :scrollable="true"
    >
      <div slot="header">
        <Icon type="md-aperture" :size="18"></Icon>
        <b>控件属性</b>
      </div>

      <Form :model="formItem" label-position="top">
        <FormItem label="标题名称">
          <Input v-model="formItem.title" placeholder="标题" />
        </FormItem>
        <FormItem label="布局类型">
          <Input v-model="formItem.lType" placeholder="布局类型" />
        </FormItem>
        <FormItem label="组件名称">
          <Select v-model="formItem.component" @on-change="changeComponent">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="连接组件">
          <Select v-model="formItem.linkcomponent" @on-change="changeLinkComponent">
            <Option v-for="item in linksList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否显示头部信息">
          <RadioGroup v-model="formItem.radio">
            <Radio label="true">显示</Radio>
            <Radio label="false">不显示</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit()">保存01</Button>
        </FormItem>
      </Form>

      <!-- <Button @click="changeComponent">change component</Button> -->
    </drag-drawer>
  </Card>
</template>
<script>
import createMessage from "./container.js";
import DragDrawer from "_c/drag-drawer";
import demo from "@/view/tools/charts/editCharts";
import demo2 from "@/view/tools/charts/demo";
import map from "@/view/tools/charts/map";
// import content from "../components/content";
// 弹窗组件单文件
import Message from "./message.vue";
// 弹窗组件单文件
import MessageTwo from "./messageTwo.vue";
import safetyIndex from "./safetyIndex.vue";
import alarm from "../components/alarmInfo/alarm";
import water from "../components/waterNetwork/water";
import video from "../components/videoInfo/video";
import alarmTable from "../components/alarmInfo/alarmTable";
import barrier from "../components/barrierInfo/barrierEcharts";
import maintenance from "../components/maintenance/maintenance";
import danger from "../components/hiddenDanger/danger";
import layer from "@/view/single-page/home";
import alarmInfo from "@/view/nanjingnan_big/alarm/alarmInfo";
import videoInfo from "@/view/nanjingnan_big/videos/video";
import barrierInfo from "@/view/single-page/home/components/inspactionInfo";
import waterInfo from "@/view/nanjingnan_big/water/water";
import safetyIndexInfo from "@/view/nanjingnan_big/safety/safetyIndexInfo";
import dangerInfo from "@/view/nanjingnan_big/hiddenDanger/dangerInfo";
export default {
  name: "contain",
  components: {
    DragDrawer,
    demo,
    demo2,
    map,
    safetyIndex,
    alarm,
    water,
    video,
    alarmTable,
    barrier,
    maintenance,
    danger,
    layer,
    alarmInfo,
    barrierInfo,
    videoInfo,
    waterInfo,
    safetyIndexInfo,
    dangerInfo
    // content
  },

  data() {
    return {
      showWindowBDrawer: false,
      showContainerBDrawer: false,
      showBDrawer3: false,
      width1: 300,
      width2: 200,
      placement: false,
      draggable: true,
      model1: "Message",

      formItem: {
        title: this.title,
        component: this.component,
        radio: "true",
        lType: this.lType,
        linkcomponent: this.linkcomponent
      },
      linksList: [
        {
          value: "layer",
          label: "图形标注"
        },
        {
          value: "alarmInfo",
          label: "报警信息"
        },
        {
          value: "barrierInfo",
          label: "巡检管理-主"
        },
        {
          value: "videoInfo",
          label: "视频列表-主"
        },
        {
          value: "waterInfo",
          label: "水网-主"
        },
        {
          value: "safetyIndexInfo",
          label: "安全指数-主"
        },
          {
          value: "dangerInfo",
          label: "隐患检测-主"
        }
      ],
      cityList: [
        {
          value: "Message",
          label: "自定义信息"
        },
        {
          value: "demo",
          label: "图表"
        },
        {
          value: "demo2",
          label: "柱状图表"
        },
        {
          value: "map",
          label: "地图"
        },
        {
          value: "safetyIndex",
          label: "安全指数"
        },
        {
          value: "alarm",
          label: "报警"
        },
        {
          value: "water",
          label: "水网"
        },
        {
          value: "video",
          label: "视频"
        },
        {
          value: "alarmTable",
          label: "报警列表"
        },
        {
          value: "barrier",
          label: "巡检管理"
        },
        {
          value: "maintenance",
          label: "维护保养"
        },
        {
          value: "danger",
          label: "隐患检测"
        },
        {
          value: "layer",
          label: "图形标注"
        },
        {
          value: "alarmInfo",
          label: "报警信息"
        },
        {
          value: "barrierInfo",
          label: "巡检管理-主"
        },
        {
          value: "videoInfo",
          label: "视频列表-主"
        },
        {
          value: "waterInfo",
          label: "水网-主"
        },
        {
          value: "safetyIndexInfo",
          label: "安全指数-主"
        },
          {
          value: "dangerInfo",
          label: "隐患检测-主"
        }
      ]
    };
  },
  props: {
    title: {
      // 组件标题
      type: String,
      default: "自定义标题"
    },
    containId: {
      // 组件唯一标识
      type: String,
      default: "container"
    },
    linkcomponent: {
      type: String,
      default: "message"
    },
    component: {
      type: String,
      default: "message"
    },
    lType: {
      type: String,
      default: "menu"
    },
    w: {
      type: String,
      default: "1"
    },
    h: {
      type: String,
      default: "200"
    }
  },
  created() {},
  computed: {
    placementComputed() {
      return this.placement ? "left" : "right";
    }
  },
  methods: {
    click() {
      if (this.lType != "main") {
        console.log(this.formItem, "点击事件");
        this.$emit("click", this.formItem);
      }
    },
    handleSubmit() {
      console.log("handleSubmit");
      this.formItem.id = this.containId.substring(9);
      this.$emit("save", this.formItem);
      this.$Notice.success({
        title: "提示信息",
        desc: "保存成功"
      });
    },
    handleResize(event) {
      const { atMin } = event;
      /* eslint-disable */
      console.log(atMin);
    },
    setMessage() {
      this.showWindowBDrawer = true;
      console.log("setMessage");
    },
    setRemove() {
      this.$emit("remove", this.containId.substring(9));
      console.log("setRemove");
    },
    changeLinkComponent() {},
    changeComponent() {
      var control = Message;
      if (this.formItem.component == "demo") {
        control = demo;
      } else if (this.formItem.component == "demo2") {
        control = demo2;
      } else if (this.formItem.component == "map") {
        control = map;
      } else if (this.formItem.component == "safetyIndex") {
        control = safetyIndex;
      } else if (this.formItem.component == "alarm") {
        control = alarm;
      } else if (this.formItem.component == "water") {
        control = water;
      } else if (this.formItem.component == "video") {
        control = video;
      } else if (this.formItem.component == "alarmTable") {
        control = alarmTable;
      } else if (this.formItem.component == "barrier") {
        control = barrier;
      } else if (this.formItem.component == "maintenance") {
        control = maintenance;
      } else if (this.formItem.component == "danger") {
        control = danger;
      } else if (this.formItem.component == "layer") {
        control = layer;
      } else if (this.formItem.component == "alarmInfo") {
        control = alarmInfo;
      } else if (this.formItem.component == "barrierInfo") {
        control = barrierInfo;
      } else if (this.formItem.component == "videoInfo") {
        control = videoInfo;
      } else if (this.formItem.component == "waterInfo") {
        control = waterInfo;
      } else if (this.formItem.component == "safetyIndexInfo") {
        control = safetyIndexInfo;
      }else if (this.formItem.component == "dangerInfo") {
        control = dangerInfo;
      }
      if (this.vm) {
        this.vm.$destroy();
      }

      this.vm = createMessage({
        id: this.containId,
        controlId: "control01",
        control: control,
        props: {
          text: "这是一个弹窗02"
        }
      });
    }
  },
  mounted() {
    console.log(this.linkcomponent);
    this.$nextTick(function() {
      var control = Message;
      if (this.component == "demo") {
        control = demo;
      } else if (this.component == "demo2") {
        control = demo2;
      } else if (this.component == "map") {
        control = map;
      } else if (this.formItem.component == "safetyIndex") {
        control = safetyIndex;
      } else if (this.formItem.component == "alarm") {
        control = alarm;
      } else if (this.formItem.component == "water") {
        control = water;
      } else if (this.formItem.component == "video") {
        control = video;
      } else if (this.formItem.component == "alarmTable") {
        control = alarmTable;
      } else if (this.formItem.component == "barrier") {
        control = barrier;
      } else if (this.formItem.component == "maintenance") {
        control = maintenance;
      } else if (this.formItem.component == "danger") {
        control = danger;
      } else if (this.formItem.component == "layer") {
        control = layer;
      } else if (this.formItem.component == "alarmInfo") {
        control = alarmInfo;
      } else if (this.formItem.component == "barrierInfo") {
        control = barrierInfo;
      } else if (this.formItem.component == "videoInfo") {
        control = videoInfo;
      } else if (this.formItem.component == "waterInfo") {
        control = waterInfo;
      } else if (this.formItem.component == "safetyIndexInfo") {
        control = safetyIndexInfo;
      }else if (this.formItem.component == "dangerInfo") {
        control = dangerInfo;
      }
      if (this.vm) {
        this.vm.$destroy();
      }
      this.vm = createMessage({
        id: this.containId,
        controlId: "control01",
        control: control,
        props: {
          text: "这是一个弹窗",
          w: (this.w / 12) * window.innerWidth,
          h: this.h
        }
      });
      // createMessage({
      //     id:this.containId,
      //     controlId:'control02',
      //     control:demo,
      //     props: {
      //         text: '这是一个弹窗2'
      //     }
      // });
    });
  }
};
</script>
 
