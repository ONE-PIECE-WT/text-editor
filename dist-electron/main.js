import Ot, { Menu as Cl, BrowserWindow as bl, app as kt, ipcMain as it, nativeTheme as rc, shell as nc, dialog as ic } from "electron";
import ke from "fs";
import ac from "constants";
import mr from "stream";
import Ji from "util";
import Ol from "assert";
import be, { dirname as oc } from "path";
import qr from "child_process";
import Pl from "events";
import gr from "crypto";
import Il from "tty";
import Mr from "os";
import qt, { fileURLToPath as sc } from "url";
import lc from "string_decoder";
import Dl from "zlib";
import uc from "http";
var et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, At = {}, Kr = {}, Cr = {}, Aa;
function ze() {
  return Aa || (Aa = 1, Cr.fromCallback = function(t) {
    return Object.defineProperty(function(...u) {
      if (typeof u[u.length - 1] == "function") t.apply(this, u);
      else
        return new Promise((d, c) => {
          u.push((f, l) => f != null ? c(f) : d(l)), t.apply(this, u);
        });
    }, "name", { value: t.name });
  }, Cr.fromPromise = function(t) {
    return Object.defineProperty(function(...u) {
      const d = u[u.length - 1];
      if (typeof d != "function") return t.apply(this, u);
      u.pop(), t.apply(this, u).then((c) => d(null, c), d);
    }, "name", { value: t.name });
  }), Cr;
}
var Jr, Ta;
function cc() {
  if (Ta) return Jr;
  Ta = 1;
  var t = ac, u = process.cwd, d = null, c = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return d || (d = u.call(process)), d;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var f = process.chdir;
    process.chdir = function(i) {
      d = null, f.call(process, i);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
  }
  Jr = l;
  function l(i) {
    t.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && h(i), i.lutimes || n(i), i.chown = s(i.chown), i.fchown = s(i.fchown), i.lchown = s(i.lchown), i.chmod = o(i.chmod), i.fchmod = o(i.fchmod), i.lchmod = o(i.lchmod), i.chownSync = r(i.chownSync), i.fchownSync = r(i.fchownSync), i.lchownSync = r(i.lchownSync), i.chmodSync = a(i.chmodSync), i.fchmodSync = a(i.fchmodSync), i.lchmodSync = a(i.lchmodSync), i.stat = m(i.stat), i.fstat = m(i.fstat), i.lstat = m(i.lstat), i.statSync = v(i.statSync), i.fstatSync = v(i.fstatSync), i.lstatSync = v(i.lstatSync), i.chmod && !i.lchmod && (i.lchmod = function(p, S, R) {
      R && process.nextTick(R);
    }, i.lchmodSync = function() {
    }), i.chown && !i.lchown && (i.lchown = function(p, S, R, O) {
      O && process.nextTick(O);
    }, i.lchownSync = function() {
    }), c === "win32" && (i.rename = typeof i.rename != "function" ? i.rename : function(p) {
      function S(R, O, P) {
        var M = Date.now(), C = 0;
        p(R, O, function A(T) {
          if (T && (T.code === "EACCES" || T.code === "EPERM" || T.code === "EBUSY") && Date.now() - M < 6e4) {
            setTimeout(function() {
              i.stat(O, function(y, q) {
                y && y.code === "ENOENT" ? p(R, O, A) : P(T);
              });
            }, C), C < 100 && (C += 10);
            return;
          }
          P && P(T);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(S, p), S;
    }(i.rename)), i.read = typeof i.read != "function" ? i.read : function(p) {
      function S(R, O, P, M, C, A) {
        var T;
        if (A && typeof A == "function") {
          var y = 0;
          T = function(q, U, L) {
            if (q && q.code === "EAGAIN" && y < 10)
              return y++, p.call(i, R, O, P, M, C, T);
            A.apply(this, arguments);
          };
        }
        return p.call(i, R, O, P, M, C, T);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(S, p), S;
    }(i.read), i.readSync = typeof i.readSync != "function" ? i.readSync : /* @__PURE__ */ function(p) {
      return function(S, R, O, P, M) {
        for (var C = 0; ; )
          try {
            return p.call(i, S, R, O, P, M);
          } catch (A) {
            if (A.code === "EAGAIN" && C < 10) {
              C++;
              continue;
            }
            throw A;
          }
      };
    }(i.readSync);
    function h(p) {
      p.lchmod = function(S, R, O) {
        p.open(
          S,
          t.O_WRONLY | t.O_SYMLINK,
          R,
          function(P, M) {
            if (P) {
              O && O(P);
              return;
            }
            p.fchmod(M, R, function(C) {
              p.close(M, function(A) {
                O && O(C || A);
              });
            });
          }
        );
      }, p.lchmodSync = function(S, R) {
        var O = p.openSync(S, t.O_WRONLY | t.O_SYMLINK, R), P = !0, M;
        try {
          M = p.fchmodSync(O, R), P = !1;
        } finally {
          if (P)
            try {
              p.closeSync(O);
            } catch {
            }
          else
            p.closeSync(O);
        }
        return M;
      };
    }
    function n(p) {
      t.hasOwnProperty("O_SYMLINK") && p.futimes ? (p.lutimes = function(S, R, O, P) {
        p.open(S, t.O_SYMLINK, function(M, C) {
          if (M) {
            P && P(M);
            return;
          }
          p.futimes(C, R, O, function(A) {
            p.close(C, function(T) {
              P && P(A || T);
            });
          });
        });
      }, p.lutimesSync = function(S, R, O) {
        var P = p.openSync(S, t.O_SYMLINK), M, C = !0;
        try {
          M = p.futimesSync(P, R, O), C = !1;
        } finally {
          if (C)
            try {
              p.closeSync(P);
            } catch {
            }
          else
            p.closeSync(P);
        }
        return M;
      }) : p.futimes && (p.lutimes = function(S, R, O, P) {
        P && process.nextTick(P);
      }, p.lutimesSync = function() {
      });
    }
    function o(p) {
      return p && function(S, R, O) {
        return p.call(i, S, R, function(P) {
          E(P) && (P = null), O && O.apply(this, arguments);
        });
      };
    }
    function a(p) {
      return p && function(S, R) {
        try {
          return p.call(i, S, R);
        } catch (O) {
          if (!E(O)) throw O;
        }
      };
    }
    function s(p) {
      return p && function(S, R, O, P) {
        return p.call(i, S, R, O, function(M) {
          E(M) && (M = null), P && P.apply(this, arguments);
        });
      };
    }
    function r(p) {
      return p && function(S, R, O) {
        try {
          return p.call(i, S, R, O);
        } catch (P) {
          if (!E(P)) throw P;
        }
      };
    }
    function m(p) {
      return p && function(S, R, O) {
        typeof R == "function" && (O = R, R = null);
        function P(M, C) {
          C && (C.uid < 0 && (C.uid += 4294967296), C.gid < 0 && (C.gid += 4294967296)), O && O.apply(this, arguments);
        }
        return R ? p.call(i, S, R, P) : p.call(i, S, P);
      };
    }
    function v(p) {
      return p && function(S, R) {
        var O = R ? p.call(i, S, R) : p.call(i, S);
        return O && (O.uid < 0 && (O.uid += 4294967296), O.gid < 0 && (O.gid += 4294967296)), O;
      };
    }
    function E(p) {
      if (!p || p.code === "ENOSYS")
        return !0;
      var S = !process.getuid || process.getuid() !== 0;
      return !!(S && (p.code === "EINVAL" || p.code === "EPERM"));
    }
  }
  return Jr;
}
var Qr, Ra;
function fc() {
  if (Ra) return Qr;
  Ra = 1;
  var t = mr.Stream;
  Qr = u;
  function u(d) {
    return {
      ReadStream: c,
      WriteStream: f
    };
    function c(l, i) {
      if (!(this instanceof c)) return new c(l, i);
      t.call(this);
      var h = this;
      this.path = l, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
      for (var n = Object.keys(i), o = 0, a = n.length; o < a; o++) {
        var s = n[o];
        this[s] = i[s];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          h._read();
        });
        return;
      }
      d.open(this.path, this.flags, this.mode, function(r, m) {
        if (r) {
          h.emit("error", r), h.readable = !1;
          return;
        }
        h.fd = m, h.emit("open", m), h._read();
      });
    }
    function f(l, i) {
      if (!(this instanceof f)) return new f(l, i);
      t.call(this), this.path = l, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
      for (var h = Object.keys(i), n = 0, o = h.length; n < o; n++) {
        var a = h[n];
        this[a] = i[a];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = d.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return Qr;
}
var Zr, Ca;
function dc() {
  if (Ca) return Zr;
  Ca = 1, Zr = u;
  var t = Object.getPrototypeOf || function(d) {
    return d.__proto__;
  };
  function u(d) {
    if (d === null || typeof d != "object")
      return d;
    if (d instanceof Object)
      var c = { __proto__: t(d) };
    else
      var c = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(d).forEach(function(f) {
      Object.defineProperty(c, f, Object.getOwnPropertyDescriptor(d, f));
    }), c;
  }
  return Zr;
}
var br, ba;
function Ve() {
  if (ba) return br;
  ba = 1;
  var t = ke, u = cc(), d = fc(), c = dc(), f = Ji, l, i;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (l = Symbol.for("graceful-fs.queue"), i = Symbol.for("graceful-fs.previous")) : (l = "___graceful-fs.queue", i = "___graceful-fs.previous");
  function h() {
  }
  function n(p, S) {
    Object.defineProperty(p, l, {
      get: function() {
        return S;
      }
    });
  }
  var o = h;
  if (f.debuglog ? o = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (o = function() {
    var p = f.format.apply(f, arguments);
    p = "GFS4: " + p.split(/\n/).join(`
GFS4: `), console.error(p);
  }), !t[l]) {
    var a = et[l] || [];
    n(t, a), t.close = function(p) {
      function S(R, O) {
        return p.call(t, R, function(P) {
          P || v(), typeof O == "function" && O.apply(this, arguments);
        });
      }
      return Object.defineProperty(S, i, {
        value: p
      }), S;
    }(t.close), t.closeSync = function(p) {
      function S(R) {
        p.apply(t, arguments), v();
      }
      return Object.defineProperty(S, i, {
        value: p
      }), S;
    }(t.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      o(t[l]), Ol.equal(t[l].length, 0);
    });
  }
  et[l] || n(et, t[l]), br = s(c(t)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !t.__patched && (br = s(t), t.__patched = !0);
  function s(p) {
    u(p), p.gracefulify = s, p.createReadStream = ce, p.createWriteStream = ue;
    var S = p.readFile;
    p.readFile = R;
    function R(K, Ee, _) {
      return typeof Ee == "function" && (_ = Ee, Ee = null), g(K, Ee, _);
      function g(H, D, le, me) {
        return S(H, D, function(pe) {
          pe && (pe.code === "EMFILE" || pe.code === "ENFILE") ? r([g, [H, D, le], pe, me || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var O = p.writeFile;
    p.writeFile = P;
    function P(K, Ee, _, g) {
      return typeof _ == "function" && (g = _, _ = null), H(K, Ee, _, g);
      function H(D, le, me, pe, _e) {
        return O(D, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [D, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var M = p.appendFile;
    M && (p.appendFile = C);
    function C(K, Ee, _, g) {
      return typeof _ == "function" && (g = _, _ = null), H(K, Ee, _, g);
      function H(D, le, me, pe, _e) {
        return M(D, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [D, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var A = p.copyFile;
    A && (p.copyFile = T);
    function T(K, Ee, _, g) {
      return typeof _ == "function" && (g = _, _ = 0), H(K, Ee, _, g);
      function H(D, le, me, pe, _e) {
        return A(D, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [D, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var y = p.readdir;
    p.readdir = U;
    var q = /^v[0-5]\./;
    function U(K, Ee, _) {
      typeof Ee == "function" && (_ = Ee, Ee = null);
      var g = q.test(process.version) ? function(le, me, pe, _e) {
        return y(le, H(
          le,
          me,
          pe,
          _e
        ));
      } : function(le, me, pe, _e) {
        return y(le, me, H(
          le,
          me,
          pe,
          _e
        ));
      };
      return g(K, Ee, _);
      function H(D, le, me, pe) {
        return function(_e, ye) {
          _e && (_e.code === "EMFILE" || _e.code === "ENFILE") ? r([
            g,
            [D, le, me],
            _e,
            pe || Date.now(),
            Date.now()
          ]) : (ye && ye.sort && ye.sort(), typeof me == "function" && me.call(this, _e, ye));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var L = d(p);
      $ = L.ReadStream, W = L.WriteStream;
    }
    var k = p.ReadStream;
    k && ($.prototype = Object.create(k.prototype), $.prototype.open = J);
    var N = p.WriteStream;
    N && (W.prototype = Object.create(N.prototype), W.prototype.open = ne), Object.defineProperty(p, "ReadStream", {
      get: function() {
        return $;
      },
      set: function(K) {
        $ = K;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(p, "WriteStream", {
      get: function() {
        return W;
      },
      set: function(K) {
        W = K;
      },
      enumerable: !0,
      configurable: !0
    });
    var I = $;
    Object.defineProperty(p, "FileReadStream", {
      get: function() {
        return I;
      },
      set: function(K) {
        I = K;
      },
      enumerable: !0,
      configurable: !0
    });
    var F = W;
    Object.defineProperty(p, "FileWriteStream", {
      get: function() {
        return F;
      },
      set: function(K) {
        F = K;
      },
      enumerable: !0,
      configurable: !0
    });
    function $(K, Ee) {
      return this instanceof $ ? (k.apply(this, arguments), this) : $.apply(Object.create($.prototype), arguments);
    }
    function J() {
      var K = this;
      Ae(K.path, K.flags, K.mode, function(Ee, _) {
        Ee ? (K.autoClose && K.destroy(), K.emit("error", Ee)) : (K.fd = _, K.emit("open", _), K.read());
      });
    }
    function W(K, Ee) {
      return this instanceof W ? (N.apply(this, arguments), this) : W.apply(Object.create(W.prototype), arguments);
    }
    function ne() {
      var K = this;
      Ae(K.path, K.flags, K.mode, function(Ee, _) {
        Ee ? (K.destroy(), K.emit("error", Ee)) : (K.fd = _, K.emit("open", _));
      });
    }
    function ce(K, Ee) {
      return new p.ReadStream(K, Ee);
    }
    function ue(K, Ee) {
      return new p.WriteStream(K, Ee);
    }
    var ie = p.open;
    p.open = Ae;
    function Ae(K, Ee, _, g) {
      return typeof _ == "function" && (g = _, _ = null), H(K, Ee, _, g);
      function H(D, le, me, pe, _e) {
        return ie(D, le, me, function(ye, xe) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? r([H, [D, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    return p;
  }
  function r(p) {
    o("ENQUEUE", p[0].name, p[1]), t[l].push(p), E();
  }
  var m;
  function v() {
    for (var p = Date.now(), S = 0; S < t[l].length; ++S)
      t[l][S].length > 2 && (t[l][S][3] = p, t[l][S][4] = p);
    E();
  }
  function E() {
    if (clearTimeout(m), m = void 0, t[l].length !== 0) {
      var p = t[l].shift(), S = p[0], R = p[1], O = p[2], P = p[3], M = p[4];
      if (P === void 0)
        o("RETRY", S.name, R), S.apply(null, R);
      else if (Date.now() - P >= 6e4) {
        o("TIMEOUT", S.name, R);
        var C = R.pop();
        typeof C == "function" && C.call(null, O);
      } else {
        var A = Date.now() - M, T = Math.max(M - P, 1), y = Math.min(T * 1.2, 100);
        A >= y ? (o("RETRY", S.name, R), S.apply(null, R.concat([P]))) : t[l].push(p);
      }
      m === void 0 && (m = setTimeout(E, 0));
    }
  }
  return br;
}
var Oa;
function Mt() {
  return Oa || (Oa = 1, function(t) {
    const u = ze().fromCallback, d = Ve(), c = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((f) => typeof d[f] == "function");
    Object.assign(t, d), c.forEach((f) => {
      t[f] = u(d[f]);
    }), t.exists = function(f, l) {
      return typeof l == "function" ? d.exists(f, l) : new Promise((i) => d.exists(f, i));
    }, t.read = function(f, l, i, h, n, o) {
      return typeof o == "function" ? d.read(f, l, i, h, n, o) : new Promise((a, s) => {
        d.read(f, l, i, h, n, (r, m, v) => {
          if (r) return s(r);
          a({ bytesRead: m, buffer: v });
        });
      });
    }, t.write = function(f, l, ...i) {
      return typeof i[i.length - 1] == "function" ? d.write(f, l, ...i) : new Promise((h, n) => {
        d.write(f, l, ...i, (o, a, s) => {
          if (o) return n(o);
          h({ bytesWritten: a, buffer: s });
        });
      });
    }, typeof d.writev == "function" && (t.writev = function(f, l, ...i) {
      return typeof i[i.length - 1] == "function" ? d.writev(f, l, ...i) : new Promise((h, n) => {
        d.writev(f, l, ...i, (o, a, s) => {
          if (o) return n(o);
          h({ bytesWritten: a, buffers: s });
        });
      });
    }), typeof d.realpath.native == "function" ? t.realpath.native = u(d.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Kr)), Kr;
}
var Or = {}, en = {}, Pa;
function hc() {
  if (Pa) return en;
  Pa = 1;
  const t = be;
  return en.checkPath = function(d) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(d.replace(t.parse(d).root, ""))) {
      const f = new Error(`Path contains invalid characters: ${d}`);
      throw f.code = "EINVAL", f;
    }
  }, en;
}
var Ia;
function pc() {
  if (Ia) return Or;
  Ia = 1;
  const t = /* @__PURE__ */ Mt(), { checkPath: u } = /* @__PURE__ */ hc(), d = (c) => {
    const f = { mode: 511 };
    return typeof c == "number" ? c : { ...f, ...c }.mode;
  };
  return Or.makeDir = async (c, f) => (u(c), t.mkdir(c, {
    mode: d(f),
    recursive: !0
  })), Or.makeDirSync = (c, f) => (u(c), t.mkdirSync(c, {
    mode: d(f),
    recursive: !0
  })), Or;
}
var tn, Da;
function at() {
  if (Da) return tn;
  Da = 1;
  const t = ze().fromPromise, { makeDir: u, makeDirSync: d } = /* @__PURE__ */ pc(), c = t(u);
  return tn = {
    mkdirs: c,
    mkdirsSync: d,
    // alias
    mkdirp: c,
    mkdirpSync: d,
    ensureDir: c,
    ensureDirSync: d
  }, tn;
}
var rn, Na;
function Pt() {
  if (Na) return rn;
  Na = 1;
  const t = ze().fromPromise, u = /* @__PURE__ */ Mt();
  function d(c) {
    return u.access(c).then(() => !0).catch(() => !1);
  }
  return rn = {
    pathExists: t(d),
    pathExistsSync: u.existsSync
  }, rn;
}
var nn, Fa;
function Nl() {
  if (Fa) return nn;
  Fa = 1;
  const t = Ve();
  function u(c, f, l, i) {
    t.open(c, "r+", (h, n) => {
      if (h) return i(h);
      t.futimes(n, f, l, (o) => {
        t.close(n, (a) => {
          i && i(o || a);
        });
      });
    });
  }
  function d(c, f, l) {
    const i = t.openSync(c, "r+");
    return t.futimesSync(i, f, l), t.closeSync(i);
  }
  return nn = {
    utimesMillis: u,
    utimesMillisSync: d
  }, nn;
}
var an, xa;
function Bt() {
  if (xa) return an;
  xa = 1;
  const t = /* @__PURE__ */ Mt(), u = be, d = Ji;
  function c(r, m, v) {
    const E = v.dereference ? (p) => t.stat(p, { bigint: !0 }) : (p) => t.lstat(p, { bigint: !0 });
    return Promise.all([
      E(r),
      E(m).catch((p) => {
        if (p.code === "ENOENT") return null;
        throw p;
      })
    ]).then(([p, S]) => ({ srcStat: p, destStat: S }));
  }
  function f(r, m, v) {
    let E;
    const p = v.dereference ? (R) => t.statSync(R, { bigint: !0 }) : (R) => t.lstatSync(R, { bigint: !0 }), S = p(r);
    try {
      E = p(m);
    } catch (R) {
      if (R.code === "ENOENT") return { srcStat: S, destStat: null };
      throw R;
    }
    return { srcStat: S, destStat: E };
  }
  function l(r, m, v, E, p) {
    d.callbackify(c)(r, m, E, (S, R) => {
      if (S) return p(S);
      const { srcStat: O, destStat: P } = R;
      if (P) {
        if (o(O, P)) {
          const M = u.basename(r), C = u.basename(m);
          return v === "move" && M !== C && M.toLowerCase() === C.toLowerCase() ? p(null, { srcStat: O, destStat: P, isChangingCase: !0 }) : p(new Error("Source and destination must not be the same."));
        }
        if (O.isDirectory() && !P.isDirectory())
          return p(new Error(`Cannot overwrite non-directory '${m}' with directory '${r}'.`));
        if (!O.isDirectory() && P.isDirectory())
          return p(new Error(`Cannot overwrite directory '${m}' with non-directory '${r}'.`));
      }
      return O.isDirectory() && a(r, m) ? p(new Error(s(r, m, v))) : p(null, { srcStat: O, destStat: P });
    });
  }
  function i(r, m, v, E) {
    const { srcStat: p, destStat: S } = f(r, m, E);
    if (S) {
      if (o(p, S)) {
        const R = u.basename(r), O = u.basename(m);
        if (v === "move" && R !== O && R.toLowerCase() === O.toLowerCase())
          return { srcStat: p, destStat: S, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (p.isDirectory() && !S.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${m}' with directory '${r}'.`);
      if (!p.isDirectory() && S.isDirectory())
        throw new Error(`Cannot overwrite directory '${m}' with non-directory '${r}'.`);
    }
    if (p.isDirectory() && a(r, m))
      throw new Error(s(r, m, v));
    return { srcStat: p, destStat: S };
  }
  function h(r, m, v, E, p) {
    const S = u.resolve(u.dirname(r)), R = u.resolve(u.dirname(v));
    if (R === S || R === u.parse(R).root) return p();
    t.stat(R, { bigint: !0 }, (O, P) => O ? O.code === "ENOENT" ? p() : p(O) : o(m, P) ? p(new Error(s(r, v, E))) : h(r, m, R, E, p));
  }
  function n(r, m, v, E) {
    const p = u.resolve(u.dirname(r)), S = u.resolve(u.dirname(v));
    if (S === p || S === u.parse(S).root) return;
    let R;
    try {
      R = t.statSync(S, { bigint: !0 });
    } catch (O) {
      if (O.code === "ENOENT") return;
      throw O;
    }
    if (o(m, R))
      throw new Error(s(r, v, E));
    return n(r, m, S, E);
  }
  function o(r, m) {
    return m.ino && m.dev && m.ino === r.ino && m.dev === r.dev;
  }
  function a(r, m) {
    const v = u.resolve(r).split(u.sep).filter((p) => p), E = u.resolve(m).split(u.sep).filter((p) => p);
    return v.reduce((p, S, R) => p && E[R] === S, !0);
  }
  function s(r, m, v) {
    return `Cannot ${v} '${r}' to a subdirectory of itself, '${m}'.`;
  }
  return an = {
    checkPaths: l,
    checkPathsSync: i,
    checkParentPaths: h,
    checkParentPathsSync: n,
    isSrcSubdir: a,
    areIdentical: o
  }, an;
}
var on, La;
function mc() {
  if (La) return on;
  La = 1;
  const t = Ve(), u = be, d = at().mkdirs, c = Pt().pathExists, f = Nl().utimesMillis, l = /* @__PURE__ */ Bt();
  function i(U, L, k, N) {
    typeof k == "function" && !N ? (N = k, k = {}) : typeof k == "function" && (k = { filter: k }), N = N || function() {
    }, k = k || {}, k.clobber = "clobber" in k ? !!k.clobber : !0, k.overwrite = "overwrite" in k ? !!k.overwrite : k.clobber, k.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), l.checkPaths(U, L, "copy", k, (I, F) => {
      if (I) return N(I);
      const { srcStat: $, destStat: J } = F;
      l.checkParentPaths(U, $, L, "copy", (W) => W ? N(W) : k.filter ? n(h, J, U, L, k, N) : h(J, U, L, k, N));
    });
  }
  function h(U, L, k, N, I) {
    const F = u.dirname(k);
    c(F, ($, J) => {
      if ($) return I($);
      if (J) return a(U, L, k, N, I);
      d(F, (W) => W ? I(W) : a(U, L, k, N, I));
    });
  }
  function n(U, L, k, N, I, F) {
    Promise.resolve(I.filter(k, N)).then(($) => $ ? U(L, k, N, I, F) : F(), ($) => F($));
  }
  function o(U, L, k, N, I) {
    return N.filter ? n(a, U, L, k, N, I) : a(U, L, k, N, I);
  }
  function a(U, L, k, N, I) {
    (N.dereference ? t.stat : t.lstat)(L, ($, J) => $ ? I($) : J.isDirectory() ? P(J, U, L, k, N, I) : J.isFile() || J.isCharacterDevice() || J.isBlockDevice() ? s(J, U, L, k, N, I) : J.isSymbolicLink() ? y(U, L, k, N, I) : J.isSocket() ? I(new Error(`Cannot copy a socket file: ${L}`)) : J.isFIFO() ? I(new Error(`Cannot copy a FIFO pipe: ${L}`)) : I(new Error(`Unknown file: ${L}`)));
  }
  function s(U, L, k, N, I, F) {
    return L ? r(U, k, N, I, F) : m(U, k, N, I, F);
  }
  function r(U, L, k, N, I) {
    if (N.overwrite)
      t.unlink(k, (F) => F ? I(F) : m(U, L, k, N, I));
    else return N.errorOnExist ? I(new Error(`'${k}' already exists`)) : I();
  }
  function m(U, L, k, N, I) {
    t.copyFile(L, k, (F) => F ? I(F) : N.preserveTimestamps ? v(U.mode, L, k, I) : R(k, U.mode, I));
  }
  function v(U, L, k, N) {
    return E(U) ? p(k, U, (I) => I ? N(I) : S(U, L, k, N)) : S(U, L, k, N);
  }
  function E(U) {
    return (U & 128) === 0;
  }
  function p(U, L, k) {
    return R(U, L | 128, k);
  }
  function S(U, L, k, N) {
    O(L, k, (I) => I ? N(I) : R(k, U, N));
  }
  function R(U, L, k) {
    return t.chmod(U, L, k);
  }
  function O(U, L, k) {
    t.stat(U, (N, I) => N ? k(N) : f(L, I.atime, I.mtime, k));
  }
  function P(U, L, k, N, I, F) {
    return L ? C(k, N, I, F) : M(U.mode, k, N, I, F);
  }
  function M(U, L, k, N, I) {
    t.mkdir(k, (F) => {
      if (F) return I(F);
      C(L, k, N, ($) => $ ? I($) : R(k, U, I));
    });
  }
  function C(U, L, k, N) {
    t.readdir(U, (I, F) => I ? N(I) : A(F, U, L, k, N));
  }
  function A(U, L, k, N, I) {
    const F = U.pop();
    return F ? T(U, F, L, k, N, I) : I();
  }
  function T(U, L, k, N, I, F) {
    const $ = u.join(k, L), J = u.join(N, L);
    l.checkPaths($, J, "copy", I, (W, ne) => {
      if (W) return F(W);
      const { destStat: ce } = ne;
      o(ce, $, J, I, (ue) => ue ? F(ue) : A(U, k, N, I, F));
    });
  }
  function y(U, L, k, N, I) {
    t.readlink(L, (F, $) => {
      if (F) return I(F);
      if (N.dereference && ($ = u.resolve(process.cwd(), $)), U)
        t.readlink(k, (J, W) => J ? J.code === "EINVAL" || J.code === "UNKNOWN" ? t.symlink($, k, I) : I(J) : (N.dereference && (W = u.resolve(process.cwd(), W)), l.isSrcSubdir($, W) ? I(new Error(`Cannot copy '${$}' to a subdirectory of itself, '${W}'.`)) : U.isDirectory() && l.isSrcSubdir(W, $) ? I(new Error(`Cannot overwrite '${W}' with '${$}'.`)) : q($, k, I)));
      else
        return t.symlink($, k, I);
    });
  }
  function q(U, L, k) {
    t.unlink(L, (N) => N ? k(N) : t.symlink(U, L, k));
  }
  return on = i, on;
}
var sn, Ua;
function gc() {
  if (Ua) return sn;
  Ua = 1;
  const t = Ve(), u = be, d = at().mkdirsSync, c = Nl().utimesMillisSync, f = /* @__PURE__ */ Bt();
  function l(A, T, y) {
    typeof y == "function" && (y = { filter: y }), y = y || {}, y.clobber = "clobber" in y ? !!y.clobber : !0, y.overwrite = "overwrite" in y ? !!y.overwrite : y.clobber, y.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: q, destStat: U } = f.checkPathsSync(A, T, "copy", y);
    return f.checkParentPathsSync(A, q, T, "copy"), i(U, A, T, y);
  }
  function i(A, T, y, q) {
    if (q.filter && !q.filter(T, y)) return;
    const U = u.dirname(y);
    return t.existsSync(U) || d(U), n(A, T, y, q);
  }
  function h(A, T, y, q) {
    if (!(q.filter && !q.filter(T, y)))
      return n(A, T, y, q);
  }
  function n(A, T, y, q) {
    const L = (q.dereference ? t.statSync : t.lstatSync)(T);
    if (L.isDirectory()) return S(L, A, T, y, q);
    if (L.isFile() || L.isCharacterDevice() || L.isBlockDevice()) return o(L, A, T, y, q);
    if (L.isSymbolicLink()) return M(A, T, y, q);
    throw L.isSocket() ? new Error(`Cannot copy a socket file: ${T}`) : L.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${T}`) : new Error(`Unknown file: ${T}`);
  }
  function o(A, T, y, q, U) {
    return T ? a(A, y, q, U) : s(A, y, q, U);
  }
  function a(A, T, y, q) {
    if (q.overwrite)
      return t.unlinkSync(y), s(A, T, y, q);
    if (q.errorOnExist)
      throw new Error(`'${y}' already exists`);
  }
  function s(A, T, y, q) {
    return t.copyFileSync(T, y), q.preserveTimestamps && r(A.mode, T, y), E(y, A.mode);
  }
  function r(A, T, y) {
    return m(A) && v(y, A), p(T, y);
  }
  function m(A) {
    return (A & 128) === 0;
  }
  function v(A, T) {
    return E(A, T | 128);
  }
  function E(A, T) {
    return t.chmodSync(A, T);
  }
  function p(A, T) {
    const y = t.statSync(A);
    return c(T, y.atime, y.mtime);
  }
  function S(A, T, y, q, U) {
    return T ? O(y, q, U) : R(A.mode, y, q, U);
  }
  function R(A, T, y, q) {
    return t.mkdirSync(y), O(T, y, q), E(y, A);
  }
  function O(A, T, y) {
    t.readdirSync(A).forEach((q) => P(q, A, T, y));
  }
  function P(A, T, y, q) {
    const U = u.join(T, A), L = u.join(y, A), { destStat: k } = f.checkPathsSync(U, L, "copy", q);
    return h(k, U, L, q);
  }
  function M(A, T, y, q) {
    let U = t.readlinkSync(T);
    if (q.dereference && (U = u.resolve(process.cwd(), U)), A) {
      let L;
      try {
        L = t.readlinkSync(y);
      } catch (k) {
        if (k.code === "EINVAL" || k.code === "UNKNOWN") return t.symlinkSync(U, y);
        throw k;
      }
      if (q.dereference && (L = u.resolve(process.cwd(), L)), f.isSrcSubdir(U, L))
        throw new Error(`Cannot copy '${U}' to a subdirectory of itself, '${L}'.`);
      if (t.statSync(y).isDirectory() && f.isSrcSubdir(L, U))
        throw new Error(`Cannot overwrite '${L}' with '${U}'.`);
      return C(U, y);
    } else
      return t.symlinkSync(U, y);
  }
  function C(A, T) {
    return t.unlinkSync(T), t.symlinkSync(A, T);
  }
  return sn = l, sn;
}
var ln, $a;
function Qi() {
  if ($a) return ln;
  $a = 1;
  const t = ze().fromCallback;
  return ln = {
    copy: t(/* @__PURE__ */ mc()),
    copySync: /* @__PURE__ */ gc()
  }, ln;
}
var un, ka;
function vc() {
  if (ka) return un;
  ka = 1;
  const t = Ve(), u = be, d = Ol, c = process.platform === "win32";
  function f(v) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((p) => {
      v[p] = v[p] || t[p], p = p + "Sync", v[p] = v[p] || t[p];
    }), v.maxBusyTries = v.maxBusyTries || 3;
  }
  function l(v, E, p) {
    let S = 0;
    typeof E == "function" && (p = E, E = {}), d(v, "rimraf: missing path"), d.strictEqual(typeof v, "string", "rimraf: path should be a string"), d.strictEqual(typeof p, "function", "rimraf: callback function required"), d(E, "rimraf: invalid options argument provided"), d.strictEqual(typeof E, "object", "rimraf: options should be object"), f(E), i(v, E, function R(O) {
      if (O) {
        if ((O.code === "EBUSY" || O.code === "ENOTEMPTY" || O.code === "EPERM") && S < E.maxBusyTries) {
          S++;
          const P = S * 100;
          return setTimeout(() => i(v, E, R), P);
        }
        O.code === "ENOENT" && (O = null);
      }
      p(O);
    });
  }
  function i(v, E, p) {
    d(v), d(E), d(typeof p == "function"), E.lstat(v, (S, R) => {
      if (S && S.code === "ENOENT")
        return p(null);
      if (S && S.code === "EPERM" && c)
        return h(v, E, S, p);
      if (R && R.isDirectory())
        return o(v, E, S, p);
      E.unlink(v, (O) => {
        if (O) {
          if (O.code === "ENOENT")
            return p(null);
          if (O.code === "EPERM")
            return c ? h(v, E, O, p) : o(v, E, O, p);
          if (O.code === "EISDIR")
            return o(v, E, O, p);
        }
        return p(O);
      });
    });
  }
  function h(v, E, p, S) {
    d(v), d(E), d(typeof S == "function"), E.chmod(v, 438, (R) => {
      R ? S(R.code === "ENOENT" ? null : p) : E.stat(v, (O, P) => {
        O ? S(O.code === "ENOENT" ? null : p) : P.isDirectory() ? o(v, E, p, S) : E.unlink(v, S);
      });
    });
  }
  function n(v, E, p) {
    let S;
    d(v), d(E);
    try {
      E.chmodSync(v, 438);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw p;
    }
    try {
      S = E.statSync(v);
    } catch (R) {
      if (R.code === "ENOENT")
        return;
      throw p;
    }
    S.isDirectory() ? r(v, E, p) : E.unlinkSync(v);
  }
  function o(v, E, p, S) {
    d(v), d(E), d(typeof S == "function"), E.rmdir(v, (R) => {
      R && (R.code === "ENOTEMPTY" || R.code === "EEXIST" || R.code === "EPERM") ? a(v, E, S) : R && R.code === "ENOTDIR" ? S(p) : S(R);
    });
  }
  function a(v, E, p) {
    d(v), d(E), d(typeof p == "function"), E.readdir(v, (S, R) => {
      if (S) return p(S);
      let O = R.length, P;
      if (O === 0) return E.rmdir(v, p);
      R.forEach((M) => {
        l(u.join(v, M), E, (C) => {
          if (!P) {
            if (C) return p(P = C);
            --O === 0 && E.rmdir(v, p);
          }
        });
      });
    });
  }
  function s(v, E) {
    let p;
    E = E || {}, f(E), d(v, "rimraf: missing path"), d.strictEqual(typeof v, "string", "rimraf: path should be a string"), d(E, "rimraf: missing options"), d.strictEqual(typeof E, "object", "rimraf: options should be object");
    try {
      p = E.lstatSync(v);
    } catch (S) {
      if (S.code === "ENOENT")
        return;
      S.code === "EPERM" && c && n(v, E, S);
    }
    try {
      p && p.isDirectory() ? r(v, E, null) : E.unlinkSync(v);
    } catch (S) {
      if (S.code === "ENOENT")
        return;
      if (S.code === "EPERM")
        return c ? n(v, E, S) : r(v, E, S);
      if (S.code !== "EISDIR")
        throw S;
      r(v, E, S);
    }
  }
  function r(v, E, p) {
    d(v), d(E);
    try {
      E.rmdirSync(v);
    } catch (S) {
      if (S.code === "ENOTDIR")
        throw p;
      if (S.code === "ENOTEMPTY" || S.code === "EEXIST" || S.code === "EPERM")
        m(v, E);
      else if (S.code !== "ENOENT")
        throw S;
    }
  }
  function m(v, E) {
    if (d(v), d(E), E.readdirSync(v).forEach((p) => s(u.join(v, p), E)), c) {
      const p = Date.now();
      do
        try {
          return E.rmdirSync(v, E);
        } catch {
        }
      while (Date.now() - p < 500);
    } else
      return E.rmdirSync(v, E);
  }
  return un = l, l.sync = s, un;
}
var cn, qa;
function Br() {
  if (qa) return cn;
  qa = 1;
  const t = Ve(), u = ze().fromCallback, d = /* @__PURE__ */ vc();
  function c(l, i) {
    if (t.rm) return t.rm(l, { recursive: !0, force: !0 }, i);
    d(l, i);
  }
  function f(l) {
    if (t.rmSync) return t.rmSync(l, { recursive: !0, force: !0 });
    d.sync(l);
  }
  return cn = {
    remove: u(c),
    removeSync: f
  }, cn;
}
var fn, Ma;
function Ec() {
  if (Ma) return fn;
  Ma = 1;
  const t = ze().fromPromise, u = /* @__PURE__ */ Mt(), d = be, c = /* @__PURE__ */ at(), f = /* @__PURE__ */ Br(), l = t(async function(n) {
    let o;
    try {
      o = await u.readdir(n);
    } catch {
      return c.mkdirs(n);
    }
    return Promise.all(o.map((a) => f.remove(d.join(n, a))));
  });
  function i(h) {
    let n;
    try {
      n = u.readdirSync(h);
    } catch {
      return c.mkdirsSync(h);
    }
    n.forEach((o) => {
      o = d.join(h, o), f.removeSync(o);
    });
  }
  return fn = {
    emptyDirSync: i,
    emptydirSync: i,
    emptyDir: l,
    emptydir: l
  }, fn;
}
var dn, Ba;
function yc() {
  if (Ba) return dn;
  Ba = 1;
  const t = ze().fromCallback, u = be, d = Ve(), c = /* @__PURE__ */ at();
  function f(i, h) {
    function n() {
      d.writeFile(i, "", (o) => {
        if (o) return h(o);
        h();
      });
    }
    d.stat(i, (o, a) => {
      if (!o && a.isFile()) return h();
      const s = u.dirname(i);
      d.stat(s, (r, m) => {
        if (r)
          return r.code === "ENOENT" ? c.mkdirs(s, (v) => {
            if (v) return h(v);
            n();
          }) : h(r);
        m.isDirectory() ? n() : d.readdir(s, (v) => {
          if (v) return h(v);
        });
      });
    });
  }
  function l(i) {
    let h;
    try {
      h = d.statSync(i);
    } catch {
    }
    if (h && h.isFile()) return;
    const n = u.dirname(i);
    try {
      d.statSync(n).isDirectory() || d.readdirSync(n);
    } catch (o) {
      if (o && o.code === "ENOENT") c.mkdirsSync(n);
      else throw o;
    }
    d.writeFileSync(i, "");
  }
  return dn = {
    createFile: t(f),
    createFileSync: l
  }, dn;
}
var hn, Ha;
function wc() {
  if (Ha) return hn;
  Ha = 1;
  const t = ze().fromCallback, u = be, d = Ve(), c = /* @__PURE__ */ at(), f = Pt().pathExists, { areIdentical: l } = /* @__PURE__ */ Bt();
  function i(n, o, a) {
    function s(r, m) {
      d.link(r, m, (v) => {
        if (v) return a(v);
        a(null);
      });
    }
    d.lstat(o, (r, m) => {
      d.lstat(n, (v, E) => {
        if (v)
          return v.message = v.message.replace("lstat", "ensureLink"), a(v);
        if (m && l(E, m)) return a(null);
        const p = u.dirname(o);
        f(p, (S, R) => {
          if (S) return a(S);
          if (R) return s(n, o);
          c.mkdirs(p, (O) => {
            if (O) return a(O);
            s(n, o);
          });
        });
      });
    });
  }
  function h(n, o) {
    let a;
    try {
      a = d.lstatSync(o);
    } catch {
    }
    try {
      const m = d.lstatSync(n);
      if (a && l(m, a)) return;
    } catch (m) {
      throw m.message = m.message.replace("lstat", "ensureLink"), m;
    }
    const s = u.dirname(o);
    return d.existsSync(s) || c.mkdirsSync(s), d.linkSync(n, o);
  }
  return hn = {
    createLink: t(i),
    createLinkSync: h
  }, hn;
}
var pn, ja;
function _c() {
  if (ja) return pn;
  ja = 1;
  const t = be, u = Ve(), d = Pt().pathExists;
  function c(l, i, h) {
    if (t.isAbsolute(l))
      return u.lstat(l, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), h(n)) : h(null, {
        toCwd: l,
        toDst: l
      }));
    {
      const n = t.dirname(i), o = t.join(n, l);
      return d(o, (a, s) => a ? h(a) : s ? h(null, {
        toCwd: o,
        toDst: l
      }) : u.lstat(l, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), h(r)) : h(null, {
        toCwd: l,
        toDst: t.relative(n, l)
      })));
    }
  }
  function f(l, i) {
    let h;
    if (t.isAbsolute(l)) {
      if (h = u.existsSync(l), !h) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: l,
        toDst: l
      };
    } else {
      const n = t.dirname(i), o = t.join(n, l);
      if (h = u.existsSync(o), h)
        return {
          toCwd: o,
          toDst: l
        };
      if (h = u.existsSync(l), !h) throw new Error("relative srcpath does not exist");
      return {
        toCwd: l,
        toDst: t.relative(n, l)
      };
    }
  }
  return pn = {
    symlinkPaths: c,
    symlinkPathsSync: f
  }, pn;
}
var mn, Ga;
function Sc() {
  if (Ga) return mn;
  Ga = 1;
  const t = Ve();
  function u(c, f, l) {
    if (l = typeof f == "function" ? f : l, f = typeof f == "function" ? !1 : f, f) return l(null, f);
    t.lstat(c, (i, h) => {
      if (i) return l(null, "file");
      f = h && h.isDirectory() ? "dir" : "file", l(null, f);
    });
  }
  function d(c, f) {
    let l;
    if (f) return f;
    try {
      l = t.lstatSync(c);
    } catch {
      return "file";
    }
    return l && l.isDirectory() ? "dir" : "file";
  }
  return mn = {
    symlinkType: u,
    symlinkTypeSync: d
  }, mn;
}
var gn, Wa;
function Ac() {
  if (Wa) return gn;
  Wa = 1;
  const t = ze().fromCallback, u = be, d = /* @__PURE__ */ Mt(), c = /* @__PURE__ */ at(), f = c.mkdirs, l = c.mkdirsSync, i = /* @__PURE__ */ _c(), h = i.symlinkPaths, n = i.symlinkPathsSync, o = /* @__PURE__ */ Sc(), a = o.symlinkType, s = o.symlinkTypeSync, r = Pt().pathExists, { areIdentical: m } = /* @__PURE__ */ Bt();
  function v(S, R, O, P) {
    P = typeof O == "function" ? O : P, O = typeof O == "function" ? !1 : O, d.lstat(R, (M, C) => {
      !M && C.isSymbolicLink() ? Promise.all([
        d.stat(S),
        d.stat(R)
      ]).then(([A, T]) => {
        if (m(A, T)) return P(null);
        E(S, R, O, P);
      }) : E(S, R, O, P);
    });
  }
  function E(S, R, O, P) {
    h(S, R, (M, C) => {
      if (M) return P(M);
      S = C.toDst, a(C.toCwd, O, (A, T) => {
        if (A) return P(A);
        const y = u.dirname(R);
        r(y, (q, U) => {
          if (q) return P(q);
          if (U) return d.symlink(S, R, T, P);
          f(y, (L) => {
            if (L) return P(L);
            d.symlink(S, R, T, P);
          });
        });
      });
    });
  }
  function p(S, R, O) {
    let P;
    try {
      P = d.lstatSync(R);
    } catch {
    }
    if (P && P.isSymbolicLink()) {
      const T = d.statSync(S), y = d.statSync(R);
      if (m(T, y)) return;
    }
    const M = n(S, R);
    S = M.toDst, O = s(M.toCwd, O);
    const C = u.dirname(R);
    return d.existsSync(C) || l(C), d.symlinkSync(S, R, O);
  }
  return gn = {
    createSymlink: t(v),
    createSymlinkSync: p
  }, gn;
}
var vn, Va;
function Tc() {
  if (Va) return vn;
  Va = 1;
  const { createFile: t, createFileSync: u } = /* @__PURE__ */ yc(), { createLink: d, createLinkSync: c } = /* @__PURE__ */ wc(), { createSymlink: f, createSymlinkSync: l } = /* @__PURE__ */ Ac();
  return vn = {
    // file
    createFile: t,
    createFileSync: u,
    ensureFile: t,
    ensureFileSync: u,
    // link
    createLink: d,
    createLinkSync: c,
    ensureLink: d,
    ensureLinkSync: c,
    // symlink
    createSymlink: f,
    createSymlinkSync: l,
    ensureSymlink: f,
    ensureSymlinkSync: l
  }, vn;
}
var En, Ya;
function Zi() {
  if (Ya) return En;
  Ya = 1;
  function t(d, { EOL: c = `
`, finalEOL: f = !0, replacer: l = null, spaces: i } = {}) {
    const h = f ? c : "";
    return JSON.stringify(d, l, i).replace(/\n/g, c) + h;
  }
  function u(d) {
    return Buffer.isBuffer(d) && (d = d.toString("utf8")), d.replace(/^\uFEFF/, "");
  }
  return En = { stringify: t, stripBom: u }, En;
}
var yn, za;
function Rc() {
  if (za) return yn;
  za = 1;
  let t;
  try {
    t = Ve();
  } catch {
    t = ke;
  }
  const u = ze(), { stringify: d, stripBom: c } = Zi();
  async function f(s, r = {}) {
    typeof r == "string" && (r = { encoding: r });
    const m = r.fs || t, v = "throws" in r ? r.throws : !0;
    let E = await u.fromCallback(m.readFile)(s, r);
    E = c(E);
    let p;
    try {
      p = JSON.parse(E, r ? r.reviver : null);
    } catch (S) {
      if (v)
        throw S.message = `${s}: ${S.message}`, S;
      return null;
    }
    return p;
  }
  const l = u.fromPromise(f);
  function i(s, r = {}) {
    typeof r == "string" && (r = { encoding: r });
    const m = r.fs || t, v = "throws" in r ? r.throws : !0;
    try {
      let E = m.readFileSync(s, r);
      return E = c(E), JSON.parse(E, r.reviver);
    } catch (E) {
      if (v)
        throw E.message = `${s}: ${E.message}`, E;
      return null;
    }
  }
  async function h(s, r, m = {}) {
    const v = m.fs || t, E = d(r, m);
    await u.fromCallback(v.writeFile)(s, E, m);
  }
  const n = u.fromPromise(h);
  function o(s, r, m = {}) {
    const v = m.fs || t, E = d(r, m);
    return v.writeFileSync(s, E, m);
  }
  return yn = {
    readFile: l,
    readFileSync: i,
    writeFile: n,
    writeFileSync: o
  }, yn;
}
var wn, Xa;
function Cc() {
  if (Xa) return wn;
  Xa = 1;
  const t = Rc();
  return wn = {
    // jsonfile exports
    readJson: t.readFile,
    readJsonSync: t.readFileSync,
    writeJson: t.writeFile,
    writeJsonSync: t.writeFileSync
  }, wn;
}
var _n, Ka;
function ea() {
  if (Ka) return _n;
  Ka = 1;
  const t = ze().fromCallback, u = Ve(), d = be, c = /* @__PURE__ */ at(), f = Pt().pathExists;
  function l(h, n, o, a) {
    typeof o == "function" && (a = o, o = "utf8");
    const s = d.dirname(h);
    f(s, (r, m) => {
      if (r) return a(r);
      if (m) return u.writeFile(h, n, o, a);
      c.mkdirs(s, (v) => {
        if (v) return a(v);
        u.writeFile(h, n, o, a);
      });
    });
  }
  function i(h, ...n) {
    const o = d.dirname(h);
    if (u.existsSync(o))
      return u.writeFileSync(h, ...n);
    c.mkdirsSync(o), u.writeFileSync(h, ...n);
  }
  return _n = {
    outputFile: t(l),
    outputFileSync: i
  }, _n;
}
var Sn, Ja;
function bc() {
  if (Ja) return Sn;
  Ja = 1;
  const { stringify: t } = Zi(), { outputFile: u } = /* @__PURE__ */ ea();
  async function d(c, f, l = {}) {
    const i = t(f, l);
    await u(c, i, l);
  }
  return Sn = d, Sn;
}
var An, Qa;
function Oc() {
  if (Qa) return An;
  Qa = 1;
  const { stringify: t } = Zi(), { outputFileSync: u } = /* @__PURE__ */ ea();
  function d(c, f, l) {
    const i = t(f, l);
    u(c, i, l);
  }
  return An = d, An;
}
var Tn, Za;
function Pc() {
  if (Za) return Tn;
  Za = 1;
  const t = ze().fromPromise, u = /* @__PURE__ */ Cc();
  return u.outputJson = t(/* @__PURE__ */ bc()), u.outputJsonSync = /* @__PURE__ */ Oc(), u.outputJSON = u.outputJson, u.outputJSONSync = u.outputJsonSync, u.writeJSON = u.writeJson, u.writeJSONSync = u.writeJsonSync, u.readJSON = u.readJson, u.readJSONSync = u.readJsonSync, Tn = u, Tn;
}
var Rn, eo;
function Ic() {
  if (eo) return Rn;
  eo = 1;
  const t = Ve(), u = be, d = Qi().copy, c = Br().remove, f = at().mkdirp, l = Pt().pathExists, i = /* @__PURE__ */ Bt();
  function h(r, m, v, E) {
    typeof v == "function" && (E = v, v = {}), v = v || {};
    const p = v.overwrite || v.clobber || !1;
    i.checkPaths(r, m, "move", v, (S, R) => {
      if (S) return E(S);
      const { srcStat: O, isChangingCase: P = !1 } = R;
      i.checkParentPaths(r, O, m, "move", (M) => {
        if (M) return E(M);
        if (n(m)) return o(r, m, p, P, E);
        f(u.dirname(m), (C) => C ? E(C) : o(r, m, p, P, E));
      });
    });
  }
  function n(r) {
    const m = u.dirname(r);
    return u.parse(m).root === m;
  }
  function o(r, m, v, E, p) {
    if (E) return a(r, m, v, p);
    if (v)
      return c(m, (S) => S ? p(S) : a(r, m, v, p));
    l(m, (S, R) => S ? p(S) : R ? p(new Error("dest already exists.")) : a(r, m, v, p));
  }
  function a(r, m, v, E) {
    t.rename(r, m, (p) => p ? p.code !== "EXDEV" ? E(p) : s(r, m, v, E) : E());
  }
  function s(r, m, v, E) {
    d(r, m, {
      overwrite: v,
      errorOnExist: !0
    }, (S) => S ? E(S) : c(r, E));
  }
  return Rn = h, Rn;
}
var Cn, to;
function Dc() {
  if (to) return Cn;
  to = 1;
  const t = Ve(), u = be, d = Qi().copySync, c = Br().removeSync, f = at().mkdirpSync, l = /* @__PURE__ */ Bt();
  function i(s, r, m) {
    m = m || {};
    const v = m.overwrite || m.clobber || !1, { srcStat: E, isChangingCase: p = !1 } = l.checkPathsSync(s, r, "move", m);
    return l.checkParentPathsSync(s, E, r, "move"), h(r) || f(u.dirname(r)), n(s, r, v, p);
  }
  function h(s) {
    const r = u.dirname(s);
    return u.parse(r).root === r;
  }
  function n(s, r, m, v) {
    if (v) return o(s, r, m);
    if (m)
      return c(r), o(s, r, m);
    if (t.existsSync(r)) throw new Error("dest already exists.");
    return o(s, r, m);
  }
  function o(s, r, m) {
    try {
      t.renameSync(s, r);
    } catch (v) {
      if (v.code !== "EXDEV") throw v;
      return a(s, r, m);
    }
  }
  function a(s, r, m) {
    return d(s, r, {
      overwrite: m,
      errorOnExist: !0
    }), c(s);
  }
  return Cn = i, Cn;
}
var bn, ro;
function Nc() {
  if (ro) return bn;
  ro = 1;
  const t = ze().fromCallback;
  return bn = {
    move: t(/* @__PURE__ */ Ic()),
    moveSync: /* @__PURE__ */ Dc()
  }, bn;
}
var On, no;
function gt() {
  return no || (no = 1, On = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Mt(),
    // Export extra methods:
    .../* @__PURE__ */ Qi(),
    .../* @__PURE__ */ Ec(),
    .../* @__PURE__ */ Tc(),
    .../* @__PURE__ */ Pc(),
    .../* @__PURE__ */ at(),
    .../* @__PURE__ */ Nc(),
    .../* @__PURE__ */ ea(),
    .../* @__PURE__ */ Pt(),
    .../* @__PURE__ */ Br()
  }), On;
}
var Vt = {}, Tt = {}, Pn = {}, Rt = {}, io;
function ta() {
  if (io) return Rt;
  io = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.CancellationError = Rt.CancellationToken = void 0;
  const t = Pl;
  let u = class extends t.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(f) {
      this.removeParentCancelHandler(), this._parent = f, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(f) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, f != null && (this.parent = f);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(f) {
      this.cancelled ? f() : this.once("cancel", f);
    }
    createPromise(f) {
      if (this.cancelled)
        return Promise.reject(new d());
      const l = () => {
        if (i != null)
          try {
            this.removeListener("cancel", i), i = null;
          } catch {
          }
      };
      let i = null;
      return new Promise((h, n) => {
        let o = null;
        if (i = () => {
          try {
            o != null && (o(), o = null);
          } finally {
            n(new d());
          }
        }, this.cancelled) {
          i();
          return;
        }
        this.onCancel(i), f(h, n, (a) => {
          o = a;
        });
      }).then((h) => (l(), h)).catch((h) => {
        throw l(), h;
      });
    }
    removeParentCancelHandler() {
      const f = this._parent;
      f != null && this.parentCancelHandler != null && (f.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  Rt.CancellationToken = u;
  class d extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Rt.CancellationError = d, Rt;
}
var Pr = {}, ao;
function Hr() {
  if (ao) return Pr;
  ao = 1, Object.defineProperty(Pr, "__esModule", { value: !0 }), Pr.newError = t;
  function t(u, d) {
    const c = new Error(u);
    return c.code = d, c;
  }
  return Pr;
}
var He = {}, Ir = { exports: {} }, Dr = { exports: {} }, In, oo;
function Fc() {
  if (oo) return In;
  oo = 1;
  var t = 1e3, u = t * 60, d = u * 60, c = d * 24, f = c * 7, l = c * 365.25;
  In = function(a, s) {
    s = s || {};
    var r = typeof a;
    if (r === "string" && a.length > 0)
      return i(a);
    if (r === "number" && isFinite(a))
      return s.long ? n(a) : h(a);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(a)
    );
  };
  function i(a) {
    if (a = String(a), !(a.length > 100)) {
      var s = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        a
      );
      if (s) {
        var r = parseFloat(s[1]), m = (s[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * l;
          case "weeks":
          case "week":
          case "w":
            return r * f;
          case "days":
          case "day":
          case "d":
            return r * c;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * d;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * u;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function h(a) {
    var s = Math.abs(a);
    return s >= c ? Math.round(a / c) + "d" : s >= d ? Math.round(a / d) + "h" : s >= u ? Math.round(a / u) + "m" : s >= t ? Math.round(a / t) + "s" : a + "ms";
  }
  function n(a) {
    var s = Math.abs(a);
    return s >= c ? o(a, s, c, "day") : s >= d ? o(a, s, d, "hour") : s >= u ? o(a, s, u, "minute") : s >= t ? o(a, s, t, "second") : a + " ms";
  }
  function o(a, s, r, m) {
    var v = s >= r * 1.5;
    return Math.round(a / r) + " " + m + (v ? "s" : "");
  }
  return In;
}
var Dn, so;
function Fl() {
  if (so) return Dn;
  so = 1;
  function t(u) {
    c.debug = c, c.default = c, c.coerce = o, c.disable = h, c.enable = l, c.enabled = n, c.humanize = Fc(), c.destroy = a, Object.keys(u).forEach((s) => {
      c[s] = u[s];
    }), c.names = [], c.skips = [], c.formatters = {};
    function d(s) {
      let r = 0;
      for (let m = 0; m < s.length; m++)
        r = (r << 5) - r + s.charCodeAt(m), r |= 0;
      return c.colors[Math.abs(r) % c.colors.length];
    }
    c.selectColor = d;
    function c(s) {
      let r, m = null, v, E;
      function p(...S) {
        if (!p.enabled)
          return;
        const R = p, O = Number(/* @__PURE__ */ new Date()), P = O - (r || O);
        R.diff = P, R.prev = r, R.curr = O, r = O, S[0] = c.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
        let M = 0;
        S[0] = S[0].replace(/%([a-zA-Z%])/g, (A, T) => {
          if (A === "%%")
            return "%";
          M++;
          const y = c.formatters[T];
          if (typeof y == "function") {
            const q = S[M];
            A = y.call(R, q), S.splice(M, 1), M--;
          }
          return A;
        }), c.formatArgs.call(R, S), (R.log || c.log).apply(R, S);
      }
      return p.namespace = s, p.useColors = c.useColors(), p.color = c.selectColor(s), p.extend = f, p.destroy = c.destroy, Object.defineProperty(p, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (v !== c.namespaces && (v = c.namespaces, E = c.enabled(s)), E),
        set: (S) => {
          m = S;
        }
      }), typeof c.init == "function" && c.init(p), p;
    }
    function f(s, r) {
      const m = c(this.namespace + (typeof r > "u" ? ":" : r) + s);
      return m.log = this.log, m;
    }
    function l(s) {
      c.save(s), c.namespaces = s, c.names = [], c.skips = [];
      const r = (typeof s == "string" ? s : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const m of r)
        m[0] === "-" ? c.skips.push(m.slice(1)) : c.names.push(m);
    }
    function i(s, r) {
      let m = 0, v = 0, E = -1, p = 0;
      for (; m < s.length; )
        if (v < r.length && (r[v] === s[m] || r[v] === "*"))
          r[v] === "*" ? (E = v, p = m, v++) : (m++, v++);
        else if (E !== -1)
          v = E + 1, p++, m = p;
        else
          return !1;
      for (; v < r.length && r[v] === "*"; )
        v++;
      return v === r.length;
    }
    function h() {
      const s = [
        ...c.names,
        ...c.skips.map((r) => "-" + r)
      ].join(",");
      return c.enable(""), s;
    }
    function n(s) {
      for (const r of c.skips)
        if (i(s, r))
          return !1;
      for (const r of c.names)
        if (i(s, r))
          return !0;
      return !1;
    }
    function o(s) {
      return s instanceof Error ? s.stack || s.message : s;
    }
    function a() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return c.enable(c.load()), c;
  }
  return Dn = t, Dn;
}
var lo;
function xc() {
  return lo || (lo = 1, function(t, u) {
    u.formatArgs = c, u.save = f, u.load = l, u.useColors = d, u.storage = i(), u.destroy = /* @__PURE__ */ (() => {
      let n = !1;
      return () => {
        n || (n = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), u.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function d() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let n;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (n = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(n[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function c(n) {
      if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
        return;
      const o = "color: " + this.color;
      n.splice(1, 0, o, "color: inherit");
      let a = 0, s = 0;
      n[0].replace(/%[a-zA-Z%]/g, (r) => {
        r !== "%%" && (a++, r === "%c" && (s = a));
      }), n.splice(s, 0, o);
    }
    u.log = console.debug || console.log || (() => {
    });
    function f(n) {
      try {
        n ? u.storage.setItem("debug", n) : u.storage.removeItem("debug");
      } catch {
      }
    }
    function l() {
      let n;
      try {
        n = u.storage.getItem("debug") || u.storage.getItem("DEBUG");
      } catch {
      }
      return !n && typeof process < "u" && "env" in process && (n = process.env.DEBUG), n;
    }
    function i() {
      try {
        return localStorage;
      } catch {
      }
    }
    t.exports = Fl()(u);
    const { formatters: h } = t.exports;
    h.j = function(n) {
      try {
        return JSON.stringify(n);
      } catch (o) {
        return "[UnexpectedJSONParseError]: " + o.message;
      }
    };
  }(Dr, Dr.exports)), Dr.exports;
}
var Nr = { exports: {} }, Nn, uo;
function Lc() {
  return uo || (uo = 1, Nn = (t, u = process.argv) => {
    const d = t.startsWith("-") ? "" : t.length === 1 ? "-" : "--", c = u.indexOf(d + t), f = u.indexOf("--");
    return c !== -1 && (f === -1 || c < f);
  }), Nn;
}
var Fn, co;
function Uc() {
  if (co) return Fn;
  co = 1;
  const t = Mr, u = Il, d = Lc(), { env: c } = process;
  let f;
  d("no-color") || d("no-colors") || d("color=false") || d("color=never") ? f = 0 : (d("color") || d("colors") || d("color=true") || d("color=always")) && (f = 1), "FORCE_COLOR" in c && (c.FORCE_COLOR === "true" ? f = 1 : c.FORCE_COLOR === "false" ? f = 0 : f = c.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(c.FORCE_COLOR, 10), 3));
  function l(n) {
    return n === 0 ? !1 : {
      level: n,
      hasBasic: !0,
      has256: n >= 2,
      has16m: n >= 3
    };
  }
  function i(n, o) {
    if (f === 0)
      return 0;
    if (d("color=16m") || d("color=full") || d("color=truecolor"))
      return 3;
    if (d("color=256"))
      return 2;
    if (n && !o && f === void 0)
      return 0;
    const a = f || 0;
    if (c.TERM === "dumb")
      return a;
    if (process.platform === "win32") {
      const s = t.release().split(".");
      return Number(s[0]) >= 10 && Number(s[2]) >= 10586 ? Number(s[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in c)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((s) => s in c) || c.CI_NAME === "codeship" ? 1 : a;
    if ("TEAMCITY_VERSION" in c)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(c.TEAMCITY_VERSION) ? 1 : 0;
    if (c.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in c) {
      const s = parseInt((c.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (c.TERM_PROGRAM) {
        case "iTerm.app":
          return s >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(c.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(c.TERM) || "COLORTERM" in c ? 1 : a;
  }
  function h(n) {
    const o = i(n, n && n.isTTY);
    return l(o);
  }
  return Fn = {
    supportsColor: h,
    stdout: l(i(!0, u.isatty(1))),
    stderr: l(i(!0, u.isatty(2)))
  }, Fn;
}
var fo;
function $c() {
  return fo || (fo = 1, function(t, u) {
    const d = Il, c = Ji;
    u.init = a, u.log = h, u.formatArgs = l, u.save = n, u.load = o, u.useColors = f, u.destroy = c.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), u.colors = [6, 2, 3, 4, 5, 1];
    try {
      const r = Uc();
      r && (r.stderr || r).level >= 2 && (u.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    u.inspectOpts = Object.keys(process.env).filter((r) => /^debug_/i.test(r)).reduce((r, m) => {
      const v = m.substring(6).toLowerCase().replace(/_([a-z])/g, (p, S) => S.toUpperCase());
      let E = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), r[v] = E, r;
    }, {});
    function f() {
      return "colors" in u.inspectOpts ? !!u.inspectOpts.colors : d.isatty(process.stderr.fd);
    }
    function l(r) {
      const { namespace: m, useColors: v } = this;
      if (v) {
        const E = this.color, p = "\x1B[3" + (E < 8 ? E : "8;5;" + E), S = `  ${p};1m${m} \x1B[0m`;
        r[0] = S + r[0].split(`
`).join(`
` + S), r.push(p + "m+" + t.exports.humanize(this.diff) + "\x1B[0m");
      } else
        r[0] = i() + m + " " + r[0];
    }
    function i() {
      return u.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function h(...r) {
      return process.stderr.write(c.formatWithOptions(u.inspectOpts, ...r) + `
`);
    }
    function n(r) {
      r ? process.env.DEBUG = r : delete process.env.DEBUG;
    }
    function o() {
      return process.env.DEBUG;
    }
    function a(r) {
      r.inspectOpts = {};
      const m = Object.keys(u.inspectOpts);
      for (let v = 0; v < m.length; v++)
        r.inspectOpts[m[v]] = u.inspectOpts[m[v]];
    }
    t.exports = Fl()(u);
    const { formatters: s } = t.exports;
    s.o = function(r) {
      return this.inspectOpts.colors = this.useColors, c.inspect(r, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, s.O = function(r) {
      return this.inspectOpts.colors = this.useColors, c.inspect(r, this.inspectOpts);
    };
  }(Nr, Nr.exports)), Nr.exports;
}
var ho;
function kc() {
  return ho || (ho = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ir.exports = xc() : Ir.exports = $c()), Ir.exports;
}
var Yt = {}, po;
function xl() {
  if (po) return Yt;
  po = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.ProgressCallbackTransform = void 0;
  const t = mr;
  let u = class extends t.Transform {
    constructor(c, f, l) {
      super(), this.total = c, this.cancellationToken = f, this.onProgress = l, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(c, f, l) {
      if (this.cancellationToken.cancelled) {
        l(new Error("cancelled"), null);
        return;
      }
      this.transferred += c.length, this.delta += c.length;
      const i = Date.now();
      i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
      }), this.delta = 0), l(null, c);
    }
    _flush(c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, c(null);
    }
  };
  return Yt.ProgressCallbackTransform = u, Yt;
}
var mo;
function qc() {
  if (mo) return He;
  mo = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.DigestTransform = He.HttpExecutor = He.HttpError = void 0, He.createHttpError = o, He.parseJson = r, He.configureRequestOptionsFromUrl = v, He.configureRequestUrl = E, He.safeGetHeader = R, He.configureRequestOptions = P, He.safeStringifyJson = M;
  const t = gr, u = kc(), d = ke, c = mr, f = qt, l = ta(), i = Hr(), h = xl(), n = (0, u.default)("electron-builder");
  function o(C, A = null) {
    return new s(C.statusCode || -1, `${C.statusCode} ${C.statusMessage}` + (A == null ? "" : `
` + JSON.stringify(A, null, "  ")) + `
Headers: ` + M(C.headers), A);
  }
  const a = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class s extends Error {
    constructor(A, T = `HTTP error: ${a.get(A) || A}`, y = null) {
      super(T), this.statusCode = A, this.description = y, this.name = "HttpError", this.code = `HTTP_ERROR_${A}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  He.HttpError = s;
  function r(C) {
    return C.then((A) => A == null || A.length === 0 ? null : JSON.parse(A));
  }
  class m {
    constructor() {
      this.maxRedirects = 10;
    }
    request(A, T = new l.CancellationToken(), y) {
      P(A);
      const q = y == null ? void 0 : JSON.stringify(y), U = q ? Buffer.from(q) : void 0;
      if (U != null) {
        n(q);
        const { headers: L, ...k } = A;
        A = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": U.length,
            ...L
          },
          ...k
        };
      }
      return this.doApiRequest(A, T, (L) => L.end(U));
    }
    doApiRequest(A, T, y, q = 0) {
      return n.enabled && n(`Request: ${M(A)}`), T.createPromise((U, L, k) => {
        const N = this.createRequest(A, (I) => {
          try {
            this.handleResponse(I, A, T, U, L, q, y);
          } catch (F) {
            L(F);
          }
        });
        this.addErrorAndTimeoutHandlers(N, L, A.timeout), this.addRedirectHandlers(N, A, L, q, (I) => {
          this.doApiRequest(I, T, y, q).then(U).catch(L);
        }), y(N, L), k(() => N.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(A, T, y, q, U) {
    }
    addErrorAndTimeoutHandlers(A, T, y = 60 * 1e3) {
      this.addTimeOutHandler(A, T, y), A.on("error", T), A.on("aborted", () => {
        T(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(A, T, y, q, U, L, k) {
      var N;
      if (n.enabled && n(`Response: ${A.statusCode} ${A.statusMessage}, request options: ${M(T)}`), A.statusCode === 404) {
        U(o(A, `method: ${T.method || "GET"} url: ${T.protocol || "https:"}//${T.hostname}${T.port ? `:${T.port}` : ""}${T.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (A.statusCode === 204) {
        q();
        return;
      }
      const I = (N = A.statusCode) !== null && N !== void 0 ? N : 0, F = I >= 300 && I < 400, $ = R(A, "location");
      if (F && $ != null) {
        if (L > this.maxRedirects) {
          U(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(m.prepareRedirectUrlOptions($, T), y, k, L).then(q).catch(U);
        return;
      }
      A.setEncoding("utf8");
      let J = "";
      A.on("error", U), A.on("data", (W) => J += W), A.on("end", () => {
        try {
          if (A.statusCode != null && A.statusCode >= 400) {
            const W = R(A, "content-type"), ne = W != null && (Array.isArray(W) ? W.find((ce) => ce.includes("json")) != null : W.includes("json"));
            U(o(A, `method: ${T.method || "GET"} url: ${T.protocol || "https:"}//${T.hostname}${T.port ? `:${T.port}` : ""}${T.path}

          Data:
          ${ne ? JSON.stringify(JSON.parse(J)) : J}
          `));
          } else
            q(J.length === 0 ? null : J);
        } catch (W) {
          U(W);
        }
      });
    }
    async downloadToBuffer(A, T) {
      return await T.cancellationToken.createPromise((y, q, U) => {
        const L = [], k = {
          headers: T.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        E(A, k), P(k), this.doDownload(k, {
          destination: null,
          options: T,
          onCancel: U,
          callback: (N) => {
            N == null ? y(Buffer.concat(L)) : q(N);
          },
          responseHandler: (N, I) => {
            let F = 0;
            N.on("data", ($) => {
              if (F += $.length, F > 524288e3) {
                I(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              L.push($);
            }), N.on("end", () => {
              I(null);
            });
          }
        }, 0);
      });
    }
    doDownload(A, T, y) {
      const q = this.createRequest(A, (U) => {
        if (U.statusCode >= 400) {
          T.callback(new Error(`Cannot download "${A.protocol || "https:"}//${A.hostname}${A.path}", status ${U.statusCode}: ${U.statusMessage}`));
          return;
        }
        U.on("error", T.callback);
        const L = R(U, "location");
        if (L != null) {
          y < this.maxRedirects ? this.doDownload(m.prepareRedirectUrlOptions(L, A), T, y++) : T.callback(this.createMaxRedirectError());
          return;
        }
        T.responseHandler == null ? O(T, U) : T.responseHandler(U, T.callback);
      });
      this.addErrorAndTimeoutHandlers(q, T.callback, A.timeout), this.addRedirectHandlers(q, A, T.callback, y, (U) => {
        this.doDownload(U, T, y++);
      }), q.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(A, T, y) {
      A.on("socket", (q) => {
        q.setTimeout(y, () => {
          A.abort(), T(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(A, T) {
      const y = v(A, { ...T }), q = y.headers;
      if (q != null && q.authorization) {
        const U = new f.URL(A);
        (U.hostname.endsWith(".amazonaws.com") || U.searchParams.has("X-Amz-Credential")) && delete q.authorization;
      }
      return y;
    }
    static retryOnServerError(A, T = 3) {
      for (let y = 0; ; y++)
        try {
          return A();
        } catch (q) {
          if (y < T && (q instanceof s && q.isServerError() || q.code === "EPIPE"))
            continue;
          throw q;
        }
    }
  }
  He.HttpExecutor = m;
  function v(C, A) {
    const T = P(A);
    return E(new f.URL(C), T), T;
  }
  function E(C, A) {
    A.protocol = C.protocol, A.hostname = C.hostname, C.port ? A.port = C.port : A.port && delete A.port, A.path = C.pathname + C.search;
  }
  class p extends c.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(A, T = "sha512", y = "base64") {
      super(), this.expected = A, this.algorithm = T, this.encoding = y, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, t.createHash)(T);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(A, T, y) {
      this.digester.update(A), y(null, A);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(A) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (T) {
          A(T);
          return;
        }
      A(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, i.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, i.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  He.DigestTransform = p;
  function S(C, A, T) {
    return C != null && A != null && C !== A ? (T(new Error(`checksum mismatch: expected ${A} but got ${C} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function R(C, A) {
    const T = C.headers[A];
    return T == null ? null : Array.isArray(T) ? T.length === 0 ? null : T[T.length - 1] : T;
  }
  function O(C, A) {
    if (!S(R(A, "X-Checksum-Sha2"), C.options.sha2, C.callback))
      return;
    const T = [];
    if (C.options.onProgress != null) {
      const L = R(A, "content-length");
      L != null && T.push(new h.ProgressCallbackTransform(parseInt(L, 10), C.options.cancellationToken, C.options.onProgress));
    }
    const y = C.options.sha512;
    y != null ? T.push(new p(y, "sha512", y.length === 128 && !y.includes("+") && !y.includes("Z") && !y.includes("=") ? "hex" : "base64")) : C.options.sha2 != null && T.push(new p(C.options.sha2, "sha256", "hex"));
    const q = (0, d.createWriteStream)(C.destination);
    T.push(q);
    let U = A;
    for (const L of T)
      L.on("error", (k) => {
        q.close(), C.options.cancellationToken.cancelled || C.callback(k);
      }), U = U.pipe(L);
    q.on("finish", () => {
      q.close(C.callback);
    });
  }
  function P(C, A, T) {
    T != null && (C.method = T), C.headers = { ...C.headers };
    const y = C.headers;
    return A != null && (y.authorization = A.startsWith("Basic") || A.startsWith("Bearer") ? A : `token ${A}`), y["User-Agent"] == null && (y["User-Agent"] = "electron-builder"), (T == null || T === "GET" || y["Cache-Control"] == null) && (y["Cache-Control"] = "no-cache"), C.protocol == null && process.versions.electron != null && (C.protocol = "https:"), C;
  }
  function M(C, A) {
    return JSON.stringify(C, (T, y) => T.endsWith("Authorization") || T.endsWith("authorization") || T.endsWith("Password") || T.endsWith("PASSWORD") || T.endsWith("Token") || T.includes("password") || T.includes("token") || A != null && A.has(T) ? "<stripped sensitive data>" : y, 2);
  }
  return He;
}
var zt = {}, go;
function Mc() {
  if (go) return zt;
  go = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.MemoLazy = void 0;
  let t = class {
    constructor(c, f) {
      this.selector = c, this.creator = f, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const c = this.selector();
      if (this._value !== void 0 && u(this.selected, c))
        return this._value;
      this.selected = c;
      const f = this.creator(c);
      return this.value = f, f;
    }
    set value(c) {
      this._value = c;
    }
  };
  zt.MemoLazy = t;
  function u(d, c) {
    if (typeof d == "object" && d !== null && (typeof c == "object" && c !== null)) {
      const i = Object.keys(d), h = Object.keys(c);
      return i.length === h.length && i.every((n) => u(d[n], c[n]));
    }
    return d === c;
  }
  return zt;
}
var Xt = {}, vo;
function Bc() {
  if (vo) return Xt;
  vo = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.githubUrl = t, Xt.getS3LikeProviderBaseUrl = u;
  function t(l, i = "github.com") {
    return `${l.protocol || "https"}://${l.host || i}`;
  }
  function u(l) {
    const i = l.provider;
    if (i === "s3")
      return d(l);
    if (i === "spaces")
      return f(l);
    throw new Error(`Not supported provider: ${i}`);
  }
  function d(l) {
    let i;
    if (l.accelerate == !0)
      i = `https://${l.bucket}.s3-accelerate.amazonaws.com`;
    else if (l.endpoint != null)
      i = `${l.endpoint}/${l.bucket}`;
    else if (l.bucket.includes(".")) {
      if (l.region == null)
        throw new Error(`Bucket name "${l.bucket}" includes a dot, but S3 region is missing`);
      l.region === "us-east-1" ? i = `https://s3.amazonaws.com/${l.bucket}` : i = `https://s3-${l.region}.amazonaws.com/${l.bucket}`;
    } else l.region === "cn-north-1" ? i = `https://${l.bucket}.s3.${l.region}.amazonaws.com.cn` : i = `https://${l.bucket}.s3.amazonaws.com`;
    return c(i, l.path);
  }
  function c(l, i) {
    return i != null && i.length > 0 && (i.startsWith("/") || (l += "/"), l += i), l;
  }
  function f(l) {
    if (l.name == null)
      throw new Error("name is missing");
    if (l.region == null)
      throw new Error("region is missing");
    return c(`https://${l.name}.${l.region}.digitaloceanspaces.com`, l.path);
  }
  return Xt;
}
var Fr = {}, Eo;
function Hc() {
  if (Eo) return Fr;
  Eo = 1, Object.defineProperty(Fr, "__esModule", { value: !0 }), Fr.retry = u;
  const t = ta();
  async function u(d, c, f, l = 0, i = 0, h) {
    var n;
    const o = new t.CancellationToken();
    try {
      return await d();
    } catch (a) {
      if ((!((n = h == null ? void 0 : h(a)) !== null && n !== void 0) || n) && c > 0 && !o.cancelled)
        return await new Promise((s) => setTimeout(s, f + l * i)), await u(d, c - 1, f, l, i + 1, h);
      throw a;
    }
  }
  return Fr;
}
var xr = {}, yo;
function jc() {
  if (yo) return xr;
  yo = 1, Object.defineProperty(xr, "__esModule", { value: !0 }), xr.parseDn = t;
  function t(u) {
    let d = !1, c = null, f = "", l = 0;
    u = u.trim();
    const i = /* @__PURE__ */ new Map();
    for (let h = 0; h <= u.length; h++) {
      if (h === u.length) {
        c !== null && i.set(c, f);
        break;
      }
      const n = u[h];
      if (d) {
        if (n === '"') {
          d = !1;
          continue;
        }
      } else {
        if (n === '"') {
          d = !0;
          continue;
        }
        if (n === "\\") {
          h++;
          const o = parseInt(u.slice(h, h + 2), 16);
          Number.isNaN(o) ? f += u[h] : (h++, f += String.fromCharCode(o));
          continue;
        }
        if (c === null && n === "=") {
          c = f, f = "";
          continue;
        }
        if (n === "," || n === ";" || n === "+") {
          c !== null && i.set(c, f), c = null, f = "";
          continue;
        }
      }
      if (n === " " && !d) {
        if (f.length === 0)
          continue;
        if (h > l) {
          let o = h;
          for (; u[o] === " "; )
            o++;
          l = o;
        }
        if (l >= u.length || u[l] === "," || u[l] === ";" || c === null && u[l] === "=" || c !== null && u[l] === "+") {
          h = l - 1;
          continue;
        }
      }
      f += n;
    }
    return i;
  }
  return xr;
}
var Ct = {}, wo;
function Gc() {
  if (wo) return Ct;
  wo = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.nil = Ct.UUID = void 0;
  const t = gr, u = Hr(), d = "options.name must be either a string or a Buffer", c = (0, t.randomBytes)(16);
  c[0] = c[0] | 1;
  const f = {}, l = [];
  for (let s = 0; s < 256; s++) {
    const r = (s + 256).toString(16).substr(1);
    f[r] = s, l[s] = r;
  }
  class i {
    constructor(r) {
      this.ascii = null, this.binary = null;
      const m = i.check(r);
      if (!m)
        throw new Error("not a UUID");
      this.version = m.version, m.format === "ascii" ? this.ascii = r : this.binary = r;
    }
    static v5(r, m) {
      return o(r, "sha1", 80, m);
    }
    toString() {
      return this.ascii == null && (this.ascii = a(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(r, m = 0) {
      if (typeof r == "string")
        return r = r.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(r) ? r === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (f[r[14] + r[15]] & 240) >> 4,
          variant: h((f[r[19] + r[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(r)) {
        if (r.length < m + 16)
          return !1;
        let v = 0;
        for (; v < 16 && r[m + v] === 0; v++)
          ;
        return v === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (r[m + 6] & 240) >> 4,
          variant: h((r[m + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, u.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(r) {
      const m = Buffer.allocUnsafe(16);
      let v = 0;
      for (let E = 0; E < 16; E++)
        m[E] = f[r[v++] + r[v++]], (E === 3 || E === 5 || E === 7 || E === 9) && (v += 1);
      return m;
    }
  }
  Ct.UUID = i, i.OID = i.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function h(s) {
    switch (s) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var n;
  (function(s) {
    s[s.ASCII = 0] = "ASCII", s[s.BINARY = 1] = "BINARY", s[s.OBJECT = 2] = "OBJECT";
  })(n || (n = {}));
  function o(s, r, m, v, E = n.ASCII) {
    const p = (0, t.createHash)(r);
    if (typeof s != "string" && !Buffer.isBuffer(s))
      throw (0, u.newError)(d, "ERR_INVALID_UUID_NAME");
    p.update(v), p.update(s);
    const R = p.digest();
    let O;
    switch (E) {
      case n.BINARY:
        R[6] = R[6] & 15 | m, R[8] = R[8] & 63 | 128, O = R;
        break;
      case n.OBJECT:
        R[6] = R[6] & 15 | m, R[8] = R[8] & 63 | 128, O = new i(R);
        break;
      default:
        O = l[R[0]] + l[R[1]] + l[R[2]] + l[R[3]] + "-" + l[R[4]] + l[R[5]] + "-" + l[R[6] & 15 | m] + l[R[7]] + "-" + l[R[8] & 63 | 128] + l[R[9]] + "-" + l[R[10]] + l[R[11]] + l[R[12]] + l[R[13]] + l[R[14]] + l[R[15]];
        break;
    }
    return O;
  }
  function a(s) {
    return l[s[0]] + l[s[1]] + l[s[2]] + l[s[3]] + "-" + l[s[4]] + l[s[5]] + "-" + l[s[6]] + l[s[7]] + "-" + l[s[8]] + l[s[9]] + "-" + l[s[10]] + l[s[11]] + l[s[12]] + l[s[13]] + l[s[14]] + l[s[15]];
  }
  return Ct.nil = new i("00000000-0000-0000-0000-000000000000"), Ct;
}
var xt = {}, xn = {}, _o;
function Wc() {
  return _o || (_o = 1, function(t) {
    (function(u) {
      u.parser = function(_, g) {
        return new c(_, g);
      }, u.SAXParser = c, u.SAXStream = a, u.createStream = o, u.MAX_BUFFER_LENGTH = 64 * 1024;
      var d = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      u.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function c(_, g) {
        if (!(this instanceof c))
          return new c(_, g);
        var H = this;
        l(H), H.q = H.c = "", H.bufferCheckPosition = u.MAX_BUFFER_LENGTH, H.opt = g || {}, H.opt.lowercase = H.opt.lowercase || H.opt.lowercasetags, H.looseCase = H.opt.lowercase ? "toLowerCase" : "toUpperCase", H.tags = [], H.closed = H.closedRoot = H.sawRoot = !1, H.tag = H.error = null, H.strict = !!_, H.noscript = !!(_ || H.opt.noscript), H.state = y.BEGIN, H.strictEntities = H.opt.strictEntities, H.ENTITIES = H.strictEntities ? Object.create(u.XML_ENTITIES) : Object.create(u.ENTITIES), H.attribList = [], H.opt.xmlns && (H.ns = Object.create(E)), H.opt.unquotedAttributeValues === void 0 && (H.opt.unquotedAttributeValues = !_), H.trackPosition = H.opt.position !== !1, H.trackPosition && (H.position = H.line = H.column = 0), U(H, "onready");
      }
      Object.create || (Object.create = function(_) {
        function g() {
        }
        g.prototype = _;
        var H = new g();
        return H;
      }), Object.keys || (Object.keys = function(_) {
        var g = [];
        for (var H in _) _.hasOwnProperty(H) && g.push(H);
        return g;
      });
      function f(_) {
        for (var g = Math.max(u.MAX_BUFFER_LENGTH, 10), H = 0, D = 0, le = d.length; D < le; D++) {
          var me = _[d[D]].length;
          if (me > g)
            switch (d[D]) {
              case "textNode":
                k(_);
                break;
              case "cdata":
                L(_, "oncdata", _.cdata), _.cdata = "";
                break;
              case "script":
                L(_, "onscript", _.script), _.script = "";
                break;
              default:
                I(_, "Max buffer length exceeded: " + d[D]);
            }
          H = Math.max(H, me);
        }
        var pe = u.MAX_BUFFER_LENGTH - H;
        _.bufferCheckPosition = pe + _.position;
      }
      function l(_) {
        for (var g = 0, H = d.length; g < H; g++)
          _[d[g]] = "";
      }
      function i(_) {
        k(_), _.cdata !== "" && (L(_, "oncdata", _.cdata), _.cdata = ""), _.script !== "" && (L(_, "onscript", _.script), _.script = "");
      }
      c.prototype = {
        end: function() {
          F(this);
        },
        write: Ee,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          i(this);
        }
      };
      var h;
      try {
        h = require("stream").Stream;
      } catch {
        h = function() {
        };
      }
      h || (h = function() {
      });
      var n = u.EVENTS.filter(function(_) {
        return _ !== "error" && _ !== "end";
      });
      function o(_, g) {
        return new a(_, g);
      }
      function a(_, g) {
        if (!(this instanceof a))
          return new a(_, g);
        h.apply(this), this._parser = new c(_, g), this.writable = !0, this.readable = !0;
        var H = this;
        this._parser.onend = function() {
          H.emit("end");
        }, this._parser.onerror = function(D) {
          H.emit("error", D), H._parser.error = null;
        }, this._decoder = null, n.forEach(function(D) {
          Object.defineProperty(H, "on" + D, {
            get: function() {
              return H._parser["on" + D];
            },
            set: function(le) {
              if (!le)
                return H.removeAllListeners(D), H._parser["on" + D] = le, le;
              H.on(D, le);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      a.prototype = Object.create(h.prototype, {
        constructor: {
          value: a
        }
      }), a.prototype.write = function(_) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(_)) {
          if (!this._decoder) {
            var g = lc.StringDecoder;
            this._decoder = new g("utf8");
          }
          _ = this._decoder.write(_);
        }
        return this._parser.write(_.toString()), this.emit("data", _), !0;
      }, a.prototype.end = function(_) {
        return _ && _.length && this.write(_), this._parser.end(), !0;
      }, a.prototype.on = function(_, g) {
        var H = this;
        return !H._parser["on" + _] && n.indexOf(_) !== -1 && (H._parser["on" + _] = function() {
          var D = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          D.splice(0, 0, _), H.emit.apply(H, D);
        }), h.prototype.on.call(H, _, g);
      };
      var s = "[CDATA[", r = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", E = { xml: m, xmlns: v }, p = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, R = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function P(_) {
        return _ === " " || _ === `
` || _ === "\r" || _ === "	";
      }
      function M(_) {
        return _ === '"' || _ === "'";
      }
      function C(_) {
        return _ === ">" || P(_);
      }
      function A(_, g) {
        return _.test(g);
      }
      function T(_, g) {
        return !A(_, g);
      }
      var y = 0;
      u.STATE = {
        BEGIN: y++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: y++,
        // leading whitespace
        TEXT: y++,
        // general stuff
        TEXT_ENTITY: y++,
        // &amp and such.
        OPEN_WAKA: y++,
        // <
        SGML_DECL: y++,
        // <!BLARG
        SGML_DECL_QUOTED: y++,
        // <!BLARG foo "bar
        DOCTYPE: y++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: y++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: y++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: y++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: y++,
        // <!-
        COMMENT: y++,
        // <!--
        COMMENT_ENDING: y++,
        // <!-- blah -
        COMMENT_ENDED: y++,
        // <!-- blah --
        CDATA: y++,
        // <![CDATA[ something
        CDATA_ENDING: y++,
        // ]
        CDATA_ENDING_2: y++,
        // ]]
        PROC_INST: y++,
        // <?hi
        PROC_INST_BODY: y++,
        // <?hi there
        PROC_INST_ENDING: y++,
        // <?hi "there" ?
        OPEN_TAG: y++,
        // <strong
        OPEN_TAG_SLASH: y++,
        // <strong /
        ATTRIB: y++,
        // <a
        ATTRIB_NAME: y++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: y++,
        // <a foo _
        ATTRIB_VALUE: y++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: y++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: y++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: y++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: y++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: y++,
        // <foo bar=&quot
        CLOSE_TAG: y++,
        // </a
        CLOSE_TAG_SAW_WHITE: y++,
        // </a   >
        SCRIPT: y++,
        // <script> ...
        SCRIPT_ENDING: y++
        // <script> ... <
      }, u.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, u.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(u.ENTITIES).forEach(function(_) {
        var g = u.ENTITIES[_], H = typeof g == "number" ? String.fromCharCode(g) : g;
        u.ENTITIES[_] = H;
      });
      for (var q in u.STATE)
        u.STATE[u.STATE[q]] = q;
      y = u.STATE;
      function U(_, g, H) {
        _[g] && _[g](H);
      }
      function L(_, g, H) {
        _.textNode && k(_), U(_, g, H);
      }
      function k(_) {
        _.textNode = N(_.opt, _.textNode), _.textNode && U(_, "ontext", _.textNode), _.textNode = "";
      }
      function N(_, g) {
        return _.trim && (g = g.trim()), _.normalize && (g = g.replace(/\s+/g, " ")), g;
      }
      function I(_, g) {
        return k(_), _.trackPosition && (g += `
Line: ` + _.line + `
Column: ` + _.column + `
Char: ` + _.c), g = new Error(g), _.error = g, U(_, "onerror", g), _;
      }
      function F(_) {
        return _.sawRoot && !_.closedRoot && $(_, "Unclosed root tag"), _.state !== y.BEGIN && _.state !== y.BEGIN_WHITESPACE && _.state !== y.TEXT && I(_, "Unexpected end"), k(_), _.c = "", _.closed = !0, U(_, "onend"), c.call(_, _.strict, _.opt), _;
      }
      function $(_, g) {
        if (typeof _ != "object" || !(_ instanceof c))
          throw new Error("bad call to strictFail");
        _.strict && I(_, g);
      }
      function J(_) {
        _.strict || (_.tagName = _.tagName[_.looseCase]());
        var g = _.tags[_.tags.length - 1] || _, H = _.tag = { name: _.tagName, attributes: {} };
        _.opt.xmlns && (H.ns = g.ns), _.attribList.length = 0, L(_, "onopentagstart", H);
      }
      function W(_, g) {
        var H = _.indexOf(":"), D = H < 0 ? ["", _] : _.split(":"), le = D[0], me = D[1];
        return g && _ === "xmlns" && (le = "xmlns", me = ""), { prefix: le, local: me };
      }
      function ne(_) {
        if (_.strict || (_.attribName = _.attribName[_.looseCase]()), _.attribList.indexOf(_.attribName) !== -1 || _.tag.attributes.hasOwnProperty(_.attribName)) {
          _.attribName = _.attribValue = "";
          return;
        }
        if (_.opt.xmlns) {
          var g = W(_.attribName, !0), H = g.prefix, D = g.local;
          if (H === "xmlns")
            if (D === "xml" && _.attribValue !== m)
              $(
                _,
                "xml: prefix must be bound to " + m + `
Actual: ` + _.attribValue
              );
            else if (D === "xmlns" && _.attribValue !== v)
              $(
                _,
                "xmlns: prefix must be bound to " + v + `
Actual: ` + _.attribValue
              );
            else {
              var le = _.tag, me = _.tags[_.tags.length - 1] || _;
              le.ns === me.ns && (le.ns = Object.create(me.ns)), le.ns[D] = _.attribValue;
            }
          _.attribList.push([_.attribName, _.attribValue]);
        } else
          _.tag.attributes[_.attribName] = _.attribValue, L(_, "onattribute", {
            name: _.attribName,
            value: _.attribValue
          });
        _.attribName = _.attribValue = "";
      }
      function ce(_, g) {
        if (_.opt.xmlns) {
          var H = _.tag, D = W(_.tagName);
          H.prefix = D.prefix, H.local = D.local, H.uri = H.ns[D.prefix] || "", H.prefix && !H.uri && ($(_, "Unbound namespace prefix: " + JSON.stringify(_.tagName)), H.uri = D.prefix);
          var le = _.tags[_.tags.length - 1] || _;
          H.ns && le.ns !== H.ns && Object.keys(H.ns).forEach(function(B) {
            L(_, "onopennamespace", {
              prefix: B,
              uri: H.ns[B]
            });
          });
          for (var me = 0, pe = _.attribList.length; me < pe; me++) {
            var _e = _.attribList[me], ye = _e[0], xe = _e[1], Ce = W(ye, !0), Me = Ce.prefix, vt = Ce.local, ot = Me === "" ? "" : H.ns[Me] || "", e = {
              name: ye,
              value: xe,
              prefix: Me,
              local: vt,
              uri: ot
            };
            Me && Me !== "xmlns" && !ot && ($(_, "Unbound namespace prefix: " + JSON.stringify(Me)), e.uri = Me), _.tag.attributes[ye] = e, L(_, "onattribute", e);
          }
          _.attribList.length = 0;
        }
        _.tag.isSelfClosing = !!g, _.sawRoot = !0, _.tags.push(_.tag), L(_, "onopentag", _.tag), g || (!_.noscript && _.tagName.toLowerCase() === "script" ? _.state = y.SCRIPT : _.state = y.TEXT, _.tag = null, _.tagName = ""), _.attribName = _.attribValue = "", _.attribList.length = 0;
      }
      function ue(_) {
        if (!_.tagName) {
          $(_, "Weird empty close tag."), _.textNode += "</>", _.state = y.TEXT;
          return;
        }
        if (_.script) {
          if (_.tagName !== "script") {
            _.script += "</" + _.tagName + ">", _.tagName = "", _.state = y.SCRIPT;
            return;
          }
          L(_, "onscript", _.script), _.script = "";
        }
        var g = _.tags.length, H = _.tagName;
        _.strict || (H = H[_.looseCase]());
        for (var D = H; g--; ) {
          var le = _.tags[g];
          if (le.name !== D)
            $(_, "Unexpected close tag");
          else
            break;
        }
        if (g < 0) {
          $(_, "Unmatched closing tag: " + _.tagName), _.textNode += "</" + _.tagName + ">", _.state = y.TEXT;
          return;
        }
        _.tagName = H;
        for (var me = _.tags.length; me-- > g; ) {
          var pe = _.tag = _.tags.pop();
          _.tagName = _.tag.name, L(_, "onclosetag", _.tagName);
          var _e = {};
          for (var ye in pe.ns)
            _e[ye] = pe.ns[ye];
          var xe = _.tags[_.tags.length - 1] || _;
          _.opt.xmlns && pe.ns !== xe.ns && Object.keys(pe.ns).forEach(function(Ce) {
            var Me = pe.ns[Ce];
            L(_, "onclosenamespace", { prefix: Ce, uri: Me });
          });
        }
        g === 0 && (_.closedRoot = !0), _.tagName = _.attribValue = _.attribName = "", _.attribList.length = 0, _.state = y.TEXT;
      }
      function ie(_) {
        var g = _.entity, H = g.toLowerCase(), D, le = "";
        return _.ENTITIES[g] ? _.ENTITIES[g] : _.ENTITIES[H] ? _.ENTITIES[H] : (g = H, g.charAt(0) === "#" && (g.charAt(1) === "x" ? (g = g.slice(2), D = parseInt(g, 16), le = D.toString(16)) : (g = g.slice(1), D = parseInt(g, 10), le = D.toString(10))), g = g.replace(/^0+/, ""), isNaN(D) || le.toLowerCase() !== g ? ($(_, "Invalid character entity"), "&" + _.entity + ";") : String.fromCodePoint(D));
      }
      function Ae(_, g) {
        g === "<" ? (_.state = y.OPEN_WAKA, _.startTagPosition = _.position) : P(g) || ($(_, "Non-whitespace before first tag."), _.textNode = g, _.state = y.TEXT);
      }
      function K(_, g) {
        var H = "";
        return g < _.length && (H = _.charAt(g)), H;
      }
      function Ee(_) {
        var g = this;
        if (this.error)
          throw this.error;
        if (g.closed)
          return I(
            g,
            "Cannot write after close. Assign an onready handler."
          );
        if (_ === null)
          return F(g);
        typeof _ == "object" && (_ = _.toString());
        for (var H = 0, D = ""; D = K(_, H++), g.c = D, !!D; )
          switch (g.trackPosition && (g.position++, D === `
` ? (g.line++, g.column = 0) : g.column++), g.state) {
            case y.BEGIN:
              if (g.state = y.BEGIN_WHITESPACE, D === "\uFEFF")
                continue;
              Ae(g, D);
              continue;
            case y.BEGIN_WHITESPACE:
              Ae(g, D);
              continue;
            case y.TEXT:
              if (g.sawRoot && !g.closedRoot) {
                for (var le = H - 1; D && D !== "<" && D !== "&"; )
                  D = K(_, H++), D && g.trackPosition && (g.position++, D === `
` ? (g.line++, g.column = 0) : g.column++);
                g.textNode += _.substring(le, H - 1);
              }
              D === "<" && !(g.sawRoot && g.closedRoot && !g.strict) ? (g.state = y.OPEN_WAKA, g.startTagPosition = g.position) : (!P(D) && (!g.sawRoot || g.closedRoot) && $(g, "Text data outside of root node."), D === "&" ? g.state = y.TEXT_ENTITY : g.textNode += D);
              continue;
            case y.SCRIPT:
              D === "<" ? g.state = y.SCRIPT_ENDING : g.script += D;
              continue;
            case y.SCRIPT_ENDING:
              D === "/" ? g.state = y.CLOSE_TAG : (g.script += "<" + D, g.state = y.SCRIPT);
              continue;
            case y.OPEN_WAKA:
              if (D === "!")
                g.state = y.SGML_DECL, g.sgmlDecl = "";
              else if (!P(D)) if (A(p, D))
                g.state = y.OPEN_TAG, g.tagName = D;
              else if (D === "/")
                g.state = y.CLOSE_TAG, g.tagName = "";
              else if (D === "?")
                g.state = y.PROC_INST, g.procInstName = g.procInstBody = "";
              else {
                if ($(g, "Unencoded <"), g.startTagPosition + 1 < g.position) {
                  var me = g.position - g.startTagPosition;
                  D = new Array(me).join(" ") + D;
                }
                g.textNode += "<" + D, g.state = y.TEXT;
              }
              continue;
            case y.SGML_DECL:
              if (g.sgmlDecl + D === "--") {
                g.state = y.COMMENT, g.comment = "", g.sgmlDecl = "";
                continue;
              }
              g.doctype && g.doctype !== !0 && g.sgmlDecl ? (g.state = y.DOCTYPE_DTD, g.doctype += "<!" + g.sgmlDecl + D, g.sgmlDecl = "") : (g.sgmlDecl + D).toUpperCase() === s ? (L(g, "onopencdata"), g.state = y.CDATA, g.sgmlDecl = "", g.cdata = "") : (g.sgmlDecl + D).toUpperCase() === r ? (g.state = y.DOCTYPE, (g.doctype || g.sawRoot) && $(
                g,
                "Inappropriately located doctype declaration"
              ), g.doctype = "", g.sgmlDecl = "") : D === ">" ? (L(g, "onsgmldeclaration", g.sgmlDecl), g.sgmlDecl = "", g.state = y.TEXT) : (M(D) && (g.state = y.SGML_DECL_QUOTED), g.sgmlDecl += D);
              continue;
            case y.SGML_DECL_QUOTED:
              D === g.q && (g.state = y.SGML_DECL, g.q = ""), g.sgmlDecl += D;
              continue;
            case y.DOCTYPE:
              D === ">" ? (g.state = y.TEXT, L(g, "ondoctype", g.doctype), g.doctype = !0) : (g.doctype += D, D === "[" ? g.state = y.DOCTYPE_DTD : M(D) && (g.state = y.DOCTYPE_QUOTED, g.q = D));
              continue;
            case y.DOCTYPE_QUOTED:
              g.doctype += D, D === g.q && (g.q = "", g.state = y.DOCTYPE);
              continue;
            case y.DOCTYPE_DTD:
              D === "]" ? (g.doctype += D, g.state = y.DOCTYPE) : D === "<" ? (g.state = y.OPEN_WAKA, g.startTagPosition = g.position) : M(D) ? (g.doctype += D, g.state = y.DOCTYPE_DTD_QUOTED, g.q = D) : g.doctype += D;
              continue;
            case y.DOCTYPE_DTD_QUOTED:
              g.doctype += D, D === g.q && (g.state = y.DOCTYPE_DTD, g.q = "");
              continue;
            case y.COMMENT:
              D === "-" ? g.state = y.COMMENT_ENDING : g.comment += D;
              continue;
            case y.COMMENT_ENDING:
              D === "-" ? (g.state = y.COMMENT_ENDED, g.comment = N(g.opt, g.comment), g.comment && L(g, "oncomment", g.comment), g.comment = "") : (g.comment += "-" + D, g.state = y.COMMENT);
              continue;
            case y.COMMENT_ENDED:
              D !== ">" ? ($(g, "Malformed comment"), g.comment += "--" + D, g.state = y.COMMENT) : g.doctype && g.doctype !== !0 ? g.state = y.DOCTYPE_DTD : g.state = y.TEXT;
              continue;
            case y.CDATA:
              D === "]" ? g.state = y.CDATA_ENDING : g.cdata += D;
              continue;
            case y.CDATA_ENDING:
              D === "]" ? g.state = y.CDATA_ENDING_2 : (g.cdata += "]" + D, g.state = y.CDATA);
              continue;
            case y.CDATA_ENDING_2:
              D === ">" ? (g.cdata && L(g, "oncdata", g.cdata), L(g, "onclosecdata"), g.cdata = "", g.state = y.TEXT) : D === "]" ? g.cdata += "]" : (g.cdata += "]]" + D, g.state = y.CDATA);
              continue;
            case y.PROC_INST:
              D === "?" ? g.state = y.PROC_INST_ENDING : P(D) ? g.state = y.PROC_INST_BODY : g.procInstName += D;
              continue;
            case y.PROC_INST_BODY:
              if (!g.procInstBody && P(D))
                continue;
              D === "?" ? g.state = y.PROC_INST_ENDING : g.procInstBody += D;
              continue;
            case y.PROC_INST_ENDING:
              D === ">" ? (L(g, "onprocessinginstruction", {
                name: g.procInstName,
                body: g.procInstBody
              }), g.procInstName = g.procInstBody = "", g.state = y.TEXT) : (g.procInstBody += "?" + D, g.state = y.PROC_INST_BODY);
              continue;
            case y.OPEN_TAG:
              A(S, D) ? g.tagName += D : (J(g), D === ">" ? ce(g) : D === "/" ? g.state = y.OPEN_TAG_SLASH : (P(D) || $(g, "Invalid character in tag name"), g.state = y.ATTRIB));
              continue;
            case y.OPEN_TAG_SLASH:
              D === ">" ? (ce(g, !0), ue(g)) : ($(g, "Forward-slash in opening tag not followed by >"), g.state = y.ATTRIB);
              continue;
            case y.ATTRIB:
              if (P(D))
                continue;
              D === ">" ? ce(g) : D === "/" ? g.state = y.OPEN_TAG_SLASH : A(p, D) ? (g.attribName = D, g.attribValue = "", g.state = y.ATTRIB_NAME) : $(g, "Invalid attribute name");
              continue;
            case y.ATTRIB_NAME:
              D === "=" ? g.state = y.ATTRIB_VALUE : D === ">" ? ($(g, "Attribute without value"), g.attribValue = g.attribName, ne(g), ce(g)) : P(D) ? g.state = y.ATTRIB_NAME_SAW_WHITE : A(S, D) ? g.attribName += D : $(g, "Invalid attribute name");
              continue;
            case y.ATTRIB_NAME_SAW_WHITE:
              if (D === "=")
                g.state = y.ATTRIB_VALUE;
              else {
                if (P(D))
                  continue;
                $(g, "Attribute without value"), g.tag.attributes[g.attribName] = "", g.attribValue = "", L(g, "onattribute", {
                  name: g.attribName,
                  value: ""
                }), g.attribName = "", D === ">" ? ce(g) : A(p, D) ? (g.attribName = D, g.state = y.ATTRIB_NAME) : ($(g, "Invalid attribute name"), g.state = y.ATTRIB);
              }
              continue;
            case y.ATTRIB_VALUE:
              if (P(D))
                continue;
              M(D) ? (g.q = D, g.state = y.ATTRIB_VALUE_QUOTED) : (g.opt.unquotedAttributeValues || I(g, "Unquoted attribute value"), g.state = y.ATTRIB_VALUE_UNQUOTED, g.attribValue = D);
              continue;
            case y.ATTRIB_VALUE_QUOTED:
              if (D !== g.q) {
                D === "&" ? g.state = y.ATTRIB_VALUE_ENTITY_Q : g.attribValue += D;
                continue;
              }
              ne(g), g.q = "", g.state = y.ATTRIB_VALUE_CLOSED;
              continue;
            case y.ATTRIB_VALUE_CLOSED:
              P(D) ? g.state = y.ATTRIB : D === ">" ? ce(g) : D === "/" ? g.state = y.OPEN_TAG_SLASH : A(p, D) ? ($(g, "No whitespace between attributes"), g.attribName = D, g.attribValue = "", g.state = y.ATTRIB_NAME) : $(g, "Invalid attribute name");
              continue;
            case y.ATTRIB_VALUE_UNQUOTED:
              if (!C(D)) {
                D === "&" ? g.state = y.ATTRIB_VALUE_ENTITY_U : g.attribValue += D;
                continue;
              }
              ne(g), D === ">" ? ce(g) : g.state = y.ATTRIB;
              continue;
            case y.CLOSE_TAG:
              if (g.tagName)
                D === ">" ? ue(g) : A(S, D) ? g.tagName += D : g.script ? (g.script += "</" + g.tagName, g.tagName = "", g.state = y.SCRIPT) : (P(D) || $(g, "Invalid tagname in closing tag"), g.state = y.CLOSE_TAG_SAW_WHITE);
              else {
                if (P(D))
                  continue;
                T(p, D) ? g.script ? (g.script += "</" + D, g.state = y.SCRIPT) : $(g, "Invalid tagname in closing tag.") : g.tagName = D;
              }
              continue;
            case y.CLOSE_TAG_SAW_WHITE:
              if (P(D))
                continue;
              D === ">" ? ue(g) : $(g, "Invalid characters in closing tag");
              continue;
            case y.TEXT_ENTITY:
            case y.ATTRIB_VALUE_ENTITY_Q:
            case y.ATTRIB_VALUE_ENTITY_U:
              var pe, _e;
              switch (g.state) {
                case y.TEXT_ENTITY:
                  pe = y.TEXT, _e = "textNode";
                  break;
                case y.ATTRIB_VALUE_ENTITY_Q:
                  pe = y.ATTRIB_VALUE_QUOTED, _e = "attribValue";
                  break;
                case y.ATTRIB_VALUE_ENTITY_U:
                  pe = y.ATTRIB_VALUE_UNQUOTED, _e = "attribValue";
                  break;
              }
              if (D === ";") {
                var ye = ie(g);
                g.opt.unparsedEntities && !Object.values(u.XML_ENTITIES).includes(ye) ? (g.entity = "", g.state = pe, g.write(ye)) : (g[_e] += ye, g.entity = "", g.state = pe);
              } else A(g.entity.length ? O : R, D) ? g.entity += D : ($(g, "Invalid character in entity name"), g[_e] += "&" + g.entity + D, g.entity = "", g.state = pe);
              continue;
            default:
              throw new Error(g, "Unknown state: " + g.state);
          }
        return g.position >= g.bufferCheckPosition && f(g), g;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var _ = String.fromCharCode, g = Math.floor, H = function() {
          var D = 16384, le = [], me, pe, _e = -1, ye = arguments.length;
          if (!ye)
            return "";
          for (var xe = ""; ++_e < ye; ) {
            var Ce = Number(arguments[_e]);
            if (!isFinite(Ce) || // `NaN`, `+Infinity`, or `-Infinity`
            Ce < 0 || // not a valid Unicode code point
            Ce > 1114111 || // not a valid Unicode code point
            g(Ce) !== Ce)
              throw RangeError("Invalid code point: " + Ce);
            Ce <= 65535 ? le.push(Ce) : (Ce -= 65536, me = (Ce >> 10) + 55296, pe = Ce % 1024 + 56320, le.push(me, pe)), (_e + 1 === ye || le.length > D) && (xe += _.apply(null, le), le.length = 0);
          }
          return xe;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: H,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = H;
      }();
    })(t);
  }(xn)), xn;
}
var So;
function Vc() {
  if (So) return xt;
  So = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.XElement = void 0, xt.parseXml = i;
  const t = Wc(), u = Hr();
  class d {
    constructor(n) {
      if (this.name = n, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !n)
        throw (0, u.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!f(n))
        throw (0, u.newError)(`Invalid element name: ${n}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(n) {
      const o = this.attributes === null ? null : this.attributes[n];
      if (o == null)
        throw (0, u.newError)(`No attribute "${n}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return o;
    }
    removeAttribute(n) {
      this.attributes !== null && delete this.attributes[n];
    }
    element(n, o = !1, a = null) {
      const s = this.elementOrNull(n, o);
      if (s === null)
        throw (0, u.newError)(a || `No element "${n}"`, "ERR_XML_MISSED_ELEMENT");
      return s;
    }
    elementOrNull(n, o = !1) {
      if (this.elements === null)
        return null;
      for (const a of this.elements)
        if (l(a, n, o))
          return a;
      return null;
    }
    getElements(n, o = !1) {
      return this.elements === null ? [] : this.elements.filter((a) => l(a, n, o));
    }
    elementValueOrEmpty(n, o = !1) {
      const a = this.elementOrNull(n, o);
      return a === null ? "" : a.value;
    }
  }
  xt.XElement = d;
  const c = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function f(h) {
    return c.test(h);
  }
  function l(h, n, o) {
    const a = h.name;
    return a === n || o === !0 && a.length === n.length && a.toLowerCase() === n.toLowerCase();
  }
  function i(h) {
    let n = null;
    const o = t.parser(!0, {}), a = [];
    return o.onopentag = (s) => {
      const r = new d(s.name);
      if (r.attributes = s.attributes, n === null)
        n = r;
      else {
        const m = a[a.length - 1];
        m.elements == null && (m.elements = []), m.elements.push(r);
      }
      a.push(r);
    }, o.onclosetag = () => {
      a.pop();
    }, o.ontext = (s) => {
      a.length > 0 && (a[a.length - 1].value = s);
    }, o.oncdata = (s) => {
      const r = a[a.length - 1];
      r.value = s, r.isCData = !0;
    }, o.onerror = (s) => {
      throw s;
    }, o.write(h), n;
  }
  return xt;
}
var Ao;
function qe() {
  return Ao || (Ao = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.CURRENT_APP_PACKAGE_FILE_NAME = t.CURRENT_APP_INSTALLER_FILE_NAME = t.XElement = t.parseXml = t.UUID = t.parseDn = t.retry = t.githubUrl = t.getS3LikeProviderBaseUrl = t.ProgressCallbackTransform = t.MemoLazy = t.safeStringifyJson = t.safeGetHeader = t.parseJson = t.HttpExecutor = t.HttpError = t.DigestTransform = t.createHttpError = t.configureRequestUrl = t.configureRequestOptionsFromUrl = t.configureRequestOptions = t.newError = t.CancellationToken = t.CancellationError = void 0, t.asArray = s;
    var u = ta();
    Object.defineProperty(t, "CancellationError", { enumerable: !0, get: function() {
      return u.CancellationError;
    } }), Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
      return u.CancellationToken;
    } });
    var d = Hr();
    Object.defineProperty(t, "newError", { enumerable: !0, get: function() {
      return d.newError;
    } });
    var c = qc();
    Object.defineProperty(t, "configureRequestOptions", { enumerable: !0, get: function() {
      return c.configureRequestOptions;
    } }), Object.defineProperty(t, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return c.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(t, "configureRequestUrl", { enumerable: !0, get: function() {
      return c.configureRequestUrl;
    } }), Object.defineProperty(t, "createHttpError", { enumerable: !0, get: function() {
      return c.createHttpError;
    } }), Object.defineProperty(t, "DigestTransform", { enumerable: !0, get: function() {
      return c.DigestTransform;
    } }), Object.defineProperty(t, "HttpError", { enumerable: !0, get: function() {
      return c.HttpError;
    } }), Object.defineProperty(t, "HttpExecutor", { enumerable: !0, get: function() {
      return c.HttpExecutor;
    } }), Object.defineProperty(t, "parseJson", { enumerable: !0, get: function() {
      return c.parseJson;
    } }), Object.defineProperty(t, "safeGetHeader", { enumerable: !0, get: function() {
      return c.safeGetHeader;
    } }), Object.defineProperty(t, "safeStringifyJson", { enumerable: !0, get: function() {
      return c.safeStringifyJson;
    } });
    var f = Mc();
    Object.defineProperty(t, "MemoLazy", { enumerable: !0, get: function() {
      return f.MemoLazy;
    } });
    var l = xl();
    Object.defineProperty(t, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return l.ProgressCallbackTransform;
    } });
    var i = Bc();
    Object.defineProperty(t, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return i.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(t, "githubUrl", { enumerable: !0, get: function() {
      return i.githubUrl;
    } });
    var h = Hc();
    Object.defineProperty(t, "retry", { enumerable: !0, get: function() {
      return h.retry;
    } });
    var n = jc();
    Object.defineProperty(t, "parseDn", { enumerable: !0, get: function() {
      return n.parseDn;
    } });
    var o = Gc();
    Object.defineProperty(t, "UUID", { enumerable: !0, get: function() {
      return o.UUID;
    } });
    var a = Vc();
    Object.defineProperty(t, "parseXml", { enumerable: !0, get: function() {
      return a.parseXml;
    } }), Object.defineProperty(t, "XElement", { enumerable: !0, get: function() {
      return a.XElement;
    } }), t.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", t.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function s(r) {
      return r == null ? [] : Array.isArray(r) ? r : [r];
    }
  }(Pn)), Pn;
}
var je = {}, Lr = {}, pt = {}, To;
function vr() {
  if (To) return pt;
  To = 1;
  function t(i) {
    return typeof i > "u" || i === null;
  }
  function u(i) {
    return typeof i == "object" && i !== null;
  }
  function d(i) {
    return Array.isArray(i) ? i : t(i) ? [] : [i];
  }
  function c(i, h) {
    var n, o, a, s;
    if (h)
      for (s = Object.keys(h), n = 0, o = s.length; n < o; n += 1)
        a = s[n], i[a] = h[a];
    return i;
  }
  function f(i, h) {
    var n = "", o;
    for (o = 0; o < h; o += 1)
      n += i;
    return n;
  }
  function l(i) {
    return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
  }
  return pt.isNothing = t, pt.isObject = u, pt.toArray = d, pt.repeat = f, pt.isNegativeZero = l, pt.extend = c, pt;
}
var Ln, Ro;
function Er() {
  if (Ro) return Ln;
  Ro = 1;
  function t(d, c) {
    var f = "", l = d.reason || "(unknown reason)";
    return d.mark ? (d.mark.name && (f += 'in "' + d.mark.name + '" '), f += "(" + (d.mark.line + 1) + ":" + (d.mark.column + 1) + ")", !c && d.mark.snippet && (f += `

` + d.mark.snippet), l + " " + f) : l;
  }
  function u(d, c) {
    Error.call(this), this.name = "YAMLException", this.reason = d, this.mark = c, this.message = t(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return u.prototype = Object.create(Error.prototype), u.prototype.constructor = u, u.prototype.toString = function(c) {
    return this.name + ": " + t(this, c);
  }, Ln = u, Ln;
}
var Un, Co;
function Yc() {
  if (Co) return Un;
  Co = 1;
  var t = vr();
  function u(f, l, i, h, n) {
    var o = "", a = "", s = Math.floor(n / 2) - 1;
    return h - l > s && (o = " ... ", l = h - s + o.length), i - h > s && (a = " ...", i = h + s - a.length), {
      str: o + f.slice(l, i).replace(/\t/g, "→") + a,
      pos: h - l + o.length
      // relative position
    };
  }
  function d(f, l) {
    return t.repeat(" ", l - f.length) + f;
  }
  function c(f, l) {
    if (l = Object.create(l || null), !f.buffer) return null;
    l.maxLength || (l.maxLength = 79), typeof l.indent != "number" && (l.indent = 1), typeof l.linesBefore != "number" && (l.linesBefore = 3), typeof l.linesAfter != "number" && (l.linesAfter = 2);
    for (var i = /\r?\n|\r|\0/g, h = [0], n = [], o, a = -1; o = i.exec(f.buffer); )
      n.push(o.index), h.push(o.index + o[0].length), f.position <= o.index && a < 0 && (a = h.length - 2);
    a < 0 && (a = h.length - 1);
    var s = "", r, m, v = Math.min(f.line + l.linesAfter, n.length).toString().length, E = l.maxLength - (l.indent + v + 3);
    for (r = 1; r <= l.linesBefore && !(a - r < 0); r++)
      m = u(
        f.buffer,
        h[a - r],
        n[a - r],
        f.position - (h[a] - h[a - r]),
        E
      ), s = t.repeat(" ", l.indent) + d((f.line - r + 1).toString(), v) + " | " + m.str + `
` + s;
    for (m = u(f.buffer, h[a], n[a], f.position, E), s += t.repeat(" ", l.indent) + d((f.line + 1).toString(), v) + " | " + m.str + `
`, s += t.repeat("-", l.indent + v + 3 + m.pos) + `^
`, r = 1; r <= l.linesAfter && !(a + r >= n.length); r++)
      m = u(
        f.buffer,
        h[a + r],
        n[a + r],
        f.position - (h[a] - h[a + r]),
        E
      ), s += t.repeat(" ", l.indent) + d((f.line + r + 1).toString(), v) + " | " + m.str + `
`;
    return s.replace(/\n$/, "");
  }
  return Un = c, Un;
}
var $n, bo;
function Ge() {
  if (bo) return $n;
  bo = 1;
  var t = Er(), u = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], d = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function c(l) {
    var i = {};
    return l !== null && Object.keys(l).forEach(function(h) {
      l[h].forEach(function(n) {
        i[String(n)] = h;
      });
    }), i;
  }
  function f(l, i) {
    if (i = i || {}, Object.keys(i).forEach(function(h) {
      if (u.indexOf(h) === -1)
        throw new t('Unknown option "' + h + '" is met in definition of "' + l + '" YAML type.');
    }), this.options = i, this.tag = l, this.kind = i.kind || null, this.resolve = i.resolve || function() {
      return !0;
    }, this.construct = i.construct || function(h) {
      return h;
    }, this.instanceOf = i.instanceOf || null, this.predicate = i.predicate || null, this.represent = i.represent || null, this.representName = i.representName || null, this.defaultStyle = i.defaultStyle || null, this.multi = i.multi || !1, this.styleAliases = c(i.styleAliases || null), d.indexOf(this.kind) === -1)
      throw new t('Unknown kind "' + this.kind + '" is specified for "' + l + '" YAML type.');
  }
  return $n = f, $n;
}
var kn, Oo;
function Ll() {
  if (Oo) return kn;
  Oo = 1;
  var t = Er(), u = Ge();
  function d(l, i) {
    var h = [];
    return l[i].forEach(function(n) {
      var o = h.length;
      h.forEach(function(a, s) {
        a.tag === n.tag && a.kind === n.kind && a.multi === n.multi && (o = s);
      }), h[o] = n;
    }), h;
  }
  function c() {
    var l = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, i, h;
    function n(o) {
      o.multi ? (l.multi[o.kind].push(o), l.multi.fallback.push(o)) : l[o.kind][o.tag] = l.fallback[o.tag] = o;
    }
    for (i = 0, h = arguments.length; i < h; i += 1)
      arguments[i].forEach(n);
    return l;
  }
  function f(l) {
    return this.extend(l);
  }
  return f.prototype.extend = function(i) {
    var h = [], n = [];
    if (i instanceof u)
      n.push(i);
    else if (Array.isArray(i))
      n = n.concat(i);
    else if (i && (Array.isArray(i.implicit) || Array.isArray(i.explicit)))
      i.implicit && (h = h.concat(i.implicit)), i.explicit && (n = n.concat(i.explicit));
    else
      throw new t("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    h.forEach(function(a) {
      if (!(a instanceof u))
        throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (a.loadKind && a.loadKind !== "scalar")
        throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (a.multi)
        throw new t("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), n.forEach(function(a) {
      if (!(a instanceof u))
        throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var o = Object.create(f.prototype);
    return o.implicit = (this.implicit || []).concat(h), o.explicit = (this.explicit || []).concat(n), o.compiledImplicit = d(o, "implicit"), o.compiledExplicit = d(o, "explicit"), o.compiledTypeMap = c(o.compiledImplicit, o.compiledExplicit), o;
  }, kn = f, kn;
}
var qn, Po;
function Ul() {
  if (Po) return qn;
  Po = 1;
  var t = Ge();
  return qn = new t("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(u) {
      return u !== null ? u : "";
    }
  }), qn;
}
var Mn, Io;
function $l() {
  if (Io) return Mn;
  Io = 1;
  var t = Ge();
  return Mn = new t("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(u) {
      return u !== null ? u : [];
    }
  }), Mn;
}
var Bn, Do;
function kl() {
  if (Do) return Bn;
  Do = 1;
  var t = Ge();
  return Bn = new t("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(u) {
      return u !== null ? u : {};
    }
  }), Bn;
}
var Hn, No;
function ql() {
  if (No) return Hn;
  No = 1;
  var t = Ll();
  return Hn = new t({
    explicit: [
      Ul(),
      $l(),
      kl()
    ]
  }), Hn;
}
var jn, Fo;
function Ml() {
  if (Fo) return jn;
  Fo = 1;
  var t = Ge();
  function u(f) {
    if (f === null) return !0;
    var l = f.length;
    return l === 1 && f === "~" || l === 4 && (f === "null" || f === "Null" || f === "NULL");
  }
  function d() {
    return null;
  }
  function c(f) {
    return f === null;
  }
  return jn = new t("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: u,
    construct: d,
    predicate: c,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), jn;
}
var Gn, xo;
function Bl() {
  if (xo) return Gn;
  xo = 1;
  var t = Ge();
  function u(f) {
    if (f === null) return !1;
    var l = f.length;
    return l === 4 && (f === "true" || f === "True" || f === "TRUE") || l === 5 && (f === "false" || f === "False" || f === "FALSE");
  }
  function d(f) {
    return f === "true" || f === "True" || f === "TRUE";
  }
  function c(f) {
    return Object.prototype.toString.call(f) === "[object Boolean]";
  }
  return Gn = new t("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: u,
    construct: d,
    predicate: c,
    represent: {
      lowercase: function(f) {
        return f ? "true" : "false";
      },
      uppercase: function(f) {
        return f ? "TRUE" : "FALSE";
      },
      camelcase: function(f) {
        return f ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), Gn;
}
var Wn, Lo;
function Hl() {
  if (Lo) return Wn;
  Lo = 1;
  var t = vr(), u = Ge();
  function d(n) {
    return 48 <= n && n <= 57 || 65 <= n && n <= 70 || 97 <= n && n <= 102;
  }
  function c(n) {
    return 48 <= n && n <= 55;
  }
  function f(n) {
    return 48 <= n && n <= 57;
  }
  function l(n) {
    if (n === null) return !1;
    var o = n.length, a = 0, s = !1, r;
    if (!o) return !1;
    if (r = n[a], (r === "-" || r === "+") && (r = n[++a]), r === "0") {
      if (a + 1 === o) return !0;
      if (r = n[++a], r === "b") {
        for (a++; a < o; a++)
          if (r = n[a], r !== "_") {
            if (r !== "0" && r !== "1") return !1;
            s = !0;
          }
        return s && r !== "_";
      }
      if (r === "x") {
        for (a++; a < o; a++)
          if (r = n[a], r !== "_") {
            if (!d(n.charCodeAt(a))) return !1;
            s = !0;
          }
        return s && r !== "_";
      }
      if (r === "o") {
        for (a++; a < o; a++)
          if (r = n[a], r !== "_") {
            if (!c(n.charCodeAt(a))) return !1;
            s = !0;
          }
        return s && r !== "_";
      }
    }
    if (r === "_") return !1;
    for (; a < o; a++)
      if (r = n[a], r !== "_") {
        if (!f(n.charCodeAt(a)))
          return !1;
        s = !0;
      }
    return !(!s || r === "_");
  }
  function i(n) {
    var o = n, a = 1, s;
    if (o.indexOf("_") !== -1 && (o = o.replace(/_/g, "")), s = o[0], (s === "-" || s === "+") && (s === "-" && (a = -1), o = o.slice(1), s = o[0]), o === "0") return 0;
    if (s === "0") {
      if (o[1] === "b") return a * parseInt(o.slice(2), 2);
      if (o[1] === "x") return a * parseInt(o.slice(2), 16);
      if (o[1] === "o") return a * parseInt(o.slice(2), 8);
    }
    return a * parseInt(o, 10);
  }
  function h(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && n % 1 === 0 && !t.isNegativeZero(n);
  }
  return Wn = new u("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: l,
    construct: i,
    predicate: h,
    represent: {
      binary: function(n) {
        return n >= 0 ? "0b" + n.toString(2) : "-0b" + n.toString(2).slice(1);
      },
      octal: function(n) {
        return n >= 0 ? "0o" + n.toString(8) : "-0o" + n.toString(8).slice(1);
      },
      decimal: function(n) {
        return n.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(n) {
        return n >= 0 ? "0x" + n.toString(16).toUpperCase() : "-0x" + n.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), Wn;
}
var Vn, Uo;
function jl() {
  if (Uo) return Vn;
  Uo = 1;
  var t = vr(), u = Ge(), d = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function c(n) {
    return !(n === null || !d.test(n) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    n[n.length - 1] === "_");
  }
  function f(n) {
    var o, a;
    return o = n.replace(/_/g, "").toLowerCase(), a = o[0] === "-" ? -1 : 1, "+-".indexOf(o[0]) >= 0 && (o = o.slice(1)), o === ".inf" ? a === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : o === ".nan" ? NaN : a * parseFloat(o, 10);
  }
  var l = /^[-+]?[0-9]+e/;
  function i(n, o) {
    var a;
    if (isNaN(n))
      switch (o) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === n)
      switch (o) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === n)
      switch (o) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (t.isNegativeZero(n))
      return "-0.0";
    return a = n.toString(10), l.test(a) ? a.replace("e", ".e") : a;
  }
  function h(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && (n % 1 !== 0 || t.isNegativeZero(n));
  }
  return Vn = new u("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: c,
    construct: f,
    predicate: h,
    represent: i,
    defaultStyle: "lowercase"
  }), Vn;
}
var Yn, $o;
function Gl() {
  return $o || ($o = 1, Yn = ql().extend({
    implicit: [
      Ml(),
      Bl(),
      Hl(),
      jl()
    ]
  })), Yn;
}
var zn, ko;
function Wl() {
  return ko || (ko = 1, zn = Gl()), zn;
}
var Xn, qo;
function Vl() {
  if (qo) return Xn;
  qo = 1;
  var t = Ge(), u = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function c(i) {
    return i === null ? !1 : u.exec(i) !== null || d.exec(i) !== null;
  }
  function f(i) {
    var h, n, o, a, s, r, m, v = 0, E = null, p, S, R;
    if (h = u.exec(i), h === null && (h = d.exec(i)), h === null) throw new Error("Date resolve error");
    if (n = +h[1], o = +h[2] - 1, a = +h[3], !h[4])
      return new Date(Date.UTC(n, o, a));
    if (s = +h[4], r = +h[5], m = +h[6], h[7]) {
      for (v = h[7].slice(0, 3); v.length < 3; )
        v += "0";
      v = +v;
    }
    return h[9] && (p = +h[10], S = +(h[11] || 0), E = (p * 60 + S) * 6e4, h[9] === "-" && (E = -E)), R = new Date(Date.UTC(n, o, a, s, r, m, v)), E && R.setTime(R.getTime() - E), R;
  }
  function l(i) {
    return i.toISOString();
  }
  return Xn = new t("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: c,
    construct: f,
    instanceOf: Date,
    represent: l
  }), Xn;
}
var Kn, Mo;
function Yl() {
  if (Mo) return Kn;
  Mo = 1;
  var t = Ge();
  function u(d) {
    return d === "<<" || d === null;
  }
  return Kn = new t("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: u
  }), Kn;
}
var Jn, Bo;
function zl() {
  if (Bo) return Jn;
  Bo = 1;
  var t = Ge(), u = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function d(i) {
    if (i === null) return !1;
    var h, n, o = 0, a = i.length, s = u;
    for (n = 0; n < a; n++)
      if (h = s.indexOf(i.charAt(n)), !(h > 64)) {
        if (h < 0) return !1;
        o += 6;
      }
    return o % 8 === 0;
  }
  function c(i) {
    var h, n, o = i.replace(/[\r\n=]/g, ""), a = o.length, s = u, r = 0, m = [];
    for (h = 0; h < a; h++)
      h % 4 === 0 && h && (m.push(r >> 16 & 255), m.push(r >> 8 & 255), m.push(r & 255)), r = r << 6 | s.indexOf(o.charAt(h));
    return n = a % 4 * 6, n === 0 ? (m.push(r >> 16 & 255), m.push(r >> 8 & 255), m.push(r & 255)) : n === 18 ? (m.push(r >> 10 & 255), m.push(r >> 2 & 255)) : n === 12 && m.push(r >> 4 & 255), new Uint8Array(m);
  }
  function f(i) {
    var h = "", n = 0, o, a, s = i.length, r = u;
    for (o = 0; o < s; o++)
      o % 3 === 0 && o && (h += r[n >> 18 & 63], h += r[n >> 12 & 63], h += r[n >> 6 & 63], h += r[n & 63]), n = (n << 8) + i[o];
    return a = s % 3, a === 0 ? (h += r[n >> 18 & 63], h += r[n >> 12 & 63], h += r[n >> 6 & 63], h += r[n & 63]) : a === 2 ? (h += r[n >> 10 & 63], h += r[n >> 4 & 63], h += r[n << 2 & 63], h += r[64]) : a === 1 && (h += r[n >> 2 & 63], h += r[n << 4 & 63], h += r[64], h += r[64]), h;
  }
  function l(i) {
    return Object.prototype.toString.call(i) === "[object Uint8Array]";
  }
  return Jn = new t("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: d,
    construct: c,
    predicate: l,
    represent: f
  }), Jn;
}
var Qn, Ho;
function Xl() {
  if (Ho) return Qn;
  Ho = 1;
  var t = Ge(), u = Object.prototype.hasOwnProperty, d = Object.prototype.toString;
  function c(l) {
    if (l === null) return !0;
    var i = [], h, n, o, a, s, r = l;
    for (h = 0, n = r.length; h < n; h += 1) {
      if (o = r[h], s = !1, d.call(o) !== "[object Object]") return !1;
      for (a in o)
        if (u.call(o, a))
          if (!s) s = !0;
          else return !1;
      if (!s) return !1;
      if (i.indexOf(a) === -1) i.push(a);
      else return !1;
    }
    return !0;
  }
  function f(l) {
    return l !== null ? l : [];
  }
  return Qn = new t("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: c,
    construct: f
  }), Qn;
}
var Zn, jo;
function Kl() {
  if (jo) return Zn;
  jo = 1;
  var t = Ge(), u = Object.prototype.toString;
  function d(f) {
    if (f === null) return !0;
    var l, i, h, n, o, a = f;
    for (o = new Array(a.length), l = 0, i = a.length; l < i; l += 1) {
      if (h = a[l], u.call(h) !== "[object Object]" || (n = Object.keys(h), n.length !== 1)) return !1;
      o[l] = [n[0], h[n[0]]];
    }
    return !0;
  }
  function c(f) {
    if (f === null) return [];
    var l, i, h, n, o, a = f;
    for (o = new Array(a.length), l = 0, i = a.length; l < i; l += 1)
      h = a[l], n = Object.keys(h), o[l] = [n[0], h[n[0]]];
    return o;
  }
  return Zn = new t("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: d,
    construct: c
  }), Zn;
}
var ei, Go;
function Jl() {
  if (Go) return ei;
  Go = 1;
  var t = Ge(), u = Object.prototype.hasOwnProperty;
  function d(f) {
    if (f === null) return !0;
    var l, i = f;
    for (l in i)
      if (u.call(i, l) && i[l] !== null)
        return !1;
    return !0;
  }
  function c(f) {
    return f !== null ? f : {};
  }
  return ei = new t("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: d,
    construct: c
  }), ei;
}
var ti, Wo;
function ra() {
  return Wo || (Wo = 1, ti = Wl().extend({
    implicit: [
      Vl(),
      Yl()
    ],
    explicit: [
      zl(),
      Xl(),
      Kl(),
      Jl()
    ]
  })), ti;
}
var Vo;
function zc() {
  if (Vo) return Lr;
  Vo = 1;
  var t = vr(), u = Er(), d = Yc(), c = ra(), f = Object.prototype.hasOwnProperty, l = 1, i = 2, h = 3, n = 4, o = 1, a = 2, s = 3, r = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, m = /[\x85\u2028\u2029]/, v = /[,\[\]\{\}]/, E = /^(?:!|!!|![a-z\-]+!)$/i, p = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function S(e) {
    return Object.prototype.toString.call(e);
  }
  function R(e) {
    return e === 10 || e === 13;
  }
  function O(e) {
    return e === 9 || e === 32;
  }
  function P(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function M(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function C(e) {
    var B;
    return 48 <= e && e <= 57 ? e - 48 : (B = e | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function A(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function T(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function y(e) {
    return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
  }
  function q(e) {
    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
      (e - 65536 >> 10) + 55296,
      (e - 65536 & 1023) + 56320
    );
  }
  for (var U = new Array(256), L = new Array(256), k = 0; k < 256; k++)
    U[k] = y(k) ? 1 : 0, L[k] = y(k);
  function N(e, B) {
    this.input = e, this.filename = B.filename || null, this.schema = B.schema || c, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function I(e, B) {
    var G = {
      name: e.filename,
      buffer: e.input.slice(0, -1),
      // omit trailing \0
      position: e.position,
      line: e.line,
      column: e.position - e.lineStart
    };
    return G.snippet = d(G), new u(B, G);
  }
  function F(e, B) {
    throw I(e, B);
  }
  function $(e, B) {
    e.onWarning && e.onWarning.call(null, I(e, B));
  }
  var J = {
    YAML: function(B, G, re) {
      var V, te, Z;
      B.version !== null && F(B, "duplication of %YAML directive"), re.length !== 1 && F(B, "YAML directive accepts exactly one argument"), V = /^([0-9]+)\.([0-9]+)$/.exec(re[0]), V === null && F(B, "ill-formed argument of the YAML directive"), te = parseInt(V[1], 10), Z = parseInt(V[2], 10), te !== 1 && F(B, "unacceptable YAML version of the document"), B.version = re[0], B.checkLineBreaks = Z < 2, Z !== 1 && Z !== 2 && $(B, "unsupported YAML version of the document");
    },
    TAG: function(B, G, re) {
      var V, te;
      re.length !== 2 && F(B, "TAG directive accepts exactly two arguments"), V = re[0], te = re[1], E.test(V) || F(B, "ill-formed tag handle (first argument) of the TAG directive"), f.call(B.tagMap, V) && F(B, 'there is a previously declared suffix for "' + V + '" tag handle'), p.test(te) || F(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        te = decodeURIComponent(te);
      } catch {
        F(B, "tag prefix is malformed: " + te);
      }
      B.tagMap[V] = te;
    }
  };
  function W(e, B, G, re) {
    var V, te, Z, ae;
    if (B < G) {
      if (ae = e.input.slice(B, G), re)
        for (V = 0, te = ae.length; V < te; V += 1)
          Z = ae.charCodeAt(V), Z === 9 || 32 <= Z && Z <= 1114111 || F(e, "expected valid JSON character");
      else r.test(ae) && F(e, "the stream contains non-printable characters");
      e.result += ae;
    }
  }
  function ne(e, B, G, re) {
    var V, te, Z, ae;
    for (t.isObject(G) || F(e, "cannot merge mappings; the provided source object is unacceptable"), V = Object.keys(G), Z = 0, ae = V.length; Z < ae; Z += 1)
      te = V[Z], f.call(B, te) || (B[te] = G[te], re[te] = !0);
  }
  function ce(e, B, G, re, V, te, Z, ae, ge) {
    var ve, Te;
    if (Array.isArray(V))
      for (V = Array.prototype.slice.call(V), ve = 0, Te = V.length; ve < Te; ve += 1)
        Array.isArray(V[ve]) && F(e, "nested arrays are not supported inside keys"), typeof V == "object" && S(V[ve]) === "[object Object]" && (V[ve] = "[object Object]");
    if (typeof V == "object" && S(V) === "[object Object]" && (V = "[object Object]"), V = String(V), B === null && (B = {}), re === "tag:yaml.org,2002:merge")
      if (Array.isArray(te))
        for (ve = 0, Te = te.length; ve < Te; ve += 1)
          ne(e, B, te[ve], G);
      else
        ne(e, B, te, G);
    else
      !e.json && !f.call(G, V) && f.call(B, V) && (e.line = Z || e.line, e.lineStart = ae || e.lineStart, e.position = ge || e.position, F(e, "duplicated mapping key")), V === "__proto__" ? Object.defineProperty(B, V, {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: te
      }) : B[V] = te, delete G[V];
    return B;
  }
  function ue(e) {
    var B;
    B = e.input.charCodeAt(e.position), B === 10 ? e.position++ : B === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : F(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
  }
  function ie(e, B, G) {
    for (var re = 0, V = e.input.charCodeAt(e.position); V !== 0; ) {
      for (; O(V); )
        V === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), V = e.input.charCodeAt(++e.position);
      if (B && V === 35)
        do
          V = e.input.charCodeAt(++e.position);
        while (V !== 10 && V !== 13 && V !== 0);
      if (R(V))
        for (ue(e), V = e.input.charCodeAt(e.position), re++, e.lineIndent = 0; V === 32; )
          e.lineIndent++, V = e.input.charCodeAt(++e.position);
      else
        break;
    }
    return G !== -1 && re !== 0 && e.lineIndent < G && $(e, "deficient indentation"), re;
  }
  function Ae(e) {
    var B = e.position, G;
    return G = e.input.charCodeAt(B), !!((G === 45 || G === 46) && G === e.input.charCodeAt(B + 1) && G === e.input.charCodeAt(B + 2) && (B += 3, G = e.input.charCodeAt(B), G === 0 || P(G)));
  }
  function K(e, B) {
    B === 1 ? e.result += " " : B > 1 && (e.result += t.repeat(`
`, B - 1));
  }
  function Ee(e, B, G) {
    var re, V, te, Z, ae, ge, ve, Te, de = e.kind, Le = e.result, w;
    if (w = e.input.charCodeAt(e.position), P(w) || M(w) || w === 35 || w === 38 || w === 42 || w === 33 || w === 124 || w === 62 || w === 39 || w === 34 || w === 37 || w === 64 || w === 96 || (w === 63 || w === 45) && (V = e.input.charCodeAt(e.position + 1), P(V) || G && M(V)))
      return !1;
    for (e.kind = "scalar", e.result = "", te = Z = e.position, ae = !1; w !== 0; ) {
      if (w === 58) {
        if (V = e.input.charCodeAt(e.position + 1), P(V) || G && M(V))
          break;
      } else if (w === 35) {
        if (re = e.input.charCodeAt(e.position - 1), P(re))
          break;
      } else {
        if (e.position === e.lineStart && Ae(e) || G && M(w))
          break;
        if (R(w))
          if (ge = e.line, ve = e.lineStart, Te = e.lineIndent, ie(e, !1, -1), e.lineIndent >= B) {
            ae = !0, w = e.input.charCodeAt(e.position);
            continue;
          } else {
            e.position = Z, e.line = ge, e.lineStart = ve, e.lineIndent = Te;
            break;
          }
      }
      ae && (W(e, te, Z, !1), K(e, e.line - ge), te = Z = e.position, ae = !1), O(w) || (Z = e.position + 1), w = e.input.charCodeAt(++e.position);
    }
    return W(e, te, Z, !1), e.result ? !0 : (e.kind = de, e.result = Le, !1);
  }
  function _(e, B) {
    var G, re, V;
    if (G = e.input.charCodeAt(e.position), G !== 39)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, re = V = e.position; (G = e.input.charCodeAt(e.position)) !== 0; )
      if (G === 39)
        if (W(e, re, e.position, !0), G = e.input.charCodeAt(++e.position), G === 39)
          re = e.position, e.position++, V = e.position;
        else
          return !0;
      else R(G) ? (W(e, re, V, !0), K(e, ie(e, !1, B)), re = V = e.position) : e.position === e.lineStart && Ae(e) ? F(e, "unexpected end of the document within a single quoted scalar") : (e.position++, V = e.position);
    F(e, "unexpected end of the stream within a single quoted scalar");
  }
  function g(e, B) {
    var G, re, V, te, Z, ae;
    if (ae = e.input.charCodeAt(e.position), ae !== 34)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, G = re = e.position; (ae = e.input.charCodeAt(e.position)) !== 0; ) {
      if (ae === 34)
        return W(e, G, e.position, !0), e.position++, !0;
      if (ae === 92) {
        if (W(e, G, e.position, !0), ae = e.input.charCodeAt(++e.position), R(ae))
          ie(e, !1, B);
        else if (ae < 256 && U[ae])
          e.result += L[ae], e.position++;
        else if ((Z = A(ae)) > 0) {
          for (V = Z, te = 0; V > 0; V--)
            ae = e.input.charCodeAt(++e.position), (Z = C(ae)) >= 0 ? te = (te << 4) + Z : F(e, "expected hexadecimal character");
          e.result += q(te), e.position++;
        } else
          F(e, "unknown escape sequence");
        G = re = e.position;
      } else R(ae) ? (W(e, G, re, !0), K(e, ie(e, !1, B)), G = re = e.position) : e.position === e.lineStart && Ae(e) ? F(e, "unexpected end of the document within a double quoted scalar") : (e.position++, re = e.position);
    }
    F(e, "unexpected end of the stream within a double quoted scalar");
  }
  function H(e, B) {
    var G = !0, re, V, te, Z = e.tag, ae, ge = e.anchor, ve, Te, de, Le, w, j = /* @__PURE__ */ Object.create(null), X, Y, Q, ee;
    if (ee = e.input.charCodeAt(e.position), ee === 91)
      Te = 93, w = !1, ae = [];
    else if (ee === 123)
      Te = 125, w = !0, ae = {};
    else
      return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = ae), ee = e.input.charCodeAt(++e.position); ee !== 0; ) {
      if (ie(e, !0, B), ee = e.input.charCodeAt(e.position), ee === Te)
        return e.position++, e.tag = Z, e.anchor = ge, e.kind = w ? "mapping" : "sequence", e.result = ae, !0;
      G ? ee === 44 && F(e, "expected the node content, but found ','") : F(e, "missed comma between flow collection entries"), Y = X = Q = null, de = Le = !1, ee === 63 && (ve = e.input.charCodeAt(e.position + 1), P(ve) && (de = Le = !0, e.position++, ie(e, !0, B))), re = e.line, V = e.lineStart, te = e.position, xe(e, B, l, !1, !0), Y = e.tag, X = e.result, ie(e, !0, B), ee = e.input.charCodeAt(e.position), (Le || e.line === re) && ee === 58 && (de = !0, ee = e.input.charCodeAt(++e.position), ie(e, !0, B), xe(e, B, l, !1, !0), Q = e.result), w ? ce(e, ae, j, Y, X, Q, re, V, te) : de ? ae.push(ce(e, null, j, Y, X, Q, re, V, te)) : ae.push(X), ie(e, !0, B), ee = e.input.charCodeAt(e.position), ee === 44 ? (G = !0, ee = e.input.charCodeAt(++e.position)) : G = !1;
    }
    F(e, "unexpected end of the stream within a flow collection");
  }
  function D(e, B) {
    var G, re, V = o, te = !1, Z = !1, ae = B, ge = 0, ve = !1, Te, de;
    if (de = e.input.charCodeAt(e.position), de === 124)
      re = !1;
    else if (de === 62)
      re = !0;
    else
      return !1;
    for (e.kind = "scalar", e.result = ""; de !== 0; )
      if (de = e.input.charCodeAt(++e.position), de === 43 || de === 45)
        o === V ? V = de === 43 ? s : a : F(e, "repeat of a chomping mode identifier");
      else if ((Te = T(de)) >= 0)
        Te === 0 ? F(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : Z ? F(e, "repeat of an indentation width identifier") : (ae = B + Te - 1, Z = !0);
      else
        break;
    if (O(de)) {
      do
        de = e.input.charCodeAt(++e.position);
      while (O(de));
      if (de === 35)
        do
          de = e.input.charCodeAt(++e.position);
        while (!R(de) && de !== 0);
    }
    for (; de !== 0; ) {
      for (ue(e), e.lineIndent = 0, de = e.input.charCodeAt(e.position); (!Z || e.lineIndent < ae) && de === 32; )
        e.lineIndent++, de = e.input.charCodeAt(++e.position);
      if (!Z && e.lineIndent > ae && (ae = e.lineIndent), R(de)) {
        ge++;
        continue;
      }
      if (e.lineIndent < ae) {
        V === s ? e.result += t.repeat(`
`, te ? 1 + ge : ge) : V === o && te && (e.result += `
`);
        break;
      }
      for (re ? O(de) ? (ve = !0, e.result += t.repeat(`
`, te ? 1 + ge : ge)) : ve ? (ve = !1, e.result += t.repeat(`
`, ge + 1)) : ge === 0 ? te && (e.result += " ") : e.result += t.repeat(`
`, ge) : e.result += t.repeat(`
`, te ? 1 + ge : ge), te = !0, Z = !0, ge = 0, G = e.position; !R(de) && de !== 0; )
        de = e.input.charCodeAt(++e.position);
      W(e, G, e.position, !1);
    }
    return !0;
  }
  function le(e, B) {
    var G, re = e.tag, V = e.anchor, te = [], Z, ae = !1, ge;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = te), ge = e.input.charCodeAt(e.position); ge !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, F(e, "tab characters must not be used in indentation")), !(ge !== 45 || (Z = e.input.charCodeAt(e.position + 1), !P(Z)))); ) {
      if (ae = !0, e.position++, ie(e, !0, -1) && e.lineIndent <= B) {
        te.push(null), ge = e.input.charCodeAt(e.position);
        continue;
      }
      if (G = e.line, xe(e, B, h, !1, !0), te.push(e.result), ie(e, !0, -1), ge = e.input.charCodeAt(e.position), (e.line === G || e.lineIndent > B) && ge !== 0)
        F(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < B)
        break;
    }
    return ae ? (e.tag = re, e.anchor = V, e.kind = "sequence", e.result = te, !0) : !1;
  }
  function me(e, B, G) {
    var re, V, te, Z, ae, ge, ve = e.tag, Te = e.anchor, de = {}, Le = /* @__PURE__ */ Object.create(null), w = null, j = null, X = null, Y = !1, Q = !1, ee;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = de), ee = e.input.charCodeAt(e.position); ee !== 0; ) {
      if (!Y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, F(e, "tab characters must not be used in indentation")), re = e.input.charCodeAt(e.position + 1), te = e.line, (ee === 63 || ee === 58) && P(re))
        ee === 63 ? (Y && (ce(e, de, Le, w, j, null, Z, ae, ge), w = j = X = null), Q = !0, Y = !0, V = !0) : Y ? (Y = !1, V = !0) : F(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, ee = re;
      else {
        if (Z = e.line, ae = e.lineStart, ge = e.position, !xe(e, G, i, !1, !0))
          break;
        if (e.line === te) {
          for (ee = e.input.charCodeAt(e.position); O(ee); )
            ee = e.input.charCodeAt(++e.position);
          if (ee === 58)
            ee = e.input.charCodeAt(++e.position), P(ee) || F(e, "a whitespace character is expected after the key-value separator within a block mapping"), Y && (ce(e, de, Le, w, j, null, Z, ae, ge), w = j = X = null), Q = !0, Y = !1, V = !1, w = e.tag, j = e.result;
          else if (Q)
            F(e, "can not read an implicit mapping pair; a colon is missed");
          else
            return e.tag = ve, e.anchor = Te, !0;
        } else if (Q)
          F(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return e.tag = ve, e.anchor = Te, !0;
      }
      if ((e.line === te || e.lineIndent > B) && (Y && (Z = e.line, ae = e.lineStart, ge = e.position), xe(e, B, n, !0, V) && (Y ? j = e.result : X = e.result), Y || (ce(e, de, Le, w, j, X, Z, ae, ge), w = j = X = null), ie(e, !0, -1), ee = e.input.charCodeAt(e.position)), (e.line === te || e.lineIndent > B) && ee !== 0)
        F(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < B)
        break;
    }
    return Y && ce(e, de, Le, w, j, null, Z, ae, ge), Q && (e.tag = ve, e.anchor = Te, e.kind = "mapping", e.result = de), Q;
  }
  function pe(e) {
    var B, G = !1, re = !1, V, te, Z;
    if (Z = e.input.charCodeAt(e.position), Z !== 33) return !1;
    if (e.tag !== null && F(e, "duplication of a tag property"), Z = e.input.charCodeAt(++e.position), Z === 60 ? (G = !0, Z = e.input.charCodeAt(++e.position)) : Z === 33 ? (re = !0, V = "!!", Z = e.input.charCodeAt(++e.position)) : V = "!", B = e.position, G) {
      do
        Z = e.input.charCodeAt(++e.position);
      while (Z !== 0 && Z !== 62);
      e.position < e.length ? (te = e.input.slice(B, e.position), Z = e.input.charCodeAt(++e.position)) : F(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Z !== 0 && !P(Z); )
        Z === 33 && (re ? F(e, "tag suffix cannot contain exclamation marks") : (V = e.input.slice(B - 1, e.position + 1), E.test(V) || F(e, "named tag handle cannot contain such characters"), re = !0, B = e.position + 1)), Z = e.input.charCodeAt(++e.position);
      te = e.input.slice(B, e.position), v.test(te) && F(e, "tag suffix cannot contain flow indicator characters");
    }
    te && !p.test(te) && F(e, "tag name cannot contain such characters: " + te);
    try {
      te = decodeURIComponent(te);
    } catch {
      F(e, "tag name is malformed: " + te);
    }
    return G ? e.tag = te : f.call(e.tagMap, V) ? e.tag = e.tagMap[V] + te : V === "!" ? e.tag = "!" + te : V === "!!" ? e.tag = "tag:yaml.org,2002:" + te : F(e, 'undeclared tag handle "' + V + '"'), !0;
  }
  function _e(e) {
    var B, G;
    if (G = e.input.charCodeAt(e.position), G !== 38) return !1;
    for (e.anchor !== null && F(e, "duplication of an anchor property"), G = e.input.charCodeAt(++e.position), B = e.position; G !== 0 && !P(G) && !M(G); )
      G = e.input.charCodeAt(++e.position);
    return e.position === B && F(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(B, e.position), !0;
  }
  function ye(e) {
    var B, G, re;
    if (re = e.input.charCodeAt(e.position), re !== 42) return !1;
    for (re = e.input.charCodeAt(++e.position), B = e.position; re !== 0 && !P(re) && !M(re); )
      re = e.input.charCodeAt(++e.position);
    return e.position === B && F(e, "name of an alias node must contain at least one character"), G = e.input.slice(B, e.position), f.call(e.anchorMap, G) || F(e, 'unidentified alias "' + G + '"'), e.result = e.anchorMap[G], ie(e, !0, -1), !0;
  }
  function xe(e, B, G, re, V) {
    var te, Z, ae, ge = 1, ve = !1, Te = !1, de, Le, w, j, X, Y;
    if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, te = Z = ae = n === G || h === G, re && ie(e, !0, -1) && (ve = !0, e.lineIndent > B ? ge = 1 : e.lineIndent === B ? ge = 0 : e.lineIndent < B && (ge = -1)), ge === 1)
      for (; pe(e) || _e(e); )
        ie(e, !0, -1) ? (ve = !0, ae = te, e.lineIndent > B ? ge = 1 : e.lineIndent === B ? ge = 0 : e.lineIndent < B && (ge = -1)) : ae = !1;
    if (ae && (ae = ve || V), (ge === 1 || n === G) && (l === G || i === G ? X = B : X = B + 1, Y = e.position - e.lineStart, ge === 1 ? ae && (le(e, Y) || me(e, Y, X)) || H(e, X) ? Te = !0 : (Z && D(e, X) || _(e, X) || g(e, X) ? Te = !0 : ye(e) ? (Te = !0, (e.tag !== null || e.anchor !== null) && F(e, "alias node should not have any properties")) : Ee(e, X, l === G) && (Te = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : ge === 0 && (Te = ae && le(e, Y))), e.tag === null)
      e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
    else if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && F(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), de = 0, Le = e.implicitTypes.length; de < Le; de += 1)
        if (j = e.implicitTypes[de], j.resolve(e.result)) {
          e.result = j.construct(e.result), e.tag = j.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else if (e.tag !== "!") {
      if (f.call(e.typeMap[e.kind || "fallback"], e.tag))
        j = e.typeMap[e.kind || "fallback"][e.tag];
      else
        for (j = null, w = e.typeMap.multi[e.kind || "fallback"], de = 0, Le = w.length; de < Le; de += 1)
          if (e.tag.slice(0, w[de].tag.length) === w[de].tag) {
            j = w[de];
            break;
          }
      j || F(e, "unknown tag !<" + e.tag + ">"), e.result !== null && j.kind !== e.kind && F(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + j.kind + '", not "' + e.kind + '"'), j.resolve(e.result, e.tag) ? (e.result = j.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : F(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
    }
    return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || Te;
  }
  function Ce(e) {
    var B = e.position, G, re, V, te = !1, Z;
    for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (Z = e.input.charCodeAt(e.position)) !== 0 && (ie(e, !0, -1), Z = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || Z !== 37)); ) {
      for (te = !0, Z = e.input.charCodeAt(++e.position), G = e.position; Z !== 0 && !P(Z); )
        Z = e.input.charCodeAt(++e.position);
      for (re = e.input.slice(G, e.position), V = [], re.length < 1 && F(e, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; O(Z); )
          Z = e.input.charCodeAt(++e.position);
        if (Z === 35) {
          do
            Z = e.input.charCodeAt(++e.position);
          while (Z !== 0 && !R(Z));
          break;
        }
        if (R(Z)) break;
        for (G = e.position; Z !== 0 && !P(Z); )
          Z = e.input.charCodeAt(++e.position);
        V.push(e.input.slice(G, e.position));
      }
      Z !== 0 && ue(e), f.call(J, re) ? J[re](e, re, V) : $(e, 'unknown document directive "' + re + '"');
    }
    if (ie(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ie(e, !0, -1)) : te && F(e, "directives end mark is expected"), xe(e, e.lineIndent - 1, n, !1, !0), ie(e, !0, -1), e.checkLineBreaks && m.test(e.input.slice(B, e.position)) && $(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ae(e)) {
      e.input.charCodeAt(e.position) === 46 && (e.position += 3, ie(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      F(e, "end of the stream or a document separator is expected");
    else
      return;
  }
  function Me(e, B) {
    e = String(e), B = B || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var G = new N(e, B), re = e.indexOf("\0");
    for (re !== -1 && (G.position = re, F(G, "null byte is not allowed in input")), G.input += "\0"; G.input.charCodeAt(G.position) === 32; )
      G.lineIndent += 1, G.position += 1;
    for (; G.position < G.length - 1; )
      Ce(G);
    return G.documents;
  }
  function vt(e, B, G) {
    B !== null && typeof B == "object" && typeof G > "u" && (G = B, B = null);
    var re = Me(e, G);
    if (typeof B != "function")
      return re;
    for (var V = 0, te = re.length; V < te; V += 1)
      B(re[V]);
  }
  function ot(e, B) {
    var G = Me(e, B);
    if (G.length !== 0) {
      if (G.length === 1)
        return G[0];
      throw new u("expected a single document in the stream, but found more");
    }
  }
  return Lr.loadAll = vt, Lr.load = ot, Lr;
}
var ri = {}, Yo;
function Xc() {
  if (Yo) return ri;
  Yo = 1;
  var t = vr(), u = Er(), d = ra(), c = Object.prototype.toString, f = Object.prototype.hasOwnProperty, l = 65279, i = 9, h = 10, n = 13, o = 32, a = 33, s = 34, r = 35, m = 37, v = 38, E = 39, p = 42, S = 44, R = 45, O = 58, P = 61, M = 62, C = 63, A = 64, T = 91, y = 93, q = 96, U = 123, L = 124, k = 125, N = {};
  N[0] = "\\0", N[7] = "\\a", N[8] = "\\b", N[9] = "\\t", N[10] = "\\n", N[11] = "\\v", N[12] = "\\f", N[13] = "\\r", N[27] = "\\e", N[34] = '\\"', N[92] = "\\\\", N[133] = "\\N", N[160] = "\\_", N[8232] = "\\L", N[8233] = "\\P";
  var I = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], F = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function $(w, j) {
    var X, Y, Q, ee, fe, oe, he;
    if (j === null) return {};
    for (X = {}, Y = Object.keys(j), Q = 0, ee = Y.length; Q < ee; Q += 1)
      fe = Y[Q], oe = String(j[fe]), fe.slice(0, 2) === "!!" && (fe = "tag:yaml.org,2002:" + fe.slice(2)), he = w.compiledTypeMap.fallback[fe], he && f.call(he.styleAliases, oe) && (oe = he.styleAliases[oe]), X[fe] = oe;
    return X;
  }
  function J(w) {
    var j, X, Y;
    if (j = w.toString(16).toUpperCase(), w <= 255)
      X = "x", Y = 2;
    else if (w <= 65535)
      X = "u", Y = 4;
    else if (w <= 4294967295)
      X = "U", Y = 8;
    else
      throw new u("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + X + t.repeat("0", Y - j.length) + j;
  }
  var W = 1, ne = 2;
  function ce(w) {
    this.schema = w.schema || d, this.indent = Math.max(1, w.indent || 2), this.noArrayIndent = w.noArrayIndent || !1, this.skipInvalid = w.skipInvalid || !1, this.flowLevel = t.isNothing(w.flowLevel) ? -1 : w.flowLevel, this.styleMap = $(this.schema, w.styles || null), this.sortKeys = w.sortKeys || !1, this.lineWidth = w.lineWidth || 80, this.noRefs = w.noRefs || !1, this.noCompatMode = w.noCompatMode || !1, this.condenseFlow = w.condenseFlow || !1, this.quotingType = w.quotingType === '"' ? ne : W, this.forceQuotes = w.forceQuotes || !1, this.replacer = typeof w.replacer == "function" ? w.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(w, j) {
    for (var X = t.repeat(" ", j), Y = 0, Q = -1, ee = "", fe, oe = w.length; Y < oe; )
      Q = w.indexOf(`
`, Y), Q === -1 ? (fe = w.slice(Y), Y = oe) : (fe = w.slice(Y, Q + 1), Y = Q + 1), fe.length && fe !== `
` && (ee += X), ee += fe;
    return ee;
  }
  function ie(w, j) {
    return `
` + t.repeat(" ", w.indent * j);
  }
  function Ae(w, j) {
    var X, Y, Q;
    for (X = 0, Y = w.implicitTypes.length; X < Y; X += 1)
      if (Q = w.implicitTypes[X], Q.resolve(j))
        return !0;
    return !1;
  }
  function K(w) {
    return w === o || w === i;
  }
  function Ee(w) {
    return 32 <= w && w <= 126 || 161 <= w && w <= 55295 && w !== 8232 && w !== 8233 || 57344 <= w && w <= 65533 && w !== l || 65536 <= w && w <= 1114111;
  }
  function _(w) {
    return Ee(w) && w !== l && w !== n && w !== h;
  }
  function g(w, j, X) {
    var Y = _(w), Q = Y && !K(w);
    return (
      // ns-plain-safe
      (X ? (
        // c = flow-in
        Y
      ) : Y && w !== S && w !== T && w !== y && w !== U && w !== k) && w !== r && !(j === O && !Q) || _(j) && !K(j) && w === r || j === O && Q
    );
  }
  function H(w) {
    return Ee(w) && w !== l && !K(w) && w !== R && w !== C && w !== O && w !== S && w !== T && w !== y && w !== U && w !== k && w !== r && w !== v && w !== p && w !== a && w !== L && w !== P && w !== M && w !== E && w !== s && w !== m && w !== A && w !== q;
  }
  function D(w) {
    return !K(w) && w !== O;
  }
  function le(w, j) {
    var X = w.charCodeAt(j), Y;
    return X >= 55296 && X <= 56319 && j + 1 < w.length && (Y = w.charCodeAt(j + 1), Y >= 56320 && Y <= 57343) ? (X - 55296) * 1024 + Y - 56320 + 65536 : X;
  }
  function me(w) {
    var j = /^\n* /;
    return j.test(w);
  }
  var pe = 1, _e = 2, ye = 3, xe = 4, Ce = 5;
  function Me(w, j, X, Y, Q, ee, fe, oe) {
    var he, we = 0, Oe = null, Ne = !1, Re = !1, Nt = Y !== -1, Qe = -1, Et = H(le(w, 0)) && D(le(w, w.length - 1));
    if (j || fe)
      for (he = 0; he < w.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(w, he), !Ee(we))
          return Ce;
        Et = Et && g(we, Oe, oe), Oe = we;
      }
    else {
      for (he = 0; he < w.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(w, he), we === h)
          Ne = !0, Nt && (Re = Re || // Foldable line = too long, and not more-indented.
          he - Qe - 1 > Y && w[Qe + 1] !== " ", Qe = he);
        else if (!Ee(we))
          return Ce;
        Et = Et && g(we, Oe, oe), Oe = we;
      }
      Re = Re || Nt && he - Qe - 1 > Y && w[Qe + 1] !== " ";
    }
    return !Ne && !Re ? Et && !fe && !Q(w) ? pe : ee === ne ? Ce : _e : X > 9 && me(w) ? Ce : fe ? ee === ne ? Ce : _e : Re ? xe : ye;
  }
  function vt(w, j, X, Y, Q) {
    w.dump = function() {
      if (j.length === 0)
        return w.quotingType === ne ? '""' : "''";
      if (!w.noCompatMode && (I.indexOf(j) !== -1 || F.test(j)))
        return w.quotingType === ne ? '"' + j + '"' : "'" + j + "'";
      var ee = w.indent * Math.max(1, X), fe = w.lineWidth === -1 ? -1 : Math.max(Math.min(w.lineWidth, 40), w.lineWidth - ee), oe = Y || w.flowLevel > -1 && X >= w.flowLevel;
      function he(we) {
        return Ae(w, we);
      }
      switch (Me(
        j,
        oe,
        w.indent,
        fe,
        he,
        w.quotingType,
        w.forceQuotes && !Y,
        Q
      )) {
        case pe:
          return j;
        case _e:
          return "'" + j.replace(/'/g, "''") + "'";
        case ye:
          return "|" + ot(j, w.indent) + e(ue(j, ee));
        case xe:
          return ">" + ot(j, w.indent) + e(ue(B(j, fe), ee));
        case Ce:
          return '"' + re(j) + '"';
        default:
          throw new u("impossible error: invalid scalar style");
      }
    }();
  }
  function ot(w, j) {
    var X = me(w) ? String(j) : "", Y = w[w.length - 1] === `
`, Q = Y && (w[w.length - 2] === `
` || w === `
`), ee = Q ? "+" : Y ? "" : "-";
    return X + ee + `
`;
  }
  function e(w) {
    return w[w.length - 1] === `
` ? w.slice(0, -1) : w;
  }
  function B(w, j) {
    for (var X = /(\n+)([^\n]*)/g, Y = function() {
      var we = w.indexOf(`
`);
      return we = we !== -1 ? we : w.length, X.lastIndex = we, G(w.slice(0, we), j);
    }(), Q = w[0] === `
` || w[0] === " ", ee, fe; fe = X.exec(w); ) {
      var oe = fe[1], he = fe[2];
      ee = he[0] === " ", Y += oe + (!Q && !ee && he !== "" ? `
` : "") + G(he, j), Q = ee;
    }
    return Y;
  }
  function G(w, j) {
    if (w === "" || w[0] === " ") return w;
    for (var X = / [^ ]/g, Y, Q = 0, ee, fe = 0, oe = 0, he = ""; Y = X.exec(w); )
      oe = Y.index, oe - Q > j && (ee = fe > Q ? fe : oe, he += `
` + w.slice(Q, ee), Q = ee + 1), fe = oe;
    return he += `
`, w.length - Q > j && fe > Q ? he += w.slice(Q, fe) + `
` + w.slice(fe + 1) : he += w.slice(Q), he.slice(1);
  }
  function re(w) {
    for (var j = "", X = 0, Y, Q = 0; Q < w.length; X >= 65536 ? Q += 2 : Q++)
      X = le(w, Q), Y = N[X], !Y && Ee(X) ? (j += w[Q], X >= 65536 && (j += w[Q + 1])) : j += Y || J(X);
    return j;
  }
  function V(w, j, X) {
    var Y = "", Q = w.tag, ee, fe, oe;
    for (ee = 0, fe = X.length; ee < fe; ee += 1)
      oe = X[ee], w.replacer && (oe = w.replacer.call(X, String(ee), oe)), (ve(w, j, oe, !1, !1) || typeof oe > "u" && ve(w, j, null, !1, !1)) && (Y !== "" && (Y += "," + (w.condenseFlow ? "" : " ")), Y += w.dump);
    w.tag = Q, w.dump = "[" + Y + "]";
  }
  function te(w, j, X, Y) {
    var Q = "", ee = w.tag, fe, oe, he;
    for (fe = 0, oe = X.length; fe < oe; fe += 1)
      he = X[fe], w.replacer && (he = w.replacer.call(X, String(fe), he)), (ve(w, j + 1, he, !0, !0, !1, !0) || typeof he > "u" && ve(w, j + 1, null, !0, !0, !1, !0)) && ((!Y || Q !== "") && (Q += ie(w, j)), w.dump && h === w.dump.charCodeAt(0) ? Q += "-" : Q += "- ", Q += w.dump);
    w.tag = ee, w.dump = Q || "[]";
  }
  function Z(w, j, X) {
    var Y = "", Q = w.tag, ee = Object.keys(X), fe, oe, he, we, Oe;
    for (fe = 0, oe = ee.length; fe < oe; fe += 1)
      Oe = "", Y !== "" && (Oe += ", "), w.condenseFlow && (Oe += '"'), he = ee[fe], we = X[he], w.replacer && (we = w.replacer.call(X, he, we)), ve(w, j, he, !1, !1) && (w.dump.length > 1024 && (Oe += "? "), Oe += w.dump + (w.condenseFlow ? '"' : "") + ":" + (w.condenseFlow ? "" : " "), ve(w, j, we, !1, !1) && (Oe += w.dump, Y += Oe));
    w.tag = Q, w.dump = "{" + Y + "}";
  }
  function ae(w, j, X, Y) {
    var Q = "", ee = w.tag, fe = Object.keys(X), oe, he, we, Oe, Ne, Re;
    if (w.sortKeys === !0)
      fe.sort();
    else if (typeof w.sortKeys == "function")
      fe.sort(w.sortKeys);
    else if (w.sortKeys)
      throw new u("sortKeys must be a boolean or a function");
    for (oe = 0, he = fe.length; oe < he; oe += 1)
      Re = "", (!Y || Q !== "") && (Re += ie(w, j)), we = fe[oe], Oe = X[we], w.replacer && (Oe = w.replacer.call(X, we, Oe)), ve(w, j + 1, we, !0, !0, !0) && (Ne = w.tag !== null && w.tag !== "?" || w.dump && w.dump.length > 1024, Ne && (w.dump && h === w.dump.charCodeAt(0) ? Re += "?" : Re += "? "), Re += w.dump, Ne && (Re += ie(w, j)), ve(w, j + 1, Oe, !0, Ne) && (w.dump && h === w.dump.charCodeAt(0) ? Re += ":" : Re += ": ", Re += w.dump, Q += Re));
    w.tag = ee, w.dump = Q || "{}";
  }
  function ge(w, j, X) {
    var Y, Q, ee, fe, oe, he;
    for (Q = X ? w.explicitTypes : w.implicitTypes, ee = 0, fe = Q.length; ee < fe; ee += 1)
      if (oe = Q[ee], (oe.instanceOf || oe.predicate) && (!oe.instanceOf || typeof j == "object" && j instanceof oe.instanceOf) && (!oe.predicate || oe.predicate(j))) {
        if (X ? oe.multi && oe.representName ? w.tag = oe.representName(j) : w.tag = oe.tag : w.tag = "?", oe.represent) {
          if (he = w.styleMap[oe.tag] || oe.defaultStyle, c.call(oe.represent) === "[object Function]")
            Y = oe.represent(j, he);
          else if (f.call(oe.represent, he))
            Y = oe.represent[he](j, he);
          else
            throw new u("!<" + oe.tag + '> tag resolver accepts not "' + he + '" style');
          w.dump = Y;
        }
        return !0;
      }
    return !1;
  }
  function ve(w, j, X, Y, Q, ee, fe) {
    w.tag = null, w.dump = X, ge(w, X, !1) || ge(w, X, !0);
    var oe = c.call(w.dump), he = Y, we;
    Y && (Y = w.flowLevel < 0 || w.flowLevel > j);
    var Oe = oe === "[object Object]" || oe === "[object Array]", Ne, Re;
    if (Oe && (Ne = w.duplicates.indexOf(X), Re = Ne !== -1), (w.tag !== null && w.tag !== "?" || Re || w.indent !== 2 && j > 0) && (Q = !1), Re && w.usedDuplicates[Ne])
      w.dump = "*ref_" + Ne;
    else {
      if (Oe && Re && !w.usedDuplicates[Ne] && (w.usedDuplicates[Ne] = !0), oe === "[object Object]")
        Y && Object.keys(w.dump).length !== 0 ? (ae(w, j, w.dump, Q), Re && (w.dump = "&ref_" + Ne + w.dump)) : (Z(w, j, w.dump), Re && (w.dump = "&ref_" + Ne + " " + w.dump));
      else if (oe === "[object Array]")
        Y && w.dump.length !== 0 ? (w.noArrayIndent && !fe && j > 0 ? te(w, j - 1, w.dump, Q) : te(w, j, w.dump, Q), Re && (w.dump = "&ref_" + Ne + w.dump)) : (V(w, j, w.dump), Re && (w.dump = "&ref_" + Ne + " " + w.dump));
      else if (oe === "[object String]")
        w.tag !== "?" && vt(w, w.dump, j, ee, he);
      else {
        if (oe === "[object Undefined]")
          return !1;
        if (w.skipInvalid) return !1;
        throw new u("unacceptable kind of an object to dump " + oe);
      }
      w.tag !== null && w.tag !== "?" && (we = encodeURI(
        w.tag[0] === "!" ? w.tag.slice(1) : w.tag
      ).replace(/!/g, "%21"), w.tag[0] === "!" ? we = "!" + we : we.slice(0, 18) === "tag:yaml.org,2002:" ? we = "!!" + we.slice(18) : we = "!<" + we + ">", w.dump = we + " " + w.dump);
    }
    return !0;
  }
  function Te(w, j) {
    var X = [], Y = [], Q, ee;
    for (de(w, X, Y), Q = 0, ee = Y.length; Q < ee; Q += 1)
      j.duplicates.push(X[Y[Q]]);
    j.usedDuplicates = new Array(ee);
  }
  function de(w, j, X) {
    var Y, Q, ee;
    if (w !== null && typeof w == "object")
      if (Q = j.indexOf(w), Q !== -1)
        X.indexOf(Q) === -1 && X.push(Q);
      else if (j.push(w), Array.isArray(w))
        for (Q = 0, ee = w.length; Q < ee; Q += 1)
          de(w[Q], j, X);
      else
        for (Y = Object.keys(w), Q = 0, ee = Y.length; Q < ee; Q += 1)
          de(w[Y[Q]], j, X);
  }
  function Le(w, j) {
    j = j || {};
    var X = new ce(j);
    X.noRefs || Te(w, X);
    var Y = w;
    return X.replacer && (Y = X.replacer.call({ "": Y }, "", Y)), ve(X, 0, Y, !0, !0) ? X.dump + `
` : "";
  }
  return ri.dump = Le, ri;
}
var zo;
function na() {
  if (zo) return je;
  zo = 1;
  var t = zc(), u = Xc();
  function d(c, f) {
    return function() {
      throw new Error("Function yaml." + c + " is removed in js-yaml 4. Use yaml." + f + " instead, which is now safe by default.");
    };
  }
  return je.Type = Ge(), je.Schema = Ll(), je.FAILSAFE_SCHEMA = ql(), je.JSON_SCHEMA = Gl(), je.CORE_SCHEMA = Wl(), je.DEFAULT_SCHEMA = ra(), je.load = t.load, je.loadAll = t.loadAll, je.dump = u.dump, je.YAMLException = Er(), je.types = {
    binary: zl(),
    float: jl(),
    map: kl(),
    null: Ml(),
    pairs: Kl(),
    set: Jl(),
    timestamp: Vl(),
    bool: Bl(),
    int: Hl(),
    merge: Yl(),
    omap: Xl(),
    seq: $l(),
    str: Ul()
  }, je.safeLoad = d("safeLoad", "load"), je.safeLoadAll = d("safeLoadAll", "loadAll"), je.safeDump = d("safeDump", "dump"), je;
}
var Kt = {}, Xo;
function Kc() {
  if (Xo) return Kt;
  Xo = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.Lazy = void 0;
  class t {
    constructor(d) {
      this._value = null, this.creator = d;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const d = this.creator();
      return this.value = d, d;
    }
    set value(d) {
      this._value = d, this.creator = null;
    }
  }
  return Kt.Lazy = t, Kt;
}
var Ur = { exports: {} }, ni, Ko;
function jr() {
  if (Ko) return ni;
  Ko = 1;
  const t = "2.0.0", u = 256, d = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, c = 16, f = u - 6;
  return ni = {
    MAX_LENGTH: u,
    MAX_SAFE_COMPONENT_LENGTH: c,
    MAX_SAFE_BUILD_LENGTH: f,
    MAX_SAFE_INTEGER: d,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: t,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, ni;
}
var ii, Jo;
function Gr() {
  return Jo || (Jo = 1, ii = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...u) => console.error("SEMVER", ...u) : () => {
  }), ii;
}
var Qo;
function yr() {
  return Qo || (Qo = 1, function(t, u) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: d,
      MAX_SAFE_BUILD_LENGTH: c,
      MAX_LENGTH: f
    } = jr(), l = Gr();
    u = t.exports = {};
    const i = u.re = [], h = u.safeRe = [], n = u.src = [], o = u.safeSrc = [], a = u.t = {};
    let s = 0;
    const r = "[a-zA-Z0-9-]", m = [
      ["\\s", 1],
      ["\\d", f],
      [r, c]
    ], v = (p) => {
      for (const [S, R] of m)
        p = p.split(`${S}*`).join(`${S}{0,${R}}`).split(`${S}+`).join(`${S}{1,${R}}`);
      return p;
    }, E = (p, S, R) => {
      const O = v(S), P = s++;
      l(p, P, S), a[p] = P, n[P] = S, o[P] = O, i[P] = new RegExp(S, R ? "g" : void 0), h[P] = new RegExp(O, R ? "g" : void 0);
    };
    E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${r}*`), E("MAINVERSION", `(${n[a.NUMERICIDENTIFIER]})\\.(${n[a.NUMERICIDENTIFIER]})\\.(${n[a.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${n[a.NUMERICIDENTIFIERLOOSE]})\\.(${n[a.NUMERICIDENTIFIERLOOSE]})\\.(${n[a.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${n[a.NONNUMERICIDENTIFIER]}|${n[a.NUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${n[a.NONNUMERICIDENTIFIER]}|${n[a.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASE", `(?:-(${n[a.PRERELEASEIDENTIFIER]}(?:\\.${n[a.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${n[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[a.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${r}+`), E("BUILD", `(?:\\+(${n[a.BUILDIDENTIFIER]}(?:\\.${n[a.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${n[a.MAINVERSION]}${n[a.PRERELEASE]}?${n[a.BUILD]}?`), E("FULL", `^${n[a.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${n[a.MAINVERSIONLOOSE]}${n[a.PRERELEASELOOSE]}?${n[a.BUILD]}?`), E("LOOSE", `^${n[a.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${n[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${n[a.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${n[a.XRANGEIDENTIFIER]})(?:\\.(${n[a.XRANGEIDENTIFIER]})(?:\\.(${n[a.XRANGEIDENTIFIER]})(?:${n[a.PRERELEASE]})?${n[a.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${n[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[a.XRANGEIDENTIFIERLOOSE]})(?:${n[a.PRERELEASELOOSE]})?${n[a.BUILD]}?)?)?`), E("XRANGE", `^${n[a.GTLT]}\\s*${n[a.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${n[a.GTLT]}\\s*${n[a.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${d}})(?:\\.(\\d{1,${d}}))?(?:\\.(\\d{1,${d}}))?`), E("COERCE", `${n[a.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", n[a.COERCEPLAIN] + `(?:${n[a.PRERELEASE]})?(?:${n[a.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", n[a.COERCE], !0), E("COERCERTLFULL", n[a.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${n[a.LONETILDE]}\\s+`, !0), u.tildeTrimReplace = "$1~", E("TILDE", `^${n[a.LONETILDE]}${n[a.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${n[a.LONETILDE]}${n[a.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${n[a.LONECARET]}\\s+`, !0), u.caretTrimReplace = "$1^", E("CARET", `^${n[a.LONECARET]}${n[a.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${n[a.LONECARET]}${n[a.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${n[a.GTLT]}\\s*(${n[a.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${n[a.GTLT]}\\s*(${n[a.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${n[a.GTLT]}\\s*(${n[a.LOOSEPLAIN]}|${n[a.XRANGEPLAIN]})`, !0), u.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${n[a.XRANGEPLAIN]})\\s+-\\s+(${n[a.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${n[a.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[a.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(Ur, Ur.exports)), Ur.exports;
}
var ai, Zo;
function ia() {
  if (Zo) return ai;
  Zo = 1;
  const t = Object.freeze({ loose: !0 }), u = Object.freeze({});
  return ai = (c) => c ? typeof c != "object" ? t : c : u, ai;
}
var oi, es;
function Ql() {
  if (es) return oi;
  es = 1;
  const t = /^[0-9]+$/, u = (c, f) => {
    const l = t.test(c), i = t.test(f);
    return l && i && (c = +c, f = +f), c === f ? 0 : l && !i ? -1 : i && !l ? 1 : c < f ? -1 : 1;
  };
  return oi = {
    compareIdentifiers: u,
    rcompareIdentifiers: (c, f) => u(f, c)
  }, oi;
}
var si, ts;
function We() {
  if (ts) return si;
  ts = 1;
  const t = Gr(), { MAX_LENGTH: u, MAX_SAFE_INTEGER: d } = jr(), { safeRe: c, t: f } = yr(), l = ia(), { compareIdentifiers: i } = Ql();
  class h {
    constructor(o, a) {
      if (a = l(a), o instanceof h) {
        if (o.loose === !!a.loose && o.includePrerelease === !!a.includePrerelease)
          return o;
        o = o.version;
      } else if (typeof o != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof o}".`);
      if (o.length > u)
        throw new TypeError(
          `version is longer than ${u} characters`
        );
      t("SemVer", o, a), this.options = a, this.loose = !!a.loose, this.includePrerelease = !!a.includePrerelease;
      const s = o.trim().match(a.loose ? c[f.LOOSE] : c[f.FULL]);
      if (!s)
        throw new TypeError(`Invalid Version: ${o}`);
      if (this.raw = o, this.major = +s[1], this.minor = +s[2], this.patch = +s[3], this.major > d || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > d || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > d || this.patch < 0)
        throw new TypeError("Invalid patch version");
      s[4] ? this.prerelease = s[4].split(".").map((r) => {
        if (/^[0-9]+$/.test(r)) {
          const m = +r;
          if (m >= 0 && m < d)
            return m;
        }
        return r;
      }) : this.prerelease = [], this.build = s[5] ? s[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(o) {
      if (t("SemVer.compare", this.version, this.options, o), !(o instanceof h)) {
        if (typeof o == "string" && o === this.version)
          return 0;
        o = new h(o, this.options);
      }
      return o.version === this.version ? 0 : this.compareMain(o) || this.comparePre(o);
    }
    compareMain(o) {
      return o instanceof h || (o = new h(o, this.options)), i(this.major, o.major) || i(this.minor, o.minor) || i(this.patch, o.patch);
    }
    comparePre(o) {
      if (o instanceof h || (o = new h(o, this.options)), this.prerelease.length && !o.prerelease.length)
        return -1;
      if (!this.prerelease.length && o.prerelease.length)
        return 1;
      if (!this.prerelease.length && !o.prerelease.length)
        return 0;
      let a = 0;
      do {
        const s = this.prerelease[a], r = o.prerelease[a];
        if (t("prerelease compare", a, s, r), s === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (s === void 0)
          return -1;
        if (s === r)
          continue;
        return i(s, r);
      } while (++a);
    }
    compareBuild(o) {
      o instanceof h || (o = new h(o, this.options));
      let a = 0;
      do {
        const s = this.build[a], r = o.build[a];
        if (t("build compare", a, s, r), s === void 0 && r === void 0)
          return 0;
        if (r === void 0)
          return 1;
        if (s === void 0)
          return -1;
        if (s === r)
          continue;
        return i(s, r);
      } while (++a);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(o, a, s) {
      if (o.startsWith("pre")) {
        if (!a && s === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (a) {
          const r = `-${a}`.match(this.options.loose ? c[f.PRERELEASELOOSE] : c[f.PRERELEASE]);
          if (!r || r[1] !== a)
            throw new Error(`invalid identifier: ${a}`);
        }
      }
      switch (o) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", a, s);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", a, s);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", a, s), this.inc("pre", a, s);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", a, s), this.inc("pre", a, s);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const r = Number(s) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [r];
          else {
            let m = this.prerelease.length;
            for (; --m >= 0; )
              typeof this.prerelease[m] == "number" && (this.prerelease[m]++, m = -2);
            if (m === -1) {
              if (a === this.prerelease.join(".") && s === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(r);
            }
          }
          if (a) {
            let m = [a, r];
            s === !1 && (m = [a]), i(this.prerelease[0], a) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = m) : this.prerelease = m;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${o}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return si = h, si;
}
var li, rs;
function Ht() {
  if (rs) return li;
  rs = 1;
  const t = We();
  return li = (d, c, f = !1) => {
    if (d instanceof t)
      return d;
    try {
      return new t(d, c);
    } catch (l) {
      if (!f)
        return null;
      throw l;
    }
  }, li;
}
var ui, ns;
function Jc() {
  if (ns) return ui;
  ns = 1;
  const t = Ht();
  return ui = (d, c) => {
    const f = t(d, c);
    return f ? f.version : null;
  }, ui;
}
var ci, is;
function Qc() {
  if (is) return ci;
  is = 1;
  const t = Ht();
  return ci = (d, c) => {
    const f = t(d.trim().replace(/^[=v]+/, ""), c);
    return f ? f.version : null;
  }, ci;
}
var fi, as;
function Zc() {
  if (as) return fi;
  as = 1;
  const t = We();
  return fi = (d, c, f, l, i) => {
    typeof f == "string" && (i = l, l = f, f = void 0);
    try {
      return new t(
        d instanceof t ? d.version : d,
        f
      ).inc(c, l, i).version;
    } catch {
      return null;
    }
  }, fi;
}
var di, os;
function ef() {
  if (os) return di;
  os = 1;
  const t = Ht();
  return di = (d, c) => {
    const f = t(d, null, !0), l = t(c, null, !0), i = f.compare(l);
    if (i === 0)
      return null;
    const h = i > 0, n = h ? f : l, o = h ? l : f, a = !!n.prerelease.length;
    if (!!o.prerelease.length && !a) {
      if (!o.patch && !o.minor)
        return "major";
      if (o.compareMain(n) === 0)
        return o.minor && !o.patch ? "minor" : "patch";
    }
    const r = a ? "pre" : "";
    return f.major !== l.major ? r + "major" : f.minor !== l.minor ? r + "minor" : f.patch !== l.patch ? r + "patch" : "prerelease";
  }, di;
}
var hi, ss;
function tf() {
  if (ss) return hi;
  ss = 1;
  const t = We();
  return hi = (d, c) => new t(d, c).major, hi;
}
var pi, ls;
function rf() {
  if (ls) return pi;
  ls = 1;
  const t = We();
  return pi = (d, c) => new t(d, c).minor, pi;
}
var mi, us;
function nf() {
  if (us) return mi;
  us = 1;
  const t = We();
  return mi = (d, c) => new t(d, c).patch, mi;
}
var gi, cs;
function af() {
  if (cs) return gi;
  cs = 1;
  const t = Ht();
  return gi = (d, c) => {
    const f = t(d, c);
    return f && f.prerelease.length ? f.prerelease : null;
  }, gi;
}
var vi, fs;
function tt() {
  if (fs) return vi;
  fs = 1;
  const t = We();
  return vi = (d, c, f) => new t(d, f).compare(new t(c, f)), vi;
}
var Ei, ds;
function of() {
  if (ds) return Ei;
  ds = 1;
  const t = tt();
  return Ei = (d, c, f) => t(c, d, f), Ei;
}
var yi, hs;
function sf() {
  if (hs) return yi;
  hs = 1;
  const t = tt();
  return yi = (d, c) => t(d, c, !0), yi;
}
var wi, ps;
function aa() {
  if (ps) return wi;
  ps = 1;
  const t = We();
  return wi = (d, c, f) => {
    const l = new t(d, f), i = new t(c, f);
    return l.compare(i) || l.compareBuild(i);
  }, wi;
}
var _i, ms;
function lf() {
  if (ms) return _i;
  ms = 1;
  const t = aa();
  return _i = (d, c) => d.sort((f, l) => t(f, l, c)), _i;
}
var Si, gs;
function uf() {
  if (gs) return Si;
  gs = 1;
  const t = aa();
  return Si = (d, c) => d.sort((f, l) => t(l, f, c)), Si;
}
var Ai, vs;
function Wr() {
  if (vs) return Ai;
  vs = 1;
  const t = tt();
  return Ai = (d, c, f) => t(d, c, f) > 0, Ai;
}
var Ti, Es;
function oa() {
  if (Es) return Ti;
  Es = 1;
  const t = tt();
  return Ti = (d, c, f) => t(d, c, f) < 0, Ti;
}
var Ri, ys;
function Zl() {
  if (ys) return Ri;
  ys = 1;
  const t = tt();
  return Ri = (d, c, f) => t(d, c, f) === 0, Ri;
}
var Ci, ws;
function eu() {
  if (ws) return Ci;
  ws = 1;
  const t = tt();
  return Ci = (d, c, f) => t(d, c, f) !== 0, Ci;
}
var bi, _s;
function sa() {
  if (_s) return bi;
  _s = 1;
  const t = tt();
  return bi = (d, c, f) => t(d, c, f) >= 0, bi;
}
var Oi, Ss;
function la() {
  if (Ss) return Oi;
  Ss = 1;
  const t = tt();
  return Oi = (d, c, f) => t(d, c, f) <= 0, Oi;
}
var Pi, As;
function tu() {
  if (As) return Pi;
  As = 1;
  const t = Zl(), u = eu(), d = Wr(), c = sa(), f = oa(), l = la();
  return Pi = (h, n, o, a) => {
    switch (n) {
      case "===":
        return typeof h == "object" && (h = h.version), typeof o == "object" && (o = o.version), h === o;
      case "!==":
        return typeof h == "object" && (h = h.version), typeof o == "object" && (o = o.version), h !== o;
      case "":
      case "=":
      case "==":
        return t(h, o, a);
      case "!=":
        return u(h, o, a);
      case ">":
        return d(h, o, a);
      case ">=":
        return c(h, o, a);
      case "<":
        return f(h, o, a);
      case "<=":
        return l(h, o, a);
      default:
        throw new TypeError(`Invalid operator: ${n}`);
    }
  }, Pi;
}
var Ii, Ts;
function cf() {
  if (Ts) return Ii;
  Ts = 1;
  const t = We(), u = Ht(), { safeRe: d, t: c } = yr();
  return Ii = (l, i) => {
    if (l instanceof t)
      return l;
    if (typeof l == "number" && (l = String(l)), typeof l != "string")
      return null;
    i = i || {};
    let h = null;
    if (!i.rtl)
      h = l.match(i.includePrerelease ? d[c.COERCEFULL] : d[c.COERCE]);
    else {
      const m = i.includePrerelease ? d[c.COERCERTLFULL] : d[c.COERCERTL];
      let v;
      for (; (v = m.exec(l)) && (!h || h.index + h[0].length !== l.length); )
        (!h || v.index + v[0].length !== h.index + h[0].length) && (h = v), m.lastIndex = v.index + v[1].length + v[2].length;
      m.lastIndex = -1;
    }
    if (h === null)
      return null;
    const n = h[2], o = h[3] || "0", a = h[4] || "0", s = i.includePrerelease && h[5] ? `-${h[5]}` : "", r = i.includePrerelease && h[6] ? `+${h[6]}` : "";
    return u(`${n}.${o}.${a}${s}${r}`, i);
  }, Ii;
}
var Di, Rs;
function ff() {
  if (Rs) return Di;
  Rs = 1;
  class t {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(d) {
      const c = this.map.get(d);
      if (c !== void 0)
        return this.map.delete(d), this.map.set(d, c), c;
    }
    delete(d) {
      return this.map.delete(d);
    }
    set(d, c) {
      if (!this.delete(d) && c !== void 0) {
        if (this.map.size >= this.max) {
          const l = this.map.keys().next().value;
          this.delete(l);
        }
        this.map.set(d, c);
      }
      return this;
    }
  }
  return Di = t, Di;
}
var Ni, Cs;
function rt() {
  if (Cs) return Ni;
  Cs = 1;
  const t = /\s+/g;
  class u {
    constructor(I, F) {
      if (F = f(F), I instanceof u)
        return I.loose === !!F.loose && I.includePrerelease === !!F.includePrerelease ? I : new u(I.raw, F);
      if (I instanceof l)
        return this.raw = I.value, this.set = [[I]], this.formatted = void 0, this;
      if (this.options = F, this.loose = !!F.loose, this.includePrerelease = !!F.includePrerelease, this.raw = I.trim().replace(t, " "), this.set = this.raw.split("||").map(($) => this.parseRange($.trim())).filter(($) => $.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const $ = this.set[0];
        if (this.set = this.set.filter((J) => !E(J[0])), this.set.length === 0)
          this.set = [$];
        else if (this.set.length > 1) {
          for (const J of this.set)
            if (J.length === 1 && p(J[0])) {
              this.set = [J];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let I = 0; I < this.set.length; I++) {
          I > 0 && (this.formatted += "||");
          const F = this.set[I];
          for (let $ = 0; $ < F.length; $++)
            $ > 0 && (this.formatted += " "), this.formatted += F[$].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(I) {
      const $ = ((this.options.includePrerelease && m) | (this.options.loose && v)) + ":" + I, J = c.get($);
      if (J)
        return J;
      const W = this.options.loose, ne = W ? n[o.HYPHENRANGELOOSE] : n[o.HYPHENRANGE];
      I = I.replace(ne, L(this.options.includePrerelease)), i("hyphen replace", I), I = I.replace(n[o.COMPARATORTRIM], a), i("comparator trim", I), I = I.replace(n[o.TILDETRIM], s), i("tilde trim", I), I = I.replace(n[o.CARETTRIM], r), i("caret trim", I);
      let ce = I.split(" ").map((K) => R(K, this.options)).join(" ").split(/\s+/).map((K) => U(K, this.options));
      W && (ce = ce.filter((K) => (i("loose invalid filter", K, this.options), !!K.match(n[o.COMPARATORLOOSE])))), i("range list", ce);
      const ue = /* @__PURE__ */ new Map(), ie = ce.map((K) => new l(K, this.options));
      for (const K of ie) {
        if (E(K))
          return [K];
        ue.set(K.value, K);
      }
      ue.size > 1 && ue.has("") && ue.delete("");
      const Ae = [...ue.values()];
      return c.set($, Ae), Ae;
    }
    intersects(I, F) {
      if (!(I instanceof u))
        throw new TypeError("a Range is required");
      return this.set.some(($) => S($, F) && I.set.some((J) => S(J, F) && $.every((W) => J.every((ne) => W.intersects(ne, F)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(I) {
      if (!I)
        return !1;
      if (typeof I == "string")
        try {
          I = new h(I, this.options);
        } catch {
          return !1;
        }
      for (let F = 0; F < this.set.length; F++)
        if (k(this.set[F], I, this.options))
          return !0;
      return !1;
    }
  }
  Ni = u;
  const d = ff(), c = new d(), f = ia(), l = Vr(), i = Gr(), h = We(), {
    safeRe: n,
    t: o,
    comparatorTrimReplace: a,
    tildeTrimReplace: s,
    caretTrimReplace: r
  } = yr(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: v } = jr(), E = (N) => N.value === "<0.0.0-0", p = (N) => N.value === "", S = (N, I) => {
    let F = !0;
    const $ = N.slice();
    let J = $.pop();
    for (; F && $.length; )
      F = $.every((W) => J.intersects(W, I)), J = $.pop();
    return F;
  }, R = (N, I) => (i("comp", N, I), N = C(N, I), i("caret", N), N = P(N, I), i("tildes", N), N = T(N, I), i("xrange", N), N = q(N, I), i("stars", N), N), O = (N) => !N || N.toLowerCase() === "x" || N === "*", P = (N, I) => N.trim().split(/\s+/).map((F) => M(F, I)).join(" "), M = (N, I) => {
    const F = I.loose ? n[o.TILDELOOSE] : n[o.TILDE];
    return N.replace(F, ($, J, W, ne, ce) => {
      i("tilde", N, $, J, W, ne, ce);
      let ue;
      return O(J) ? ue = "" : O(W) ? ue = `>=${J}.0.0 <${+J + 1}.0.0-0` : O(ne) ? ue = `>=${J}.${W}.0 <${J}.${+W + 1}.0-0` : ce ? (i("replaceTilde pr", ce), ue = `>=${J}.${W}.${ne}-${ce} <${J}.${+W + 1}.0-0`) : ue = `>=${J}.${W}.${ne} <${J}.${+W + 1}.0-0`, i("tilde return", ue), ue;
    });
  }, C = (N, I) => N.trim().split(/\s+/).map((F) => A(F, I)).join(" "), A = (N, I) => {
    i("caret", N, I);
    const F = I.loose ? n[o.CARETLOOSE] : n[o.CARET], $ = I.includePrerelease ? "-0" : "";
    return N.replace(F, (J, W, ne, ce, ue) => {
      i("caret", N, J, W, ne, ce, ue);
      let ie;
      return O(W) ? ie = "" : O(ne) ? ie = `>=${W}.0.0${$} <${+W + 1}.0.0-0` : O(ce) ? W === "0" ? ie = `>=${W}.${ne}.0${$} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.0${$} <${+W + 1}.0.0-0` : ue ? (i("replaceCaret pr", ue), W === "0" ? ne === "0" ? ie = `>=${W}.${ne}.${ce}-${ue} <${W}.${ne}.${+ce + 1}-0` : ie = `>=${W}.${ne}.${ce}-${ue} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.${ce}-${ue} <${+W + 1}.0.0-0`) : (i("no pr"), W === "0" ? ne === "0" ? ie = `>=${W}.${ne}.${ce}${$} <${W}.${ne}.${+ce + 1}-0` : ie = `>=${W}.${ne}.${ce}${$} <${W}.${+ne + 1}.0-0` : ie = `>=${W}.${ne}.${ce} <${+W + 1}.0.0-0`), i("caret return", ie), ie;
    });
  }, T = (N, I) => (i("replaceXRanges", N, I), N.split(/\s+/).map((F) => y(F, I)).join(" ")), y = (N, I) => {
    N = N.trim();
    const F = I.loose ? n[o.XRANGELOOSE] : n[o.XRANGE];
    return N.replace(F, ($, J, W, ne, ce, ue) => {
      i("xRange", N, $, J, W, ne, ce, ue);
      const ie = O(W), Ae = ie || O(ne), K = Ae || O(ce), Ee = K;
      return J === "=" && Ee && (J = ""), ue = I.includePrerelease ? "-0" : "", ie ? J === ">" || J === "<" ? $ = "<0.0.0-0" : $ = "*" : J && Ee ? (Ae && (ne = 0), ce = 0, J === ">" ? (J = ">=", Ae ? (W = +W + 1, ne = 0, ce = 0) : (ne = +ne + 1, ce = 0)) : J === "<=" && (J = "<", Ae ? W = +W + 1 : ne = +ne + 1), J === "<" && (ue = "-0"), $ = `${J + W}.${ne}.${ce}${ue}`) : Ae ? $ = `>=${W}.0.0${ue} <${+W + 1}.0.0-0` : K && ($ = `>=${W}.${ne}.0${ue} <${W}.${+ne + 1}.0-0`), i("xRange return", $), $;
    });
  }, q = (N, I) => (i("replaceStars", N, I), N.trim().replace(n[o.STAR], "")), U = (N, I) => (i("replaceGTE0", N, I), N.trim().replace(n[I.includePrerelease ? o.GTE0PRE : o.GTE0], "")), L = (N) => (I, F, $, J, W, ne, ce, ue, ie, Ae, K, Ee) => (O($) ? F = "" : O(J) ? F = `>=${$}.0.0${N ? "-0" : ""}` : O(W) ? F = `>=${$}.${J}.0${N ? "-0" : ""}` : ne ? F = `>=${F}` : F = `>=${F}${N ? "-0" : ""}`, O(ie) ? ue = "" : O(Ae) ? ue = `<${+ie + 1}.0.0-0` : O(K) ? ue = `<${ie}.${+Ae + 1}.0-0` : Ee ? ue = `<=${ie}.${Ae}.${K}-${Ee}` : N ? ue = `<${ie}.${Ae}.${+K + 1}-0` : ue = `<=${ue}`, `${F} ${ue}`.trim()), k = (N, I, F) => {
    for (let $ = 0; $ < N.length; $++)
      if (!N[$].test(I))
        return !1;
    if (I.prerelease.length && !F.includePrerelease) {
      for (let $ = 0; $ < N.length; $++)
        if (i(N[$].semver), N[$].semver !== l.ANY && N[$].semver.prerelease.length > 0) {
          const J = N[$].semver;
          if (J.major === I.major && J.minor === I.minor && J.patch === I.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ni;
}
var Fi, bs;
function Vr() {
  if (bs) return Fi;
  bs = 1;
  const t = Symbol("SemVer ANY");
  class u {
    static get ANY() {
      return t;
    }
    constructor(a, s) {
      if (s = d(s), a instanceof u) {
        if (a.loose === !!s.loose)
          return a;
        a = a.value;
      }
      a = a.trim().split(/\s+/).join(" "), i("comparator", a, s), this.options = s, this.loose = !!s.loose, this.parse(a), this.semver === t ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(a) {
      const s = this.options.loose ? c[f.COMPARATORLOOSE] : c[f.COMPARATOR], r = a.match(s);
      if (!r)
        throw new TypeError(`Invalid comparator: ${a}`);
      this.operator = r[1] !== void 0 ? r[1] : "", this.operator === "=" && (this.operator = ""), r[2] ? this.semver = new h(r[2], this.options.loose) : this.semver = t;
    }
    toString() {
      return this.value;
    }
    test(a) {
      if (i("Comparator.test", a, this.options.loose), this.semver === t || a === t)
        return !0;
      if (typeof a == "string")
        try {
          a = new h(a, this.options);
        } catch {
          return !1;
        }
      return l(a, this.operator, this.semver, this.options);
    }
    intersects(a, s) {
      if (!(a instanceof u))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new n(a.value, s).test(this.value) : a.operator === "" ? a.value === "" ? !0 : new n(this.value, s).test(a.semver) : (s = d(s), s.includePrerelease && (this.value === "<0.0.0-0" || a.value === "<0.0.0-0") || !s.includePrerelease && (this.value.startsWith("<0.0.0") || a.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && a.operator.startsWith(">") || this.operator.startsWith("<") && a.operator.startsWith("<") || this.semver.version === a.semver.version && this.operator.includes("=") && a.operator.includes("=") || l(this.semver, "<", a.semver, s) && this.operator.startsWith(">") && a.operator.startsWith("<") || l(this.semver, ">", a.semver, s) && this.operator.startsWith("<") && a.operator.startsWith(">")));
    }
  }
  Fi = u;
  const d = ia(), { safeRe: c, t: f } = yr(), l = tu(), i = Gr(), h = We(), n = rt();
  return Fi;
}
var xi, Os;
function Yr() {
  if (Os) return xi;
  Os = 1;
  const t = rt();
  return xi = (d, c, f) => {
    try {
      c = new t(c, f);
    } catch {
      return !1;
    }
    return c.test(d);
  }, xi;
}
var Li, Ps;
function df() {
  if (Ps) return Li;
  Ps = 1;
  const t = rt();
  return Li = (d, c) => new t(d, c).set.map((f) => f.map((l) => l.value).join(" ").trim().split(" ")), Li;
}
var Ui, Is;
function hf() {
  if (Is) return Ui;
  Is = 1;
  const t = We(), u = rt();
  return Ui = (c, f, l) => {
    let i = null, h = null, n = null;
    try {
      n = new u(f, l);
    } catch {
      return null;
    }
    return c.forEach((o) => {
      n.test(o) && (!i || h.compare(o) === -1) && (i = o, h = new t(i, l));
    }), i;
  }, Ui;
}
var $i, Ds;
function pf() {
  if (Ds) return $i;
  Ds = 1;
  const t = We(), u = rt();
  return $i = (c, f, l) => {
    let i = null, h = null, n = null;
    try {
      n = new u(f, l);
    } catch {
      return null;
    }
    return c.forEach((o) => {
      n.test(o) && (!i || h.compare(o) === 1) && (i = o, h = new t(i, l));
    }), i;
  }, $i;
}
var ki, Ns;
function mf() {
  if (Ns) return ki;
  Ns = 1;
  const t = We(), u = rt(), d = Wr();
  return ki = (f, l) => {
    f = new u(f, l);
    let i = new t("0.0.0");
    if (f.test(i) || (i = new t("0.0.0-0"), f.test(i)))
      return i;
    i = null;
    for (let h = 0; h < f.set.length; ++h) {
      const n = f.set[h];
      let o = null;
      n.forEach((a) => {
        const s = new t(a.semver.version);
        switch (a.operator) {
          case ">":
            s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
          /* fallthrough */
          case "":
          case ">=":
            (!o || d(s, o)) && (o = s);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${a.operator}`);
        }
      }), o && (!i || d(i, o)) && (i = o);
    }
    return i && f.test(i) ? i : null;
  }, ki;
}
var qi, Fs;
function gf() {
  if (Fs) return qi;
  Fs = 1;
  const t = rt();
  return qi = (d, c) => {
    try {
      return new t(d, c).range || "*";
    } catch {
      return null;
    }
  }, qi;
}
var Mi, xs;
function ua() {
  if (xs) return Mi;
  xs = 1;
  const t = We(), u = Vr(), { ANY: d } = u, c = rt(), f = Yr(), l = Wr(), i = oa(), h = la(), n = sa();
  return Mi = (a, s, r, m) => {
    a = new t(a, m), s = new c(s, m);
    let v, E, p, S, R;
    switch (r) {
      case ">":
        v = l, E = h, p = i, S = ">", R = ">=";
        break;
      case "<":
        v = i, E = n, p = l, S = "<", R = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (f(a, s, m))
      return !1;
    for (let O = 0; O < s.set.length; ++O) {
      const P = s.set[O];
      let M = null, C = null;
      if (P.forEach((A) => {
        A.semver === d && (A = new u(">=0.0.0")), M = M || A, C = C || A, v(A.semver, M.semver, m) ? M = A : p(A.semver, C.semver, m) && (C = A);
      }), M.operator === S || M.operator === R || (!C.operator || C.operator === S) && E(a, C.semver))
        return !1;
      if (C.operator === R && p(a, C.semver))
        return !1;
    }
    return !0;
  }, Mi;
}
var Bi, Ls;
function vf() {
  if (Ls) return Bi;
  Ls = 1;
  const t = ua();
  return Bi = (d, c, f) => t(d, c, ">", f), Bi;
}
var Hi, Us;
function Ef() {
  if (Us) return Hi;
  Us = 1;
  const t = ua();
  return Hi = (d, c, f) => t(d, c, "<", f), Hi;
}
var ji, $s;
function yf() {
  if ($s) return ji;
  $s = 1;
  const t = rt();
  return ji = (d, c, f) => (d = new t(d, f), c = new t(c, f), d.intersects(c, f)), ji;
}
var Gi, ks;
function wf() {
  if (ks) return Gi;
  ks = 1;
  const t = Yr(), u = tt();
  return Gi = (d, c, f) => {
    const l = [];
    let i = null, h = null;
    const n = d.sort((r, m) => u(r, m, f));
    for (const r of n)
      t(r, c, f) ? (h = r, i || (i = r)) : (h && l.push([i, h]), h = null, i = null);
    i && l.push([i, null]);
    const o = [];
    for (const [r, m] of l)
      r === m ? o.push(r) : !m && r === n[0] ? o.push("*") : m ? r === n[0] ? o.push(`<=${m}`) : o.push(`${r} - ${m}`) : o.push(`>=${r}`);
    const a = o.join(" || "), s = typeof c.raw == "string" ? c.raw : String(c);
    return a.length < s.length ? a : c;
  }, Gi;
}
var Wi, qs;
function _f() {
  if (qs) return Wi;
  qs = 1;
  const t = rt(), u = Vr(), { ANY: d } = u, c = Yr(), f = tt(), l = (s, r, m = {}) => {
    if (s === r)
      return !0;
    s = new t(s, m), r = new t(r, m);
    let v = !1;
    e: for (const E of s.set) {
      for (const p of r.set) {
        const S = n(E, p, m);
        if (v = v || S !== null, S)
          continue e;
      }
      if (v)
        return !1;
    }
    return !0;
  }, i = [new u(">=0.0.0-0")], h = [new u(">=0.0.0")], n = (s, r, m) => {
    if (s === r)
      return !0;
    if (s.length === 1 && s[0].semver === d) {
      if (r.length === 1 && r[0].semver === d)
        return !0;
      m.includePrerelease ? s = i : s = h;
    }
    if (r.length === 1 && r[0].semver === d) {
      if (m.includePrerelease)
        return !0;
      r = h;
    }
    const v = /* @__PURE__ */ new Set();
    let E, p;
    for (const T of s)
      T.operator === ">" || T.operator === ">=" ? E = o(E, T, m) : T.operator === "<" || T.operator === "<=" ? p = a(p, T, m) : v.add(T.semver);
    if (v.size > 1)
      return null;
    let S;
    if (E && p) {
      if (S = f(E.semver, p.semver, m), S > 0)
        return null;
      if (S === 0 && (E.operator !== ">=" || p.operator !== "<="))
        return null;
    }
    for (const T of v) {
      if (E && !c(T, String(E), m) || p && !c(T, String(p), m))
        return null;
      for (const y of r)
        if (!c(T, String(y), m))
          return !1;
      return !0;
    }
    let R, O, P, M, C = p && !m.includePrerelease && p.semver.prerelease.length ? p.semver : !1, A = E && !m.includePrerelease && E.semver.prerelease.length ? E.semver : !1;
    C && C.prerelease.length === 1 && p.operator === "<" && C.prerelease[0] === 0 && (C = !1);
    for (const T of r) {
      if (M = M || T.operator === ">" || T.operator === ">=", P = P || T.operator === "<" || T.operator === "<=", E) {
        if (A && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === A.major && T.semver.minor === A.minor && T.semver.patch === A.patch && (A = !1), T.operator === ">" || T.operator === ">=") {
          if (R = o(E, T, m), R === T && R !== E)
            return !1;
        } else if (E.operator === ">=" && !c(E.semver, String(T), m))
          return !1;
      }
      if (p) {
        if (C && T.semver.prerelease && T.semver.prerelease.length && T.semver.major === C.major && T.semver.minor === C.minor && T.semver.patch === C.patch && (C = !1), T.operator === "<" || T.operator === "<=") {
          if (O = a(p, T, m), O === T && O !== p)
            return !1;
        } else if (p.operator === "<=" && !c(p.semver, String(T), m))
          return !1;
      }
      if (!T.operator && (p || E) && S !== 0)
        return !1;
    }
    return !(E && P && !p && S !== 0 || p && M && !E && S !== 0 || A || C);
  }, o = (s, r, m) => {
    if (!s)
      return r;
    const v = f(s.semver, r.semver, m);
    return v > 0 ? s : v < 0 || r.operator === ">" && s.operator === ">=" ? r : s;
  }, a = (s, r, m) => {
    if (!s)
      return r;
    const v = f(s.semver, r.semver, m);
    return v < 0 ? s : v > 0 || r.operator === "<" && s.operator === "<=" ? r : s;
  };
  return Wi = l, Wi;
}
var Vi, Ms;
function ru() {
  if (Ms) return Vi;
  Ms = 1;
  const t = yr(), u = jr(), d = We(), c = Ql(), f = Ht(), l = Jc(), i = Qc(), h = Zc(), n = ef(), o = tf(), a = rf(), s = nf(), r = af(), m = tt(), v = of(), E = sf(), p = aa(), S = lf(), R = uf(), O = Wr(), P = oa(), M = Zl(), C = eu(), A = sa(), T = la(), y = tu(), q = cf(), U = Vr(), L = rt(), k = Yr(), N = df(), I = hf(), F = pf(), $ = mf(), J = gf(), W = ua(), ne = vf(), ce = Ef(), ue = yf(), ie = wf(), Ae = _f();
  return Vi = {
    parse: f,
    valid: l,
    clean: i,
    inc: h,
    diff: n,
    major: o,
    minor: a,
    patch: s,
    prerelease: r,
    compare: m,
    rcompare: v,
    compareLoose: E,
    compareBuild: p,
    sort: S,
    rsort: R,
    gt: O,
    lt: P,
    eq: M,
    neq: C,
    gte: A,
    lte: T,
    cmp: y,
    coerce: q,
    Comparator: U,
    Range: L,
    satisfies: k,
    toComparators: N,
    maxSatisfying: I,
    minSatisfying: F,
    minVersion: $,
    validRange: J,
    outside: W,
    gtr: ne,
    ltr: ce,
    intersects: ue,
    simplifyRange: ie,
    subset: Ae,
    SemVer: d,
    re: t.re,
    src: t.src,
    tokens: t.t,
    SEMVER_SPEC_VERSION: u.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: u.RELEASE_TYPES,
    compareIdentifiers: c.compareIdentifiers,
    rcompareIdentifiers: c.rcompareIdentifiers
  }, Vi;
}
var Lt = {}, pr = { exports: {} };
pr.exports;
var Bs;
function Sf() {
  return Bs || (Bs = 1, function(t, u) {
    var d = 200, c = "__lodash_hash_undefined__", f = 1, l = 2, i = 9007199254740991, h = "[object Arguments]", n = "[object Array]", o = "[object AsyncFunction]", a = "[object Boolean]", s = "[object Date]", r = "[object Error]", m = "[object Function]", v = "[object GeneratorFunction]", E = "[object Map]", p = "[object Number]", S = "[object Null]", R = "[object Object]", O = "[object Promise]", P = "[object Proxy]", M = "[object RegExp]", C = "[object Set]", A = "[object String]", T = "[object Symbol]", y = "[object Undefined]", q = "[object WeakMap]", U = "[object ArrayBuffer]", L = "[object DataView]", k = "[object Float32Array]", N = "[object Float64Array]", I = "[object Int8Array]", F = "[object Int16Array]", $ = "[object Int32Array]", J = "[object Uint8Array]", W = "[object Uint8ClampedArray]", ne = "[object Uint16Array]", ce = "[object Uint32Array]", ue = /[\\^$.*+?()[\]{}|]/g, ie = /^\[object .+?Constructor\]$/, Ae = /^(?:0|[1-9]\d*)$/, K = {};
    K[k] = K[N] = K[I] = K[F] = K[$] = K[J] = K[W] = K[ne] = K[ce] = !0, K[h] = K[n] = K[U] = K[a] = K[L] = K[s] = K[r] = K[m] = K[E] = K[p] = K[R] = K[M] = K[C] = K[A] = K[q] = !1;
    var Ee = typeof et == "object" && et && et.Object === Object && et, _ = typeof self == "object" && self && self.Object === Object && self, g = Ee || _ || Function("return this")(), H = u && !u.nodeType && u, D = H && !0 && t && !t.nodeType && t, le = D && D.exports === H, me = le && Ee.process, pe = function() {
      try {
        return me && me.binding && me.binding("util");
      } catch {
      }
    }(), _e = pe && pe.isTypedArray;
    function ye(b, x) {
      for (var z = -1, se = b == null ? 0 : b.length, Pe = 0, Se = []; ++z < se; ) {
        var Fe = b[z];
        x(Fe, z, b) && (Se[Pe++] = Fe);
      }
      return Se;
    }
    function xe(b, x) {
      for (var z = -1, se = x.length, Pe = b.length; ++z < se; )
        b[Pe + z] = x[z];
      return b;
    }
    function Ce(b, x) {
      for (var z = -1, se = b == null ? 0 : b.length; ++z < se; )
        if (x(b[z], z, b))
          return !0;
      return !1;
    }
    function Me(b, x) {
      for (var z = -1, se = Array(b); ++z < b; )
        se[z] = x(z);
      return se;
    }
    function vt(b) {
      return function(x) {
        return b(x);
      };
    }
    function ot(b, x) {
      return b.has(x);
    }
    function e(b, x) {
      return b == null ? void 0 : b[x];
    }
    function B(b) {
      var x = -1, z = Array(b.size);
      return b.forEach(function(se, Pe) {
        z[++x] = [Pe, se];
      }), z;
    }
    function G(b, x) {
      return function(z) {
        return b(x(z));
      };
    }
    function re(b) {
      var x = -1, z = Array(b.size);
      return b.forEach(function(se) {
        z[++x] = se;
      }), z;
    }
    var V = Array.prototype, te = Function.prototype, Z = Object.prototype, ae = g["__core-js_shared__"], ge = te.toString, ve = Z.hasOwnProperty, Te = function() {
      var b = /[^.]+$/.exec(ae && ae.keys && ae.keys.IE_PROTO || "");
      return b ? "Symbol(src)_1." + b : "";
    }(), de = Z.toString, Le = RegExp(
      "^" + ge.call(ve).replace(ue, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), w = le ? g.Buffer : void 0, j = g.Symbol, X = g.Uint8Array, Y = Z.propertyIsEnumerable, Q = V.splice, ee = j ? j.toStringTag : void 0, fe = Object.getOwnPropertySymbols, oe = w ? w.isBuffer : void 0, he = G(Object.keys, Object), we = Ft(g, "DataView"), Oe = Ft(g, "Map"), Ne = Ft(g, "Promise"), Re = Ft(g, "Set"), Nt = Ft(g, "WeakMap"), Qe = Ft(Object, "create"), Et = _t(we), uu = _t(Oe), cu = _t(Ne), fu = _t(Re), du = _t(Nt), da = j ? j.prototype : void 0, zr = da ? da.valueOf : void 0;
    function yt(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var se = b[x];
        this.set(se[0], se[1]);
      }
    }
    function hu() {
      this.__data__ = Qe ? Qe(null) : {}, this.size = 0;
    }
    function pu(b) {
      var x = this.has(b) && delete this.__data__[b];
      return this.size -= x ? 1 : 0, x;
    }
    function mu(b) {
      var x = this.__data__;
      if (Qe) {
        var z = x[b];
        return z === c ? void 0 : z;
      }
      return ve.call(x, b) ? x[b] : void 0;
    }
    function gu(b) {
      var x = this.__data__;
      return Qe ? x[b] !== void 0 : ve.call(x, b);
    }
    function vu(b, x) {
      var z = this.__data__;
      return this.size += this.has(b) ? 0 : 1, z[b] = Qe && x === void 0 ? c : x, this;
    }
    yt.prototype.clear = hu, yt.prototype.delete = pu, yt.prototype.get = mu, yt.prototype.has = gu, yt.prototype.set = vu;
    function st(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var se = b[x];
        this.set(se[0], se[1]);
      }
    }
    function Eu() {
      this.__data__ = [], this.size = 0;
    }
    function yu(b) {
      var x = this.__data__, z = _r(x, b);
      if (z < 0)
        return !1;
      var se = x.length - 1;
      return z == se ? x.pop() : Q.call(x, z, 1), --this.size, !0;
    }
    function wu(b) {
      var x = this.__data__, z = _r(x, b);
      return z < 0 ? void 0 : x[z][1];
    }
    function _u(b) {
      return _r(this.__data__, b) > -1;
    }
    function Su(b, x) {
      var z = this.__data__, se = _r(z, b);
      return se < 0 ? (++this.size, z.push([b, x])) : z[se][1] = x, this;
    }
    st.prototype.clear = Eu, st.prototype.delete = yu, st.prototype.get = wu, st.prototype.has = _u, st.prototype.set = Su;
    function wt(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++x < z; ) {
        var se = b[x];
        this.set(se[0], se[1]);
      }
    }
    function Au() {
      this.size = 0, this.__data__ = {
        hash: new yt(),
        map: new (Oe || st)(),
        string: new yt()
      };
    }
    function Tu(b) {
      var x = Sr(this, b).delete(b);
      return this.size -= x ? 1 : 0, x;
    }
    function Ru(b) {
      return Sr(this, b).get(b);
    }
    function Cu(b) {
      return Sr(this, b).has(b);
    }
    function bu(b, x) {
      var z = Sr(this, b), se = z.size;
      return z.set(b, x), this.size += z.size == se ? 0 : 1, this;
    }
    wt.prototype.clear = Au, wt.prototype.delete = Tu, wt.prototype.get = Ru, wt.prototype.has = Cu, wt.prototype.set = bu;
    function wr(b) {
      var x = -1, z = b == null ? 0 : b.length;
      for (this.__data__ = new wt(); ++x < z; )
        this.add(b[x]);
    }
    function Ou(b) {
      return this.__data__.set(b, c), this;
    }
    function Pu(b) {
      return this.__data__.has(b);
    }
    wr.prototype.add = wr.prototype.push = Ou, wr.prototype.has = Pu;
    function ft(b) {
      var x = this.__data__ = new st(b);
      this.size = x.size;
    }
    function Iu() {
      this.__data__ = new st(), this.size = 0;
    }
    function Du(b) {
      var x = this.__data__, z = x.delete(b);
      return this.size = x.size, z;
    }
    function Nu(b) {
      return this.__data__.get(b);
    }
    function Fu(b) {
      return this.__data__.has(b);
    }
    function xu(b, x) {
      var z = this.__data__;
      if (z instanceof st) {
        var se = z.__data__;
        if (!Oe || se.length < d - 1)
          return se.push([b, x]), this.size = ++z.size, this;
        z = this.__data__ = new wt(se);
      }
      return z.set(b, x), this.size = z.size, this;
    }
    ft.prototype.clear = Iu, ft.prototype.delete = Du, ft.prototype.get = Nu, ft.prototype.has = Fu, ft.prototype.set = xu;
    function Lu(b, x) {
      var z = Ar(b), se = !z && Ku(b), Pe = !z && !se && Xr(b), Se = !z && !se && !Pe && _a(b), Fe = z || se || Pe || Se, Ue = Fe ? Me(b.length, String) : [], $e = Ue.length;
      for (var De in b)
        ve.call(b, De) && !(Fe && // Safari 9 has enumerable `arguments.length` in strict mode.
        (De == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Pe && (De == "offset" || De == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Se && (De == "buffer" || De == "byteLength" || De == "byteOffset") || // Skip index properties.
        Wu(De, $e))) && Ue.push(De);
      return Ue;
    }
    function _r(b, x) {
      for (var z = b.length; z--; )
        if (va(b[z][0], x))
          return z;
      return -1;
    }
    function Uu(b, x, z) {
      var se = x(b);
      return Ar(b) ? se : xe(se, z(b));
    }
    function Gt(b) {
      return b == null ? b === void 0 ? y : S : ee && ee in Object(b) ? ju(b) : Xu(b);
    }
    function ha(b) {
      return Wt(b) && Gt(b) == h;
    }
    function pa(b, x, z, se, Pe) {
      return b === x ? !0 : b == null || x == null || !Wt(b) && !Wt(x) ? b !== b && x !== x : $u(b, x, z, se, pa, Pe);
    }
    function $u(b, x, z, se, Pe, Se) {
      var Fe = Ar(b), Ue = Ar(x), $e = Fe ? n : dt(b), De = Ue ? n : dt(x);
      $e = $e == h ? R : $e, De = De == h ? R : De;
      var Ye = $e == R, Ze = De == R, Be = $e == De;
      if (Be && Xr(b)) {
        if (!Xr(x))
          return !1;
        Fe = !0, Ye = !1;
      }
      if (Be && !Ye)
        return Se || (Se = new ft()), Fe || _a(b) ? ma(b, x, z, se, Pe, Se) : Bu(b, x, $e, z, se, Pe, Se);
      if (!(z & f)) {
        var Xe = Ye && ve.call(b, "__wrapped__"), Ke = Ze && ve.call(x, "__wrapped__");
        if (Xe || Ke) {
          var ht = Xe ? b.value() : b, lt = Ke ? x.value() : x;
          return Se || (Se = new ft()), Pe(ht, lt, z, se, Se);
        }
      }
      return Be ? (Se || (Se = new ft()), Hu(b, x, z, se, Pe, Se)) : !1;
    }
    function ku(b) {
      if (!wa(b) || Yu(b))
        return !1;
      var x = Ea(b) ? Le : ie;
      return x.test(_t(b));
    }
    function qu(b) {
      return Wt(b) && ya(b.length) && !!K[Gt(b)];
    }
    function Mu(b) {
      if (!zu(b))
        return he(b);
      var x = [];
      for (var z in Object(b))
        ve.call(b, z) && z != "constructor" && x.push(z);
      return x;
    }
    function ma(b, x, z, se, Pe, Se) {
      var Fe = z & f, Ue = b.length, $e = x.length;
      if (Ue != $e && !(Fe && $e > Ue))
        return !1;
      var De = Se.get(b);
      if (De && Se.get(x))
        return De == x;
      var Ye = -1, Ze = !0, Be = z & l ? new wr() : void 0;
      for (Se.set(b, x), Se.set(x, b); ++Ye < Ue; ) {
        var Xe = b[Ye], Ke = x[Ye];
        if (se)
          var ht = Fe ? se(Ke, Xe, Ye, x, b, Se) : se(Xe, Ke, Ye, b, x, Se);
        if (ht !== void 0) {
          if (ht)
            continue;
          Ze = !1;
          break;
        }
        if (Be) {
          if (!Ce(x, function(lt, St) {
            if (!ot(Be, St) && (Xe === lt || Pe(Xe, lt, z, se, Se)))
              return Be.push(St);
          })) {
            Ze = !1;
            break;
          }
        } else if (!(Xe === Ke || Pe(Xe, Ke, z, se, Se))) {
          Ze = !1;
          break;
        }
      }
      return Se.delete(b), Se.delete(x), Ze;
    }
    function Bu(b, x, z, se, Pe, Se, Fe) {
      switch (z) {
        case L:
          if (b.byteLength != x.byteLength || b.byteOffset != x.byteOffset)
            return !1;
          b = b.buffer, x = x.buffer;
        case U:
          return !(b.byteLength != x.byteLength || !Se(new X(b), new X(x)));
        case a:
        case s:
        case p:
          return va(+b, +x);
        case r:
          return b.name == x.name && b.message == x.message;
        case M:
        case A:
          return b == x + "";
        case E:
          var Ue = B;
        case C:
          var $e = se & f;
          if (Ue || (Ue = re), b.size != x.size && !$e)
            return !1;
          var De = Fe.get(b);
          if (De)
            return De == x;
          se |= l, Fe.set(b, x);
          var Ye = ma(Ue(b), Ue(x), se, Pe, Se, Fe);
          return Fe.delete(b), Ye;
        case T:
          if (zr)
            return zr.call(b) == zr.call(x);
      }
      return !1;
    }
    function Hu(b, x, z, se, Pe, Se) {
      var Fe = z & f, Ue = ga(b), $e = Ue.length, De = ga(x), Ye = De.length;
      if ($e != Ye && !Fe)
        return !1;
      for (var Ze = $e; Ze--; ) {
        var Be = Ue[Ze];
        if (!(Fe ? Be in x : ve.call(x, Be)))
          return !1;
      }
      var Xe = Se.get(b);
      if (Xe && Se.get(x))
        return Xe == x;
      var Ke = !0;
      Se.set(b, x), Se.set(x, b);
      for (var ht = Fe; ++Ze < $e; ) {
        Be = Ue[Ze];
        var lt = b[Be], St = x[Be];
        if (se)
          var Sa = Fe ? se(St, lt, Be, x, b, Se) : se(lt, St, Be, b, x, Se);
        if (!(Sa === void 0 ? lt === St || Pe(lt, St, z, se, Se) : Sa)) {
          Ke = !1;
          break;
        }
        ht || (ht = Be == "constructor");
      }
      if (Ke && !ht) {
        var Tr = b.constructor, Rr = x.constructor;
        Tr != Rr && "constructor" in b && "constructor" in x && !(typeof Tr == "function" && Tr instanceof Tr && typeof Rr == "function" && Rr instanceof Rr) && (Ke = !1);
      }
      return Se.delete(b), Se.delete(x), Ke;
    }
    function ga(b) {
      return Uu(b, Zu, Gu);
    }
    function Sr(b, x) {
      var z = b.__data__;
      return Vu(x) ? z[typeof x == "string" ? "string" : "hash"] : z.map;
    }
    function Ft(b, x) {
      var z = e(b, x);
      return ku(z) ? z : void 0;
    }
    function ju(b) {
      var x = ve.call(b, ee), z = b[ee];
      try {
        b[ee] = void 0;
        var se = !0;
      } catch {
      }
      var Pe = de.call(b);
      return se && (x ? b[ee] = z : delete b[ee]), Pe;
    }
    var Gu = fe ? function(b) {
      return b == null ? [] : (b = Object(b), ye(fe(b), function(x) {
        return Y.call(b, x);
      }));
    } : ec, dt = Gt;
    (we && dt(new we(new ArrayBuffer(1))) != L || Oe && dt(new Oe()) != E || Ne && dt(Ne.resolve()) != O || Re && dt(new Re()) != C || Nt && dt(new Nt()) != q) && (dt = function(b) {
      var x = Gt(b), z = x == R ? b.constructor : void 0, se = z ? _t(z) : "";
      if (se)
        switch (se) {
          case Et:
            return L;
          case uu:
            return E;
          case cu:
            return O;
          case fu:
            return C;
          case du:
            return q;
        }
      return x;
    });
    function Wu(b, x) {
      return x = x ?? i, !!x && (typeof b == "number" || Ae.test(b)) && b > -1 && b % 1 == 0 && b < x;
    }
    function Vu(b) {
      var x = typeof b;
      return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? b !== "__proto__" : b === null;
    }
    function Yu(b) {
      return !!Te && Te in b;
    }
    function zu(b) {
      var x = b && b.constructor, z = typeof x == "function" && x.prototype || Z;
      return b === z;
    }
    function Xu(b) {
      return de.call(b);
    }
    function _t(b) {
      if (b != null) {
        try {
          return ge.call(b);
        } catch {
        }
        try {
          return b + "";
        } catch {
        }
      }
      return "";
    }
    function va(b, x) {
      return b === x || b !== b && x !== x;
    }
    var Ku = ha(/* @__PURE__ */ function() {
      return arguments;
    }()) ? ha : function(b) {
      return Wt(b) && ve.call(b, "callee") && !Y.call(b, "callee");
    }, Ar = Array.isArray;
    function Ju(b) {
      return b != null && ya(b.length) && !Ea(b);
    }
    var Xr = oe || tc;
    function Qu(b, x) {
      return pa(b, x);
    }
    function Ea(b) {
      if (!wa(b))
        return !1;
      var x = Gt(b);
      return x == m || x == v || x == o || x == P;
    }
    function ya(b) {
      return typeof b == "number" && b > -1 && b % 1 == 0 && b <= i;
    }
    function wa(b) {
      var x = typeof b;
      return b != null && (x == "object" || x == "function");
    }
    function Wt(b) {
      return b != null && typeof b == "object";
    }
    var _a = _e ? vt(_e) : qu;
    function Zu(b) {
      return Ju(b) ? Lu(b) : Mu(b);
    }
    function ec() {
      return [];
    }
    function tc() {
      return !1;
    }
    t.exports = Qu;
  }(pr, pr.exports)), pr.exports;
}
var Hs;
function Af() {
  if (Hs) return Lt;
  Hs = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.DownloadedUpdateHelper = void 0, Lt.createTempUpdateFile = h;
  const t = gr, u = ke, d = Sf(), c = /* @__PURE__ */ gt(), f = be;
  let l = class {
    constructor(o) {
      this.cacheDir = o, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return f.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(o, a, s, r) {
      if (this.versionInfo != null && this.file === o && this.fileInfo != null)
        return d(this.versionInfo, a) && d(this.fileInfo.info, s.info) && await (0, c.pathExists)(o) ? o : null;
      const m = await this.getValidCachedUpdateFile(s, r);
      return m === null ? null : (r.info(`Update has already been downloaded to ${o}).`), this._file = m, m);
    }
    async setDownloadedFile(o, a, s, r, m, v) {
      this._file = o, this._packageFile = a, this.versionInfo = s, this.fileInfo = r, this._downloadedFileInfo = {
        fileName: m,
        sha512: r.info.sha512,
        isAdminRightsRequired: r.info.isAdminRightsRequired === !0
      }, v && await (0, c.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, c.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(o, a) {
      const s = this.getUpdateInfoFile();
      if (!await (0, c.pathExists)(s))
        return null;
      let m;
      try {
        m = await (0, c.readJson)(s);
      } catch (S) {
        let R = "No cached update info available";
        return S.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), R += ` (error on read: ${S.message})`), a.info(R), null;
      }
      if (!((m == null ? void 0 : m.fileName) !== null))
        return a.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (o.info.sha512 !== m.sha512)
        return a.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m.sha512}, expected: ${o.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const E = f.join(this.cacheDirForPendingUpdate, m.fileName);
      if (!await (0, c.pathExists)(E))
        return a.info("Cached update file doesn't exist"), null;
      const p = await i(E);
      return o.info.sha512 !== p ? (a.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p}, expected: ${o.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = m, E);
    }
    getUpdateInfoFile() {
      return f.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  Lt.DownloadedUpdateHelper = l;
  function i(n, o = "sha512", a = "base64", s) {
    return new Promise((r, m) => {
      const v = (0, t.createHash)(o);
      v.on("error", m).setEncoding(a), (0, u.createReadStream)(n, {
        ...s,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", m).on("end", () => {
        v.end(), r(v.read());
      }).pipe(v, { end: !1 });
    });
  }
  async function h(n, o, a) {
    let s = 0, r = f.join(o, n);
    for (let m = 0; m < 3; m++)
      try {
        return await (0, c.unlink)(r), r;
      } catch (v) {
        if (v.code === "ENOENT")
          return r;
        a.warn(`Error on remove temp update file: ${v}`), r = f.join(o, `${s++}-${n}`);
      }
    return r;
  }
  return Lt;
}
var Jt = {}, $r = {}, js;
function Tf() {
  if (js) return $r;
  js = 1, Object.defineProperty($r, "__esModule", { value: !0 }), $r.getAppCacheDir = d;
  const t = be, u = Mr;
  function d() {
    const c = (0, u.homedir)();
    let f;
    return process.platform === "win32" ? f = process.env.LOCALAPPDATA || t.join(c, "AppData", "Local") : process.platform === "darwin" ? f = t.join(c, "Library", "Caches") : f = process.env.XDG_CACHE_HOME || t.join(c, ".cache"), f;
  }
  return $r;
}
var Gs;
function Rf() {
  if (Gs) return Jt;
  Gs = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.ElectronAppAdapter = void 0;
  const t = be, u = Tf();
  let d = class {
    constructor(f = Ot.app) {
      this.app = f;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? t.join(process.resourcesPath, "app-update.yml") : t.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, u.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(f) {
      this.app.once("quit", (l, i) => f(i));
    }
  };
  return Jt.ElectronAppAdapter = d, Jt;
}
var Yi = {}, Ws;
function Cf() {
  return Ws || (Ws = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.ElectronHttpExecutor = t.NET_SESSION_NAME = void 0, t.getNetSession = d;
    const u = qe();
    t.NET_SESSION_NAME = "electron-updater";
    function d() {
      return Ot.session.fromPartition(t.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class c extends u.HttpExecutor {
      constructor(l) {
        super(), this.proxyLoginCallback = l, this.cachedSession = null;
      }
      async download(l, i, h) {
        return await h.cancellationToken.createPromise((n, o, a) => {
          const s = {
            headers: h.headers || void 0,
            redirect: "manual"
          };
          (0, u.configureRequestUrl)(l, s), (0, u.configureRequestOptions)(s), this.doDownload(s, {
            destination: i,
            options: h,
            onCancel: a,
            callback: (r) => {
              r == null ? n(i) : o(r);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(l, i) {
        l.headers && l.headers.Host && (l.host = l.headers.Host, delete l.headers.Host), this.cachedSession == null && (this.cachedSession = d());
        const h = Ot.net.request({
          ...l,
          session: this.cachedSession
        });
        return h.on("response", i), this.proxyLoginCallback != null && h.on("login", this.proxyLoginCallback), h;
      }
      addRedirectHandlers(l, i, h, n, o) {
        l.on("redirect", (a, s, r) => {
          l.abort(), n > this.maxRedirects ? h(this.createMaxRedirectError()) : o(u.HttpExecutor.prepareRedirectUrlOptions(r, i));
        });
      }
    }
    t.ElectronHttpExecutor = c;
  }(Yi)), Yi;
}
var Qt = {}, bt = {}, zi, Vs;
function bf() {
  if (Vs) return zi;
  Vs = 1;
  var t = "[object Symbol]", u = /[\\^$.*+?()[\]{}|]/g, d = RegExp(u.source), c = typeof et == "object" && et && et.Object === Object && et, f = typeof self == "object" && self && self.Object === Object && self, l = c || f || Function("return this")(), i = Object.prototype, h = i.toString, n = l.Symbol, o = n ? n.prototype : void 0, a = o ? o.toString : void 0;
  function s(p) {
    if (typeof p == "string")
      return p;
    if (m(p))
      return a ? a.call(p) : "";
    var S = p + "";
    return S == "0" && 1 / p == -1 / 0 ? "-0" : S;
  }
  function r(p) {
    return !!p && typeof p == "object";
  }
  function m(p) {
    return typeof p == "symbol" || r(p) && h.call(p) == t;
  }
  function v(p) {
    return p == null ? "" : s(p);
  }
  function E(p) {
    return p = v(p), p && d.test(p) ? p.replace(u, "\\$&") : p;
  }
  return zi = E, zi;
}
var Ys;
function It() {
  if (Ys) return bt;
  Ys = 1, Object.defineProperty(bt, "__esModule", { value: !0 }), bt.newBaseUrl = d, bt.newUrlFromBase = c, bt.getChannelFilename = f, bt.blockmapFiles = l;
  const t = qt, u = bf();
  function d(i) {
    const h = new t.URL(i);
    return h.pathname.endsWith("/") || (h.pathname += "/"), h;
  }
  function c(i, h, n = !1) {
    const o = new t.URL(i, h), a = h.search;
    return a != null && a.length !== 0 ? o.search = a : n && (o.search = `noCache=${Date.now().toString(32)}`), o;
  }
  function f(i) {
    return `${i}.yml`;
  }
  function l(i, h, n) {
    const o = c(`${i.pathname}.blockmap`, i);
    return [c(`${i.pathname.replace(new RegExp(u(n), "g"), h)}.blockmap`, i), o];
  }
  return bt;
}
var ut = {}, zs;
function Je() {
  if (zs) return ut;
  zs = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.Provider = void 0, ut.findFile = f, ut.parseUpdateInfo = l, ut.getFileList = i, ut.resolveFiles = h;
  const t = qe(), u = na(), d = It();
  let c = class {
    constructor(o) {
      this.runtimeOptions = o, this.requestHeaders = null, this.executor = o.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const o = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (o === "x64" ? "" : `-${o}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(o) {
      return `${o}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(o) {
      this.requestHeaders = o;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(o, a, s) {
      return this.executor.request(this.createRequestOptions(o, a), s);
    }
    createRequestOptions(o, a) {
      const s = {};
      return this.requestHeaders == null ? a != null && (s.headers = a) : s.headers = a == null ? this.requestHeaders : { ...this.requestHeaders, ...a }, (0, t.configureRequestUrl)(o, s), s;
    }
  };
  ut.Provider = c;
  function f(n, o, a) {
    if (n.length === 0)
      throw (0, t.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const s = n.find((r) => r.url.pathname.toLowerCase().endsWith(`.${o}`));
    return s ?? (a == null ? n[0] : n.find((r) => !a.some((m) => r.url.pathname.toLowerCase().endsWith(`.${m}`))));
  }
  function l(n, o, a) {
    if (n == null)
      throw (0, t.newError)(`Cannot parse update info from ${o} in the latest release artifacts (${a}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let s;
    try {
      s = (0, u.load)(n);
    } catch (r) {
      throw (0, t.newError)(`Cannot parse update info from ${o} in the latest release artifacts (${a}): ${r.stack || r.message}, rawData: ${n}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return s;
  }
  function i(n) {
    const o = n.files;
    if (o != null && o.length > 0)
      return o;
    if (n.path != null)
      return [
        {
          url: n.path,
          sha2: n.sha2,
          sha512: n.sha512
        }
      ];
    throw (0, t.newError)(`No files provided: ${(0, t.safeStringifyJson)(n)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function h(n, o, a = (s) => s) {
    const r = i(n).map((E) => {
      if (E.sha2 == null && E.sha512 == null)
        throw (0, t.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, t.safeStringifyJson)(E)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, d.newUrlFromBase)(a(E.url), o),
        info: E
      };
    }), m = n.packages, v = m == null ? null : m[process.arch] || m.ia32;
    return v != null && (r[0].packageInfo = {
      ...v,
      path: (0, d.newUrlFromBase)(a(v.path), o).href
    }), r;
  }
  return ut;
}
var Xs;
function nu() {
  if (Xs) return Qt;
  Xs = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.GenericProvider = void 0;
  const t = qe(), u = It(), d = Je();
  let c = class extends d.Provider {
    constructor(l, i, h) {
      super(h), this.configuration = l, this.updater = i, this.baseUrl = (0, u.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const l = this.updater.channel || this.configuration.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      const l = (0, u.getChannelFilename)(this.channel), i = (0, u.newUrlFromBase)(l, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let h = 0; ; h++)
        try {
          return (0, d.parseUpdateInfo)(await this.httpRequest(i), l, i);
        } catch (n) {
          if (n instanceof t.HttpError && n.statusCode === 404)
            throw (0, t.newError)(`Cannot find channel "${l}" update info: ${n.stack || n.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (n.code === "ECONNREFUSED" && h < 3) {
            await new Promise((o, a) => {
              try {
                setTimeout(o, 1e3 * h);
              } catch (s) {
                a(s);
              }
            });
            continue;
          }
          throw n;
        }
    }
    resolveFiles(l) {
      return (0, d.resolveFiles)(l, this.baseUrl);
    }
  };
  return Qt.GenericProvider = c, Qt;
}
var Zt = {}, er = {}, Ks;
function Of() {
  if (Ks) return er;
  Ks = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.BitbucketProvider = void 0;
  const t = qe(), u = It(), d = Je();
  let c = class extends d.Provider {
    constructor(l, i, h) {
      super({
        ...h,
        isUseMultipleRangeRequest: !1
      }), this.configuration = l, this.updater = i;
      const { owner: n, slug: o } = l;
      this.baseUrl = (0, u.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${n}/${o}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const l = new t.CancellationToken(), i = (0, u.getChannelFilename)(this.getCustomChannelName(this.channel)), h = (0, u.newUrlFromBase)(i, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(h, void 0, l);
        return (0, d.parseUpdateInfo)(n, i, h);
      } catch (n) {
        throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(l) {
      return (0, d.resolveFiles)(l, this.baseUrl);
    }
    toString() {
      const { owner: l, slug: i } = this.configuration;
      return `Bitbucket (owner: ${l}, slug: ${i}, channel: ${this.channel})`;
    }
  };
  return er.BitbucketProvider = c, er;
}
var mt = {}, Js;
function iu() {
  if (Js) return mt;
  Js = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.GitHubProvider = mt.BaseGitHubProvider = void 0, mt.computeReleaseNotes = o;
  const t = qe(), u = ru(), d = qt, c = It(), f = Je(), l = /\/tag\/([^/]+)$/;
  class i extends f.Provider {
    constructor(s, r, m) {
      super({
        ...m,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = s, this.baseUrl = (0, c.newBaseUrl)((0, t.githubUrl)(s, r));
      const v = r === "github.com" ? "api.github.com" : r;
      this.baseApiUrl = (0, c.newBaseUrl)((0, t.githubUrl)(s, v));
    }
    computeGithubBasePath(s) {
      const r = this.options.host;
      return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${s}` : s;
    }
  }
  mt.BaseGitHubProvider = i;
  let h = class extends i {
    constructor(s, r, m) {
      super(s, "github.com", m), this.options = s, this.updater = r;
    }
    get channel() {
      const s = this.updater.channel || this.options.channel;
      return s == null ? this.getDefaultChannelName() : this.getCustomChannelName(s);
    }
    async getLatestVersion() {
      var s, r, m, v, E;
      const p = new t.CancellationToken(), S = await this.httpRequest((0, c.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, p), R = (0, t.parseXml)(S);
      let O = R.element("entry", !1, "No published versions on GitHub"), P = null;
      try {
        if (this.updater.allowPrerelease) {
          const q = ((s = this.updater) === null || s === void 0 ? void 0 : s.channel) || ((r = u.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
          if (q === null)
            P = l.exec(O.element("link").attribute("href"))[1];
          else
            for (const U of R.getElements("entry")) {
              const L = l.exec(U.element("link").attribute("href"));
              if (L === null)
                continue;
              const k = L[1], N = ((m = u.prerelease(k)) === null || m === void 0 ? void 0 : m[0]) || null, I = !q || ["alpha", "beta"].includes(q), F = N !== null && !["alpha", "beta"].includes(String(N));
              if (I && !F && !(q === "beta" && N === "alpha")) {
                P = k;
                break;
              }
              if (N && N === q) {
                P = k;
                break;
              }
            }
        } else {
          P = await this.getLatestTagName(p);
          for (const q of R.getElements("entry"))
            if (l.exec(q.element("link").attribute("href"))[1] === P) {
              O = q;
              break;
            }
        }
      } catch (q) {
        throw (0, t.newError)(`Cannot parse releases feed: ${q.stack || q.message},
XML:
${S}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (P == null)
        throw (0, t.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let M, C = "", A = "";
      const T = async (q) => {
        C = (0, c.getChannelFilename)(q), A = (0, c.newUrlFromBase)(this.getBaseDownloadPath(String(P), C), this.baseUrl);
        const U = this.createRequestOptions(A);
        try {
          return await this.executor.request(U, p);
        } catch (L) {
          throw L instanceof t.HttpError && L.statusCode === 404 ? (0, t.newError)(`Cannot find ${C} in the latest release artifacts (${A}): ${L.stack || L.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : L;
        }
      };
      try {
        let q = this.channel;
        this.updater.allowPrerelease && (!((v = u.prerelease(P)) === null || v === void 0) && v[0]) && (q = this.getCustomChannelName(String((E = u.prerelease(P)) === null || E === void 0 ? void 0 : E[0]))), M = await T(q);
      } catch (q) {
        if (this.updater.allowPrerelease)
          M = await T(this.getDefaultChannelName());
        else
          throw q;
      }
      const y = (0, f.parseUpdateInfo)(M, C, A);
      return y.releaseName == null && (y.releaseName = O.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = o(this.updater.currentVersion, this.updater.fullChangelog, R, O)), {
        tag: P,
        ...y
      };
    }
    async getLatestTagName(s) {
      const r = this.options, m = r.host == null || r.host === "github.com" ? (0, c.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new d.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const v = await this.httpRequest(m, { Accept: "application/json" }, s);
        return v == null ? null : JSON.parse(v).tag_name;
      } catch (v) {
        throw (0, t.newError)(`Unable to find latest version on GitHub (${m}), please ensure a production release exists: ${v.stack || v.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(s) {
      return (0, f.resolveFiles)(s, this.baseUrl, (r) => this.getBaseDownloadPath(s.tag, r.replace(/ /g, "-")));
    }
    getBaseDownloadPath(s, r) {
      return `${this.basePath}/download/${s}/${r}`;
    }
  };
  mt.GitHubProvider = h;
  function n(a) {
    const s = a.elementValueOrEmpty("content");
    return s === "No content." ? "" : s;
  }
  function o(a, s, r, m) {
    if (!s)
      return n(m);
    const v = [];
    for (const E of r.getElements("entry")) {
      const p = /\/tag\/v?([^/]+)$/.exec(E.element("link").attribute("href"))[1];
      u.lt(a, p) && v.push({
        version: p,
        note: n(E)
      });
    }
    return v.sort((E, p) => u.rcompare(E.version, p.version));
  }
  return mt;
}
var tr = {}, Qs;
function Pf() {
  if (Qs) return tr;
  Qs = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.KeygenProvider = void 0;
  const t = qe(), u = It(), d = Je();
  let c = class extends d.Provider {
    constructor(l, i, h) {
      super({
        ...h,
        isUseMultipleRangeRequest: !1
      }), this.configuration = l, this.updater = i, this.defaultHostname = "api.keygen.sh";
      const n = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, u.newBaseUrl)(`https://${n}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const l = new t.CancellationToken(), i = (0, u.getChannelFilename)(this.getCustomChannelName(this.channel)), h = (0, u.newUrlFromBase)(i, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(h, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, l);
        return (0, d.parseUpdateInfo)(n, i, h);
      } catch (n) {
        throw (0, t.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(l) {
      return (0, d.resolveFiles)(l, this.baseUrl);
    }
    toString() {
      const { account: l, product: i, platform: h } = this.configuration;
      return `Keygen (account: ${l}, product: ${i}, platform: ${h}, channel: ${this.channel})`;
    }
  };
  return tr.KeygenProvider = c, tr;
}
var rr = {}, Zs;
function If() {
  if (Zs) return rr;
  Zs = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.PrivateGitHubProvider = void 0;
  const t = qe(), u = na(), d = be, c = qt, f = It(), l = iu(), i = Je();
  let h = class extends l.BaseGitHubProvider {
    constructor(o, a, s, r) {
      super(o, "api.github.com", r), this.updater = a, this.token = s;
    }
    createRequestOptions(o, a) {
      const s = super.createRequestOptions(o, a);
      return s.redirect = "manual", s;
    }
    async getLatestVersion() {
      const o = new t.CancellationToken(), a = (0, f.getChannelFilename)(this.getDefaultChannelName()), s = await this.getLatestVersionInfo(o), r = s.assets.find((E) => E.name === a);
      if (r == null)
        throw (0, t.newError)(`Cannot find ${a} in the release ${s.html_url || s.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const m = new c.URL(r.url);
      let v;
      try {
        v = (0, u.load)(await this.httpRequest(m, this.configureHeaders("application/octet-stream"), o));
      } catch (E) {
        throw E instanceof t.HttpError && E.statusCode === 404 ? (0, t.newError)(`Cannot find ${a} in the latest release artifacts (${m}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
      return v.assets = s.assets, v;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(o) {
      return {
        accept: o,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(o) {
      const a = this.updater.allowPrerelease;
      let s = this.basePath;
      a || (s = `${s}/latest`);
      const r = (0, f.newUrlFromBase)(s, this.baseUrl);
      try {
        const m = JSON.parse(await this.httpRequest(r, this.configureHeaders("application/vnd.github.v3+json"), o));
        return a ? m.find((v) => v.prerelease) || m[0] : m;
      } catch (m) {
        throw (0, t.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${m.stack || m.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(o) {
      return (0, i.getFileList)(o).map((a) => {
        const s = d.posix.basename(a.url).replace(/ /g, "-"), r = o.assets.find((m) => m != null && m.name === s);
        if (r == null)
          throw (0, t.newError)(`Cannot find asset "${s}" in: ${JSON.stringify(o.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new c.URL(r.url),
          info: a
        };
      });
    }
  };
  return rr.PrivateGitHubProvider = h, rr;
}
var el;
function Df() {
  if (el) return Zt;
  el = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.isUrlProbablySupportMultiRangeRequests = i, Zt.createClient = h;
  const t = qe(), u = Of(), d = nu(), c = iu(), f = Pf(), l = If();
  function i(n) {
    return !n.includes("s3.amazonaws.com");
  }
  function h(n, o, a) {
    if (typeof n == "string")
      throw (0, t.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const s = n.provider;
    switch (s) {
      case "github": {
        const r = n, m = (r.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || r.token;
        return m == null ? new c.GitHubProvider(r, o, a) : new l.PrivateGitHubProvider(r, o, m, a);
      }
      case "bitbucket":
        return new u.BitbucketProvider(n, o, a);
      case "keygen":
        return new f.KeygenProvider(n, o, a);
      case "s3":
      case "spaces":
        return new d.GenericProvider({
          provider: "generic",
          url: (0, t.getS3LikeProviderBaseUrl)(n),
          channel: n.channel || null
        }, o, {
          ...a,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const r = n;
        return new d.GenericProvider(r, o, {
          ...a,
          isUseMultipleRangeRequest: r.useMultipleRangeRequest !== !1 && i(r.url)
        });
      }
      case "custom": {
        const r = n, m = r.updateProvider;
        if (!m)
          throw (0, t.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new m(r, o, a);
      }
      default:
        throw (0, t.newError)(`Unsupported provider: ${s}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return Zt;
}
var nr = {}, ir = {}, Ut = {}, $t = {}, tl;
function ca() {
  if (tl) return $t;
  tl = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.OperationKind = void 0, $t.computeOperations = u;
  var t;
  (function(i) {
    i[i.COPY = 0] = "COPY", i[i.DOWNLOAD = 1] = "DOWNLOAD";
  })(t || ($t.OperationKind = t = {}));
  function u(i, h, n) {
    const o = l(i.files), a = l(h.files);
    let s = null;
    const r = h.files[0], m = [], v = r.name, E = o.get(v);
    if (E == null)
      throw new Error(`no file ${v} in old blockmap`);
    const p = a.get(v);
    let S = 0;
    const { checksumToOffset: R, checksumToOldSize: O } = f(o.get(v), E.offset, n);
    let P = r.offset;
    for (let M = 0; M < p.checksums.length; P += p.sizes[M], M++) {
      const C = p.sizes[M], A = p.checksums[M];
      let T = R.get(A);
      T != null && O.get(A) !== C && (n.warn(`Checksum ("${A}") matches, but size differs (old: ${O.get(A)}, new: ${C})`), T = void 0), T === void 0 ? (S++, s != null && s.kind === t.DOWNLOAD && s.end === P ? s.end += C : (s = {
        kind: t.DOWNLOAD,
        start: P,
        end: P + C
        // oldBlocks: null,
      }, c(s, m, A, M))) : s != null && s.kind === t.COPY && s.end === T ? s.end += C : (s = {
        kind: t.COPY,
        start: T,
        end: T + C
        // oldBlocks: [checksum]
      }, c(s, m, A, M));
    }
    return S > 0 && n.info(`File${r.name === "file" ? "" : " " + r.name} has ${S} changed blocks`), m;
  }
  const d = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function c(i, h, n, o) {
    if (d && h.length !== 0) {
      const a = h[h.length - 1];
      if (a.kind === i.kind && i.start < a.end && i.start > a.start) {
        const s = [a.start, a.end, i.start, i.end].reduce((r, m) => r < m ? r : m);
        throw new Error(`operation (block index: ${o}, checksum: ${n}, kind: ${t[i.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${a.start} until ${a.end} and ${i.start} until ${i.end}
rel: ${a.start - s} until ${a.end - s} and ${i.start - s} until ${i.end - s}`);
      }
    }
    h.push(i);
  }
  function f(i, h, n) {
    const o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    let s = h;
    for (let r = 0; r < i.checksums.length; r++) {
      const m = i.checksums[r], v = i.sizes[r], E = a.get(m);
      if (E === void 0)
        o.set(m, s), a.set(m, v);
      else if (n.debug != null) {
        const p = E === v ? "(same size)" : `(size: ${E}, this size: ${v})`;
        n.debug(`${m} duplicated in blockmap ${p}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      s += v;
    }
    return { checksumToOffset: o, checksumToOldSize: a };
  }
  function l(i) {
    const h = /* @__PURE__ */ new Map();
    for (const n of i)
      h.set(n.name, n);
    return h;
  }
  return $t;
}
var rl;
function au() {
  if (rl) return Ut;
  rl = 1, Object.defineProperty(Ut, "__esModule", { value: !0 }), Ut.DataSplitter = void 0, Ut.copyData = i;
  const t = qe(), u = ke, d = mr, c = ca(), f = Buffer.from(`\r
\r
`);
  var l;
  (function(n) {
    n[n.INIT = 0] = "INIT", n[n.HEADER = 1] = "HEADER", n[n.BODY = 2] = "BODY";
  })(l || (l = {}));
  function i(n, o, a, s, r) {
    const m = (0, u.createReadStream)("", {
      fd: a,
      autoClose: !1,
      start: n.start,
      // end is inclusive
      end: n.end - 1
    });
    m.on("error", s), m.once("end", r), m.pipe(o, {
      end: !1
    });
  }
  let h = class extends d.Writable {
    constructor(o, a, s, r, m, v) {
      super(), this.out = o, this.options = a, this.partIndexToTaskIndex = s, this.partIndexToLength = m, this.finishHandler = v, this.partIndex = -1, this.headerListBuffer = null, this.readState = l.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = r.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(o, a, s) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${o.length} bytes`);
        return;
      }
      this.handleData(o).then(s).catch(s);
    }
    async handleData(o) {
      let a = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, t.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const s = Math.min(this.ignoreByteCount, o.length);
        this.ignoreByteCount -= s, a = s;
      } else if (this.remainingPartDataCount > 0) {
        const s = Math.min(this.remainingPartDataCount, o.length);
        this.remainingPartDataCount -= s, await this.processPartData(o, 0, s), a = s;
      }
      if (a !== o.length) {
        if (this.readState === l.HEADER) {
          const s = this.searchHeaderListEnd(o, a);
          if (s === -1)
            return;
          a = s, this.readState = l.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === l.BODY)
            this.readState = l.INIT;
          else {
            this.partIndex++;
            let v = this.partIndexToTaskIndex.get(this.partIndex);
            if (v == null)
              if (this.isFinished)
                v = this.options.end;
              else
                throw (0, t.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const E = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (E < v)
              await this.copyExistingData(E, v);
            else if (E > v)
              throw (0, t.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (a = this.searchHeaderListEnd(o, a), a === -1) {
              this.readState = l.HEADER;
              return;
            }
          }
          const s = this.partIndexToLength[this.partIndex], r = a + s, m = Math.min(r, o.length);
          if (await this.processPartStarted(o, a, m), this.remainingPartDataCount = s - (m - a), this.remainingPartDataCount > 0)
            return;
          if (a = r + this.boundaryLength, a >= o.length) {
            this.ignoreByteCount = this.boundaryLength - (o.length - r);
            return;
          }
        }
      }
    }
    copyExistingData(o, a) {
      return new Promise((s, r) => {
        const m = () => {
          if (o === a) {
            s();
            return;
          }
          const v = this.options.tasks[o];
          if (v.kind !== c.OperationKind.COPY) {
            r(new Error("Task kind must be COPY"));
            return;
          }
          i(v, this.out, this.options.oldFileFd, r, () => {
            o++, m();
          });
        };
        m();
      });
    }
    searchHeaderListEnd(o, a) {
      const s = o.indexOf(f, a);
      if (s !== -1)
        return s + f.length;
      const r = a === 0 ? o : o.slice(a);
      return this.headerListBuffer == null ? this.headerListBuffer = r : this.headerListBuffer = Buffer.concat([this.headerListBuffer, r]), -1;
    }
    onPartEnd() {
      const o = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== o)
        throw (0, t.newError)(`Expected length: ${o} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(o, a, s) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(o, a, s);
    }
    processPartData(o, a, s) {
      this.actualPartLength += s - a;
      const r = this.out;
      return r.write(a === 0 && o.length === s ? o : o.slice(a, s)) ? Promise.resolve() : new Promise((m, v) => {
        r.on("error", v), r.once("drain", () => {
          r.removeListener("error", v), m();
        });
      });
    }
  };
  return Ut.DataSplitter = h, Ut;
}
var ar = {}, nl;
function Nf() {
  if (nl) return ar;
  nl = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.executeTasksUsingMultipleRangeRequests = c, ar.checkIsRangesSupported = l;
  const t = qe(), u = au(), d = ca();
  function c(i, h, n, o, a) {
    const s = (r) => {
      if (r >= h.length) {
        i.fileMetadataBuffer != null && n.write(i.fileMetadataBuffer), n.end();
        return;
      }
      const m = r + 1e3;
      f(i, {
        tasks: h,
        start: r,
        end: Math.min(h.length, m),
        oldFileFd: o
      }, n, () => s(m), a);
    };
    return s;
  }
  function f(i, h, n, o, a) {
    let s = "bytes=", r = 0;
    const m = /* @__PURE__ */ new Map(), v = [];
    for (let S = h.start; S < h.end; S++) {
      const R = h.tasks[S];
      R.kind === d.OperationKind.DOWNLOAD && (s += `${R.start}-${R.end - 1}, `, m.set(r, S), r++, v.push(R.end - R.start));
    }
    if (r <= 1) {
      const S = (R) => {
        if (R >= h.end) {
          o();
          return;
        }
        const O = h.tasks[R++];
        if (O.kind === d.OperationKind.COPY)
          (0, u.copyData)(O, n, h.oldFileFd, a, () => S(R));
        else {
          const P = i.createRequestOptions();
          P.headers.Range = `bytes=${O.start}-${O.end - 1}`;
          const M = i.httpExecutor.createRequest(P, (C) => {
            l(C, a) && (C.pipe(n, {
              end: !1
            }), C.once("end", () => S(R)));
          });
          i.httpExecutor.addErrorAndTimeoutHandlers(M, a), M.end();
        }
      };
      S(h.start);
      return;
    }
    const E = i.createRequestOptions();
    E.headers.Range = s.substring(0, s.length - 2);
    const p = i.httpExecutor.createRequest(E, (S) => {
      if (!l(S, a))
        return;
      const R = (0, t.safeGetHeader)(S, "content-type"), O = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(R);
      if (O == null) {
        a(new Error(`Content-Type "multipart/byteranges" is expected, but got "${R}"`));
        return;
      }
      const P = new u.DataSplitter(n, h, m, O[1] || O[2], v, o);
      P.on("error", a), S.pipe(P), S.on("end", () => {
        setTimeout(() => {
          p.abort(), a(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    i.httpExecutor.addErrorAndTimeoutHandlers(p, a), p.end();
  }
  function l(i, h) {
    if (i.statusCode >= 400)
      return h((0, t.createHttpError)(i)), !1;
    if (i.statusCode !== 206) {
      const n = (0, t.safeGetHeader)(i, "accept-ranges");
      if (n == null || n === "none")
        return h(new Error(`Server doesn't support Accept-Ranges (response code ${i.statusCode})`)), !1;
    }
    return !0;
  }
  return ar;
}
var or = {}, il;
function Ff() {
  if (il) return or;
  il = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.ProgressDifferentialDownloadCallbackTransform = void 0;
  const t = mr;
  var u;
  (function(c) {
    c[c.COPY = 0] = "COPY", c[c.DOWNLOAD = 1] = "DOWNLOAD";
  })(u || (u = {}));
  let d = class extends t.Transform {
    constructor(f, l, i) {
      super(), this.progressDifferentialDownloadInfo = f, this.cancellationToken = l, this.onProgress = i, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = u.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, l, i) {
      if (this.cancellationToken.cancelled) {
        i(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == u.COPY) {
        i(null, f);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const h = Date.now();
      h >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = h + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((h - this.start) / 1e3))
      }), this.delta = 0), i(null, f);
    }
    beginFileCopy() {
      this.operationType = u.COPY;
    }
    beginRangeDownload() {
      this.operationType = u.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, f(null);
    }
  };
  return or.ProgressDifferentialDownloadCallbackTransform = d, or;
}
var al;
function ou() {
  if (al) return ir;
  al = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.DifferentialDownloader = void 0;
  const t = qe(), u = /* @__PURE__ */ gt(), d = ke, c = au(), f = qt, l = ca(), i = Nf(), h = Ff();
  let n = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(r, m, v) {
      this.blockAwareFileInfo = r, this.httpExecutor = m, this.options = v, this.fileMetadataBuffer = null, this.logger = v.logger;
    }
    createRequestOptions() {
      const r = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, t.configureRequestUrl)(this.options.newUrl, r), (0, t.configureRequestOptions)(r), r;
    }
    doDownload(r, m) {
      if (r.version !== m.version)
        throw new Error(`version is different (${r.version} - ${m.version}), full download is required`);
      const v = this.logger, E = (0, l.computeOperations)(r, m, v);
      v.debug != null && v.debug(JSON.stringify(E, null, 2));
      let p = 0, S = 0;
      for (const O of E) {
        const P = O.end - O.start;
        O.kind === l.OperationKind.DOWNLOAD ? p += P : S += P;
      }
      const R = this.blockAwareFileInfo.size;
      if (p + S + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== R)
        throw new Error(`Internal error, size mismatch: downloadSize: ${p}, copySize: ${S}, newSize: ${R}`);
      return v.info(`Full: ${o(R)}, To download: ${o(p)} (${Math.round(p / (R / 100))}%)`), this.downloadFile(E);
    }
    downloadFile(r) {
      const m = [], v = () => Promise.all(m.map((E) => (0, u.close)(E.descriptor).catch((p) => {
        this.logger.error(`cannot close file "${E.path}": ${p}`);
      })));
      return this.doDownloadFile(r, m).then(v).catch((E) => v().catch((p) => {
        try {
          this.logger.error(`cannot close files: ${p}`);
        } catch (S) {
          try {
            console.error(S);
          } catch {
          }
        }
        throw E;
      }).then(() => {
        throw E;
      }));
    }
    async doDownloadFile(r, m) {
      const v = await (0, u.open)(this.options.oldFile, "r");
      m.push({ descriptor: v, path: this.options.oldFile });
      const E = await (0, u.open)(this.options.newFile, "w");
      m.push({ descriptor: E, path: this.options.newFile });
      const p = (0, d.createWriteStream)(this.options.newFile, { fd: E });
      await new Promise((S, R) => {
        const O = [];
        let P;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const L = [];
          let k = 0;
          for (const I of r)
            I.kind === l.OperationKind.DOWNLOAD && (L.push(I.end - I.start), k += I.end - I.start);
          const N = {
            expectedByteCounts: L,
            grandTotal: k
          };
          P = new h.ProgressDifferentialDownloadCallbackTransform(N, this.options.cancellationToken, this.options.onProgress), O.push(P);
        }
        const M = new t.DigestTransform(this.blockAwareFileInfo.sha512);
        M.isValidateOnEnd = !1, O.push(M), p.on("finish", () => {
          p.close(() => {
            m.splice(1, 1);
            try {
              M.validate();
            } catch (L) {
              R(L);
              return;
            }
            S(void 0);
          });
        }), O.push(p);
        let C = null;
        for (const L of O)
          L.on("error", R), C == null ? C = L : C = C.pipe(L);
        const A = O[0];
        let T;
        if (this.options.isUseMultipleRangeRequest) {
          T = (0, i.executeTasksUsingMultipleRangeRequests)(this, r, A, v, R), T(0);
          return;
        }
        let y = 0, q = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const U = this.createRequestOptions();
        U.redirect = "manual", T = (L) => {
          var k, N;
          if (L >= r.length) {
            this.fileMetadataBuffer != null && A.write(this.fileMetadataBuffer), A.end();
            return;
          }
          const I = r[L++];
          if (I.kind === l.OperationKind.COPY) {
            P && P.beginFileCopy(), (0, c.copyData)(I, A, v, R, () => T(L));
            return;
          }
          const F = `bytes=${I.start}-${I.end - 1}`;
          U.headers.range = F, (N = (k = this.logger) === null || k === void 0 ? void 0 : k.debug) === null || N === void 0 || N.call(k, `download range: ${F}`), P && P.beginRangeDownload();
          const $ = this.httpExecutor.createRequest(U, (J) => {
            J.on("error", R), J.on("aborted", () => {
              R(new Error("response has been aborted by the server"));
            }), J.statusCode >= 400 && R((0, t.createHttpError)(J)), J.pipe(A, {
              end: !1
            }), J.once("end", () => {
              P && P.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => T(L), 1e3)) : T(L);
            });
          });
          $.on("redirect", (J, W, ne) => {
            this.logger.info(`Redirect to ${a(ne)}`), q = ne, (0, t.configureRequestUrl)(new f.URL(q), U), $.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers($, R), $.end();
        }, T(0);
      });
    }
    async readRemoteBytes(r, m) {
      const v = Buffer.allocUnsafe(m + 1 - r), E = this.createRequestOptions();
      E.headers.range = `bytes=${r}-${m}`;
      let p = 0;
      if (await this.request(E, (S) => {
        S.copy(v, p), p += S.length;
      }), p !== v.length)
        throw new Error(`Received data length ${p} is not equal to expected ${v.length}`);
      return v;
    }
    request(r, m) {
      return new Promise((v, E) => {
        const p = this.httpExecutor.createRequest(r, (S) => {
          (0, i.checkIsRangesSupported)(S, E) && (S.on("error", E), S.on("aborted", () => {
            E(new Error("response has been aborted by the server"));
          }), S.on("data", m), S.on("end", () => v()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(p, E), p.end();
      });
    }
  };
  ir.DifferentialDownloader = n;
  function o(s, r = " KB") {
    return new Intl.NumberFormat("en").format((s / 1024).toFixed(2)) + r;
  }
  function a(s) {
    const r = s.indexOf("?");
    return r < 0 ? s : s.substring(0, r);
  }
  return ir;
}
var ol;
function xf() {
  if (ol) return nr;
  ol = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.GenericDifferentialDownloader = void 0;
  const t = ou();
  let u = class extends t.DifferentialDownloader {
    download(c, f) {
      return this.doDownload(c, f);
    }
  };
  return nr.GenericDifferentialDownloader = u, nr;
}
var Xi = {}, sl;
function Dt() {
  return sl || (sl = 1, function(t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.UpdaterSignal = t.UPDATE_DOWNLOADED = t.DOWNLOAD_PROGRESS = t.CancellationToken = void 0, t.addHandler = c;
    const u = qe();
    Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function() {
      return u.CancellationToken;
    } }), t.DOWNLOAD_PROGRESS = "download-progress", t.UPDATE_DOWNLOADED = "update-downloaded";
    class d {
      constructor(l) {
        this.emitter = l;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(l) {
        c(this.emitter, "login", l);
      }
      progress(l) {
        c(this.emitter, t.DOWNLOAD_PROGRESS, l);
      }
      updateDownloaded(l) {
        c(this.emitter, t.UPDATE_DOWNLOADED, l);
      }
      updateCancelled(l) {
        c(this.emitter, "update-cancelled", l);
      }
    }
    t.UpdaterSignal = d;
    function c(f, l, i) {
      f.on(l, i);
    }
  }(Xi)), Xi;
}
var ll;
function fa() {
  if (ll) return Tt;
  ll = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.NoOpLogger = Tt.AppUpdater = void 0;
  const t = qe(), u = gr, d = Mr, c = Pl, f = /* @__PURE__ */ gt(), l = na(), i = Kc(), h = be, n = ru(), o = Af(), a = Rf(), s = Cf(), r = nu(), m = Df(), v = Dl, E = It(), p = xf(), S = Dt();
  let R = class su extends c.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(C) {
      if (this._channel != null) {
        if (typeof C != "string")
          throw (0, t.newError)(`Channel must be a string, but got: ${C}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (C.length === 0)
          throw (0, t.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = C, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(C) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: C
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, s.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(C) {
      this._logger = C ?? new P();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(C) {
      this.clientPromise = null, this._appUpdateConfigPath = C, this.configOnDisk = new i.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(C) {
      C && (this._isUpdateSupported = C);
    }
    constructor(C, A) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new S.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (q) => this.checkIfUpdateSupported(q), this.clientPromise = null, this.stagingUserIdPromise = new i.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new i.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (q) => {
        this._logger.error(`Error: ${q.stack || q.message}`);
      }), A == null ? (this.app = new a.ElectronAppAdapter(), this.httpExecutor = new s.ElectronHttpExecutor((q, U) => this.emit("login", q, U))) : (this.app = A, this.httpExecutor = null);
      const T = this.app.version, y = (0, n.parse)(T);
      if (y == null)
        throw (0, t.newError)(`App version is not a valid semver version: "${T}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = y, this.allowPrerelease = O(y), C != null && (this.setFeedURL(C), typeof C != "string" && C.requestHeaders && (this.requestHeaders = C.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(C) {
      const A = this.createProviderRuntimeOptions();
      let T;
      typeof C == "string" ? T = new r.GenericProvider({ provider: "generic", url: C }, this, {
        ...A,
        isUseMultipleRangeRequest: (0, m.isUrlProbablySupportMultiRangeRequests)(C)
      }) : T = (0, m.createClient)(C, this, A), this.clientPromise = Promise.resolve(T);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let C = this.checkForUpdatesPromise;
      if (C != null)
        return this._logger.info("Checking for update (already in progress)"), C;
      const A = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), C = this.doCheckForUpdates().then((T) => (A(), T)).catch((T) => {
        throw A(), this.emit("error", T, `Cannot check for updates: ${(T.stack || T).toString()}`), T;
      }), this.checkForUpdatesPromise = C, C;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(C) {
      return this.checkForUpdates().then((A) => A != null && A.downloadPromise ? (A.downloadPromise.then(() => {
        const T = su.formatDownloadNotification(A.updateInfo.version, this.app.name, C);
        new Ot.Notification(T).show();
      }), A) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), A));
    }
    static formatDownloadNotification(C, A, T) {
      return T == null && (T = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), T = {
        title: T.title.replace("{appName}", A).replace("{version}", C),
        body: T.body.replace("{appName}", A).replace("{version}", C)
      }, T;
    }
    async isStagingMatch(C) {
      const A = C.stagingPercentage;
      let T = A;
      if (T == null)
        return !0;
      if (T = parseInt(T, 10), isNaN(T))
        return this._logger.warn(`Staging percentage is NaN: ${A}`), !0;
      T = T / 100;
      const y = await this.stagingUserIdPromise.value, U = t.UUID.parse(y).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${T}, percentage: ${U}, user id: ${y}`), U < T;
    }
    computeFinalHeaders(C) {
      return this.requestHeaders != null && Object.assign(C, this.requestHeaders), C;
    }
    async isUpdateAvailable(C) {
      const A = (0, n.parse)(C.version);
      if (A == null)
        throw (0, t.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${C.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const T = this.currentVersion;
      if ((0, n.eq)(A, T) || !await Promise.resolve(this.isUpdateSupported(C)) || !await this.isStagingMatch(C))
        return !1;
      const q = (0, n.gt)(A, T), U = (0, n.lt)(A, T);
      return q ? !0 : this.allowDowngrade && U;
    }
    checkIfUpdateSupported(C) {
      const A = C == null ? void 0 : C.minimumSystemVersion, T = (0, d.release)();
      if (A)
        try {
          if ((0, n.lt)(T, A))
            return this._logger.info(`Current OS version ${T} is less than the minimum OS version required ${A} for version ${T}`), !1;
        } catch (y) {
          this._logger.warn(`Failed to compare current OS version(${T}) with minimum OS version(${A}): ${(y.message || y).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((T) => (0, m.createClient)(T, this, this.createProviderRuntimeOptions())));
      const C = await this.clientPromise, A = await this.stagingUserIdPromise.value;
      return C.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": A })), {
        info: await C.getLatestVersion(),
        provider: C
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const C = await this.getUpdateInfoAndProvider(), A = C.info;
      if (!await this.isUpdateAvailable(A))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${A.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", A), {
          isUpdateAvailable: !1,
          versionInfo: A,
          updateInfo: A
        };
      this.updateInfoAndProvider = C, this.onUpdateAvailable(A);
      const T = new t.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: A,
        updateInfo: A,
        cancellationToken: T,
        downloadPromise: this.autoDownload ? this.downloadUpdate(T) : null
      };
    }
    onUpdateAvailable(C) {
      this._logger.info(`Found version ${C.version} (url: ${(0, t.asArray)(C.files).map((A) => A.url).join(", ")})`), this.emit("update-available", C);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(C = new t.CancellationToken()) {
      const A = this.updateInfoAndProvider;
      if (A == null) {
        const y = new Error("Please check update first");
        return this.dispatchError(y), Promise.reject(y);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, t.asArray)(A.info.files).map((y) => y.url).join(", ")}`);
      const T = (y) => {
        if (!(y instanceof t.CancellationError))
          try {
            this.dispatchError(y);
          } catch (q) {
            this._logger.warn(`Cannot dispatch error event: ${q.stack || q}`);
          }
        return y;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: A,
        requestHeaders: this.computeRequestHeaders(A.provider),
        cancellationToken: C,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((y) => {
        throw T(y);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(C) {
      this.emit("error", C, (C.stack || C).toString());
    }
    dispatchUpdateDownloaded(C) {
      this.emit(S.UPDATE_DOWNLOADED, C);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, l.load)(await (0, f.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(C) {
      const A = C.fileExtraDownloadHeaders;
      if (A != null) {
        const T = this.requestHeaders;
        return T == null ? A : {
          ...A,
          ...T
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const C = h.join(this.app.userDataPath, ".updaterId");
      try {
        const T = await (0, f.readFile)(C, "utf-8");
        if (t.UUID.check(T))
          return T;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${T}`);
      } catch (T) {
        T.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${T}`);
      }
      const A = t.UUID.v5((0, u.randomBytes)(4096), t.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${A}`);
      try {
        await (0, f.outputFile)(C, A);
      } catch (T) {
        this._logger.warn(`Couldn't write out staging user ID: ${T}`);
      }
      return A;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const C = this.requestHeaders;
      if (C == null)
        return !0;
      for (const A of Object.keys(C)) {
        const T = A.toLowerCase();
        if (T === "authorization" || T === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let C = this.downloadedUpdateHelper;
      if (C == null) {
        const A = (await this.configOnDisk.value).updaterCacheDirName, T = this._logger;
        A == null && T.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const y = h.join(this.app.baseCachePath, A || this.app.name);
        T.debug != null && T.debug(`updater cache dir: ${y}`), C = new o.DownloadedUpdateHelper(y), this.downloadedUpdateHelper = C;
      }
      return C;
    }
    async executeDownload(C) {
      const A = C.fileInfo, T = {
        headers: C.downloadUpdateOptions.requestHeaders,
        cancellationToken: C.downloadUpdateOptions.cancellationToken,
        sha2: A.info.sha2,
        sha512: A.info.sha512
      };
      this.listenerCount(S.DOWNLOAD_PROGRESS) > 0 && (T.onProgress = (ie) => this.emit(S.DOWNLOAD_PROGRESS, ie));
      const y = C.downloadUpdateOptions.updateInfoAndProvider.info, q = y.version, U = A.packageInfo;
      function L() {
        const ie = decodeURIComponent(C.fileInfo.url.pathname);
        return ie.endsWith(`.${C.fileExtension}`) ? h.basename(ie) : C.fileInfo.info.url;
      }
      const k = await this.getOrCreateDownloadHelper(), N = k.cacheDirForPendingUpdate;
      await (0, f.mkdir)(N, { recursive: !0 });
      const I = L();
      let F = h.join(N, I);
      const $ = U == null ? null : h.join(N, `package-${q}${h.extname(U.path) || ".7z"}`), J = async (ie) => (await k.setDownloadedFile(F, $, y, A, I, ie), await C.done({
        ...y,
        downloadedFile: F
      }), $ == null ? [F] : [F, $]), W = this._logger, ne = await k.validateDownloadedPath(F, y, A, W);
      if (ne != null)
        return F = ne, await J(!1);
      const ce = async () => (await k.clear().catch(() => {
      }), await (0, f.unlink)(F).catch(() => {
      })), ue = await (0, o.createTempUpdateFile)(`temp-${I}`, N, W);
      try {
        await C.task(ue, T, $, ce), await (0, t.retry)(() => (0, f.rename)(ue, F), 60, 500, 0, 0, (ie) => ie instanceof Error && /^EBUSY:/.test(ie.message));
      } catch (ie) {
        throw await ce(), ie instanceof t.CancellationError && (W.info("cancelled"), this.emit("update-cancelled", y)), ie;
      }
      return W.info(`New version ${q} has been downloaded to ${F}`), await J(!0);
    }
    async differentialDownloadInstaller(C, A, T, y, q) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const U = (0, E.blockmapFiles)(C.url, this.app.version, A.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${U[0]}", new: ${U[1]})`);
        const L = async (I) => {
          const F = await this.httpExecutor.downloadToBuffer(I, {
            headers: A.requestHeaders,
            cancellationToken: A.cancellationToken
          });
          if (F == null || F.length === 0)
            throw new Error(`Blockmap "${I.href}" is empty`);
          try {
            return JSON.parse((0, v.gunzipSync)(F).toString());
          } catch ($) {
            throw new Error(`Cannot parse blockmap "${I.href}", error: ${$}`);
          }
        }, k = {
          newUrl: C.url,
          oldFile: h.join(this.downloadedUpdateHelper.cacheDir, q),
          logger: this._logger,
          newFile: T,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          requestHeaders: A.requestHeaders,
          cancellationToken: A.cancellationToken
        };
        this.listenerCount(S.DOWNLOAD_PROGRESS) > 0 && (k.onProgress = (I) => this.emit(S.DOWNLOAD_PROGRESS, I));
        const N = await Promise.all(U.map((I) => L(I)));
        return await new p.GenericDifferentialDownloader(C.info, this.httpExecutor, k).download(N[0], N[1]), !1;
      } catch (U) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${U.stack || U}`), this._testOnlyOptions != null)
          throw U;
        return !0;
      }
    }
  };
  Tt.AppUpdater = R;
  function O(M) {
    const C = (0, n.prerelease)(M);
    return C != null && C.length > 0;
  }
  class P {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(C) {
    }
  }
  return Tt.NoOpLogger = P, Tt;
}
var ul;
function jt() {
  if (ul) return Vt;
  ul = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.BaseUpdater = void 0;
  const t = qr, u = fa();
  let d = class extends u.AppUpdater {
    constructor(f, l) {
      super(f, l), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(f = !1, l = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(f, f ? l : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Ot.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(f) {
      return super.executeDownload({
        ...f,
        done: (l) => (this.dispatchUpdateDownloaded(l), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(f = !1, l = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const i = this.downloadedUpdateHelper, h = this.installerPath, n = i == null ? null : i.downloadedFileInfo;
      if (h == null || n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${f}, isForceRunAfter: ${l}`), this.doInstall({
          isSilent: f,
          isForceRunAfter: l,
          isAdminRightsRequired: n.isAdminRightsRequired
        });
      } catch (o) {
        return this.dispatchError(o), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((f) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (f !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${f}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: f } = this.app, l = `"${f} would like to update"`, i = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), h = [i];
      return /kdesudo/i.test(i) ? (h.push("--comment", l), h.push("-c")) : /gksudo/i.test(i) ? h.push("--message", l) : /pkexec/i.test(i) && h.push("--disable-internal-agent"), h.join(" ");
    }
    spawnSyncLog(f, l = [], i = {}) {
      this._logger.info(`Executing: ${f} with args: ${l}`);
      const h = (0, t.spawnSync)(f, l, {
        env: { ...process.env, ...i },
        encoding: "utf-8",
        shell: !0
      }), { error: n, status: o, stdout: a, stderr: s } = h;
      if (n != null)
        throw this._logger.error(s), n;
      if (o != null && o !== 0)
        throw this._logger.error(s), new Error(`Command ${f} exited with code ${o}`);
      return a.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(f, l = [], i = void 0, h = "ignore") {
      return this._logger.info(`Executing: ${f} with args: ${l}`), new Promise((n, o) => {
        try {
          const a = { stdio: h, env: i, detached: !0 }, s = (0, t.spawn)(f, l, a);
          s.on("error", (r) => {
            o(r);
          }), s.unref(), s.pid !== void 0 && n(!0);
        } catch (a) {
          o(a);
        }
      });
    }
  };
  return Vt.BaseUpdater = d, Vt;
}
var sr = {}, lr = {}, cl;
function lu() {
  if (cl) return lr;
  cl = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const t = /* @__PURE__ */ gt(), u = ou(), d = Dl;
  let c = class extends u.DifferentialDownloader {
    async download() {
      const h = this.blockAwareFileInfo, n = h.size, o = n - (h.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(o, n - 1);
      const a = f(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await l(this.options.oldFile), a);
    }
  };
  lr.FileWithEmbeddedBlockMapDifferentialDownloader = c;
  function f(i) {
    return JSON.parse((0, d.inflateRawSync)(i).toString());
  }
  async function l(i) {
    const h = await (0, t.open)(i, "r");
    try {
      const n = (await (0, t.fstat)(h)).size, o = Buffer.allocUnsafe(4);
      await (0, t.read)(h, o, 0, o.length, n - o.length);
      const a = Buffer.allocUnsafe(o.readUInt32BE(0));
      return await (0, t.read)(h, a, 0, a.length, n - o.length - a.length), await (0, t.close)(h), f(a);
    } catch (n) {
      throw await (0, t.close)(h), n;
    }
  }
  return lr;
}
var fl;
function dl() {
  if (fl) return sr;
  fl = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.AppImageUpdater = void 0;
  const t = qe(), u = qr, d = /* @__PURE__ */ gt(), c = ke, f = be, l = jt(), i = lu(), h = Je(), n = Dt();
  let o = class extends l.BaseUpdater {
    constructor(s, r) {
      super(s, r);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(s) {
      const r = s.updateInfoAndProvider.provider, m = (0, h.findFile)(r.resolveFiles(s.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: m,
        downloadUpdateOptions: s,
        task: async (v, E) => {
          const p = process.env.APPIMAGE;
          if (p == null)
            throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (s.disableDifferentialDownload || await this.downloadDifferential(m, p, v, r, s)) && await this.httpExecutor.download(m.url, v, E), await (0, d.chmod)(v, 493);
        }
      });
    }
    async downloadDifferential(s, r, m, v, E) {
      try {
        const p = {
          newUrl: s.url,
          oldFile: r,
          logger: this._logger,
          newFile: m,
          isUseMultipleRangeRequest: v.isUseMultipleRangeRequest,
          requestHeaders: E.requestHeaders,
          cancellationToken: E.cancellationToken
        };
        return this.listenerCount(n.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (S) => this.emit(n.DOWNLOAD_PROGRESS, S)), await new i.FileWithEmbeddedBlockMapDifferentialDownloader(s.info, this.httpExecutor, p).download(), !1;
      } catch (p) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${p.stack || p}`), process.platform === "linux";
      }
    }
    doInstall(s) {
      const r = process.env.APPIMAGE;
      if (r == null)
        throw (0, t.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, c.unlinkSync)(r);
      let m;
      const v = f.basename(r), E = this.installerPath;
      if (E == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      f.basename(E) === v || !/\d+\.\d+\.\d+/.test(v) ? m = r : m = f.join(f.dirname(r), f.basename(E)), (0, u.execFileSync)("mv", ["-f", E, m]), m !== r && this.emit("appimage-filename-updated", m);
      const p = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return s.isForceRunAfter ? this.spawnLog(m, [], p) : (p.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, u.execFileSync)(m, [], { env: p })), !0;
    }
  };
  return sr.AppImageUpdater = o, sr;
}
var ur = {}, hl;
function pl() {
  if (hl) return ur;
  hl = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.DebUpdater = void 0;
  const t = jt(), u = Je(), d = Dt();
  let c = class extends t.BaseUpdater {
    constructor(l, i) {
      super(l, i);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const i = l.updateInfoAndProvider.provider, h = (0, u.findFile)(i.resolveFiles(l.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: h,
        downloadUpdateOptions: l,
        task: async (n, o) => {
          this.listenerCount(d.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(d.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(h.url, n, o);
        }
      });
    }
    get installerPath() {
      var l, i;
      return (i = (l = super.installerPath) === null || l === void 0 ? void 0 : l.replace(/ /g, "\\ ")) !== null && i !== void 0 ? i : null;
    }
    doInstall(l) {
      const i = this.wrapSudo(), h = /pkexec/i.test(i) ? "" : '"', n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const o = ["dpkg", "-i", n, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(i, [`${h}/bin/bash`, "-c", `'${o.join(" ")}'${h}`]), l.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return ur.DebUpdater = c, ur;
}
var cr = {}, ml;
function gl() {
  if (ml) return cr;
  ml = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.PacmanUpdater = void 0;
  const t = jt(), u = Dt(), d = Je();
  let c = class extends t.BaseUpdater {
    constructor(l, i) {
      super(l, i);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const i = l.updateInfoAndProvider.provider, h = (0, d.findFile)(i.resolveFiles(l.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: h,
        downloadUpdateOptions: l,
        task: async (n, o) => {
          this.listenerCount(u.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(u.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(h.url, n, o);
        }
      });
    }
    get installerPath() {
      var l, i;
      return (i = (l = super.installerPath) === null || l === void 0 ? void 0 : l.replace(/ /g, "\\ ")) !== null && i !== void 0 ? i : null;
    }
    doInstall(l) {
      const i = this.wrapSudo(), h = /pkexec/i.test(i) ? "" : '"', n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const o = ["pacman", "-U", "--noconfirm", n];
      return this.spawnSyncLog(i, [`${h}/bin/bash`, "-c", `'${o.join(" ")}'${h}`]), l.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return cr.PacmanUpdater = c, cr;
}
var fr = {}, vl;
function El() {
  if (vl) return fr;
  vl = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.RpmUpdater = void 0;
  const t = jt(), u = Dt(), d = Je();
  let c = class extends t.BaseUpdater {
    constructor(l, i) {
      super(l, i);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const i = l.updateInfoAndProvider.provider, h = (0, d.findFile)(i.resolveFiles(l.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: h,
        downloadUpdateOptions: l,
        task: async (n, o) => {
          this.listenerCount(u.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(u.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(h.url, n, o);
        }
      });
    }
    get installerPath() {
      var l, i;
      return (i = (l = super.installerPath) === null || l === void 0 ? void 0 : l.replace(/ /g, "\\ ")) !== null && i !== void 0 ? i : null;
    }
    doInstall(l) {
      const i = this.wrapSudo(), h = /pkexec/i.test(i) ? "" : '"', n = this.spawnSyncLog("which zypper"), o = this.installerPath;
      if (o == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      let a;
      return n ? a = [n, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", o] : a = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", o], this.spawnSyncLog(i, [`${h}/bin/bash`, "-c", `'${a.join(" ")}'${h}`]), l.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return fr.RpmUpdater = c, fr;
}
var dr = {}, yl;
function wl() {
  if (yl) return dr;
  yl = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.MacUpdater = void 0;
  const t = qe(), u = /* @__PURE__ */ gt(), d = ke, c = be, f = uc, l = fa(), i = Je(), h = qr, n = gr;
  let o = class extends l.AppUpdater {
    constructor(s, r) {
      super(s, r), this.nativeUpdater = Ot.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (m) => {
        this._logger.warn(m), this.emit("error", m);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(s) {
      this._logger.debug != null && this._logger.debug(s);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((s) => {
        s && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(s) {
      let r = s.updateInfoAndProvider.provider.resolveFiles(s.updateInfoAndProvider.info);
      const m = this._logger, v = "sysctl.proc_translated";
      let E = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), E = (0, h.execFileSync)("sysctl", [v], { encoding: "utf8" }).includes(`${v}: 1`), m.info(`Checked for macOS Rosetta environment (isRosetta=${E})`);
      } catch (M) {
        m.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${M}`);
      }
      let p = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const C = (0, h.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        m.info(`Checked 'uname -a': arm64=${C}`), p = p || C;
      } catch (M) {
        m.warn(`uname shell command to check for arm64 failed: ${M}`);
      }
      p = p || process.arch === "arm64" || E;
      const S = (M) => {
        var C;
        return M.url.pathname.includes("arm64") || ((C = M.info.url) === null || C === void 0 ? void 0 : C.includes("arm64"));
      };
      p && r.some(S) ? r = r.filter((M) => p === S(M)) : r = r.filter((M) => !S(M));
      const R = (0, i.findFile)(r, "zip", ["pkg", "dmg"]);
      if (R == null)
        throw (0, t.newError)(`ZIP file not provided: ${(0, t.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const O = s.updateInfoAndProvider.provider, P = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: R,
        downloadUpdateOptions: s,
        task: async (M, C) => {
          const A = c.join(this.downloadedUpdateHelper.cacheDir, P), T = () => (0, u.pathExistsSync)(A) ? !s.disableDifferentialDownload : (m.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let y = !0;
          T() && (y = await this.differentialDownloadInstaller(R, s, M, O, P)), y && await this.httpExecutor.download(R.url, M, C);
        },
        done: async (M) => {
          if (!s.disableDifferentialDownload)
            try {
              const C = c.join(this.downloadedUpdateHelper.cacheDir, P);
              await (0, u.copyFile)(M.downloadedFile, C);
            } catch (C) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${C.message}`);
            }
          return this.updateDownloaded(R, M);
        }
      });
    }
    async updateDownloaded(s, r) {
      var m;
      const v = r.downloadedFile, E = (m = s.info.size) !== null && m !== void 0 ? m : (await (0, u.stat)(v)).size, p = this._logger, S = `fileToProxy=${s.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${S})`), this.server = (0, f.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${S})`), this.server.on("close", () => {
        p.info(`Proxy server for native Squirrel.Mac is closed (${S})`);
      });
      const R = (O) => {
        const P = O.address();
        return typeof P == "string" ? P : `http://127.0.0.1:${P == null ? void 0 : P.port}`;
      };
      return await new Promise((O, P) => {
        const M = (0, n.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), C = Buffer.from(`autoupdater:${M}`, "ascii"), A = `/${(0, n.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (T, y) => {
          const q = T.url;
          if (p.info(`${q} requested`), q === "/") {
            if (!T.headers.authorization || T.headers.authorization.indexOf("Basic ") === -1) {
              y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), p.warn("No authenthication info");
              return;
            }
            const k = T.headers.authorization.split(" ")[1], N = Buffer.from(k, "base64").toString("ascii"), [I, F] = N.split(":");
            if (I !== "autoupdater" || F !== M) {
              y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), p.warn("Invalid authenthication credentials");
              return;
            }
            const $ = Buffer.from(`{ "url": "${R(this.server)}${A}" }`);
            y.writeHead(200, { "Content-Type": "application/json", "Content-Length": $.length }), y.end($);
            return;
          }
          if (!q.startsWith(A)) {
            p.warn(`${q} requested, but not supported`), y.writeHead(404), y.end();
            return;
          }
          p.info(`${A} requested by Squirrel.Mac, pipe ${v}`);
          let U = !1;
          y.on("finish", () => {
            U || (this.nativeUpdater.removeListener("error", P), O([]));
          });
          const L = (0, d.createReadStream)(v);
          L.on("error", (k) => {
            try {
              y.end();
            } catch (N) {
              p.warn(`cannot end response: ${N}`);
            }
            U = !0, this.nativeUpdater.removeListener("error", P), P(new Error(`Cannot pipe "${v}": ${k}`));
          }), y.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": E
          }), L.pipe(y);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${S})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${R(this.server)}, ${S})`), this.nativeUpdater.setFeedURL({
            url: R(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${C.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", P), this.nativeUpdater.checkForUpdates()) : O([]);
        });
      });
    }
    handleUpdateDownloaded() {
      this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return dr.MacUpdater = o, dr;
}
var hr = {}, kr = {}, _l;
function Lf() {
  if (_l) return kr;
  _l = 1, Object.defineProperty(kr, "__esModule", { value: !0 }), kr.verifySignature = f;
  const t = qe(), u = qr, d = Mr, c = be;
  function f(n, o, a) {
    return new Promise((s, r) => {
      const m = o.replace(/'/g, "''");
      a.info(`Verifying signature ${m}`), (0, u.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${m}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (v, E, p) => {
        var S;
        try {
          if (v != null || p) {
            i(a, v, p, r), s(null);
            return;
          }
          const R = l(E);
          if (R.Status === 0) {
            try {
              const C = c.normalize(R.Path), A = c.normalize(o);
              if (a.info(`LiteralPath: ${C}. Update Path: ${A}`), C !== A) {
                i(a, new Error(`LiteralPath of ${C} is different than ${A}`), p, r), s(null);
                return;
              }
            } catch (C) {
              a.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(S = C.message) !== null && S !== void 0 ? S : C.stack}`);
            }
            const P = (0, t.parseDn)(R.SignerCertificate.Subject);
            let M = !1;
            for (const C of n) {
              const A = (0, t.parseDn)(C);
              if (A.size ? M = Array.from(A.keys()).every((y) => A.get(y) === P.get(y)) : C === P.get("CN") && (a.warn(`Signature validated using only CN ${C}. Please add your full Distinguished Name (DN) to publisherNames configuration`), M = !0), M) {
                s(null);
                return;
              }
            }
          }
          const O = `publisherNames: ${n.join(" | ")}, raw info: ` + JSON.stringify(R, (P, M) => P === "RawData" ? void 0 : M, 2);
          a.warn(`Sign verification failed, installer signed with incorrect certificate: ${O}`), s(O);
        } catch (R) {
          i(a, R, null, r), s(null);
          return;
        }
      });
    });
  }
  function l(n) {
    const o = JSON.parse(n);
    delete o.PrivateKey, delete o.IsOSBinary, delete o.SignatureType;
    const a = o.SignerCertificate;
    return a != null && (delete a.Archived, delete a.Extensions, delete a.Handle, delete a.HasPrivateKey, delete a.SubjectName), o;
  }
  function i(n, o, a, s) {
    if (h()) {
      n.warn(`Cannot execute Get-AuthenticodeSignature: ${o || a}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, u.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (r) {
      n.warn(`Cannot execute ConvertTo-Json: ${r.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    o != null && s(o), a && s(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${a}. Failing signature validation due to unknown stderr.`));
  }
  function h() {
    const n = d.release();
    return n.startsWith("6.") && !n.startsWith("6.3");
  }
  return kr;
}
var Sl;
function Al() {
  if (Sl) return hr;
  Sl = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.NsisUpdater = void 0;
  const t = qe(), u = be, d = jt(), c = lu(), f = Dt(), l = Je(), i = /* @__PURE__ */ gt(), h = Lf(), n = qt;
  let o = class extends d.BaseUpdater {
    constructor(s, r) {
      super(s, r), this._verifyUpdateCodeSignature = (m, v) => (0, h.verifySignature)(m, v, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(s) {
      s && (this._verifyUpdateCodeSignature = s);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const r = s.updateInfoAndProvider.provider, m = (0, l.findFile)(r.resolveFiles(s.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: s,
        fileInfo: m,
        task: async (v, E, p, S) => {
          const R = m.packageInfo, O = R != null && p != null;
          if (O && s.disableWebInstaller)
            throw (0, t.newError)(`Unable to download new version ${s.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !O && !s.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (O || s.disableDifferentialDownload || await this.differentialDownloadInstaller(m, s, v, r, t.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(m.url, v, E);
          const P = await this.verifySignature(v);
          if (P != null)
            throw await S(), (0, t.newError)(`New version ${s.updateInfoAndProvider.info.version} is not signed by the application owner: ${P}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (O && await this.differentialDownloadWebPackage(s, R, p, r))
            try {
              await this.httpExecutor.download(new n.URL(R.path), p, {
                headers: s.requestHeaders,
                cancellationToken: s.cancellationToken,
                sha512: R.sha512
              });
            } catch (M) {
              try {
                await (0, i.unlink)(p);
              } catch {
              }
              throw M;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(s) {
      let r;
      try {
        if (r = (await this.configOnDisk.value).publisherName, r == null)
          return null;
      } catch (m) {
        if (m.code === "ENOENT")
          return null;
        throw m;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], s);
    }
    doInstall(s) {
      const r = this.installerPath;
      if (r == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const m = ["--updated"];
      s.isSilent && m.push("/S"), s.isForceRunAfter && m.push("--force-run"), this.installDirectory && m.push(`/D=${this.installDirectory}`);
      const v = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      v != null && m.push(`--package-file=${v}`);
      const E = () => {
        this.spawnLog(u.join(process.resourcesPath, "elevate.exe"), [r].concat(m)).catch((p) => this.dispatchError(p));
      };
      return s.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), E(), !0) : (this.spawnLog(r, m).catch((p) => {
        const S = p.code;
        this._logger.info(`Cannot run installer: error code: ${S}, error message: "${p.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), S === "UNKNOWN" || S === "EACCES" ? E() : S === "ENOENT" ? Ot.shell.openPath(r).catch((R) => this.dispatchError(R)) : this.dispatchError(p);
      }), !0);
    }
    async differentialDownloadWebPackage(s, r, m, v) {
      if (r.blockMapSize == null)
        return !0;
      try {
        const E = {
          newUrl: new n.URL(r.path),
          oldFile: u.join(this.downloadedUpdateHelper.cacheDir, t.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: m,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: v.isUseMultipleRangeRequest,
          cancellationToken: s.cancellationToken
        };
        this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (p) => this.emit(f.DOWNLOAD_PROGRESS, p)), await new c.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, E).download();
      } catch (E) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${E.stack || E}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return hr.NsisUpdater = o, hr;
}
var Tl;
function Uf() {
  return Tl || (Tl = 1, function(t) {
    var u = At && At.__createBinding || (Object.create ? function(p, S, R, O) {
      O === void 0 && (O = R);
      var P = Object.getOwnPropertyDescriptor(S, R);
      (!P || ("get" in P ? !S.__esModule : P.writable || P.configurable)) && (P = { enumerable: !0, get: function() {
        return S[R];
      } }), Object.defineProperty(p, O, P);
    } : function(p, S, R, O) {
      O === void 0 && (O = R), p[O] = S[R];
    }), d = At && At.__exportStar || function(p, S) {
      for (var R in p) R !== "default" && !Object.prototype.hasOwnProperty.call(S, R) && u(S, p, R);
    };
    Object.defineProperty(t, "__esModule", { value: !0 }), t.NsisUpdater = t.MacUpdater = t.RpmUpdater = t.PacmanUpdater = t.DebUpdater = t.AppImageUpdater = t.Provider = t.NoOpLogger = t.AppUpdater = t.BaseUpdater = void 0;
    const c = /* @__PURE__ */ gt(), f = be;
    var l = jt();
    Object.defineProperty(t, "BaseUpdater", { enumerable: !0, get: function() {
      return l.BaseUpdater;
    } });
    var i = fa();
    Object.defineProperty(t, "AppUpdater", { enumerable: !0, get: function() {
      return i.AppUpdater;
    } }), Object.defineProperty(t, "NoOpLogger", { enumerable: !0, get: function() {
      return i.NoOpLogger;
    } });
    var h = Je();
    Object.defineProperty(t, "Provider", { enumerable: !0, get: function() {
      return h.Provider;
    } });
    var n = dl();
    Object.defineProperty(t, "AppImageUpdater", { enumerable: !0, get: function() {
      return n.AppImageUpdater;
    } });
    var o = pl();
    Object.defineProperty(t, "DebUpdater", { enumerable: !0, get: function() {
      return o.DebUpdater;
    } });
    var a = gl();
    Object.defineProperty(t, "PacmanUpdater", { enumerable: !0, get: function() {
      return a.PacmanUpdater;
    } });
    var s = El();
    Object.defineProperty(t, "RpmUpdater", { enumerable: !0, get: function() {
      return s.RpmUpdater;
    } });
    var r = wl();
    Object.defineProperty(t, "MacUpdater", { enumerable: !0, get: function() {
      return r.MacUpdater;
    } });
    var m = Al();
    Object.defineProperty(t, "NsisUpdater", { enumerable: !0, get: function() {
      return m.NsisUpdater;
    } }), d(Dt(), t);
    let v;
    function E() {
      if (process.platform === "win32")
        v = new (Al()).NsisUpdater();
      else if (process.platform === "darwin")
        v = new (wl()).MacUpdater();
      else {
        v = new (dl()).AppImageUpdater();
        try {
          const p = f.join(process.resourcesPath, "package-type");
          if (!(0, c.existsSync)(p))
            return v;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const S = (0, c.readFileSync)(p).toString().trim();
          switch (console.info("Found package-type:", S), S) {
            case "deb":
              v = new (pl()).DebUpdater();
              break;
            case "rpm":
              v = new (El()).RpmUpdater();
              break;
            case "pacman":
              v = new (gl()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (p) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", p.message);
        }
      }
      return v;
    }
    Object.defineProperty(t, "autoUpdater", {
      enumerable: !0,
      get: () => v || E()
    });
  }(At)), At;
}
var ct = Uf();
const $f = {
  file: "文件",
  new: "新建",
  open: "打开",
  openFolder: "打开文件夹",
  save: "保存",
  exit: "退出",
  edit: "编辑",
  undo: "撤销",
  redo: "重做",
  cut: "剪切",
  copy: "复制",
  paste: "粘贴",
  delete: "删除",
  selectAll: "全选",
  view: "视图",
  reload: "重新加载",
  forceReload: "强制重新加载",
  toggleDevTools: "开发者工具",
  resetZoom: "重置缩放",
  zoomIn: "放大",
  zoomOut: "缩小",
  toggleFullscreen: "全屏",
  help: "帮助",
  about: "关于"
}, Ie = $f, kf = () => [
  {
    label: Ie.file,
    submenu: [
      {
        label: Ie.new,
        accelerator: "CmdOrCtrl+N",
        click: () => {
          console.log("新建文件");
        }
      },
      {
        label: Ie.open,
        accelerator: "CmdOrCtrl+O",
        click: () => {
          console.log("打开文件");
        }
      },
      {
        label: Ie.openFolder,
        accelerator: "CmdOrCtrl+Shift+O",
        click: () => {
          console.log("打开文件夹");
          const u = bl.getFocusedWindow();
          u && u.webContents.send("open-folder");
        }
      },
      { type: "separator" },
      {
        label: Ie.save,
        accelerator: "CmdOrCtrl+S",
        click: () => {
          console.log("保存文件");
        }
      },
      { type: "separator" },
      {
        label: Ie.exit,
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          kt.quit();
        }
      }
    ]
  },
  {
    label: Ie.edit,
    submenu: [
      { role: "undo", label: Ie.undo },
      { role: "redo", label: Ie.redo },
      { type: "separator" },
      { role: "cut", label: Ie.cut },
      { role: "copy", label: Ie.copy },
      { role: "paste", label: Ie.paste },
      { role: "delete", label: Ie.delete },
      { type: "separator" },
      { role: "selectAll", label: Ie.selectAll }
    ]
  },
  {
    label: Ie.view,
    submenu: [
      { role: "reload", label: Ie.reload },
      { role: "forceReload", label: Ie.forceReload },
      { role: "toggleDevTools", label: Ie.toggleDevTools },
      { type: "separator" },
      { role: "resetZoom", label: Ie.resetZoom },
      { role: "zoomIn", label: Ie.zoomIn },
      { role: "zoomOut", label: Ie.zoomOut },
      { type: "separator" },
      { role: "togglefullscreen", label: Ie.toggleFullscreen }
    ]
  },
  {
    label: Ie.help,
    submenu: [
      {
        label: Ie.about,
        click: () => {
          console.log("关于");
        }
      }
    ]
  }
], qf = () => {
  const t = kf();
  return Cl.buildFromTemplate(t);
};
let nt = null;
const Mf = sc(import.meta.url), Ki = oc(Mf);
function Rl() {
  if (nt = new bl({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "大触",
    titleBarStyle: "default",
    backgroundColor: "#1e1e1e",
    // 深色背景
    webPreferences: {
      preload: be.join(Ki, "preload.js"),
      // 确保使用正确的预加载脚本路径
      nodeIntegration: !1,
      contextIsolation: !0
    },
    // 窗口图标
    icon: be.join(Ki, "../public/logo.ico")
  }), process.env.VITE_DEV_SERVER_URL)
    nt.loadURL(process.env.VITE_DEV_SERVER_URL), nt.webContents.openDevTools();
  else {
    const t = be.join(Ki, "../dist/index.html");
    nt.loadFile(t);
  }
  nt.on("closed", () => {
    nt = null;
  }), nt.webContents.on("did-finish-load", () => {
  });
}
it.handle("set-native-theme", async (t, u) => {
  try {
    return rc.themeSource = u, { success: !0 };
  } catch (d) {
    return console.error("Error setting native theme:", d), { success: !1, error: d.message };
  }
});
it.handle("check-for-updates", async () => {
  try {
    const t = await ct.autoUpdater.checkForUpdates();
    return { success: !0, updateInfo: t == null ? void 0 : t.updateInfo };
  } catch (t) {
    return { success: !1, error: t.message };
  }
});
it.handle("get-app-version", () => kt.getVersion());
it.handle("get-files", async (t, u) => {
  try {
    return (await ke.promises.readdir(u, { withFileTypes: !0 })).map((c) => ({
      name: c.name,
      isDirectory: c.isDirectory(),
      path: be.join(u, c.name)
    }));
  } catch (d) {
    return console.error("Error reading directory:", d), [];
  }
});
it.handle("get-file-content", async (t, u) => {
  try {
    return await ke.promises.readFile(u, "utf-8");
  } catch (d) {
    throw console.error("Error reading file:", d), d;
  }
});
it.on("open-folder-dialog", async (t) => {
  if (nt)
    try {
      console.log("打开文件夹对话框");
      const u = await ic.showOpenDialog(nt, {
        properties: ["openDirectory"],
        title: "选择要打开的文件夹",
        buttonLabel: "打开文件夹"
      });
      if (!u.canceled && u.filePaths.length > 0) {
        const d = u.filePaths[0];
        console.log("用户选择的文件夹路径:", d);
        try {
          await ke.promises.access(d, ke.constants.R_OK), t.reply("selected-folder", d);
        } catch (c) {
          console.error("无法访问选择的文件夹:", c);
        }
      } else
        console.log("用户取消了文件夹选择");
    } catch (u) {
      console.error("打开文件夹对话框时出错:", u);
    }
  else
    console.error("主窗口不存在，无法打开文件夹对话框");
});
it.handle("create-file", async (t, u, d) => {
  try {
    await ke.promises.writeFile(u, d, "utf-8"), console.log("文件创建成功:", u);
  } catch (c) {
    throw console.error("创建文件失败:", c), c;
  }
});
it.handle("create-folder", async (t, u) => {
  try {
    await ke.promises.mkdir(u, { recursive: !0 }), console.log("文件夹创建成功:", u);
  } catch (d) {
    throw console.error("创建文件夹失败:", d), d;
  }
});
it.handle("delete-file", async (t, u) => {
  try {
    (await ke.promises.stat(u)).isDirectory() ? (await ke.promises.rmdir(u, { recursive: !0 }), console.log("文件夹删除成功:", u)) : (await ke.promises.unlink(u), console.log("文件删除成功:", u));
  } catch (d) {
    throw console.error("删除失败:", d), d;
  }
});
it.handle("show-in-explorer", async (t, u) => {
  try {
    nc.showItemInFolder(u), console.log("在资源管理器中显示:", u);
  } catch (d) {
    throw console.error("显示文件失败:", d), d;
  }
});
kt.whenReady().then(() => {
  ct.autoUpdater.checkForUpdatesAndNotify(), ct.autoUpdater.on("checking-for-update", () => {
    console.log("Checking for update...");
  }), ct.autoUpdater.on("update-available", (t) => {
    console.log("Update available.", t);
  }), ct.autoUpdater.on("update-not-available", (t) => {
    console.log("Update not available.", t);
  }), ct.autoUpdater.on("error", (t) => {
    console.log("Error in auto-updater. " + t);
  }), ct.autoUpdater.on("download-progress", (t) => {
    let u = "Download speed: " + t.bytesPerSecond;
    u = u + " - Downloaded " + t.percent + "%", u = u + " (" + t.transferred + "/" + t.total + ")", console.log(u);
  }), ct.autoUpdater.on("update-downloaded", (t) => {
    console.log("Update downloaded", t), ct.autoUpdater.quitAndInstall();
  }), Rl(), Cl.setApplicationMenu(qf()), kt.on("activate", () => {
    nt === null && Rl();
  });
});
kt.on("window-all-closed", () => {
  process.platform !== "darwin" && kt.quit();
});
