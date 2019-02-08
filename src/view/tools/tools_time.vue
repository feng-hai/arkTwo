<template>
<div>
  <Card :bordered="false">
    <p slot="title">当前时间戳和日期</p>
    <span>当前日期：</span> <span>{{dateStr}}</span> <br/>  <span>当前日期时间戳：</span> <span>{{dateNum}}</span>
  </Card>
  <div style="margin-top:20px;">
    <Card :bordered="false">
      <p slot="title">时间戳转日期格式</p>

      <Form ref="formInline1" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
          <Input type="text" style="width:200px" v-model="formInline.user" placeholder="请输入时间戳:1572373430000">
          </Input>
        </FormItem>
        <FormItem>
          <Select v-model="numtype01" style="width:60px">
            <Option v-for="item in numTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline1')">转换</Button>
        </FormItem>
        <FormItem>
          <Input type="text" style="width:200px" v-model="formInline.password" placeholder="转换结果">
          </Input>
        </FormItem>
      </Form>

    </Card>
  </div>
  <div style="margin-top:20px;">
    <Card :bordered="false">
      <p slot="title">日期转时间戳</p>

      <Form ref="formInline2" :model="formInline2" :rules="ruleInline2" inline>
        <FormItem prop="user">
          <Input type="text" style="width:200px" v-model="formInline2.user" placeholder="请输入日期:2019-10-30 02:23:50">
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit2('formInline2')">转换</Button>
        </FormItem>
        <FormItem>
          <Input type="text" v-model="formInline2.password" placeholder="转换结果">
          </Input>
        </FormItem>
      </Form>

    </Card>
  </div>
</div>
</template>
<script>
import {
  formateDate
} from '@/libs/util'

export default {

  data() {

    const validateOrderNum = (rule, value, callback) => {
      if (value % 1 != 0) {
        callback(new Error("请输入整数"))
      } else {
        callback()
      }
    }
    return {
      dateStr: '2019-01-26 07:13:45.377',
      dateNum:"",
      numtype01: 's',
      numtype02: 's',
      numTypes: [{
          value: 's',
          label: '秒'
        },
        {
          value: 'ms',
          label: '毫秒'
        }
      ],
      formInline: {
        user: '',
        password: ''
      },
      formInline2: {
        user: '',
        password: ''
      },
      ruleInline2: {
        user: [{
          required: true,
          message: '日期不能为空',
          trigger: 'blur'
        }, {
          pattern: /^[0-9]{4}-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9](.(\d{1,3}))?$/,
          message: '请输入正确的日期格式',
          trigger: 'blur',
        }]
      },
      ruleInline: {
        user: [{
          required: true,
          message: '时间戳不能为空',
          trigger: 'blur'
        }, {
          pattern: /^[0-9]+$/,
          message: '请输入数字类型',
          trigger: 'blur',
          trunsform(value) {
            return Number(value)
          },
          validator: validateOrderNum
        }]

      }
    }
  },
  mounted() {
    var that=this;

    setInterval(function(){
      that.dateStr=formateDate(new Date(),'yyyy-MM-dd HH:mm:ss.S')
      that.dateNum=new Date().getTime()
    }, 1500);
  },
  methods: {
    handleSubmit(name) {
      var that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (that.numtype01 == 's') {
            that.formInline.password = formateDate(new Date(that.formInline.user * 1), 'yyyy-MM-dd HH:mm:ss')
          } else {
            that.formInline.password = formateDate(new Date(that.formInline.user * 1), 'yyyy-MM-dd HH:mm:ss.S')
          }
          // this.$Message.success('Success!');
        } else {
          // this.$Message.error('Fail!');
        }
      })
    },
    handleSubmit2(name) {
      var that = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          that.formInline2.password = new Date(that.formInline2.user).getTime()
          // this.$Message.success('Success!');
        } else {
          // this.$Message.error('Fail!');
        }
      })
    }
  }
}
</script>
