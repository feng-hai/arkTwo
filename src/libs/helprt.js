class helprt {
  extend() {
    for (var e, t = arguments[0] || {}, s = 1, n = arguments.length; n > s; s++)
      if (null != (e = arguments[s]))
        for (var r in e) {
          var o = (t[r], e[r]);
          t !== o && ("object" == typeof o ? t[r] = this.extend({}, o) : void 0 !== o && (t[r] = o))
        }
    return t
  }
  browser() {
    var e = /(webkit)[ \/]([\w.]+)/,
      t = /(opera)(?:.*version)?[ \/]([\w.]+)/,
      s = /(msie) ([\w.]+)/,
      n = /(trident.*rv:)([\w.]+)/,
      r = /(mozilla)(?:.*? rv:([\w.]+))?/,
      o = navigator.userAgent.toLowerCase(),
      i = e.exec(o) || t.exec(o) || s.exec(o) || n.exec(o) || o.indexOf("compatible") < 0 && r.exec(o) || ["unknow", "0"];
    i.length > 0 && i[1].indexOf("trident") > -1 && (i[1] = "msie"), "webkit" == i[1] && (i[1] = o.indexOf("chrome") > -1 ? "chrome" : "safari");
    var a = {};
    return a[i[1]] = !0, a.version = i[2], a
  }
  loadXML(t) {
    if (null == t || "" == t) return null;
    var s = null;
    if (window.DOMParser) {
      var n = new DOMParser;
      s = n.parseFromString(t, "text/xml")
    } else s = new ActiveXObject("Microsoft.XMLDOM"), s.async = !1, s.loadXML(t);
    return s
  }
  toXMLStr(e) {
    var t = "";
    try {
      var s = new XMLSerializer;
      t = s.serializeToString(e)
    } catch (n) {
      try {
        t = e.xml
      } catch (n) {
        return ""
      }
    }
    return -1 == t.indexOf("<?xml") && (t = "<?xml version='1.0' encoding='utf-8'?>" + t), t
  }
  escape(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }
  dateFormat(e, t) {
    var s = {
      "M+": e.getMonth() + 1,
      "d+": e.getDate(),
      "h+": e.getHours(),
      "m+": e.getMinutes(),
      "s+": e.getSeconds(),
      "q+": Math.floor((e.getMonth() + 3) / 3),
      S: e.getMilliseconds()
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var n in s) new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? s[n] : ("00" + s[n]).substr(("" + s[n]).length)));
    return t
  }
  Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
      var t, s, n, r, o, i, a, c = "",
        u = 0;
      for (e = this._utf8_encode(e); u < e.length;) t = e.charCodeAt(u++), s = e.charCodeAt(u++), n = e.charCodeAt(u++), r = t >> 2, o = (3 & t) << 4 | s >> 4, i = (15 & s) << 2 | n >> 6, a = 63 & n, isNaN(s) ? i = a = 64 : isNaN(n) && (a = 64), c = c + this._keyStr.charAt(r) + this._keyStr.charAt(o) + this._keyStr.charAt(i) + this._keyStr.charAt(a);
      return c
    },
    decode: function(e) {
      var t, s, n, r, o, i, a, c = "",
        u = 0;
      for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length;) r = this._keyStr.indexOf(e.charAt(u++)), o = this._keyStr.indexOf(e.charAt(u++)), i = this._keyStr.indexOf(e.charAt(u++)), a = this._keyStr.indexOf(e.charAt(u++)), t = r << 2 | o >> 4, s = (15 & o) << 4 | i >> 2, n = (3 & i) << 6 | a, c += String.fromCharCode(t), 64 != i && (c += String.fromCharCode(s)), 64 != a && (c += String.fromCharCode(n));
      return c = this._utf8_decode(c)
    },
    _utf8_encode: function(e) {
      e = e.replace(/\r\n/g, "\n");
      for (var t = "", s = 0; s < e.length; s++) {
        var n = e.charCodeAt(s);
        128 > n ? t += String.fromCharCode(n) : n > 127 && 2048 > n ? (t += String.fromCharCode(n >> 6 | 192), t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128))
      }
      return t
    },
    _utf8_decode: function(e) {
      for (var t = "", s = 0, n = c1 = c2 = 0; s < e.length;) n = e.charCodeAt(s), 128 > n ? (t += String.fromCharCode(n), s++) : n > 191 && 224 > n ? (c2 = e.charCodeAt(s + 1), t += String.fromCharCode((31 & n) << 6 | 63 & c2), s += 2) : (c2 = e.charCodeAt(s + 1), c3 = e.charCodeAt(s + 2), t += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3), s += 3);
      return t
    }
  }
}
export default helprt
