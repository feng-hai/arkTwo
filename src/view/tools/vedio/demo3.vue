<template>
  <div>
    <Row>
      <Col span="12" v-for="item in items">
        <videos :sourcesSrc="item"></videos>
      </Col>
    </Row>

    <!-- <div style="float:left">
      <videos></videos>
    </div>
    <div style="float:left">
      <videos :sourcesSrc="sourcesSrc"></videos>
    </div>
    <Button type="primary" @click="changeSrc">Primary</Button> -->
  </div>
</template>
<script>
import videos from '_c/video2'
export default {
  components: {
    videos
  },
  data () {
    return {
      items: ['rtmp://47.103.98.47/live/test123', 'rtmp://47.103.98.47/live/test124', 'rtmp://47.103.98.47/live/stream', 'rtmp://47.103.98.47/live/stream']
    }
  },
  methods: {
    changeSrc () {
      console.log('changeSrc')
      this.sourcesSrc = 'rtmp://47.103.98.47/live/stream'
      console.log(this.sourcesSrc)
    }
  }
}
</script>
