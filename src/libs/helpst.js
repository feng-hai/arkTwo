import helprt from '@/libs/helprt.js'
var st = function() {};
var I = new helprt();
st.prototype.CGI = {
  login: "%s%s:%s/PSIA/Custom/SelfExt/userCheck",
  getAudioInfo: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels",
  getDeviceInfo: "%s%s:%s/PSIA/System/deviceInfo",
  getAnalogChannelInfo: "%s%s:%s/PSIA/System/Video/inputs/channels",
  getDigitalChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynVideo/inputs/channels/status",
  getZeroChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroVideo/channels",
  getStreamChannels: {
    analog: "%s%s:%s/PSIA/Streaming/channels",
    digital: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels"
  },
  getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
  startRealPlay: {
    channels: "%s%s:%s/PSIA/streaming/channels/%s",
    zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
  },
  startVoiceTalk: {
    open: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/open",
    close: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/close",
    audioData: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/audioData"
  },
  ptzControl: "%s%s:%s/PSIA/PTZ/channels/%s/continuous",
  ptzAutoControl: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/autoptz",
  setPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s",
  goPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s/goto",
  ptzFocus: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/focus",
  ptzIris: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/iris",
  getNetworkBond: "%s%s:%s/PSIA/Custom/SelfExt/Bond",
  getNetworkInterface: "%s%s:%s/PSIA/System/Network/interfaces",
  getUPnPPortStatus: "%s%s:%s/PSIA/Custom/SelfExt/UPnP/ports/status",
  getPPPoEStatus: "%s%s:%s/PSIA/Custom/SelfExt/PPPoE/1/status",
  getPortInfo: "%s%s:%s/PSIA/Security/AAA/adminAccesses",
  recordSearch: "%s%s:%s/PSIA/ContentMgmt/search",
  startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
  startDownloadRecord: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/download",
  deviceConfig: "%s%s:%s/PSIA/System/configurationData",
  restart: "%s%s:%s/PSIA/System/reboot",
  restore: "%s%s:%s/PSIA/System/factoryReset?mode=%s",
  startUpgrade: {
    upgrade: "%s%s:%s/PSIA/System/updateFirmware",
    status: "%s%s:%s/PSIA/Custom/SelfExt/upgradeStatus"
  },
  set3DZoom: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/Set3DZoom"
}, st.prototype.login = function(e, t, n, r) {
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
      "200" == s.$XML(e).find("statusValue").eq(0).text() ? r.success && r.success(e) : r.error && r.error(401, e)
    },
    error: function(e, t) {
      r.error && r.error(e, t)
    }
  }), a.setRequestParam(c), a.submitRequest()
}, st.prototype.getAudioInfo = function(e, t) {
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
}, st.prototype.getDeviceInfo = function(e, t) {
  var n = k(this.CGI.getDeviceInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
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
      n.push("<DeviceInfo>"), n.push("<deviceName>" + I.escape(s.$XML(e).find("deviceName").eq(0).text()) + "</deviceName>"), n.push("<deviceID>" + s.$XML(e).find("deviceID").eq(0).text() + "</deviceID>"), n.push("<deviceType>" + s.$XML(e).find("deviceDescription").eq(0).text() + "</deviceType>"), n.push("<model>" + s.$XML(e).find("model").eq(0).text() + "</model>"), n.push("<serialNumber>" + s.$XML(e).find("serialNumber").eq(0).text() + "</serialNumber>"), n.push("<macAddress>" + s.$XML(e).find("macAddress").eq(0).text() + "</macAddress>"), n.push("<firmwareVersion>" + s.$XML(e).find("firmwareVersion").eq(0).text() + "</firmwareVersion>"), n.push("<firmwareReleasedDate>" + s.$XML(e).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>"), n.push("<encoderVersion>" + s.$XML(e).find("logicVersion").eq(0).text() + "</encoderVersion>"), n.push("<encoderReleasedDate>" + s.$XML(e).find("logicReleasedDate").eq(0).text() + "</encoderReleasedDate>"), n.push("</DeviceInfo>"), e = I.loadXML(n.join("")), t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), r.setRequestParam(o), r.submitRequest()
}, st.prototype.getAnalogChannelInfo = function(e, t) {
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
}, st.prototype.getDigitalChannelInfo = function(e, t) {
  var n = k(this.CGI.getDigitalChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
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
      for (var r = s.$XML(e).find("DynVideoInputChannelStatus", !0), o = 0, i = r.length; i > o; o++) {
        var a = r[o];
        n.push("<InputProxyChannelStatus>"), n.push("<id>" + s.$XML(a).find("id").eq(0).text() + "</id>"), n.push("<sourceInputPortDescriptor>"), n.push("<proxyProtocol>" + s.$XML(a).find("adminProtocol").eq(0).text() + "</proxyProtocol>"), n.push("<addressingFormatType>" + s.$XML(a).find("addressingFormatType").eq(0).text() + "</addressingFormatType>"), n.push("<ipAddress>" + s.$XML(a).find("ipAddress").eq(0).text() + "</ipAddress>"), n.push("<managePortNo>" + s.$XML(a).find("adminPortNo").eq(0).text() + "</managePortNo>"), n.push("<srcInputPort>" + s.$XML(a).find("srcInputPort").eq(0).text() + "</srcInputPort>"), n.push("<userName>" + I.escape(s.$XML(a).find("userName").eq(0).text()) + "</userName>"), n.push("<streamType>" + s.$XML(a).find("streamType").eq(0).text() + "</streamType>"), n.push("<online>" + s.$XML(a).find("online").eq(0).text() + "</online>"), n.push("</sourceInputPortDescriptor>"), n.push("</InputProxyChannelStatus>")
      }
      n.push("</InputProxyChannelStatusList>"), e = I.loadXML(n.join("")), t.success && t.success(e)
    },
    error: function(e, s) {
      t.error && t.error(e, s)
    }
  }), r.setRequestParam(o), r.submitRequest()
}, st.prototype.getZeroChannelInfo = function(e, t) {
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
}, st.prototype.getPPPoEStatus = function(e, t) {
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
}, st.prototype.getUPnPPortStatus = function(e, t) {
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
}, st.prototype.getNetworkBond = function(e, t) {
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
}, st.prototype.getNetworkInterface = function(e, t) {
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
}, st.prototype.getPortInfo = function(e, t) {
  var n = k(this.CGI.getPortInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
    r = new et,
    o = {
      type: "GET",
      url: n,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(o, t), I.extend(o, {
    success: function(n) {
      var r = [];
      r.push("<AdminAccessProtocolList>");
      for (var o = s.$XML(n).find("AdminAccessProtocol", !0), i = 0, a = o.length; a > i; i++) {
        {
          o[i]
        }
        r.push("<AdminAccessProtocol>"), r.push("<id>" + s.$XML(n).find("id").eq(0).text() + "</id>"), r.push("<enabled>" + s.$XML(n).find("enabled").eq(0).text() + "</enabled>"), r.push("<protocol>" + s.$XML(n).find("protocol").eq(0).text().toUpperCase() + "</protocol>"), r.push("<portNo>" + s.$XML(n).find("portNo").eq(0).text() + "</portNo>"), r.push("</AdminAccessProtocol>")
      }
      h.getStreamChannels(e, {
        async: !1,
        success: function(n) {
          if (s.$XML(n).find("rtspPortNo", !0).length > 0) {
            var o = parseInt(s.$XML(n).find("rtspPortNo").eq(0).text(), 10);
            r.push("<AdminAccessProtocol>"), r.push("<id>4</id>"), r.push("<enabled>true</enabled>"), r.push("<protocol>RTSP</protocol>"), r.push("<portNo>" + o + "</portNo>"), r.push("</AdminAccessProtocol>"), r.push("</AdminAccessProtocolList>");
            var i = I.loadXML(r.join(""));
            t.success && t.success(i)
          } else h.getStreamDynChannels(e, {
            async: !1,
            success: function(e) {
              if (s.$XML(e).find("rtspPortNo", !0).length > 0) {
                var n = parseInt(s.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                r.push("<AdminAccessProtocol>"), r.push("<id>4</id>"), r.push("<enabled>true</enabled>"), r.push("<protocol>RTSP</protocol>"), r.push("<portNo>" + n + "</portNo>"), r.push("</AdminAccessProtocol>"), r.push("</AdminAccessProtocolList>");
                var o = I.loadXML(r.join(""));
                t.success && t.success(o)
              }
            },
            error: function() {
              t.error && t.error()
            }
          })
        },
        error: function() {
          t.error && t.error()
        }
      })
    },
    error: function() {
      var n = [];
      n.push("<AdminAccessProtocolList>"), h.getStreamChannels(e, {
        async: !1,
        success: function(r) {
          if (s.$XML(r).find("rtspPortNo", !0).length > 0) {
            var o = parseInt(s.$XML(r).find("rtspPortNo").eq(0).text(), 10);
            n.push("<AdminAccessProtocol>"), n.push("<id>4</id>"), n.push("<enabled>true</enabled>"), n.push("<protocol>RTSP</protocol>"), n.push("<portNo>" + o + "</portNo>"), n.push("</AdminAccessProtocol>"), n.push("</AdminAccessProtocolList>");
            var i = I.loadXML(n.join(""));
            t.success && t.success(i)
          } else h.getStreamDynChannels(e, {
            async: !1,
            success: function(e) {
              if (s.$XML(e).find("rtspPortNo", !0).length > 0) {
                var r = parseInt(s.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                n.push("<AdminAccessProtocol>"), n.push("<id>4</id>"), n.push("<enabled>true</enabled>"), n.push("<protocol>RTSP</protocol>"), n.push("<portNo>" + r + "</portNo>"), n.push("</AdminAccessProtocol>"), n.push("</AdminAccessProtocolList>");
                var o = I.loadXML(n.join(""));
                t.success && t.success(o)
              }
            },
            error: function() {
              t.error && t.error()
            }
          })
        },
        error: function() {
          t.error && t.error()
        }
      })
    }
  }), r.setRequestParam(o), r.submitRequest()
}, st.prototype.getStreamChannels = function(e, t) {
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
}, st.prototype.getStreamDynChannels = function(e, t) {
  var s = k(this.CGI.getStreamDynChannels, e.szHttpProtocol, e.szIP, e.iCGIPort),
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
}, st.prototype.startRealPlay = function(e, t) {
  var s = 100 * t.iChannelID + t.iStreamType,
    n = "";
  n = t.bZeroChannel ? k(t.cgi.zeroChannels, t.urlProtocol, e.szIP, t.iPort, s) : k(t.cgi.channels, t.urlProtocol, e.szIP, t.iPort, s);
  var r = c.HWP_Play(n, e.szAuth, t.iWndIndex, "", "");
  if (0 == r) {
    var o = new Q;
    o.iIndex = t.iWndIndex, o.szIP = e.szIP, o.iChannelID = t.iChannelID, o.iPlayStatus = v, p.push(o)
  }
  return r
}, st.prototype.startVoiceTalk = function(e, t) {
  var s = k(this.CGI.startVoiceTalk.open, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
    n = k(this.CGI.startVoiceTalk.close, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
    r = k(this.CGI.startVoiceTalk.audioData, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
    o = c.HWP_StartVoiceTalk(s, n, r, e.szAuth, e.iAudioType);
  return o
}, st.prototype.ptzAutoControl = function(e, t, s, n) {
  var r = s.iChannelID,
    o = "",
    i = "";
  if (n.iPTZSpeed = n.iPTZSpeed < 7 ? 15 * n.iPTZSpeed : 100, t && (n.iPTZSpeed = 0), e.szDeviceType != X) o = k(this.CGI.ptzAutoControl, e.szHttpProtocol, e.szIP, e.iCGIPort, r), i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + n.iPTZSpeed + "</pan><tilt>0</tilt></PTZData>";
  else {
    var a = 99;
    t && (a = 96), o = k(this.CGI.goPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, r, a)
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
      if (e.szDeviceType != X) {
        o = k(l.CGI.ptzControl, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID);
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
}, st.prototype.ptzControl = function(e, t, s, n) {
  var r = (s.iChannelID, "");
  s.bPTZAuto && this.ptzAutoControl(e, !0, s, {
    iPTZSpeed: 0
  }), n.iPTZSpeed = t ? 0 : n.iPTZSpeed < 7 ? 15 * n.iPTZSpeed : 100;
  var o = [{}, {
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
    i = "",
    a = {};
  switch (n.iPTZIndex) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      a = this.CGI.ptzControl, i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + o[n.iPTZIndex].pan + "</pan><tilt>" + o[n.iPTZIndex].tilt + "</tilt></PTZData>";
      break;
    case 10:
    case 11:
      a = this.CGI.ptzControl, i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + o[n.iPTZIndex].speed + "</zoom></PTZData>";
      break;
    case 12:
    case 13:
      a = this.CGI.ptzFocus, i = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + o[n.iPTZIndex].speed + "</focus></FocusData>";
      break;
    case 14:
    case 15:
      a = this.CGI.ptzIris, i = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + o[n.iPTZIndex].speed + "</iris></IrisData>";
      break;
    default:
      return void(W(n.error) && n.error())
  }
  r = k(a, e.szHttpProtocol, e.szIP, e.iCGIPort, s.iChannelID);
  var c = new et,
    u = {
      type: "PUT",
      url: r,
      async: !1,
      auth: e.szAuth,
      data: i,
      success: null,
      error: null
    };
  I.extend(u, n), I.extend(u, {
    success: function(e) {
      n.success && n.success(e)
    },
    error: function(e, t) {
      n.error && n.error(e, t)
    }
  }), c.setRequestParam(u), c.submitRequest()
}, st.prototype.setPreset = function(e, t, s) {
  var n = (t.iChannelID, ""),
    r = "";
  n = k(this.CGI.setPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, s.iPresetID), r = "<?xml version='1.0' encoding='UTF-8'?>", r += "<PTZPreset>", r += "<id>" + s.iPresetID + "</id>", e.szDeviceType != X && (r += "<presetName>Preset" + s.iPresetID + "</presetName>"), r += "</PTZPreset>";
  var o = new et,
    i = {
      type: "PUT",
      url: n,
      auth: e.szAuth,
      data: r,
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
}, st.prototype.goPreset = function(e, t, s) {
  var n = (t.iChannelID, "");
  n = k(this.CGI.goPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, s.iPresetID);
  var r = new et,
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
}, st.prototype.recordSearch = function(e, n) {
  var r = "",
    o = "",
    i = n.iChannelID,
    a = n.szStartTime.replace(" ", "T") + "Z",
    c = n.szEndTime.replace(" ", "T") + "Z";
  r = k(this.CGI.recordSearch, e.szHttpProtocol, e.szIP, e.iCGIPort), o = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new t + "</searchID><trackList><trackID>" + (100 * i + 1) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" + a + "</startTime><endTime>" + c + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + n.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.psia.org/VideoMotion</metadataDescriptor></metadataList></CMSearchDescription>";
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
}, st.prototype.startPlayback = function(e, t) {
  var s = t.iWndIndex,
    n = t.szStartTime,
    r = t.szEndTime,
    o = k(t.cgi, t.urlProtocol, e.szIP, t.iPort, t.iChannelID, n, r),
    i = c.HWP_Play(o, e.szAuth, s, n, r);
  if (0 == i) {
    var a = new Q;
    a.iIndex = s, a.szIP = e.szIP, a.iChannelID = t.iChannelID, a.iPlayStatus = x, p.push(a)
  }
  return i
}, st.prototype.reversePlayback = function(e, t) {
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
}, st.prototype.startDownloadRecord = function(e, t) {
  var s = k(this.CGI.startDownloadRecord, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " + I.escape(t.szPlaybackURI) + "</playbackURI></downloadRequest>";
  return c.HWP_StartDownload(s, e.szAuth, t.szFileName, n)
}, st.prototype.exportDeviceConfig = function(e) {
  var t = k(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
  return c.HWP_ExportDeviceConfig(t, e.szAuth, "", 0)
}, st.prototype.importDeviceConfig = function(e, t) {
  var s = k(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
  return c.HWP_ImportDeviceConfig(s, e.szAuth, t.szFileName, 0)
}, st.prototype.restart = function(e, t) {
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
}, st.prototype.restore = function(e, t, s) {
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
}, st.prototype.startUpgrade = function(e, t) {
  var s = k(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort),
    n = k(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
  return c.HWP_StartUpgrade(s, n, e.szAuth, t.szFileName)
}, st.prototype.set3DZoom = function(e, t, s, n) {
  var r = k(this.CGI.set3DZoom, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID),
    o = new et,
    i = {
      type: "PUT",
      url: r,
      data: s,
      auth: e.szAuth,
      success: null,
      error: null
    };
  I.extend(i, n), I.extend(i, {
    success: function(e) {
      n.success && n.success(e)
    },
    error: function(e, t) {
      n.error && n.error(e, t)
    }
  }), o.setRequestParam(i), o.submitRequest()
};

export default helpst
