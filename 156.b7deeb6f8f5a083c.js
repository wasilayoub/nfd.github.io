(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [156],
  {
    65987: function (t) {
      "use strict";
      var e = {
        single_source_shortest_paths: function (t, i, n) {
          var r,
            o,
            s,
            a,
            l,
            u,
            h,
            c = {},
            d = {};
          d[i] = 0;
          var f = e.PriorityQueue.make();
          for (f.push(i, 0); !f.empty(); )
            for (s in ((o = (r = f.pop()).value),
            (a = r.cost),
            (l = t[o] || {})))
              l.hasOwnProperty(s) &&
                ((u = a + l[s]),
                (h = d[s]),
                (void 0 === d[s] || h > u) &&
                  ((d[s] = u), f.push(s, u), (c[s] = o)));
          if (void 0 !== n && void 0 === d[n])
            throw Error(
              ["Could not find a path from ", i, " to ", n, "."].join("")
            );
          return c;
        },
        extract_shortest_path_from_predecessor_list: function (t, e) {
          for (var i = [], n = e; n; ) i.push(n), t[n], (n = t[n]);
          return i.reverse(), i;
        },
        find_path: function (t, i, n) {
          var r = e.single_source_shortest_paths(t, i, n);
          return e.extract_shortest_path_from_predecessor_list(r, n);
        },
        PriorityQueue: {
          make: function (t) {
            var i,
              n = e.PriorityQueue,
              r = {};
            for (i in ((t = t || {}), n)) n.hasOwnProperty(i) && (r[i] = n[i]);
            return (r.queue = []), (r.sorter = t.sorter || n.default_sorter), r;
          },
          default_sorter: function (t, e) {
            return t.cost - e.cost;
          },
          push: function (t, e) {
            this.queue.push({ value: t, cost: e }),
              this.queue.sort(this.sorter);
          },
          pop: function () {
            return this.queue.shift();
          },
          empty: function () {
            return 0 === this.queue.length;
          },
        },
      };
      t.exports = e;
    },
    62378: function (t) {
      "use strict";
      t.exports = function (t) {
        for (var e = [], i = t.length, n = 0; n < i; n++) {
          var r = t.charCodeAt(n);
          if (r >= 55296 && r <= 56319 && i > n + 1) {
            var o = t.charCodeAt(n + 1);
            o >= 56320 &&
              o <= 57343 &&
              ((r = (r - 55296) * 1024 + o - 56320 + 65536), (n += 1));
          }
          if (r < 128) {
            e.push(r);
            continue;
          }
          if (r < 2048) {
            e.push((r >> 6) | 192), e.push((63 & r) | 128);
            continue;
          }
          if (r < 55296 || (r >= 57344 && r < 65536)) {
            e.push((r >> 12) | 224),
              e.push(((r >> 6) & 63) | 128),
              e.push((63 & r) | 128);
            continue;
          }
          if (r >= 65536 && r <= 1114111) {
            e.push((r >> 18) | 240),
              e.push(((r >> 12) & 63) | 128),
              e.push(((r >> 6) & 63) | 128),
              e.push((63 & r) | 128);
            continue;
          }
          e.push(239, 191, 189);
        }
        return new Uint8Array(e).buffer;
      };
    },
    24394: function (t, e, i) {
      "use strict";
      i.d(e, {
        K: function () {
          return n;
        },
        k: function () {
          return r;
        },
      });
      var n = function () {},
        r = function () {};
    },
    26496: function (t, e, i) {
      "use strict";
      i.d(e, {
        j: function () {
          return tu;
        },
      });
      let n = {
          duration: 0.3,
          delay: 0,
          endDelay: 0,
          repeat: 0,
          easing: "ease",
        },
        r = { ms: (t) => 1e3 * t, s: (t) => t / 1e3 },
        o = () => {},
        s = (t) => t;
      function a(t, e = !0) {
        if (t && "finished" !== t.playState)
          try {
            t.stop ? t.stop() : (e && t.commitStyles(), t.cancel());
          } catch (t) {}
      }
      let l = (t) => t(),
        u = (t, e, i = n.duration) =>
          new Proxy(
            { animations: t.map(l).filter(Boolean), duration: i, options: e },
            c
          ),
        h = (t) => t.animations[0],
        c = {
          get: (t, e) => {
            let i = h(t);
            switch (e) {
              case "duration":
                return t.duration;
              case "currentTime":
                return r.s((null == i ? void 0 : i[e]) || 0);
              case "playbackRate":
              case "playState":
                return null == i ? void 0 : i[e];
              case "finished":
                return (
                  t.finished ||
                    (t.finished = Promise.all(t.animations.map(d)).catch(o)),
                  t.finished
                );
              case "stop":
                return () => {
                  t.animations.forEach((t) => a(t));
                };
              case "forEachNative":
                return (e) => {
                  t.animations.forEach((i) => e(i, t));
                };
              default:
                return void 0 === (null == i ? void 0 : i[e])
                  ? void 0
                  : () => t.animations.forEach((t) => t[e]());
            }
          },
          set: (t, e, i) => {
            switch (e) {
              case "currentTime":
                i = r.ms(i);
              case "currentTime":
              case "playbackRate":
                for (let n = 0; n < t.animations.length; n++)
                  t.animations[n][e] = i;
                return !0;
            }
            return !1;
          },
        },
        d = (t) => t.finished,
        f = (t) => "object" == typeof t && Boolean(t.createAnimation),
        p = (t) => "number" == typeof t,
        g = (t) => Array.isArray(t) && !p(t[0]),
        m = (t, e, i) => -i * t + i * e + t,
        v = (t, e, i) => (e - t == 0 ? 1 : (i - t) / (e - t));
      function y(t, e) {
        let i = t[t.length - 1];
        for (let n = 1; n <= e; n++) {
          let r = v(0, e, n);
          t.push(m(i, 1, r));
        }
      }
      let A = (t, e, i) => {
          let n = e - t;
          return ((((i - t) % n) + n) % n) + t;
        },
        E = (t, e, i) => Math.min(Math.max(i, t), e),
        $ = (t, e, i) =>
          (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
      function _(t, e, i, n) {
        if (t === e && i === n) return s;
        let r = (e) =>
          (function (t, e, i, n, r) {
            let o, s;
            let a = 0;
            do (o = $((s = e + (i - e) / 2), n, r) - t) > 0 ? (i = s) : (e = s);
            while (Math.abs(o) > 1e-7 && ++a < 12);
            return s;
          })(e, 0, 1, t, i);
        return (t) => (0 === t || 1 === t ? t : $(r(t), e, n));
      }
      let w =
          (t, e = "end") =>
          (i) => {
            i = "end" === e ? Math.min(i, 0.999) : Math.max(i, 0.001);
            let n = i * t;
            return E(0, 1, ("end" === e ? Math.floor(n) : Math.ceil(n)) / t);
          },
        b = (t) => "function" == typeof t,
        C = (t) => Array.isArray(t) && p(t[0]),
        S = {
          ease: _(0.25, 0.1, 0.25, 1),
          "ease-in": _(0.42, 0, 1, 1),
          "ease-in-out": _(0.42, 0, 0.58, 1),
          "ease-out": _(0, 0, 0.58, 1),
        },
        T = /\((.*?)\)/;
      function P(t) {
        if (b(t)) return t;
        if (C(t)) return _(...t);
        if (S[t]) return S[t];
        if (t.startsWith("steps")) {
          let e = T.exec(t);
          if (e) {
            let t = e[1].split(",");
            return w(parseFloat(t[0]), t[1].trim());
          }
        }
        return s;
      }
      class N {
        constructor(
          t,
          e = [0, 1],
          {
            easing: i,
            duration: r = n.duration,
            delay: o = n.delay,
            endDelay: a = n.endDelay,
            repeat: l = n.repeat,
            offset: u,
            direction: h = "normal",
          } = {}
        ) {
          if (
            ((this.startTime = null),
            (this.rate = 1),
            (this.t = 0),
            (this.cancelTimestamp = null),
            (this.easing = s),
            (this.duration = 0),
            (this.totalDuration = 0),
            (this.repeat = 0),
            (this.playState = "idle"),
            (this.finished = new Promise((t, e) => {
              (this.resolve = t), (this.reject = e);
            })),
            f((i = i || n.easing)))
          ) {
            let t = i.createAnimation(e);
            (i = t.easing), (e = t.keyframes || e), (r = t.duration || r);
          }
          (this.repeat = l),
            (this.easing = g(i) ? s : P(i)),
            this.updateDuration(r);
          let c = (function (
            t,
            e = (function (t) {
              let e = [0];
              return y(e, t - 1), e;
            })(t.length),
            i = s
          ) {
            let n = t.length,
              r = n - e.length;
            return (
              r > 0 && y(e, r),
              (r) => {
                var o;
                let s = 0;
                for (; s < n - 2 && !(r < e[s + 1]); s++);
                let a = E(0, 1, v(e[s], e[s + 1], r)),
                  l = ((o = s), g(i) ? i[A(0, i.length, o)] : i);
                return (a = l(a)), m(t[s], t[s + 1], a);
              }
            );
          })(e, u, g(i) ? i.map(P) : s);
          (this.tick = (e) => {
            var i;
            let n = 0;
            (n =
              void 0 !== this.pauseTime
                ? this.pauseTime
                : (e - this.startTime) * this.rate),
              (this.t = n),
              (n /= 1e3),
              (n = Math.max(n - o, 0)),
              "finished" === this.playState &&
                void 0 === this.pauseTime &&
                (n = this.totalDuration);
            let r = n / this.duration,
              s = Math.floor(r),
              l = r % 1;
            !l && r >= 1 && (l = 1), 1 === l && s--;
            let u = s % 2;
            ("reverse" === h ||
              ("alternate" === h && u) ||
              ("alternate-reverse" === h && !u)) &&
              (l = 1 - l);
            let d = n >= this.totalDuration ? 1 : Math.min(l, 1),
              f = c(this.easing(d));
            t(f);
            let p =
              void 0 === this.pauseTime &&
              ("finished" === this.playState || n >= this.totalDuration + a);
            p
              ? ((this.playState = "finished"),
                null === (i = this.resolve) || void 0 === i || i.call(this, f))
              : "idle" !== this.playState &&
                (this.frameRequestId = requestAnimationFrame(this.tick));
          }),
            this.play();
        }
        play() {
          let t = performance.now();
          (this.playState = "running"),
            void 0 !== this.pauseTime
              ? (this.startTime = t - this.pauseTime)
              : this.startTime || (this.startTime = t),
            (this.cancelTimestamp = this.startTime),
            (this.pauseTime = void 0),
            (this.frameRequestId = requestAnimationFrame(this.tick));
        }
        pause() {
          (this.playState = "paused"), (this.pauseTime = this.t);
        }
        finish() {
          (this.playState = "finished"), this.tick(0);
        }
        stop() {
          var t;
          (this.playState = "idle"),
            void 0 !== this.frameRequestId &&
              cancelAnimationFrame(this.frameRequestId),
            null === (t = this.reject) || void 0 === t || t.call(this, !1);
        }
        cancel() {
          this.stop(), this.tick(this.cancelTimestamp);
        }
        reverse() {
          this.rate *= -1;
        }
        commitStyles() {}
        updateDuration(t) {
          (this.duration = t), (this.totalDuration = t * (this.repeat + 1));
        }
        get currentTime() {
          return this.t;
        }
        set currentTime(t) {
          void 0 !== this.pauseTime || 0 === this.rate
            ? (this.pauseTime = t)
            : (this.startTime = performance.now() - t / this.rate);
        }
        get playbackRate() {
          return this.rate;
        }
        set playbackRate(t) {
          this.rate = t;
        }
      }
      var M = i(24394);
      class R {
        setAnimation(t) {
          (this.animation = t),
            null == t ||
              t.finished.then(() => this.clearAnimation()).catch(() => {});
        }
        clearAnimation() {
          this.animation = this.generator = void 0;
        }
      }
      let B = new WeakMap();
      function x(t) {
        return (
          B.has(t) || B.set(t, { transforms: [], values: new Map() }), B.get(t)
        );
      }
      let I = ["", "X", "Y", "Z"],
        U = { x: "translateX", y: "translateY", z: "translateZ" },
        k = {
          syntax: "<angle>",
          initialValue: "0deg",
          toDefaultUnit: (t) => t + "deg",
        },
        L = {
          translate: {
            syntax: "<length-percentage>",
            initialValue: "0px",
            toDefaultUnit: (t) => t + "px",
          },
          rotate: k,
          scale: { syntax: "<number>", initialValue: 1, toDefaultUnit: s },
          skew: k,
        },
        O = new Map(),
        H = (t) => `--motion-${t}`,
        D = ["x", "y", "z"];
      ["translate", "scale", "rotate", "skew"].forEach((t) => {
        I.forEach((e) => {
          D.push(t + e), O.set(H(t + e), L[t]);
        });
      });
      let z = (t, e) => D.indexOf(t) - D.indexOf(e),
        j = new Set(D),
        F = (t) => j.has(t),
        V = (t, e) => {
          var i;
          U[e] && (e = U[e]);
          let { transforms: n } = x(t);
          (i = e), -1 === n.indexOf(i) && n.push(i), (t.style.transform = Y(n));
        },
        Y = (t) => t.sort(z).reduce(K, "").trim(),
        K = (t, e) => `${t} ${e}(var(${H(e)}))`,
        J = (t) => t.startsWith("--"),
        q = new Set(),
        Q = (t, e) => document.createElement("div").animate(t, e),
        W = {
          cssRegisterProperty: () =>
            "undefined" != typeof CSS &&
            Object.hasOwnProperty.call(CSS, "registerProperty"),
          waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
          partialKeyframes: () => {
            try {
              Q({ opacity: [1] });
            } catch (t) {
              return !1;
            }
            return !0;
          },
          finished: () =>
            Boolean(Q({ opacity: [0, 1] }, { duration: 0.001 }).finished),
          linearEasing: () => {
            try {
              Q({ opacity: 0 }, { easing: "linear(0, 1)" });
            } catch (t) {
              return !1;
            }
            return !0;
          },
        },
        Z = {},
        X = {};
      for (let t in W) X[t] = () => (void 0 === Z[t] && (Z[t] = W[t]()), Z[t]);
      let G = (t, e) => {
          let i = "",
            n = Math.round(e / 0.015);
          for (let e = 0; e < n; e++) i += t(v(0, n - 1, e)) + ", ";
          return i.substring(0, i.length - 2);
        },
        tt = (t, e) =>
          b(t)
            ? X.linearEasing()
              ? `linear(${G(t, e)})`
              : n.easing
            : C(t)
            ? te(t)
            : t,
        te = ([t, e, i, n]) => `cubic-bezier(${t}, ${e}, ${i}, ${n})`,
        ti = (t) => (Array.isArray(t) ? t : [t]);
      function tn(t) {
        return U[t] && (t = U[t]), F(t) ? H(t) : t;
      }
      let tr = {
          get: (t, e) => {
            let i = J((e = tn(e)))
              ? t.style.getPropertyValue(e)
              : getComputedStyle(t)[e];
            if (!i && 0 !== i) {
              let t = O.get(e);
              t && (i = t.initialValue);
            }
            return i;
          },
          set: (t, e, i) => {
            J((e = tn(e))) ? t.style.setProperty(e, i) : (t.style[e] = i);
          },
        },
        to = (t) => "string" == typeof t,
        ts = (t, e) =>
          t[e]
            ? Object.assign(Object.assign({}, t), t[e])
            : Object.assign({}, t),
        ta = function (t, e, i = {}) {
          var l, h, c, d, m;
          "string" == typeof (l = t)
            ? h
              ? ((null !== (c = h[l]) && void 0 !== c) ||
                  (h[l] = document.querySelectorAll(l)),
                (l = h[l]))
              : (l = document.querySelectorAll(l))
            : l instanceof Element && (l = [l]),
            (t = Array.from(l || []));
          let v = t.length;
          (0, M.k)(Boolean(v), "No valid element provided."),
            (0, M.k)(Boolean(e), "No keyframes defined.");
          let y = [];
          for (let l = 0; l < v; l++) {
            let u = t[l];
            for (let t in e) {
              let h = ts(i, t);
              h.delay = ((d = h.delay), (m = l), b(d) ? d(m, v) : d);
              let c = (function (t, e, i, l = {}, u) {
                var h;
                let c;
                let d = window.__MOTION_DEV_TOOLS_RECORD,
                  m = !1 !== l.record && d,
                  {
                    duration: v = n.duration,
                    delay: y = n.delay,
                    endDelay: A = n.endDelay,
                    repeat: E = n.repeat,
                    easing: $ = n.easing,
                    persist: _ = !1,
                    direction: w,
                    offset: C,
                    allowWebkitAcceleration: S = !1,
                  } = l,
                  T = x(t),
                  P = F(e),
                  N = X.waapi();
                P && V(t, e);
                let M = tn(e),
                  B = ((h = T.values).has(M) || h.set(M, new R()), h.get(M)),
                  I = O.get(M);
                return (
                  a(B.animation, !(f($) && B.generator) && !1 !== l.record),
                  () => {
                    let n = () => {
                        var e, i;
                        return null !==
                          (i =
                            null !== (e = tr.get(t, M)) && void 0 !== e
                              ? e
                              : null == I
                              ? void 0
                              : I.initialValue) && void 0 !== i
                          ? i
                          : 0;
                      },
                      a = (function (t, e) {
                        for (let i = 0; i < t.length; i++)
                          null === t[i] && (t[i] = i ? t[i - 1] : e());
                        return t;
                      })(ti(i), n),
                      h = (function (t, e) {
                        var i;
                        let n = (null == e ? void 0 : e.toDefaultUnit) || s,
                          r = t[t.length - 1];
                        if (to(r)) {
                          let t =
                            (null === (i = r.match(/(-?[\d.]+)([a-z%]*)/)) ||
                            void 0 === i
                              ? void 0
                              : i[2]) || "";
                          t && (n = (e) => e + t);
                        }
                        return n;
                      })(a, I);
                    if (f($)) {
                      let t = $.createAnimation(a, "opacity" !== e, n, M, B);
                      ($ = t.easing),
                        (a = t.keyframes || a),
                        (v = t.duration || v);
                    }
                    if (
                      (J(M) &&
                        (X.cssRegisterProperty()
                          ? (function (t) {
                              if (!q.has(t)) {
                                q.add(t);
                                try {
                                  let { syntax: e, initialValue: i } = O.has(t)
                                    ? O.get(t)
                                    : {};
                                  CSS.registerProperty({
                                    name: t,
                                    inherits: !1,
                                    syntax: e,
                                    initialValue: i,
                                  });
                                } catch (t) {}
                              }
                            })(M)
                          : (N = !1)),
                      P &&
                        !X.linearEasing() &&
                        (b($) || (g($) && $.some(b))) &&
                        (N = !1),
                      N)
                    ) {
                      I && (a = a.map((t) => (p(t) ? I.toDefaultUnit(t) : t))),
                        1 === a.length &&
                          (!X.partialKeyframes() || m) &&
                          a.unshift(n());
                      let e = {
                        delay: r.ms(y),
                        duration: r.ms(v),
                        endDelay: r.ms(A),
                        easing: g($) ? void 0 : tt($, v),
                        direction: w,
                        iterations: E + 1,
                        fill: "both",
                      };
                      (c = t.animate(
                        {
                          [M]: a,
                          offset: C,
                          easing: g($) ? $.map((t) => tt(t, v)) : void 0,
                        },
                        e
                      )).finished ||
                        (c.finished = new Promise((t, e) => {
                          (c.onfinish = t), (c.oncancel = e);
                        }));
                      let i = a[a.length - 1];
                      c.finished
                        .then(() => {
                          _ || (tr.set(t, M, i), c.cancel());
                        })
                        .catch(o),
                        S || (c.playbackRate = 1.000001);
                    } else if (u && P)
                      1 ===
                        (a = a.map((t) =>
                          "string" == typeof t ? parseFloat(t) : t
                        )).length && a.unshift(parseFloat(n())),
                        (c = new u(
                          (e) => {
                            tr.set(t, M, h ? h(e) : e);
                          },
                          a,
                          Object.assign(Object.assign({}, l), {
                            duration: v,
                            easing: $,
                          })
                        ));
                    else {
                      let e = a[a.length - 1];
                      tr.set(t, M, I && p(e) ? I.toDefaultUnit(e) : e);
                    }
                    return (
                      m &&
                        d(
                          t,
                          e,
                          a,
                          {
                            duration: v,
                            delay: y,
                            easing: $,
                            repeat: E,
                            offset: C,
                          },
                          "motion-one"
                        ),
                      B.setAnimation(c),
                      c
                    );
                  }
                );
              })(u, t, e[t], h, N);
              y.push(c);
            }
          }
          return u(y, i, i.duration);
        };
      function tl(t, e = {}) {
        return u(
          [
            () => {
              let i = new N(t, [0, 1], e);
              return i.finished.catch(() => {}), i;
            },
          ],
          e,
          e.duration
        );
      }
      function tu(t, e, i) {
        let n = b(t) ? tl : ta;
        return n(t, e, i);
      }
    },
    92592: function (t, e, i) {
      let n = i(47138),
        r = i(95115),
        o = i(6907),
        s = i(93776);
      function a(t, e, i, o, s) {
        let a = [].slice.call(arguments, 1),
          l = a.length,
          u = "function" == typeof a[l - 1];
        if (!u && !n()) throw Error("Callback required as last argument");
        if (u) {
          if (l < 2) throw Error("Too few arguments provided");
          2 === l
            ? ((s = i), (i = e), (e = o = void 0))
            : 3 === l &&
              (e.getContext && void 0 === s
                ? ((s = o), (o = void 0))
                : ((s = o), (o = i), (i = e), (e = void 0)));
        } else {
          if (l < 1) throw Error("Too few arguments provided");
          return (
            1 === l
              ? ((i = e), (e = o = void 0))
              : 2 !== l || e.getContext || ((o = i), (i = e), (e = void 0)),
            new Promise(function (n, s) {
              try {
                let s = r.create(i, o);
                n(t(s, e, o));
              } catch (t) {
                s(t);
              }
            })
          );
        }
        try {
          let n = r.create(i, o);
          s(null, t(n, e, o));
        } catch (t) {
          s(t);
        }
      }
      (e.create = r.create),
        (e.toCanvas = a.bind(null, o.render)),
        (e.toDataURL = a.bind(null, o.renderToDataURL)),
        (e.toString = a.bind(null, function (t, e, i) {
          return s.render(t, i);
        }));
    },
    47138: function (t) {
      t.exports = function () {
        return (
          "function" == typeof Promise &&
          Promise.prototype &&
          Promise.prototype.then
        );
      };
    },
    21845: function (t, e, i) {
      let n = i(10242).getSymbolSize;
      (e.getRowColCoords = function (t) {
        if (1 === t) return [];
        let e = Math.floor(t / 7) + 2,
          i = n(t),
          r = 145 === i ? 26 : 2 * Math.ceil((i - 13) / (2 * e - 2)),
          o = [i - 7];
        for (let t = 1; t < e - 1; t++) o[t] = o[t - 1] - r;
        return o.push(6), o.reverse();
      }),
        (e.getPositions = function (t) {
          let i = [],
            n = e.getRowColCoords(t),
            r = n.length;
          for (let t = 0; t < r; t++)
            for (let e = 0; e < r; e++)
              (0 !== t || 0 !== e) &&
                (0 !== t || e !== r - 1) &&
                (t !== r - 1 || 0 !== e) &&
                i.push([n[t], n[e]]);
          return i;
        });
    },
    8260: function (t, e, i) {
      let n = i(76910),
        r = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
          " ",
          "$",
          "%",
          "*",
          "+",
          "-",
          ".",
          "/",
          ":",
        ];
      function o(t) {
        (this.mode = n.ALPHANUMERIC), (this.data = t);
      }
      (o.getBitsLength = function (t) {
        return 11 * Math.floor(t / 2) + 6 * (t % 2);
      }),
        (o.prototype.getLength = function () {
          return this.data.length;
        }),
        (o.prototype.getBitsLength = function () {
          return o.getBitsLength(this.data.length);
        }),
        (o.prototype.write = function (t) {
          let e;
          for (e = 0; e + 2 <= this.data.length; e += 2) {
            let i = 45 * r.indexOf(this.data[e]);
            (i += r.indexOf(this.data[e + 1])), t.put(i, 11);
          }
          this.data.length % 2 && t.put(r.indexOf(this.data[e]), 6);
        }),
        (t.exports = o);
    },
    97245: function (t) {
      function e() {
        (this.buffer = []), (this.length = 0);
      }
      (e.prototype = {
        get: function (t) {
          return ((this.buffer[Math.floor(t / 8)] >>> (7 - (t % 8))) & 1) == 1;
        },
        put: function (t, e) {
          for (let i = 0; i < e; i++)
            this.putBit(((t >>> (e - i - 1)) & 1) == 1);
        },
        getLengthInBits: function () {
          return this.length;
        },
        putBit: function (t) {
          let e = Math.floor(this.length / 8);
          this.buffer.length <= e && this.buffer.push(0),
            t && (this.buffer[e] |= 128 >>> this.length % 8),
            this.length++;
        },
      }),
        (t.exports = e);
    },
    73280: function (t) {
      function e(t) {
        if (!t || t < 1)
          throw Error("BitMatrix size must be defined and greater than 0");
        (this.size = t),
          (this.data = new Uint8Array(t * t)),
          (this.reservedBit = new Uint8Array(t * t));
      }
      (e.prototype.set = function (t, e, i, n) {
        let r = t * this.size + e;
        (this.data[r] = i), n && (this.reservedBit[r] = !0);
      }),
        (e.prototype.get = function (t, e) {
          return this.data[t * this.size + e];
        }),
        (e.prototype.xor = function (t, e, i) {
          this.data[t * this.size + e] ^= i;
        }),
        (e.prototype.isReserved = function (t, e) {
          return this.reservedBit[t * this.size + e];
        }),
        (t.exports = e);
    },
    43424: function (t, e, i) {
      let n = i(62378),
        r = i(76910);
      function o(t) {
        (this.mode = r.BYTE),
          "string" == typeof t && (t = n(t)),
          (this.data = new Uint8Array(t));
      }
      (o.getBitsLength = function (t) {
        return 8 * t;
      }),
        (o.prototype.getLength = function () {
          return this.data.length;
        }),
        (o.prototype.getBitsLength = function () {
          return o.getBitsLength(this.data.length);
        }),
        (o.prototype.write = function (t) {
          for (let e = 0, i = this.data.length; e < i; e++)
            t.put(this.data[e], 8);
        }),
        (t.exports = o);
    },
    35393: function (t, e, i) {
      let n = i(64908),
        r = [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4,
          4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8,
          10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6,
          11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23,
          25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12,
          23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29,
          40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51,
          60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74,
          24, 47, 65, 77, 25, 49, 68, 81,
        ],
        o = [
          7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48,
          72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110,
          160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308,
          104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280,
          408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650,
          224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504,
          750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952,
          1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140,
          1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350,
          1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590,
          1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860,
          2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
        ];
      (e.getBlocksCount = function (t, e) {
        switch (e) {
          case n.L:
            return r[(t - 1) * 4 + 0];
          case n.M:
            return r[(t - 1) * 4 + 1];
          case n.Q:
            return r[(t - 1) * 4 + 2];
          case n.H:
            return r[(t - 1) * 4 + 3];
          default:
            return;
        }
      }),
        (e.getTotalCodewordsCount = function (t, e) {
          switch (e) {
            case n.L:
              return o[(t - 1) * 4 + 0];
            case n.M:
              return o[(t - 1) * 4 + 1];
            case n.Q:
              return o[(t - 1) * 4 + 2];
            case n.H:
              return o[(t - 1) * 4 + 3];
            default:
              return;
          }
        });
    },
    64908: function (t, e) {
      (e.L = { bit: 1 }),
        (e.M = { bit: 0 }),
        (e.Q = { bit: 3 }),
        (e.H = { bit: 2 }),
        (e.isValid = function (t) {
          return t && void 0 !== t.bit && t.bit >= 0 && t.bit < 4;
        }),
        (e.from = function (t, i) {
          if (e.isValid(t)) return t;
          try {
            return (function (t) {
              if ("string" != typeof t) throw Error("Param is not a string");
              let i = t.toLowerCase();
              switch (i) {
                case "l":
                case "low":
                  return e.L;
                case "m":
                case "medium":
                  return e.M;
                case "q":
                case "quartile":
                  return e.Q;
                case "h":
                case "high":
                  return e.H;
                default:
                  throw Error("Unknown EC Level: " + t);
              }
            })(t);
          } catch (t) {
            return i;
          }
        });
    },
    76526: function (t, e, i) {
      let n = i(10242).getSymbolSize;
      e.getPositions = function (t) {
        let e = n(t);
        return [
          [0, 0],
          [e - 7, 0],
          [0, e - 7],
        ];
      };
    },
    61642: function (t, e, i) {
      let n = i(10242),
        r = n.getBCHDigit(1335);
      e.getEncodedBits = function (t, e) {
        let i = (t.bit << 3) | e,
          o = i << 10;
        for (; n.getBCHDigit(o) - r >= 0; ) o ^= 1335 << (n.getBCHDigit(o) - r);
        return ((i << 10) | o) ^ 21522;
      };
    },
    69729: function (t, e) {
      let i = new Uint8Array(512),
        n = new Uint8Array(256);
      !(function () {
        let t = 1;
        for (let e = 0; e < 255; e++)
          (i[e] = t), (n[t] = e), 256 & (t <<= 1) && (t ^= 285);
        for (let t = 255; t < 512; t++) i[t] = i[t - 255];
      })(),
        (e.log = function (t) {
          if (t < 1) throw Error("log(" + t + ")");
          return n[t];
        }),
        (e.exp = function (t) {
          return i[t];
        }),
        (e.mul = function (t, e) {
          return 0 === t || 0 === e ? 0 : i[n[t] + n[e]];
        });
    },
    35442: function (t, e, i) {
      let n = i(76910),
        r = i(10242);
      function o(t) {
        (this.mode = n.KANJI), (this.data = t);
      }
      (o.getBitsLength = function (t) {
        return 13 * t;
      }),
        (o.prototype.getLength = function () {
          return this.data.length;
        }),
        (o.prototype.getBitsLength = function () {
          return o.getBitsLength(this.data.length);
        }),
        (o.prototype.write = function (t) {
          let e;
          for (e = 0; e < this.data.length; e++) {
            let i = r.toSJIS(this.data[e]);
            if (i >= 33088 && i <= 40956) i -= 33088;
            else if (i >= 57408 && i <= 60351) i -= 49472;
            else
              throw Error(
                "Invalid SJIS character: " +
                  this.data[e] +
                  "\nMake sure your charset is UTF-8"
              );
            (i = ((i >>> 8) & 255) * 192 + (255 & i)), t.put(i, 13);
          }
        }),
        (t.exports = o);
    },
    27126: function (t, e) {
      e.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7,
      };
      let i = { N1: 3, N2: 3, N3: 40, N4: 10 };
      (e.isValid = function (t) {
        return null != t && "" !== t && !isNaN(t) && t >= 0 && t <= 7;
      }),
        (e.from = function (t) {
          return e.isValid(t) ? parseInt(t, 10) : void 0;
        }),
        (e.getPenaltyN1 = function (t) {
          let e = t.size,
            n = 0,
            r = 0,
            o = 0,
            s = null,
            a = null;
          for (let l = 0; l < e; l++) {
            (r = o = 0), (s = a = null);
            for (let u = 0; u < e; u++) {
              let e = t.get(l, u);
              e === s
                ? r++
                : (r >= 5 && (n += i.N1 + (r - 5)), (s = e), (r = 1)),
                (e = t.get(u, l)) === a
                  ? o++
                  : (o >= 5 && (n += i.N1 + (o - 5)), (a = e), (o = 1));
            }
            r >= 5 && (n += i.N1 + (r - 5)), o >= 5 && (n += i.N1 + (o - 5));
          }
          return n;
        }),
        (e.getPenaltyN2 = function (t) {
          let e = t.size,
            n = 0;
          for (let i = 0; i < e - 1; i++)
            for (let r = 0; r < e - 1; r++) {
              let e =
                t.get(i, r) +
                t.get(i, r + 1) +
                t.get(i + 1, r) +
                t.get(i + 1, r + 1);
              (4 === e || 0 === e) && n++;
            }
          return n * i.N2;
        }),
        (e.getPenaltyN3 = function (t) {
          let e = t.size,
            n = 0,
            r = 0,
            o = 0;
          for (let i = 0; i < e; i++) {
            r = o = 0;
            for (let s = 0; s < e; s++)
              (r = ((r << 1) & 2047) | t.get(i, s)),
                s >= 10 && (1488 === r || 93 === r) && n++,
                (o = ((o << 1) & 2047) | t.get(s, i)),
                s >= 10 && (1488 === o || 93 === o) && n++;
          }
          return n * i.N3;
        }),
        (e.getPenaltyN4 = function (t) {
          let e = 0,
            n = t.data.length;
          for (let i = 0; i < n; i++) e += t.data[i];
          let r = Math.abs(Math.ceil((100 * e) / n / 5) - 10);
          return r * i.N4;
        }),
        (e.applyMask = function (t, i) {
          let n = i.size;
          for (let r = 0; r < n; r++)
            for (let o = 0; o < n; o++)
              i.isReserved(o, r) ||
                i.xor(
                  o,
                  r,
                  (function (t, i, n) {
                    switch (t) {
                      case e.Patterns.PATTERN000:
                        return (i + n) % 2 == 0;
                      case e.Patterns.PATTERN001:
                        return i % 2 == 0;
                      case e.Patterns.PATTERN010:
                        return n % 3 == 0;
                      case e.Patterns.PATTERN011:
                        return (i + n) % 3 == 0;
                      case e.Patterns.PATTERN100:
                        return (Math.floor(i / 2) + Math.floor(n / 3)) % 2 == 0;
                      case e.Patterns.PATTERN101:
                        return ((i * n) % 2) + ((i * n) % 3) == 0;
                      case e.Patterns.PATTERN110:
                        return (((i * n) % 2) + ((i * n) % 3)) % 2 == 0;
                      case e.Patterns.PATTERN111:
                        return (((i * n) % 3) + ((i + n) % 2)) % 2 == 0;
                      default:
                        throw Error("bad maskPattern:" + t);
                    }
                  })(t, o, r)
                );
        }),
        (e.getBestMask = function (t, i) {
          let n = Object.keys(e.Patterns).length,
            r = 0,
            o = 1 / 0;
          for (let s = 0; s < n; s++) {
            i(s), e.applyMask(s, t);
            let n =
              e.getPenaltyN1(t) +
              e.getPenaltyN2(t) +
              e.getPenaltyN3(t) +
              e.getPenaltyN4(t);
            e.applyMask(s, t), n < o && ((o = n), (r = s));
          }
          return r;
        });
    },
    76910: function (t, e, i) {
      let n = i(43114),
        r = i(7007);
      (e.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
        (e.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }),
        (e.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
        (e.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
        (e.MIXED = { bit: -1 }),
        (e.getCharCountIndicator = function (t, e) {
          if (!t.ccBits) throw Error("Invalid mode: " + t);
          if (!n.isValid(e)) throw Error("Invalid version: " + e);
          return e >= 1 && e < 10
            ? t.ccBits[0]
            : e < 27
            ? t.ccBits[1]
            : t.ccBits[2];
        }),
        (e.getBestModeForData = function (t) {
          return r.testNumeric(t)
            ? e.NUMERIC
            : r.testAlphanumeric(t)
            ? e.ALPHANUMERIC
            : r.testKanji(t)
            ? e.KANJI
            : e.BYTE;
        }),
        (e.toString = function (t) {
          if (t && t.id) return t.id;
          throw Error("Invalid mode");
        }),
        (e.isValid = function (t) {
          return t && t.bit && t.ccBits;
        }),
        (e.from = function (t, i) {
          if (e.isValid(t)) return t;
          try {
            return (function (t) {
              if ("string" != typeof t) throw Error("Param is not a string");
              let i = t.toLowerCase();
              switch (i) {
                case "numeric":
                  return e.NUMERIC;
                case "alphanumeric":
                  return e.ALPHANUMERIC;
                case "kanji":
                  return e.KANJI;
                case "byte":
                  return e.BYTE;
                default:
                  throw Error("Unknown mode: " + t);
              }
            })(t);
          } catch (t) {
            return i;
          }
        });
    },
    41085: function (t, e, i) {
      let n = i(76910);
      function r(t) {
        (this.mode = n.NUMERIC), (this.data = t.toString());
      }
      (r.getBitsLength = function (t) {
        return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
      }),
        (r.prototype.getLength = function () {
          return this.data.length;
        }),
        (r.prototype.getBitsLength = function () {
          return r.getBitsLength(this.data.length);
        }),
        (r.prototype.write = function (t) {
          let e, i;
          for (e = 0; e + 3 <= this.data.length; e += 3)
            (i = parseInt(this.data.substr(e, 3), 10)), t.put(i, 10);
          let n = this.data.length - e;
          n > 0 &&
            ((i = parseInt(this.data.substr(e), 10)), t.put(i, 3 * n + 1));
        }),
        (t.exports = r);
    },
    26143: function (t, e, i) {
      let n = i(69729);
      (e.mul = function (t, e) {
        let i = new Uint8Array(t.length + e.length - 1);
        for (let r = 0; r < t.length; r++)
          for (let o = 0; o < e.length; o++) i[r + o] ^= n.mul(t[r], e[o]);
        return i;
      }),
        (e.mod = function (t, e) {
          let i = new Uint8Array(t);
          for (; i.length - e.length >= 0; ) {
            let t = i[0];
            for (let r = 0; r < e.length; r++) i[r] ^= n.mul(e[r], t);
            let r = 0;
            for (; r < i.length && 0 === i[r]; ) r++;
            i = i.slice(r);
          }
          return i;
        }),
        (e.generateECPolynomial = function (t) {
          let i = new Uint8Array([1]);
          for (let r = 0; r < t; r++)
            i = e.mul(i, new Uint8Array([1, n.exp(r)]));
          return i;
        });
    },
    95115: function (t, e, i) {
      let n = i(10242),
        r = i(64908),
        o = i(97245),
        s = i(73280),
        a = i(21845),
        l = i(76526),
        u = i(27126),
        h = i(35393),
        c = i(52882),
        d = i(23103),
        f = i(61642),
        p = i(76910),
        g = i(16130);
      function m(t, e, i) {
        let n, r;
        let o = t.size,
          s = f.getEncodedBits(e, i);
        for (n = 0; n < 15; n++)
          (r = ((s >> n) & 1) == 1),
            n < 6
              ? t.set(n, 8, r, !0)
              : n < 8
              ? t.set(n + 1, 8, r, !0)
              : t.set(o - 15 + n, 8, r, !0),
            n < 8
              ? t.set(8, o - n - 1, r, !0)
              : n < 9
              ? t.set(8, 15 - n - 1 + 1, r, !0)
              : t.set(8, 15 - n - 1, r, !0);
        t.set(o - 8, 8, 1, !0);
      }
      e.create = function (t, e) {
        let i, f;
        if (void 0 === t || "" === t) throw Error("No input text");
        let v = r.M;
        return (
          void 0 !== e &&
            ((v = r.from(e.errorCorrectionLevel, r.M)),
            (i = d.from(e.version)),
            (f = u.from(e.maskPattern)),
            e.toSJISFunc && n.setToSJISFunction(e.toSJISFunc)),
          (function (t, e, i, r) {
            let f;
            if (Array.isArray(t)) f = g.fromArray(t);
            else if ("string" == typeof t) {
              let n = e;
              if (!n) {
                let e = g.rawSplit(t);
                n = d.getBestVersionForData(e, i);
              }
              f = g.fromString(t, n || 40);
            } else throw Error("Invalid data");
            let v = d.getBestVersionForData(f, i);
            if (!v)
              throw Error(
                "The amount of data is too big to be stored in a QR Code"
              );
            if (e) {
              if (e < v)
                throw Error(
                  "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " +
                    v +
                    ".\n"
                );
            } else e = v;
            let y = (function (t, e, i) {
                let r = new o();
                i.forEach(function (e) {
                  r.put(e.mode.bit, 4),
                    r.put(e.getLength(), p.getCharCountIndicator(e.mode, t)),
                    e.write(r);
                });
                let s = n.getSymbolTotalCodewords(t),
                  a = h.getTotalCodewordsCount(t, e),
                  l = (s - a) * 8;
                for (
                  r.getLengthInBits() + 4 <= l && r.put(0, 4);
                  r.getLengthInBits() % 8 != 0;

                )
                  r.putBit(0);
                let u = (l - r.getLengthInBits()) / 8;
                for (let t = 0; t < u; t++) r.put(t % 2 ? 17 : 236, 8);
                return (function (t, e, i) {
                  let r, o;
                  let s = n.getSymbolTotalCodewords(e),
                    a = h.getTotalCodewordsCount(e, i),
                    l = h.getBlocksCount(e, i),
                    u = l - (s % l),
                    d = Math.floor((s - a) / l),
                    f = d + 1,
                    p = Math.floor(s / l) - d,
                    g = new c(p),
                    m = 0,
                    v = Array(l),
                    y = Array(l),
                    A = 0,
                    E = new Uint8Array(t.buffer);
                  for (let t = 0; t < l; t++) {
                    let e = t < u ? d : f;
                    (v[t] = E.slice(m, m + e)),
                      (y[t] = g.encode(v[t])),
                      (m += e),
                      (A = Math.max(A, e));
                  }
                  let $ = new Uint8Array(s),
                    _ = 0;
                  for (r = 0; r < A; r++)
                    for (o = 0; o < l; o++)
                      r < v[o].length && ($[_++] = v[o][r]);
                  for (r = 0; r < p; r++)
                    for (o = 0; o < l; o++) $[_++] = y[o][r];
                  return $;
                })(r, t, e);
              })(e, i, f),
              A = n.getSymbolSize(e),
              E = new s(A);
            return (
              (function (t, e) {
                let i = t.size,
                  n = l.getPositions(e);
                for (let e = 0; e < n.length; e++) {
                  let r = n[e][0],
                    o = n[e][1];
                  for (let e = -1; e <= 7; e++)
                    if (!(r + e <= -1) && !(i <= r + e))
                      for (let n = -1; n <= 7; n++)
                        o + n <= -1 ||
                          i <= o + n ||
                          ((e >= 0 && e <= 6 && (0 === n || 6 === n)) ||
                          (n >= 0 && n <= 6 && (0 === e || 6 === e)) ||
                          (e >= 2 && e <= 4 && n >= 2 && n <= 4)
                            ? t.set(r + e, o + n, !0, !0)
                            : t.set(r + e, o + n, !1, !0));
                }
              })(E, e),
              (function (t) {
                let e = t.size;
                for (let i = 8; i < e - 8; i++) {
                  let e = i % 2 == 0;
                  t.set(i, 6, e, !0), t.set(6, i, e, !0);
                }
              })(E),
              (function (t, e) {
                let i = a.getPositions(e);
                for (let e = 0; e < i.length; e++) {
                  let n = i[e][0],
                    r = i[e][1];
                  for (let e = -2; e <= 2; e++)
                    for (let i = -2; i <= 2; i++)
                      -2 === e ||
                      2 === e ||
                      -2 === i ||
                      2 === i ||
                      (0 === e && 0 === i)
                        ? t.set(n + e, r + i, !0, !0)
                        : t.set(n + e, r + i, !1, !0);
                }
              })(E, e),
              m(E, i, 0),
              e >= 7 &&
                (function (t, e) {
                  let i, n, r;
                  let o = t.size,
                    s = d.getEncodedBits(e);
                  for (let e = 0; e < 18; e++)
                    (i = Math.floor(e / 3)),
                      (n = (e % 3) + o - 8 - 3),
                      (r = ((s >> e) & 1) == 1),
                      t.set(i, n, r, !0),
                      t.set(n, i, r, !0);
                })(E, e),
              (function (t, e) {
                let i = t.size,
                  n = -1,
                  r = i - 1,
                  o = 7,
                  s = 0;
                for (let a = i - 1; a > 0; a -= 2)
                  for (6 === a && a--; ; ) {
                    for (let i = 0; i < 2; i++)
                      if (!t.isReserved(r, a - i)) {
                        let n = !1;
                        s < e.length && (n = ((e[s] >>> o) & 1) == 1),
                          t.set(r, a - i, n),
                          -1 == --o && (s++, (o = 7));
                      }
                    if ((r += n) < 0 || i <= r) {
                      (r -= n), (n = -n);
                      break;
                    }
                  }
              })(E, y),
              isNaN(r) && (r = u.getBestMask(E, m.bind(null, E, i))),
              u.applyMask(r, E),
              m(E, i, r),
              {
                modules: E,
                version: e,
                errorCorrectionLevel: i,
                maskPattern: r,
                segments: f,
              }
            );
          })(t, i, v, f)
        );
      };
    },
    52882: function (t, e, i) {
      let n = i(26143);
      function r(t) {
        (this.genPoly = void 0),
          (this.degree = t),
          this.degree && this.initialize(this.degree);
      }
      (r.prototype.initialize = function (t) {
        (this.degree = t), (this.genPoly = n.generateECPolynomial(this.degree));
      }),
        (r.prototype.encode = function (t) {
          if (!this.genPoly) throw Error("Encoder not initialized");
          let e = new Uint8Array(t.length + this.degree);
          e.set(t);
          let i = n.mod(e, this.genPoly),
            r = this.degree - i.length;
          if (r > 0) {
            let t = new Uint8Array(this.degree);
            return t.set(i, r), t;
          }
          return i;
        }),
        (t.exports = r);
    },
    7007: function (t, e) {
      let i = "[0-9]+",
        n =
          "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
      n = n.replace(/u/g, "\\u");
      let r = "(?:(?![A-Z0-9 $%*+\\-./:]|" + n + ")(?:.|[\r\n]))+";
      (e.KANJI = RegExp(n, "g")),
        (e.BYTE_KANJI = RegExp("[^A-Z0-9 $%*+\\-./:]+", "g")),
        (e.BYTE = RegExp(r, "g")),
        (e.NUMERIC = RegExp(i, "g")),
        (e.ALPHANUMERIC = RegExp("[A-Z $%*+\\-./:]+", "g"));
      let o = RegExp("^" + n + "$"),
        s = RegExp("^" + i + "$"),
        a = RegExp("^[A-Z0-9 $%*+\\-./:]+$");
      (e.testKanji = function (t) {
        return o.test(t);
      }),
        (e.testNumeric = function (t) {
          return s.test(t);
        }),
        (e.testAlphanumeric = function (t) {
          return a.test(t);
        });
    },
    16130: function (t, e, i) {
      let n = i(76910),
        r = i(41085),
        o = i(8260),
        s = i(43424),
        a = i(35442),
        l = i(7007),
        u = i(10242),
        h = i(65987);
      function c(t) {
        return unescape(encodeURIComponent(t)).length;
      }
      function d(t, e, i) {
        let n;
        let r = [];
        for (; null !== (n = t.exec(i)); )
          r.push({ data: n[0], index: n.index, mode: e, length: n[0].length });
        return r;
      }
      function f(t) {
        let e, i;
        let r = d(l.NUMERIC, n.NUMERIC, t),
          o = d(l.ALPHANUMERIC, n.ALPHANUMERIC, t);
        u.isKanjiModeEnabled()
          ? ((e = d(l.BYTE, n.BYTE, t)), (i = d(l.KANJI, n.KANJI, t)))
          : ((e = d(l.BYTE_KANJI, n.BYTE, t)), (i = []));
        let s = r.concat(o, e, i);
        return s
          .sort(function (t, e) {
            return t.index - e.index;
          })
          .map(function (t) {
            return { data: t.data, mode: t.mode, length: t.length };
          });
      }
      function p(t, e) {
        switch (e) {
          case n.NUMERIC:
            return r.getBitsLength(t);
          case n.ALPHANUMERIC:
            return o.getBitsLength(t);
          case n.KANJI:
            return a.getBitsLength(t);
          case n.BYTE:
            return s.getBitsLength(t);
        }
      }
      function g(t, e) {
        let i;
        let l = n.getBestModeForData(t);
        if ((i = n.from(e, l)) !== n.BYTE && i.bit < l.bit)
          throw Error(
            '"' +
              t +
              '" cannot be encoded with mode ' +
              n.toString(i) +
              ".\n Suggested mode is: " +
              n.toString(l)
          );
        switch ((i !== n.KANJI || u.isKanjiModeEnabled() || (i = n.BYTE), i)) {
          case n.NUMERIC:
            return new r(t);
          case n.ALPHANUMERIC:
            return new o(t);
          case n.KANJI:
            return new a(t);
          case n.BYTE:
            return new s(t);
        }
      }
      (e.fromArray = function (t) {
        return t.reduce(function (t, e) {
          return (
            "string" == typeof e
              ? t.push(g(e, null))
              : e.data && t.push(g(e.data, e.mode)),
            t
          );
        }, []);
      }),
        (e.fromString = function (t, i) {
          let r = f(t, u.isKanjiModeEnabled()),
            o = (function (t) {
              let e = [];
              for (let i = 0; i < t.length; i++) {
                let r = t[i];
                switch (r.mode) {
                  case n.NUMERIC:
                    e.push([
                      r,
                      { data: r.data, mode: n.ALPHANUMERIC, length: r.length },
                      { data: r.data, mode: n.BYTE, length: r.length },
                    ]);
                    break;
                  case n.ALPHANUMERIC:
                    e.push([
                      r,
                      { data: r.data, mode: n.BYTE, length: r.length },
                    ]);
                    break;
                  case n.KANJI:
                    e.push([
                      r,
                      { data: r.data, mode: n.BYTE, length: c(r.data) },
                    ]);
                    break;
                  case n.BYTE:
                    e.push([{ data: r.data, mode: n.BYTE, length: c(r.data) }]);
                }
              }
              return e;
            })(r),
            s = (function (t, e) {
              let i = {},
                r = { start: {} },
                o = ["start"];
              for (let s = 0; s < t.length; s++) {
                let a = t[s],
                  l = [];
                for (let t = 0; t < a.length; t++) {
                  let u = a[t],
                    h = "" + s + t;
                  l.push(h), (i[h] = { node: u, lastCount: 0 }), (r[h] = {});
                  for (let t = 0; t < o.length; t++) {
                    let s = o[t];
                    i[s] && i[s].node.mode === u.mode
                      ? ((r[s][h] =
                          p(i[s].lastCount + u.length, u.mode) -
                          p(i[s].lastCount, u.mode)),
                        (i[s].lastCount += u.length))
                      : (i[s] && (i[s].lastCount = u.length),
                        (r[s][h] =
                          p(u.length, u.mode) +
                          4 +
                          n.getCharCountIndicator(u.mode, e)));
                  }
                }
                o = l;
              }
              for (let t = 0; t < o.length; t++) r[o[t]].end = 0;
              return { map: r, table: i };
            })(o, i),
            a = h.find_path(s.map, "start", "end"),
            l = [];
          for (let t = 1; t < a.length - 1; t++) l.push(s.table[a[t]].node);
          return e.fromArray(
            l.reduce(function (t, e) {
              let i = t.length - 1 >= 0 ? t[t.length - 1] : null;
              return i && i.mode === e.mode
                ? ((t[t.length - 1].data += e.data), t)
                : (t.push(e), t);
            }, [])
          );
        }),
        (e.rawSplit = function (t) {
          return e.fromArray(f(t, u.isKanjiModeEnabled()));
        });
    },
    10242: function (t, e) {
      let i;
      let n = [
        0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581,
        655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828,
        1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532,
        3706,
      ];
      (e.getSymbolSize = function (t) {
        if (!t) throw Error('"version" cannot be null or undefined');
        if (t < 1 || t > 40)
          throw Error('"version" should be in range from 1 to 40');
        return 4 * t + 17;
      }),
        (e.getSymbolTotalCodewords = function (t) {
          return n[t];
        }),
        (e.getBCHDigit = function (t) {
          let e = 0;
          for (; 0 !== t; ) e++, (t >>>= 1);
          return e;
        }),
        (e.setToSJISFunction = function (t) {
          if ("function" != typeof t)
            throw Error('"toSJISFunc" is not a valid function.');
          i = t;
        }),
        (e.isKanjiModeEnabled = function () {
          return void 0 !== i;
        }),
        (e.toSJIS = function (t) {
          return i(t);
        });
    },
    43114: function (t, e) {
      e.isValid = function (t) {
        return !isNaN(t) && t >= 1 && t <= 40;
      };
    },
    23103: function (t, e, i) {
      let n = i(10242),
        r = i(35393),
        o = i(64908),
        s = i(76910),
        a = i(43114),
        l = n.getBCHDigit(7973);
      function u(t, e) {
        return s.getCharCountIndicator(t, e) + 4;
      }
      (e.from = function (t, e) {
        return a.isValid(t) ? parseInt(t, 10) : e;
      }),
        (e.getCapacity = function (t, e, i) {
          if (!a.isValid(t)) throw Error("Invalid QR Code version");
          void 0 === i && (i = s.BYTE);
          let o = n.getSymbolTotalCodewords(t),
            l = r.getTotalCodewordsCount(t, e),
            h = (o - l) * 8;
          if (i === s.MIXED) return h;
          let c = h - u(i, t);
          switch (i) {
            case s.NUMERIC:
              return Math.floor((c / 10) * 3);
            case s.ALPHANUMERIC:
              return Math.floor((c / 11) * 2);
            case s.KANJI:
              return Math.floor(c / 13);
            case s.BYTE:
            default:
              return Math.floor(c / 8);
          }
        }),
        (e.getBestVersionForData = function (t, i) {
          let n;
          let r = o.from(i, o.M);
          if (Array.isArray(t)) {
            if (t.length > 1)
              return (function (t, i) {
                for (let n = 1; n <= 40; n++) {
                  let r = (function (t, e) {
                    let i = 0;
                    return (
                      t.forEach(function (t) {
                        let n = u(t.mode, e);
                        i += n + t.getBitsLength();
                      }),
                      i
                    );
                  })(t, n);
                  if (r <= e.getCapacity(n, i, s.MIXED)) return n;
                }
              })(t, r);
            if (0 === t.length) return 1;
            n = t[0];
          } else n = t;
          return (function (t, i, n) {
            for (let r = 1; r <= 40; r++)
              if (i <= e.getCapacity(r, n, t)) return r;
          })(n.mode, n.getLength(), r);
        }),
        (e.getEncodedBits = function (t) {
          if (!a.isValid(t) || t < 7) throw Error("Invalid QR Code version");
          let e = t << 12;
          for (; n.getBCHDigit(e) - l >= 0; )
            e ^= 7973 << (n.getBCHDigit(e) - l);
          return (t << 12) | e;
        });
    },
    6907: function (t, e, i) {
      let n = i(89653);
      (e.render = function (t, e, i) {
        var r;
        let o = i,
          s = e;
        void 0 !== o || (e && e.getContext) || ((o = e), (e = void 0)),
          e ||
            (s = (function () {
              try {
                return document.createElement("canvas");
              } catch (t) {
                throw Error("You need to specify a canvas element");
              }
            })()),
          (o = n.getOptions(o));
        let a = n.getImageWidth(t.modules.size, o),
          l = s.getContext("2d"),
          u = l.createImageData(a, a);
        return (
          n.qrToImageData(u.data, t, o),
          (r = s),
          l.clearRect(0, 0, r.width, r.height),
          r.style || (r.style = {}),
          (r.height = a),
          (r.width = a),
          (r.style.height = a + "px"),
          (r.style.width = a + "px"),
          l.putImageData(u, 0, 0),
          s
        );
      }),
        (e.renderToDataURL = function (t, i, n) {
          let r = n;
          void 0 !== r || (i && i.getContext) || ((r = i), (i = void 0)),
            r || (r = {});
          let o = e.render(t, i, r),
            s = r.type || "image/png",
            a = r.rendererOpts || {};
          return o.toDataURL(s, a.quality);
        });
    },
    93776: function (t, e, i) {
      let n = i(89653);
      function r(t, e) {
        let i = t.a / 255,
          n = e + '="' + t.hex + '"';
        return i < 1
          ? n + " " + e + '-opacity="' + i.toFixed(2).slice(1) + '"'
          : n;
      }
      function o(t, e, i) {
        let n = t + e;
        return void 0 !== i && (n += " " + i), n;
      }
      e.render = function (t, e, i) {
        let s = n.getOptions(e),
          a = t.modules.size,
          l = t.modules.data,
          u = a + 2 * s.margin,
          h = s.color.light.a
            ? "<path " +
              r(s.color.light, "fill") +
              ' d="M0 0h' +
              u +
              "v" +
              u +
              'H0z"/>'
            : "",
          c =
            "<path " +
            r(s.color.dark, "stroke") +
            ' d="' +
            (function (t, e, i) {
              let n = "",
                r = 0,
                s = !1,
                a = 0;
              for (let l = 0; l < t.length; l++) {
                let u = Math.floor(l % e),
                  h = Math.floor(l / e);
                u || s || (s = !0),
                  t[l]
                    ? (a++,
                      (l > 0 && u > 0 && t[l - 1]) ||
                        ((n += s ? o("M", u + i, 0.5 + h + i) : o("m", r, 0)),
                        (r = 0),
                        (s = !1)),
                      (u + 1 < e && t[l + 1]) || ((n += o("h", a)), (a = 0)))
                    : r++;
              }
              return n;
            })(l, a, s.margin) +
            '"/>',
          d = s.width
            ? 'width="' + s.width + '" height="' + s.width + '" '
            : "",
          f =
            '<svg xmlns="http://www.w3.org/2000/svg" ' +
            d +
            ('viewBox="0 0 ' + u) +
            " " +
            u +
            '" shape-rendering="crispEdges">' +
            h +
            c +
            "</svg>\n";
        return "function" == typeof i && i(null, f), f;
      };
    },
    89653: function (t, e) {
      function i(t) {
        if (("number" == typeof t && (t = t.toString()), "string" != typeof t))
          throw Error("Color should be defined as hex string");
        let e = t.slice().replace("#", "").split("");
        if (e.length < 3 || 5 === e.length || e.length > 8)
          throw Error("Invalid hex color: " + t);
        (3 === e.length || 4 === e.length) &&
          (e = Array.prototype.concat.apply(
            [],
            e.map(function (t) {
              return [t, t];
            })
          )),
          6 === e.length && e.push("F", "F");
        let i = parseInt(e.join(""), 16);
        return {
          r: (i >> 24) & 255,
          g: (i >> 16) & 255,
          b: (i >> 8) & 255,
          a: 255 & i,
          hex: "#" + e.slice(0, 6).join(""),
        };
      }
      (e.getOptions = function (t) {
        t || (t = {}), t.color || (t.color = {});
        let e =
            void 0 === t.margin || null === t.margin || t.margin < 0
              ? 4
              : t.margin,
          n = t.width && t.width >= 21 ? t.width : void 0,
          r = t.scale || 4;
        return {
          width: n,
          scale: n ? 4 : r,
          margin: e,
          color: {
            dark: i(t.color.dark || "#000000ff"),
            light: i(t.color.light || "#ffffffff"),
          },
          type: t.type,
          rendererOpts: t.rendererOpts || {},
        };
      }),
        (e.getScale = function (t, e) {
          return e.width && e.width >= t + 2 * e.margin
            ? e.width / (t + 2 * e.margin)
            : e.scale;
        }),
        (e.getImageWidth = function (t, i) {
          let n = e.getScale(t, i);
          return Math.floor((t + 2 * i.margin) * n);
        }),
        (e.qrToImageData = function (t, i, n) {
          let r = i.modules.size,
            o = i.modules.data,
            s = e.getScale(r, n),
            a = Math.floor((r + 2 * n.margin) * s),
            l = n.margin * s,
            u = [n.color.light, n.color.dark];
          for (let e = 0; e < a; e++)
            for (let i = 0; i < a; i++) {
              let h = (e * a + i) * 4,
                c = n.color.light;
              if (e >= l && i >= l && e < a - l && i < a - l) {
                let t = Math.floor((e - l) / s),
                  n = Math.floor((i - l) / s);
                c = u[o[t * r + n] ? 1 : 0];
              }
              (t[h++] = c.r), (t[h++] = c.g), (t[h++] = c.b), (t[h] = c.a);
            }
        });
    },
    33692: function (t, e, i) {
      "use strict";
      var n;
      i.d(e, {
        Jb: function () {
          return T;
        },
        Ld: function () {
          return P;
        },
        YP: function () {
          return S;
        },
        dy: function () {
          return C;
        },
        sY: function () {
          return V;
        },
      });
      let r = window,
        o = r.trustedTypes,
        s = o ? o.createPolicy("lit-html", { createHTML: (t) => t }) : void 0,
        a = "$lit$",
        l = `lit$${(Math.random() + "").slice(9)}$`,
        u = "?" + l,
        h = `<${u}>`,
        c = document,
        d = () => c.createComment(""),
        f = (t) =>
          null === t || ("object" != typeof t && "function" != typeof t),
        p = Array.isArray,
        g = (t) =>
          p(t) ||
          "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
        m = "[ 	\n\f\r]",
        v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
        y = /-->/g,
        A = />/g,
        E = RegExp(
          `>|${m}(?:([^\\s"'>=/]+)(${m}*=${m}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
          "g"
        ),
        $ = /'/g,
        _ = /"/g,
        w = /^(?:script|style|textarea|title)$/i,
        b =
          (t) =>
          (e, ...i) => ({ _$litType$: t, strings: e, values: i }),
        C = b(1),
        S = b(2),
        T = Symbol.for("lit-noChange"),
        P = Symbol.for("lit-nothing"),
        N = new WeakMap(),
        M = c.createTreeWalker(c, 129, null, !1);
      function R(t, e) {
        if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
          throw Error("invalid template strings array");
        return void 0 !== s ? s.createHTML(e) : e;
      }
      let B = (t, e) => {
        let i = t.length - 1,
          n = [],
          r,
          o = 2 === e ? "<svg>" : "",
          s = v;
        for (let e = 0; e < i; e++) {
          let i = t[e],
            u,
            c,
            d = -1,
            f = 0;
          for (
            ;
            f < i.length && ((s.lastIndex = f), null !== (c = s.exec(i)));

          )
            (f = s.lastIndex),
              s === v
                ? "!--" === c[1]
                  ? (s = y)
                  : void 0 !== c[1]
                  ? (s = A)
                  : void 0 !== c[2]
                  ? (w.test(c[2]) && (r = RegExp("</" + c[2], "g")), (s = E))
                  : void 0 !== c[3] && (s = E)
                : s === E
                ? ">" === c[0]
                  ? ((s = null != r ? r : v), (d = -1))
                  : void 0 === c[1]
                  ? (d = -2)
                  : ((d = s.lastIndex - c[2].length),
                    (u = c[1]),
                    (s = void 0 === c[3] ? E : '"' === c[3] ? _ : $))
                : s === _ || s === $
                ? (s = E)
                : s === y || s === A
                ? (s = v)
                : ((s = E), (r = void 0));
          let p = s === E && t[e + 1].startsWith("/>") ? " " : "";
          o +=
            s === v
              ? i + h
              : d >= 0
              ? (n.push(u), i.slice(0, d) + a + i.slice(d) + l + p)
              : i + l + (-2 === d ? (n.push(void 0), e) : p);
        }
        return [R(t, o + (t[i] || "<?>") + (2 === e ? "</svg>" : "")), n];
      };
      class x {
        constructor({ strings: t, _$litType$: e }, i) {
          let n;
          this.parts = [];
          let r = 0,
            s = 0,
            h = t.length - 1,
            c = this.parts,
            [f, p] = B(t, e);
          if (
            ((this.el = x.createElement(f, i)),
            (M.currentNode = this.el.content),
            2 === e)
          ) {
            let t = this.el.content,
              e = t.firstChild;
            e.remove(), t.append(...e.childNodes);
          }
          for (; null !== (n = M.nextNode()) && c.length < h; ) {
            if (1 === n.nodeType) {
              if (n.hasAttributes()) {
                let t = [];
                for (let e of n.getAttributeNames())
                  if (e.endsWith(a) || e.startsWith(l)) {
                    let i = p[s++];
                    if ((t.push(e), void 0 !== i)) {
                      let t = n.getAttribute(i.toLowerCase() + a).split(l),
                        e = /([.?@])?(.*)/.exec(i);
                      c.push({
                        type: 1,
                        index: r,
                        name: e[2],
                        strings: t,
                        ctor:
                          "." === e[1]
                            ? O
                            : "?" === e[1]
                            ? D
                            : "@" === e[1]
                            ? z
                            : L,
                      });
                    } else c.push({ type: 6, index: r });
                  }
                for (let e of t) n.removeAttribute(e);
              }
              if (w.test(n.tagName)) {
                let t = n.textContent.split(l),
                  e = t.length - 1;
                if (e > 0) {
                  n.textContent = o ? o.emptyScript : "";
                  for (let i = 0; i < e; i++)
                    n.append(t[i], d()),
                      M.nextNode(),
                      c.push({ type: 2, index: ++r });
                  n.append(t[e], d());
                }
              }
            } else if (8 === n.nodeType) {
              if (n.data === u) c.push({ type: 2, index: r });
              else {
                let t = -1;
                for (; -1 !== (t = n.data.indexOf(l, t + 1)); )
                  c.push({ type: 7, index: r }), (t += l.length - 1);
              }
            }
            r++;
          }
        }
        static createElement(t, e) {
          let i = c.createElement("template");
          return (i.innerHTML = t), i;
        }
      }
      function I(t, e, i = t, n) {
        var r, o, s, a;
        if (e === T) return e;
        let l =
            void 0 !== n
              ? null === (r = i._$Co) || void 0 === r
                ? void 0
                : r[n]
              : i._$Cl,
          u = f(e) ? void 0 : e._$litDirective$;
        return (
          (null == l ? void 0 : l.constructor) !== u &&
            (null === (o = null == l ? void 0 : l._$AO) ||
              void 0 === o ||
              o.call(l, !1),
            void 0 === u ? (l = void 0) : (l = new u(t))._$AT(t, i, n),
            void 0 !== n
              ? ((null !== (s = (a = i)._$Co) && void 0 !== s
                  ? s
                  : (a._$Co = []))[n] = l)
              : (i._$Cl = l)),
          void 0 !== l && (e = I(t, l._$AS(t, e.values), l, n)),
          e
        );
      }
      class U {
        constructor(t, e) {
          (this._$AV = []),
            (this._$AN = void 0),
            (this._$AD = t),
            (this._$AM = e);
        }
        get parentNode() {
          return this._$AM.parentNode;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        u(t) {
          var e;
          let {
              el: { content: i },
              parts: n,
            } = this._$AD,
            r = (
              null !== (e = null == t ? void 0 : t.creationScope) &&
              void 0 !== e
                ? e
                : c
            ).importNode(i, !0);
          M.currentNode = r;
          let o = M.nextNode(),
            s = 0,
            a = 0,
            l = n[0];
          for (; void 0 !== l; ) {
            if (s === l.index) {
              let e;
              2 === l.type
                ? (e = new k(o, o.nextSibling, this, t))
                : 1 === l.type
                ? (e = new l.ctor(o, l.name, l.strings, this, t))
                : 6 === l.type && (e = new j(o, this, t)),
                this._$AV.push(e),
                (l = n[++a]);
            }
            s !== (null == l ? void 0 : l.index) && ((o = M.nextNode()), s++);
          }
          return (M.currentNode = c), r;
        }
        v(t) {
          let e = 0;
          for (let i of this._$AV)
            void 0 !== i &&
              (void 0 !== i.strings
                ? (i._$AI(t, i, e), (e += i.strings.length - 2))
                : i._$AI(t[e])),
              e++;
        }
      }
      class k {
        constructor(t, e, i, n) {
          var r;
          (this.type = 2),
            (this._$AH = P),
            (this._$AN = void 0),
            (this._$AA = t),
            (this._$AB = e),
            (this._$AM = i),
            (this.options = n),
            (this._$Cp =
              null === (r = null == n ? void 0 : n.isConnected) ||
              void 0 === r ||
              r);
        }
        get _$AU() {
          var t, e;
          return null !==
            (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
            void 0 !== e
            ? e
            : this._$Cp;
        }
        get parentNode() {
          let t = this._$AA.parentNode,
            e = this._$AM;
          return (
            void 0 !== e &&
              11 === (null == t ? void 0 : t.nodeType) &&
              (t = e.parentNode),
            t
          );
        }
        get startNode() {
          return this._$AA;
        }
        get endNode() {
          return this._$AB;
        }
        _$AI(t, e = this) {
          f((t = I(this, t, e)))
            ? t === P || null == t || "" === t
              ? (this._$AH !== P && this._$AR(), (this._$AH = P))
              : t !== this._$AH && t !== T && this._(t)
            : void 0 !== t._$litType$
            ? this.g(t)
            : void 0 !== t.nodeType
            ? this.$(t)
            : g(t)
            ? this.T(t)
            : this._(t);
        }
        k(t) {
          return this._$AA.parentNode.insertBefore(t, this._$AB);
        }
        $(t) {
          this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
        }
        _(t) {
          this._$AH !== P && f(this._$AH)
            ? (this._$AA.nextSibling.data = t)
            : this.$(c.createTextNode(t)),
            (this._$AH = t);
        }
        g(t) {
          var e;
          let { values: i, _$litType$: n } = t,
            r =
              "number" == typeof n
                ? this._$AC(t)
                : (void 0 === n.el &&
                    (n.el = x.createElement(R(n.h, n.h[0]), this.options)),
                  n);
          if (
            (null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === r
          )
            this._$AH.v(i);
          else {
            let t = new U(r, this),
              e = t.u(this.options);
            t.v(i), this.$(e), (this._$AH = t);
          }
        }
        _$AC(t) {
          let e = N.get(t.strings);
          return void 0 === e && N.set(t.strings, (e = new x(t))), e;
        }
        T(t) {
          p(this._$AH) || ((this._$AH = []), this._$AR());
          let e = this._$AH,
            i,
            n = 0;
          for (let r of t)
            n === e.length
              ? e.push(
                  (i = new k(this.k(d()), this.k(d()), this, this.options))
                )
              : (i = e[n]),
              i._$AI(r),
              n++;
          n < e.length &&
            (this._$AR(i && i._$AB.nextSibling, n), (e.length = n));
        }
        _$AR(t = this._$AA.nextSibling, e) {
          var i;
          for (
            null === (i = this._$AP) || void 0 === i || i.call(this, !1, !0, e);
            t && t !== this._$AB;

          ) {
            let e = t.nextSibling;
            t.remove(), (t = e);
          }
        }
        setConnected(t) {
          var e;
          void 0 === this._$AM &&
            ((this._$Cp = t),
            null === (e = this._$AP) || void 0 === e || e.call(this, t));
        }
      }
      class L {
        constructor(t, e, i, n, r) {
          (this.type = 1),
            (this._$AH = P),
            (this._$AN = void 0),
            (this.element = t),
            (this.name = e),
            (this._$AM = n),
            (this.options = r),
            i.length > 2 || "" !== i[0] || "" !== i[1]
              ? ((this._$AH = Array(i.length - 1).fill(new String())),
                (this.strings = i))
              : (this._$AH = P);
        }
        get tagName() {
          return this.element.tagName;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t, e = this, i, n) {
          let r = this.strings,
            o = !1;
          if (void 0 === r)
            (o = !f((t = I(this, t, e, 0))) || (t !== this._$AH && t !== T)) &&
              (this._$AH = t);
          else {
            let n, s;
            let a = t;
            for (t = r[0], n = 0; n < r.length - 1; n++)
              (s = I(this, a[i + n], e, n)) === T && (s = this._$AH[n]),
                o || (o = !f(s) || s !== this._$AH[n]),
                s === P
                  ? (t = P)
                  : t !== P && (t += (null != s ? s : "") + r[n + 1]),
                (this._$AH[n] = s);
          }
          o && !n && this.j(t);
        }
        j(t) {
          t === P
            ? this.element.removeAttribute(this.name)
            : this.element.setAttribute(this.name, null != t ? t : "");
        }
      }
      class O extends L {
        constructor() {
          super(...arguments), (this.type = 3);
        }
        j(t) {
          this.element[this.name] = t === P ? void 0 : t;
        }
      }
      let H = o ? o.emptyScript : "";
      class D extends L {
        constructor() {
          super(...arguments), (this.type = 4);
        }
        j(t) {
          t && t !== P
            ? this.element.setAttribute(this.name, H)
            : this.element.removeAttribute(this.name);
        }
      }
      class z extends L {
        constructor(t, e, i, n, r) {
          super(t, e, i, n, r), (this.type = 5);
        }
        _$AI(t, e = this) {
          var i;
          if (
            (t = null !== (i = I(this, t, e, 0)) && void 0 !== i ? i : P) === T
          )
            return;
          let n = this._$AH,
            r =
              (t === P && n !== P) ||
              t.capture !== n.capture ||
              t.once !== n.once ||
              t.passive !== n.passive,
            o = t !== P && (n === P || r);
          r && this.element.removeEventListener(this.name, this, n),
            o && this.element.addEventListener(this.name, this, t),
            (this._$AH = t);
        }
        handleEvent(t) {
          var e, i;
          "function" == typeof this._$AH
            ? this._$AH.call(
                null !==
                  (i =
                    null === (e = this.options) || void 0 === e
                      ? void 0
                      : e.host) && void 0 !== i
                  ? i
                  : this.element,
                t
              )
            : this._$AH.handleEvent(t);
        }
      }
      class j {
        constructor(t, e, i) {
          (this.element = t),
            (this.type = 6),
            (this._$AN = void 0),
            (this._$AM = e),
            (this.options = i);
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t) {
          I(this, t);
        }
      }
      let F = r.litHtmlPolyfillSupport;
      null == F || F(x, k),
        (null !== (n = r.litHtmlVersions) && void 0 !== n
          ? n
          : (r.litHtmlVersions = [])
        ).push("2.7.5");
      let V = (t, e, i) => {
        var n, r;
        let o =
            null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n
              ? n
              : e,
          s = o._$litPart$;
        if (void 0 === s) {
          let t =
            null !== (r = null == i ? void 0 : i.renderBefore) && void 0 !== r
              ? r
              : null;
          o._$litPart$ = s = new k(
            e.insertBefore(d(), t),
            t,
            void 0,
            null != i ? i : {}
          );
        }
        return s._$AI(t), s;
      };
    },
    69065: function (t, e, i) {
      "use strict";
      var n;
      i.d(e, {
        Mo: function () {
          return r;
        },
        Cb: function () {
          return a;
        },
        SB: function () {
          return l;
        },
      });
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */ let r = (t) => (e) =>
          "function" == typeof e
            ? (customElements.define(t, e), e)
            : ((t, e) => {
                let { kind: i, elements: n } = e;
                return {
                  kind: i,
                  elements: n,
                  finisher(e) {
                    customElements.define(t, e);
                  },
                };
              })(t, e),
        o = (t, e) =>
          "method" !== e.kind || !e.descriptor || "value" in e.descriptor
            ? {
                kind: "field",
                key: Symbol(),
                placement: "own",
                descriptor: {},
                originalKey: e.key,
                initializer() {
                  "function" == typeof e.initializer &&
                    (this[e.key] = e.initializer.call(this));
                },
                finisher(i) {
                  i.createProperty(e.key, t);
                },
              }
            : {
                ...e,
                finisher(i) {
                  i.createProperty(e.key, t);
                },
              },
        s = (t, e, i) => {
          e.constructor.createProperty(i, t);
        };
      function a(t) {
        return (e, i) => (void 0 !== i ? s(t, e, i) : o(t, e));
      }
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */ function l(t) {
        return a({ ...t, state: !0 });
      }
      null !=
        (null === (n = window.HTMLSlotElement) || void 0 === n
          ? void 0
          : n.prototype.assignedElements) ||
        ((t, e) =>
          t.assignedNodes(e).filter((t) => t.nodeType === Node.ELEMENT_NODE));
    },
    8109: function (t, e, i) {
      "use strict";
      i.d(e, {
        $: function () {
          return a;
        },
      });
      var n,
        r = i(33692);
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */ let o = {
        ATTRIBUTE: 1,
        CHILD: 2,
        PROPERTY: 3,
        BOOLEAN_ATTRIBUTE: 4,
        EVENT: 5,
        ELEMENT: 6,
      };
      class s {
        constructor(t) {}
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AT(t, e, i) {
          (this._$Ct = t), (this._$AM = e), (this._$Ci = i);
        }
        _$AS(t, e) {
          return this.update(t, e);
        }
        update(t, e) {
          return this.render(...e);
        }
      }
      /**
       * @license
       * Copyright 2018 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */ let a =
        ((n = class extends s {
          constructor(t) {
            var e;
            if (
              (super(t),
              t.type !== o.ATTRIBUTE ||
                "class" !== t.name ||
                (null === (e = t.strings) || void 0 === e ? void 0 : e.length) >
                  2)
            )
              throw Error(
                "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
              );
          }
          render(t) {
            return (
              " " +
              Object.keys(t)
                .filter((e) => t[e])
                .join(" ") +
              " "
            );
          }
          update(t, [e]) {
            var i, n;
            if (void 0 === this.it) {
              for (let n in ((this.it = new Set()),
              void 0 !== t.strings &&
                (this.nt = new Set(
                  t.strings
                    .join(" ")
                    .split(/\s/)
                    .filter((t) => "" !== t)
                )),
              e))
                !e[n] ||
                  (null === (i = this.nt) || void 0 === i
                    ? void 0
                    : i.has(n)) ||
                  this.it.add(n);
              return this.render(e);
            }
            let o = t.element.classList;
            for (let t in (this.it.forEach((t) => {
              t in e || (o.remove(t), this.it.delete(t));
            }),
            e)) {
              let i = !!e[t];
              i === this.it.has(t) ||
                (null === (n = this.nt) || void 0 === n ? void 0 : n.has(t)) ||
                (i
                  ? (o.add(t), this.it.add(t))
                  : (o.remove(t), this.it.delete(t)));
            }
            return r.Jb;
          }
        }),
        (...t) => ({ _$litDirective$: n, values: t }));
    },
    43265: function (t, e, i) {
      "use strict";
      i.d(e, {
        oi: function () {
          return C;
        },
        iv: function () {
          return u;
        },
        dy: function () {
          return b.dy;
        },
        YP: function () {
          return b.YP;
        },
      });
      /**
       * @license
       * Copyright 2019 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */ let n = window,
        r =
          n.ShadowRoot &&
          (void 0 === n.ShadyCSS || n.ShadyCSS.nativeShadow) &&
          "adoptedStyleSheets" in Document.prototype &&
          "replace" in CSSStyleSheet.prototype,
        o = Symbol(),
        s = new WeakMap();
      class a {
        constructor(t, e, i) {
          if (((this._$cssResult$ = !0), i !== o))
            throw Error(
              "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
            );
          (this.cssText = t), (this.t = e);
        }
        get styleSheet() {
          let t = this.o,
            e = this.t;
          if (r && void 0 === t) {
            let i = void 0 !== e && 1 === e.length;
            i && (t = s.get(e)),
              void 0 === t &&
                ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
                i && s.set(e, t));
          }
          return t;
        }
        toString() {
          return this.cssText;
        }
      }
      let l = (t) => new a("string" == typeof t ? t : t + "", void 0, o),
        u = (t, ...e) => {
          let i =
            1 === t.length
              ? t[0]
              : e.reduce(
                  (e, i, n) =>
                    e +
                    ((t) => {
                      if (!0 === t._$cssResult$) return t.cssText;
                      if ("number" == typeof t) return t;
                      throw Error(
                        "Value passed to 'css' function must be a 'css' function result: " +
                          t +
                          ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                      );
                    })(i) +
                    t[n + 1],
                  t[0]
                );
          return new a(i, t, o);
        },
        h = (t, e) => {
          r
            ? (t.adoptedStyleSheets = e.map((t) =>
                t instanceof CSSStyleSheet ? t : t.styleSheet
              ))
            : e.forEach((e) => {
                let i = document.createElement("style"),
                  r = n.litNonce;
                void 0 !== r && i.setAttribute("nonce", r),
                  (i.textContent = e.cssText),
                  t.appendChild(i);
              });
        },
        c = r
          ? (t) => t
          : (t) =>
              t instanceof CSSStyleSheet
                ? ((t) => {
                    let e = "";
                    for (let i of t.cssRules) e += i.cssText;
                    return l(e);
                  })(t)
                : t,
        d = window,
        f = d.trustedTypes,
        p = f ? f.emptyScript : "",
        g = d.reactiveElementPolyfillSupport,
        m = {
          toAttribute(t, e) {
            switch (e) {
              case Boolean:
                t = t ? p : null;
                break;
              case Object:
              case Array:
                t = null == t ? t : JSON.stringify(t);
            }
            return t;
          },
          fromAttribute(t, e) {
            let i = t;
            switch (e) {
              case Boolean:
                i = null !== t;
                break;
              case Number:
                i = null === t ? null : Number(t);
                break;
              case Object:
              case Array:
                try {
                  i = JSON.parse(t);
                } catch (t) {
                  i = null;
                }
            }
            return i;
          },
        },
        v = (t, e) => e !== t && (e == e || t == t),
        y = {
          attribute: !0,
          type: String,
          converter: m,
          reflect: !1,
          hasChanged: v,
        },
        A = "finalized";
      class E extends HTMLElement {
        constructor() {
          super(),
            (this._$Ei = new Map()),
            (this.isUpdatePending = !1),
            (this.hasUpdated = !1),
            (this._$El = null),
            this.u();
        }
        static addInitializer(t) {
          var e;
          this.finalize(),
            (null !== (e = this.h) && void 0 !== e ? e : (this.h = [])).push(t);
        }
        static get observedAttributes() {
          this.finalize();
          let t = [];
          return (
            this.elementProperties.forEach((e, i) => {
              let n = this._$Ep(i, e);
              void 0 !== n && (this._$Ev.set(n, i), t.push(n));
            }),
            t
          );
        }
        static createProperty(t, e = y) {
          if (
            (e.state && (e.attribute = !1),
            this.finalize(),
            this.elementProperties.set(t, e),
            !e.noAccessor && !this.prototype.hasOwnProperty(t))
          ) {
            let i = "symbol" == typeof t ? Symbol() : "__" + t,
              n = this.getPropertyDescriptor(t, i, e);
            void 0 !== n && Object.defineProperty(this.prototype, t, n);
          }
        }
        static getPropertyDescriptor(t, e, i) {
          return {
            get() {
              return this[e];
            },
            set(n) {
              let r = this[t];
              (this[e] = n), this.requestUpdate(t, r, i);
            },
            configurable: !0,
            enumerable: !0,
          };
        }
        static getPropertyOptions(t) {
          return this.elementProperties.get(t) || y;
        }
        static finalize() {
          if (this.hasOwnProperty(A)) return !1;
          this[A] = !0;
          let t = Object.getPrototypeOf(this);
          if (
            (t.finalize(),
            void 0 !== t.h && (this.h = [...t.h]),
            (this.elementProperties = new Map(t.elementProperties)),
            (this._$Ev = new Map()),
            this.hasOwnProperty("properties"))
          ) {
            let t = this.properties,
              e = [
                ...Object.getOwnPropertyNames(t),
                ...Object.getOwnPropertySymbols(t),
              ];
            for (let i of e) this.createProperty(i, t[i]);
          }
          return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
        }
        static finalizeStyles(t) {
          let e = [];
          if (Array.isArray(t)) {
            let i = new Set(t.flat(1 / 0).reverse());
            for (let t of i) e.unshift(c(t));
          } else void 0 !== t && e.push(c(t));
          return e;
        }
        static _$Ep(t, e) {
          let i = e.attribute;
          return !1 === i
            ? void 0
            : "string" == typeof i
            ? i
            : "string" == typeof t
            ? t.toLowerCase()
            : void 0;
        }
        u() {
          var t;
          (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
            (this._$AL = new Map()),
            this._$Eg(),
            this.requestUpdate(),
            null === (t = this.constructor.h) ||
              void 0 === t ||
              t.forEach((t) => t(this));
        }
        addController(t) {
          var e, i;
          (null !== (e = this._$ES) && void 0 !== e
            ? e
            : (this._$ES = [])
          ).push(t),
            void 0 !== this.renderRoot &&
              this.isConnected &&
              (null === (i = t.hostConnected) || void 0 === i || i.call(t));
        }
        removeController(t) {
          var e;
          null === (e = this._$ES) ||
            void 0 === e ||
            e.splice(this._$ES.indexOf(t) >>> 0, 1);
        }
        _$Eg() {
          this.constructor.elementProperties.forEach((t, e) => {
            this.hasOwnProperty(e) &&
              (this._$Ei.set(e, this[e]), delete this[e]);
          });
        }
        createRenderRoot() {
          var t;
          let e =
            null !== (t = this.shadowRoot) && void 0 !== t
              ? t
              : this.attachShadow(this.constructor.shadowRootOptions);
          return h(e, this.constructor.elementStyles), e;
        }
        connectedCallback() {
          var t;
          void 0 === this.renderRoot &&
            (this.renderRoot = this.createRenderRoot()),
            this.enableUpdating(!0),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach((t) => {
                var e;
                return null === (e = t.hostConnected) || void 0 === e
                  ? void 0
                  : e.call(t);
              });
        }
        enableUpdating(t) {}
        disconnectedCallback() {
          var t;
          null === (t = this._$ES) ||
            void 0 === t ||
            t.forEach((t) => {
              var e;
              return null === (e = t.hostDisconnected) || void 0 === e
                ? void 0
                : e.call(t);
            });
        }
        attributeChangedCallback(t, e, i) {
          this._$AK(t, i);
        }
        _$EO(t, e, i = y) {
          var n;
          let r = this.constructor._$Ep(t, i);
          if (void 0 !== r && !0 === i.reflect) {
            let o = (
              void 0 !==
              (null === (n = i.converter) || void 0 === n
                ? void 0
                : n.toAttribute)
                ? i.converter
                : m
            ).toAttribute(e, i.type);
            (this._$El = t),
              null == o ? this.removeAttribute(r) : this.setAttribute(r, o),
              (this._$El = null);
          }
        }
        _$AK(t, e) {
          var i;
          let n = this.constructor,
            r = n._$Ev.get(t);
          if (void 0 !== r && this._$El !== r) {
            let t = n.getPropertyOptions(r),
              o =
                "function" == typeof t.converter
                  ? { fromAttribute: t.converter }
                  : void 0 !==
                    (null === (i = t.converter) || void 0 === i
                      ? void 0
                      : i.fromAttribute)
                  ? t.converter
                  : m;
            (this._$El = r),
              (this[r] = o.fromAttribute(e, t.type)),
              (this._$El = null);
          }
        }
        requestUpdate(t, e, i) {
          let n = !0;
          void 0 !== t &&
            ((
              (i = i || this.constructor.getPropertyOptions(t)).hasChanged || v
            )(this[t], e)
              ? (this._$AL.has(t) || this._$AL.set(t, e),
                !0 === i.reflect &&
                  this._$El !== t &&
                  (void 0 === this._$EC && (this._$EC = new Map()),
                  this._$EC.set(t, i)))
              : (n = !1)),
            !this.isUpdatePending && n && (this._$E_ = this._$Ej());
        }
        async _$Ej() {
          this.isUpdatePending = !0;
          try {
            await this._$E_;
          } catch (t) {
            Promise.reject(t);
          }
          let t = this.scheduleUpdate();
          return null != t && (await t), !this.isUpdatePending;
        }
        scheduleUpdate() {
          return this.performUpdate();
        }
        performUpdate() {
          var t;
          if (!this.isUpdatePending) return;
          this.hasUpdated,
            this._$Ei &&
              (this._$Ei.forEach((t, e) => (this[e] = t)),
              (this._$Ei = void 0));
          let e = !1,
            i = this._$AL;
          try {
            (e = this.shouldUpdate(i))
              ? (this.willUpdate(i),
                null === (t = this._$ES) ||
                  void 0 === t ||
                  t.forEach((t) => {
                    var e;
                    return null === (e = t.hostUpdate) || void 0 === e
                      ? void 0
                      : e.call(t);
                  }),
                this.update(i))
              : this._$Ek();
          } catch (t) {
            throw ((e = !1), this._$Ek(), t);
          }
          e && this._$AE(i);
        }
        willUpdate(t) {}
        _$AE(t) {
          var e;
          null === (e = this._$ES) ||
            void 0 === e ||
            e.forEach((t) => {
              var e;
              return null === (e = t.hostUpdated) || void 0 === e
                ? void 0
                : e.call(t);
            }),
            this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
            this.updated(t);
        }
        _$Ek() {
          (this._$AL = new Map()), (this.isUpdatePending = !1);
        }
        get updateComplete() {
          return this.getUpdateComplete();
        }
        getUpdateComplete() {
          return this._$E_;
        }
        shouldUpdate(t) {
          return !0;
        }
        update(t) {
          void 0 !== this._$EC &&
            (this._$EC.forEach((t, e) => this._$EO(e, this[e], t)),
            (this._$EC = void 0)),
            this._$Ek();
        }
        updated(t) {}
        firstUpdated(t) {}
      }
      (E[A] = !0),
        (E.elementProperties = new Map()),
        (E.elementStyles = []),
        (E.shadowRootOptions = { mode: "open" }),
        null == g || g({ ReactiveElement: E }),
        (null !== ($ = d.reactiveElementVersions) && void 0 !== $
          ? $
          : (d.reactiveElementVersions = [])
        ).push("1.6.2");
      var $,
        _,
        w,
        b = i(33692);
      class C extends E {
        constructor() {
          super(...arguments),
            (this.renderOptions = { host: this }),
            (this._$Do = void 0);
        }
        createRenderRoot() {
          var t, e;
          let i = super.createRenderRoot();
          return (
            (null !== (t = (e = this.renderOptions).renderBefore) &&
              void 0 !== t) ||
              (e.renderBefore = i.firstChild),
            i
          );
        }
        update(t) {
          let e = this.render();
          this.hasUpdated ||
            (this.renderOptions.isConnected = this.isConnected),
            super.update(t),
            (this._$Do = (0, b.sY)(e, this.renderRoot, this.renderOptions));
        }
        connectedCallback() {
          var t;
          super.connectedCallback(),
            null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
        }
        disconnectedCallback() {
          var t;
          super.disconnectedCallback(),
            null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
        }
        render() {
          return b.Jb;
        }
      }
      (C.finalized = !0),
        (C._$litElement$ = !0),
        null === (_ = globalThis.litElementHydrateSupport) ||
          void 0 === _ ||
          _.call(globalThis, { LitElement: C });
      let S = globalThis.litElementPolyfillSupport;
      null == S || S({ LitElement: C }),
        (null !== (w = globalThis.litElementVersions) && void 0 !== w
          ? w
          : (globalThis.litElementVersions = [])
        ).push("3.3.2");
    },
  },
]);
