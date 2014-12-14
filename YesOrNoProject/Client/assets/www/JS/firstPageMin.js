(function() {
	var a = 0;
	window.zachModule = function(b) {
		zachModule[a++] = {};
		b()
	};
	window.main = function(b) {
		b()
	}
})();
zachModule(function() {
	function D(H, I) {
		for (var G = 0; G !== H; ++G) {
			I(G)
		}
	}
	function w(I, K) {
		var J;
		for (var H = 0, G = I.length; H !== G; ++H) {
			if ((J = K(I[H], H)) !== undefined) {
				return J
			}
		}
	}
	function E(I, J, G, H) {
		H ?
		function() {
			var K = I.length;

			function L(M) {
				if (M === K) {
					G()
				} else {
					J(I[M], M, function() {
						L(M + 1)
					})
				}
			}
			L(0)
		}() : function() {
			var M = I.length;
			for (var L = 0, K = I.length; L !== K; ++L) {
				J(I[L], L, function() {
					if (--M === 0) {
						G()
					}
				})
			}
		}()
	}
	function f(H, I) {
		for (var G in H) {
			I(G, H[G])
		}
	}
	function m(H, K, J) {
		var I, G;
		if (J) {
			for (I = 0, G = H.length; I !== G; ++I) {
				K(H.charAt(I), I)
			}
		} else {
			for (I = 0, G = H.length; I !== G; ++I) {
				K(H.charCodeAt(I), I)
			}
		}
	}
	function o(H, G) {
		w(G, function(I) {
			f(I, function(J, K) {
				H[J] = K
			})
		});
		return H
	}
	function c(G) {
		return o(G, Array.prototype.slice.call(arguments, 1))
	}
	function C() {
		var G = {};
		return o(G, arguments)
	}
	function x(H, I) {
		var G = {};
		f(I, function(J, K) {
			G[J] = H[J] === undefined ? K : H[J]
		});
		return G
	}
	function b(J, G) {
		var H = A(G),
			I = {};
		f(J, function(K, L) {
			!H.contains(K) && (I[K] = L)
		});
		return I
	}
	function v(H) {
		var G = [];
		f(H, function(I) {
			G.push(I)
		});
		return G
	}
	function d(I, G, H) {
		Object.defineProperty(I, G, {
			get: H
		})
	}
	function t(J, H, G) {
		G = G || {};
		var K = G.value,
			I = G.set;
		K !== undefined && I(K);
		Object.defineProperty(J, H, {
			get: function() {
				return K
			},
			set: function(L) {
				K = I ? I(L) || L : L
			}
		})
	}
	function k(H, G) {
		f(G, function(J, I) {
			t(H, J, I)
		})
	}
	var p = (function() {
		var G = {};
		w(["Array", "Boolean", "Date", "Function", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"], function(H) {
			G[H] = function(I) {
				return Object.prototype.toString.call(I) == "[object " + H + "]"
			}
		});
		return G
	})();

	function j(G) {
		return new Function("return " + G)().apply(null, Array.prototype.slice.call(arguments, 1))
	}
	function z(G, H) {
		return G + "(" + H.join(",") + ")"
	}
	function u(G) {
		return function() {
			return G + "(" + Array.prototype.join.call(arguments, ",") + ")"
		}
	}
	function y(L, J) {
		var H = 0,
			I, G = null,
			K = "";
		I = L.charAt(H++);
		while (I) {
			if (G === null) {
				if (I === "%") {
					G = ""
				} else {
					K += I
				}
			} else {
				if (I === "%") {
					if (G === "") {
						K += "%"
					} else {
						K += J[G] || ""
					}
					G = null
				} else {
					G += I
				}
			}
			I = L.charAt(H++)
		}
		return K
	}
	function B(I) {
		var H = "",
			G = 0;
		f(I || {}, function(J, K) {
			G++ && (H += "&");
			H += encodeURIComponent(J);
			H += "=";
			H += encodeURIComponent(K)
		});
		return H
	}
	function a(J, I, H, G) {
		w(J.split(I), function(K) {
			var L = K.split(H);
			G(L[0], L[1])
		})
	}
	var i = /(?:((?:[^:/]*):)\/\/)?([^:/?#]*)(?::([0-9]*))?(\/[^?#]*)?(\?[^#]*)?(#.*)?/;
	w(["protocol", "hostname", "port", "pathname", "search", "hash"], function(G, H) {
		d(String.prototype, G, function() {
			return i.test(this) ? decodeURIComponent(RegExp["$" + (H + 1)]) : ""
		})
	});
	f({
		host: function() {
			return this.hostname + (this.port ? ":" + this.port : "")
		},
		origin: function() {
			return this.protocol + "//" + this.host
		},
		arg: function() {
			var G = {};
			a(this.search.substring(1), "&", "=", function(H, I) {
				H !== "" && (G[H] = I)
			});
			return G
		}
	}, function(G, H) {
		d(String.prototype, G, H)
	});

	function l(H, G) {
		var I = B(C(H.arg, G));
		return H.origin + H.pathname + (I ? "?" : "") + I + H.hash
	}
	function n() {
		var H = null,
			G = null;
		return {
			head: function() {
				return H
			},
			tail: function() {
				return G
			},
			insert: function(K, I) {
				var J = I ? I.previous : G;
				K.next = I;
				K.previous = J;
				J ? J.next = K : H = K;
				I ? I.previous = K : G = K;
				return K
			},
			remove: function(I) {
				I.previous ? I.previous.next = I.next : H = I.next;
				I.next ? I.next.previous = I.previous : G = I.previous
			}
		}
	}
	n.Node = function(G) {
		return {
			previous: null,
			next: null,
			value: G
		}
	};
	n.loop = function(H, G) {
		var I;
		for (var J = H.head(); J !== null; J = J.next) {
			if ((I = G(J.value, J)) !== undefined) {
				return I
			}
		}
	};
	var r = {
		remove: function(G, I) {
			var H = [];
			w(G, function(J) {
				J != I && H.push(J)
			});
			return H
		},
		reverse: function(H) {
			var G = H.length - 1,
				I = G === -1 ? [] : new Array(G);
			w(H, function(K, J) {
				I[G - J] = K
			});
			return I
		}
	};
	Object.defineProperty(Array.prototype, "top", {
		get: function() {
			return this[this.length - 1]
		},
		set: function(G) {
			this[this.length - 1] = G
		}
	});

	function A(G) {
		var H = {};
		w(G, function(I) {
			H[I] = true
		});
		return {
			contains: function(I) {
				return H[I] === true
			}
		}
	}
	function F() {
		var G = n();
		return {
			trig: function() {
				var H = arguments;
				n.loop(G, function(I) {
					I.apply(null, H)
				})
			},
			regist: function(I) {
				var H = G.insert(n.Node(I), null);
				return {
					remove: function() {
						G.remove(H)
					}
				}
			}
		}
	}
	function s(J) {
		var I = F(J),
			H = 1;

		function G() {
			if (--H === 0) {
				I.trig()
			}
		}
		return {
			load: function(K) {
				++H;
				K(G)
			},
			onLoad: I.regist,
			start: function(K) {
				K && I.regist(K);
				G()
			}
		}
	}
	function h(H, G) {
		E(H, function(K, I, J) {
			K.load(J)
		}, G)
	}
	function e(I) {
		var H, G;
		return {
			load: function(J) {
				if (I) {
					if (!G) {
						G = [];
						I(function(K) {
							H = K;
							w(G, function(L) {
								L(H)
							});
							G = null;
							I = null
						})
					}
					G.push(J)
				} else {
					J(H)
				}
			}
		}
	}
	function q(I) {
		var G = I.length;

		function H(K, J) {
			var L = I[K];
			if (L) {
				L.apply(null, K === G - 1 ? J : [function() {
					H(K + 1, Array.prototype.slice.call(arguments, 0))
				}].concat(J))
			}
		}
		H(0, [])
	}
	function g(G, H) {
		G(H)
	}
	zachModule["0"].is = p;
	zachModule["0"].callFunction = j;
	zachModule["0"].loop = D;
	zachModule["0"].loopArray = w;
	zachModule["0"].loopArrayAsync = E;
	zachModule["0"].loopObj = f;
	zachModule["0"].loopString = m;
	zachModule["0"].insert = c;
	zachModule["0"].extend = C;
	zachModule["0"].extract = x;
	zachModule["0"].exclude = b;
	zachModule["0"].keys = v;
	zachModule["0"].defineGetter = d;
	zachModule["0"].defineAutoProperty = t;
	zachModule["0"].defineAutoProperties = k;
	zachModule["0"].encodeURIObject = B;
	zachModule["0"].tupleString = z;
	zachModule["0"].TupleString = u;
	zachModule["0"].replaceString = y;
	zachModule["0"].parsePairString = a;
	zachModule["0"].concatUrlArg = l;
	zachModule["0"].array = r;
	zachModule["0"].Set = A;
	zachModule["0"].LinkedList = n;
	zachModule["0"].Event = F;
	zachModule["0"].Loader = s;
	zachModule["0"].Resource = e;
	zachModule["0"].loadResource = h;
	zachModule["0"].procedure = q;
	zachModule["0"].request = g
});
zachModule(function() {
	var g = zachModule["0"],
		o = g.insert,
		k = g.loopArray,
		d = g.loopObj,
		a = g.LinkedList,
		f = g.is,
		b = g.defineGetter,
		n = g.Event;
	(function(s, r, q) {
		o(window.ua = window.ua || {}, {
			win32: q === "Win32",
			ie: !! window.ActiveXObject || "ActiveXObject" in window,
			ieVersion: Math.floor((/MSIE ([^;]+)/.exec(s) || [0, "0"])[1]),
			ios: (/iphone|ipad/gi).test(r),
			iphone: (/iphone/gi).test(r),
			ipad: (/ipad/gi).test(r),
			iosVersion: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(s) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || false,
			safari: /Version\//gi.test(r) && /Safari/gi.test(r),
			uiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(s),
			android: (/android/gi).test(r),
			androidVersion: parseFloat("" + (/android ([0-9\.]*)/i.exec(s) || [0, ""])[1]),
			chrome: /Chrome/gi.test(s),
			chromeVersion: parseInt((/Chrome\/([0-9]*)/gi.exec(s) || [0, 0])[1], 10),
			webkit: /AppleWebKit/.test(r),
			uc: r.indexOf("UCBrowser") !== -1,
			Browser: / Browser/gi.test(r),
			MiuiBrowser: /MiuiBrowser/gi.test(r),
			MicroMessenger: s.toLowerCase().match(/MicroMessenger/i) == "micromessenger",
			canTouch: "ontouchstart" in document,
			msPointer: window.navigator.msPointerEnabled
		})
	})(navigator.userAgent, navigator.appVersion, navigator.platform);

	function c(r) {
		var q = document.createElement("a");
		q.href = r;
		return q.href
	}
	k(["Left", "Top"], function(q) {
		b(HTMLElement.prototype, "page" + q, function() {
			var s = 0,
				t, r = document.body;
			for (t = this; t !== r; t = t.offsetParent || t.parentElement) {
				s += t["offset" + q] - (t === this ? 0 : t["scroll" + q])
			}
			return s
		})
	});
	k(["pageX", "pageY", "clientX", "clientY"], function(q) {
		Object.defineProperty(UIEvent.prototype, "z" + q.replace(/^./, function(r) {
			return r.toUpperCase()
		}), {
			get: function() {
				return "touches" in this && this.touches[0] !== undefined ? this.touches[0][q] : this[q]
			}
		})
	});
	window.nonstandardStyles = {};

	function h(s, r, q) {
		function t(v, u) {
			if (v in nonstandardStyles) {
				k(nonstandardStyles[v], function(w) {
					s.style.setProperty(w, u, "")
				})
			} else {
				s.style.setProperty(v, u, "")
			}
		}
		f.String(r) ? t(r, q) : d(r, t);
		return s
	}
	h.size = function(s, r, q) {
		h(s, {
			width: r + "px",
			height: q + "px"
		})
	};
	var e = function() {
			var q = null,
				r = a();
			return function(s) {
				var t = null;

				function u() {
					if (t === null) {
						t = r.insert(a.Node(s), null);
						if (q === null) {
							q = setTimeout(function v() {
								var w;
								if (r.tail() !== null) {
									q = setTimeout(v, 1000 / 60);
									for (w = r.head(); w !== null; w = w.next) {
										w.value()
									}
								} else {
									q = null
								}
							}, 1000 / 60)
						}
					}
				}
				u();
				return {
					start: u,
					remove: function() {
						t && r.remove(t);
						t = null
					}
				}
			}
		}();

	function j(u, t, r, s) {
		var q;
		if (u.addEventListener) {
			u.addEventListener(t, r, s || false);
			q = function() {
				u.removeEventListener(t, r, s || false)
			}
		} else {
			u.attachEvent("on" + t, r);
			q = function() {
				u.detachEvent("on" + t, r)
			}
		}
		return {
			remove: q
		}
	}
	function p(q) {
		return function(t, r, s) {
			return j(t, q, r, s)
		}
	}
	function m(s, q) {
		if (document.documentElement.contains(s)) {
			q && q()
		} else {
			var r = j(s, "DOMNodeInsertedIntoDocument", function() {
				q && q(s);
				r.remove()
			})
		}
	}
	function l(q) {
		var r = q.url + g.encodeURIObject(q.arg),
			s = new XMLHttpRequest();
		j(s, "load", function() {
			var t = s.responseText;
			try {
				if (q.isJson) {
					t = JSON.parse(t)
				}
			} catch (u) {
				q.onError && q.onError(s);
				return
			}
			q.onLoad && q.onLoad(t, s)
		});
		j(s, "error", function() {
			q.onError && q.onError(s)
		});
		s.open(q.method || "get", r, true);
		q.requestHeader && d(q.requestHeader, function(t, u) {
			s.setRequestHeader(t, u)
		});
		s.send(q.data || null);
		return s
	}
	var i = function() {
			var q = null;
			return function(s) {
				if (document.readyState === "complete") {
					s()
				} else {
					if (q === null) {
						q = n();
						var r = j(window, "load", function() {
							q.trig();
							r.remove();
							q = null
						})
					}
					q.regist(s)
				}
			}
		}();
	zachModule["1"].toAbsURL = c;
	zachModule["1"].css = h;
	zachModule["1"].bindEvent = j;
	zachModule["1"].Bind = p;
	zachModule["1"].onInsert = m;
	zachModule["1"].requestAnimate = e;
	zachModule["1"].ajax = l;
	zachModule["1"].onLoad = i
});
zachModule(function() {
	var a = zachModule["0"],
		h = a.is,
		l = a.loopArray,
		d = a.loopObj,
		b = a.insert,
		u = a.tupleString,
		g = a.LinkedList,
		y = zachModule["1"],
		j = y.css,
		f = y.bindEvent;
	b(nonstandardStyles, {
		transform: ["-webkit-transform", "-ms-transform", "transform"],
		animation: ["-webkit-animation"],
		transition: ["-webkit-transition", "transition"],
		"backface-visibility": ["-webkit-backface-visibility", "-mozila-backface-visibility", "backface-visibility"],
		"transform-style": ["-webkit-transform-style", "transform-style"],
		perspective: ["-webkit-perspective", "perspective"]
	});

	function z(A) {
		var n = "";
		d(A, function(D, C) {
			function B(E) {
				n += E + ":" + C + ";"
			}
			D in nonstandardStyles ? l(nonstandardStyles[D], B) : B(D)
		});
		return n
	}
	function k(A, n) {
		function B(C) {
			function D(E) {
				A.style.removeProperty(E)
			}
			C in nonstandardStyles ? l(nonstandardStyles[C], D) : D(C)
		}
		h.String(n) ? B(n) : h.Object(n) ? d(n, B) : l(n, B);
		return A
	}
	var e = function() {
			var n = g(),
				A = g();
			return function(B, C) {
				var F = C ? A : n;
				if (F.el === undefined) {
					F.el = document.head.insertBefore(document.createElement("style"), C ? document.head.firstChild : null)
				}
				var E = F.tail(),
					D = F.insert(g.Node(E === null ? 0 : E.value + 1), null);
				F.el.sheet.insertRule(B, D.value);
				return {
					remove: function() {
						var H = D.value;
						for (var G = D.next; G !== null; G = G.next) {
							G.value = H++
						}
						F.remove(D);
						F.el.sheet.deleteRule(H)
					}
				}
			}
		}();

	function p(B, A, n) {
		function C(D, G, E) {
			var F = h.String(G) ? G : z(G);
			e(D + " {" + F + "}", E)
		}
		if (h.String(B)) {
			C(B, A, n)
		} else {
			d(B, function(D, E) {
				C(D, E, A)
			})
		}
	}
	function o(A) {
		return Math.abs(A) < 0.01 ? 0 : A
	}
	j.transform = function() {
		var n = [];
		l(arguments, function(A, B) {
			B !== 0 && n.push(A)
		});
		j(arguments[0], "transform", n.join(" "))
	};
	j.translate = function(n, B, A) {
		return u("translate3d", [o(n) + "px", o(B) + "px", o(A) + "px"])
	};

	function q(n) {
		return function(B, A) {
			return u(n, [o(B) + (A || "rad")])
		}
	}
	j.rotateX = q("rotateX");
	j.rotateY = q("rotateY");
	j.rotateZ = q("rotateZ");
	j.scale = function() {
		return "scale(" + Array.prototype.join.call(arguments, ",") + ")"
	};
	j.px = function(n) {
		return n === 0 ? 0 : o(n) + "px"
	};
	j.s = function(n) {
		return n === 0 ? 0 : o(n) + "s"
	};
	j.url = function(n) {
		return "url(" + n + ")"
	};

	function x(A, n) {
		var B = f(A, "webkitTransitionEnd", function() {
			B.remove();
			n()
		})
	}
	function v(E, G, D, B, C) {
		C = h.String(D) ? C : B;
		if (ua.android && ua.androidVersion < 3) {
			j(E, D, B);
			C && C()
		} else {
			j(E, "transition", G);
			E.transition && E.transition.remove();

			function A() {
				if (E.transition) {
					n.remove();
					F.remove();
					k(E, "transition");
					C && C();
					E.transition = null
				}
			}
			var F = f(E, "DOMNodeRemovedFromDocument", A),
				n = E.transition = f(E, "webkitTransitionEnd", A);
			setTimeout(function() {
				j(E, D, B)
			}, 20)
		}
	}
	function r(n) {
		n && n.parentNode && n.parentNode.removeChild(n)
	}
	function c(C, B, n) {
		var F, D = {},
			E = n;
		if (C.charAt(0) === "<") {
			F = document.createElement("div");
			F.innerHTML = C;
			F = F.firstElementChild
		} else {
			var A = /([.#][^.#]*)/g,
				G;
			F = document.createElement(C.split(/[#.]/)[0]);
			while (G = A.exec(C)) {
				G = G[0];
				G.charAt(0) === "#" ? F.id = G.substring(1) : F.classList.add(G.substring(1))
			}
		}
		if (h.String(B)) {
			F.innerHTML = B
		} else {
			if (h.Object(B)) {
				D = B
			} else {
				if (h.Array(B)) {
					D.children = B
				} else {
					E = B
				}
			}
		}
		D && d(D, function(H, I) {
			if (I !== undefined) {
				switch (H) {
				case "classList":
					if (h.String(I)) {
						F.classList.add(I)
					} else {
						if (h.Array(I)) {
							l(I, function(J) {
								F.classList.add(J)
							})
						}
					}
					break;
				case "css":
					j(F, I);
					break;
				case "children":
					if (h.Array(I)) {
						l(I, function(J) {
							F.appendChild(J)
						})
					} else {
						F.appendChild(I)
					}
					break;
				default:
					if (H.substring(0, 5) === "data-") {
						F.setAttribute(H, I)
					} else {
						F[H] = I
					}
					break
				}
			}
		});
		E && E.appendChild(F);
		return F
	}
	function t(B, n, A) {
		n ? B.classList.add(A) : B.classList.remove(A)
	}
	function i(A, B, n) {
		A.classList.remove(B);
		A.classList.add(n)
	}
	function m(A, B, n) {
		var C;
		while (A !== null && A !== document && A !== n) {
			if (C = B(A)) {
				return C
			}
			A = A.parentNode
		}
	}
	function w(A, n) {
		document.addEventListener(A, function(B) {
			m(B.target, function(C) {
				n(C)
			}, document.documentElement)
		}, false)
	}
	function s(n, A) {
		return m(n, function(B) {
			if (A(B)) {
				return B
			}
		})
	}
	y.onLoad(function() {
		w("focusin", function(n) {
			n.classList.add("focus")
		});
		w("focusout", function(n) {
			n.classList.remove("focus")
		})
	});
	zachModule["2"].removeCss = k;
	zachModule["2"].cssRuleString = z;
	zachModule["2"].insertCSSRule = e;
	zachModule["2"].insertCSSRules = p;
	zachModule["2"].onTransitionEnd = x;
	zachModule["2"].transition = v;
	zachModule["2"].element = c;
	zachModule["2"].removeNode = r;
	zachModule["2"].toggleState = i;
	zachModule["2"].switchClass = t;
	zachModule["2"].bubble = m;
	zachModule["2"].onBubble = w;
	zachModule["2"].findAncestor = s;
	zachModule["2"].css = j;
	zachModule["2"].toAbsURL = y.toAbsURL;
	zachModule["2"].bindEvent = f;
	zachModule["2"].Bind = y.Bind;
	zachModule["2"].onInsert = y.onInsert;
	zachModule["2"].requestAnimate = y.requestAnimate;
	zachModule["2"].ajax = y.ajax;
	zachModule["2"].onLoad = y.onLoad
});
zachModule(function() {
	function a(h) {
		return h >= 0 ? 1 : -1
	}
	function g(k, j, i, m, l, h) {
		k -= i;
		j -= m;
		return k >= 0 && k < l && j >= 0 && j < h
	}
	function b(i, j, h) {
		if (j <= h) {
			return i < j ? j : i > h ? h : i
		} else {
			return b(i, h, j)
		}
	}
	function e(i, j, h) {
		if (j <= h) {
			return i >= j && i < h
		} else {
			return e(i, h, j)
		}
	}
	function f(h, i) {
		return Math.sqrt(h * h + i * i)
	}
	function d(h, i) {
		return h / f(h, i)
	}
	function c(j, l, i, k, m) {
		var h = 0.0001,
			n = m ||
		function(p) {
			function r(A, z, y) {
				var w = 1 - A,
					B = w * w,
					v = A * A,
					u = v * A,
					x = A * B,
					s = v * w;
				return 3 * z * x + 3 * y * s + u
			}
			function q(s, v, u) {
				return (9 * v - 9 * u + 3) * s * s + (6 * u - 12 * v) * s + 3 * v
			}
			var o = 0.5;
			while (Math.abs(p - r(o, j, i)) > h) {
				o = o - (r(o, j, i) - p) / q(o, j, i)
			}
			return r(o, l, k)
		};
		n.arg = [j, l, i, k];
		return n
	}
	zachModule["3"].sign = a;
	zachModule["3"].inRect = g;
	zachModule["3"].range = b;
	zachModule["3"].inRange = e;
	zachModule["3"].distance = f;
	zachModule["3"].sin2 = d;
	zachModule["3"].Bezier = c
});
zachModule(function() {
	var n = zachModule["0"],
		q = n.insert,
		k = n.loopArray,
		o = n.Event,
		i = n.extend,
		l = zachModule["3"],
		p = zachModule["1"],
		j = p.bindEvent,
		c = 8,
		g = 0.8;

	function a(t, s, r) {
		if (t.onTouchStart || t.onCursorDown) {
			return (ua.msPointer || !ua.canTouch ? t.onCursorDown : t.onTouchDown)(s)
		} else {
			function u(w, v, x) {
				return j(t, w, function(C) {
					var B = C.zPageX,
						A = C.zPageY,
						E = o(),
						z = o();
					var D = j(document, v, function(F) {
						B = F.zPageX;
						A = F.zPageY;
						F.onMove = E.regist;
						F.onUp = z.regist;
						E.trig(F, B, A)
					});
					var y = j(document, x, function(F) {
						D.remove();
						y.remove();
						z.trig(F, B, A)
					});
					C.onMove = E.regist;
					C.onUp = z.regist;
					s(C, B, A)
				}, r)
			}
			return ua.canTouch ? u("touchstart", "touchmove", "touchend") : u("mousedown", "mousemove", "mouseup")
		}
	}
	function h(s, t, r) {
		return j(s, ua.canTouch ? "touchend" : "mouseup", t, r)
	}
	function e(s, r) {
		return a(s, function(w, v, u) {
			r.onSenseStart && r.onSenseStart(w);
			var x = w.onUp(function(y) {
				r.onSenseFailure && r.onSenseFailure(y)
			});
			var t = w.onMove(function(B, A, z) {
				B.distanceX = A - v;
				B.distanceY = z - u;
				var y = r.isOut(B);
				if (y !== undefined) {
					t.remove();
					x.remove();
					y && r.onSenseSuccess && r.onSenseSuccess(B, A, z)
				}
			})
		})
	}
	function d(r) {
		return l.distance(r.distanceX, r.distanceY) > c ? true : undefined
	}
	function b(r) {
		return function(s) {
			return d(s) ? (Math.abs(l.sin2(s.distanceY, s.distanceX)) >= g) ^ r : undefined
		}
	}
	function f(t, s, r) {
		return e(t, i(r || {}, {
			isOut: d,
			onSenseFailure: s
		}))
	}
	function m(r) {
		return function(t, s) {
			return e(t, {
				isOut: r,
				onSenseSuccess: function(u, y, x) {
					function D(J, H) {
						var G = J === 0 ? undefined : J > 0,
							E = [],
							K = 0,
							I = +new Date(),
							F = H;
						return {
							test: function(L) {
								return G === undefined || !((L - H) * (G ? 1 : -1) < -20)
							},
							track: function(L) {
								L = L || H;
								var M = +new Date(),
									O = M - I,
									N = L === H ? G : L > H;
								if (N !== G || O > 200) {
									E = [];
									K = 0
								} else {
									if (O > 200) {
										E = [];
										K = 0
									} else {
										K += O;
										while (K > 300) {
											K -= E.shift().duration
										}
										E.push({
											duration: O,
											distance: L - H
										})
									}
								}
								G = N;
								H = L;
								I = M
							},
							distance: function() {
								return H - F + J
							},
							direction: function() {
								return G
							},
							speed: function() {
								var L = 0;
								k(E, function(M) {
									L += M.distance
								});
								return K === 0 ? 0 : (L + 0) / K
							}
						}
					}
					var v = new Date(),
						z = o(),
						B = o(),
						C = D(u.distanceX, y),
						A = D(u.distanceY, x);

					function w() {
						return {
							distanceX: C.distance(),
							distanceY: A.distance(),
							directionX: C.direction(),
							directionY: A.direction()
						}
					}
					s(q(w(), {
						onDragEnd: B.regist,
						onDragMove: z.regist
					}));
					u.onMove(function(G, F, E) {
						if (C.test(F) && A.test(E)) {
							C.track(F);
							A.track(E);
							z.trig(w())
						}
					});
					u.onUp(function() {
						C.track();
						A.track();
						B.trig(q(w(), {
							speedX: C.speed(),
							speedY: A.speed(),
							duration: +new Date() - v
						}))
					})
				}
			})
		}
	}
	zachModule["4"].onPointerDown = a;
	zachModule["4"].onPointerUp = h;
	zachModule["4"].onDragH = m(b(true));
	zachModule["4"].onDragV = m(b(false));
	zachModule["4"].onDrag = m(d);
	zachModule["4"].onTap = f
});
zachModule(function() {
	var j = zachModule["0"],
		p = j.insert,
		m = j.loopArray,
		f = j.loopObj,
		g = zachModule["2"],
		l = g.css,
		o = l.px,
		c = zachModule["4"],
		b = c.onPointerDown;
	p(ua, {
		iphone4: ua.iphone && screen.height === 480,
		iphone5: ua.iphone && screen.height === 568,
		iphone6: ua.iphone && screen.height > 568
	});

	function h(r, s) {
		var t = {};
		f(s, function(u, v) {
			t[u] = r[u] === undefined ? v : r[u]
		});
		return t
	}
	function e(r) {
		return function(t, s) {
			if (j.is.Object(t)) {
				f(t, r)
			} else {
				r(t, s)
			}
		}
	}
	function n(v, y) {
		function t(B, A) {
			function C(E) {
				var F = "";
				j.loop(E, function() {
					F += "0"
				});
				return F
			}
			var D = B + "";
			return A > D.length ? C(A - D.length) + D : D
		}
		v = new Date(v);
		var u = {
			Y: v.getFullYear() + "",
			M: t(v.getMonth() + 1, 2),
			D: t(v.getDate(), 2),
			h: t(v.getHours(), 2),
			m: t(v.getMinutes(), 2),
			s: t(v.getSeconds(), 2)
		};
		var z = "",
			s = "",
			r = "";
		for (var w = 0, x = y.length; w !== x; ++w) {
			r = y.charAt(w);
			if (r === "%") {
				s += u[z] || z;
				z = "";
				continue
			}
			s += z;
			z = r
		}
		return s + z
	}
	function k(w, x, v, A) {
		var s = x / v,
			y = w.naturalWidth || w.width || w.clientWidth,
			z = w.naturalHeight || w.height || w.clientHeight,
			t = y / z,
			r = {
				position: "absolute"
			},
			u = 0;
		if (s < t) {
			r.height = o(v);
			r.left = o((x - v / z * y) / 2 << 0);
			r.top = 0;
			ua.ie && (r.width = o(v * t));
			u = v / z
		} else {
			r.width = o(x);
			r.left = 0;
			r.top = o((v - x / y * z) / 2 << 0);
			ua.ie && (r.height = o(x / t));
			u = x / y
		}
		A && (A.scale = u);
		return r
	}
	function a(u, t) {
		t = t || u.querySelector(".red-point .wrapper");
		var s = [],
			r = null;
		j.loop(u.length(), function() {
			s.push(g.element("span", t))
		});
		u.onCutTo(function(v) {
			r && r.classList.remove("active");
			r = s[v.curIndex];
			r.classList.add("active")
		})
	}
	var d = j.Resource(function(r) {
		window.bdmapInit = function() {
			r();
			delete window.bdmapInit
		};
		g.element("script", {
			src: "http://api.map.baidu.com/api?type=quick&ak=D5a271a3083d77f21c63ff307e9f60b9&v=1.0&callback=bdmapInit"
		}, document.head)
	});

	function i(r) {
		return function(s) {
			d.load(function() {
				r(s)
			})
		}
	}
	var q = i(function(r) {
		var s = g.element("div", {
			css: {
				height: "100%",
				width: "100%"
			}
		}, r.parent),
			u = new BMap.Map(s),
			t = [];
		b(r.parent, function(v) {
			v.stopPropagation()
		});
		m(r.data, function(z) {
			var w = new BMap.Point(parseFloat(z.lng), parseFloat(z.lat)),
				x = new BMap.Marker(w),
				v = new BMap.Icon(staticImgSrc("layout-map-mark.png"), new BMap.Size(30, 30));
			x.setIcon(v);
			u.addOverlay(x);
			t.push(w);
			if (r.make) {
				var y = new BMap.InfoWindow(r.make(z));
				x.addEventListener("click", function() {
					x.openInfoWindow(y)
				})
			}
		});
		if (t.length !== 0) {
			u.centerAndZoom(t[0], 16);
			u.setViewport(t)
		} else {
			u.centerAndZoom("北京市")
		}
		r.onLoad && r.onLoad()
	});
	zachModule["5"].extract = h;
	zachModule["5"].dateString = n;
	zachModule["5"].KeyValueFunction = e;
	zachModule["5"].getImageCoverStyle = k;
	zachModule["5"].doRedPoints = a;
	zachModule["5"].markerMap = q
});
zachModule(function() {
	var h = zachModule["3"],
		g = h.Bezier,
		c = zachModule["1"],
		f = c.requestAnimate,
		e = {
			linear: g(1, 1, 1, 1, function(i) {
				return i
			}),
			ease: g(0.25, 0.1, 0.25, 1),
			easeOut: g(0, 0, 0.58, 1),
			easeInOut: g(0.42, 0, 0.58, 1)
		};

	function b(k, j, i) {
		return k + (j - k) * i
	}
	function d(i) {
		var m = (i.duration || 1) * 1000,
			k = i.timing || e.ease,
			j = -(i.delay || 0) * 1000,
			l = new Date();
		return {
			ratio: function() {
				var n = new Date();
				j += n - l;
				l = n;
				return j < 0 ? null : k(j >= m ? 1 : j / m)
			},
			isEnd: function() {
				return j >= m
			},
			progress: function(n) {
				j = n * m;
				l = new Date()
			}
		}
	}
	function a(j, p) {
		var m = d(j),
			i = true,
			o = j.start || 0,
			k = j.end || 1;

		function n(q) {
			if (q !== null) {
				if (i) {
					j.onStart && j.onStart();
					i = false
				}
				j.onAnimate(b(o, k, q));
				if (m.isEnd()) {
					j.onEnd && j.onEnd();
					l.remove()
				}
			}
		}
		n(0);
		var l = (p || f)(function() {
			n(m.ratio())
		});
		return {
			remove: l.remove,
			progress: m.progress
		}
	}
	a.Bezier = g;
	a.Timing = e;
	a.Progress = d;
	a.animate = a;
	a.fromTo = b;
	zachModule["6"] = a
});
zachModule(function() {
	var e = zachModule["2"],
		b = e.element,
		d = e.insertCSSRules,
		a = e.insertCSSRule;
	a("@-webkit-keyframes wq-spin {0% {-webkit-transform: rotateZ(0deg);}100% {-webkit-transform: rotateZ(360deg);}}");
	a("@-webkit-keyframes wq-opa {12.0% {opacity: 0.80;}19.5% {opacity: 0.88;}37.2% {opacity: 0.64;}40.5% {opacity: 0.52;}52.7% {opacity: 0.69;}60.2% {opacity: 0.60;}66.6% {opacity: 0.52;}70.0% {opacity: 0.63;}79.9% {opacity: 0.60;}84.2% {opacity: 0.75;}91.0% {opacity: 0.87;}}");
	d({
		".wq-loading-page": {
			position: "absolute",
			height: "100%",
			width: "100%",
			"background-color": "black",
			"z-index": 20
		},
		".wq-loading-page ul": {
			"font-size": "100px",
			width: "1em",
			height: "1em",
			position: "relative",
			margin: "60% auto auto auto",
			"border-radius": "50%",
			"list-style": "none"
		},
		".wq-loading-page ul li": {
			position: "absolute",
			width: ".2em",
			height: ".2em",
			"border-radius": "50%"
		},
		".wq-loading-page ul li:nth-child(1)": {
			left: "50%",
			top: "0",
			margin: "0 0 0 -.1em",
			background: "#feb963",
			"-webkit-transform-origin": "50% 250%",
			"-webkit-animation": "wq-spin 1.13s linear infinite, wq-opa 3.67s ease-in-out infinite alternate"
		},
		".wq-loading-page ul li:nth-child(2)": {
			right: 0,
			top: "50%",
			margin: "-.1em 0 0 0",
			background: "#f86260",
			"-webkit-transform-origin": "-150% 50%",
			"-webkit-animation": "wq-spin 1.86s linear infinite, wq-opa 4.29s ease-in-out infinite alternate"
		},
		".wq-loading-page ul li:nth-child(3)": {
			left: "50%",
			bottom: "0",
			margin: "0 0 0 -.1em",
			background: "#49b2e1",
			"-webkit-transform-origin": "50% -150%",
			"-webkit-animation": "wq-spin 1.45s linear infinite, wq-opa 5.12s ease-in-out infinite alternate"
		},
		".wq-loading-page ul li:nth-child(4)": {
			left: 0,
			top: "50%",
			margin: "-.1em 0 0 0",
			background: "#feb95d",
			"-webkit-transform-origin": "250% 50%",
			"-webkit-animation": "wq-spin 1.72s linear infinite, wq-opa 5.25s ease-in-out infinite alternate"
		}
	});

	function c() {
		var f = b("div.wq-loading-page", [b("ul", [b("li"), b("li"), b("li"), b("li")])]);
		document.body.appendChild(f);
		return {
			remove: function() {
				document.body.removeChild(f)
			}
		}
	}
	zachModule["7"] = c
});
zachModule(function() {
	var a = {
		translate: function(b, c) {
			return [1, 0, 0, 1, b, c]
		},
		scale: function(c, b) {
			return [c, 0, 0, b, 0, 0]
		},
		rotate: function(b) {
			var c = Math.sin(b),
				d = Math.cos(b);
			return [d, c, -c, d, 0, 0]
		}
	};
	zachModule["8"].matrix = a;
	zachModule["8"].inverse = function(b) {
		var c = b[0] * b[3] - b[1] * b[2];
		return [b[3] / c, -b[1] / c, -b[2] / c, b[0] / c, (b[2] * b[5] - b[3] * b[4]) / c, (b[1] * b[4] - b[0] * b[5]) / c]
	};
	zachModule["8"].transform = function(b, c) {
		return [b[0] * c[0] + b[2] * c[1] + b[4] * c[2], b[1] * c[0] + b[3] * c[1] + b[5] * c[2], c[2]]
	};
	zachModule["8"].combine = function(b, c) {
		return [b[0] * c[0] + b[2] * c[1], b[1] * c[0] + b[3] * c[1], b[0] * c[2] + b[2] * c[3], b[1] * c[2] + b[3] * c[3], b[0] * c[4] + b[2] * c[5] + b[4], b[1] * c[4] + b[3] * c[5] + b[5]]
	}
});
zachModule(function() {
	var a = zachModule["0"],
		d = a.insert,
		s = a.loopArray,
		B = a.Event,
		t = zachModule["8"],
		w = t.matrix,
		z = t.combine,
		p = t.transform,
		e = t.inverse,
		y = zachModule["1"],
		j = y.Bind,
		x = y.requestAnimate,
		o = y.css,
		v = j(ua.msPointer ? "MSPointerOver" : "mouseover"),
		r = j(ua.msPointer ? "MSPointerOut" : "mouseout"),
		m = j(ua.msPointer ? "MSPointerDown" : "mousedown"),
		g = j(ua.msPointer ? "MSPointerUp" : "mouseup"),
		q = j(ua.msPointer ? "MSPointerMove" : "mousemove"),
		f = j("touchstart"),
		c = j("touchend"),
		h = j("touchmove"),
		A = 0;

	function l(G) {
		var D = [1, 0, 0, 1, 0, 0],
			H = [1, 0, 0, 1, 0, 0],
			I = [];

		function F() {
			var J = z(D, H);
			G.setTransform(J[0], J[1], J[2], J[3], J[4], J[5])
		}
		function E(J) {
			H = z(H, J);
			F()
		}
		function C(J) {
			return function() {
				E(J.apply(null, arguments))
			}
		}
		return d(G, {
			setPrepareTransform: function(J) {
				D = J;
				F()
			},
			transform: E,
			getTransform: function() {
				return [H[0], H[1], H[2], H[3], H[4], H[5]]
			},
			save: function() {
				CanvasRenderingContext2D.prototype.save.call(G);
				I.push(H)
			},
			restore: function() {
				CanvasRenderingContext2D.prototype.restore.call(G);
				H = I.pop();
				F()
			},
			translate: C(w.translate),
			rotate: C(w.rotate),
			scale: C(w.scale)
		})
	}
	function i() {
		var C = o(document.createElement("canvas"), "display", "block"),
			D = l(C.getContext("2d"));
		a.defineAutoProperty(C, "dpr", {
			value: (window.devicePixelRatio || 1) / (D.webkitBackingStorePixelRatio || D.mozBackingStorePixelRatio || D.msBackingStorePixelRatio || D.oBackingStorePixelRatio || D.backingStorePixelRatio || 1),
			set: function(E) {
				D.dpr = E;
				D.setPrepareTransform(w.scale(E, E))
			}
		});
		return d(C, {
			isDirty: true,
			clear: true,
			draw: function(E) {
				C.clear && D.clearRect(0, 0, C.width, C.height);
				D.layer = C;
				D.save();
				E(D);
				D.restore()
			},
			resize: function(F, E) {
				C.width = F * C.dpr;
				C.height = E * C.dpr;
				o.size(C, C.logicalWidth = F, C.logicalHeight = E)
			},
			drawTo: function(E) {
				C.parentLayer = E.layer;
				C.transformation = E.getTransform();
				E.drawImage(C, 0, 0, C.width, C.height)
			},
			dirty: function() {
				C.isDirty = true;
				C.parentLayer && C.parentLayer.dirty()
			}
		})
	}
	function b() {
		var C = null,
			D = {
				id: A++,
				areaFromPoint: null,
				dirty: function() {
					D.parentLayer && D.parentLayer.dirty()
				}
			};
		Object.defineProperty(D, "draw", {
			set: function(E) {
				C = E
			},
			get: function() {
				return function(E) {
					E.getTransform && (D.transformation = E.getTransform());
					D.parentLayer = E.layer;
					C(E)
				}
			}
		});
		s(["cursorDown", "cursorUp", "cursorMove", "cursorEnter", "cursorLeave", "touchDown", "touchMove", "touchUp", "touchEnter", "touchLeave"], function(E) {
			var F = B();
			D[E] = F.trig;
			D["on" + E.replace(/./, function(G) {
				return G.toUpperCase()
			})] = F.regist
		});
		return D
	}
	function k(C, D) {
		return C && C.transformation ? p(e(C.transformation), k(C.parentLayer, D)) : D
	}
	function n(C, D) {
		return C && C.transformation ? n(C.parentLayer, p(C.transformation, D)) : D
	}
	function u() {
		var E = i(),
			H, G, F = false,
			D = B();

		function I(W, X, K, T, R, U) {
			var P = 0,
				O = 0,
				Q = false,
				J = [],
				N = "last" + X,
				V = "is" + X;

			function S() {
				J = [];

				function Y(Z) {
					if (Z) {
						J.push(Z);
						s(Z.areaFromPoint ? [].concat(Z.areaFromPoint.apply(null, k(Z, [P, O, 1]))) : [], Y)
					}
				}
				Y(E.root)
			}
			function M(Z, aa) {
				if (!F) {
					return
				}
				var Y = J;
				s(Y, function(ab) {
					ab[N] = ab[V] || false;
					ab[V] = false
				});
				aa ? (J = aa) : S();
				s(J, function(ab) {
					ab[V] = true;
					L(ab, W + "Move", Z);
					if (!ab[N]) {
						L(ab, W + "Enter", Z)
					}
				});
				s(Y, function(ab) {
					if (!ab[V]) {
						L(ab, W + "Leave", Z)
					}
					delete ab[N]
				})
			}
			function L(aa, Y, Z) {
				aa[Y] && aa[Y](Z, P, O)
			}
			K(E, M);
			T(E, function(Y) {
				U && U(Y);
				Y.preventDefault();
				s(J, function(ab) {
					var Z = B(),
						aa = B(),
						ad = K(document, function(ae) {
							ae.preventDefault();
							ae.onMove = Z.regist;
							ae.onUp = aa.regist;
							Z.trig(ae, P, O)
						}),
						ac = R(document, function(ae) {
							ad.remove();
							ac.remove();
							aa.trig(ae, P, O)
						});
					L(ab, W + "Down", d(Y, {
						onMove: Z.regist,
						onUp: aa.regist
					}))
				})
			});
			R(E, function(Y) {
				s(J, function(Z) {
					L(Z, W + "Up", Y)
				})
			});
			return {
				focus: function() {
					Q = true
				},
				blur: function() {
					Q = false;
					M(event, [])
				},
				move: function(Y, Z) {
					P = Y;
					O = Z
				},
				calculate: function() {
					Q && M({})
				}
			}
		}
		H = I("cursor", "Hover", q, m, g);
		q(document, function(J) {
			H.move(J.pageX, J.pageY)
		}, true);
		v(E, H.focus);
		r(E, H.blur);
		if (!ua.msPointer) {
			G = I("touch", "Touch", h, f, c, function(J) {
				G.focus();
				G.move(J.zPageX, J.zPageY);
				G.calculate()
			});
			h(document, function(J) {
				J.preventDefault();
				G.move(J.zPageX, J.zPageY)
			}, true);
			c(document, G.blur)
		}
		x(function() {
			D.trig();
			if (E.isDirty) {
				E.isDirty = false;
				F = true;
				E.root && E.draw(E.root.draw);
				H.calculate();
				G && G.calculate()
			}
		});

		function C() {
			E.transformation = w.translate(E.pageLeft, E.pageTop)
		}
		y.onInsert(E, C);
		return d(E, {
			root: null,
			alter: C,
			requestAnimate: D.regist
		})
	}
	u.Context2D = l;
	u.Layer = i;
	u.Area = b;
	u.coordinatePageToArea = k;
	u.coordinateAreaToPage = n;
	zachModule["9"] = u
});
zachModule(function() {
	var e = zachModule["0"],
		n = e.insert,
		h = e.extend,
		m = e.Event,
		f = e.loop,
		i = e.loopArray,
		k = zachModule["3"],
		d = k.range,
		o = zachModule["2"],
		g = o.css,
		l = g.px,
		b = zachModule["6"],
		a = zachModule["4"];

	function c(p, r, q) {
		g(p, "transform", g.translate(p.zLeft = r, p.zTop = q, 0))
	}
	function j(v, t) {
		if (!j.hasCall) {
			o.insertCSSRules({
				".z-slide-list-panel": {
					overflow: "hidden",
					position: "relative"
				},
				".z-slide-list-panel > ul": {
					height: "100%",
					overflow: "hidden"
				},
				".z-slide-list-panel > ul > li": {
					height: "100%",
					"float": "left",
					"min-height": "1px"
				}
			}, true);
			j.hasCall = true
		}
		v.classList.add("z-slide-list-panel");
		t = h({
			width: 1,
			cycle: false,
			slideRatio: 1,
			margin: 0
		}, t || {});
		var y = v.querySelector("ul"),
			A = [],
			B = t.cycle,
			K = t.slideRatio,
			z = t.margin,
			u = t.width + z,
			r = false,
			J = m(),
			H = m(),
			G = m(),
			x, q, M, F, w = 0,
			s = false;
		o.onInsert(v, function() {
			x = v.offsetWidth;
			q = x * t.width;
			M = x * z;
			F = function() {
				var N = 1;
				while (t.width * N + z * (N - 2) < 1) {
					N += 2
				}
				return N + K * 2
			}();
			g(y, {
				width: l(F * q + (z > 0 ? M * F : 0)),
				"margin-left": l(-(F * t.width - 1) / 2 * x)
			})
		});
		if (ua.win32) {
			a.onPointerDown(v, function(N) {
				N.preventDefault()
			})
		}
		i(y.children, function(N) {
			A.push(N)
		});
		y.innerHTML = "";

		function E(N) {
			return B ? (N + A.length) % A.length : N
		}
		function L(O, N) {
			g(O, "width", l(q));
			z && g(O, "margin", "0 " + l(M / 2));
			N && z && g(O, l("margin-left", -M * (F - 1) / 2));
			return O
		}
		function D() {
			var N = t.lay,
				O = -Math.floor((y.zLeft + q / 2) / q);
			t.lay && i(y.children, function(P, R) {
				var Q = (R - (F - 1) / 2);
				!P.zEmpty && N(P, {
					index: Q - O,
					offset: Q * (q + M) + y.zLeft,
					width: q
				})
			})
		}
		function p(N) {
			y.innerHTML = "";

			function O() {
				var P = document.createElement("li");
				P.zEmpty = true;
				return P
			}
			c(y, 0, 0);
			f(F, function(R) {
				var Q = R - (F - 1) / 2 + N,
					P = B && A.length <= 2 ? R === 1 ? A[N] : O() : A[E(Q)] || O();
				y.appendChild(L(P, R === 0))
			});
			D();
			w = N;
			J.trig({
				curIndex: N
			})
		}
		function C(Q) {
			var P = A[E(w + 1)],
				O = y.children[Q > 0 ? 0 : 2],
				N = y.children[Q < 0 ? 0 : 2];
			if (O !== P) {
				y.replaceChild(L(document.createElement("li")), N);
				y.replaceChild(L(P), O)
			}
		}
		function I(O) {
			if (A.length === 1) {
				return
			}
			var P = d(E(w + O), 0, A.length - 1);
			s = true;
			H.trig({
				curIndex: w,
				targetIndex: P
			});
			if (B && A.length === 2) {
				C(-O)
			}
			function N() {
				p(P);
				s = false
			}
			if (t.lay) {
				b({
					start: y.zLeft,
					end: (w - P) * (q + M),
					onAnimate: function(Q) {
						c(y, Q << 0, 0);
						D(q)
					},
					onEnd: N,
					duration: 0.2
				})
			} else {
				o.transition(y, "0.2s", {
					transform: g.translate((B ? -O : (w - P)) * (1 + z) * q, 0, 0)
				}, N)
			}
		}
		a.onDragH(y, function(N) {
			if (r || s || (B && A.length === 1)) {
				return
			}
			G.trig({
				curIndex: w
			});
			N.onDragMove(function(Q) {
				var P = Q.distanceX,
					O = A.length;
				if (!B && ((w === 0 && P > 0) || (w === O - 1 && P < 0))) {
					P = Math.atan(P / x / 2) * x * t.width / 2
				} else {
					if (B && O === 2) {
						C(P)
					}
				}
				c(y, d(P, -x + 2, x - 2) * u, 0);
				D()
			});
			N.onDragEnd(function(P) {
				var Q = P.directionX ? 1 : -1,
					O = P.duration < 200 ? -Q : -Q * (Math.abs(y.zLeft / x + Q * 0.3) > 0.5 ? 1 : 0);
				I(O)
			})
		});
		return n(v, {
			item: function(N) {
				return A[N]
			},
			disable: function(N) {
				r = N
			},
			length: function() {
				return A.length
			},
			addItem: function(N) {
				A.push(N)
			},
			clear: function() {
				w = 0;
				A = []
			},
			curIndex: function() {
				return w
			},
			display: p,
			cutTo: function(N) {
				I(N - w)
			},
			cutRight: function(N) {
				I(N || 1)
			},
			onCutTo: J.regist,
			onSlideStart: G.regist,
			onAnimateStart: H.regist
		})
	}
	zachModule["10"] = j
});
zachModule(function() {
	var k = {};
	var i = {};

	function h(n) {
		return [n[0][0], n[0][1], n[0][2], n[0][3], n[1][0], n[1][1], n[1][2], n[1][3], n[2][0], n[2][1], n[2][2], n[2][3], n[3][0], n[3][1], n[3][2], n[3][3]]
	}
	function d(n) {
		return [n[0][0], n[1][0], n[2][0], n[3][0], n[0][1], n[1][1], n[2][1], n[3][1], n[0][2], n[1][2], n[2][2], n[3][2], n[0][3], n[1][3], n[2][3], n[3][3]]
	}
	function g(n, o) {
		var p = o * 4;
		return [n[p], n[p + 1], n[p + 2], n[p + 3]]
	}
	function l(n, o) {
		return [n[o], n[o + 4], n[o + 8], n[o + 12]]
	}
	function a(o, n) {
		return o[0] * n[0] + o[1] * n[1] + o[2] * n[2] + o[3] * n[3]
	}
	function j(o, n) {
		return [o[1] * n[2] - o[2] * n[1], o[2] * n[0] - o[0] * n[2], o[0] * n[1] - o[1] * n[0], 0]
	}
	function b(n) {
		var o = 1 / Math.sqrt(a(n, n));
		return [n[0] * o, n[1] * o, n[2] * o, n[3] * o]
	}
	function c(n, o) {
		return [a(g(n, 0), o), a(g(n, 1), o), a(g(n, 2), o), a(g(n, 3), o)]
	}
	function m(o, p) {
		return d([c(o, l(p, 0)), c(o, l(p, 1)), c(o, l(p, 2)), c(o, l(p, 3))])
	}
	function f(n) {
		return [n[0], n[4], n[8], n[12], n[1], n[5], n[9], n[13], n[2], n[6], n[10], n[14], n[3], n[7], n[11], n[15]]
	}
	function e(q) {
		var o = q[5] * q[10] - q[6] * q[9];
		var v = q[4] * q[10] - q[6] * q[8];
		var x = q[4] * q[9] - q[5] * q[8];
		var p = q[1] * q[10] - q[2] * q[9];
		var y = q[0] * q[10] - q[2] * q[8];
		var A = q[0] * q[9] - q[1] * q[8];
		var w = q[1] * q[6] - q[2] * q[5];
		var C = q[0] * q[6] - q[2] * q[4];
		var D = q[0] * q[5] - q[1] * q[4];
		var B = q[6] * q[11] - q[7] * q[10];
		var n = q[5] * q[11] - q[7] * q[9];
		var t = q[4] * q[11] - q[7] * q[8];
		var z = 1 / (q[0] * o - q[1] * v + q[2] * x);
		var u = -q[1] * B + q[2] * n - q[3] * o;
		var s = q[0] * B - q[2] * t + q[3] * v;
		var r = -q[0] * n + q[1] * t - q[3] * x;
		return [o * z, -p * z, w * z, u * z, -v * z, y * z, -C * z, s * z, x * z, -A * z, D * z, r * z, 0, 0, 0, 1]
	}
	k.unit = function() {
		return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
	};
	k.translate = function(n, p, o) {
		return [1, 0, 0, n, 0, 1, 0, p, 0, 0, 1, o, 0, 0, 0, 1]
	};
	k.scale = function(n, p, o) {
		return [n, 0, 0, 0, 0, p, 0, 0, 0, 0, o, 0, 0, 0, 0, 1]
	};
	k.rotateX = function(p) {
		var n = Math.sin(p);
		var o = Math.cos(p);
		return [1, 0, 0, 0, 0, o, -n, 0, 0, n, o, 0, 0, 0, 0, 1]
	};
	k.rotateY = function(p) {
		var n = Math.sin(p);
		var o = Math.cos(p);
		return [o, 0, n, 0, 0, 1, 0, 0, -n, 0, o, 0, 0, 0, 0, 1]
	};
	k.rotateZ = function(p) {
		var n = Math.sin(p);
		var o = Math.cos(p);
		return [o, -n, 0, 0, n, o, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
	};
	k.rotateBase = function(p, o, n) {
		return h([p, o, n, [0, 0, 0, 1]])
	};
	k.lookAt = function(o, n, s) {
		var p = b([o[0] - n[0], o[1] - n[1], o[2] - n[2], 0]);
		var r = b(j(s, p));
		var q = b(j(p, r));
		return m(k.rotateBase(r, q, p), k.translate(-o[0], -o[1], -o[2]))
	};
	k.perspectiveProject = function(o, p, r, q) {
		return [2 * r / o, 0, 0, 0, 0, 2 * r / p, 0, 0, 0, 0, -(q + r) / (q - r), -2 * q * r / (q - r), 0, 0, -1, 0]
	};
	i.crystal = function() {
		return {
			vertex: [1, 1, 1, -1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, -1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, -1, 1, 0, 0, 0, 1, 0, 1, 0, 0, -1, -1, -1, 0, -1, 0, 0, 0, -1, 0, 1, 0, -1, -1, -1, 0, 0, -1, -1, 0, 0, 0, 0, 1 - 1, -1, -1, -1, 0, 0, 0, -1, 0],
			index: [0, 2, 3, 1, 3, 2, 4, 6, 7, 5, 7, 6, 8, 10, 11, 9, 11, 10, 12, 14, 15, 13, 15, 14, 16, 18, 19, 17, 19, 18, 20, 22, 23, 21, 23, 22],
			uv: [0.5, 0, 0.5, 1, 0, 0.5, 1, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 1, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 1, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 1, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 1, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 1, 0.5]
		}
	};
	i.diamond = function() {
		return {
			vertex: [-1, 0, 0, 1, 0, 0, 0, 1.73, 0, 0, -1.73, 0],
			index: [2, 0, 1, 1, 0, 3],
			uv: [0, 0.5, 1, 0.5, 0.5, 0, 0.5, 1]
		}
	};
	i.square = function() {
		return {
			vertex: [-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0],
			index: [0, 2, 1, 1, 2, 3],
			uv: [0, 0, 1, 0, 0, 1, 1, 1]
		}
	};
	zachModule["11"].MatrixFromRows = h;
	zachModule["11"].MatrixFromColumns = d;
	zachModule["11"].VectorFromRow = g;
	zachModule["11"].VectorFromColumn = l;
	zachModule["11"].dot = a;
	zachModule["11"].cross = j;
	zachModule["11"].uniform = b;
	zachModule["11"].transform = c;
	zachModule["11"].combine = m;
	zachModule["11"].transpose = f;
	zachModule["11"].inverse = e;
	zachModule["11"].matrix = k;
	zachModule["11"].geometry = i
});
zachModule(function() {
	var a = zachModule["0"],
		b = a.insert;

	function c(e, j, i, k, g, m, l, d, h) {
		var f = [e, j, i, k, g, m, l, d, h];
		f.img = e;
		f.x = m;
		f.y = l;
		f.width = d;
		f.height = h;
		return f
	}
	zachModule["12"].drawImageMeasure = function(f, e, d, g) {
		f.translate(d || 0, g || 0);
		f.drawImage.apply(f, e);
		f.translate(-(d || 0), -(g || 0))
	};
	zachModule["12"].measureCover = function(k, l, i) {
		var e = l / i,
			m = k.naturalWidth || k.width || k.clientWidth,
			p = k.naturalHeight || k.height || k.clientHeight,
			h = m / p,
			g, d, j, f, o = ua.ios && ua.iosVersion < 8;

		function n(q) {
			return o ? q - 1 : q
		}
		if (e < h) {
			d = 0;
			j = p;
			g = (m - j * e) / 2 << 0;
			f = m - 2 * g << 0
		} else {
			g = 0;
			f = m;
			d = (p - f / e) / 2 << 0;
			j = p - 2 * d << 0
		}
		return c(k, g, d, n(f), n(j), 0, 0, l, i)
	};
	zachModule["12"].measureAdjust = function(h, j, g, f) {
		var d = j / g,
			k = h.naturalWidth || h.width || h.clientWidth,
			l = h.naturalHeight || h.height || h.clientHeight,
			e = k / l,
			m, i;
		if (d < e) {
			i = f ? j : Math.min(k, j);
			m = i / e
		} else {
			m = f ? g : Math.min(l, g);
			i = m * e
		}
		return c(h, 0, 0, k, l, (j - i) / 2, (g - m) / 2, i, m)
	};
	zachModule["12"].measureAdjustWidth = function(g, e) {
		var f = g.naturalWidth || g.width || g.clientWidth,
			d = g.naturalHeight || g.height || g.clientHeight,
			h = e / f * d;
		return c(g, 0, 0, f, d, 0, 0, e, h)
	};
	zachModule["12"].sprite = function(d, e) {
		return b(d, {
			part: function(h, g, i, f) {
				return {
					sprite: d,
					ratio: e,
					x: h / e,
					y: g / e,
					width: i / e,
					height: f / e,
					draw: function(k, j, l) {
						return k.drawImage(d, h, g, i, f, j, l, i / e, f / e)
					}
				}
			}
		})
	}
});
zachModule(function() {
	var a = zachModule["0"],
		b = a.is,
		c = a.LinkedList;
	c.loopNodes = function(e, j, i, h) {
		var g, f, k, l, d;
		if (b.Function(j)) {
			g = null;
			f = j;
			k = i
		} else {
			g = j;
			f = i;
			k = h
		}
		for (l = e; l !== g; l = k ? l.previous : l.next) {
			if ((d = f(l.value, l)) !== undefined) {
				return d
			}
		}
	};
	c.toArray = function(e) {
		var d = [];
		c.loop(e, function(f) {
			d.push(f)
		});
		return d
	};
	c.push = function(e, d) {
		return e.insert(c.Node(d), null)
	};
	c.pop = function(e) {
		var d = e.tail();
		e.remove(d);
		return d.value
	};
	c.isBefore = function(e, d) {
		for (; d && d !== e; d = d.next) {}
		return d === null
	};
	zachModule["13"] = c
});
zachModule(function() {
	var f = zachModule["0"],
		d = f.loopObj,
		j = f.loopString;

	function g(l) {
		var k = new Array(128);
		j(l, function(m) {
			k[m] = true
		});
		return function(m) {
			return m < 128 && m >= 0 && k[m] === true
		}
	}
	var b = g("_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"),
		e = g("\t\n "),
		h = {
			"\\": "\\",
			'"': '"',
			"'": "'",
			n: "\n",
			t: "\t",
			b: "\b"
		},
		i = {
			lt: "<",
			gt: ">",
			amp: "&"
		},
		c = function() {
			var k = {};
			d(i, function(m, l) {
				k[l] = m
			});
			return k
		}();

	function a(r) {
		var q = 0,
			m;

		function k() {
			m = r.charAt(q++)
		}
		function l(s) {
			var t = s || "";
			k();
			while (b(m.charCodeAt(0))) {
				t += m;
				k()
			}
			return t
		}
		function o() {
			k();
			var s = "";
			while (m !== '"') {
				if (m === "\\") {
					k();
					s += h[m]
				} else {
					s += m
				}
				k()
			}
			k();
			return s
		}
		function p(t) {
			while (e(m.charCodeAt(0))) {
				k()
			}
			if (m === ">") {
				k();
				t.$type = a.nodeType.startTag;
				return false
			} else {
				if (m === "/") {
					k();
					k();
					t.$type = a.nodeType.object;
					return false
				} else {
					var s = l(m);
					while (e(m.charCodeAt(0)) || m === "=") {
						k()
					}
					t[s] = o();
					return true
				}
			}
		}
		function n() {
			var s = {};
			k();
			if (m === "/") {
				s.$type = a.nodeType.endTag;
				s.$tagName = l();
				k()
			} else {
				s.$tagName = l(m);
				while (p(s)) {}
			}
			return s
		}
		k();
		return {
			read: function() {
				var t = {};
				if (m === "") {
					return null
				} else {
					if (m === "<") {
						t = n()
					} else {
						if (m === "&") {
							k();
							var s = "";
							while (m !== ";") {
								s += m;
								k()
							}
							m = i[s]
						}
						t = {
							$type: a.nodeType.character,
							ch: m
						};
						k()
					}
				}
				return t
			}
		}
	}
	a.encodeString = function(l) {
		var k = "";
		j(l, function(m) {
			var n = c[m];
			k += n ? "&" + n + ";" : m
		}, true);
		return k
	};
	a.nodeType = {
		startTag: 0,
		endTag: 1,
		character: 2,
		object: 3
	};
	zachModule["14"] = a
});
zachModule(function() {
	function a(e) {
		var d = 0,
			c = e.length;
		return {
			eat: function() {
				++d
			},
			cur: function() {
				return e.charAt(d)
			},
			isEnd: function() {
				return d >= c
			}
		}
	}
	function b(c) {
		var d = c.read();
		return {
			eat: function() {
				return d = c.read()
			},
			cur: function() {
				return d
			},
			isEnd: function() {
				return d === null
			}
		}
	}
	zachModule["15"].StringStream = a;
	zachModule["15"].ReaderStream = b
});
zachModule(function() {
	var n = zachModule["0"];
	var d = n.insert;
	var B = n.extract;
	var m = zachModule["13"];
	var G = zachModule["14"];
	var E = {
		START_TAG: G.nodeType.startTag,
		END_TAG: G.nodeType.endTag,
		CHARACTER: G.nodeType.character
	};
	var k = zachModule["15"].ReaderStream;
	var v = document.createElement("canvas").getContext("2d");
	var s = {
		fontFamily: "",
		fontSize: 0,
		fontWeight: "",
		fontVariant: "",
		fontStyle: "",
		textFillStyle: null,
		textStrokeStyle: null,
		marginTop: 0,
		marginBottom: 0,
		lineBackground: null,
		lineHeight: 0,
		lineGap: 0,
		textIndent: 0,
		textBaseline: ""
	};

	function c(I) {
		return [I.fontStyle, I.fontVariant, I.fontWeight, I.fontSize + "px", I.fontFamily].join(" ")
	}
	var D = /^[（【“‘]$/;
	var f = /^[）】”’，。；：？！、]$/;
	var b = /^[0-9a-zA-Z`~!@#\$%\^&\*\(\)\-_=\+\[\{\]\}\\\|:;"'<,>\.\?\/]$/;
	var t = /^[ 	　\n]$/;

	function A() {
		return {
			width: null,
			character: ""
		}
	}
	function o() {
		return {
			clas: null,
			elements: m()
		}
	}
	function H() {
		return {
			width: 0,
			height: 0,
			offsetX: 0,
			offsetY: 0
		}
	}
	function j() {
		return d(H(), {
			elements: m(),
			text: ""
		})
	}
	function C() {
		return d(H(), {
			bricks: m()
		})
	}
	function z() {
		return d(H(), {
			style: null,
			bricks: m(),
			lines: m()
		})
	}
	function a() {
		return {
			content: null,
			block: null
		}
	}
	function F() {
		return d(H(), {
			paragraphs: m()
		})
	}
	function u(K) {
		var L = a();
		var J = o();
		L.content = J;
		J.clas = K.cur()["class"];
		K.eat();
		while (K.cur() !== null) {
			if (K.cur().$type === E.CHARACTER) {
				var I = A();
				I.character = K.cur().ch;
				m.push(J.elements, I);
				K.eat()
			} else {
				if (K.cur().$type === E.END_TAG && K.cur().$tagName === "p") {
					K.eat();
					break
				} else {
					throw new Error("unexpected tag")
				}
			}
		}
		return L
	}
	function h(J) {
		var I = F();
		while (J.cur() !== null) {
			if (J.cur().$type === E.START_TAG && J.cur().$tagName === "p") {
				var K = u(J);
				m.push(I.paragraphs, K)
			} else {
				if (J.cur().$type == E.CHARACTER && t.test(J.cur().ch)) {
					J.eat()
				} else {
					break
				}
			}
		}
		return I
	}
	function q(I) {
		return u(k(G(I)))
	}
	function y(I) {
		return h(k(G(I)))
	}
	function g(I, P) {
		var N = P.content;
		var O = z();
		P.block = O;
		var M = B(I[N.clas] || {}, s);
		O.style = M;
		v.font = c(M);
		var J = null;
		var L = N.elements.head();
		while (L !== null) {
			var K = L.value;
			if (J === null) {
				J = j();
				m.push(O.bricks, J)
			}
			m.push(J.elements, K);
			K.width = K.width === null ? v.measureText(K.character).width : K.width;
			J.width += K.width;
			J.text += t.test(K.character) ? "" : K.character;
			if (L.next === null || !(D.test(K.character) && !t.test(L.next.value.character) || f.test(L.next.value.character) && !t.test(K.character) || b.test(K.character) && b.test(L.next.value.character) || t.test(K.character) && t.test(L.next.value.character))) {
				J = null
			}
			L = L.next
		}
	}
	function e(N, J) {
		var K = N.block;
		var I = K.style;
		var M = I.textIndent;
		var L = C();
		m.push(K.lines, L);
		m.loop(K.bricks, function(O) {
			if (M + O.width > J && L.bricks.head() !== null && O.text !== "") {
				M = 0;
				L = C();
				m.push(K.lines, L)
			}
			m.push(L.bricks, O);
			M += O.width
		});
		K.height = 0;
		m.loop(K.lines, function(O) {
			O.height = I.lineHeight + I.lineGap;
			O.offsetY = K.height + I.lineHeight;
			K.height += O.height;
			m.loop(O.bricks, function(P) {
				P.offsetY = O.offsetY
			})
		})
	}
	function i(L, J) {
		var K = L.block;
		var I = K.style;
		K.width = J;
		m.loop(K.lines, function(P, R) {
			var N = 0;
			var O = 0;
			m.loop(P.bricks, function(U) {
				N += U.width;
				O++
			});
			if (R.next !== null) {
				var Q = P.bricks.tail();
				while (Q.value.text === "") {
					N -= Q.value.width;
					O--;
					Q = Q.previous
				}
			}
			P.width = R.next !== null ? R.previous !== null ? J : J - I.textIndent : N;
			P.offsetX = R.previous === null ? I.textIndent : 0;
			var S = O > 1 ? (P.width - N) / (O - 1) : 0;
			var M = P.offsetX;
			var T = 0;
			m.loop(P.bricks, function(U) {
				U.offsetX = M + (S * Math.min(T, O - 1) + 0.5) << 0;
				M += U.width;
				T++
			})
		})
	}
	function p(I) {
		I.width = 0;
		I.height = 0;
		m.loop(I.paragraphs, function(L) {
			var K = L.block;
			var J = K.style;
			I.width = Math.max(I.width, K.width);
			I.height += J.marginTop;
			K.offsetY = I.height;
			I.height += K.height;
			I.height += J.marginBottom
		})
	}
	function w(I, K, J) {
		g(I, K);
		e(K, J);
		i(K, J);
		return K
	}
	function r(I, K, J) {
		m.loop(K.paragraphs, function(L) {
			w(I, L, J)
		});
		p(K);
		return K
	}
	function l(J, L) {
		var K = L.block;
		var I = K.style;
		J.textBaseline = I.textBaseline;
		m.loop(K.lines, function(M) {
			if (I.lineBackground !== null) {
				J.fillStyle = I.lineBackground;
				J.fillRect(M.offsetX, M.offsetY - M.height + I.lineGap, M.width, M.height)
			}
			m.loop(M.bricks, function(N) {
				J.font = c(I);
				if (I.textFillStyle !== null) {
					J.fillStyle = I.textFillStyle;
					J.fillText(N.text, N.offsetX, N.offsetY)
				}
				if (I.textStrokeStyle !== null) {
					J.strokeStyle = I.textStrokeStyle;
					J.strokeText(N.text, N.offsetX, N.offsetY)
				}
			})
		})
	}
	function x(I, J) {
		m.loop(J.paragraphs, function(L) {
			var K = L.block;
			I.save();
			I.translate(K.offsetX, K.offsetY);
			l(I, L);
			I.restore()
		})
	}
	zachModule["16"].DEFAULT_STYLE = s;
	zachModule["16"].style2font = c;
	zachModule["16"].Element = A;
	zachModule["16"].Content = o;
	zachModule["16"].Position = H;
	zachModule["16"].Brick = j;
	zachModule["16"].Line = C;
	zachModule["16"].Block = z;
	zachModule["16"].Paragraph = a;
	zachModule["16"].Text = F;
	zachModule["16"].parseParagraphStream = u;
	zachModule["16"].parseTextStream = h;
	zachModule["16"].parseParagraph = q;
	zachModule["16"].parseText = y;
	zachModule["16"].buildParagraph = g;
	zachModule["16"].flowParagraph = e;
	zachModule["16"].alignParagraph = i;
	zachModule["16"].flowText = p;
	zachModule["16"].measureParagraph = w;
	zachModule["16"].measureText = r;
	zachModule["16"].drawParagraph = l;
	zachModule["16"].drawText = x
});
(function() {
	var i = zachModule["0"],
		l = i.loopArray,
		g = i.extract,
		p = i.insert,
		o = i.Event,
		f = zachModule["2"],
		h = f.element,
		k = zachModule["5"],
		c = k.KeyValueFunction,
		b = zachModule["6"],
		j = window.fp = window.fp || {},
		a = window.specialPage = {},
		n = window.layoutFormat = {},
		m = window.functionPages = {},
		e = window.enterAnimate = {},
		d = window.switchAnimates = [];
	window.staticImgSrc = function(q) {
		return contentSrc("image/" + q)
	};
	window.componentAttr = function(q) {
		return g(q, {
			x: 0,
			y: 0,
			opacity: 1,
			scale: 1,
			rotate: 0,
			"z-index": 0
		})
	};
	window.center = function(r, q) {
		return (r - q) / 2 << 0
	};
	window.middleY = function(r, q) {
		return (r - idealHeight / 2) * (q || 1) + clientHeight / 2 << 0
	};
	window.middleX = function(q, r) {
		return (q - idealWidth / 2) * (r || 1) + clientWidth / 2 << 0
	};
	window.registLayout = c(function(q, r) {
		n[q] = r
	});
	window.registEnterAnimate = c(function(q, s) {
		var r = s.onAnimate,
			t = r && !window.highPerformance ? s.fallback : undefined;
		e[q] = t ||
		function(v) {
			var u = s.progress ? s.progress.apply(null, [v].concat(Array.prototype.slice.call(arguments, 1))) : undefined;
			return {
				component: v,
				duration: s.duration || 1,
				timing: s.timing || b.Timing.ease,
				progress: u,
				onAnimate: s.onAnimate
			}
		}
	});
	window.registSwitchAnimate = c(function(q, r) {
		d.push(r);
		d[q] = r
	});
	window.registFunctionPage = function(r, q) {
		return m[r] = function(s) {
			function t() {
				var u = j.slidePage();
				q(u, s.data);
				u.slideIn(s.noTransition)
			}
			if (s.noLog || j.isLogIn()) {
				t()
			} else {
				if (!j.canNotLogin) {
					sessionStorage.setItem("lastPageIndex", curPageIndex);
					sessionStorage.setItem("functionData", JSON.stringify({
						name: r,
						data: s.data
					}));
					j.logIn({
						returnUrl: location.href,
						onLogIn: t
					})
				} else {
					j.canNotLogin()
				}
			}
		}
	};
	window.registSpecialPage = c(function(q, r) {
		a[q] = function() {
			var s = {
				type: "special",
				load: function(t) {
					r(function(u) {
						s.create = function() {
							var w = h("div.special-page.page"),
								v = o(),
								x = o();
							p(w, {
								start: v.trig,
								recycle: x.trig,
								onShow: v.regist,
								onRemove: x.regist
							});
							u.create(w);
							return w
						};
						t()
					})
				}
			};
			return s
		}
	});
	window.LayoutPage = function(q) {
		var r = q.layout,
			t = n[r.label] || n.SingleImage,
			s = (t.resource || []).concat([]),
			u = r.image || [];
		return {
			pageData: q,
			create: function(v) {
				t.create(v, r);
				return v
			},
			load: function(x) {
				var w = i.Loader();
				w.onLoad(function() {
					p(r, {
						resource: s,
						image: u
					});
					x()
				});

				function v(z, y) {
					l(z, function(B, A) {
						w.load(function(C) {
							var D = z[A] = new Image();
							if (t.crossOrigin) {
								D.crossOrigin = "*"
							}
							D.onload = function() {
								D.halfWidth = (D.naturalWidth || D.width) / 2 << 0;
								D.halfHeight = (D.naturalHeight || D.height) / 2 << 0;
								D.onload = null;
								C()
							};
							D.onerror = function() {
								D.src = staticImgSrc("firstPage-404.jpg")
							};
							D.src = y ? y(B) : B
						})
					})
				}
				v(u);
				v(s, staticImgSrc);
				w.start()
			}
		}
	}
})();
(function() {
	var a = zachModule["0"],
		d = a.loopObj,
		b = a.insert,
		v = a.Event,
		p = zachModule["2"],
		o = p.removeNode,
		c = p.element,
		k = p.bubble,
		i = p.toggleState,
		q = p.transition,
		r = p.onTransitionEnd,
		m = zachModule["4"],
		h = m.onPointerDown;

	function t(x, w) {
		p.switchClass(w || document.documentElement, x, "lock")
	}
	function f(w) {
		sessionStorage.setItem("lastPageIndex", curPageIndex);
		location.href = w
	}
	function n(A, z) {
		var w = document.body;
		if (A) {
			A.classList.add("event-all");
			k(A, function(B) {
				B.classList.add("event-target")
			});
			w.classList.add("event-mask");
			fp.history.pushAction(function() {
				A.classList.remove("event-all");
				k(A, function(B) {
					B.classList.remove("event-target")
				});
				w.classList.remove("event-mask");
				y.remove();
				z && z()
			});
			var y = h(document, function(B) {
				if (!A.contains(B.target)) {
					B.preventDefault();
					fp.history.back()
				}
			})
		} else {
			var x = c("div.body-mask", w);
			fp.history.pushAction(function() {
				o(x);
				z && z()
			});
			h(x, function(B) {
				B.preventDefault();
				B.stopPropagation();
				fp.history.back()
			})
		}
	}
	var s = function() {
			var w = JSON.parse(localStorage.getItem("cookie") || "{}");
			d(w, function(y, z) {
				if (z.expires < new Date()) {
					delete w[y]
				}
			});

			function x() {
				localStorage.setItem("cookie", JSON.stringify(w))
			}
			x();
			return {
				getItem: function(y) {
					return w[y] ? w[y].value : null
				},
				setItem: function(y, A, z) {
					w[y] = {
						value: A,
						expires: (new Date()).getTime() + z * 1000
					};
					x()
				},
				expires: function(y, z) {
					if (w[y]) {
						w[y].expires = (new Date()).getTime() + z * 1000;
						x()
					}
				},
				remove: function(y) {
					delete w[y];
					x()
				}
			}
		}();
	var j = function() {
			var w = [],
				x = false;
			setTimeout(function() {
				p.bindEvent(window, "popstate", function() {
					if (w.length !== 0) {
						var y = w.top;
						w.pop();
						y.onPop(y.actionEnd);
						if (w.length > 1) {
							history.pushState(null, "", location.href)
						} else {
							x = false
						}
					}
				})
			}, 0);
			return {
				pushAction: function(z) {
					var y = v();
					w.push({
						onPop: z,
						actionEnd: y.trig
					});
					if (!x) {
						x = true;
						history.pushState(null, "", location.href)
					}
					return y.regist
				},
				back: function() {
					history.back()
				}
			}
		}();
	var g = function() {
			var w;
			return function(y, x) {
				if (!w) {
					w = c("img.loading", {
						src: staticImgSrc("firstPage-loading.gif")
					})
				}
				if (!y) {
					t(true);
					document.body.appendChild(w);
					return {
						remove: function() {
							t(false);
							o(w)
						}
					}
				} else {
					var A = x ? null : y.appendChild(w.cloneNode(true)),
						z = null;
					x && (z = setTimeout(function() {
						A = y.appendChild(w.cloneNode(true))
					}, x));
					return {
						remove: function() {
							z && clearTimeout(z);
							o(A)
						}
					}
				}
			}
		}();
	var e = function() {
			var w, x;
			return function(C, z) {
				if (!w) {
					w = c("div.msg-box", document.body);
					x = c("div.msg", w)
				}
				x.innerHTML = C;
				i(w, "remove", "show");

				function B() {
					i(w, "show", "remove");
					A.remove();
					clearTimeout(y)
				}
				var A = h(document, B),
					y = setTimeout(B, z || 2000)
			}
		}();
	var u = function() {
			var w = c("div.slide-page"),
				y = v(),
				x = v();
			h(w, function(z) {
				z.stopPropagation()
			});
			return b(w, {
				onSlideIn: y.regist,
				onSlideOut: x.regist,
				isIn: function() {
					return w.classList.contains("slide-in")
				},
				slideIn: function(z) {
					body.appendChild(w);
					if (z) {
						z && w.classList.add("no-transition");
						w.classList.add("slide-in");
						y.trig()
					} else {
						fp.lock(true);
						setTimeout(function() {
							w.classList.add("slide-in");
							r(w, function() {
								fp.lock(false);
								y.trig()
							})
						}, 10)
					}
					fp.history.pushAction(function() {
						fp.lock(true);
						x.trig();
						w.classList.remove("no-transition");
						w.classList.remove("slide-in");
						r(w, function() {
							fp.lock(false);
							o(w)
						})
					})
				}
			})
		};

	function l(x, w) {
		var y = sessionStorage.getItem(x);
		sessionStorage.removeItem(x);
		return y === null ? w : y
	}
	b(fp, {
		lock: t,
		jump: f,
		preventEvent: n,
		cookie: s,
		history: j,
		Loading: g,
		alert: e,
		slidePage: u,
		getSessionData: l
	})
})();
(function() {
	var b = zachModule["0"],
		a = b.Event,
		e = zachModule["7"],
		h = zachModule["2"],
		d = h.element,
		g = zachModule["4"],
		f = g.onPointerDown,
		c = g.onTap;
	fp.runSystem = function() {
		if (ua.ios) {
			document.documentElement.classList.add("ios")
		}
		if (ua.win32) {
			document.documentElement.classList.add("win32")
		}
		ua.chuye = /chuye/gi.test(navigator.userAgent);
		f(document, function(j) {
			var i = true;
			h.bubble(j.target, function(k) {
				if (k.classList.contains("need-default")) {
					i = false
				}
			});
			i && j.preventDefault()
		});
		window.body = d("div.body", document.body);
		window.onSystemPrepare && window.onSystemPrepare(function(n) {
			var k = n.pages,
				l = window.pageNumber = k.length,
				j = fp.getSessionData("functionData"),
				o = e(),
				i = new Array(l),
				m = {};
			window.color = n.color;
			i.data = n;
			if (j) {
				j = JSON.parse(j);
				functionPages[j.name]({
					data: j.data,
					noTransition: true
				})
			}
			window.getIndex = function(p) {
				return (p + l) % l
			};
			m.loadPage = function() {
				var q = [];

				function p(r, w, t) {
					function v() {
						p(r - 1, w - 1);
						p(r + 1, w - 1)
					}
					if (r >= 0 && w) {
						r = getIndex(r);
						var u = q[r];
						if (u !== true) {
							if (u === undefined) {
								var x = k[r],
									s = i[r] = x.special ? specialPage[x.special]() : LayoutPage(x);
								u = q[r] = a();
								s.load(function() {
									s.isLoad = true;
									u.trig();
									q[r] = true;
									delete s.load;
									v()
								})
							} else {
								v()
							}
							t && u.regist(t)
						} else {
							t && t();
							v()
						}
					}
				}
				p(window.curPageIndex = parseInt(fp.getSessionData("lastPageIndex", "0"), 10), 2);
				return function(s, t) {
					var r = b.Loader();
					b.loopArray([].concat(s), function(u) {
						r.load(function(v) {
							p(u, 3, v)
						})
					});
					r.start(t)
				}
			}();
			m.startShow = function() {
				o.remove();
				(function() {
					if (!window.noMusic && n.music && n.music.src) {
						var r = d("<audio loop></audio>", {
							src: n.music.src
						}, document.body),
							p = d("div.music-icon.play", body);

						function s() {
							if (p.classList.contains("play")) {
								r.play()
							}
						}
						setTimeout(s, 0);
						var q = f(document, function() {
							s();
							q.remove()
						});
						c(p, function() {
							if (p.classList.contains("play")) {
								p.classList.remove("play");
								r.pause()
							} else {
								p.classList.add("play");
								r.play()
							}
						})
					}
				})()
			};
			window.getPageInfo = function(p) {
				var q = i[getIndex(p)];
				return q && q.isLoad ? q : null
			};
			window.jumpPage = function() {
				var p = null;
				return function(q) {
					fp.lock(false);
					p && p.remove();
					var r = getIndex(q),
						s = getPageInfo(r);
					if (!s) {
						fp.lock(true);
						p = m.loadPage(r, function() {
							jumpPage(r)
						})
					} else {
						fp.jumpPage(r);
						window.curPageIndex = r
					}
				}
			}();
			(window.highPerformance ? CanvasSystem : DOMSystem)(i, m);
			window.onFirstPageLoad && window.onFirstPageLoad()
		})
	}
})();
(function() {
	if (window.debug) {
		return
	}
	var b = zachModule["0"],
		d = b.is,
		f = b.extend,
		e = zachModule["2"],
		c;

	function a(g) {
		return e.ajax({
			method: "post",
			url: b.concatUrlArg("http://c.cloud7.com.cn" + g.url, c ? {
				_token: c
			} : {}),
			data: d.String(g.data) ? g.data : b.encodeURIObject(g.data),
			requestHeader: f({
				"Content-Type": "application/x-www-form-urlencoded"
			}, g.requestHeader || {}),
			isJson: true,
			onLoad: function(h) {
				if (h.code === 302) {
					g.on302 && g.on302(h.data)
				} else {
					g.success(h.data)
				}
			}
		})
	}(function() {
		var h = null;
		if (!ua.MicroMessenger) {
			fp.canNotLogin = function() {
				fp.alert("请在微信中使用")
			};
			fp.isLogIn = function() {
				return false
			}
		} else {
			if (c = location.href.arg._token) {
				fp.cookie.setItem("token", c, 7 * 24 * 60 * 60);
				fp.getUserInfo = function(j) {
					if (h) {
						j(h)
					} else {
						a({
							url: "/api/Wechat/CurrentUser",
							success: function(k) {
								j(h = k.data)
							}
						})
					}
				};
				fp.isLogIn = function() {
					return true
				}
			} else {
				c = fp.cookie.getItem("token");
				fp.getUserInfo = function(j) {
					j(h)
				};
				fp.isLogIn = function() {
					return h !== null
				};
				if (c) {
					var g = null,
						i = null;
					a({
						url: "/api/Wechat/CurrentUser",
						on302: function(j) {
							g && g(j);
							fp.logIn = function() {
								a({
									url: "/api/Wechat/CurrentUser",
									on302: fp.jump
								})
							}
						},
						success: function(j) {
							h = j.data;
							i && i()
						}
					});
					fp.logIn = function(j) {
						if (h) {
							j.onLogIn()
						} else {
							g = fp.jump;
							i = j.onLogIn
						}
					}
				} else {
					fp.logIn = function() {
						location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9d492ee399e6a24c&redirect_uri=" + encodeURIComponent("http://c.cloud7.com.cn/Auth?returnUrl=" + encodeURIComponent(location.href)) + "&response_type=code&scope=snsapi_base&state=#wechat_redirect"
					}
				}
			}
		}
		return c
	}());
	fp.getCommentSummary = function(h, g) {
		a({
			url: "/api/Blog/SaveContentSummary",
			data: g,
			success: function(i) {
				h(i)
			}
		})
	};
	fp.getCommentCount = function(h) {
		var g = fp.getWorkInfo();
		a({
			url: "/api/Blog/GetCommentCounts",
			data: {
				Site: g.Site,
				ContentID: g.ContentID
			},
			success: function(i) {
				h(i[1])
			}
		})
	};
	fp.getComments = function(h, g) {
		a({
			url: "/api/blog/GetCommentWall",
			data: {
				ContentSummaryID: g.contentSummaryId
			},
			success: function(j) {
				var i = [];
				b.loopArray(j, function(k) {
					i.push({
						text: k.Text,
						userName: k.NickName,
						avatar: k.HeadPhoto || staticImgSrc("firstPage-defaultAvatar.png"),
						date: new Date(k.Time)
					})
				});
				h(i)
			}
		})
	};
	fp.saveComment = function(h, g) {
		a({
			url: "/api/blog/SaveTextComment",
			data: {
				ContentSummaryID: g.contentSummaryId,
				Text: g.text
			},
			success: h
		})
	}
})();
(function() {
	var b = zachModule["0"],
		c = zachModule["1"],
		e = c.ajax,
		f = window.dataForWeixin = {};

	function a() {
		return window.workDetailUrl.split("/").top
	}
	fp.getWorkInfo = function() {
		return {
			Site: "chuye.cloud7.com.cn",
			ContentID: a(),
			Url: location.href,
			Thumbnail: f.picture,
			Title: f.title,
			Text: f.desc
		}
	};
	fp.trackPageView = function() {
		!ua.chuye && e({
			url: virtualPath + "/work/count/" + a()
		})
	};
	fp.sendForm = function(h, g) {
		e({
			url: virtualPath + "/Integra/SaveData",
			method: "post",
			requestHeader: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: b.encodeURIObject({
				formid: g.id,
				data: JSON.stringify(g.data)
			}),
			onLoad: h
		})
	};
	window.contentSrc = function(g) {
		return ((contentPath || virtualPath) + "/Content/" + g).toLowerCase()
	};

	function d() {
		var g = new XMLHttpRequest();
		g.open("post", virtualPath + "/Work/Share", true);
		g.send(null)
	}
	document.addEventListener("WeixinJSBridgeReady", function() {
		var g = window.WeixinJSBridge;
		g.call("showOptionMenu");
		g.on("menu:share:appmessage", function() {
			g.invoke("sendAppMessage", {
				appid: f.appId,
				img_url: f.picture,
				img_width: "120",
				img_height: "120",
				link: f.url,
				desc: f.desc,
				title: f.title
			}, d)
		});
		g.on("menu:share:timeline", function() {
			g.invoke("shareTimeline", {
				img_url: f.picture,
				img_width: "120",
				img_height: "120",
				link: f.url,
				desc: f.desc,
				title: f.title
			}, d)
		});
		g.on("menu:share:weibo", function() {
			g.invoke("shareWeibo", {
				content: f.title + " " + f.url,
				url: f.url
			}, d)
		});
		g.on("menu:share:facebook", function() {
			g.invoke("shareFB", {
				img_url: f.picture,
				img_width: "120",
				img_height: "120",
				link: f.url,
				desc: f.desc,
				title: f.title
			}, d)
		})
	}, false);
	if (ua.ios || ua.win32 || /chuye/gi.test(navigator.userAgent)) {
		window.highPerformance = true
	}
	window.onSystemPrepare = function(g) {
		e({
			url: workDetailUrl + "?" + b.encodeURIObject({
				isPreview: ua.chuye
			}),
			isJson: true,
			onLoad: function(k) {
				if (k.code !== 200) {
					document.documentElement.classList.add("work-404");
					return
				}
				k = k.data;
				var l = location.origin + location.pathname;
				if (k) {
					f = {
						picture: k.thumbnail,
						title: k.title,
						url: l,
						desc: k.description || ""
					};
					var m = k.userworks,
						j = m.works,
						h = k.pages,
						i = {
							layout: {
								label: "copyright",
								author: k.author,
								image: [k.headimgurl, j[0].thumbnail, j[1].thumbnail, j[2].thumbnail],
								title: m.title,
								works: j,
								commentCount: 0
							}
						};
					k.praise && h.push({
						special: "comment"
					});
					k.copyright && h.push(i);
					g({
						mode: k.mode || "push",
						color: {
							background: k.backgroud.color
						},
						pageSwitch: k.pageSwitch || {
							animateId: "push"
						},
						music: k.music,
						pages: h
					})
				}
				window.onDataLoad && window.onDataLoad(k)
			}
		})
	}
})();
(function() {
	var i = zachModule["0"],
		k = i.extend,
		b = zachModule["6"],
		g = zachModule["2"],
		h = g.element,
		j = g.css,
		d = g.removeNode,
		a = zachModule["4"],
		e = a.onTap,
		f = window.CanvasMode = window.CanvasMode || {};

	function c(n, m) {
		var o = e(n, function() {
			o.remove();
			m()
		});
		return o
	}
	function l(n) {
		var m = n && n.pageSwitch ? n.pageSwitch.animateId : null;
		return m ? switchAnimates[m === "random" ? Math.random() * switchAnimates.length << 0 : m] : m
	}
	window.prepareSnapshot = function(p, q, n, o) {
		var m = window.body;
		p && m.appendChild(p);
		q && m.appendChild(q);
		d(n);
		j(m, o);
		return function() {
			d(p);
			d(q);
			m.appendChild(n);
			g.removeCss(m, o)
		}
	};
	f.click = function(s, q) {
		var u = window.curPageIndex,
			t = s.data,
			v = window.body,
			n = q.canvas,
			r = q.makePage,
			o = q.setPage,
			p = q.removeCurrentPage,
			w = u === 0 ? h("div#tap-tips.hide.switch-tips", {
				children: [h("div.gray-circle"), h("div.red-circle")]
			}, v) : null;
		window.inClickMode = true;

		function x(z) {
			var y = r(z);
			e(y.background || y, function() {
				if (!y.runNextFrame || !y.runNextFrame()) {
					m(y, curPageIndex + 1)
				}
			});
			if (w) {
				y.onEnterEnd && y.onEnterEnd(function() {
					w && g.toggleState(w, "hide", "show")
				})
			}
			fp.trackPageView();
			return y
		}
		function m(y, z) {
			window.curPageIndex = getIndex(z);
			var A = fp.Loading();
			q.loadPage(curPageIndex, function() {
				var B = s[getIndex(z)];
				A.remove();
				var G = x(B),
					F = y.nodeName || B.type ? switchAnimates["fade-dom"] : l(B.pageData) || l(t) || switchAnimates.push,
					I = F(PageLayer(y), PageLayer(G), n),
					H;
				p();

				function D() {
					I.onEnd && I.onEnd();
					H.remove();
					o(G)
				}
				if (I.onDraw) {
					var E = b.Progress(I);
					H = c(n, function() {
						E.progress(1)
					});
					n.root = {
						draw: function(J) {
							I.onDraw(J, E.ratio());
							if (E.isEnd()) {
								D()
							} else {
								n.dirty()
							}
						}
					};
					I.onStart && I.onStart()
				} else {
					var C = b(k(I, {
						onEnd: function() {
							v.appendChild(n);
							D()
						}
					}), n.requestAnimate);
					d(n);
					H = c(v, function() {
						C && C.progress(1)
					})
				}
				n.dirty()
			})
		}
		q.loadPage(u, function() {
			var y = s[u];
			q.startShow();
			c(v, function() {
				d(w);
				w = null
			});
			o(x(y))
		});
		fp.jumpPage = function(y) {
			p();
			o(x(s[y]))
		}
	}
})();
(function() {
	var g = zachModule["0"],
		j = g.loopArray,
		k = zachModule["3"],
		b = zachModule["6"],
		e = zachModule["2"],
		h = e.css,
		c = e.removeNode,
		i = e.toggleState,
		f = e.element,
		a = zachModule["4"],
		d = window.CanvasMode = window.CanvasMode || {};
	d.push = function(m, r) {
		var q = window.curPageIndex,
			l = window.body,
			p = r.canvas,
			o = r.makePage,
			n = r.setPage,
			s = r.removeCurrentPage;
		r.loadPage(q === 0 ? [0, 1] : q, function() {
			var t = q === 0 ? f("div#slide-tips.switch-tips", l) : null,
				u = false;
			f("div.slide-arrow.switch-tips", l);
			f("div.loading-next-page-tips", l);
			if (q !== 0) {
				i(document.body, "can-not-push", "can-push")
			}
			r.startShow();
			fp.trackPageView();
			n(o(m[q]));
			a.onDragV(l, function(v) {
				if (t) {
					c(t);
					t = null
				}
				var C = curPageIndex === 0 && !u ? null : getPageInfo(curPageIndex - 1),
					A = getPageInfo(curPageIndex + 1);
				if (v.directionY === false && !A || v.directionY === true && !C) {
					return
				}
				h(r.canvas, "display", "none");
				s();
				i(document.body, "can-push", "can-not-push");
				document.body.classList.remove("loading-next-page");

				function G(I, H) {
					return I || H ? h(l.appendChild(PageLayer(H || o(I))), "z-index", 5 + Math.abs(I ? 1 : 0)) : null
				}
				var w = G(C),
					y = G(null, r.curPage()),
					x = G(A),
					F = 0,
					B = !x ? 0 : -clientHeight,
					D = !w ? 0 : clientHeight,
					E = 0;

				function z(H) {
					F = H;
					var I = Math.abs(F / clientHeight / 2);
					h.transform(y, h.translate(0, F / 4, 0), h.scale(1 - I));
					w && h.transform(w, h.translate(0, F - clientHeight, 0));
					x && h.transform(x, h.translate(0, F + clientHeight, 0))
				}
				z(0);
				v.onDragMove(function(H) {
					++E;
					z(k.range(H.distanceY, B, D))
				});
				v.onDragEnd(function(M) {
					c(r.canvas);
					e.removeCss(r.canvas, "display");
					fp.lock(true);
					var K = F / clientHeight + (M.speedY > 0 ? 0.5 : -0.5),
						J = k.range(M.duration < 300 || E < 3 ? M.distanceY < 0 ? -1 : 1 : K <= -0.5 ? -1 : K <= 0.5 ? 0 : 1, B / clientHeight, D / clientHeight),
						N = F,
						I = J * clientHeight,
						H = m[window.curPageIndex = getIndex(curPageIndex - J)],
						L = null;
					if (!H.type) {
						p.root = L = o(H);
						p.dirty()
					}
					if (J !== 0) {
						fp.trackPageView()
					}
					b({
						duration: 0.4,
						onAnimate: function(O) {
							z(b.fromTo(N, I, O))
						},
						onEnd: function() {
							j([w, y, x], c);
							n(L || o(H));
							if (curPageIndex === pageNumber - 1) {
								u = true
							}
							document.body.classList.add("loading-next-page");
							r.loadPage(curPageIndex + 1, function() {
								document.body.classList.remove("loading-next-page");
								i(document.body, "can-not-push", "can-push")
							});
							fp.lock(false)
						}
					})
				})
			})
		});
		fp.jumpPage = function(t) {
			s();
			n(o(m[t]))
		}
	}
})();
(function() {
	var a = zachModule["0"],
		j = a.loopArray,
		d = a.loopObj,
		b = a.insert,
		p = a.extend,
		r = a.Event,
		c = a.LinkedList,
		e = zachModule["3"],
		k = e.range,
		f = zachModule["6"],
		i = f.Timing,
		o = zachModule["2"],
		g = o.css,
		n = o.removeNode,
		l = zachModule["9"],
		m = zachModule["4"],
		q = m.onTap;

	function h() {
		function y() {
			var E = l.Area(),
				D = [],
				F = [];
			E.draw = function(G) {
				G.save();
				if (E.drawSelf) {
					E.opacity = k(E.opacity, 0, 1);
					E.scale = Math.max(E.scale, 0);
					if (E.opacity !== 1) {
						G.globalAlpha = E.opacity
					}
					if (E.scale !== 1 || E.rotate !== 0) {
						G.translate(E.componentWidth / 2 << 0, E.componentHeight / 2 << 0);
						G.scale(E.scale, E.scale);
						G.rotate(E.rotate);
						G.translate(-E.componentWidth / 2 << 0, -E.componentHeight / 2 << 0)
					}
					E.drawSelf(G)
				}
				F = [];
				j(D.sort(function(H, I) {
					return H["z-index"] < I["z-index"] ? -1 : H["z-index"] === I["z-index"] ? 0 : 1
				}), function(H) {
					if (H.visible) {
						G.save();
						G.translate(H.x, H.y);
						H.draw(G);
						F.push(H);
						G.restore()
					}
				});
				G.restore()
			};
			E.areaFromPoint = function(G, H) {
				return j(a.array.reverse(F), function(I) {
					if (!I.cursorThrough && e.inRect(G, H, I.x, I.y, I.componentWidth, I.componentHeight)) {
						return I
					}
				})
			};
			return b(E, {
				component: function(I) {
					var H = I.content,
						G = y();
					if (I.onClick) {
						G.cursorThrough = false;
						q(G, I.onClick)
					} else {
						G.cursorThrough = true
					}
					d(p(componentAttr(I), {
						visible: true
					}), function(J, K) {
						a.defineAutoProperty(G, J, {
							value: K,
							set: G.dirty
						})
					});
					D.push(G);
					return b(G, {
						componentWidth: H.width,
						componentHeight: H.height,
						drawSelf: H.draw,
						transition: function(J) {
							return x({
								component: G,
								delay: J.delay,
								duration: J.duration,
								timing: J.timing,
								onEnd: J.onEnd,
								progress: {
									0: J.start,
									100: J.end
								}
							})
						},
						infiniteAnimate: function(J) {
							return x(p(J, {
								component: G
							}), true)
						},
						remove: function() {
							G.visible = false;
							G.dirty()
						}
					})
				}
			})
		}
		var B = y(),
			s = c(),
			C = null,
			w = r(),
			z = r(),
			A = r(),
			t = null;

		function x(N, L) {
			var F = N.component,
				I = N.baseStyle || componentAttr(F),
				J = N.duration,
				E = N.timing || i.ease,
				O = [],
				K;
			if (N.progress) {
				d(N.progress, function(Q, P) {
					O.push({
						time: J * parseInt(Q, 10) / 100,
						style: p(I, P || {})
					})
				});
				if (O[0].time !== 0) {
					O.unshift({
						time: 0,
						style: I
					})
				}
				if (O.top.time !== J) {
					O.push({
						time: J,
						style: I
					})
				}
			}
			function G(P) {
				return f({
					delay: N.delay,
					duration: J,
					timing: i.linear,
					onStart: N.onStart,
					onAnimate: function(Q) {
						if (N.progress) {
							var U = J * Q,
								T = null;
							if (Q === 1) {
								T = O.length - 1
							} else {
								j(O, function(X, W) {
									if (T === null && U < X.time) {
										T = W
									}
								})
							}
							var V = O[T - 1],
								R = O[T],
								S = E((U - V.time) / (R.time - V.time));
							d(V.style, function(W) {
								F[W] = f.fromTo(V.style[W], R.style[W], S)
							})
						} else {
							N.onAnimate(F, Q, I)
						}
						B.dirty()
					},
					onEnd: P
				})
			}
			if (!L) {
				var H = s.insert(c.Node(G(function() {
					N.onEnd && N.onEnd();
					s.remove(H)
				})), null);
				K = function() {
					s.remove(H);
					H.value.remove()
				}
			} else {
				var M = G(function D() {
					M = G(D)
				});
				z.regist(K = function() {
					M.remove()
				})
			}
			return {
				remove: K
			}
		}
		function v(D) {
			j(D, function(E) {
				x(E)
			})
		}
		function u(F, D) {
			var E = F.length;
			j(F, function(G) {
				G.onEnd = function() {
					G.onEnter && G.onEnter();
					if (--E === 0) {
						D && D()
					}
				}
			})
		}
		return b(B, {
			recycle: function() {
				c.loop(s, function(E, D) {
					E.remove();
					s.remove(D)
				});
				z.trig()
			},
			registEnterAnimation: function(D) {
				if (D.length === 0) {
					return
				}
				j(D, function(E) {
					j(E, function(F) {
						F.baseStyle = componentAttr(F.component);
						if (F.progress) {
							b(F.component, F.progress["0"] || {})
						} else {
							F.onAnimate(F.component, 0, F.component)
						}
					});
					if (t) {
						u(t, function() {
							v(E)
						})
					}
					if (C === null) {
						C = E
					}
					t = E
				})
			},
			runNextFrame: function() {
				var D = false;
				c.loop(s, function(E) {
					E.progress(1);
					D = true
				});
				return D
			},
			start: function() {
				A.trig();
				if (C) {
					u(t, w.trig);
					v(C)
				} else {
					w.trig()
				}
			},
			onShow: A.regist,
			onRemove: z.regist,
			onEnterEnd: w.regist
		})
	}
	window.PageLayer = function(t) {
		if (t.nodeName) {
			return t
		} else {
			var s = l.Layer();
			s.classList.add("layer");
			s.resize(clientWidth, clientHeight);
			s.draw(t.draw);
			return s
		}
	};
	window.CanvasSystem = function(t, v) {
		var s = window.body,
			u = s.appendChild(g(l(), {
				position: "absolute",
				left: 0,
				top: 0,
				"z-index": 4
			})),
			w = null;
		u.resize(clientWidth, clientHeight);
		b(v, {
			canvas: u,
			makePage: function(y) {
				if (y.type) {
					return y.create()
				} else {
					var z = h(),
						x = z.background = z.component({
							content: Content.Rect({
								color: "#000000",
								width: clientWidth,
								height: clientHeight
							}),
							x: 0,
							y: 0,
							"z-index": -1
						});
					x.cursorThrough = false;
					y.create(z);
					return z
				}
			},
			setPage: function(x) {
				if (x.nodeName) {
					s.appendChild(x);
					n(u)
				} else {
					!u.parentNode && s.appendChild(u);
					u.root !== x && (u.root = x);
					u.dirty()
				}
				w = x;
				x.start()
			},
			curPage: function() {
				return w
			},
			removeCurrentPage: function() {
				u.root = null;
				w.nodeName && n(w);
				w && w.recycle()
			}
		});
		CanvasMode[t.data.mode](t, v)
	}
}());
(function(h) {
	var a = zachModule["0"],
		l = a.loopArray,
		e = a.loopObj,
		c = a.insert,
		r = a.extend,
		q = a.tupleString,
		t = a.Event,
		p = zachModule["2"],
		i = p.css,
		m = i.px,
		k = i.s,
		f = p.bindEvent,
		d = p.element,
		o = p.removeNode,
		n = zachModule["4"],
		g = zachModule["6"],
		b = 0;

	function j() {
		var y = d("div.page.animation-prepare"),
			x = t(),
			A = t(),
			w = 0,
			v = [];

		function s(B) {
			return {
				transform: [i.translate(B.x, B.y, 0), i.scale(Math.max(B.scale, 0.01)), i.rotateZ(B.rotate)].join(" "),
				opacity: B.opacity,
				"z-index": B["z-index"]
			}
		}
		function z(E, H, D, B) {
			var C = "animate" + b++,
				F = H.timing ? q("cubic-bezier", H.timing.arg) : "ease",
				G = "";
			e(H.progress, function(J, I) {
				G += J + "% {" + p.cssRuleString(s(r(componentAttr(E), I))) + "}"
			});
			p.insertCSSRules("@-webkit-keyframes " + C, G);
			return [C, F, k(H.duration), k(D || 0), B].join(" ")
		}
		function u(B) {
			return c(B, {
				component: function(F) {
					var E = F.content,
						D = B.appendChild(E.element()),
						C = componentAttr(F);
					i(D, r(s(C), {
						position: "absolute",
						left: 0,
						top: 0,
						width: m(E.width),
						height: m(E.height)
					}));
					if (F.onClick) {
						D.cursorThrough = false;
						n.onTap(D, F.onClick)
					}
					n.onPointerDown(D, function(G) {
						if (!D.cursorThrough) {
							G.preventDefault();
							G.stopPropagation()
						}
					});
					l(["x", "y", "opacity", "scale", "rotate", "z-index"], function(G) {
						Object.defineProperty(D, G, {
							get: function() {
								return C[G]
							},
							set: function(H) {
								C[G] = H;
								i(D, s(C))
							}
						})
					});
					return u(c(D, {
						cursorThrough: true,
						componentWidth: E.width,
						componentHeight: E.height,
						transition: function(G) {
							var I = G.timing ? q("cubic-bezier", G.timing.arg) : "ease";
							i(D, "transition", [I, k(G.duration), k(G.delay || 0)].join(" "));
							i(D, i(s(r(C, G.end))));
							var H = f(D, "webkitTransitionEnd", function() {
								p.removeCss(D, "transition");
								G.onEnd && G.onEnd(D);
								H.remove()
							});
							return {
								remove: function() {}
							}
						},
						infiniteAnimate: function(G) {
							i(D, "animation", z(D, G, 0, "infinite"))
						},
						remove: function() {
							p.removeNode(D)
						}
					}))
				}
			})
		}
		return c(u(y), {
			registEnterAnimation: function(B) {
				l(B, function(D) {
					var C = 0;
					l(D, function(G) {
						var F = G.component,
							E = G.delay || 0;
						F.enterAnimation = z(F, G, w + E, "backwards");
						F.onEnter = G.onEnter;
						C = Math.max(G.duration + E, C);
						v.push(F)
					});
					w += C
				});
				l(v, function(D) {
					i(D, "animation", D.enterAnimation);
					if (D.onEnter) {
						var C = f(D, "webkitAnimationEnd", function() {
							D.onEnter(D);
							C.remove()
						})
					}
				})
			},
			start: function() {
				p.toggleState(y, "animation-prepare", "animation-run");
				x.trig()
			},
			onShow: x.regist,
			recycle: A.trig,
			onRemove: A.regist
		})
	}
	window.DOMSystem = function(u, y) {
		document.documentElement.classList.add("dom-mode");
		var s = window.body,
			z = null,
			x = window.curPageIndex,
			w = false;

		function v(A) {
			var E, B = getIndex(A),
				D = u[B];
			if (D && D.isLoad) {
				E = D.special ? D.create() : D.create(j());
				window.curPageIndex = B;
				s.appendChild(E);
				var C = d("div.loading-next-page-tips.loading-next-page", E);
				y.loadPage(B + 1, function() {
					o(C);
					d("div.slide-arrow.can-push.switch-tips", E)
				});
				if (B === pageNumber - 1) {
					w = true
				}
				h.trackPageView()
			}
			return z = E
		}
		y.loadPage(x === 0 ? [0, 1] : x, function() {
			y.startShow();
			v(x);
			z.start();
			var A = null;
			if (x === 0) {
				A = d("div#slide-tips.switch-tips", s);
				document.body.classList.add("first")
			}
			n.onDragV(s, function(C) {
				if (A) {
					o(A);
					A = null;
					document.body.classList.remove("first")
				}
				function B(F, E) {
					var G = z;
					G.recycle();
					v(curPageIndex + F);
					if (z) {
						h.lock(true);
						G.classList.add("cur-" + E);
						z.classList.add("new-" + E);
						var D = p.bindEvent(z, "webkitAnimationEnd", function() {
							D.remove();
							G.classList.remove("cur-" + E);
							z.classList.remove("new-" + E);
							o(G);
							z.start();
							h.lock(false)
						})
					}
				}
				if (C.directionY) {
					if (!(curPageIndex === 0 && !w)) {
						B(-1, "down")
					}
				} else {
					B(1, "up")
				}
			})
		});
		h.jumpPage = function(A) {
			z.recycle();
			o(z);
			v(A);
			z.start()
		}
	};
	window.DOMPage = j
}(window.fp));
(function() {
	var j = zachModule["0"],
		A = j.loopArray,
		g = j.insert,
		u = zachModule["4"],
		k = u.onTap,
		C = u.onPointerDown,
		a = zachModule["2"],
		m = a.removeNode,
		q = a.element,
		F = a.css,
		h = F.px,
		x = zachModule["3"],
		r = zachModule["10"],
		i = zachModule["5"],
		H = zachModule["6"],
		f = zachModule["11"],
		E = f.matrix.unit,
		t = f.matrix.rotateX,
		s = f.matrix.rotateY,
		G = f.combine,
		w = f.transform,
		d = 6,
		L, l, N;
	var M = ["微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "偷笑", "愉快", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "悠闲", "奋斗", "咒骂", "疑问", "嘘", "晕", "疯了", "衰", "骷髅", "敲打", "再见", "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "咖啡", "饭", "猪头", "玫瑰", "凋谢", "嘴唇", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "强", "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈", "磕头", "回头", "跳绳", "投降"];
	var p = [];
	A(M, function(P, O) {
		p[P] = p[O] = {
			name: P,
			element: function(Q) {
				return q("div.face-icon", {
					css: {
						"background-position": -O * Q + "px 0",
						"background-size": "auto " + Q + "px",
						width: h(Q),
						height: h(Q)
					}
				})
			}
		}
	});

	function v(P, O) {
		return P.replace(/\[([^\]]*)]/g, function(Q) {
			if (RegExp.$1 in p) {
				return p[RegExp.$1].element(O).outerHTML
			} else {
				return Q
			}
		})
	}
	function c(O) {
		var P = undefined;
		return {
			value: function(Q) {
				if (Q === undefined) {
					var R = [];
					j.loop(O, function(S) {
						S !== P && R.push(S)
					});
					return P = R[Math.random() * R.length << 0]
				} else {
					P = Q
				}
			}
		}
	}
	function I() {
		var P = q("div.comment-input-bar.normal", [q("form.text-area.need-default", [q("div.text-area-wrapper", [q("textarea", {
			placeholder: "评论"
		})]), q("div.send-button", "发送"), q("div.small-icon.icon-keyboard", [q("div")]), q("div.small-icon.icon-face", [q("div")])]), q("div.face-list", [q("ul"), q("div.red-point", [q("div.wrapper")])])]),
			S = P.querySelector(".send-button"),
			O = P.querySelector("textarea"),
			R = P.querySelector("ul"),
			Q = null,
			V = null,
			T = j.Event();

		function U() {
			a.switchClass(S, O.value === "", "disabled");
			F(O, "height", 0);
			F(O, "height", O.scrollHeight - 6 + "px")
		}
		A(p, function(Y, X) {
			if (X % 20 === 0) {
				Q = q("li.face-list-page", [q("div.content")], R)
			}
			var W = q("div.face-list-item", [Y.element(30), q("div.face-list-item-tips.small-icon", [Y.element(40), q("div.caption", Y.name)])], Q.querySelector(".content"));
			W.face = Y
		});
		A(P.querySelectorAll(".face-list-page"), function(W) {
			k(q("div.delete-face.icon", W.querySelector(".content")), function() {
				if (/\[([^\]]*)]$/.test(O.value)) {
					var X = RegExp.$1.length + 2;
					O.value = O.value.substring(0, O.value.length - X)
				}
				U()
			})
		});
		u.onPointerUp(P.querySelector(".icon-keyboard"), function(W) {
			W.preventDefault();
			P.classList.remove("face-select");
			O.focus()
		});
		a.bindEvent(O, "focus", function() {
			P.classList.remove("face-select")
		});
		C(P.querySelector(".icon-face"), function(W) {
			W.preventDefault();
			O.blur();
			P.classList.add("face-select");
			if (V === null) {
				V = r(R.parentNode);
				i.doRedPoints(V);
				V.display(0);
				C(V, function(ab) {
					var aa = null;

					function X(af, ag) {
						af.preventDefault();
						var ae = document.elementFromPoint(af.zClientX, af.zClientY),
							ad = a.findAncestor(ae, function(ah) {
								return ah.classList.contains("face-list-item")
							});
						if (ag !== false) {
							aa !== null && aa.classList.remove("active");
							ad !== null && ad.classList.add("active")
						}
						aa = ad
					}
					var ac = setTimeout(function() {
						V.disable(true);
						X(ab);
						ab.onMove(X)
					}, 200);
					var Z = V.onSlideStart(function() {
						clearTimeout(ac);
						ac = null
					});
					var Y = ab;
					ab.onMove(function(ad) {
						Y = ad
					});
					ab.onUp(function() {
						if (ac) {
							clearTimeout(ac);
							X(Y, false)
						}
						if (aa) {
							aa.classList.remove("active");
							O.value = O.value + "[" + aa.face.name + "]";
							U()
						}
						V.disable(false);
						Z.remove()
					})
				})
			}
		});
		k(S, function() {
			if (!P.classList.contains(".empty")) {
				P.classList.remove("face-select");
				T.trig(O.value)
			}
		});
		a.bindEvent(O, "input", U);
		a.onInsert(P, U);
		return g(P, {
			onCommit: T.regist,
			value: function(W) {
				if (W !== undefined) {
					O.value = W
				} else {
					return O.value
				}
			},
			focus: function() {
				O.focus()
			},
			blur: function() {
				O.blur()
			},
			onFocus: function(W) {
				return a.bindEvent(O, "focus", W)
			},
			onBlur: function(W) {
				return a.bindEvent(O, "blur", W)
			}
		})
	}
	function K(P, O, Q) {
		return G(G(t(-Q), s(O)), P)
	}
	if (ua.win32) {
		L = 126;
		l = 60
	} else {
		if (ua.iphone6) {
			L = 136;
			l = 40
		} else {
			if (ua.iphone5) {
				L = 126;
				l = 30
			} else {
				if (ua.iphone4) {
					L = 100;
					l = 20
				} else {
					L = 120;
					l = 25
				}
			}
		}
	}
	function o(O, Q) {
		var P = Math.sqrt(O * O + Q * Q);
		return [O / P, Q / P]
	}
	function y(Q) {
		var O = Q[0],
			S = Q[1],
			R = Q[2],
			P = Math.sqrt(O * O + S * S + R * R);
		return {
			lat: Math.acos(S / P) - Math.PI / 2,
			lng: Q[2] >= 0 ? Math.atan(O / R) : Math.atan(O / R) + Math.PI
		}
	}
	function b(Q, R, P, O) {
		F.transform(Q, F.translate.apply(null, Q.position = R), F.rotateY(Q.rotateY = O), F.rotateX(Q.rotateX = P))
	}
	function B(P, O) {
		if (O || window.inClickMode) {
			return C(P.fragmentsParent, function(Q) {
				Q.preventDefault();
				if (P.fragments.length > 0) {
					Q.stopPropagation()
				}
			})
		}
	}
	function J(R) {
		var V = R.fragments,
			W = R.fragmentsParent,
			O = L,
			S = N[Math.max(V.length, 4)],
			T = null,
			Z = o(Math.random(), Math.random()),
			Y = 0.003,
			Q = Y;
		R.setSize(O * 2, O * 2);
		A(V, function(aa, ab) {
			var ad = aa.prePosition = [S[ab * 3] * O, S[ab * 3 + 1] * O, S[ab * 3 + 2] * O, 1],
				ac = y(ad);
			aa.isIn = false;
			aa.preRotateX = ac.lat;
			aa.preRotateY = ac.lng;
			aa.preRotateZ = 0
		});

		function X(aa) {
			T = aa;
			A(V, function(ab) {
				var ad = ab.position = w(T, ab.prePosition),
					ac = y(ad);
				b(ab, ad, ac.lat, ac.lng)
			})
		}
		var U = u.onDrag(W, function(ab) {
			var aa = T;
			fp.lock(true, W);
			W.classList.add("lock");
			R.stopAnimate();
			if (V.length > d) {
				R.removeTips()
			}
			ab.onDragMove(function(ac) {
				X(K(aa, ac.distanceX / 200, ac.distanceY / 200))
			});
			ab.onDragEnd(function(af) {
				var ae = af.speedX,
					ad = af.speedY,
					ac = Math.sqrt(ae * ae + ad * ad);
				fp.lock(false, W);
				Q = ac / 10;
				if (Q !== 0) {
					Z = [ae / ac, ad / ac]
				}
				R.runAnimate()
			})
		}),
			P = B(R, true);
		return {
			start: function() {
				X(E())
			},
			canTipsShow: function(aa) {
				return aa.position[2] > O * 0.2
			},
			onAnimate: function(ac) {
				var aa = R.tipsNum();
				Q = Q + (Y - Q) / 20;
				X(K(T, Z[0] * Q, Z[1] * Q));
				if (V.length > d) {
					if (++ac > 20 && Math.abs(Q - Y) < 0.001) {
						var ab = false;
						A(V, function(ad) {
							if (!ad.isIn && ad.position[2] > O * 0.85) {
								var ae = Math.random();
								ad.isIn = true;
								if (!ab && ad.comment && (aa === 0 && ae < 0.9 || aa === 1 && ae < 0.4 || aa < 2 && ae < 0.2)) {
									ab = ad.showTips()
								}
							} else {
								if (ad.isIn && ad.position[2] < O * 0.85) {
									ad.isIn = false;
									if (ad.tips) {
										ad.tips.remove(true)
									}
								}
							}
						})
					}
				} else {
					A(V, function(ad) {
						if (!ad.tips && ad.comment) {
							ad.showTips()
						}
					})
				}
			},
			onAnimateStop: function() {
				Q = Y
			},
			remove: function() {
				U.remove();
				P && P.remove()
			}
		}
	}
	function D(S) {
		var W = S.fragments,
			X = S.fragmentsParent,
			O = 120,
			T = 15,
			U = null,
			Z = true,
			Y = 0.003,
			R = Y;
		S.setSize(O * 2, O * 2);
		A(W, function(ab, ac) {
			ac = ac % 2 ? (ac + 1) / 2 : -ac / 2;
			var aa = (Math.abs(ac) / T) * Math.PI * 2 * x.sign(ac),
				ad = ab.prePosition = [O * Math.sin(aa), -ac * 5, O * Math.cos(aa), 1];
			ab.isIn = false;
			ab.preRotateX = 0;
			ab.preRotateY = Math.atan(ad[0] / ad[2]);
			ab.preRotateZ = 0
		});

		function Q(aa) {
			U = aa;
			A(W, function(ac) {
				var ad = ac.position = w(U, ac.prePosition),
					ab = Math.atan(ad[0] / ad[2]);
				b(ac, ad, 0, ab);
				ac.tips && ac.tips.adjust()
			})
		}
		var V = u.onDrag(X, function(ab) {
			var aa = U;
			fp.lock(true, X);
			X.classList.add("lock");
			S.stopAnimate();
			if (W.length > d) {
				S.removeTips()
			}
			ab.onDragMove(function(ac) {
				Q(K(aa, ac.distanceX / 200, 0))
			});
			ab.onDragEnd(function(ad) {
				var ac = ad.speedX;
				fp.lock(false, X);
				R = Math.abs(ac) / 10;
				Z = ac > 0;
				S.runAnimate()
			})
		}),
			P = B(S);
		return {
			start: function() {
				Q(E())
			},
			canTipsShow: function(aa) {
				return aa.position[2] > O * 0.2
			},
			onAnimate: function(ab) {
				var aa = false;
				R = R + (Y - R) / 20;
				Q(K(U, (Z ? 1 : -1) * R, 0));
				if (++ab > 20 && Math.abs(R - Y) < 0.001) {
					A(W, function(ac) {
						if (!ac.isIn && ac.position[2] > O * 0.8) {
							ac.isIn = true;
							if (!aa && ac.comment && Math.random() < 0.3) {
								aa = ac.showTips()
							}
						} else {
							if (ac.isIn && ac.position[2] < O * 0.8) {
								ac.isIn = false;
								if (ac.tips) {
									ac.tips.remove(true)
								}
							}
						}
					})
				}
			},
			onAnimateStop: function() {
				R = Y
			},
			remove: function() {
				V.remove();
				P && P.remove()
			}
		}
	}
	function e(S) {
		var V = S.fragments,
			X = S.fragmentsParent,
			R = 7,
			O = 120,
			T = null,
			Z = true,
			Y = 0.003,
			Q = Y;
		S.setSize(O * 2, O * 2);
		A(V, function(ab, ac) {
			var aa = (ac % R - (R - 1) / 2) * 40,
				ad = (ac / R << 0) * 40;
			ab.prePosition = [aa, ad - O, 0, 1];
			ab.isIn = false;
			ab.preRotateX = ab.preRotateY = 0
		});

		function W(aa) {
			var ab = y(w(T = aa, [0, 0, 1, 1]));
			b(X, [0, 0, 0, 1], ab.lat, ab.lng)
		}
		var U = u.onDrag(X, function(ab) {
			var aa = T;
			fp.lock(true, X);
			X.classList.add("lock");
			S.stopAnimate();
			if (V.length > d) {
				S.removeTips()
			}
			ab.onDragMove(function(ac) {
				W(K(aa, Math.atan(ac.distanceX / 300), Math.atan(ac.distanceY / 300)))
			});
			ab.onDragEnd(function(ad) {
				var ac = ad.speedX;
				fp.lock(false, X);
				Q = Math.abs(ac) / 10;
				Z = ac > 0;
				S.runAnimate()
			})
		}),
			P = B(S, true);
		return {
			start: function() {
				A(V, function(aa) {
					b(aa, aa.prePosition, 0, 0, 0)
				});
				W(E())
			},
			canTipsShow: function(aa) {
				return aa.position[2] > O * 0.2
			},
			onAnimate: function() {},
			onAnimateStop: function() {
				Q = Y
			},
			remove: function() {
				U.remove();
				P && P.remove()
			}
		}
	}
	var n = [J, D];

	function z(Z, S) {
		var ae = 30,
			aa = q("div.fragments-parent", Z),
			Q = q("div.tips-parent", Z),
			X = [],
			W = false,
			ad = 0,
			P = null,
			U = null,
			O = c(n.length);

		function T() {
			var af = 0;
			P = a.requestAnimate(function() {
				A(X, function(ag) {
					if (ag.tips) {
						ag.tips.adjust()
					}
				});
				U.onAnimate && U.onAnimate(af++)
			})
		}
		function R() {
			U.onAnimateStop && U.onAnimateStop();
			P && P.remove()
		}
		function V(af) {
			A(X, function(ag) {
				ag.tips && ag.tips.remove()
			});
			if (af) {
				W = true;
				setTimeout(function() {
					W = false
				}, af)
			}
		}
		function ab(ai, ah) {
			var ag = q("div.item"),
				af = new Image();
			af.onload = function() {
				a.onInsert(af, function() {
					F(af, i.getImageCoverStyle(af, ae, ae))
				});
				ag.appendChild(af);
				ag.comment = ai;
				ah && ah()
			};
			af.src = ai.avatar || staticImgSrc("firstPage-defaultAvatar.png");
			ag.showTips = function(aj) {
				if (aj || !W) {
					ag.tips && m(ag.tips);
					ac(ag, true);
					++ad;
					return true
				}
			};
			k(ag, function() {
				if (!U.canTipsShow || U.canTipsShow(ag)) {
					V();
					R();
					var aj = ac(ag),
						ak = u.onPointerUp(document, function() {
							ak.remove();
							aj.remove();
							T()
						}, true);
					aj.adjust()
				}
			});
			return ag
		}
		A(S, function(ag) {
			var af = ab(ag);
			aa.appendChild(af);
			X.push(af)
		});

		function ac(am, ap) {
			var ai = am.position,
				aj = am.comment,
				an = q("div.tips", {
					children: [q("div.name.ellipsis", aj.userName), q("div.date", i.dateString(aj.date, "M%-D% h%:m%")), q("div.text", v(aj.text, 12))]
				}, Q),
				ag = q("div.triangle", an),
				af = Math.min(ai[0] + 40, (clientWidth - an.offsetWidth) / 2 - 28),
				al = af - ai[0],
				ak = -an.offsetHeight / 2 - 25,
				ah = 1;
			F(an, {
				"margin-top": h(-an.offsetHeight / 2),
				"-webkit-transform-origin": [h(ai[0] + 40 - af + 15), "100%", 0].join(" "),
				visibility: "hidden"
			});
			F(ag, "left", h(ai[0] + 40 - af + 15));
			ap && H({
				start: 0.01,
				duration: 0.2,
				onAnimate: function(aq) {
					ah = aq
				}
			});

			function ao() {
				ai = am.position;
				F(an, "visibility", "visible");
				F.transform(an, F.translate(ai[0] + al, ai[1] + ak, ai[2]), F.scale(ah))
			}
			an.fragment = am;
			am.tips = an;
			return g(an, {
				adjust: ao,
				remove: function(aq) {
					--ad;
					j.request(function(ar) {
						!aq ? ar() : H({
							start: 1,
							end: 0.01,
							duration: 0.2,
							onAnimate: function(at) {
								ah = at
							},
							onEnd: ar
						})
					}, function() {
						am.tips = null;
						m(an)
					})
				}
			})
		}
		var Y = {
			newComment: function(af, ah) {
				var ag = ab(af, function() {
					ah && ah();
					R();
					fp.lock(true);
					F.transform(ag, F.scale(0.01));
					aa.appendChild(ag);
					if (X.length > l) {
						m(X.pop())
					}
					X.unshift(ag);
					U && U.remove();
					U = n[O.value()](Y);
					H({
						duration: 0.5,
						onAnimate: function(ai) {
							A(X, function(aj) {
								var am = aj.prePosition,
									al = aj.position;
								if (aj !== ag) {
									function ak(an) {
										return H.fromTo(al[an], am[an], ai)
									}
									b(aj, [ak(0), ak(1), ak(2)], H.fromTo(aj.rotateX, aj.preRotateX, ai), H.fromTo(aj.rotateY, aj.preRotateY, ai))
								} else {
									F.transform(ag, F.translate(0, 0, am[2]), F.scale(ai))
								}
							})
						},
						onEnd: function() {
							fp.lock(false);
							U.start();
							T();
							ag.showTips(true)
						}
					})
				})
			},
			fragmentsParent: aa,
			fragments: X,
			setSize: function(ag, af) {
				A([aa, Q], function(ah) {
					F(ah, {
						height: h(ag),
						width: h(af),
						"margin-left": h(-ag / 2 << 0),
						"margin-top": h(-af / 2 << 0)
					})
				})
			},
			tipsNum: function() {
				return ad
			},
			runAnimate: T,
			stopAnimate: R,
			removeTips: V
		};
		U = e(Y);
		O.value(1);
		U.start();
		return g(Z, Y)
	}
	registSpecialPage("comment", function(P) {
		var O;
		j.procedure([function(Q) {
			a.ajax({
				url: contentSrc("sphere.json"),
				isJson: true,
				onLoad: function(R) {
					N = R;
					Q()
				}
			})
		}, function(Q) {
			fp.getCommentSummary(Q, fp.getWorkInfo())
		}, function(R, Q) {
			O = Q;
			fp.getComments(R, {
				contentSummaryId: O
			})
		}, function(R) {
			var Q = z(q("div.comment-wall"), R.slice(0, l));
			if (Q.fragments.length === 0) {
				Q.classList.add("empty")
			}
			C(Q.fragmentsParent, function(S) {
				S.preventDefault();
				if (Q.fragments.length > 0) {
					S.stopPropagation()
				}
			});
			P({
				create: function(W) {
					var S = W.appendChild(I()),
						U = fp.getSessionData("comment"),
						T;
					S.onFocus(function() {
						T = C(Q, S.blur)
					});
					S.onBlur(function() {
						T.remove();
						T = null
					});

					function V(Y, aa) {
						var X, Z;
						j.procedure([function(ab) {
							fp.getUserInfo(ab)
						}, function(ac, ab) {
							X = ab;
							Z = fp.Loading(W, 300);
							S.blur();
							S.classList.add("lock");
							fp.saveComment(ac, {
								text: Y,
								contentSummaryId: O
							})
						}, function() {
							Q.newComment({
								avatar: X.HeadPhoto,
								userName: X.NickName,
								date: new Date(),
								text: Y
							}, function() {
								Z.remove();
								S.classList.remove("lock");
								S.value("");
								Q.removeTips(2000);
								Q.classList.remove("empty")
							});
							aa && aa()
						}])
					}
					U && fp.isLogIn() && V(U, function() {
						fp.alert("评论发表成功")
					});
					S.onCommit(function(X) {
						if (fp.isLogIn()) {
							V(X)
						} else {
							if (fp.canNotLogin) {
								fp.canNotLogin()
							} else {
								sessionStorage.setItem("comment", X);
								sessionStorage.setItem("lastPageIndex", curPageIndex);
								fp.logIn()
							}
						}
					});
					W.classList.add("comment-page");
					W.appendChild(Q);
					W.onShow(Q.runAnimate);
					W.onRemove(function() {
						Q.stopAnimate();
						Q.removeTips()
					})
				}
			})
		}])
	})
})();
(function() {
	registEnterAnimate({
		flyInto: {
			progress: function(c, d) {
				var b = c.x,
					a = c.y;
				switch (d) {
				case "left":
					b = -c.componentWidth;
					break;
				case "right":
					b = clientWidth;
					break;
				case "top":
					a = -c.componentHeight;
					break;
				case "bottom":
					a = clientHeight;
					break
				}
				return {
					"0": {
						x: b,
						y: a
					}
				}
			}
		},
		emerge: {
			progress: function(b, d) {
				var a = 0,
					c = 0;
				switch (d) {
				case "left":
					a = -20;
					break;
				case "right":
					a = 20;
					break;
				case "top":
					c = -20;
					break;
				default:
					c = 20;
					break
				}
				return {
					"0": {
						x: b.x + a,
						y: b.y + c,
						opacity: 0
					}
				}
			}
		},
		scale: {
			progress: function() {
				return {
					"0": {
						scale: 0
					}
				}
			}
		},
		fadeIn: {
			progress: function() {
				return {
					"0": {
						opacity: 0
					}
				}
			}
		},
		circleRound: {
			progress: function() {
				return {
					"0": {
						scale: 0,
						opacity: 0,
						rotate: Math.PI * 2.5
					}
				}
			},
			duration: 0.6
		},
		roundFromFarAndNear: {
			progress: function() {
				return {
					"0": {
						scale: 0,
						opacity: 0,
						rotate: Math.PI * 0.65
					}
				}
			}
		}
	});
	registEnterAnimate({
		curveUp: {
			onAnimate: function(f, e, c) {
				var b = 100,
					d = (1 - e) * 3;
				f.scale = (1 - e) * 0.4 + 1;
				f.opacity = e;
				f.x = c.x + b * d * Math.cos(d);
				f.y = c.y + b * d * Math.sin(d)
			},
			duration: 1,
			fallback: enterAnimate.circleRound
		}
	})
})();
(function() {
	var f = zachModule["2"],
		d = f.element,
		c = f.css,
		b = c.px,
		a = zachModule["12"],
		e = zachModule["5"];
	window.Content = window.Content || {};
	window.Component = window.Component || {};
	Content.Image = function(h, i, g) {
		i = i || h.halfWidth;
		g = g || h.halfHeight;
		return {
			width: i,
			height: g,
			element: function() {
				return d("div", {
					children: c(h, {
						position: "absolute",
						width: b(i),
						height: b(g),
						left: 0,
						right: 0
					})
				})
			},
			draw: function(j) {
				j.drawImage(h, 0, 0, i, g)
			}
		}
	};
	Content.ImageCover = function(k, i, o, h) {
		var g = 0,
			j = "";
		if (h) {
			if (h.border) {
				g = h.border.width;
				j = h.border.color
			}
		}
		var l = i - g * 2,
			m = o - g * 2,
			p = {},
			n = e.getImageCoverStyle(k, l, m, p);
		return {
			width: l,
			height: m,
			scale: p.scale,
			element: function() {
				return d("div", {
					css: {
						"box-sizing": "border-box",
						overflow: "hidden",
						border: ["solid", b(g), j].join(" ")
					},
					children: c(k, n)
				})
			},
			draw: function(q) {
				var r = k.imgMeasure || (k.imgMeasure = a.measureCover(k, l, m));
				q.save();
				q.translate(g, g);
				a.drawImageMeasure(q, r);
				q.restore();
				if (g !== 0) {
					q.fillStyle = j;
					q.fillRect(0, 0, i, g);
					q.fillRect(0, 0, g, o);
					q.fillRect(i - g, 0, g, o);
					q.fillRect(0, o - g, i, g)
				}
			}
		}
	};
	Component.BackgroundImageCover = function(i, g, j) {
		var h = Content.ImageCover(g, clientWidth, clientHeight);
		i.component({
			content: h,
			x: 0,
			y: 0,
			"z-index": j || 0
		});
		return h.scale
	}
})();
(function() {
	var d = zachModule["2"],
		c = d.element,
		b = d.css,
		a = b.px;
	window.Content = window.Content || {};
	Content.Rect = function(f) {
		var e = f.color || "";
		return {
			width: f.width,
			height: f.height,
			element: function() {
				return c("div", {
					css: {
						background: e
					}
				})
			},
			draw: function(g) {
				if (e) {
					g.fillStyle = e;
					g.fillRect(0, 0, f.width, f.height)
				}
			}
		}
	};
	Content.Circle = function(f) {
		var e = f.r;
		return {
			width: e * 2,
			height: e * 2,
			element: function() {
				return c("div", {
					css: {
						"border-radius": a(e),
						background: f.color
					}
				})
			},
			draw: function(g) {
				g.save();
				g.beginPath();
				g.arc(e, e, e, 0, 2 * Math.PI);
				g.closePath();
				g.fillStyle = f.color;
				g.fill();
				g.restore()
			}
		}
	}
})();
(function() {
	var n = zachModule["2"],
		c = n.element,
		h = n.css,
		k = h.px,
		a = zachModule["0"],
		b = a.insert,
		i = a.loopArray,
		j = zachModule["16"],
		q = zachModule["14"],
		p = document.createElement("canvas").getContext("2d");
	window.Content = window.Content || {};

	function o(t) {
		t = t || {};
		return [t.fontStyle || "normal", t.fontVariant || "normal", t.fontWeight || "normal", (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ")
	}
	function r(u) {
		var t = {};
		a.loopObj(u, function(v, w) {
			switch (v) {
			case "fontSize":
				t["font-size"] = k(w);
				break;
			case "lineHeight":
				t["line-height"] = k(w);
				break;
			case "fontWeight":
				t["font-weight"] = w;
				break;
			case "fontStyle":
				t["font-style"] = w;
				break;
			case "color":
				t.color = w;
				break
			}
		});
		return t
	}
	function f(w, v) {
		if (window.highPerformance) {
			p.font = o(v);
			return p.measureText(w).width
		} else {
			var u = c("div", {
				innerHTML: w,
				css: b(r(v), {
					display: "inline-block",
					position: "absolute"
				})
			}, document.body),
				t = u.offsetWidth;
			n.removeNode(u);
			return t
		}
	}
	function e(y, x, w) {
		var u = document.createElement("canvas"),
			t = 0,
			v = [];
		p.font = o(w);
		i(y.split("\n"), function(C) {
			var B = [],
				z = null,
				A = 0;
			B.text = C;
			t += (w.margin || 0) * 2;
			a.loopString(C, function(D) {
				var E = p.measureText(D).width;
				if (z === null || E + A > x) {
					t += w.lineHeight;
					B.push(z = [0]);
					A = E
				} else {
					z.push(A);
					A += E
				}
			}, true);
			v.push(B)
		});
		v.style = w;
		v.width = x;
		v.height = t;
		return v
	}
	function l(x, v) {
		var u = v.style,
			t = 0,
			w = u.margin || 0;
		x.fillStyle = u.color;
		x.textBaseline = "middle";
		x.font = o(u);
		i(v, function(z) {
			var y = 0;
			t += w;
			i(z, function(A) {
				x.fillText(z.text.substring(y, y + A.length), 0, t + u.lineHeight / 2 << 0);
				t += u.lineHeight;
				y += A.length
			});
			t += w
		})
	}
	function s(t, u) {
		i(u.text.split("\n"), function(v) {
			c("p", {
				innerHTML: v || "&nbsp",
				css: b({
					margin: k(u.margin * 2) + " 0"
				}, u.breakWord ? {
					"word-break": "break-all",
					"word-wrap": "break-word"
				} : {})
			}, t)
		});
		return t
	}
	function d(v) {
		function t(x) {
			var w = document.createElement("div");
			a.loopArray(x.split("\n"), function(y) {
				c("p", {
					classList: "normal",
					innerHTML: q.encodeString(y)
				}, w)
			});
			return w.innerHTML
		}
		var u = v.textMeasure = v.textMeasure || (v.breakWord ? e(v.text, v.width, v) : j.measureText({
			normal: {
				marginTop: v.margin,
				marginBottom: v.margin,
				lineHeight: v.lineHeight,
				lineGap: 0,
				indent: 0,
				fontFamily: "sans-serif",
				fontSize: v.fontSize,
				textFillStyle: v.color
			}
		}, j.parseText(t(v.text)), v.width));
		u.breakWord = v.breakWord;
		return u
	}
	function g(u, t) {
		(t.breakWord ? l : j.drawText)(u, t)
	}
	function m(u) {
		if (window.highPerformance) {
			return d(u).height
		} else {
			var v = s(c("div", {
				css: a.insert(r(u), {
					position: "absolute",
					width: k(u.width)
				})
			}, document.body), u),
				t = v.offsetHeight;
			n.removeNode(v);
			return t
		}
	}
	Content.Label = function(t) {
		var u = t.text;
		return {
			width: f(u, t),
			height: t.lineHeight,
			element: function() {
				return c("span", {
					css: b(r(t), {
						display: "inline-block"
					}),
					innerHTML: u
				})
			},
			draw: function(v) {
				v.font = o(t);
				v.textBaseline = "middle";
				v.fillStyle = t.color;
				v.fillText(u, 0, t.lineHeight / 2 << 0)
			}
		}
	};
	Content.LineText = function(t) {
		var u = t.text;
		return {
			width: t.width,
			height: t.lineHeight,
			element: function() {
				return c("span", {
					css: b(r(t), {
						"text-align": t.isLeft ? "left" : "center",
						width: k(t.width),
						"white-space": "nowrap"
					}, t.overflow ? {
						overflow: "hidden",
						"white-space": "nowrap",
						"text-overflow": "ellipsis"
					} : {}),
					innerHTML: u
				})
			},
			draw: function(w) {
				var x = t.textWidth || f(u, t);
				if (t.overflow && x > t.width) {
					for (var v = 0; v !== t.text.length; ++v) {
						if (f(u.substring(0, v + 1) + "…", t) > t.width) {
							break
						}
					}
					u = t.text = u.substring(0, v) + "…";
					x = f(u, t)
				}
				t.textWidth = x;
				w.font = o(t);
				w.textBaseline = "middle";
				w.fillStyle = t.color;
				w.fillText(u, t.isLeft ? 0 : (t.width - x) / 2 << 0, t.lineHeight / 2 << 0)
			}
		}
	};
	Content.BlockText = function(t) {
		return {
			width: t.width,
			height: m(t),
			element: function() {
				var u = c("div", {
					css: b(r(t), {
						width: k(t.width)
					})
				});
				s(u, t);
				return u
			},
			draw: function(u) {
				g(u, d(t))
			}
		}
	};
	Content.MiddleBlockText = function(u) {
		var t = Math.max(u.height, m(u));
		return {
			width: u.width,
			height: t,
			element: function() {
				var v = c("div", {
					css: {
						width: k(u.width),
						height: k(u.height)
					}
				}),
					w = c("div", {
						css: b(r(u), {
							"vertical-align": "middle",
							display: "table-cell",
							width: k(u.width),
							height: k(u.height)
						})
					}, v);
				s(w, u);
				return v
			},
			draw: function(w) {
				var v = d(u);
				w.save();
				w.translate(0, (t - v.height) / 2 << 0);
				g(w, v);
				w.restore()
			}
		}
	}
})();
(function() {
	var a = zachModule["0"],
		c = zachModule["5"],
		b = "layout-context-text-frame.png";
	registLayout("contact", {
		resource: ["layout-contact-background.png", b, b, b, b, b],
		create: function(h, e) {
			var j = e.resource[1],
				l = j.halfWidth,
				k = j.halfHeight;
			h.component({
				content: Content.ImageCover(e.image[0], clientWidth, clientHeight),
				x: 0,
				y: 0,
				"z-index": 0
			});
			h.component({
				content: Content.ImageCover(e.resource[0], clientWidth, clientHeight),
				x: 0,
				y: 0,
				"z-index": 1
			});
			var m = 0;
			a.loopArray(e.text, function(n) {
				n !== "" && ++m
			});
			var f = middleY(143),
				i = 315,
				d = (i - k * m) / (m + 1) << 0;
			var g = 0;
			a.loopArray([{
				caption: "联系电话",
				click: function(n) {
					location.href = "tel:" + n
				}
			}, {
				caption: "联系邮箱",
				click: function(n) {
					location.href = "mailto:" + n
				}
			}, {
				caption: "官方网站",
				click: function(n) {
					fp.jump(n)
				}
			}, {
				caption: "微信号"
			}, {
				caption: "微博",
				click: function(n) {
					fp.jump("http://weibo.com/n/" + n)
				}
			}], function(p, r) {
				var u = e.text[r],
					v = p.caption + "：",
					n = Content.Label({
						text: v,
						lineHeight: 44,
						fontSize: 14,
						color: "#FFFFFF"
					}),
					s = n.width,
					q = 14,
					t = 8;
				if (u === "") {
					return
				}
				var o = h.component({
					content: Content.Image(e.resource[r + 1]),
					x: (clientWidth - l) / 2 << 0,
					y: f + d * (g + 1) + k * g,
					"z-index": 2,
					onClick: function() {
						p.click && p.click(u)
					}
				});
				o.component({
					content: n,
					x: q,
					y: 0
				});
				o.component({
					content: Content.MiddleBlockText({
						text: u,
						lineHeight: 16,
						fontSize: 12,
						color: "#FFFFFF",
						margin: 0,
						width: l - 2 * q - t - s,
						height: 44,
						breakWord: true
					}),
					x: q + t + s,
					y: 0
				});
				++g
			})
		}
	})
})();
(function() {
	var a = zachModule["0"],
		b = false;
	registLayout("copyright", {
		resource: ["layout-copyright-background.png"],
		create: function(l, h) {
			var f = h.author,
				c = h.resource[0],
				n = Content.Label({
					text: f,
					lineHeight: 16,
					fontSize: 16,
					fontStyle: "italic",
					color: "#fc5e28"
				}),
				e = n.width,
				d = Content.Label({
					text: "作品",
					lineHeight: 16,
					fontSize: 16,
					fontStyle: "italic",
					color: "#A3AEC1"
				}),
				j = d.width,
				m = 20,
				i = e + m + j;
			l.component({
				content: Content.Image(c),
				x: center(clientWidth, c.halfWidth),
				y: center(clientHeight, c.halfHeight) + 15,
				"z-index": 1
			});
			l.component({
				content: Content.ImageCover(h.image[0], 56, 56),
				x: middleX(136),
				y: middleY(81)
			});
			var k = l.component({
				content: Content.Rect({
					width: i,
					height: 16
				}),
				x: center(clientWidth, i),
				y: middleY(154),
				"z-index": 2
			});
			k.component({
				content: n,
				x: 0,
				y: 0
			});
			k.component({
				content: d,
				x: e + m,
				y: 0
			});
			l.component({
				content: Content.LineText({
					text: h.title,
					width: 241,
					lineHeight: 14,
					fontSize: 12,
					color: "#A3AEC1",
					isLeft: true
				}),
				x: middleX(40),
				y: middleY(203),
				"z-index": 2
			});
			var g = [40, 130, 220];
			a.loopArray(h.works, function(p, q) {
				if (q > 2) {
					return
				}
				var o = l.component({
					content: Content.Rect({
						width: 60,
						height: 83
					}),
					x: middleX(g[q]),
					y: middleY(233),
					"z-index": 2,
					onClick: function() {
						location.href = p.url
					}
				});
				o.component({
					content: Content.ImageCover(h.image[q + 1], 60, 60),
					x: 0,
					y: 0,
					"z-index": 2
				});
				o.component({
					content: Content.LineText({
						text: p.title,
						width: 80,
						lineHeight: 14,
						fontSize: 10,
						color: "#A3AEC1",
						overflow: true,
						isLeft: true
					}),
					x: 0,
					y: 69,
					"z-index": 2
				})
			});
			l.component({
				content: Content.Rect({
					width: 140,
					height: 40
				}),
				x: center(clientWidth, 140),
				y: middleY(343),
				"z-index": 2,
				onClick: function() {
					var o;
					if (ua.iphone) {
						o = "iphone"
					} else {
						if (ua.ipad) {
							o = "ipad"
						} else {
							if (ua.ios) {
								o = "ios-other"
							} else {
								if (ua.android) {
									o = "android"
								} else {
									o = "other"
								}
							}
						}
					}
					if (ua.chuye) {
						fp.alert("您正在使用初页")
					} else {
						window.AnalyticsDownload && window.AnalyticsDownload({
							title: "点击下载",
							url: "http://chuye.cloud7.com.cn" + virtualPath + "/download/click/" + o + "/" + fp.getWorkInfo().ContentID
						});
						location.href = ua.ios ? ua.MicroMessenger ? "http://mp.weixin.qq.com/mp/redirect?url=https://itunes.apple.com/cn/app/chu-ye/id910560238?mt=8" : "https://itunes.apple.com/cn/app/chu-ye/id910560238?mt=8" : "http://www.cloud7.com.cn/chuye"
					}
				}
			});
			if (!b) {
				window.AnalyticsDownload && window.AnalyticsDownload({
					title: "下载页",
					url: "http://chuye.cloud7.com.cn" + virtualPath + "/download"
				});
				b = true
			}
		}
	})
})();
(function() {
	var a = zachModule["0"],
		b = {
			"fly-into-left": {
				func: enterAnimate.flyInto,
				arg: ["left"]
			},
			"fly-into-top": {
				func: enterAnimate.flyInto,
				arg: ["top"]
			},
			"fly-into-right": {
				func: enterAnimate.flyInto,
				arg: ["right"]
			},
			"fly-into-bottom": {
				func: enterAnimate.flyInto,
				arg: ["bottom"]
			},
			"emerge-left": {
				func: enterAnimate.emerge,
				arg: ["left"]
			},
			"emerge-top": {
				func: enterAnimate.emerge,
				arg: ["top"]
			},
			"emerge-right": {
				func: enterAnimate.emerge,
				arg: ["right"]
			},
			"emerge-bottom": {
				func: enterAnimate.emerge,
				arg: ["bottom"]
			},
			scale: {
				func: enterAnimate.scale
			},
			"fade-in": {
				func: enterAnimate.fadeIn
			},
			"circle-round": {
				func: enterAnimate.circleRound
			},
			"round-from-far-and-near": {
				func: enterAnimate.roundFromFarAndNear
			},
			"curve-up": {
				func: enterAnimate.curveUp
			}
		};
	registLayout("custom", {
		create: function(f, e) {
			var d = [],
				c = e.imageinfo,
				g = Component.BackgroundImageCover(f, e.image[0]) * 2;
			a.loopArray(c, function(m, k) {
				if (m !== null) {
					var l = m.width,
						j = e.image[k],
						h = l / j.halfWidth * j.halfHeight;
					d[k] = f.component({
						content: Content.Image(e.image[k], l * g, h * g),
						x: middleX(m.x, g),
						y: middleY(m.y, g),
						rotate: m.rotate || 0
					})
				}
			});
			a.loopArray(c, function(k, h) {
				if (k && k.animation) {
					var j = (b[k.animation] || b["fly-into-left"]);
					f.registEnterAnimation([
						[j.func.apply(null, [d[h]].concat(j.arg || []))]
					])
				}
			})
		}
	})
})();
(function() {
	var a = zachModule["0"],
		c = zachModule["5"];
	var b = c.KeyValueFunction(function(d, e) {
		registLayout(d, {
			resource: [e.frame],
			create: function(h, g) {
				var f = [];
				a.loopArray(g.image, function(j, l) {
					var n = e.img[l],
						m = h.component({
							content: Content.ImageCover(j, Math.ceil(n.width * xRatio) + 1, Math.ceil(n.height * yRatio) + 1),
							x: n.x * xRatio << 0,
							y: n.y * yRatio << 0
						}),
						k = n.enterAnimate;
					f.push([enterAnimate[k.name].apply(null, [m].concat([k.arg]))])
				});
				h.component({
					content: Content.Image(g.resource[0], clientWidth, clientHeight),
					x: 0,
					y: 0,
					"z-index": 100
				});
				h.registEnterAnimation(f)
			}
		})
	});
	b({
		MutipleImage02: {
			frame: "layout-MutipleImage02-frame.png",
			img: [{
				x: 25,
				y: 16,
				width: 280,
				height: 157,
				enterAnimate: {
					name: "flyInto",
					arg: "left"
				}
			}, {
				x: 25,
				y: 173,
				width: 280,
				height: 157,
				enterAnimate: {
					name: "flyInto",
					arg: "right"
				}
			}, {
				x: 25,
				y: 330,
				width: 280,
				height: 157,
				enterAnimate: {
					name: "flyInto",
					arg: "left"
				}
			}]
		},
		MutipleImage03: {
			frame: "layout-MutipleImage03-frame.png",
			img: [{
				x: 15,
				y: 15,
				width: 290,
				height: 231,
				enterAnimate: {
					name: "flyInto",
					arg: "top"
				}
			}, {
				x: 15,
				y: 250,
				width: 143,
				height: 239,
				enterAnimate: {
					name: "flyInto",
					arg: "left"
				}
			}, {
				x: 162,
				y: 250,
				width: 143,
				height: 239,
				enterAnimate: {
					name: "flyInto",
					arg: "right"
				}
			}]
		}
	})
})();
(function() {
	var a = zachModule["0"],
		b = a.TupleString("rgba");

	function e(h, g, i) {
		return {
			content: Content.Image(h),
			x: middleX(g),
			y: middleY(i),
			"z-index": 5
		}
	}
	function d(g) {
		return {
			create: function(k, j) {
				var q = [27, 16, 10],
					i = [22, 57, 88],
					l = 115 * yRatio << 0,
					n, m, p;
				switch (g) {
				case "top":
					n = 0;
					m = l;
					p = clientHeight;
					break;
				case "middle":
					n = clientHeight * 0.6 << 0;
					m = 0;
					p = clientHeight;
					break;
				case "bottom":
					m = 0;
					n = p = clientHeight - l;
					break
				}
				var h = [],
					o = color.background || "#FFFFFF";
				a.loopArray(j.text, function(s, r) {
					if (s) {
						h.push([enterAnimate.emerge(k.component({
							content: Content.LineText({
								text: s,
								lineHeight: q[r],
								fontSize: q[r],
								color: o === "#FFFFFF" ? "#000000" : "#FFFFFF",
								width: clientWidth
							}),
							x: 0,
							y: n + i[r] * yRatio << 0,
							"z-index": 2
						}))])
					}
				});
				k.component({
					content: Content.ImageCover(j.image[0], clientWidth, p - m),
					x: 0,
					y: m
				});
				k.component({
					content: Content.Rect({
						color: o,
						width: clientWidth,
						height: l
					}),
					x: 0,
					y: n,
					"z-index": 1
				});
				k.registEnterAnimation(h)
			}
		}
	}
	registLayout("ImageText01", d("top"));
	registLayout("ImageText02", d("bottom"));
	registLayout("ImageText03", d("middle"));
	registLayout("SingleImage", {
		create: function(h, g) {
			Component.BackgroundImageCover(h, g.image[0])
		}
	});

	function c(g) {
		var h = g.padding;
		return {
			create: function(j, i) {
				Component.BackgroundImageCover(j, i.image[0]);
				j.component({
					content: Content.Rect({
						width: clientWidth,
						height: clientHeight,
						color: g.background
					}),
					x: 0,
					y: 0,
					"z-index": 1
				});
				j.registEnterAnimation([
					[enterAnimate.emerge(j.component({
						content: Content.MiddleBlockText({
							text: i.text[0],
							margin: g.margin,
							lineHeight: g.lineHeight,
							fontSize: g.fontSize,
							color: g.color,
							width: clientWidth - 2 * h,
							height: clientHeight
						}),
						"z-index": 2,
						x: h,
						y: 0
					}))]
				])
			}
		}
	}
	registLayout("ImageText04", c({
		margin: 5,
		lineHeight: 25,
		fontSize: 15,
		color: "#FFFFFF",
		background: b(0, 0, 0, 0.8),
		padding: 20
	}));
	registLayout("ImageText07", c({
		margin: 5,
		lineHeight: 25,
		fontSize: 14,
		color: "#333333",
		background: b(255, 255, 255, 0.85),
		padding: 20
	}));
	registLayout("ImageText05", {
		create: function(l, k) {
			var n = 17,
				j = 191,
				m = 60,
				i = Content.MiddleBlockText({
					text: k.text[0],
					width: j - 2 * n,
					height: m,
					lineHeight: 30,
					fontSize: 22,
					color: "#FFFFFF",
					breakWord: true
				}),
				g = i.height + 20;
			Component.BackgroundImageCover(l, k.image[0]);
			var h = l.component({
				content: Content.Rect({
					width: j,
					height: g,
					color: b(0, 0, 0, 0.85)
				}),
				x: clientWidth - j,
				y: center(clientHeight, g),
				"z-index": 1
			});
			h.component({
				content: i,
				x: n,
				y: 10
			})
		}
	});
	registLayout("ImageText06", {
		create: function(k, j) {
			var m = 17,
				i = 250,
				l = 350;
			Component.BackgroundImageCover(k, j.image[0]);
			var g = k.component({
				content: Content.Rect({
					width: i,
					height: l,
					color: b(0, 0, 0, 0.85)
				}),
				x: center(clientWidth, i),
				y: center(clientHeight, l),
				"z-index": 1
			});

			function h(n, o) {
				return a.extend(enterAnimate.flyInto(g.component({
					content: Content.MiddleBlockText({
						text: j.text[n],
						width: i - 2 * m,
						height: 68,
						lineHeight: 25,
						fontSize: 14,
						color: "#FFFFFF",
						breakWord: true
					}),
					x: m,
					y: o
				}), "right"), {
					delay: 0.3 * n
				})
			}
			k.registEnterAnimation([
				[h(0, 35), h(1, 132), h(2, 229)]
			])
		}
	});
	registLayout("ImageText08", {
		create: function(i, h) {
			var g = h.image[1];
			Component.BackgroundImageCover(i, h.image[0]);
			i.registEnterAnimation([
				[enterAnimate.emerge(i.component({
					content: Content.Image(g),
					x: clientWidth - g.halfWidth,
					y: middleY(354),
					"z-index": 5,
					duration: 1
				}))]
			])
		}
	});
	registLayout("ImageText09", {
		create: function(i, h) {
			var g = h.image[1];
			Component.BackgroundImageCover(i, h.image[0]);
			i.registEnterAnimation([
				[enterAnimate.emerge(i.component({
					content: Content.Image(g),
					x: center(clientWidth, g.halfWidth),
					y: middleY(289),
					"z-index": 5,
					duration: 1
				}))]
			])
		}
	});
	registLayout("ImageText10", {
		create: function(i, h) {
			var g = h.image[1];
			Component.BackgroundImageCover(i, h.image[0]);
			i.registEnterAnimation([
				[enterAnimate.emerge(i.component({
					content: Content.Image(g),
					x: 25,
					y: middleY(155),
					"z-index": 5,
					duration: 1
				}))]
			])
		}
	});
	registLayout("ImageText11", {
		create: function(j, i) {
			var h = i.image[1],
				g = i.image[2];
			Component.BackgroundImageCover(j, i.image[0]);
			j.registEnterAnimation([
				[enterAnimate.emerge(j.component({
					content: Content.Image(h),
					x: center(clientWidth, h.halfWidth),
					y: middleY(189),
					"z-index": 5,
					duration: 1
				}))],
				[enterAnimate.emerge(j.component({
					content: Content.Image(g),
					x: center(clientWidth, g.halfWidth),
					y: middleY(269),
					"z-index": 5,
					duration: 1
				}))]
			])
		}
	});
	registLayout("ImageText12", {
		resource: ["layout-ImageText12-mayun.jpg", "layout-ImageText12-mask.png"],
		create: function(l, k) {
			var j = k.image[1],
				g = 818 / 1008 * clientHeight,
				i = 400 / 1008 * clientHeight;
			l.component({
				content: Content.ImageCover(k.resource[0], clientWidth / 2, g),
				x: 0,
				y: 0
			});
			l.component({
				content: Content.ImageCover(k.image[0], clientWidth / 2, g),
				x: clientWidth / 2,
				y: 0
			});
			var h = l.component({
				content: Content.ImageCover(k.resource[1], clientWidth, i),
				x: 0,
				y: clientHeight - i,
				"z-index": 5
			});
			l.registEnterAnimation([
				[enterAnimate.emerge(h.component({
					content: Content.Image(j),
					x: (clientWidth - j.halfWidth) / 2 << 0,
					y: 75,
					duration: 1
				}))]
			])
		}
	});
	registLayout("ImageText13", {
		create: function(m, l) {
			var i = 248 / 2 * yRatio,
				g = clientHeight - i,
				j = l.image[1],
				h = j.halfWidth * yRatio << 0;
			Component.BackgroundImageCover(m, l.image[0]);
			var k = m.component({
				content: Content.Rect({
					color: "#FFFFFF",
					width: clientWidth,
					height: i
				}),
				x: 0,
				y: g
			});
			m.registEnterAnimation([
				[enterAnimate.fadeIn(k.component({
					content: Content.Image(j, h, j.halfHeight * yRatio << 0),
					x: center(clientWidth, h),
					y: (766 - (1008 - 248)) / 2 * yRatio << 0,
					"z-index": 5,
					duration: 1
				}))]
			])
		}
	});
	registLayout("ImageText14", {
		create: function(i, h) {
			var g = h.image[1];
			Component.BackgroundImageCover(i, h.image[0]);
			i.registEnterAnimation([
				[enterAnimate.emerge(i.component({
					content: Content.Image(g),
					x: clientWidth - 14 - g.halfWidth,
					y: middleY(78),
					"z-index": 5,
					duration: 1
				}))]
			])
		}
	});
	registLayout("ImageText15", {
		create: function(o, m) {
			var k = m.image[1],
				i = m.image[2],
				s = 40,
				t = 23,
				h = 15,
				r = k.halfHeight + i.halfHeight + h,
				j = Math.max(k.halfWidth, 246) + t * 2,
				g = (clientWidth - j) / 2,
				n = r + s * 2,
				q = (clientHeight - n) / 2;
			Component.BackgroundImageCover(o, m.image[0]);
			var p = o.component({
				content: Content.Rect({
					width: j,
					height: n,
					opacity: 0.9,
					color: "#FFFFFF"
				}),
				x: g,
				y: q
			});

			function l(v, u, w) {
				return enterAnimate.emerge(p.component({
					content: Content.Image(v),
					x: u << 0,
					y: w << 0,
					"z-index": 5,
					duration: 1
				}))
			}
			o.registEnterAnimation([
				[l(k, t, s)],
				[l(i, j - t - i.halfWidth, s + k.halfHeight + h)]
			])
		}
	});
	registLayout("ImageText16", {
		create: function(j, i) {
			var h = i.image[1],
				g = i.image[2];
			Component.BackgroundImageCover(j, i.image[0]);
			j.registEnterAnimation([
				[enterAnimate.fadeIn(j.component(e(h, 324 / 2, 114 / 2)))],
				[enterAnimate.fadeIn(j.component(e(g, 330 / 2, 114 / 2 + h.halfHeight + 5)))]
			])
		}
	});
	registLayout("ImageText17", {
		create: function(j, i) {
			var h = i.image[1],
				g = i.image[2];
			Component.BackgroundImageCover(j, i.image[0]);
			j.registEnterAnimation([
				[enterAnimate.fadeIn(j.component(e(h, 68 / 2, 696 / 2)))],
				[enterAnimate.fadeIn(j.component(e(g, 76 / 2, 696 / 2 + h.halfHeight + 5)))]
			])
		}
	});
	var f = {
		create: function(j, i) {
			var h = i.image[1],
				g = i.image[2];
			Component.BackgroundImageCover(j, i.image[0]);
			j.registEnterAnimation([
				[enterAnimate.emerge(j.component(e(h, 516 / 2, 195 / 2)), "right"), enterAnimate.emerge(j.component(e(g, 516 / 2 + h.halfWidth - g.halfWidth, 195 / 2 + h.halfHeight + 5)), "left")]
			])
		}
	};
	registLayout("ImageText21", f);
	registLayout("ImageText22", f);
	registLayout("ImageText23", {
		create: function(j, i) {
			var h = i.image[1],
				g = i.image[2];
			Component.BackgroundImageCover(j, i.image[0]);
			j.registEnterAnimation([
				[enterAnimate.emerge(j.component(e(h, 60 / 2, 140 / 2)), "top"), enterAnimate.emerge(j.component(e(g, 64 / 2, 140 / 2 + h.halfHeight + 5)), "bottom")]
			])
		}
	});
	registLayout("ImageText24", {
		create: function(j, i) {
			var h = i.image[1],
				g = i.image[2];
			Component.BackgroundImageCover(j, i.image[0]);
			j.registEnterAnimation([
				[enterAnimate.emerge(j.component(e(h, 82 / 2, 720 / 2)), "top"), enterAnimate.emerge(j.component(e(g, 86 / 2, 720 / 2 + h.halfHeight + 5)), "bottom")]
			])
		}
	})
})();
(function() {
	var e = zachModule["5"],
		d = zachModule["2"],
		c = zachModule["4"],
		b = d.element,
		a = '<div class="map-info-window"><div class="name"></div><div class="info"><div>地址:<span class="address"></span></div></div></div>';
	registLayout("map", {
		resource: ["layout-map-location.png"],
		create: function(l, k) {
			var i = k.resource[0];
			l.component({
				content: Content.ImageCover(k.image[0], clientWidth, clientHeight),
				x: 0,
				y: 0
			});
			var h = l.component({
				content: Content.Image(i),
				x: center(clientWidth, i.halfWidth),
				y: middleY(574 / 2)
			});
			l.component({
				content: Content.LineText({
					text: k.location[0].address,
					lineHeight: 12,
					fontSize: 12,
					color: "#FFFFFF",
					width: clientWidth
				}),
				x: 0,
				y: middleY(682 / 2)
			});
			l.onShow(function() {
				h.infiniteAnimate({
					duration: 3,
					progress: {
						0: {
							opacity: 1
						},
						50: {
							opacity: 0.4
						}
					}
				})
			});
			var j = fp.slidePage();
			j.classList.add("map-slide-page");
			var g = j.appendChild(b("div.title-bar", {
				children: [b("div.icon.back"), b("div.line"), b("div.caption")]
			}));
			c.onTap(g, fp.history.back);
			var f = true;
			l.component({
				content: Content.Rect({
					width: 120,
					height: 100
				}),
				x: center(clientWidth, 120),
				y: middleY(574 / 2 - 20),
				onClick: function() {
					j.slideIn();
					if (f) {
						var m = fp.Loading(j);
						e.markerMap({
							data: k.location,
							parent: j,
							make: function(o) {
								var n = b(a);
								n.querySelector(".name").innerHTML = o.name;
								n.querySelector(".address").innerHTML = o.address;
								return n
							},
							onLoad: m.remove
						});
						f = false
					}
				}
			})
		}
	})
})();
(function() {
	var a = zachModule["0"],
		e = zachModule["2"],
		d = zachModule["4"],
		b = zachModule["6"],
		c = a.loopArray;
	registLayout("MutipleImage01", {
		create: function(m, j) {
			var g = 244,
				p = 410 * yRatio << 0,
				o = center(clientWidth, g),
				n = center(clientHeight, p),
				l = j.image.length,
				i = [],
				f = [];
			c(j.image, function(r, s) {
				var q = m.component({
					content: Content.ImageCover(r, g, p, {
						border: {
							width: 3,
							color: "#FFFFFF"
						}
					}),
					x: o,
					y: n,
					rotate: (s + 1 - l) * -4 * Math.PI / 180,
					"z-index": 10000 + s
				});
				i.push(q);
				f.push({
					component: q,
					duration: 0.8,
					delay: s * 0.4,
					progress: {
						"0": {
							rotate: -Math.PI / 6,
							scale: 3,
							x: o - g * 2.4,
							y: n + p * 2.4
						}
					}
				})
			});
			f.top.onEnter = function() {
				document.body.classList.add("MutipleImage01-show");
				var r = l - 1,
					t = null;

				function q() {
					if (t) {
						c(t, function(u) {
							u.remove()
						});
						t = null
					}
				}
				function s(u) {
					q();
					t = [];
					a.loop(l, function(w) {
						var v = i[((u + w) % l + l) % l];
						t[w] = v.transition({
							end: {
								rotate: (w + 1 - l) * -4 * Math.PI / 180
							},
							timing: b.Timing.easeOut,
							delay: 0.4 * w,
							duration: 0.8
						})
					})
				}
				d.onDragH(m, function(v) {
					if (!window.highPerformance) {
						fp.lock(true)
					}
					q();
					var u = r,
						w = i[(u % l + l) % l];
					w.transition({
						end: {
							x: v.directionX ? clientWidth : -g,
							y: n,
							opacity: 0
						},
						duration: 0.4,
						onEnd: function() {
							w.x = o;
							w.opacity = 1;
							w["z-index"] -= l;
							w.rotate = (1 - l) * -4 * Math.PI / 180;
							s(u);
							fp.lock(false)
						}
					});
					--r
				})
			};
			var h, k;
			m.onShow(function() {
				h = e.element("div.prev", window.body);
				k = e.element("div.next", window.body);
				document.body.classList.add("MutipleImage01")
			});
			m.onRemove(function() {
				e.removeNode(h);
				e.removeNode(k);
				document.body.classList.remove("MutipleImage01");
				document.body.classList.remove("MutipleImage01-show")
			});
			m.registEnterAnimation([f])
		}
	})
})();
(function() {
	var c = zachModule["0"],
		e = zachModule["2"],
		d = zachModule["4"],
		b = zachModule["9"],
		a = zachModule["12"];
	registLayout("scratch-card", {
		crossOrigin: "*",
		create: function(i, h) {
			i.component({
				content: Content.ImageCover(h.image[0], clientWidth, clientHeight),
				x: 0,
				y: 0
			});
			if (!h.complete) {
				var f = i.component({
					content: Content.ImageCover(h.image[1], clientWidth, clientHeight),
					x: 0,
					y: 0
				});
				var g = b.Layer();
				i.onShow(function() {
					ua.android && (g.dpr = 1);
					g.resize(clientWidth, clientHeight);
					g.classList.add("scratch-card");
					g.draw(function(l) {
						a.drawImageMeasure(l, a.measureCover(h.image[1], clientWidth, clientHeight))
					});
					document.body.appendChild(g);
					document.body.classList.add("hide-tips");
					var k = [];
					var j = d.onPointerDown(g, function(o, n, l) {
						var m = [],
							q = true;
						k.push(m);
						o.preventDefault();
						o.stopPropagation();
						m.push({
							x: n,
							y: l
						});
						o.onMove(function(t, s, r) {
							m.push({
								x: s,
								y: r
							})
						});
						o.onUp(function() {
							q = false
						});
						var p = e.requestAnimate(function() {
							g.draw(function(v) {
								a.drawImageMeasure(v, a.measureCover(h.image[1], clientWidth, clientHeight));
								v.lineCap = "round";
								v.lineJoin = "round";
								v.globalCompositeOperation = "destination-out";
								v.beginPath();
								c.loopArray(k, function(z) {
									c.loopArray(z, function(A, B) {
										B === 0 ? v.moveTo(A.x, A.y) : v.lineTo(A.x, A.y)
									});
									v.lineWidth = 50;
									if (ua.android) {
										g.style.display = "none";
										g.offsetHeight;
										g.style.display = "inherit"
									}
									v.stroke()
								});
								if (!q) {
									var s = false;
									p.remove();
									try {
										var x = v.getImageData(0, 0, g.width, g.height),
											y = x.data,
											u = 0;
										for (var t = 0, r = y.length; t < r; t += 4) {
											if (y[t + 3] < 128) {
												++u
											}
										}
									} catch (w) {
										s = true
									}
									if (s || u / (y.length / 4) > 0.3) {
										j.remove();
										e.transition(g, "0.8s", {
											opacity: 0
										}, function() {
											document.body.classList.remove("hide-tips");
											h.complete = true;
											e.removeNode(g)
										})
									}
								}
							})
						})
					});
					f.remove()
				});
				i.onRemove(function() {
					e.removeNode(g)
				})
			}
		}
	})
})();
(function() {
	var a = zachModule["0"],
		f = zachModule["2"],
		c = f.element,
		e = zachModule["4"];

	function d(g) {
		return g - 504 / 2 + clientHeight / 2 << 0
	}
	registLayout("Sign-Up02", {
		create: function(j, i) {
			var h = {
				top: 148,
				middle: 417,
				bottom: 687
			},
				g = 125;
			j.component({
				content: Content.ImageCover(i.image[0], clientWidth, clientHeight),
				x: 0,
				y: 0
			});
			j.component({
				content: Content.Rect({
					width: g,
					height: g
				}),
				x: (clientWidth - g) / 2 << 0,
				y: d(h[i.position[0]] / 2),
				onClick: function() {
					fp.jump(i.actionlinks[0])
				}
			})
		}
	});
	var b = registFunctionPage("sign-up", function(n, g) {
		var p = JSON.parse(g.template),
			h = c("div.page-content.scroll", n),
			j = c("form", {
				action: "/"
			}, h),
			k = c("div.icon.back", n),
			l = null,
			o = null,
			i = [],
			q = {};
		n.classList.add("sign-up-form-slide-page");
		e.onTap(k, fp.history.back);

		function m() {
			l && l.blur();
			var u = [],
				v = [];

			function t(y, z) {
				u.push({
					name: y.name,
					label: y.label,
					value: z
				})
			}
			var x = [];
			a.loopArray(i, function(y) {
				var z = y.input.value;
				if (y.data.required) {
					if (z === "") {
						v.push(y.data.label);
						y.input.classList.add("error")
					} else {
						var A = y.validate ? y.validate(z) : null;
						if (A) {
							x.push(A);
							y.input.classList.add("error")
						} else {
							t(y.data, z);
							y.input.classList.remove("error")
						}
					}
				} else {
					t(y.data, y.input.value)
				}
			});
			if (v.length !== 0 || x.length !== 0) {
				fp.alert((v.length ? [v.join("，") + "不能为空。"] : []).concat(x).join("<br>"))
			} else {
				var r = a.Loader(),
					w = fp.Loading(n),
					s = {};
				fp.lock(true, h);
				if (fp.isLogIn()) {
					r.load(function(y) {
						fp.getUserInfo(function(z) {
							s = z;
							y()
						})
					})
				}
				r.onLoad(function() {
					var y = {
						"报名时间": new Date().getTime(),
						"微信昵称": s.NickName,
						"微信头像": s.HeadPhoto,
						"微信性别": s.Sex,
						"微信City": s.City,
						"微信Province": s.Province,
						"微信Country": s.Country
					};
					a.loopObj(q, function(z, A) {
						t(A, y[z] === undefined ? "" : y[z])
					});
					fp.sendForm(function() {
						w.remove();
						fp.alert(p.data.submitComplete.value, 1000);
						setTimeout(function() {
							if (n.isIn()) {
								fp.history.back()
							}
						}, 1000)
					}, {
						id: g.formId,
						data: u
					})
				});
				r.start()
			}
		}
		f.bindEvent(j, "submit", function(r) {
			r.preventDefault()
		});
		a.loopArray(p.data.component, function(r) {
			if (r.enable) {
				if (r.visiable) {
					switch (r.name) {
					case "textbox":
						(function() {
							var v = {},
								u = c("label", j),
								t = v.caption = c("div.caption", r.label + "：", u),
								s = v.input = c("input", {
									placeholder: r.placeholder,
									name: r.id
								}, u);
							switch (r.label) {
							case "电话":
								s.type = "tel";
								break;
							case "邮箱":
								s.type = "email";
								v.validate = function(w) {
									return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(w) ? null : "请输入正确的邮箱地址"
								};
								break
							}
							f.bindEvent(s, "focus", function() {
								l = s
							});
							if (r.required) {
								c("div.required.icon", t)
							}
							if (o) {
								f.bindEvent(o, "keypress", function(w) {
									if (w.keyCode === 13) {
										s.focus()
									}
								})
							}
							o = s;
							v.data = r;
							i.push(v)
						})();
						break;
					case "btn":
						(function() {
							var s = c("label", j),
								t = c("div.button", {
									innerHTML: r.value
								}, s);
							e.onTap(t, m)
						})();
						break
					}
				} else {
					q[r.label] = r
				}
			}
		});
		if (o) {
			f.bindEvent(o, "keypress", function(r) {
				if (r.keyCode === 13) {
					m()
				}
			})
		}
	});
	registLayout("Sign-Up03", {
		create: function(i, h) {
			i.component({
				content: Content.ImageCover(h.image[0], clientWidth, clientHeight),
				x: 0,
				y: 0
			});
			var g = h.image[1];
			i.component({
				content: Content.Image(g),
				x: (clientWidth - g.halfWidth) / 2 << 0,
				y: d(208),
				onClick: function() {
					b({
						data: h.signup,
						noLog: !JSON.parse(h.signup.template).allowAnymous
					})
				}
			})
		}
	})
})();
(function() {
	var c = zachModule["2"],
		b = zachModule["4"];

	function a(d) {
		return d - 508 / 2 + clientHeight / 2 << 0
	}
	registLayout("video", {
		resource: ["layout-video-icon.png"],
		create: function(l, k) {
			var n = k.resource[0],
				m = n.halfWidth,
				g = (clientWidth - m) / 2 << 0,
				d = a(436 / 2),
				h = null;
			l.component({
				content: Content.ImageCover(k.image[0], clientWidth, clientHeight),
				x: 0,
				y: 0
			});
			var o = k.video[0],
				f = document.createElement("div"),
				j;
			f.innerHTML = o;
			if (j = f.querySelector("iframe")) {
				h = fp.slidePage();
				j.width = clientWidth;
				j.height = clientWidth / 16 * 9 << 0;
				h.classList.add("video-slide-page");
				c.css(j, {
					position: "absolute",
					left: 0,
					top: c.css.px((clientHeight - j.height) / 2 << 0)
				});
				var i = fp.Loading(h);
				j.onload = function() {
					i.remove();
					j.onload = null
				};
				h.appendChild(j);
				b.onTap(c.element("div.close", h), fp.history.back)
			}
			l.component({
				content: Content.Image(n),
				"z-index": 2,
				x: g,
				y: d,
				onClick: function() {
					if (h) {
						h.slideIn()
					} else {
						if (/(^http:\/\/)|(^https:\/\/)/.test(o)) {
							fp.jump(o)
						} else {
							alert("未识别的视频地址")
						}
					}
				}
			});
			var e = l.component({
				content: Content.Circle({
					color: "#FFFFFF",
					r: m / 2 << 0
				}),
				"z-index": 1,
				x: g,
				y: d
			});
			l.onShow(function() {
				e.infiniteAnimate({
					duration: 2.5,
					progress: {
						0: {
							scale: 1,
							opacity: 0.8
						},
						100: {
							scale: 2,
							opacity: 0
						}
					}
				})
			})
		}
	})
})();
registLayout("ImageText18", {
	create: function(b, a) {
		Component.BackgroundImageCover(b, a.image[0]);
		b.registEnterAnimation([
			[enterAnimate.emerge(b.component({
				content: Content.Image(a.image[1]),
				x: (clientWidth - a.image[1].halfWidth) / 2,
				y: clientHeight * 0.229167
			}))],
			[enterAnimate.emerge(b.component({
				content: Content.Image(a.image[2]),
				x: (clientWidth - a.image[2].halfWidth) / 2,
				y: clientHeight * 0.229167 + a.image[1].halfHeight + 29
			}))],
			[enterAnimate.emerge(b.component({
				content: Content.Image(a.image[3]),
				x: (clientWidth - a.image[3].halfWidth) / 2,
				y: clientHeight * 0.229167 + a.image[1].halfHeight + a.image[2].halfHeight + 51
			}))]
		])
	}
});
registLayout("ImageText19", {
	create: function(b, a) {
		Component.BackgroundImageCover(b, a.image[0]);
		b.registEnterAnimation([
			[enterAnimate.emerge(b.component({
				content: Content.Image(a.image[1]),
				x: (clientWidth - a.image[1].halfWidth) / 2,
				y: clientHeight * 0.84126 - a.image[3].halfHeight - a.image[2].halfHeight - a.image[1].halfHeight - 51
			}))],
			[enterAnimate.emerge(b.component({
				content: Content.Image(a.image[2]),
				x: (clientWidth - a.image[2].halfWidth) / 2,
				y: clientHeight * 0.84126 - a.image[3].halfHeight - 12 - a.image[2].halfHeight - 10
			}))],
			[enterAnimate.emerge(b.component({
				content: Content.Image(a.image[3]),
				x: (clientWidth - a.image[3].halfWidth) / 2,
				y: clientHeight * 0.84126 - a.image[3].halfHeight
			}))]
		])
	}
});
registLayout("ImageText20", {
	create: function(b, a) {
		Component.BackgroundImageCover(b, a.image[0]);
		var c = b.component({
			content: Content.BlockText({
				width: clientWidth - 150,
				fontSize: 27,
				lineHeight: 35,
				text: a.text[0],
				fontWeight: "bold",
				color: "white"
			}),
			x: 75,
			y: 95
		});
		b.registEnterAnimation([
			[enterAnimate.emerge(c)],
			[enterAnimate.emerge(b.component({
				content: Content.BlockText({
					width: clientWidth - 150,
					fontSize: 10,
					lineHeight: 20,
					text: a.text[1],
					color: "#d2d2d2"
				}),
				x: 75,
				y: 95 + c.componentHeight + 26
			}))]
		])
	}
});
(function() {
	var e = zachModule["2"],
		b = zachModule["0"],
		c = zachModule["6"],
		d = zachModule["3"],
		a = zachModule["9"];
	registSwitchAnimate("chessboard", function(r, f, g) {
		var n = e.css,
			o = n.px,
			s = prepareSnapshot(null, null, g, {
				perspective: 1000,
				background: "#FFFFFF"
			}),
			k = 4,
			j = 5,
			z = [],
			i, h = 0,
			p = 0,
			y, l, t, q;
		if (clientWidth > clientHeight) {
			k = 5;
			j = 4
		}
		b.loop(k, function(A) {
			y = (A + 1) / k * clientWidth << 0;
			p = 0;
			i = [];
			z.push(i);
			b.loop(j, function(C) {
				l = (C + 1) / j * clientHeight << 0;
				t = y - h;
				q = l - p;
				var B = [];
				B.start = Math.random();
				B.isTurn = false;
				b.loop(2, function(F) {
					var D = F === 0 ? r : f,
						E = a.Layer();
					E.resize(t, q);
					E.draw(function(H) {
						var G = H.dpr;
						H.drawImage(D, h * G, p * G, t * G, q * G, 0, 0, t, q)
					});
					n(E, {
						position: "absolute",
						left: o(h),
						top: o(p),
						"backface-visibility": "hidden",
						"z-index": 2 - F
					});
					window.body.appendChild(E);
					B.push(E)
				});
				i.push(B);
				p = l
			});
			h = y
		});

		function w(A, B) {
			var C = A[0],
				D = A[1];
			if (!A.isTurn && B < 0.5) {
				n(C, "z-index", 1);
				n(D, "z-index", 0);
				A.isTurn = true
			}
			if (A.isTurn && B >= 0.5) {
				n(C, "z-index", 0);
				n(D, "z-index", 1);
				A.isTurn = false
			}
			n.transform(C, n.rotateY(B * Math.PI));
			n.transform(D, n.rotateY(B * Math.PI + Math.PI))
		}
		var x = 0.4,
			v = 1 / x,
			m = (1 - x) / 2,
			u = 1 - x - m;
		return {
			duration: 1.6,
			timing: c.Timing.linear,
			onAnimate: function(D) {
				n(r, "visibility", "hidden");
				n(f, "visibility", "hidden");
				var B;
				for (var C = 0; C !== k; ++C) {
					for (var A = 0; A !== j; ++A) {
						B = z[C][A];
						w(B, d.range((D - C / (k - 1) * u - B.start * m) * v, 0, 1))
					}
				}
			},
			onEnd: function() {
				s();
				for (var B = 0; B !== k; ++B) {
					for (var A = 0; A !== j; ++A) {
						for (var C = 0; C !== 2; ++C) {
							e.removeNode(z[B][A][C])
						}
					}
				}
			}
		}
	})
})();
(function() {
	var b = zachModule["2"],
		a = zachModule["6"];
	registSwitchAnimate("cube", function(h, i, d) {
		var e = b.css,
			g = false,
			f = clientWidth / 2,
			c = prepareSnapshot(h, i, d, {
				perspective: 1000,
				background: "#FFFFFF"
			});
		return {
			duration: 1,
			timing: a.Timing.linear,
			onAnimate: function(m) {
				if (!g && m < 0.5) {
					e(h, "z-index", 6);
					e(i, "z-index", 5);
					g = true
				}
				if (g && m >= 0.5) {
					g = false;
					e(h, "z-index", 5);
					e(i, "z-index", 6)
				}
				var j = m * Math.PI / 2,
					n = m * Math.PI / 2 - Math.PI / 2,
					l = Math.cos(j) * f - f,
					k = l + Math.sin(j) * f;
				e.transform(h, e.translate(-f * Math.sin(j), 0, l - k), e.rotateY(-j));
				e.transform(i, e.translate(-f * Math.sin(n), 0, Math.cos(n) * f - f - k), e.rotateY(-n))
			},
			onEnd: c
		}
	})
})();
(function() {
	var c = zachModule["2"],
		a = zachModule["6"],
		b = zachModule["3"];
	registSwitchAnimate("fade", function(d, e) {
		return {
			duration: 0.8,
			timing: a.Timing.linear,
			onDraw: function(g, f) {
				f = b.range(f, 0, 1);
				g.save();
				g.globalAlpha = 1 - f;
				g.drawImage(d, 0, 0, clientWidth, clientHeight);
				g.globalAlpha = f;
				g.drawImage(e, 0, 0, clientWidth, clientHeight);
				g.restore()
			}
		}
	});
	registSwitchAnimate("fade-dom", function(g, h, e) {
		var f = c.css,
			d = prepareSnapshot(g, h, e, {});
		return {
			duration: 0.8,
			timing: a.Timing.linear,
			onAnimate: function(i) {
				f(g, "opacity", 1 - i);
				f(h, "opacity", i)
			},
			onEnd: d
		}
	})
})();
(function() {
	var b = zachModule["2"],
		a = zachModule["6"];
	registSwitchAnimate("overturn", function(h, i, d) {
		var e = b.css,
			g = false,
			f = clientWidth / 2,
			c = prepareSnapshot(h, i, d, {
				perspective: 1000,
				background: "#FFFFFF"
			});
		return {
			duration: 1,
			timing: a.Timing.linear,
			onAnimate: function(j) {
				if (!g && j < 0.5) {
					e(h, "z-index", 6);
					e(i, "z-index", 5);
					g = true
				}
				if (g && j >= 0.5) {
					g = false;
					e(h, "z-index", 5);
					e(i, "z-index", 6)
				}
				var k = Math.sin((0.5 - Math.abs(j - 0.5)) * Math.PI) * f * 0.6;
				e.transform(h, e.translate(0, 0, -k), e.rotateY(j * Math.PI));
				e.transform(i, e.translate(0, 0, -k), e.rotateY(j * Math.PI + Math.PI))
			},
			onEnd: c
		}
	})
})();
registSwitchAnimate("push", function(a, b) {
	return {
		duration: 0.8,
		onDraw: function(d, c) {
			d.save();
			d.drawImage(a, 0, -c * clientHeight, clientWidth, clientHeight);
			d.drawImage(b, 0, (1 - c) * clientHeight, clientWidth, clientHeight);
			d.restore()
		}
	}
});
(function() {
	var b = zachModule["2"],
		a = zachModule["6"];
	registSwitchAnimate("switch", function(g, i, d) {
		var e = b.css,
			f = false,
			h = clientWidth / 2,
			c = prepareSnapshot(g, i, d, {
				perspective: 1200,
				background: "#FFFFFF"
			});
		return {
			duration: 1,
			timing: a.Timing.linear,
			onAnimate: function(j) {
				j = j * 2;
				if (j <= 1) {
					if (!f) {
						e(i, "z-index", 5);
						e(g, "z-index", 6);
						f = true
					}
					e.transform(g, e.translate(j * h << 0, 0, -j * 150), e.rotateY(-j * 30, "deg"));
					e.transform(i, e.translate(-j * h << 0, 0, -150 + (1 - j) * -150), e.rotateY(j * 30, "deg"))
				} else {
					j = j - 1;
					var k = 1 - j;
					if (f) {
						e(i, "z-index", 6);
						e(g, "z-index", 5);
						f = false
					}
					e.transform(g, e.translate(k * h << 0, 0, -150 + j * -150), e.rotateY(-k * 30, "deg"));
					e.transform(i, e.translate(-k * h << 0, 0, (1 - j) * -150), e.rotateY(k * 30, "deg"))
				}
			},
			onEnd: c
		}
	})
})();
(function() {
	var a = zachModule["0"],
		b = zachModule["6"];
	registSwitchAnimate("tease", function(c, d) {
		return {
			duration: 0.8,
			timing: b.Timing.linear,
			onDraw: function(h, e) {
				var g = h.dpr,
					f = clientWidth * g;
				h.drawImage(d, 0, 0, clientWidth, clientHeight);
				a.loop(8, function(l) {
					var n = l / 8 * clientHeight << 0,
						k = (l + 1) / 8 * clientHeight << 0,
						j = k - n;
					var m = Math.max(e * 2 + (l + 1) / 8 - 1, 0);
					h.drawImage(c, 0, n * g, f, j * g, (l % 2 === 0 ? 1 : -1) * m * m * clientWidth, n, clientWidth, j)
				})
			}
		}
	})
})();