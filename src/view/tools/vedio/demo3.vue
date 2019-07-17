<template>
  <div>
    <Row>
      <Col span="12" v-for="item in items">
        <videos sourcesSrc="item"></videos>
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
      items: ['rtmp://localhost/live/test124', 'rtmp://localhost/live/test123', 'rtmp://localhost/live/test123', 'rtmp://localhost/live/test123']
    }
  },
  methods: {
    changeSrc () {
      console.log('changeSrc')
      this.sourcesSrc = 'rtmp://localhost/live/test123'
      console.log(this.sourcesSrc)
    }
  }
}
</script>
