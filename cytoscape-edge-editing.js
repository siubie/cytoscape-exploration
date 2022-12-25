!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.cytoscapeEdgeEditing = t())
    : (e.cytoscapeEdgeEditing = t());
})(self, function () {
  return (() => {
    "use strict";
    var e = {
        347: (e, t, n) => {
          var o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            i = n(218),
            s = n(259),
            d = n(171),
            a = n(961),
            r = 0;
          e.exports = function (e, t) {
            var n = e;
            s.options = e;
            var c,
              l,
              g,
              h,
              u,
              y,
              v,
              p,
              f,
              x,
              m,
              b,
              A,
              P,
              C,
              w,
              T,
              E,
              M,
              S = "cy-edge-bend-editing-cxt-add-bend-point" + r,
              I = "cy-edge-bend-editing-cxt-remove-bend-point" + r,
              D = "cy-edge-bend-editing-cxt-remove-multiple-bend-point" + r,
              F = "cy-edge-control-editing-cxt-add-control-point" + r,
              R = "cy-edge-control-editing-cxt-remove-control-point" + r,
              O = "cy-edge-bend-editing-cxt-remove-multiple-control-point" + r,
              B = null,
              K = null,
              W = !1,
              k = {
                init: function () {
                  a(t, s, e);
                  var n = e,
                    o = $(this),
                    k = "cy-node-edge-editing-stage" + r;
                  r++;
                  var z,
                    N,
                    L = $('<div id="' + k + '"></div>');
                  o.find("#" + k).length < 1 && o.append(L),
                    (z =
                      Konva.stages.length < r
                        ? new Konva.Stage({
                            id: "node-edge-editing-stage",
                            container: k,
                            width: o.width(),
                            height: o.height(),
                          })
                        : Konva.stages[r - 1]).getChildren().length < 1
                      ? ((N = new Konva.Layer()), z.add(N))
                      : (N = z.getChildren()[0]);
                  var U = {
                      edge: void 0,
                      edgeType: "none",
                      anchors: [],
                      touchedAnchor: void 0,
                      touchedAnchorIndex: void 0,
                      bindListeners: function (e) {
                        e.on("mousedown touchstart", this.eMouseDown);
                      },
                      unbindListeners: function (e) {
                        e.off("mousedown touchstart", this.eMouseDown);
                      },
                      eMouseDown: function (e) {
                        t.autounselectify(!1),
                          (W = !0),
                          (U.touchedAnchor = e.target),
                          (M = !1),
                          U.edge.unselect();
                        var n = s.syntax[U.edgeType].weight,
                          o = s.syntax[U.edgeType].distance,
                          i = U.edge;
                        (ue = {
                          edge: i,
                          type: U.edgeType,
                          weights: i.data(n) ? [].concat(i.data(n)) : [],
                          distances: i.data(o) ? [].concat(i.data(o)) : [],
                        }),
                          (T = t.style()._private.coreStyle["active-bg-opacity"]
                            ? t.style()._private.coreStyle["active-bg-opacity"]
                                .value
                            : 0.15),
                          t
                            .style()
                            .selector("core")
                            .style("active-bg-opacity", 0)
                            .update(),
                          ae(),
                          t.autoungrabify(!0),
                          N.getStage().on(
                            "contentTouchend contentMouseup",
                            U.eMouseUp
                          ),
                          N.getStage().on("contentMouseout", U.eMouseOut);
                      },
                      eMouseUp: function (e) {
                        (W = !1),
                          (U.touchedAnchor = void 0),
                          (M = !1),
                          U.edge.select(),
                          t
                            .style()
                            .selector("core")
                            .style("active-bg-opacity", T)
                            .update(),
                          re(),
                          t.autounselectify(!0),
                          t.autoungrabify(!1),
                          N.getStage().off(
                            "contentTouchend contentMouseup",
                            U.eMouseUp
                          ),
                          N.getStage().off("contentMouseout", U.eMouseOut);
                      },
                      eMouseOut: function (e) {
                        M = !0;
                      },
                      clearAnchorsExcept: function () {
                        var e = this,
                          t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : void 0,
                          n = !1;
                        this.anchors.forEach(function (o, i) {
                          t && o === t
                            ? (n = !0)
                            : (e.unbindListeners(o), o.destroy());
                        }),
                          n
                            ? (this.anchors = [t])
                            : ((this.anchors = []),
                              (this.edge = void 0),
                              (this.edgeType = "none"));
                      },
                      renderAnchorShapes: function (e) {
                        if (
                          ((this.edge = e),
                          (this.edgeType = s.getEdgeType(e)),
                          e.hasClass("edgebendediting-hasbendpoints") ||
                            e.hasClass("edgecontrolediting-hascontrolpoints"))
                        ) {
                          for (
                            var t = s.getAnchorsAsArray(e),
                              n = 0.65 * ie(e),
                              o =
                                (e.source().position(),
                                e.target().position(),
                                0);
                            t && o < t.length;
                            o += 2
                          ) {
                            var i = t[o],
                              d = t[o + 1];
                            this.renderAnchorShape(i, d, n);
                          }
                          N.draw();
                        }
                      },
                      renderAnchorShape: function (e, n, o) {
                        var i = ne({ x: e - o / 2, y: n - o / 2 });
                        o *= t.zoom();
                        var s = new Konva.Rect({
                          x: i.x,
                          y: i.y,
                          width: o,
                          height: o,
                          fill: "black",
                          strokeWidth: 0,
                          draggable: !0,
                        });
                        this.anchors.push(s), this.bindListeners(s), N.add(s);
                      },
                    },
                    j = function (e, n) {
                      var o = e.target || e.cyTarget;
                      if (!s.isIgnoredEdge(o)) {
                        var i,
                          d,
                          a,
                          r,
                          c = s.getEdgeType(o);
                        "none" === c
                          ? ((i = []), (d = []))
                          : ((a = s.syntax[c].weight),
                            (r = s.syntax[c].distance),
                            (i = o.data(a) ? [].concat(o.data(a)) : o.data(a)),
                            (d = o.data(r) ? [].concat(o.data(r)) : o.data(r)));
                        var l = { edge: o, type: c, weights: i, distances: d };
                        s.addAnchorPoint(void 0, void 0, n),
                          te().undoable &&
                            t.undoRedo().do("changeAnchorPoints", l);
                      }
                      oe(), o.select();
                    },
                    q = function (e) {
                      var n = U.edge,
                        o = s.getEdgeType(n);
                      if (
                        !s.edgeTypeNoneShouldntHappen(
                          o,
                          "UiUtilities.js, cxtRemoveAnchorFcn"
                        )
                      ) {
                        var i = {
                          edge: n,
                          type: o,
                          weights: [].concat(n.data(s.syntax[o].weight)),
                          distances: [].concat(n.data(s.syntax[o].distance)),
                        };
                        s.removeAnchor(),
                          te().undoable &&
                            t.undoRedo().do("changeAnchorPoints", i),
                          setTimeout(function () {
                            oe(), n.select();
                          }, 50);
                      }
                    },
                    _ = function (e) {
                      var n = U.edge,
                        o = s.getEdgeType(n),
                        i = {
                          edge: n,
                          type: o,
                          weights: [].concat(n.data(s.syntax[o].weight)),
                          distances: [].concat(n.data(s.syntax[o].distance)),
                        };
                      s.removeAllAnchors(),
                        te().undoable &&
                          t.undoRedo().do("changeAnchorPoints", i),
                        setTimeout(function () {
                          oe(), n.select();
                        }, 50);
                    },
                    H = n.handleReconnectEdge,
                    V = n.validateEdge,
                    X = n.actOnUnsuccessfulReconnection,
                    G = [
                      {
                        id: S,
                        content: n.addBendMenuItemTitle,
                        selector: "edge",
                        onClickFunction: function (e) {
                          j(e, "bend");
                        },
                        hasTrailingDivider:
                          n.useTrailingDividersAfterContextMenuOptions,
                      },
                      {
                        id: I,
                        content: n.removeBendMenuItemTitle,
                        selector: "edge",
                        onClickFunction: q,
                        hasTrailingDivider:
                          n.useTrailingDividersAfterContextMenuOptions,
                      },
                      {
                        id: D,
                        content: n.removeAllBendMenuItemTitle,
                        selector:
                          n.enableMultipleAnchorRemovalOption &&
                          ":selected.edgebendediting-hasmultiplebendpoints",
                        onClickFunction: _,
                        hasTrailingDivider:
                          n.useTrailingDividersAfterContextMenuOptions,
                      },
                      {
                        id: F,
                        content: n.addControlMenuItemTitle,
                        selector: "edge",
                        coreAsWell: !0,
                        onClickFunction: function (e) {
                          j(e, "control");
                        },
                        hasTrailingDivider:
                          n.useTrailingDividersAfterContextMenuOptions,
                      },
                      {
                        id: R,
                        content: n.removeControlMenuItemTitle,
                        selector: "edge",
                        coreAsWell: !0,
                        onClickFunction: q,
                        hasTrailingDivider:
                          n.useTrailingDividersAfterContextMenuOptions,
                      },
                      {
                        id: O,
                        content: n.removeAllControlMenuItemTitle,
                        selector:
                          n.enableMultipleAnchorRemovalOption &&
                          ":selected.edgecontrolediting-hasmultiplecontrolpoints",
                        onClickFunction: _,
                        hasTrailingDivider:
                          n.useTrailingDividersAfterContextMenuOptions,
                      },
                    ];
                  if (t.contextMenus) {
                    var J = t.contextMenus("get");
                    J.isActive()
                      ? J.appendMenuItems(G)
                      : t.contextMenus({ menuItems: G });
                  }
                  var Q = i(function () {
                    L.attr("height", o.height()).attr("width", o.width()).css({
                      position: "absolute",
                      top: 0,
                      left: 0,
                      "z-index": te().zIndex,
                    }),
                      setTimeout(function () {
                        var e = L.offset(),
                          n = o.offset();
                        L.css({
                          top: -(e.top - n.top),
                          left: -(e.left - n.left),
                        }),
                          N.getStage().setWidth(o.width()),
                          N.getStage().setHeight(o.height()),
                          t && oe();
                      }, 0);
                  }, 250);
                  function Y() {
                    Q();
                  }
                  Y(),
                    $(window).bind("resize", function () {
                      Y();
                    });
                  var Z,
                    ee = o.data("cyedgeediting");
                  function te() {
                    return Z || (Z = o.data("cyedgeediting").options);
                  }
                  function ne(e) {
                    var n = t.pan(),
                      o = t.zoom();
                    return { x: e.x * o + n.x, y: e.y * o + n.y };
                  }
                  function oe() {
                    U.clearAnchorsExcept(U.touchedAnchor),
                      null !== B && (B.destroy(), (B = null)),
                      null !== K && (K.destroy(), (K = null)),
                      N.draw(),
                      E &&
                        (U.renderAnchorShapes(E),
                        (function (e) {
                          if (e) {
                            var n = s.getAnchorsAsArray(e);
                            void 0 === n && (n = []);
                            var o = e.sourceEndpoint(),
                              i = e.targetEndpoint();
                            if (
                              o.x &&
                              i.x &&
                              (n.unshift(o.y),
                              n.unshift(o.x),
                              n.push(i.x),
                              n.push(i.y),
                              n)
                            ) {
                              var d = { x: n[0], y: n[1] },
                                a = { x: n[n.length - 2], y: n[n.length - 1] },
                                r = { x: n[2], y: n[3] },
                                c = { x: n[n.length - 4], y: n[n.length - 3] };
                              !(function (e, n, o, i, s) {
                                var d = n.x - o / 2,
                                  a = n.y - o / 2,
                                  r = i.x - o / 2,
                                  c = i.y - o / 2,
                                  l = s.x - o / 2,
                                  g = s.y - o / 2,
                                  h = ne({ x: e.x - o / 2, y: e.y - o / 2 }),
                                  u = ne({ x: d, y: a });
                                o = (o * t.zoom()) / 2;
                                var y = ne({ x: r, y: c }),
                                  v = ne({ x: l, y: g }),
                                  p = o,
                                  f = Math.sqrt(
                                    Math.pow(y.x - h.x, 2) +
                                      Math.pow(y.y - h.y, 2)
                                  ),
                                  x = h.x + (p / f) * (y.x - h.x),
                                  m = h.y + (p / f) * (y.y - h.y),
                                  b = Math.sqrt(
                                    Math.pow(v.x - u.x, 2) +
                                      Math.pow(v.y - u.y, 2)
                                  ),
                                  A = u.x + (p / b) * (v.x - u.x),
                                  P = u.y + (p / b) * (v.y - u.y);
                                null === B &&
                                  (B = new Konva.Circle({
                                    x: x + o,
                                    y: m + o,
                                    radius: o,
                                    fill: "black",
                                  })),
                                  null === K &&
                                    (K = new Konva.Circle({
                                      x: A + o,
                                      y: P + o,
                                      radius: o,
                                      fill: "black",
                                    })),
                                  N.add(B),
                                  N.add(K),
                                  N.draw();
                              })(d, a, 0.65 * ie(e), r, c);
                            }
                          }
                        })(E));
                  }
                  function ie(e) {
                    var t = te().anchorShapeSizeFactor;
                    return parseFloat(e.css("width")) <= 2.5
                      ? 2.5 * t
                      : parseFloat(e.css("width")) * t;
                  }
                  function se(e, t, n, o, i) {
                    return (
                      e >= o - n / 2 &&
                      e <= o + n / 2 &&
                      t >= i - n / 2 &&
                      t <= i + n / 2
                    );
                  }
                  function de(e, t, n) {
                    var o = s.getEdgeType(n);
                    if ("none" === o) return -1;
                    if (
                      null == n.data(s.syntax[o].weight) ||
                      0 == n.data(s.syntax[o].weight).length
                    )
                      return -1;
                    for (
                      var i = s.getAnchorsAsArray(n), d = ie(n), a = 0;
                      i && a < i.length;
                      a += 2
                    )
                      if (se(e, t, d, i[a], i[a + 1])) return a / 2;
                    return -1;
                  }
                  function ae() {
                    (P = t.panningEnabled()),
                      (C = t.zoomingEnabled()),
                      (w = t.boxSelectionEnabled()),
                      t
                        .zoomingEnabled(!1)
                        .panningEnabled(!1)
                        .boxSelectionEnabled(!1);
                  }
                  function re() {
                    t.zoomingEnabled(C)
                      .panningEnabled(P)
                      .boxSelectionEnabled(w);
                  }
                  null == ee && (ee = {}), (ee.options = n);
                  var ce = i(function (e, t, n, o) {
                    var i = e.data(s.syntax[t].weight),
                      d = e.data(s.syntax[t].distance),
                      a = s.convertToRelativePosition(e, o);
                    (i[n] = a.weight),
                      (d[n] = a.distance),
                      e.data(s.syntax[t].weight, i),
                      e.data(s.syntax[t].distance, d);
                  }, 5);
                  (P = t.panningEnabled()),
                    (C = t.zoomingEnabled()),
                    (w = t.boxSelectionEnabled());
                  var le,
                    ge,
                    he,
                    ue,
                    ye,
                    ve,
                    pe,
                    fe,
                    xe,
                    me = (we = t.edges(":selected")).length;
                  1 === me && (E = we[0]),
                    t.bind(
                      "zoom pan",
                      (h = function () {
                        E && oe();
                      })
                    ),
                    t.on(
                      "data",
                      "edge",
                      (A = function () {
                        E && oe();
                      })
                    ),
                    t.on(
                      "style",
                      "edge.edgebendediting-hasbendpoints:selected, edge.edgecontrolediting-hascontrolpoints:selected",
                      (c = function () {
                        setTimeout(function () {
                          oe();
                        }, 50);
                      })
                    ),
                    t.on(
                      "remove",
                      "edge",
                      (l = function () {
                        if (this.selected()) {
                          if (
                            ((me -= 1),
                            t.startBatch(),
                            E && E.removeClass("cy-edge-editing-highlight"),
                            1 === me)
                          ) {
                            var e = t.edges(":selected");
                            1 === e.length
                              ? (E = e[0]).addClass("cy-edge-editing-highlight")
                              : (E = void 0);
                          } else E = void 0;
                          t.endBatch();
                        }
                        oe();
                      })
                    ),
                    t.on(
                      "add",
                      "edge",
                      (g = function () {
                        this.selected() &&
                          ((me += 1),
                          t.startBatch(),
                          E && E.removeClass("cy-edge-editing-highlight"),
                          1 === me
                            ? (E = this).addClass("cy-edge-editing-highlight")
                            : (E = void 0),
                          t.endBatch()),
                          oe();
                      })
                    ),
                    t.on(
                      "select",
                      "edge",
                      (u = function () {
                        var e = this;
                        0 != e.target().connectedEdges().length &&
                          0 != e.source().connectedEdges().length &&
                          ((me += 1),
                          t.startBatch(),
                          E && E.removeClass("cy-edge-editing-highlight"),
                          1 === me
                            ? (E = e).addClass("cy-edge-editing-highlight")
                            : (E = void 0),
                          t.endBatch(),
                          oe());
                      })
                    ),
                    t.on(
                      "unselect",
                      "edge",
                      (y = function () {
                        if (
                          ((me -= 1),
                          t.startBatch(),
                          E && E.removeClass("cy-edge-editing-highlight"),
                          1 === me)
                        ) {
                          var e = t.edges(":selected");
                          1 === e.length
                            ? (E = e[0]).addClass("cy-edge-editing-highlight")
                            : (E = void 0);
                        } else E = void 0;
                        t.endBatch(), oe();
                      })
                    );
                  var be,
                    Ae,
                    Pe,
                    Ce,
                    we,
                    Te = !1;
                  t.on(
                    "tapstart",
                    (v = function (e) {
                      ge = e.position || e.cyPosition;
                    })
                  ),
                    t.on(
                      "tapstart",
                      "edge",
                      (p = function (e) {
                        var n = this;
                        if (E && E.id() === n.id()) {
                          he = n;
                          var o = s.getEdgeType(n);
                          "none" === o && (o = "bend");
                          var i = (function (e, t, n) {
                            var o = ie(n),
                              i = n._private.rscratch.allpts,
                              s = { x: i[0], y: i[1] },
                              d = { x: i[i.length - 2], y: i[i.length - 1] };
                            return (
                              ne(s),
                              ne(d),
                              se(e, t, o, s.x, s.y)
                                ? 0
                                : se(e, t, o, d.x, d.y)
                                ? 1
                                : -1
                            );
                          })(ge.x, ge.y, n);
                          if (0 == i || 1 == i) {
                            n.unselect(),
                              (ve = i),
                              (fe = 0 == i ? he.source() : he.target());
                            var a = 0 == i ? "source" : "target",
                              r = d.disconnectEdge(
                                he,
                                t,
                                e.renderedPosition,
                                a
                              );
                            (pe = r.dummyNode), (he = r.edge), ae();
                          } else (le = void 0), (ye = !0);
                        } else ye = !1;
                      })
                    ),
                    t.on(
                      "drag",
                      "node",
                      (b = function () {
                        E && oe();
                      })
                    ),
                    t.on(
                      "tapdrag",
                      (f = function (e) {
                        t.edges(":selected").length > 0 &&
                          t.autounselectify(!1);
                        var o = he;
                        if (void 0 === he || !s.isIgnoredEdge(o)) {
                          var i = s.getEdgeType(o);
                          if (
                            ye &&
                            n.enableCreateAnchorOnDrag &&
                            !W &&
                            "none" !== i
                          ) {
                            var d = s.syntax[i].weight,
                              a = s.syntax[i].distance;
                            (ue = {
                              edge: o,
                              type: i,
                              weights: o.data(d) ? [].concat(o.data(d)) : [],
                              distances: o.data(a) ? [].concat(o.data(a)) : [],
                            }),
                              o.unselect(),
                              (le = s.addAnchorPoint(o, ge)),
                              (he = o),
                              (ye = void 0),
                              (Te = !0),
                              ae();
                          }
                          if (
                            W ||
                            (void 0 !== he && (void 0 !== le || void 0 !== ve))
                          ) {
                            var r = e.position || e.cyPosition;
                            -1 != ve && pe
                              ? pe.position(r)
                              : null != le
                              ? ce(o, i, le, r)
                              : W &&
                                (void 0 === U.touchedAnchorIndex &&
                                  ge &&
                                  (U.touchedAnchorIndex = de(
                                    ge.x,
                                    ge.y,
                                    U.edge
                                  )),
                                void 0 !== U.touchedAnchorIndex &&
                                  ce(
                                    U.edge,
                                    U.edgeType,
                                    U.touchedAnchorIndex,
                                    r
                                  )),
                              e.target &&
                                e.target[0] &&
                                e.target.isNode() &&
                                (xe = e.target);
                          }
                        }
                      })
                    ),
                    t.on(
                      "tapend",
                      (x = function (e) {
                        M && N.getStage().fire("contentMouseup");
                        var n = he || U.edge;
                        if (void 0 !== n) {
                          var o = U.touchedAnchorIndex;
                          if (null != o) {
                            var i,
                              a = n.source().position("x"),
                              r = n.source().position("y"),
                              c = n.target().position("x"),
                              l = n.target().position("y"),
                              g = s.getAnchorsAsArray(n),
                              h = [a, r].concat(g).concat([c, l]),
                              u = o + 1,
                              y = u - 1,
                              v = u + 1,
                              p = { x: h[2 * u], y: h[2 * u + 1] },
                              f = { x: h[2 * y], y: h[2 * y + 1] },
                              x = { x: h[2 * v], y: h[2 * v + 1] };
                            if (
                              (p.x === f.x && p.y === f.y) ||
                              (p.x === f.x && p.y === f.y)
                            )
                              i = !0;
                            else {
                              var m,
                                b = (f.y - x.y) / (f.x - x.x),
                                A = {
                                  srcPoint: f,
                                  tgtPoint: x,
                                  m1: b,
                                  m2: -1 / b,
                                },
                                P = s.getIntersection(n, p, A),
                                C = Math.sqrt(
                                  Math.pow(p.x - P.x, 2) +
                                    Math.pow(p.y - P.y, 2)
                                );
                              "bend" === (m = s.getEdgeType(n)) &&
                                C < te().bendRemovalSensitivity &&
                                (i = !0);
                            }
                            i && s.removeAnchor(n, o);
                          } else if (null != pe && (0 == ve || 1 == ve)) {
                            var w = fe,
                              T = "valid",
                              E = 0 == ve ? "source" : "target";
                            if (xe) {
                              var S = 0 == ve ? xe : n.source(),
                                I = 1 == ve ? xe : n.target();
                              "function" == typeof V && (T = V(n, S, I)),
                                (w = "valid" === T ? xe : fe);
                            }
                            if (
                              ((S = 0 == ve ? w : n.source()),
                              (I = 1 == ve ? w : n.target()),
                              (n = d.connectEdge(n, fe, E)),
                              fe.id() !== w.id())
                            )
                              if ("function" == typeof H) {
                                var D = H(S.id(), I.id(), n.data());
                                if (
                                  (D &&
                                    (d.copyEdge(n, D),
                                    s.initAnchorPoints(
                                      te().bendPositionsFunction,
                                      te().controlPositionsFunction,
                                      [D]
                                    )),
                                  D && te().undoable)
                                ) {
                                  var F = { newEdge: D, oldEdge: n };
                                  t.undoRedo().do("removeReconnectedEdge", F),
                                    (n = D);
                                } else D && (t.remove(n), (n = D));
                              } else {
                                var R =
                                    0 == ve
                                      ? { source: w.id() }
                                      : { target: w.id() },
                                  O =
                                    0 == ve
                                      ? { source: fe.id() }
                                      : { target: fe.id() };
                                if (te().undoable && w.id() !== fe.id()) {
                                  var B = { edge: n, location: R, oldLoc: O };
                                  n = t.undoRedo().do("reconnectEdge", B).edge;
                                }
                              }
                            "valid" !== T && "function" == typeof X && X(),
                              n.select(),
                              t.remove(pe);
                          }
                        }
                        "none" === (m = s.getEdgeType(n)) && (m = "bend"),
                          void 0 !== U.touchedAnchorIndex ||
                            Te ||
                            (ue = void 0);
                        var K = s.syntax[m].weight;
                        void 0 !== n &&
                          void 0 !== ue &&
                          (n.data(K) ? n.data(K).toString() : null) !=
                            ue.weights.toString() &&
                          (Te && (n.select(), t.autounselectify(!0)),
                          te().undoable &&
                            t.undoRedo().do("changeAnchorPoints", ue)),
                          (le = void 0),
                          (he = void 0),
                          (ue = void 0),
                          (ye = void 0),
                          (ve = void 0),
                          (pe = void 0),
                          (fe = void 0),
                          (xe = void 0),
                          (ge = void 0),
                          (Te = !1),
                          (U.touchedAnchorIndex = void 0),
                          re(),
                          setTimeout(function () {
                            oe();
                          }, 50);
                      })
                    ),
                    t.on("edgeediting.movestart", function (e, t) {
                      (Ce = !1),
                        null != t[0] &&
                          t.forEach(function (e) {
                            null == s.getAnchorsAsArray(e) ||
                              Ce ||
                              ((Ae = {
                                x: s.getAnchorsAsArray(e)[0],
                                y: s.getAnchorsAsArray(e)[1],
                              }),
                              (be = {
                                firstTime: !0,
                                firstAnchorPosition: { x: Ae.x, y: Ae.y },
                                edges: t,
                              }),
                              (Pe = e),
                              (Ce = !0));
                          });
                    }),
                    t.on("edgeediting.moveend", function (e, n) {
                      if (null != be) {
                        var o = be.firstAnchorPosition,
                          i = {
                            x: s.getAnchorsAsArray(Pe)[0],
                            y: s.getAnchorsAsArray(Pe)[1],
                          };
                        (be.positionDiff = { x: -i.x + o.x, y: -i.y + o.y }),
                          delete be.firstAnchorPosition,
                          te().undoable &&
                            t.undoRedo().do("moveAnchorPoints", be),
                          (be = void 0);
                      }
                    }),
                    t.on(
                      "cxttap",
                      (m = function (e) {
                        var o,
                          i,
                          d = e.target || e.cyTarget,
                          a = !1;
                        try {
                          a = d.isEdge();
                        } catch (e) {}
                        a
                          ? ((o = d), (i = s.getEdgeType(o)))
                          : ((o = U.edge), (i = U.edgeType));
                        var r = t.contextMenus("get");
                        if (
                          !E ||
                          E.id() != o.id() ||
                          s.isIgnoredEdge(o) ||
                          E !== o
                        )
                          return (
                            r.hideMenuItem(I),
                            r.hideMenuItem(S),
                            r.hideMenuItem(R),
                            void r.hideMenuItem(F)
                          );
                        var c = e.position || e.cyPosition,
                          l = de(c.x, c.y, o);
                        -1 == l
                          ? (r.hideMenuItem(I),
                            r.hideMenuItem(R),
                            "control" === i && a
                              ? (r.showMenuItem(F), r.hideMenuItem(S))
                              : "bend" === i && a
                              ? (r.showMenuItem(S), r.hideMenuItem(F))
                              : a
                              ? (r.showMenuItem(S), r.showMenuItem(F))
                              : (r.hideMenuItem(S), r.hideMenuItem(F)),
                            (s.currentCtxPos = c))
                          : (r.hideMenuItem(S),
                            r.hideMenuItem(F),
                            "control" === i
                              ? (r.showMenuItem(R),
                                r.hideMenuItem(I),
                                n.enableMultipleAnchorRemovalOption &&
                                  o.hasClass(
                                    "edgecontrolediting-hasmultiplecontrolpoints"
                                  ) &&
                                  r.showMenuItem(O))
                              : "bend" === i
                              ? (r.showMenuItem(I), r.hideMenuItem(R))
                              : (r.hideMenuItem(I),
                                r.hideMenuItem(R),
                                r.hideMenuItem(O)),
                            (s.currentAnchorIndex = l)),
                          (s.currentCtxEdge = o);
                      })
                    ),
                    t.on(
                      "cyedgeediting.changeAnchorPoints",
                      "edge",
                      function () {
                        t.startBatch(),
                          t.edges().unselect(),
                          t.trigger("bendPointMovement"),
                          t.endBatch(),
                          oe();
                      }
                    );
                  var Ee = !1,
                    Me = { 37: !1, 38: !1, 39: !1, 40: !1 };
                  document.addEventListener(
                    "keydown",
                    function (n) {
                      if (
                        "function" == typeof te().moveSelectedAnchorsOnKeyEvents
                          ? te().moveSelectedAnchorsOnKeyEvents()
                          : te().moveSelectedAnchorsOnKeyEvents
                      ) {
                        var o,
                          i,
                          d = document.activeElement.tagName;
                        if ("TEXTAREA" != d && "INPUT" != d) {
                          switch (n.keyCode) {
                            case 37:
                            case 39:
                            case 38:
                            case 40:
                            case 32:
                              n.preventDefault();
                          }
                          if (n.keyCode < "37" || n.keyCode > "40") return;
                          if (
                            ((Me[n.keyCode] = !0),
                            t.edges(":selected").length !=
                              t.elements(":selected").length ||
                              1 != t.edges(":selected").length)
                          )
                            return;
                          Ee ||
                            ((we = t.edges(":selected")),
                            t.trigger("edgeediting.movestart", [we]),
                            (Ee = !0));
                          var a = 3;
                          if (n.altKey && n.shiftKey) return;
                          n.altKey ? (a = 1) : n.shiftKey && (a = 10);
                          var r = 0,
                            c = 0;
                          (r += Me[39] ? a : 0),
                            (r -= Me[37] ? a : 0),
                            (c += Me[40] ? a : 0),
                            (c -= Me[38] ? a : 0),
                            (o = { x: r, y: c }),
                            (i = we).forEach(function (t) {
                              var n = s.getAnchorsAsArray(t),
                                i = [];
                              if (null != n) {
                                for (var d = 0; d < n.length; d += 2)
                                  i.push({ x: n[d] + o.x, y: n[d + 1] + o.y });
                                var a = s.getEdgeType(t);
                                if (
                                  s.edgeTypeNoneShouldntHappen(
                                    a,
                                    "UiUtilities.js, moveAnchorPoints"
                                  )
                                )
                                  return;
                                "bend" === a
                                  ? e.bendPointPositionsSetterFunction(t, i)
                                  : "control" === a &&
                                    e.controlPointPositionsSetterFunction(t, i);
                              }
                            }),
                            s.initAnchorPoints(
                              te().bendPositionsFunction,
                              te().controlPositionsFunction,
                              i
                            ),
                            t.trigger("bendPointMovement");
                        }
                      }
                    },
                    !0
                  ),
                    document.addEventListener(
                      "keyup",
                      function (e) {
                        e.keyCode < "37" ||
                          e.keyCode > "40" ||
                          (e.preventDefault(),
                          (Me[e.keyCode] = !1),
                          ("function" ==
                          typeof te().moveSelectedAnchorsOnKeyEvents
                            ? te().moveSelectedAnchorsOnKeyEvents()
                            : te().moveSelectedAnchorsOnKeyEvents) &&
                            (t.trigger("edgeediting.moveend", [we]),
                            (we = void 0),
                            (Ee = !1)));
                      },
                      !0
                    ),
                    o.data("cyedgeediting", ee);
                },
                unbind: function () {
                  t
                    .off("remove", "node", l)
                    .off("add", "node", g)
                    .off(
                      "style",
                      "edge.edgebendediting-hasbendpoints:selected, edge.edgecontrolediting-hascontrolpoints:selected",
                      c
                    )
                    .off("select", "edge", u)
                    .off("unselect", "edge", y)
                    .off("tapstart", v)
                    .off("tapstart", "edge", p)
                    .off("tapdrag", f)
                    .off("tapend", x)
                    .off("cxttap", m)
                    .off("drag", "node", b)
                    .off("data", "edge", A),
                    t.unbind("zoom pan", h);
                },
              };
            return k[n]
              ? k[n].apply(
                  $(t.container()),
                  Array.prototype.slice.call(arguments, 1)
                )
              : "object" != (void 0 === n ? "undefined" : o(n)) && n
              ? ($.error(
                  "No such function `" + n + "` for cytoscape.js-edge-editing"
                ),
                $(this))
              : k.init.apply($(t.container()), arguments);
          };
        },
        259: (e) => {
          var t = {
            options: void 0,
            currentCtxEdge: void 0,
            currentCtxPos: void 0,
            currentAnchorIndex: void 0,
            ignoredClasses: void 0,
            setIgnoredClasses: function (e) {
              this.ignoredClasses = e;
            },
            syntax: {
              bend: {
                edge: "segments",
                class: "edgebendediting-hasbendpoints",
                multiClass: "edgebendediting-hasmultiplebendpoints",
                weight: "cyedgebendeditingWeights",
                distance: "cyedgebendeditingDistances",
                weightCss: "segment-weights",
                distanceCss: "segment-distances",
              },
              control: {
                edge: "unbundled-bezier",
                class: "edgecontrolediting-hascontrolpoints",
                multiClass: "edgecontrolediting-hasmultiplecontrolpoints",
                weight: "cyedgecontroleditingWeights",
                distance: "cyedgecontroleditingDistances",
                weightCss: "control-point-weights",
                distanceCss: "control-point-distances",
              },
            },
            getEdgeType: function (e) {
              return e
                ? e.hasClass(this.syntax.bend.class)
                  ? "bend"
                  : e.hasClass(this.syntax.control.class)
                  ? "control"
                  : e.css("curve-style") === this.syntax.bend.edge
                  ? "bend"
                  : e.css("curve-style") === this.syntax.control.edge
                  ? "control"
                  : this.options.bendPositionsFunction(e) &&
                    this.options.bendPositionsFunction(e).length > 0
                  ? "bend"
                  : this.options.controlPositionsFunction(e) &&
                    this.options.controlPositionsFunction(e).length > 0
                  ? "control"
                  : "none"
                : "none";
            },
            initAnchorPoints: function (e, t, n) {
              for (var o = 0; o < n.length; o++) {
                var i = n[o],
                  s = this.getEdgeType(i);
                if ("none" !== s && !this.isIgnoredEdge(i)) {
                  var d;
                  "bend" === s
                    ? (d = e.apply(this, i))
                    : "control" === s && (d = t.apply(this, i));
                  var a = { weights: [], distances: [] };
                  if (d) a = this.convertToRelativePositions(i, d);
                  else {
                    var r = i.data(this.syntax[s].weight),
                      c = i.data(this.syntax[s].distance);
                    r && c && (a = { weights: r, distances: c });
                  }
                  a.distances.length > 0
                    ? (i.data(this.syntax[s].weight, a.weights),
                      i.data(this.syntax[s].distance, a.distances),
                      i.addClass(this.syntax[s].class),
                      a.distances.length > 1 &&
                        i.addClass(this.syntax[s].multiClass))
                    : (i.data(this.syntax[s].weight, []),
                      i.data(this.syntax[s].distance, []),
                      i.hasClass(this.syntax[s].class) &&
                        i.removeClass(this.syntax[s].class),
                      i.hasClass(this.syntax[s].multiClass) &&
                        i.removeClass(this.syntax[s].multiClass));
                }
              }
            },
            isIgnoredEdge: function (e) {
              var t = e.source().position("x"),
                n = e.source().position("y"),
                o = e.target().position("x"),
                i = e.target().position("y");
              if ((t == o && n == i) || e.source().id() == e.target().id())
                return !0;
              for (
                var s = 0;
                this.ignoredClasses && s < this.ignoredClasses.length;
                s++
              )
                if (e.hasClass(this.ignoredClasses[s])) return !0;
              return !1;
            },
            getLineDirection: function (e, t) {
              return e.y == t.y && e.x < t.x
                ? 1
                : e.y < t.y && e.x < t.x
                ? 2
                : e.y < t.y && e.x == t.x
                ? 3
                : e.y < t.y && e.x > t.x
                ? 4
                : e.y == t.y && e.x > t.x
                ? 5
                : e.y > t.y && e.x > t.x
                ? 6
                : e.y > t.y && e.x == t.x
                ? 7
                : 8;
            },
            getSrcTgtPointsAndTangents: function (e) {
              var t = e.source(),
                n = e.target(),
                o = (n.position(), t.position(), t.position()),
                i = n.position(),
                s = (i.y - o.y) / (i.x - o.x);
              return { m1: s, m2: -1 / s, srcPoint: o, tgtPoint: i };
            },
            getIntersection: function (e, t, n) {
              void 0 === n && (n = this.getSrcTgtPointsAndTangents(e));
              var o,
                i,
                s = n.srcPoint,
                d = (n.tgtPoint, n.m1),
                a = n.m2;
              if (d == 1 / 0 || d == -1 / 0) (o = s.x), (i = t.y);
              else if (0 == d) (o = t.x), (i = s.y);
              else {
                var r = s.y - d * s.x;
                i = d * (o = (t.y - a * t.x - r) / (d - a)) + r;
              }
              return { x: o, y: i };
            },
            getAnchorsAsArray: function (e) {
              var t = this.getEdgeType(e);
              if (
                "none" !== t &&
                e.css("curve-style") === this.syntax[t].edge
              ) {
                for (
                  var n = [],
                    o = e.pstyle(this.syntax[t].weightCss)
                      ? e.pstyle(this.syntax[t].weightCss).pfValue
                      : [],
                    i = e.pstyle(this.syntax[t].distanceCss)
                      ? e.pstyle(this.syntax[t].distanceCss).pfValue
                      : [],
                    s = Math.min(o.length, i.length),
                    d = e.source().position(),
                    a = e.target().position(),
                    r = a.y - d.y,
                    c = a.x - d.x,
                    l = Math.sqrt(c * c + r * r),
                    g = { x: c / l, y: r / l },
                    h = -g.y,
                    u = g.x,
                    y = 0;
                  y < s;
                  y++
                ) {
                  var v = o[y],
                    p = i[y],
                    f = 1 - v,
                    x = v,
                    m = { x1: d.x, x2: a.x, y1: d.y, y2: a.y },
                    b = { x: m.x1 * f + m.x2 * x, y: m.y1 * f + m.y2 * x };
                  n.push(b.x + h * p, b.y + u * p);
                }
                return n;
              }
            },
            convertToRelativePosition: function (e, t, n) {
              void 0 === n && (n = this.getSrcTgtPointsAndTangents(e));
              var o,
                i = this.getIntersection(e, t, n),
                s = i.x,
                d = i.y,
                a = n.srcPoint,
                r = n.tgtPoint;
              o =
                s != a.x
                  ? (s - a.x) / (r.x - a.x)
                  : d != a.y
                  ? (d - a.y) / (r.y - a.y)
                  : 0;
              var c = Math.sqrt(Math.pow(d - t.y, 2) + Math.pow(s - t.x, 2)),
                l = this.getLineDirection(a, r),
                g = this.getLineDirection(i, t);
              return (
                l - g != -2 && l - g != 6 && 0 != c && (c *= -1),
                { weight: o, distance: c }
              );
            },
            convertToRelativePositions: function (e, t) {
              for (
                var n = this.getSrcTgtPointsAndTangents(e),
                  o = [],
                  i = [],
                  s = 0;
                t && s < t.length;
                s++
              ) {
                var d = t[s],
                  a = this.convertToRelativePosition(e, d, n);
                o.push(a.weight), i.push(a.distance);
              }
              return { weights: o, distances: i };
            },
            getDistancesString: function (e, t) {
              for (
                var n = "", o = e.data(this.syntax[t].distance), i = 0;
                o && i < o.length;
                i++
              )
                n = n + " " + o[i];
              return n;
            },
            getWeightsString: function (e, t) {
              for (
                var n = "", o = e.data(this.syntax[t].weight), i = 0;
                o && i < o.length;
                i++
              )
                n = n + " " + o[i];
              return n;
            },
            addAnchorPoint: function (e, t) {
              var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : void 0;
              (void 0 !== e && void 0 !== t) ||
                ((e = this.currentCtxEdge), (t = this.currentCtxPos)),
                void 0 === n && (n = this.getEdgeType(e));
              for (
                var o,
                  i = this.syntax[n].weight,
                  s = this.syntax[n].distance,
                  d = this.convertToRelativePosition(e, t),
                  a = d.weight,
                  r = e.source().position("x"),
                  c = e.source().position("y"),
                  l = e.target().position("x"),
                  g = e.target().position("y"),
                  h = this.convertToRelativePosition(e, { x: r, y: c }).weight,
                  u = this.convertToRelativePosition(e, { x: l, y: g }).weight,
                  y = [h].concat(e.data(i) ? e.data(i) : []).concat([u]),
                  v = this.getAnchorsAsArray(e),
                  p = 1 / 0,
                  f = [r, c].concat(v || []).concat([l, g]),
                  x = -1,
                  m = 0;
                m < y.length - 1;
                m++
              ) {
                var b = y[m],
                  A = y[m + 1],
                  P = this.compareWithPrecision(a, b, !0),
                  C = this.compareWithPrecision(a, A),
                  w = this.compareWithPrecision(a, A, !0),
                  T = this.compareWithPrecision(a, b);
                if ((P && C) || (w && T)) {
                  var E = { x: (r = f[2 * m]), y: (c = f[2 * m + 1]) },
                    M = { x: (l = f[2 * m + 2]), y: (g = f[2 * m + 3]) },
                    S = (c - g) / (r - l),
                    I = -1 / S,
                    D = { srcPoint: E, tgtPoint: M, m1: S, m2: I },
                    F = this.getIntersection(e, t, D),
                    R = Math.sqrt(
                      Math.pow(t.x - F.x, 2) + Math.pow(t.y - F.y, 2)
                    );
                  R < p && ((p = R), (o = F), (x = m));
                }
              }
              void 0 !== o && (t = o),
                (d = this.convertToRelativePosition(e, t)),
                void 0 === o && (d.distance = 0);
              var O = e.data(i),
                B = e.data(s);
              return (
                (B = B || []),
                0 === (O = O || []).length && (x = 0),
                -1 != x &&
                  (O.splice(x, 0, d.weight), B.splice(x, 0, d.distance)),
                e.data(i, O),
                e.data(s, B),
                e.addClass(this.syntax[n].class),
                (O.length > 1 || B.length > 1) &&
                  e.addClass(this.syntax[n].multiClass),
                x
              );
            },
            removeAnchor: function (e, t) {
              (void 0 !== e && void 0 !== t) ||
                ((e = this.currentCtxEdge), (t = this.currentAnchorIndex));
              var n = this.getEdgeType(e);
              if (
                !this.edgeTypeNoneShouldntHappen(
                  n,
                  "anchorPointUtilities.js, removeAnchor"
                )
              ) {
                var o,
                  i = this.syntax[n].weight,
                  s = this.syntax[n].distance,
                  d = e.data(i),
                  a = e.data(s);
                "bend" === n
                  ? (o = this.options.bendPositionsFunction(e))
                  : "control" === n &&
                    (o = this.options.controlPositionsFunction(e)),
                  d.splice(t, 1),
                  a.splice(t, 1),
                  o && o.splice(t, 1),
                  1 == d.length || 1 == a.length
                    ? e.removeClass(this.syntax[n].multiClass)
                    : 0 == d.length || 0 == a.length
                    ? (e.removeClass(this.syntax[n].class),
                      e.data(i, []),
                      e.data(s, []))
                    : (e.data(i, d), e.data(s, a));
              }
            },
            removeAllAnchors: function (e) {
              void 0 === e && (e = this.currentCtxEdge);
              var t = this.getEdgeType(e);
              if (
                !this.edgeTypeNoneShouldntHappen(
                  t,
                  "anchorPointUtilities.js, removeAllAnchors"
                )
              ) {
                e.removeClass(this.syntax[t].class),
                  e.removeClass(this.syntax[t].multiClass);
                var n = this.syntax[t].weight,
                  o = this.syntax[t].distance;
                e.data(n, []),
                  e.data(o, []),
                  "bend" === t && this.options.bendPositionsFunction(e)
                    ? this.options.bendPointPositionsSetterFunction(e, [])
                    : "control" === t &&
                      this.options.controlPositionsFunction(e) &&
                      this.options.controlPointPositionsSetterFunction(e, []);
              }
            },
            calculateDistance: function (e, t) {
              var n = e.x - t.x,
                o = e.y - t.y;
              return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2));
            },
            compareWithPrecision: function (e, t) {
              var n =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2],
                o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 0.01,
                i = e - t;
              return Math.abs(i) <= o || (n ? e < t : e > t);
            },
            edgeTypeNoneShouldntHappen: function (e, t) {
              return (
                "none" === e &&
                (console.log(
                  "In " + t + ": edge type none should never happen here!!"
                ),
                !0)
              );
            },
          };
          e.exports = t;
        },
        218: (e) => {
          var t,
            n,
            o =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  },
            i =
              ((t = Math.max),
              (n =
                Date.now ||
                function () {
                  return new Date().getTime();
                }),
              function (e, i, s) {
                var d,
                  a,
                  r,
                  c,
                  l,
                  g,
                  h,
                  u,
                  y,
                  v = 0,
                  p = !1,
                  f = !0;
                if ("function" != typeof e)
                  throw new TypeError("Expected a function");
                if (((i = i < 0 ? 0 : +i || 0), !0 === s)) {
                  var x = !0;
                  f = !1;
                } else
                  (y = void 0 === (u = s) ? "undefined" : o(u)),
                    !u ||
                      ("object" != y && "function" != y) ||
                      ((x = !!s.leading),
                      (p = "maxWait" in s && t(+s.maxWait || 0, i)),
                      (f = "trailing" in s ? !!s.trailing : f));
                function m(t, o) {
                  o && clearTimeout(o),
                    (a = g = h = void 0),
                    t &&
                      ((v = n()),
                      (r = e.apply(l, d)),
                      g || a || (d = l = void 0));
                }
                function b() {
                  var e = i - (n() - c);
                  e <= 0 || e > i ? m(h, a) : (g = setTimeout(b, e));
                }
                function A() {
                  m(f, g);
                }
                function P() {
                  if (
                    ((d = arguments),
                    (c = n()),
                    (l = this),
                    (h = f && (g || !x)),
                    !1 === p)
                  )
                    var t = x && !g;
                  else {
                    a || x || (v = c);
                    var o = p - (c - v),
                      s = o <= 0 || o > p;
                    s
                      ? (a && (a = clearTimeout(a)),
                        (v = c),
                        (r = e.apply(l, d)))
                      : a || (a = setTimeout(A, o));
                  }
                  return (
                    s && g
                      ? (g = clearTimeout(g))
                      : g || i === p || (g = setTimeout(b, i)),
                    t && ((s = !0), (r = e.apply(l, d))),
                    !s || g || a || (d = l = void 0),
                    r
                  );
                }
                return (
                  (P.cancel = function () {
                    g && clearTimeout(g),
                      a && clearTimeout(a),
                      (v = 0),
                      (a = g = h = void 0);
                  }),
                  P
                );
              });
          e.exports = i;
        },
        579: (e, t, n) => {
          var o, i, s;
          (i = n(259)),
            n(218),
            (s = function (e, t, o) {
              var s = n(347);
              if (e && t && o) {
                var d,
                  a = {
                    bendPositionsFunction: function (e) {
                      return e.data("bendPointPositions");
                    },
                    controlPositionsFunction: function (e) {
                      return e.data("controlPointPositions");
                    },
                    bendPointPositionsSetterFunction: function (e, t) {
                      e.data("bendPointPositions", t);
                    },
                    controlPointPositionsSetterFunction: function (e, t) {
                      e.data("controlPointPositions", t);
                    },
                    initAnchorsAutomatically: !0,
                    ignoredClasses: [],
                    undoable: !1,
                    anchorShapeSizeFactor: 3,
                    zIndex: 999,
                    bendRemovalSensitivity: 8,
                    addBendMenuItemTitle: "Add Bend Point",
                    removeBendMenuItemTitle: "Remove Bend Point",
                    removeAllBendMenuItemTitle: "Remove All Bend Points",
                    addControlMenuItemTitle: "Add Control Point",
                    removeControlMenuItemTitle: "Remove Control Point",
                    removeAllControlMenuItemTitle: "Remove All Control Points",
                    moveSelectedAnchorsOnKeyEvents: function () {
                      return !0;
                    },
                    enableMultipleAnchorRemovalOption: !1,
                    useTrailingDividersAfterContextMenuOptions: !1,
                    enableCreateAnchorOnDrag: !0,
                  },
                  r = !1;
                e("core", "edgeEditing", function (e) {
                  var t = this;
                  return "initialized" === e
                    ? r
                    : ("get" !== e &&
                        ((d = (function (e, t) {
                          var n = {};
                          for (var o in e) n[o] = e[o];
                          for (var o in t)
                            if ("bendRemovalSensitivity" == o) {
                              var i = t[o];
                              isNaN(i) ||
                                (n[o] =
                                  i >= 0 && i <= 20 ? t[o] : i < 0 ? 0 : 20);
                            } else n[o] = t[o];
                          return n;
                        })(a, e)),
                        (r = !0),
                        t
                          .style()
                          .selector(".edgebendediting-hasbendpoints")
                          .css({
                            "curve-style": "segments",
                            "segment-distances": function (e) {
                              return i.getDistancesString(e, "bend");
                            },
                            "segment-weights": function (e) {
                              return i.getWeightsString(e, "bend");
                            },
                            "edge-distances": "node-position",
                          }),
                        t
                          .style()
                          .selector(".edgecontrolediting-hascontrolpoints")
                          .css({
                            "curve-style": "unbundled-bezier",
                            "control-point-distances": function (e) {
                              return i.getDistancesString(e, "control");
                            },
                            "control-point-weights": function (e) {
                              return i.getWeightsString(e, "control");
                            },
                            "edge-distances": "node-position",
                          }),
                        t.style().selector("#nwt_reconnectEdge_dummy").css({
                          width: "1",
                          height: "1",
                          visibility: "hidden",
                        }),
                        i.setIgnoredClasses(d.ignoredClasses),
                        d.initAnchorsAutomatically &&
                          i.initAnchorPoints(
                            d.bendPositionsFunction,
                            d.controlPositionsFunction,
                            t.edges(),
                            d.ignoredClasses
                          ),
                        s(d, t)),
                      r
                        ? {
                            getAnchorsAsArray: function (e) {
                              return i.getAnchorsAsArray(e);
                            },
                            initAnchorPoints: function (e) {
                              i.initAnchorPoints(
                                d.bendPositionsFunction,
                                d.controlPositionsFunction,
                                e
                              );
                            },
                            deleteSelectedAnchor: function (e, t) {
                              i.removeAnchor(e, t);
                            },
                            getEdgeType: function (e) {
                              return i.getEdgeType(e);
                            },
                          }
                        : void 0);
                });
              }
            }),
            e.exports && (e.exports = s),
            void 0 ===
              (o = function () {
                return s;
              }.call(t, n, t, e)) || (e.exports = o),
            "undefined" != typeof cytoscape &&
              $ &&
              Konva &&
              s(cytoscape, $, Konva);
        },
        171: (e) => {
          e.exports = {
            disconnectEdge: function (e, t, n, o) {
              var i = {
                data: { id: "nwt_reconnectEdge_dummy", ports: [] },
                renderedPosition: n,
              };
              t.add(i);
              var s =
                "source" === o ? { source: i.data.id } : { target: i.data.id };
              return (
                (e = e.move(s)[0]),
                { dummyNode: t.nodes("#" + i.data.id)[0], edge: e }
              );
            },
            connectEdge: function (e, t, n) {
              if (e.isEdge() && t.isNode()) {
                var o = {};
                if ("source" === n) o.source = t.id();
                else {
                  if ("target" !== n) return;
                  o.target = t.id();
                }
                return e.move(o)[0];
              }
            },
            copyEdge: function (e, t) {
              this.copyAnchors(e, t), this.copyStyle(e, t);
            },
            copyStyle: function (e, t) {
              e &&
                t &&
                (t.data("line-color", e.data("line-color")),
                t.data("width", e.data("width")),
                t.data("cardinality", e.data("cardinality")));
            },
            copyAnchors: function (e, t) {
              if (e.hasClass("edgebendediting-hasbendpoints")) {
                var n = e.data("cyedgebendeditingDistances"),
                  o = e.data("cyedgebendeditingWeights");
                t.data("cyedgebendeditingDistances", n),
                  t.data("cyedgebendeditingWeights", o),
                  t.addClass("edgebendediting-hasbendpoints");
              } else
                e.hasClass("edgecontrolediting-hascontrolpoints") &&
                  ((n = e.data("cyedgecontroleditingDistances")),
                  (o = e.data("cyedgecontroleditingWeights")),
                  t.data("cyedgecontroleditingDistances", n),
                  t.data("cyedgecontroleditingWeights", o),
                  t.addClass("edgecontrolediting-hascontrolpoints"));
              e.hasClass("edgebendediting-hasmultiplebendpoints")
                ? t.addClass("edgebendediting-hasmultiplebendpoints")
                : e.hasClass("edgecontrolediting-hasmultiplecontrolpoints") &&
                  t.addClass("edgecontrolediting-hasmultiplecontrolpoints");
            },
          };
        },
        961: (e) => {
          e.exports = function (e, t, n) {
            if (null != e.undoRedo) {
              var o = e.undoRedo({ defaultActions: !1, isDebug: !0 });
              o.action("changeAnchorPoints", i, i),
                o.action("moveAnchorPoints", s, s),
                o.action("reconnectEdge", d, d),
                o.action("removeReconnectedEdge", a, a);
            }
            function i(n) {
              var o,
                i,
                s,
                d,
                a = e.getElementById(n.edge.id()),
                r = "none" !== n.type ? n.type : t.getEdgeType(a);
              "none" !== n.type || n.set
                ? ((s = t.syntax[r].weight),
                  (d = t.syntax[r].distance),
                  (o = n.set ? a.data(s) : n.weights),
                  (i = n.set ? a.data(d) : n.distances))
                : ((o = []), (i = []));
              var c = { edge: a, type: r, weights: o, distances: i, set: !0 };
              if (n.set) {
                var l = n.weights && n.weights.length > 0,
                  g = l && n.weights.length > 1;
                l && (a.data(s, n.weights), a.data(d, n.distances));
                var h = t.syntax[r].class,
                  u = t.syntax[r].multiClass;
                l || g
                  ? l && !g
                    ? (a.addClass(h), a.removeClass(u))
                    : a.addClass(h + " " + u)
                  : a.removeClass(h + " " + u),
                  l || (a.data(s, []), a.data(d, [])),
                  a.selected() ? (a.unselect(), a.select()) : a.select();
              }
              return a.trigger("cyedgeediting.changeAnchorPoints"), c;
            }
            function s(e) {
              if (e.firstTime) return delete e.firstTime, e;
              var o = e.edges,
                i = e.positionDiff,
                s = { edges: o, positionDiff: { x: -i.x, y: -i.y } };
              return (
                (function (e, o) {
                  o.forEach(function (o) {
                    var i = t.getEdgeType(o),
                      s = t.getAnchorsAsArray(o),
                      d = [];
                    if (null != s) {
                      for (var a = 0; a < s.length; a += 2)
                        d.push({ x: s[a] + e.x, y: s[a + 1] + e.y });
                      "bend" === i
                        ? n.bendPointPositionsSetterFunction(o, d)
                        : "control" === i &&
                          n.controlPointPositionsSetterFunction(o, d);
                    }
                  }),
                    t.initAnchorPoints(
                      n.bendPositionsFunction,
                      n.controlPositionsFunction,
                      o
                    );
                })(i, o),
                s
              );
            }
            function d(e) {
              var t = e.edge,
                n = e.location,
                o = e.oldLoc,
                i = { edge: (t = t.move(n)[0]), location: o, oldLoc: n };
              return t.unselect(), i;
            }
            function a(t) {
              var n = t.oldEdge;
              (o = e.getElementById(n.data("id"))) && o.length > 0 && (n = o);
              var o,
                i = t.newEdge;
              return (
                (o = e.getElementById(i.data("id"))) && o.length > 0 && (i = o),
                n.inside() && (n = n.remove()[0]),
                i.removed() && (i = i.restore()).unselect(),
                { oldEdge: i, newEdge: n }
              );
            }
          };
        },
      },
      t = {};
    return (function n(o) {
      var i = t[o];
      if (void 0 !== i) return i.exports;
      var s = (t[o] = { exports: {} });
      return e[o](s, s.exports, n), s.exports;
    })(579);
  })();
});
