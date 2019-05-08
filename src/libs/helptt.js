import helprt from '@/libs/helprt.js'
var y = 200;
var s = window;
var I = new helprt()
var Z = function() {
    if (a.bDebugMode) {
      var e = k(arguments);
      d._alert(e)
    }
  },
  k = function() {
    for (var e = arguments[0], t = 1; t < arguments.length; t++) e = e.replace("%s", arguments[t]);
    return e
  },
  W = function(e) {
    return "undefined" == typeof e
  },
  _ = function() {
    var e = "";
    if (I.browser().msie) e = "<object classid='" + a.szOcxClassId + "' codebase='' standby='Waiting...' id='" + o + "' width='" + n + "' height='" + r + "' align='center' ><param name='wndtype' value='" + a.iWndowType + "'><param name='playmode' value='" + a.iPlayMode + "'><param name='colors' value='" + a.szColorProperty + "'></object>";
    else
      for (var t = navigator.mimeTypes.length, s = 0; t > s; s++) navigator.mimeTypes[s].type.toLowerCase() == a.szMimeTypes && (e = "<embed align='center' type='" + a.szMimeTypes + "' width='" + n + "' height='" + r + "' name='" + i + "' wndtype='" + a.iWndowType + "' playmode='" + a.iPlayMode + "' colors='" + a.szColorProperty + "'>");
    return e
  },
  E = function() {
    var e = c.HWP_GetLocalConfig();
    m = I.loadXML(e)
  },
  N = function(e) {
    f.I_GetDeviceInfo(e.szIP, {
      success: function(t) {
        e.szDeviceType = s.$XML(t).find("deviceType").eq(0).text()
      }
    }), f.I_GetAnalogChannelInfo(e.szIP, {
      success: function(t) {
        e.iAnalogChannelNum = s.$XML(t).find("VideoInputChannel", !0).length
      }
    }), f.I_GetAudioInfo(e.szIP, {
      success: function(t) {
        var n = s.$XML(t).find("audioCompressionType", !0);
        if (n.length > 0) {
          var r = s.$XML(n).eq(0).text(),
            o = 0;
          "G.711ulaw" == r ? o = 1 : "G.711alaw" == r ? o = 2 : "G.726" == r && (o = 3), e.iAudioType = o
        }
      }
    })
  },
  B = function(e) {
    var t = -1,
      s = -1,
      n = -1,
      r = null;
    if (O(e)) r = F(e), t = r.iRtspPort, n = r.iDevicePort;
    else {
      for (var o = V(e), i = !1, a = 0; a < o.length; a++)
        if (o[a].ipv4 == e.szIP || o[a].ipv6 == e.szIP) {
          i = !0;
          break
        }
      i ? r = F(e) : (r = U(e), -1 == t && -1 == n && (r = F(e))), t = r.iRtspPort, s = r.iHttpPort, n = r.iDevicePort
    }
    return r
  },
  F = function(e) {
    var t = -1,
      n = -1,
      r = -1;
    return e.oProtocolInc.getPortInfo(e, {
      async: !1,
      success: function(e) {
        for (var o = s.$XML(e).find("AdminAccessProtocol", !0), i = 0, a = o.length; a > i; i++) "rtsp" === s.$XML(o).eq(i).find("protocol").eq(0).text().toLowerCase() && (t = parseInt(s.$XML(o).eq(i).find("portNo").eq(0).text(), 10)), "http" === s.$XML(o).eq(i).find("protocol").eq(0).text().toLowerCase() && (n = parseInt(s.$XML(o).eq(i).find("portNo").eq(0).text(), 10)), "dev_manage" === s.$XML(o).eq(i).find("protocol").eq(0).text().toLowerCase() && (r = parseInt(s.$XML(o).eq(i).find("portNo").eq(0).text(), 10))
      },
      error: function() {
        t = -1, n = -1, r = -1
      }
    }), {
      iRtspPort: t,
      iHttpPort: n,
      iDevicePort: r
    }
  },
  U = function(e) {
    var t = -1,
      n = -1,
      r = -1;
    return e.oProtocolInc.getUPnPPortStatus(e, {
      async: !1,
      success: function(e) {
        for (var o = s.$XML(e).find("portStatus", !0), i = 0, a = o.length; a > i; i++) "rtsp" == s.$XML(o).eq(i).find("internalPort").eq(0).text().toLowerCase() && (t = parseInt(s.$XML(o).eq(i).find("externalPort").eq(0).text(), 10)), "http" == s.$XML(o).eq(i).find("internalPort").eq(0).text().toLowerCase() && (n = parseInt(s.$XML(o).eq(i).find("externalPort").eq(0).text(), 10)), "admin" == s.$XML(o).eq(i).find("internalPort").eq(0).text().toLowerCase() && (r = parseInt(s.$XML(o).eq(i).find("externalPort").eq(0).text(), 10))
      },
      error: function() {
        t = -1, n = -1, r = -1
      }
    }), {
      iRtspPort: t,
      iHttpPort: n,
      iDevicePort: r
    }
  },
  V = function(e) {
    var t = [];
    return e.oProtocolInc.getNetworkBond(e, {
      async: !1,
      success: function(n) {
        "true" == s.$XML(n).find("enabled").eq(0).text() ? t.push({
          ipv4: s.$XML(n).find("ipAddress").eq(0).text(),
          ipv6: s.$XML(n).find("ipv6Address").eq(0).text()
        }) : e.oProtocolInc.getNetworkInterface(e, {
          async: !1,
          success: function(e) {
            for (var n = s.$XML(e).find("NetworkInterface", !0), r = 0, o = n.length; o > r; r++) {
              t.push({
                ipv4: s.$XML(e).find("ipAddress").eq(0).text(),
                ipv6: s.$XML(e).find("ipv6Address").eq(0).text()
              });
              break
            }
          },
          error: function() {}
        })
      },
      error: function() {
        e.oProtocolInc.getNetworkInterface(e, {
          success: function(e) {
            for (var n = s.$XML(e).find("NetworkInterface", !0), r = 0, o = n.length; o > r; r++) {
              t.push({
                ipv4: s.$XML(e).find("ipAddress").eq(0).text(),
                ipv6: s.$XML(e).find("ipv6Address").eq(0).text()
              });
              break
            }
          },
          error: function() {}
        })
      }
    }), t
  },
  O = function(e) {
    var t = !1;
    return e.oProtocolInc.getPPPoEStatus(e, {
      async: !1,
      success: function(e) {
        t = s.$XML(e).find("ipAddress", !0).length > 0 ? !0 : s.$XML(e).find("ipv6Address", !0).length > 0 ? !0 : !1
      },
      error: function() {
        t = !1
      }
    }), t
  },
  j = function(e) {
    e.oStreamCapa.bObtained || e.oProtocolInc instanceof tt && (G == e.szDeviceType || X == e.szDeviceType || H == e.szDeviceType ? e.oProtocolInc.getStreamChannels(e, {
      async: !1,
      success: function(t) {
        e.oStreamCapa.bObtained = !0;
        for (var s = $(t).find("streamingTransport", !0).length, n = 0; s > n; n++)
          if ("shttp" == $(t).find("streamingTransport").eq(n).text().toLowerCase()) {
            e.oStreamCapa.bObtained = !0, e.oStreamCapa.bSupportShttpPlay = !0, e.oStreamCapa.bSupportShttpPlayback = !0, e.oStreamCapa.bSupportShttpsPlay = !0, e.oStreamCapa.bSupportShttpsPlayback = !0, e.oStreamCapa.iIpChanBase = 1;
            break
          }
      },
      error: function() {}
    }) : e.oProtocolInc.getSDKCapa(e, {
      async: !1,
      success: function(t) {
        e.oStreamCapa.bObtained = !0, e.oStreamCapa.bSupportShttpPlay = "true" === s.$XML(t).find("isSupportHttpPlay").eq(0).text(), e.oStreamCapa.bSupportShttpPlayback = "true" === s.$XML(t).find("isSupportHttpPlayback").eq(0).text(), e.oStreamCapa.bSupportShttpsPlay = "true" === s.$XML(t).find("isSupportHttpsPlay").eq(0).text(), e.oStreamCapa.bSupportShttpsPlayback = "true" === s.$XML(t).find("isSupportHttpsPlayback").eq(0).text(), e.oStreamCapa.bSupportShttpPlaybackTransCode = "true" === s.$XML(t).find("isSupportHttpTransCodePlayback").eq(0).text(), e.oStreamCapa.bSupportShttpsPlaybackTransCode = "true" === s.$XML(t).find("isSupportHttpsTransCodePlayback").eq(0).text(), s.$XML(t).find("ipChanBase", !0).length > 0 && (e.oStreamCapa.iIpChanBase = parseInt(s.$XML(t).find("ipChanBase").eq(0).text(), 10))
      },
      error: function() {
        e.oStreamCapa.bObtained = !0
      }
    }))
  },
  K = function(e) {
    var t = {
      TransFrameRate: "",
      TransResolution: "",
      TransBitrate: ""
    };
    if (I.extend(t, e), "" == t.TransFrameRate || "" == t.TransResolution || "" == t.TransBitrate) return "";
    var s = [];
    return s.push("<?xml version='1.0' encoding='UTF-8'?>"), s.push("<CompressionInfo>"), s.push("<TransFrameRate>" + t.TransFrameRate + "</TransFrameRate>"), s.push("<TransResolution>" + t.TransResolution + "</TransResolution>"), s.push("<TransBitrate>" + t.TransBitrate + "</TransBitrate>"), s.push("</CompressionInfo>"), s.join("")
  };
var et = function() {
  this.options = {
    type: "GET",
    url: "",
    auth: "",
    timeout: 1e4,
    data: "",
    async: !0,
    success: null,
    error: null
  }, this.m_szHttpHead = "", this.m_szHttpContent = "", this.m_szHttpData = ""
};
et.prototype.m_httpRequestSet = [],
  et.prototype.setRequestParam = function(e) {
    I.extend(this.options, e)
  },
  et.prototype.submitRequest = function() {
    var e = this.getHttpMethod(this.options.type),
      t = null;
    if (this.options.async) {
      var s = window.videoCtrl1.c.HWP_SubmitHttpRequest(e, this.options.url, this.options.auth, this.options.data, this.options.timeout); - 1 != s && (t = {
        iRequestID: s,
        funSuccessCallback: this.options.success,
        funErrorCallback: this.options.error
      }, this.m_httpRequestSet.push(t))
    } else {
      var n =  window.videoCtrl1.c.HWP_SendHttpSynRequest(e, this.options.url, this.options.auth, this.options.data, this.options.timeout);
      t = {
        funSuccessCallback: this.options.success,
        funErrorCallback: this.options.error
      }, this.httpDataAnalyse(t, n)
    }
  }, et.prototype.getHttpMethod = function(e) {
    var t = {
        GET: 1,
        POST: 2,
        PUT: 5,
        DELETE: 6
      },
      s = t[e];
    return s ? s : -1
  }, et.prototype.processCallback = function(e, t) {
    console.log("processCallback")
    for (var s = null, n = 0; n < this.m_httpRequestSet.length; n++)
      if (e == this.m_httpRequestSet[n].iRequestID) {
        s = this.m_httpRequestSet[n], this.m_httpRequestSet.splice(n, 1);
        break
      }
    null != s && (this.httpDataAnalyse(s, t), s = null)
  }, et.prototype.httpDataAnalyse = function(e, t) {
    console.log("httpDataAnalyse")
    var s = "",
      n = 0;
    "" == t || W(t) ? e.funErrorCallback() : (n = parseInt(t.substring(0, 3)), s = t.substring(3, t.length), isNaN(n) ? e.funErrorCallback() : y == n ? e.funSuccessCallback(I.loadXML(s)) : e.funErrorCallback(n, I.loadXML(s)))
  };



var tt = function() {};
tt.prototype.CGI = {
  login: "%s%s:%s/ISAPI/Security/userCheck",
  getAudioInfo: "%s%s:%s/ISAPI/System/TwoWayAudio/channels",
  getDeviceInfo: "%s%s:%s/ISAPI/System/deviceInfo",
  getAnalogChannelInfo: "%s%s:%s/ISAPI/System/Video/inputs/channels",
  getDigitalChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/status",
  getZeroChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels",
  getStreamChannels: {
    analog: "%s%s:%s/ISAPI/Streaming/channels",
    digital: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels"
  },
  getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
  startRealPlay: {
    channels: "%s%s:%s/PSIA/streaming/channels/%s",
    zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
  },
  startShttpRealPlay: {
    channels: "%s%s:%s/SDK/play/%s/004",
    zeroChannels: "%s%s:%s/SDK/play/100/004/ZeroStreaming"
  },
  startVoiceTalk: {
    open: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/open",
    close: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/close",
    audioData: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/audioData"
  },
  ptzControl: {
    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/continuous",
    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/continuous"
  },
  ptzAutoControl: {
    ipdome: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/autoPan",
    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/autoPan"
  },
  setPreset: {
    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s",
    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s"
  },
  goPreset: {
    analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
    digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s/goto"
  },
  ptzFocus: {
    analog: "%s%s:%s/ISAPI/Image/channels/%s/focus",
    digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/focus",
    ipc: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/focus"
  },
  ptzIris: {
    analog: "%s%s:%s/ISAPI/Image/channels/%s/iris",
    digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/iris",
    ipc: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/iris"
  },
  getNetworkBond: "%s%s:%s/ISAPI/System/Network/Bond",
  getNetworkInterface: "%s%s:%s/ISAPI/System/Network/interfaces",
  getUPnPPortStatus: "%s%s:%s/ISAPI/System/Network/UPnP/ports/status",
  getPPPoEStatus: "%s%s:%s/ISAPI/System/Network/PPPoE/1/status",
  getPortInfo: "%s%s:%s/ISAPI/Security/adminAccesses",
  recordSearch: "%s%s:%s/ISAPI/ContentMgmt/search",
  startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
  startShttpPlayback: "%s%s:%s/SDK/playback/%s",
  startShttpReversePlayback: "%s%s:%s/SDK/playback/%s/reversePlay",
  startTransCodePlayback: "%s%s:%s/SDK/playback/%s/transcoding",
  startDownloadRecord: "%s%s:%s/ISAPI/ContentMgmt/download",
  deviceConfig: "%s%s:%s/ISAPI/System/configurationData",
  restart: "%s%s:%s/ISAPI/System/reboot",
  restore: "%s%s:%s/ISAPI/System/factoryReset?mode=%s",
  startUpgrade: {
    upgrade: "%s%s:%s/ISAPI/System/updateFirmware",
    status: "%s%s:%s/ISAPI/System/upgradeStatus"
  },
  set3DZoom: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/position3D",
  SDKCapabilities: "%s%s:%s/SDK/capabilities"
}, tt.prototype.login = function(e, t, n, r, c1) {

  var o = 2 == r.protocol ? "https://" : "http://",
    i = k(this.CGI.login, o, e, t),
    a = new et,
    c = {
      type: "GET",
      url: i,
      auth: n,
      success: null,
      error: null
    };
  I.extend(c, r), I.extend(c, {
    success: function(e) {
      "200" == window.$XML(e).find("statusValue").eq(0).text() || "OK" == window.$XML(e).find("statusString").eq(0).text() ? r.success && r.success(e) : r.error && r.error(401, e)
    },
    error: function(e, t) {
      r.error && r.error(e, t)
    }
  }), a.setRequestParam(c), a.submitRequest()
}, tt.prototype.getAudioInfo = function(e, t) {
  var s = k(this.CGI.getAudioInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.getDeviceInfo = function(e, t) {
  var n = k(this.CGI.getDeviceInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
    s = window,
    r = new et,
    o = {
      type: "GET",
      url: n,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(o, t),
    I.extend(o, {
      success: function(e) {
        var n = [];
        n.push("<DeviceInfo>"),
          n.push("<deviceName>" + I.escape(s.$XML(e).find("deviceName").eq(0).text()) + "</deviceName>"),
          n.push("<deviceID>" + s.$XML(e).find("deviceID").eq(0).text() + "</deviceID>"),
          n.push("<deviceType>" + s.$XML(e).find("deviceType").eq(0).text() + "</deviceType>"),
          n.push("<model>" + s.$XML(e).find("model").eq(0).text() + "</model>"),
          n.push("<serialNumber>" + s.$XML(e).find("serialNumber").eq(0).text() + "</serialNumber>"),
          n.push("<macAddress>" + s.$XML(e).find("macAddress").eq(0).text() + "</macAddress>"),
          n.push("<firmwareVersion>" + s.$XML(e).find("firmwareVersion").eq(0).text() + "</firmwareVersion>"),
          n.push("<firmwareReleasedDate>" + s.$XML(e).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>"),
          n.push("<encoderVersion>" + s.$XML(e).find("encoderVersion").eq(0).text() + "</encoderVersion>"),
          n.push("<encoderReleasedDate>" + s.$XML(e).find("encoderReleasedDate").eq(0).text() + "</encoderReleasedDate>"),
          n.push("</DeviceInfo>"),
          e = I.loadXML(n.join("")),
          t.success && t.success(e)
      },
      error: function(e, s) {
        t.error && t.error(e, s)
      }
    }), r.setRequestParam(o), r.submitRequest()
}, tt.prototype.getAnalogChannelInfo = function(e, t) {
  var n = k(this.CGI.getAnalogChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
    r = new et,
    o = {
      type: "GET",
      url: n,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(o, t), I.extend(o, {
    success: function(e) {
      var n = [];
      n.push("<VideoInputChannelList>");
      for (var r = s.$XML(e).find("VideoInputChannel", !0), o = 0, i = r.length; i > o; o++) {
        var a = r[o];
        n.push("<VideoInputChannel>"), n.push("<id>" + s.$XML(a).find("id").eq(0).text() + "</id>"), n.push("<inputPort>" + s.$XML(a).find("inputPort").eq(0).text() + "</inputPort>"), n.push("<name>" + I.escape(s.$XML(a).find("name").eq(0).text()) + "</name>"), n.push("<videoFormat>" + s.$XML(a).find("videoFormat").eq(0).text() + "</videoFormat>"), n.push("</VideoInputChannel>")
      }
      n.push("</VideoInputChannelList>"), e = I.loadXML(n.join("")), t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), r.setRequestParam(o), r.submitRequest()
}, tt.prototype.getDigitalChannelInfo = function(e, t) {
  var n = k(this.CGI.getDigitalChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
    s = window,
    r = new et,
    o = {
      type: "GET",
      url: n,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(o, t), I.extend(o, {
    success: function(e) {
      var n = [];
      n.push("<InputProxyChannelStatusList>");
      for (var r = s.$XML(e).find("InputProxyChannelStatus", !0), o = 0, i = r.length; i > o; o++) {
        var a = r[o];
        n.push("<InputProxyChannelStatus>"), n.push("<id>" + s.$XML(a).find("id").eq(0).text() + "</id>"), n.push("<sourceInputPortDescriptor>"), n.push("<proxyProtocol>" + s.$XML(a).find("proxyProtocol").eq(0).text() + "</proxyProtocol>"), n.push("<addressingFormatType>" + s.$XML(a).find("addressingFormatType").eq(0).text() + "</addressingFormatType>"), n.push("<ipAddress>" + s.$XML(a).find("ipAddress").eq(0).text() + "</ipAddress>"), n.push("<managePortNo>" + s.$XML(a).find("managePortNo").eq(0).text() + "</managePortNo>"), n.push("<srcInputPort>" + s.$XML(a).find("srcInputPort").eq(0).text() + "</srcInputPort>"), n.push("<userName>" + I.escape(s.$XML(a).find("userName").eq(0).text()) + "</userName>"), n.push("<streamType>" + s.$XML(a).find("streamType").eq(0).text() + "</streamType>"), n.push("<online>" + s.$XML(a).find("online").eq(0).text() + "</online>"), n.push("</sourceInputPortDescriptor>"), n.push("</InputProxyChannelStatus>")
      }
      n.push("</InputProxyChannelStatusList>"), e = I.loadXML(n.join("")), t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), r.setRequestParam(o), r.submitRequest()
}, tt.prototype.getZeroChannelInfo = function(e, t) {
  var s = k(this.CGI.getZeroChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.getStreamChannels = function(e, t) {
  if (0 != e.iAnalogChannelNum) var s = k(this.CGI.getStreamChannels.analog, e.szHttpProtocol, e.szIP, e.iCGIPort);
  else var s = k(this.CGI.getStreamChannels.digital, e.szHttpProtocol, e.szIP, e.iCGIPort);
  var n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.getPPPoEStatus = function(e, t) {
  var s = k(this.CGI.getPPPoEStatus, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.getUPnPPortStatus = function(e, t) {
  var s = k(this.CGI.getUPnPPortStatus, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.getNetworkBond = function(e, t) {
  var s = k(this.CGI.getNetworkBond, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.getNetworkInterface = function(e, t) {
  var s = k(this.CGI.getNetworkInterface, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.getPortInfo = function(e, t) {
  var s = k(this.CGI.getPortInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.startRealPlay = function(e, t) {
  var s = 100 * t.iChannelID + t.iStreamType,
    n = "";
  n = t.bZeroChannel ? k(t.cgi.zeroChannels, t.urlProtocol, e.szIP, t.iPort, s) : k(t.cgi.channels, t.urlProtocol, e.szIP, t.iPort, s);
  var r = window.videoCtrl1.c.HWP_Play(n, e.szAuth, t.iWndIndex, "", "");
  if (0 == r) {
    var o = new Q;
    o.iIndex = t.iWndIndex, o.szIP = e.szIP, o.iChannelID = t.iChannelID, o.iPlayStatus = window.videoCtrl1.v, window.videoCtrl1.p.push(o)
  }
  return r
}, tt.prototype.startVoiceTalk = function(e, t) {
  var s = k(this.CGI.startVoiceTalk.open, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
    n = k(this.CGI.startVoiceTalk.close, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
    r = k(this.CGI.startVoiceTalk.audioData, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
    o = c.HWP_StartVoiceTalk(s, n, r, e.szAuth, e.iAudioType);
  return o
}, tt.prototype.ptzAutoControl = function(e, t, s, n) {
  var r = s.iChannelID,
    o = "",
    i = "";
  if (n.iPTZSpeed = n.iPTZSpeed < 7 ? 15 * n.iPTZSpeed : 100, t && (n.iPTZSpeed = 0), e.szDeviceType != X) o = r <= e.iAnalogChannelNum ? k(this.CGI.ptzAutoControl.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID) : s.bShttpIPChannel ? k(this.CGI.ptzAutoControl.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : k(this.CGI.ptzAutoControl.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID), i = "<?xml version='1.0' encoding='UTF-8'?><autoPanData><autoPan>" + n.iPTZSpeed + "</autoPan></autoPanData>";
  else {
    var a = 99;
    t && (a = 96), o = k(this.CGI.ptzAutoControl.ipdome, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID, a)
  }
  var c = new et,
    u = {
      type: "PUT",
      url: o,
      async: !1,
      auth: e.szAuth,
      data: i,
      success: null,
      error: null
    },
    l = this;
  I.extend(u, n), I.extend(u, {
    success: function(e) {
      s.bPTZAuto = !s.bPTZAuto, n.success && n.success(e)
    },
    error: function(t, r) {
      if (G == e.szDeviceType || H == e.szDeviceType) {
        o = s.bShttpIPChannel ? k(l.CGI.ptzControl.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : k(l.CGI.ptzControl.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID), i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + n.iPTZSpeed + "</pan><tilt>0</tilt></PTZData>";
        var a = new et,
          c = {
            type: "PUT",
            url: o,
            async: !1,
            auth: e.szAuth,
            data: i,
            success: null,
            error: null
          };
        I.extend(c, n), a.setRequestParam(c), a.submitRequest()
      } else n.error && n.error(t, r)
    }
  }), c.setRequestParam(u), c.submitRequest()
}, tt.prototype.ptzControl = function(e, t, s, n) {
  var r = s.iChannelID,
    o = "";
  s.bPTZAuto && this.ptzAutoControl(e, !0, s, {
    iPTZSpeed: 0
  }), n.iPTZSpeed = t ? 0 : n.iPTZSpeed < 7 ? 15 * n.iPTZSpeed : 100;
  var i = [{}, {
      pan: 0,
      tilt: n.iPTZSpeed
    }, {
      pan: 0,
      tilt: -n.iPTZSpeed
    }, {
      pan: -n.iPTZSpeed,
      tilt: 0
    }, {
      pan: n.iPTZSpeed,
      tilt: 0
    }, {
      pan: -n.iPTZSpeed,
      tilt: n.iPTZSpeed
    }, {
      pan: -n.iPTZSpeed,
      tilt: -n.iPTZSpeed
    }, {
      pan: n.iPTZSpeed,
      tilt: n.iPTZSpeed
    }, {
      pan: n.iPTZSpeed,
      tilt: -n.iPTZSpeed
    }, {}, {
      speed: n.iPTZSpeed
    }, {
      speed: -n.iPTZSpeed
    }, {
      speed: n.iPTZSpeed
    }, {
      speed: -n.iPTZSpeed
    }, {
      speed: n.iPTZSpeed
    }, {
      speed: -n.iPTZSpeed
    }],
    a = "",
    c = {};
  switch (n.iPTZIndex) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      c = this.CGI.ptzControl, a = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + i[n.iPTZIndex].pan + "</pan><tilt>" + i[n.iPTZIndex].tilt + "</tilt></PTZData>";
      break;
    case 10:
    case 11:
      c = this.CGI.ptzControl, a = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + i[n.iPTZIndex].speed + "</zoom></PTZData>";
      break;
    case 12:
    case 13:
      c = this.CGI.ptzFocus, a = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + i[n.iPTZIndex].speed + "</focus></FocusData>";
      break;
    case 14:
    case 15:
      c = this.CGI.ptzIris, a = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + i[n.iPTZIndex].speed + "</iris></IrisData>";
      break;
    default:
      return void(W(n.error) && n.error())
  }
  o = c != this.CGI.ptzFocus && c != this.CGI.ptzIris || e.szDeviceType != G && e.szDeviceType != X && e.szDeviceType != H ? r <= e.iAnalogChannelNum ? k(c.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID) : s.bShttpIPChannel ? k(c.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : k(c.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID) : k(c.ipc, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID);
  var u = new et,
    l = {
      type: "PUT",
      url: o,
      async: !1,
      auth: e.szAuth,
      data: a,
      success: null,
      error: null
    };
  I.extend(l, n), I.extend(l, {
    success: function(e) {
      n.success && n.success(e)
    },
    error: function(e, t) {
      n.error && n.error(e, t)
    }
  }), u.setRequestParam(l), u.submitRequest()
}, tt.prototype.setPreset = function(e, t, s) {
  var n = t.iChannelID,
    r = "",
    o = "";
  r = n <= e.iAnalogChannelNum ? k(this.CGI.setPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, s.iPresetID) : t.bShttpIPChannel ? k(this.CGI.setPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum, s.iPresetID) : k(this.CGI.setPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, s.iPresetID), o = "<?xml version='1.0' encoding='UTF-8'?>", o += "<PTZPreset>", o += "<id>" + s.iPresetID + "</id>", e.szDeviceType != X && (o += "<presetName>Preset" + s.iPresetID + "</presetName>"), o += "</PTZPreset>";
  var i = new et,
    a = {
      type: "PUT",
      url: r,
      auth: e.szAuth,
      data: o,
      success: null,
      error: null
    };
  I.extend(a, s), I.extend(a, {
    success: function(e) {
      s.success && s.success(e)
    },
    error: function(e, t) {
      s.error && s.error(e, t)
    }
  }), i.setRequestParam(a), i.submitRequest()
}, tt.prototype.goPreset = function(e, t, s) {
  var n = t.iChannelID,
    r = "";
  r = n <= e.iAnalogChannelNum ? k(this.CGI.goPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, s.iPresetID) : t.bShttpIPChannel ? k(this.CGI.goPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum, s.iPresetID) : k(this.CGI.goPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, s.iPresetID);
  var o = new et,
    i = {
      type: "PUT",
      url: r,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(i, s), I.extend(i, {
    success: function(e) {
      s.success && s.success(e)
    },
    error: function(e, t) {
      s.error && s.error(e, t)
    }
  }), o.setRequestParam(i), o.submitRequest()
}, tt.prototype.recordSearch = function(e, n) {
  var r = "",
    o = "",
    i = n.iChannelID,
    a = n.szStartTime.replace(" ", "T") + "Z",
    c = n.szEndTime.replace(" ", "T") + "Z";
  r = k(this.CGI.recordSearch, e.szHttpProtocol, e.szIP, e.iCGIPort), o = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new t + "</searchID><trackList><trackID>" + (100 * i + 1) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" + a + "</startTime><endTime>" + c + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + n.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.ISAPI.org/VideoMotion</metadataDescriptor></metadataList></CMSearchDescription>";
  var u = new et,
    l = {
      type: "POST",
      url: r,
      auth: e.szAuth,
      data: o,
      success: null,
      error: null
    };
  I.extend(l, n), I.extend(l, {
    success: function(e) {
      var t = [];
      t.push("<CMSearchResult>"), t.push("<responseStatus>" + s.$XML(e).find("responseStatus").eq(0).text() + "</responseStatus>"), t.push("<responseStatusStrg>" + s.$XML(e).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>"), t.push("<numOfMatches>" + s.$XML(e).find("numOfMatches").eq(0).text() + "</numOfMatches>"), t.push("<matchList>");
      for (var r = s.$XML(e).find("searchMatchItem", !0), o = 0, i = r.length; i > o; o++) {
        var a = r[o];
        t.push("<searchMatchItem>"), t.push("<trackID>" + s.$XML(a).find("trackID").eq(0).text() + "</trackID>"), t.push("<startTime>" + s.$XML(a).find("startTime").eq(0).text() + "</startTime>"), t.push("<endTime>" + s.$XML(a).find("endTime").eq(0).text() + "</endTime>"), t.push("<playbackURI>" + I.escape(s.$XML(a).find("playbackURI").eq(0).text()) + "</playbackURI>"), t.push("<metadataDescriptor>" + s.$XML(a).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>"), t.push("</searchMatchItem>")
      }
      t.push("</matchList>"), t.push("</CMSearchResult>"), e = I.loadXML(t.join("")), n.success && n.success(e)
    },
    error: function(e, t) {
      n.error && n.error(e, t)
    }
  }), u.setRequestParam(l), u.submitRequest()
}, tt.prototype.startPlayback = function(e, t) {
  var s = t.iWndIndex,
    n = t.szStartTime,
    r = t.szEndTime,
    o = k(t.cgi, t.urlProtocol, e.szIP, t.iPort, t.iChannelID, n, r);
  if (!W(t.oTransCodeParam)) {
    var i = K(t.oTransCodeParam);
    if ("" == i) return -1;
    c.HWP_SetTrsPlayBackParam(s, i)
  }
  var a = c.HWP_Play(o, e.szAuth, s, n, r);
  if (0 == a) {
    var u = new Q;
    u.iIndex = s, u.szIP = e.szIP, u.iChannelID = t.iChannelID, u.iPlayStatus = x, p.push(u)
  }
  return a
}, tt.prototype.reversePlayback = function(e, t) {
  var s = t.iWndIndex,
    n = t.szStartTime,
    r = t.szEndTime,
    o = k(t.cgi, t.urlProtocol, e.szIP, t.iPort, t.iChannelID, n, r),
    i = c.HWP_ReversePlay(o, e.szAuth, s, n, r);
  if (0 == i) {
    var a = new Q;
    a.iIndex = s, a.szIP = e.szIP, a.iChannelID = t.iChannelID, a.iPlayStatus = D, p.push(a)
  }
  return i
}, tt.prototype.startDownloadRecord = function(e, t) {
  var s = k(this.CGI.startDownloadRecord, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " + I.escape(t.szPlaybackURI) + "</playbackURI></downloadRequest>";
  return c.HWP_StartDownload(s, e.szAuth, t.szFileName, n)
}, tt.prototype.exportDeviceConfig = function(e) {
  var t = k(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
  return c.HWP_ExportDeviceConfig(t, e.szAuth, "", 0)
}, tt.prototype.importDeviceConfig = function(e, t) {
  var s = k(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
  return c.HWP_ImportDeviceConfig(s, e.szAuth, t.szFileName, 0)
}, tt.prototype.restart = function(e, t) {
  var s = k(this.CGI.restart, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "PUT",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
}, tt.prototype.restore = function(e, t, s) {
  var n = k(this.CGI.restore, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
    r = new et,
    o = {
      type: "PUT",
      url: n,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(o, s), I.extend(o, {
    success: function(e) {
      s.success && s.success(e)
    },
    error: function(e, t) {
      s.error && s.error(e, t)
    }
  }), r.setRequestParam(o), r.submitRequest()
}, tt.prototype.startUpgrade = function(e, t) {
  var s = k(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = k(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
  return c.HWP_StartUpgrade(s, n, e.szAuth, t.szFileName)
}, tt.prototype.set3DZoom = function(e, t, n, r) {
  var o = t.iChannelID,
    i = "";
  i = o <= e.iAnalogChannelNum ? k(this.CGI.set3DZoom, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID) : t.bShttpIPChannel ? k(this.CGI.set3DZoom, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : k(this.CGI.set3DZoom, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID);
  var a = I.loadXML(n),
    c = parseInt(s.$XML(a).find("StartPoint").eq(0).find("positionX").eq(0).text(), 10),
    u = parseInt(s.$XML(a).find("StartPoint").eq(0).find("positionY").eq(0).text(), 10),
    l = parseInt(s.$XML(a).find("EndPoint").eq(0).find("positionX").eq(0).text(), 10),
    p = parseInt(s.$XML(a).find("EndPoint").eq(0).find("positionY").eq(0).text(), 10),
    d = "<?xml version='1.0' encoding='UTF-8'?><position3D><StartPoint><positionX>" + c + "</positionX><positionY>" + (255 - u) + "</positionY></StartPoint><EndPoint><positionX>" + l + "</positionX><positionY>" + (255 - p) + "</positionY></EndPoint></position3D>",
    P = new et,
    h = {
      type: "PUT",
      url: i,
      data: d,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(h, r), I.extend(h, {
    success: function(e) {
      r.success && r.success(e)
    },
    error: function(e, t) {
      r.error && r.error(e, t)
    }
  }), P.setRequestParam(h), P.submitRequest()
}, tt.prototype.getSDKCapa = function(e, t) {
  var s = k(this.CGI.SDKCapabilities, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = new et,
    r = {
      type: "GET",
      url: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(r, t), I.extend(r, {
    success: function(e) {
      t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), n.setRequestParam(r), n.submitRequest()
};


var s = function(e) {
  this.elems = [], this.length = 0, this.length = this.elems.push(e)
};
s.prototype.find = function(e, t) {
    var s = this.elems[this.length - 1].getElementsByTagName(e);
    return this.length = this.elems.push(s), t ? s : this
  }, s.prototype.eq = function(e, t) {
    var s = this.elems[this.length - 1].length,
      n = null;
    return s > 0 && s > e && (n = this.elems[this.length - 1][e]), this.length = this.elems.push(n), t ? n : this
  }, s.prototype.text = function(t) {
    return this.elems[this.length - 1] ? t ? void(e.DOMParser ? this.elems[this.length - 1].textContent = t : this.elems[this.length - 1].text = t) : window.DOMParser ? this.elems[this.length - 1].textContent : this.elems[this.length - 1].text : ""
  }, s.prototype.attr = function(e) {
    if (this.elems[this.length - 1]) {
      var t = this.elems[this.length - 1].attributes.getNamedItem(e);
      return t ? t.value : ""
    }
  },
  window.$XML = function(e) {
    return new s(e)
  }
var Q = function() {
  this.iIndex = 0,
    this.szIP = "",
    this.iChannelID = "",
    this.iPlayStatus = window.videoCtrl1.g,
    this.bSound = !1,
    this.bRecord = !1,
    this.bPTZAuto = !1,
    this.bEZoom = !1,
    this.b3DZoom = !1
};

export {
  tt,
  et
}
