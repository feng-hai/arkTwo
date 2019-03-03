<template>
<div>
  <Card style="margin-top:20px">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      预案流程
    </p>
    <Button slot="extra" @click.prevent="changeContent">修改编辑器内容</Button>
    <editor ref="editor" :value="content" @on-change="handleChange" />

  </Card>
  <Card style="margin-top:20px">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      小组分工
    </p>
    <Button slot="extra" @click="changeContent">修改编辑器内容</Button>
    <editor ref="editor" :value="content" @on-change="handleChange" />

  </Card>
</div>
</template>

<script>
import Editor from '_c/editor'
export default {
  name: 'editor_page',
  components: {
    Editor
  },
  data() {
    return {
      content: '12312323'
    }
  },
  methods: {
    handleChange(html, text) {
      console.log(html, text)
      this.content=html
    },
    changeContent() {
      console.log("save",this.content)
      this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
    }
  }
}
</script>

<style>

</style>
