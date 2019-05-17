<template>
<div>
  <div :id="id" ref="tet" class="plugin"></div>
  <Button @click="stopRealPlay">关闭预览</Button>     <Button @click="startRealPlay">开始预览</Button>
</div>
</template>
<script>
import remoteLoad from '@/assets/js/remoteLoad.js'
import WebVideoCtrl from '@/libs/webVideo.js'
export default {
  name: 'videoTemplate',
  data() {
    return {
      g_iWndIndex: 2,
      iStreamType: 1,

      szInfo: ''
    }
  },
  props: {
    id:{
      type: String,
      default: 'divPlugin'
    },
    ip: {
      type: String,
      default: '10.100.100.249'
    },
    port: {
      type: String,
      default: '80'
    },
    userName: {
      type: String,
      default: 'admin'
    },
    password: {
      type: String,
      default: 'jms123456'
    },
    split: {
      type: String,
      default: '1'
    },
    Num: { //第几路摄像头
      type: Number,
      default: 13
    },
    iChannelID: { //第几路摄像头
      type: Number,
      default: 2
    }
  },
  methods: {
    getChannelInfo() {

      var that = this;
      that.startRealPlay();
      // 模拟通道
      // WebVideoCtrl.I_GetAnalogChannelInfo(this.ip, {
      //   async: false,
      //   success: function(xmlDoc) {
      //     console.log("模拟通道",xmlDoc)
      //     // var oChannels = $(xmlDoc).find("VideoInputChannel");
      //     // nAnalogChannel = oChannels.length;
      //     //
      //     // $.each(oChannels, function (i) {
      //     // 	var id = parseInt($(this).find("id").eq(0).text(), 10),
      //     // 		name = $(this).find("name").eq(0).text();
      //     // 	if ("" == name) {
      //     // 		name = "Camera " + (id < 9 ? "0" + id : id);
      //     // 	}
      //     // 	oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
      //     // });
      //     // showOPInfo(szIP + " 获取模拟通道成功！");
      //     that.startRealPlay();
      //   },
      //   error: function() {
      //     //showOPInfo(szIP + " 获取模拟通道失败！");
      //   }
      // });
      // // 数字通道
      // WebVideoCtrl.I_GetDigitalChannelInfo(that.ip, {
      //   async: false,
      //   success: function(xmlDoc) {
      //     console.log("数字通道",xmlDoc)
      //     that.startRealPlay();
      //     // var oChannels = $(xmlDoc).find("InputProxyChannelStatus");
      //     //
      //     // $.each(oChannels, function (i) {
      //     // 	var id = parseInt($(this).find("id").eq(0).text(), 10),
      //     // 		name = $(this).find("name").eq(0).text(),
      //     // 		online = $(this).find("online").eq(0).text();
      //     // 	if ("false" == online) {// 过滤禁用的数字通道
      //     // 		return true;
      //     // 	}
      //     // 	if ("" == name) {
      //     // 		name = "IPCamera " + ((id - nAnalogChannel) < 9 ? "0" + (id - nAnalogChannel) : (id - nAnalogChannel));
      //     // 	}
      //     // 	oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
      //     // });
      //     // showOPInfo(szIP + " 获取数字通道成功！");
      //   },
      //   error: function() {
      //     //showOPInfo(szIP + " 获取数字通道失败！");
      //   }
      // });
      // // 零通道
      // WebVideoCtrl.I_GetZeroChannelInfo(that.ip, {
      //   async: false,
      //   success: function(xmlDoc) {
      //   //  that.startRealPlay();
      //     // var oChannels = $(xmlDoc).find("ZeroVideoChannel");
      //     //
      //     // $.each(oChannels, function (i) {
      //     // 	var id = parseInt($(this).find("id").eq(0).text(), 10),
      //     // 		name = $(this).find("name").eq(0).text();
      //     // 	if ("" == name) {
      //     // 		name = "Zero Channel " + (id < 9 ? "0" + id : id);
      //     // 	}
      //     // 	if ("true" == $(this).find("enabled").eq(0).text()) {// 过滤禁用的零通道
      //     // 		oSel.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
      //     // 	}
      //     // });
      //     // showOPInfo(szIP + " 获取零通道成功！");
      //   },
      //   error: function() {
      //     //showOPInfo(szIP + " 获取零通道失败！");
      //   }
      // });

    },
    startRealPlay() {
      var that = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(that.g_iWndIndex);
      console.log(oWndInfo)
      if (oWndInfo != null) { // 已经在播放了，先停止
        WebVideoCtrl.I_Stop();
      }
      var iRet = WebVideoCtrl.I_StartRealPlay(that.ip, {
        iStreamType: that.iStreamType,
        iChannelID: that.iChannelID,
        bZeroChannel: false //待修改
      });

      if (0 == iRet) {
        this.szInfo = "开始预览成功！";
      } else {
        this.szInfo = "开始预览失败！";
      }
      console.log(this.szInfo)
      //showOPInfo(szIP + " " + szInfo);
    },
    stopRealPlay() { //停止预览
      var that = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(that.g_iWndIndex),
        szInfo = "";

      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Stop();
        if (0 == iRet) {
          szInfo = "停止预览成功！";
        } else {
          szInfo = "停止预览失败！";
        }
        console.log(szInfo)
        // showOPInfo(oWndInfo.szIP + " " + szInfo);
      }
    },
    initVideo() {
      var that = this;
      // 检查插件是否已经安装过
      if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
        alert("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
        return;
      }
      // 初始化插件参数及插入插件
      WebVideoCtrl.I_InitPlugin(500, 300, {
        iWndowType: this.split,
        cbSelWnd: function(xmlDoc) {
          that.g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
          //  var szInfo = "当前选择的窗口编号：" + that.g_iWndIndex;
          //showCBInfo(szInfo);
        }
      });
      WebVideoCtrl.I_InsertOBJECTPlugin(this.id);
      // 检查插件是否最新
      if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
        alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
        return;
      }
      console.log("开始登陆")
      var iRet = WebVideoCtrl.I_Login(this.ip, 1, this.port, this.userName, this.password, {
        success: function(xmlDoc) {
          console.log(" 登录成功！", xmlDoc)

          // $("#ip").prepend("<option value='" + szIP + "'>" + szIP + "</option>");
          setTimeout(function() {
            that.getChannelInfo();
          }, 10);
        },
        error: function() {
          console.log(" 登录失败！")
          //showOPInfo(szIP + " 登录失败！");
        }
      });
      if (-1 == iRet) {
        console.log(" 已登录过！");
        setTimeout(function() {
          that.getChannelInfo();
        }, 10);
      }
    }

  },
  mounted() {
    console.log("mounted")
    var that = this;


    //  await remoteLoad(`../../assets/js/webVideoCtrl.js`)
    //await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
    this.$nextTick(() => {

      that.initVideo();

    })

    // // 已载入高德地图API，则直接初始化地图
    // if (window.WebVideoCtrl) {
    //   that.initVideo();
    //   // 未载入高德地图API，则先载入API再初始化
    // } else {
    //   //  await remoteLoad(`../../assets/js/webVideoCtrl.js`)
    //   //await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
    //   this.$nextTick(() => {
    //
    //     that.initVideo();
    //
    //   })
    //
    // }

  },
  created() {
    console.log("created")

  },
  destoryed() {
    console.log("destoryed")
    var that = this;
    that.stopRealPlay()
    var iRet = WebVideoCtrl.I_Logout(this.ip);
    if (0 == iRet) {
      this.szInfo = "退出成功！";
      // $("#ip option[value='" + szIP + "']").remove();
      // getChannelInfo();
    } else {
      this.szInfo = "退出失败！";
    }

    console.log(this.szInfo)
  }
}
</script>
<style>
@charset "utf-8";
/** {
  margin: 0;
  padding: 0;
}*/

/*html {
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-text-size-adjust: none;
  background: #FFFFFF;
}

body {
  padding: 5px;
}

select {
  height: 20px;
  line-height: 20px;
}*/

.left {
  float: left;
}

.freeze {
  /*position: relative;*/
  text-align: center;
  background: #343434;
  color: #FFFFFF;
  font-size: 26px;
  font-weight: bold;
  filter: alpha(opacity=60);
  opacity: 0.6;
}

.vtop {
  vertical-align: middle;
  margin-top: -1px;
}

/*插件*/

.plugin {
  width: 500px;
  height: 300px;
}

fieldset {
  display: block;
}

/*本地配置*/

.localconfig {
  width: 480px;
  padding: 10px;
  border: 1px solid #7F9DB9;
}

.localconfig .tt {
  width: 125px;
}

.localconfig .txt {
  width: 310px;
}

.localconfig .btn {
  width: 45px;
  height: 22px;
  line-height: 18px;
}

.localconfig .sel {
  width: 120px;
}

/*登录*/

.login {
  width: 480px;
  padding: 10px;
  border: 1px solid #7F9DB9;
}

.login .tt {
  width: 100px;
}

.login .txt {
  width: 130px;
}

.login .btn {
  width: 45px;
  height: 22px;
  line-height: 18px;
}

.login .btn2 {
  width: 100px;
  height: 22px;
  line-height: 18px;
}

.login .sel {
  width: 130px;
}

.login .sel2 {
  width: 65px;
}

/*数字通道*/

.ipchannel {
  width: 480px;
  padding: 10px;
  border: 1px solid #7F9DB9;
}

.ipchannel .btn {
  width: 130px;
  height: 22px;
  line-height: 18px;
}

.ipchannel .digitaltdiv {
  height: 100px;
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid #7F9DB9;
  font-size: 11px;
}

.ipchannel .digitalchannellist th,
.ipchannel .digitalchannellist td {
  padding: 2px;
  border: 1px solid #7F9DB9;
  border-collapse: collapse;
  white-space: nowrap;
}

/*预览*/

.preview {
  width: 450px;
  padding: 10px;
  padding-top: 0;
  margin-left: 10px;
  border: 1px solid #7F9DB9;
}

.preview .tt {
  width: 60px;
}

.preview .txt {
  width: 30px;
}

.preview .btn {
  width: 70px;
  height: 22px;
  line-height: 18px;
}

.preview .btn2 {
  width: 90px;
  height: 22px;
  line-height: 18px;
}

.preview .sel {
  width: 105px;
}

/*云台*/

.ptz {
  width: 450px;
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #7F9DB9;
}

.ptz .tt {
  width: 60px;
}

.ptz .txt {
  width: 60px;
}

.ptz .btn {
  width: 45px;
  height: 22px;
  line-height: 18px;
}

.ptz .btn2 {
  width: 60px;
  height: 22px;
  line-height: 18px;
}

.ptz .sel {
  width: 65px;
}

/*视频参数*/

.videoparam {
  width: 450px;
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #7F9DB9;
}

.videoparam .tt {
  width: 60px;
}

.videoparam .txt {
  width: 60px;
}

.videoparam .btn {
  width: 45px;
  height: 22px;
  line-height: 18px;
}

.videoparam .sel {
  width: 65px;
}

/*回放*/

.playback {
  width: 450px;
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #7F9DB9;
}

.playback .tt {
  width: 60px;
}

.playback .txt {
  width: 140px;
}

.playback .btn {
  width: 45px;
  height: 22px;
  line-height: 18px;
}

.playback .btn2 {
  width: 70px;
  height: 22px;
  line-height: 18px;
}

.playback .sel {
  width: 65px;
}

.playback .searchdiv {
  height: 100px;
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid #7F9DB9;
  font-size: 11px;
}

.playback .searchlist th,
.playback .searchlist td {
  padding: 2px;
  border: 1px solid #7F9DB9;
  border-collapse: collapse;
  white-space: nowrap;
}

/*系统维护*/

.maintain {
  width: 450px;
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #7F9DB9;
}

.maintain .tt {
  width: 60px;
}

.maintain .txt {
  width: 280px;
}

.maintain .btn {
  width: 45px;
  height: 22px;
  line-height: 18px;
}

.maintain .btn2 {
  width: 100px;
  height: 22px;
  line-height: 18px;
}

.maintain .sel {
  width: 65px;
}

/*操作信息*/

.operate {
  width: 450px;
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #7F9DB9;
}

.operate .opinfo {
  height: 150px;
  border: 1px solid #7F9DB9;
  overflow: auto;
}

/*事件回调*/

.callback {
  width: 450px;
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #7F9DB9;
}

.callback .cbinfo {
  height: 114px;
  border: 1px solid #7F9DB9;
  overflow: auto;
}

/*IP解析*/

.ipparse {
  width: 480px;
  padding: 10px;
  border: 1px solid #7F9DB9;
}

.ipparse .tt {
  width: 100px;
}

.ipparse .txt {
  width: 130px;
}

.ipparse .btn {
  width: 90px;
  height: 22px;
  line-height: 18px;
}

.ipparse .sel {
  width: 130px;
}
</style>
