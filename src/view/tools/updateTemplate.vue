<template>
<Upload ref="upload" type="drag" :on-remove="handleRemove" :default-file-list="defaultList" action="https://121.41.42.184/aquaman/attachment" :headers="headers" :before-upload="handleBeforeUpload" :on-success="updateSuccess">
  <div style="padding:20px 0">
    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
    <p>Click or drag files here to upload</p>
  </div>
</Upload>
</template>
<script>
import {
  setToken,
  getToken
} from '@/libs/util'
export default {
  name: 'updateImage',
  computed: {

  },
  data() {
    return {
      headers: {
        'Authorization': 'bearer ' + getToken(),
        'Accept': 'application/json'
      },
      defaultList: [],
      uploadList: []
    }
  },
  methods: {
    updateSuccess(res, file, fileList) {
      this.$emit("updateClick",res);
    },
    handleRemove(file) {
      //console.log(file, "删除信息")
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: '请先删除，再上传图片！'
        });
      }
      return check;
    }
  }

}
</script>
