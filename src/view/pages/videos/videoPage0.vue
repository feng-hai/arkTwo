<template>
<div>
  <Card style="margin-top:20px">
    <videoTemplate :iChannelID="iChannelID" :id="id1"></videoTemplate>
  </Card>
</div>
</template>
<script>
import videoTemplate from '_c/video/index.js'
export default {
  name: 'videoPage',
  components: {
    videoTemplate
  },
  data() {
    return {
      iChannelID: 1,
      id1:"divPlugin1",

    }
  }
}
</script>
