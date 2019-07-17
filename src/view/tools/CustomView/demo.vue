<template>
<div>
     <Row>
        <Col span="12"><div id="panels"></div></Col>
        <Col span="12"><div id="panels1"></div></Col>
    </Row>
</div>
</template>

<script>
import panel from './panel'
import createMessage from './container.js'
export default {
  components: {
    panel
  },
  props: [
    'text' // 这里是我们刚才创建vue实例传入的props
  ],
  mounted () {
    createMessage({
      id: 'panels',
      controlId: 'panel01',
      control: panel,
      props: {
        containId: 'contain02'
      }
    })
    createMessage({
      id: 'panels1',
      controlId: 'panel02',
      control: panel,
      props: {
        containId: 'contain01'
      }
    })
  }
}
</script>
