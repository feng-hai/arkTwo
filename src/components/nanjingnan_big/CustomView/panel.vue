<!--
 * @Descripttion: 自定义视图面板，用于放控件的容器
 * @version: 0.1
 * @Author: fh
 * @Date: 2019-06-29 12:43:50
 * @LastEditors: fh
 * @LastEditTime: 2019-07-29 22:35:44
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
            <Option v-for="item in controlMessage" :value="item.id" :key="item.id">{{ item.title }}</Option>
          </Select>
        </FormItem>
        <FormItem label="连接组件">
          <Select v-model="formItem.linkcomponent" @on-change="changeLinkComponent">
            <Option v-for="item in controlMessage" :value="item.id" :key="item.id">{{ item.title }}</Option>
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
import createMessage from './container.js'
import DragDrawer from '_c/drag-drawer'

export default {
  name: 'contain',
  components: {
    DragDrawer
  },

  data () {
    return {
      showWindowBDrawer: false,
      showContainerBDrawer: false,
      showBDrawer3: false,
      width1: 300,
      width2: 200,
      placement: false,
      draggable: true,
      model1: 'Message',
      controlMessage: [],
      formItem: {
        title: this.title,
        component: this.component,
        radio: 'true',
        lType: this.lType,
        linkcomponent: this.linkcomponent
      }
    }
  },
  props: {
    title: {
      // 组件标题
      type: String,
      default: '自定义标题'
    },
    containId: {
      // 组件唯一标识
      type: String,
      default: 'container'
    },
    linkcomponent: {
      type: String,
      default: 'message'
    },
    component: {
      type: String,
      default: 'message'
    },
    lType: {
      type: String,
      default: 'menu'
    },
    w: {
      type: String | Number | Function,
      default: '1'
    },
    h: {
      type: String,
      default: '200'
    }
  },
  created () {},
  computed: {
    placementComputed () {
      return this.placement ? 'left' : 'right'
    }
  },
  methods: {
    click () {
      // console.log("click");
      if (this.lType != 'main') {
        // console.log(this.formItem, "点击事件");
        this.$emit('click', this.formItem)
      }
    },
    itemclick (item, type) {
      this.$emit('click', item, type)
    },
    handleSubmit () {
      // console.log("handleSubmit");
      this.formItem.id = this.containId.substring(9)
      this.$emit('save', this.formItem)
      this.$Notice.success({
        title: '提示信息',
        desc: '保存成功'
      })
    },
    handleResize (event) {
      const { atMin } = event
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
      if (this.vm) {
        this.vm.$destroy();
      }
      this.vm = createMessage({
        id: this.containId,
        controlId: "control01",
        control: this._controls[this.formItem.component],
        props: {
          text: "这是一个弹窗02",
          w: this.w,
          h: this.h
        }
      });
    }
  },
  beforeMount() {
    //从数据库中获取组件数据
    this.controlMessage = [
      {
        id: "Message",
        title: "自定义信息",
        component: () => import("./message.vue"),
        islink: true
      },
      {
        id: "demo",
        title: "图表",
        component: () => import("@/view/tools/charts/demo"),
        islink: true
      },
      {
        id: "demo2",
        title: "柱状图表",
        component: () => import("@/view/tools/charts/demo"),
        islink: true
      },
      {
        id: "map",
        title: "地图",
        component: () => import("@/view/tools/charts/map"),
        islink: true
      },
       {
        id: "contingencyPlan",
        title: "应急预案",
        component: () => import("../components/contingencyPlan/contingency"),
        islink: true
      },
      {
        id: "safetyIndex",
        title: "安全指数",
        component: () => import("./safetyIndex.vue"),
        islink: true
      },
        {
        id: "safetyIndexV2",
        title: "安全指数V2",
        component: () => import("./safetyIndex2.vue"),
        islink: true
      },
      {
        id: "alarm",
        title: "报警",
        component: () => import("../components/alarmInfo/alarm"),
        islink: true
      },
      {
        id: "water",
        title: "水网",
        component: () => import("../components/waterNetwork/water"),
        islink: true
      },
      {
        id: "video",
        title: "视频",
        component: () => import("../components/videoInfo/video"),
        islink: true
      },
      {
        id: "alarmTable",
        title: "报警列表",
        component: () => import("../components/alarmInfo/alarmTable"),
        islink: true
      },
      {
        id: "barrier",
        title: "巡检管理",
        component: () => import("../components/barrierInfo/barrierEcharts"),
        islink: true
      },
      {
        id: "maintenance",
        title: "维护保养",
        component: () => import("../components/maintenance/maintenance"),
        islink: true
      },
      {
        id: "danger",
        title: "隐患检测",
        component: () => import("../components/hiddenDanger/danger"),
        islink: true
      },
      {
        id: "layer",
        title: "图形标注",
        component: () => import("@/view/nanjingnan_big/home"),
        islink: true
      },
      {
        id: "alarmInfo",
        title: "监控点位",
        component: () => import("@/view/nanjingnan_big/alarm/alarmInfo"),
        islink: true
      },
      {
        id: "barrierInfo",
        title: "巡检管理-主",
        component: () =>
          import("@/view/nanjingnan_big/components/inspactionInfo"),
        islink: true
      },
      {
        id: "videoInfo",
        title: "视频列表-主",
        component: () => import("@/view/nanjingnan_big/videos/video"),
        islink: true
      },
      {
        id: "waterInfo",
        title: "水网-主",
        component: () => import("@/view/nanjingnan_big/water/water"),
        islink: true
      },
      {
        id: "safetyIndexInfo",
        title: "安全指数-主",
        component: () => import("@/view/nanjingnan_big/safety/safetyIndexInfo"),
        islink: true
      },
      {
        id: "dangerInfo",
        title: "隐患检测-主",
        component: () =>
          import("@/view/nanjingnan_big/hiddenDanger/dangerInfo"),
        islink: true
      }
    ];
    this._controls = {};
    var that = this;
    this.controlMessage.forEach(element => {
      that._controls[element.id] = element.component;
    });
  },
  mounted() {
    this.$nextTick(function() {
      var that = this;
      if (this.vm) {
        this.vm.$destroy();
      }
      this.vm = createMessage({
        id: this.containId,
        controlId: "control01",
        control: this._controls[this.component],
        props: {
          text: "这是一个弹窗",
          w: this.w,
          h: this.h
        },
        click:this.itemclick
      });
    });
  },
  beforeDestroy() {
    if (this.vm) {
      this.vm.$destroy();
    }
    this.controlMessage=[];
    this._controls={};
  }
};
</script>
 
