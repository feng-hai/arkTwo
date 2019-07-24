<!--
 * @Descripttion: 自定义视图面板，用于放控件的容器
 * @version: 0.1
 * @Author: fh
 * @Date: 2019-06-29 12:43:50
 * @LastEditors: fh
 * @LastEditTime: 2019-07-21 11:32:18
 -->
 <template>
  <Card style="width:100%;height:100%" :title="formItem.title">
    <!-- <p v-if=false ref="head01" slot="title">

      <span v-text="formItem.title"></span>
    </p>-->
    <a   ref="head02" href="#" slot="extra">

      <Icon type="md-settings" @click.prevent="setMessage" />
      <Icon type="md-remove" @click.prevent="setRemove" />
    </a>
    <div :id="containId"></div>
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

      <Form :model="formItem"  label-position="top">
        <FormItem label="标题名称">
          <Input v-model="formItem.title" placeholder="标题"  />
        </FormItem>
         <FormItem label="布局类型">
          <Input v-model="formItem.lType" placeholder="布局类型"  />
        </FormItem>
        <FormItem label="组件名称">
          <Select v-model="formItem.component"  @on-change="changeComponent">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
import demo from '@/view/tools/charts/editCharts'
import demo2 from '@/view/tools/charts/demo'
import map from '@/view/tools/charts/map'
// 弹窗组件单文件
import Message from './message.vue'
// 弹窗组件单文件
import MessageTwo from './messageTwo.vue'
export default {
  name: 'contain',
  components: {
    DragDrawer,
    demo,
    demo2,
    map
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
      formItem: {
        title: this.title,
        component: this.component,
        radio: 'true',
        lType:this.lType
      },
      cityList: [
        {
          value: 'Message',
          label: '自定义信息'
        },
        {
          value: 'demo',
          label: '图表'
        },
        {
          value: 'demo2',
          label: '柱状图表'
        },
        {
          value: 'map',
          label: '地图'
        }
      ]
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
    component: {
      type: String,
      default: 'message'
    },
    lType:{
      type:String,
      default:''
    }
  },
  created () {},
  computed: {
    placementComputed () {
      return this.placement ? 'left' : 'right'
    }
  },
  methods: {
    handleSubmit () {
      console.log('handleSubmit')
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
    changeComponent() {
      var control=Message;
      if(this.formItem.component=="demo")
      {
        control=demo;
      }else if(this.formItem.component=="demo2")
      {
        control=demo2
      }else if(this.formItem.component=="map")
      {
        control=map
      }
      createMessage({
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
    this.$nextTick(function() {

    
      var control=Message;
      if(this.component=="demo")
      {
        control=demo;
      }else if(this.component=="demo2")
      {
        control=demo2
      }else if(this.component=="map")
      {
        control=map
      }
      

      createMessage({
        id: this.containId,
        controlId: "control01",
        control: control,
        props: {
          text: "这是一个弹窗"
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
 
