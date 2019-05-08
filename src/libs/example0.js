import helprt from '@/libs/helprt.js'
import {
  tt,
  et
} from '@/libs/helptt.js'


class videoCtrl {
  constructor() {
    this.id = this.createUUID()
  }
  destroy(url) {

  }
  n = "100%"
  r = "100%"
  e = window
  o = ""
  i = ""
  a = {
    szContainerID: "",
    szColorProperty: "",
    szOcxClassId: "clsid:E7EF736D-B4E6-4A5A-BA94-732D71107808",
    szMimeTypes: "application/hwp-webvideo-plugin",
    iWndowType: 1,
    iPlayMode: 2,
    bDebugMode: !1,
    cbSelWnd: null,
    cbEvent: null
  }
  c = null

  l = []
  p = []
  d = null
  P = new tt()
  h = null
  I = new helprt()
  f = this
  m = null
  C = 1
  S = 2
  y = 200
  g = 0
  v = 1
  x = 2
  T = 3
  z = 4
  D = 5
  A = 6
  b = 0
  M = 2
  q = 3
  L = 21
  R = 0
  G = "IPCamera"
  X = "IPDome"
  H = "IPZoom"
  w = "<?xml version='1.0' encoding='utf-8'?><FileVersion><Platform name='win32'><npWebVideoPlugin.dll>3,0,5,56</npWebVideoPlugin.dll><WebVideoActiveX.ocx>3,0,5,56</WebVideoActiveX.ocx><PlayCtrl.dll>6,5,2,40</PlayCtrl.dll><StreamTransClient.dll>1,1,2,11</StreamTransClient.dll><SystemTransform.dll>2,3,0,10</SystemTransform.dll><NetStream.dll>1,0,5,57</NetStream.dll><HCNetSDK.dll>4,2,6,7</HCNetSDK.dll><ShowRemConfig.dll>3,1,2,14</ShowRemConfig.dll></Platform></FileVersion>"

  createUUID() {
    var e = new Date(1582, 10, 15, 0, 0, 0, 0),
      s = new Date,
      n = s.getTime() - e.getTime(),
      r = "-",
      o = this.getIntegerBits(n, 0, 31),
      i = this.getIntegerBits(n, 32, 47),
      a = this.getIntegerBits(n, 48, 59) + "1",
      c = this.getIntegerBits(this.rand(4095), 0, 7),
      u = this.getIntegerBits(this.rand(4095), 0, 7),
      l = this.getIntegerBits(this.rand(8191), 0, 7) + this.getIntegerBits(this.rand(8191), 8, 15) + this.getIntegerBits(this.rand(8191), 0, 7) + this.getIntegerBits(this.rand(8191), 8, 15) + this.getIntegerBits(this.rand(8191), 0, 15);
    return o + r + i + r + a + r + c + u + r + l
  }
  toString() {
    return this.id
  }
  GetHttpInfo = function(e, t) {
    Z("http响应返回：http状态：%s, http数据：%s", e, t), et.prototype.processCallback(e, t)
  }
  GetSelectWndInfo(e) {
    var t = this.I.loadXML(e);
    u = parseInt(s.$XML(t).find("SelectWnd").eq(0).text(), 10);
    var n = [];
    n.push("<RealPlayInfo>"), n.push("<SelectWnd>" + u + "</SelectWnd>"), n.push("</RealPlayInfo>"), a.cbSelWnd && a.cbSelWnd(I.loadXML(n.join("")))
  }
  PluginEventHandler(e, t, s) {
    Z("插件事件：PluginEventHandler iEventType：%s iParam1: %s, iParam2: %s", e, t, s), this.b == e || this.M == e ? f.I_Stop(t) : L == e ? f.I_StopRecord(t) : q == e && f.I_StopVoiceTalk(), a.cbEvent && a.cbEvent(e, t, s)
  }
  ZoomInfoCallback(e) {
    var t = f.findWndIndexByIndex(u);
    if (-1 != t) {
      var s = p[t];
      if (t = f.findDeviceIndexByIP(s.szIP), -1 != t) {
        var n = l[t];
        n.oProtocolInc.set3DZoom(n, s, e, {
          success: function() {},
          error: function() {}
        })
      }
    }
  }
  valueOf() {
    return this.id
  }
  getIntegerBits(e, s, n) {
    var r = this.returnBase(e, 16),
      o = new Array,
      i = "",
      a = 0;
    for (a = 0; a < r.length; a++) o.push(r.substring(a, a + 1));
    for (a = Math.floor(s / 4); a <= Math.floor(n / 4); a++) i += o[a] && "" != o[a] ? o[a] : "0";
    return i
  }
  rand(e) {
    return Math.floor(Math.random() * e)
  }
  returnBase(e, t) {
    var s = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    if (t > e) var n = s[e];
    else {
      var r = "" + Math.floor(e / t),
        o = e - r * t;
      if (r >= t) var n = this.returnBase(r, t) + s[o];
      else var n = s[r] + s[o]
    }
    return n
  }
  I_GetAnalogChannelInfo(e, t) {
    var s = this.findDeviceIndexByIP(e);
    if (-1 != s) {
      var n = this.l[s],
        r = {
          success: null,
          error: null
        };
      this.I.extend(r, t), n.oProtocolInc.getAnalogChannelInfo(n, r)
    }
  }
  I_GetAnalogChannelInfo(e, t) {
    var s = this.findDeviceIndexByIP(e);
    if (-1 != s) {
      var n = this.l[s],
        r = {
          success: null,
          error: null
        };
      I.extend(r, t), n.oProtocolInc.getAnalogChannelInfo(n, r)
    }
  }
  I_GetAudioInfo(e, t) {
    var s = this.findDeviceIndexByIP(e);
    if (-1 != s) {
      var n = this.l[s],
        r = {
          success: null,
          error: null
        };
      I.extend(r, t), n.oProtocolInc.getAudioInfo(n, r)
    }
  }
  findDeviceIndexByIP(e) {
    for (var t = 0; t < this.l.length; t++)
      if (this.l[t].szIP == e) return t;
    return -1
  }
  I_CheckPluginInstall() {

    var e = !1;

    if (this.I.browser().msie) try {
      {
        new ActiveXObject("WebVideoActiveX.WebVideoActiveXCtrl.1")
      }
      e = !0
    } catch (t) {} else
      for (var s = 0, n = navigator.mimeTypes.length; n > s; s++)
        if ("application/hwp-webvideo-plugin" == navigator.mimeTypes[s].type.toLowerCase()) {
          e = !0;
          break
        }
    return e ? 0 : -1
  }
  I_InitPlugin(e, t, s) {
    this.n = e, this.r = t, this.I.extend(this.a, s)
  }

  I_InsertOBJECTPlugin(t) {
    return W(t) || (this.a.szContainerID = t), null == document.getElementById(this.a.szContainerID) ? -1 : null != document.getElementById(this.o) || 0 != document.getElementsByName(this.o).length ? -1 : (document.getElementById(this.a.szContainerID).innerHTML = _(), this.c = this.I.browser().msie ? document.getElementById(this.o) : document.getElementsByName(this.i)[0], null == this.c && null == this.c.object ? -1 : ("object" == typeof this.e.attachEvent && this.I.browser().msie && (this.c.addEventListener("GetSelectWndInfo", GetSelectWndInfo), this.c.addEventListener("ZoomInfoCallback", ZoomInfoCallback), this.c.addEventListener("GetHttpInfo", GetHttpInfo), this.c.addEventListener("PluginEventHandler", this.PluginEventHandler)), E(), 0))
  }
  I_CheckPluginVersion() {
    return this.c.HWP_CheckPluginUpdate(this.w) ? -1 : 0
  }
  I_GetDigitalChannelInfo(e, t) {
    var s = this.findDeviceIndexByIP(e);
    if (-1 != s) {
      var n = this.l[s],
        r = {
          success: null,
          error: null
        };
      I.extend(r, t), n.oProtocolInc.getDigitalChannelInfo(n, r)
    }
  }
  I_GetZeroChannelInfo(e, t) {
    var s = this.findDeviceIndexByIP(e);
    if (-1 != s) {
      var n = this.l[s],
        r = {
          success: null,
          error: null
        };
      I.extend(r, t), n.oProtocolInc.getZeroChannelInfo(n, r)
    }
  }
  I_GetWindowStatus(e) {
    if (W(e)) {
      var t = [];
      return I.extend(t, this.p), t
    }
    var s = this.findWndIndexByIndex(e);
    return -1 != s ? this.p[s] : null
  }
  findWndIndexByIndex(e) {
    console.log(this.p,"eeeeeeeeeeeeeeeee")
    for (var t = 0; t < this.p.length; t++)
      if (this.p[t].iIndex == e) return t;
    return -1
  }
  I_Stop(e) {
    console.log(W(e),this.u ,e)
    e = W(e) ? u : e;
    var t = this.findWndIndexByIndex(e),

      s = -1;
    console.log(t, "tttttt");
    if (-1 != t) {
      var n = this.p[t];
      n.bRecord && this.c.HWP_StopSave(n.iIndex),
        n.bSound && this.c.HWP_CloseSound(),
        n.bEZoom && this.c.HWP_DisableZoom(n.iIndex),
        s = this.c.HWP_Stop(e),
        0 == s && this.p.splice(t, 1)
    }
    return s
  }
  I_StartRealPlay(e, t) {
    var n = this.findDeviceIndexByIP(e),
      r = -1,
      o = "",
      i = "",
      a = -1,
      c = 0,
      d = 0,
      P = !1,
      h = {
        iWndIndex: u,
        iStreamType: 1,
        iChannelID: 1,
        bZeroChannel: !1
      };
    if (I.extend(h, t), -1 != n) {
      j(this.l[n]);
      var f = this.l[n],
        C = parseInt(s.$XML(this.m).find("ProtocolType").eq(0).text(), 10);
      if (C == this.R && f.oStreamCapa.bSupportShttpPlay ? (Z("SHTTP RealPlay"), o = f.oProtocolInc.CGI.startShttpRealPlay, i = "http://", d = h.iStreamType - 1, c = h.iChannelID <= f.iAnalogChannelNum ? h.iChannelID : f.oStreamCapa.iIpChanBase + parseInt(h.iChannelID, 10) - f.iAnalogChannelNum - 1, P = !0, W(h.iPort) ? "https://" == f.szHttpProtocol ? (-1 == f.iHttpPort && (f.iHttpPort = B(f).iHttpPort), a = f.iHttpPort) : a = f.iCGIPort : (f.iHttpPort = h.iPort, a = h.iPort)) : (Z("RTSP RealPlay"), o = f.oProtocolInc.CGI.startRealPlay, i = "rtsp://", d = h.iStreamType, c = h.iChannelID, W(h.iPort) || (f.iRtspPort = h.iPort), -1 == f.iRtspPort && (f.iRtspPort = B(f).iRtspPort), a = f.iRtspPort), -1 == a) return Z("获取端口号失败"), r;
      if (I.extend(h, {
          urlProtocol: i,
          cgi: o,
          iPort: a,
          iStreamType: d,
          iChannelID: c
        }), n = this.findWndIndexByIndex(h.iWndIndex), -1 == n && (r = f.oProtocolInc.startRealPlay(f, h)), -1 == r) f.iRtspPort = -1;
      else {
        n = this.findWndIndexByIndex(h.iWndIndex);
        var S = this.p[n];
        S.bShttpIPChannel = P
      }
    }
    return r
  }
  Y(e, t, s, n, r, o, i) {
    var that = this;
    var a = {
      protocol: t,
      success: null,
      error: null
    };
    console.log(o, "ppppppppppppppppppppp");
    this.I.extend(a, i),
      this.I.extend(a, {
        success: function(a) {
          var c = new J;
          c.szIP = e, 2 == t ? (c.szHttpProtocol = "https://", c.iHttpsPort = s) : (c.szHttpProtocol = "http://", c.iHttpPort = s),
            c.iCGIPort = s,
            c.szAuth = n,
            c.iDeviceProtocol = r,
            c.oProtocolInc = o,
            that.l.push(c),
            Z("使用%s协议登录成功", r),
            N(c),
            i.success && i.success(a)
        },
        error: function(e, t) {
          i.error && i.error(e, t)
        }
      }),
      o.login(e, s, n, a, this.c)
  };
  I_Login(e, t, s, n, r, o) {
    var that = this;
    var i = this.findDeviceIndexByIP(e);
    if (-1 != i) return Z("设备已经登录过"), -1;
    var a = this.P,
      c = this.C;

    W(o.cgi) || (this.C == o.cgi ? (a = this.P, c = this.C) : (a = this.h, c = this.S));
    var u = "";
    console.log(a, "i_login");

    if (this.C == c) {
      u = this.I.Base64.encode(":" + n + ":" + r);
      var l = {
        success: null,
        error: null
      };
      this.I.extend(l, o), this.I.extend(l, {
        error: function(i, l) {
          u = I.Base64.encode(n + ":" + r), c = this.C, a = this.P;
          var p = {
            success: null,
            error: null
          };
          that.I.extend(p, o),
            that.I.extend(p, {
              error: function() {
                if (!that.W(o.cgi)) return void(o.error && o.error(i, l));
                u = that.I.Base64.encode(n + ":" + r), c = this.S, a = h;
                var p = {
                  success: null,
                  error: null
                };
                that.I.extend(p, o),
                  that.I.extend(p, {
                    error: function(e, t) {
                      o.error && o.error(e, t)
                    }
                  }),
                  that.Y(e, t, s, u, c, a, p)
              }
            }),
            that.Y(e, t, s, u, c, a, p)
        }
      }), that.Y(e, t, s, u, c, a, l)
    } else {
      u = this.I.Base64.encode(n + ":" + r), c = this.S, a = this.h;
      var l = {
        success: null,
        error: null
      };
      this.I.extend(l, o), this.I.extend(l, {
        error: function(e, t) {
          o.error && o.error(e, t)
        }
      }), this.Y(e, t, s, u, c, a, l)
    }
  }
  I_Logout(e) {
    var t = this.findDeviceIndexByIP(e);
    return -1 != t ? (this.l.splice(t, 1), 0) : -1
  }
  I_GetDeviceInfo(e, t) {
    var s = this.findDeviceIndexByIP(e);
    if (-1 != s) {
      var n = this.l[s],
        r = {
          success: null,
          error: null
        };
      I.extend(r, t), n.oProtocolInc.getDeviceInfo(n, r)
    }
  }

}
var videoCtrl1 = new videoCtrl();



var J = function() {
  this.szIP = "",
    this.szHostName = "",
    this.szAuth = "",
    this.szHttpProtocol = "http://",
    this.iCGIPort = 80,
    this.iDevicePort = -1,
    this.iHttpPort = -1,
    this.iHttpsPort = -1,
    this.iRtspPort = -1,
    this.iAudioType = 1,
    this.iDeviceProtocol = videoCtrl1.C,
    this.oProtocolInc = null,
    this.iAnalogChannelNum = 0,
    this.szDeviceType = "",
    this.bVoiceTalk = !1,
    this.oStreamCapa = {
      bObtained: !1,
      bSupportShttpPlay: !1,
      bSupportShttpPlayback: !1,
      bSupportShttpsPlay: !1,
      bSupportShttpsPlayback: !1,
      bSupportShttpPlaybackTransCode: !1,
      bSupportShttpsPlaybackTransCode: !1,
      iIpChanBase: 1
    }
}

var s = window,
  Z = function() {
    if (videoCtrl1.a.bDebugMode) {
      var e = k(arguments);
      videoCtrl1.d._alert(e)
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
    if (I.browser().msie) e = "<object classid='" + videoCtrl1.a.szOcxClassId + "' codebase='' standby='Waiting...' id='" + videoCtrl1.o + "' width='" + videoCtrl1.n + "' height='" + videoCtrl1.r + "' align='center' ><param name='wndtype' value='" + videoCtrl1.a.iWndowType + "'><param name='playmode' value='" + videoCtrl1.a.iPlayMode + "'><param name='colors' value='" + videoCtrl1.a.szColorProperty + "'></object>";
    else
      for (var t = navigator.mimeTypes.length, s = 0; t > s; s++) navigator.mimeTypes[s].type.toLowerCase() == videoCtrl1.a.szMimeTypes && (e = "<embed align='center' type='" + videoCtrl1.a.szMimeTypes + "' width='" + videoCtrl1.n + "' height='" + videoCtrl1.r + "' name='" + videoCtrl1.i + "' wndtype='" + videoCtrl1.a.iWndowType + "' playmode='" + videoCtrl1.a.iPlayMode + "' colors='" + videoCtrl1.a.szColorProperty + "'>");
    return e
  },
  E = function() {
    var e = videoCtrl1.c.HWP_GetLocalConfig();
    videoCtrl1.m = I.loadXML(e)
  },
  N = function(e) {
    videoCtrl1.I_GetDeviceInfo(e.szIP, {
      success: function(t) {
        e.szDeviceType = window.$XML(t).find("deviceType").eq(0).text()
      }
    }), videoCtrl1.I_GetAnalogChannelInfo(e.szIP, {
      success: function(t) {
        e.iAnalogChannelNum = window.$XML(t).find("VideoInputChannel", !0).length
      }
    }), videoCtrl1.I_GetAudioInfo(e.szIP, {
      success: function(t) {
        var n = window.$XML(t).find("audioCompressionType", !0);
        if (n.length > 0) {
          var r = window.$XML(n).eq(0).text(),
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
    e.oStreamCapa.bObtained || e.oProtocolInc instanceof tt && (videoCtrl1.G == e.szDeviceType || videoCtrl1.X == e.szDeviceType || videoCtrl1.H == e.szDeviceType ? e.oProtocolInc.getStreamChannels(e, {
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
// import helprt from '@/libs/helprt.js'
var u = 0;

var I = new helprt()
window.GetSelectWndInfo = function(e) {
  var t = I.loadXML(e);
  u = parseInt(window.$XML(t).find("SelectWnd").eq(0).text(), 10);
  var n = [];
  n.push("<RealPlayInfo>"), n.push("<SelectWnd>" + u + "</SelectWnd>"), n.push("</RealPlayInfo>"), videoCtrl1.a.cbSelWnd && videoCtrl1.a.cbSelWnd(I.loadXML(n.join("")))
};
window.ZoomInfoCallback = function(e) {
  var t = videoCtrl1.findWndIndexByIndex(u);
  if (-1 != t) {
    var s = videoCtrl1.p[t];
    if (t = videoCtrl1.findDeviceIndexByIP(s.szIP), -1 != t) {
      var n = videoCtrl1.l[t];
      n.oProtocolInc.set3DZoom(n, s, e, {
        success: function() {},
        error: function() {}
      })
    }
  }
};
window.PluginEventHandler = function(e, t, s) {
  Z("插件事件：PluginEventHandler iEventType：%s iParam1: %s, iParam2: %s", e, t, s), videoCtrl1.b == e || videoCtrl1.M == e ? videoCtrl1.I_Stop(t) : L == e ? videoCtrl1.I_StopRecord(t) : q == e && videoCtrl1.I_StopVoiceTalk(), videoCtrl1.a.cbEvent && videoCtrl1.a.cbEvent(e, t, s)
};
window.GetHttpInfo = function(e, t) {
  Z("http响应返回：http状态：%s, http数据：%s", e, t), et.prototype.processCallback(e, t)
};
window.videoCtrl1 = videoCtrl1;
export default videoCtrl1
