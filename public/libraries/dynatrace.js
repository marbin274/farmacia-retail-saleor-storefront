(function () {
  if (typeof window !== 'undefined' && window.setTimeout) {
    window.setTimeout = window.setTimeout;
  }
  var Promise = (this.dT_ && dT_.prm && dT_.prm()) || this.Promise;
  (function () {
    function Fa() {
      document.cookie = '__dTCookie=1;SameSite=Lax';
      var F = -1 !== document.cookie.indexOf('__dTCookie');
      document.cookie = '__dTCookie=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
      return F;
    }
    function lb() {
      return void 0 === kb.dialogArguments
        ? navigator.cookieEnabled || Fa()
        : Fa();
    }
    function tb() {
      var F;
      if (lb() && !window.dT_) {
        var Ra =
          ((F = {}),
          (F.cfg =
            'app=3f2f442a27d3348d|cors=1|rcdec=1209600000|featureHash=A2SVfqru|vcv=2|reportUrl=https://bf68041miu.bf.dynatrace.com/bf|rdnt=1|uxrgce=1|srcss=1|bp=3|srmcrv=10|cuc=9g9w4xy5|mel=100000|dpvc=1|ssv=4|lastModification=1625071233888|dtVersion=10219210628133341|srmcrl=1|tp=500,50,0,1|uxdcw=1500|vs=2|featureHash=A2SVfqru|agentUri=https://js-cdn.dynatrace.com/jstag/157944990f8/ruxitagent_A2SVfqru_10219210628133341.js|auto=|domain=|rid=RID_|rpid=|app=3f2f442a27d3348d'),
          (F.iCE = lb),
          F);
        window.dT_ = Ra;
      }
    }
    var kb = 'undefined' !== typeof window ? window : self,
      bb;
    kb.dT_
      ? (null === (bb = kb.console) || void 0 === bb
          ? void 0
          : bb.log(
              'Duplicate agent injection detected, turning off redundant initConfig.'
            ),
        (kb.dT_.di = 1))
      : tb();
  })();
}.call(this));
(function () {
  if (typeof window !== 'undefined' && window.setTimeout) {
    window.setTimeout = window.setTimeout;
  }
  var Promise = (this.dT_ && dT_.prm && dT_.prm()) || this.Promise;
  (function () {
    function Fa() {}
    function lb(q, z, L) {
      void 0 === L && (L = 0);
      var la = -1;
      z &&
        (null === q || void 0 === q ? 0 : q.indexOf) &&
        (la = q.indexOf(z, L));
      return la;
    }
    function tb() {
      var q;
      return !(null === (q = ub.console) || void 0 === q || !q.log);
    }
    function kb(q, z) {
      if (!z) return '';
      var L = q + '=';
      q = lb(z, L);
      if (0 > q) return '';
      for (; 0 <= q; ) {
        if (0 === q || ' ' === z.charAt(q - 1) || ';' === z.charAt(q - 1))
          return (
            (L = q + L.length),
            (q = lb(z, ';', q)),
            0 <= q ? z.substring(L, q) : z.substr(L)
          );
        q = lb(z, L, q + L.length);
      }
      return '';
    }
    function bb(q) {
      return kb(q, document.cookie);
    }
    function F() {
      var q = 0;
      try {
        q = Math.round(ub.performance.timeOrigin);
      } catch (L) {}
      if (0 >= q || isNaN(q) || !isFinite(q)) {
        q = ub.dT_;
        var z = 0;
        try {
          z = ub.performance.timing.navigationStart;
        } catch (L) {}
        q = 0 >= z || isNaN(z) || !isFinite(z) ? q.gAST() : z;
      }
      ef = q;
      zf = Ra;
      return ef;
    }
    function Ra() {
      return ef;
    }
    function db() {
      return zf();
    }
    function Ia() {
      var q,
        z = 0;
      if (
        null === (q = null === ub || void 0 === ub ? void 0 : ub.performance) ||
        void 0 === q
          ? 0
          : q.now
      )
        try {
          z = Math.round(ub.performance.now());
        } catch (L) {}
      return 0 >= z || isNaN(z) || !isFinite(z)
        ? new Date().getTime() - zf()
        : z;
    }
    function S(q, z) {
      void 0 === z && (z = document.cookie);
      return kb(q, z);
    }
    function ka() {}
    function T(q, z) {
      return function () {
        q.apply(z, arguments);
      };
    }
    function ya(q) {
      if (!(this instanceof ya))
        throw new TypeError('Promises must be constructed via new');
      if ('function' !== typeof q) throw new TypeError('not a function');
      this.Y = 0;
      this.Sa = !1;
      this.aa = void 0;
      this.ma = [];
      O(q, this);
    }
    function Ka(q, z) {
      for (; 3 === q.Y; ) q = q.aa;
      0 === q.Y
        ? q.ma.push(z)
        : ((q.Sa = !0),
          ya.X(function () {
            var L = 1 === q.Y ? z.uc : z.vc;
            if (null === L) (1 === q.Y ? ob : Aa)(z.Aa, q.aa);
            else {
              try {
                var la = L(q.aa);
              } catch (gb) {
                Aa(z.Aa, gb);
                return;
              }
              ob(z.Aa, la);
            }
          }));
    }
    function ob(q, z) {
      try {
        if (z === q)
          throw new TypeError('A promise cannot be resolved with itself.');
        if (z && ('object' === typeof z || 'function' === typeof z)) {
          var L = z.then;
          if (z instanceof ya) {
            q.Y = 3;
            q.aa = z;
            Da(q);
            return;
          }
          if ('function' === typeof L) {
            O(T(L, z), q);
            return;
          }
        }
        q.Y = 1;
        q.aa = z;
        Da(q);
      } catch (la) {
        Aa(q, la);
      }
    }
    function Aa(q, z) {
      q.Y = 2;
      q.aa = z;
      Da(q);
    }
    function Da(q) {
      2 === q.Y &&
        0 === q.ma.length &&
        ya.X(function () {
          q.Sa || ya.na(q.aa);
        });
      for (var z = 0, L = q.ma.length; z < L; z++) Ka(q, q.ma[z]);
      q.ma = null;
    }
    function ha(q, z, L) {
      this.uc = 'function' === typeof q ? q : null;
      this.vc = 'function' === typeof z ? z : null;
      this.Aa = L;
    }
    function O(q, z) {
      var L = !1;
      try {
        q(
          function (la) {
            L || ((L = !0), ob(z, la));
          },
          function (la) {
            L || ((L = !0), Aa(z, la));
          }
        );
      } catch (la) {
        L || ((L = !0), Aa(z, la));
      }
    }
    function U() {
      ya.X = function (q) {
        if ('string' === typeof q)
          throw Error('Promise polyfill called _immediateFn with string');
        q();
      };
      ya.na = function () {};
      return ya;
    }
    function qa(q, z, L, la) {
      'undefined' === typeof la && (la = ra(z, !0));
      'boolean' === typeof la && (la = ra(z, la));
      if (q === ub) Ed ? Ed(z, L, la) : yg && yg('on' + z, L);
      else if (Af && ub.dT_.iIO(q, 21)) zg.call(q, z, L, la);
      else if (q.addEventListener)
        if (q === ub.document || q === ub.document.documentElement)
          Yf.call(q, z, L, la);
        else
          try {
            Ed.call(q, z, L, la);
          } catch (ic) {
            q.addEventListener(z, L, la);
          }
      else q.attachEvent && q.attachEvent('on' + z, L);
      la = !1;
      for (var gb = qe.length; 0 <= --gb; ) {
        var Eb = qe[gb];
        if (Eb.object === q && Eb.event === z && Eb.H === L) {
          la = !0;
          break;
        }
      }
      la || ub.dT_.apush(qe, { object: q, event: z, H: L });
    }
    function Y(q, z, L, la) {
      for (var gb = qe.length; 0 <= --gb; ) {
        var Eb = qe[gb];
        if (Eb.object === q && Eb.event === z && Eb.H === L) {
          qe.splice(gb, 1);
          break;
        }
      }
      'undefined' === typeof la && (la = ra(z, !0));
      'boolean' === typeof la && (la = ra(z, la));
      q === ub
        ? Wd
          ? Wd(z, L, la)
          : yg && yg('on' + z, L)
        : q.removeEventListener
        ? q === ub.document || q === ub.document.documentElement
          ? Zf.call(q, z, L, la)
          : Wd.call(q, z, L, la)
        : q.detachEvent && q.detachEvent('on' + z, L);
    }
    function ra(q, z) {
      var L = !1;
      try {
        var la = ub.dT_;
        if (Ed && -1 < la.aIOf(Ag, q)) {
          var gb = Object.defineProperty({}, 'passive', {
            get: function () {
              L = !0;
            },
          });
          Ed('test', Fa, gb);
        }
      } catch (Eb) {}
      return L ? { passive: !0, capture: z } : z;
    }
    function P() {
      for (var q = qe, z = q.length; 0 <= --z; ) {
        var L = q[z];
        Y(L.object, L.event, L.H);
      }
      qe = [];
    }
    function ma() {
      for (var q = 0, z = 0, L = arguments.length; z < L; z++)
        q += arguments[z].length;
      q = Array(q);
      var la = 0;
      for (z = 0; z < L; z++)
        for (var gb = arguments[z], Eb = 0, ic = gb.length; Eb < ic; Eb++, la++)
          q[la] = gb[Eb];
      return q;
    }
    function Z(q) {
      return (
        'function' === typeof q &&
        /{\s+\[native code]/.test(Function.prototype.toString.call(q))
      );
    }
    function Ga(q, z) {
      for (var L, la = [], gb = 2; gb < arguments.length; gb++)
        la[gb - 2] = arguments[gb];
      return void 0 !== Function.prototype.bind && Z(Function.prototype.bind)
        ? (L = Function.prototype.bind).call.apply(L, ma([q, z], la))
        : function () {
            for (var Eb = 0; Eb < arguments.length; Eb++);
            return q.apply(
              z,
              (la || []).concat(Array.prototype.slice.call(arguments) || [])
            );
          };
    }
    function Qa() {
      if (re) {
        var q = new re();
        if (Pe)
          for (var z = 0, L = $f; z < L.length; z++) {
            var la = L[z];
            void 0 !== Pe[la] && (q[la] = Ga(Pe[la], q));
          }
        return q;
      }
      return Bg
        ? new Bg('MSXML2.XMLHTTP.3.0')
        : ub.XMLHttpRequest
        ? new ub.XMLHttpRequest()
        : new ub.ActiveXObject('MSXML2.XMLHTTP.3.0');
    }
    function hb() {
      return 0 <= ub.dT_.io(navigator.userAgent, 'RuxitSynthetic');
    }
    function zb(q, z) {
      return parseInt(q, z || 10);
    }
    function Mb(q) {
      return document.getElementsByTagName(q);
    }
    function Va(q) {
      var z = q.length;
      if ('number' === typeof z) q = z;
      else {
        z = 0;
        for (var L = 2048; q[L - 1]; ) (z = L), (L += L);
        for (var la = 7; 1 < L - z; )
          (la = (L + z) / 2), q[la - 1] ? (z = la) : (L = la);
        q = q[la] ? L : z;
      }
      return q;
    }
    function Ca(q) {
      for (var z = [], L = 1; L < arguments.length; L++)
        z[L - 1] = arguments[L];
      q.push.apply(q, z);
    }
    function Ea(q) {
      q = encodeURIComponent(q);
      var z = [];
      if (q)
        for (var L = 0; L < q.length; L++) {
          var la = q.charAt(L);
          Ca(z, ff[la] || la);
        }
      return z.join('');
    }
    function Na() {
      var q = ub.dT_;
      return !q.bcv('coo') || q.bcv('cooO') || hb();
    }
    function ea(q, z) {
      if (Na() && (!ub.dT_.overloadPrevention || hb()))
        return q.apply(this, z || []);
    }
    function Ha(q, z) {
      try {
        var L = gf;
        L && L.setItem(q, z);
      } catch (la) {}
    }
    function ib(q, z) {
      ea(Ha, [q, z]);
    }
    function Ya(q) {
      try {
        var z = gf;
        if (z) return z.getItem(q);
      } catch (L) {}
      return null;
    }
    function mb(q) {
      try {
        var z = gf;
        z && z.removeItem(q);
      } catch (L) {}
    }
    function Ob(q) {
      return 32 === q.length || 12 >= q.length ? q : '';
    }
    function ab(q) {
      q = q.replace('-2D', '-');
      if (!isNaN(Number(q))) {
        var z = zb(q);
        if (-99 <= z && 99 >= z) return q;
      }
      return '';
    }
    function Jb(q) {
      var z = { sessionId: '', $a: '', za: 0 },
        L = lb(q, '|'),
        la = q;
      -1 !== L && (la = q.substring(0, L));
      L = lb(la, '$');
      -1 !== L
        ? ((z.sessionId = Ob(la.substring(L + 1))),
          (z.$a = ab(la.substring(0, L))))
        : (z.sessionId = Ob(la));
      return z;
    }
    function Sa(q) {
      var z = { sessionId: '', $a: '', za: 0 };
      q = q.split('v' === q.charAt(0) ? '_' : '=');
      if (2 < q.length && 0 === q.length % 2) {
        var L = Number(q[1]);
        if (isNaN(L) || 3 > L) return z;
        L = {};
        for (var la = 2; la < q.length; la++) (L[q[la]] = q[la + 1]), la++;
        L.sn ? (z.sessionId = Ob(L.sn)) : (z.sessionId = 'hybrid');
        L.srv && (z.$a = ab(L.srv));
        q = Number(L.ol);
        1 === q &&
          ((L = hb()),
          (la = ub.dT_),
          L ||
            (ib('dtDisabled', 'true'),
            (la.disabled = !0),
            (la.overloadPrevention = !0)));
        0 <= q && 2 >= q && (z.za = q);
      }
      return z;
    }
    function pb() {
      try {
        ph.apply(ub.parent, arguments);
      } catch (q) {}
    }
    function ja() {
      try {
        Cg.apply(ub.top, arguments);
      } catch (q) {}
    }
    function na(q) {
      var z = Array.prototype.slice.call(arguments, 1);
      try {
        id.apply(q, z);
      } catch (L) {}
    }
    function Ta(q) {
      var z = Array.prototype.slice.call(arguments, 1);
      try {
        ag.apply(q, z);
      } catch (L) {}
    }
    function W() {
      var q,
        z = ub.dT_;
      Promise = U();
      var L;
      re = ub.XMLHttpRequest;
      Bg = ub.ActiveXObject;
      var la =
        null === (L = ub.XMLHttpRequest) || void 0 === L ? void 0 : L.prototype;
      if (la) {
        Pe = {};
        L = 0;
        for (var gb = $f; L < gb.length; L++) {
          var Eb = gb[L];
          void 0 !== la[Eb] && (Pe[Eb] = la[Eb]);
        }
      }
      Ed = ub.addEventListener;
      Wd = ub.removeEventListener;
      Yf = ub.document.addEventListener;
      Zf = ub.document.removeEventListener;
      bg = ub.setTimeout;
      hf = ub.setInterval;
      Bf || ((se = ub.clearTimeout), (cg = ub.clearInterval));
      z = z.iCE ? z.iCE() : navigator.cookieEnabled;
      la =
        1 ===
        Sa(
          S('dtAdkSettings') ||
            (null === (q = te) || void 0 === q
              ? void 0
              : q.getItem('dtAdkSettings')) ||
            ''
        ).za;
      tb();
      if (z) {
        if (
          la ||
          !(
            'complete' !== document.readyState ||
            (ub.performance && ub.performance.timing)
          )
        )
          return !1;
      } else return !1;
      return !0;
    }
    function ua() {
      return $c();
    }
    function ta(q, z) {
      function L() {
        delete Qe[Eb];
        q.apply(this, arguments);
      }
      for (var la = [], gb = 2; gb < arguments.length; gb++)
        la[gb - 2] = arguments[gb];
      if ('apply' in bg) {
        la.unshift(L, z);
        var Eb = bg.apply(ub, la);
      } else Eb = bg(L, z);
      Qe[Eb] = !0;
      return Eb;
    }
    function Wa(q) {
      delete Qe[q];
      'apply' in se ? se.call(ub, q) : se(q);
    }
    function vb(q) {
      Ca(Cf, q);
    }
    function Bb(q) {
      for (var z = Cf.length; z--; )
        if (Cf[z] === q) {
          Cf.splice(z, 1);
          break;
        }
    }
    function Wb() {
      return Cf;
    }
    function Oa(q, z) {
      return hf(q, z);
    }
    function ba(q) {
      cg(q);
    }
    function G(q, z) {
      if (!Dg || !qh) return '';
      q = new Dg([q], { type: z });
      return qh(q);
    }
    function J(q, z) {
      return zd ? new zd(q, z) : void 0;
    }
    function Q(q) {
      'function' === typeof q && Ca(fj, q);
    }
    function x() {
      return fj;
    }
    function A() {
      return Re;
    }
    function M(q) {
      return function () {
        for (var z = [], L = 0; L < arguments.length; L++) z[L] = arguments[L];
        if ('number' !== typeof z[0] || !Qe[z[0]])
          try {
            return q.apply(this, z);
          } catch (la) {
            return q(z[0]);
          }
      };
    }
    function N() {
      return jf;
    }
    function K() {
      zf = F;
      ub.performance &&
        ($c = function () {
          return Math.round(zf() + Ia());
        });
      if (!$c || isNaN($c()) || 0 >= $c() || !isFinite($c()))
        $c = function () {
          return new Date().getTime();
        };
    }
    function Ja() {
      Bf && ((ub.clearTimeout = se), (ub.clearInterval = cg), (Bf = !1));
    }
    function La(q) {
      -1 < ub.dT_.io(q, '^') &&
        ((q = q.split('^^').join('^')),
        (q = q.split('^dq').join('"')),
        (q = q.split('^rb').join('>')),
        (q = q.split('^lb').join('<')),
        (q = q.split('^p').join('|')),
        (q = q.split('^e').join('=')),
        (q = q.split('^s').join(';')),
        (q = q.split('^c').join(',')),
        (q = q.split('^bs').join('\\')));
      return q;
    }
    function $a() {
      return Se;
    }
    function sb(q) {
      Se = q;
    }
    function Kb(q) {
      var z = ub.dT_,
        L = z.scv('rid');
      z = z.scv('rpid');
      L && (q.rid = L);
      z && (q.rpid = z);
    }
    function Nb(q) {
      if ((q = q.xb)) {
        q = La(q);
        try {
          Se = new RegExp(q, 'i');
        } catch (z) {}
      } else Se = void 0;
    }
    function Yb(q) {
      return 'n' === q || 's' === q || 'l' === q ? ';SameSite=' + Eg[q] : '';
    }
    function pa(q, z, L) {
      var la = 1,
        gb = 0;
      do
        (document.cookie =
          q +
          '=""' +
          (z ? ';domain=' + z : '') +
          ';path=' +
          L.substr(0, la) +
          '; expires=Thu, 01 Jan 1970 00:00:01 GMT;'),
          (la = L.indexOf('/', la)),
          gb++;
      while (-1 !== la && 5 > gb);
    }
    function Ma(q) {
      var z = {},
        L = 0;
      for (q = q.split('|'); L < q.length; L++) {
        var la = q[L].split('=');
        2 === la.length &&
          (z[la[0]] = decodeURIComponent(la[1].replace(/\+/g, ' ')));
      }
      return z;
    }
    function Za() {
      var q = oc('csu');
      return (
        (q.indexOf('dbg') === q.length - 3 ? q.substr(0, q.length - 3) : q) +
        '_' +
        oc('app') +
        '_Store'
      );
    }
    function eb(q, z, L) {
      z = z || {};
      var la = 0;
      for (q = q.split('|'); la < q.length; la++) {
        var gb = q[la],
          Eb = gb,
          ic = lb(gb, '=');
        -1 === ic
          ? (z[Eb] = '1')
          : ((Eb = gb.substring(0, ic)),
            (z[Eb] = gb.substring(ic + 1, gb.length)));
      }
      !L &&
        ((L = z), (la = L.spc)) &&
        ((q = document.createElement('textarea')),
        (q.innerHTML = la),
        (L.spc = q.value));
      return z;
    }
    function Ab(q) {
      var z;
      return null !== (z = qc[q]) && void 0 !== z ? z : kf[q];
    }
    function Lb(q) {
      q = Ab(q);
      return 'false' === q || '0' === q ? !1 : !!q;
    }
    function Vb(q) {
      var z = Ab(q);
      z = zb(z);
      isNaN(z) && (z = kf[q]);
      return z;
    }
    function oc(q) {
      return String(Ab(q) || '');
    }
    function rc(q, z) {
      qc[q] = String(z);
    }
    function Gc(q) {
      qc = q;
      q = Te;
      for (var z in q) q.hasOwnProperty(z) && q[z] && (qc[z] = q[z]);
      return qc;
    }
    function Cc(q) {
      qc[q] = 0 > lb(qc[q], '#' + q.toUpperCase()) ? qc[q] : '';
    }
    function Xc(q) {
      var z = q.agentUri;
      z &&
        -1 < lb(z, '_') &&
        (z = /([a-zA-Z]*)[0-9]{0,4}_([a-zA-Z_0-9]*)_[0-9]+/g.exec(z)) &&
        z.length &&
        2 < z.length &&
        ((q.csu = z[1]), (q.featureHash = z[2]));
    }
    function Yc(q) {
      var z = q.domain || '';
      var L =
        (L = location.hostname) && z
          ? L === z || -1 !== L.indexOf('.' + z, L.length - ('.' + z).length)
          : !0;
      if (!z || !L) {
        q.domainOverride ||
          ((q.domainOverride = location.hostname + ',' + z), delete q.domain);
        var la = oc('cssm');
        var gb = document.domain || '';
        if (gb) {
          gb = gb.split('.').reverse();
          var Eb = gb.length;
          if (1 >= Eb) la = '';
          else {
            for (var ic = gb[0], mc = '', uc = 1; uc <= Eb; uc++)
              if (S('dTValidationCookie')) {
                mc = ic;
                break;
              } else {
                gb[uc] && (ic = gb[uc] + '.' + ic);
                var Ba =
                  'dTValidationCookie=dTValidationCookieValue;path=/;domain=' +
                  ic;
                Ba += Yb(la);
                document.cookie = Ba;
              }
            pa('dTValidationCookie', mc, '/');
            la = mc;
          }
        } else la = '';
        la && (q.domain = la);
        L ||
          Ca(jf, {
            type: 'dpi',
            severity: 'Warning',
            text:
              'Configured domain "' +
              z +
              '" is invalid for current location "' +
              location.hostname +
              '". Agent will use "' +
              q.domain +
              '" instead.',
          });
      }
    }
    function xc(q, z) {
      Yc(q);
      qc.pVO && (q.pVO = qc.pVO);
      z || ((z = q.bp || kf.bp), q.bp2 && (z = 2), (q.bp = String(z)));
    }
    function zc() {
      return qc;
    }
    function Pc(q) {
      return kf[q] === Ab(q);
    }
    function Lc(q, z) {
      try {
        ub.localStorage && ub.localStorage.setItem(q, z);
      } catch (L) {}
    }
    function Hc(q) {
      try {
        if (ub.localStorage) return ub.localStorage.getItem(q);
      } catch (z) {}
      return null;
    }
    function Zb(q) {
      try {
        ub.localStorage && ub.localStorage.removeItem(q);
      } catch (z) {}
    }
    function Ib() {
      Zb('rxec');
      Zb('rxvisitid');
      Zb('rxvt');
    }
    function jc(q) {
      document.cookie =
        q +
        '="";path=/' +
        (oc('domain') ? ';domain=' + oc('domain') : '') +
        '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    function Ac(q, z, L, la) {
      rh = !0;
      z || 0 === z
        ? ((z = String(z).replace(/[;\n\r]/g, '_')),
          (q =
            q +
            '=' +
            z +
            ';path=/' +
            (oc('domain') ? ';domain=' + oc('domain') : '')),
          L && (q += ';expires=' + L.toUTCString()),
          (q += Yb(oc('cssm'))),
          la && 'https:' === location.protocol && (q += ';Secure'),
          (document.cookie = q))
        : jc(q);
      rh = !1;
    }
    function yb(q, z, L, la) {
      ea(Ac, [q, z, L, la]);
    }
    function Ic(q) {
      return 2 < (null === q || void 0 === q ? void 0 : q.split('$').length)
        ? !1
        : /^[0-9A-Za-z_=:$+\/.\-*%|]*$/.test(q);
    }
    function bd(q) {
      q = S('dtCookie', q);
      q || ((q = Ya('dtCookie')) && Ic(q) ? Uc(q) : (q = ''));
      return Ic(q) ? q : '';
    }
    function Uc(q) {
      yb('dtCookie', q, void 0, Lb('ssc'));
    }
    function od(q) {
      Na() ? q() : (Kd || (Kd = []), Ca(Kd, q));
    }
    function Ue(q) {
      return ea(q);
    }
    function Ld() {
      if (Lb('coo') && !Na()) {
        for (var q = 0, z = Kd; q < z.length; q++) ta(z[q], 0);
        Kd = [];
        rc('cooO', !0);
      }
    }
    function ue() {
      if (Lb('coo') && Na()) {
        rc('cooO', !1);
        jc('dtCookie');
        jc('dtPC');
        jc('dtLatC');
        jc('dtSa');
        jc('dtAdk');
        jc('rxVisitor');
        jc('rxvt');
        try {
          mb('rxec');
          mb('rxvisitid');
          mb('rxvt');
          Ib();
          var q = gf;
          q && (q.removeItem('rxVisitor'), q.removeItem('dtCookie'));
          if ((q = te)) q.removeItem(Za()), q.removeItem('dtAdk');
        } catch (z) {}
      }
    }
    function Ve(q) {
      return document.cookie ? document.cookie.split(q + '=').length - 1 : 0;
    }
    function je(q) {
      var z = Ve(q);
      if (1 < z) {
        var L = oc('domain') || ub.location.hostname,
          la = ub.location.hostname,
          gb = ub.location.pathname,
          Eb = 0,
          ic = 0;
        ve.push(q);
        do {
          var mc = la.substr(Eb);
          if (mc !== L || '/' !== gb) {
            pa(q, mc === L ? '' : mc, gb);
            var uc = Ve(q);
            uc < z && (ve.push(mc), (z = uc));
          }
          Eb = la.indexOf('.', Eb) + 1;
          ic++;
        } while (0 !== Eb && 10 > ic && 1 < z);
        oc('domain') && 1 < z && pa(q, '', gb);
      }
    }
    function Xd() {
      je('dtPC');
      je('dtCookie');
      je('dtLatC');
      je('rxvt');
      0 < ve.length &&
        Ca(jf, {
          severity: 'Error',
          type: 'dcn',
          text:
            'Duplicate cookie name' +
            (1 !== ve.length ? 's' : '') +
            ' detected: ' +
            ve.join(', '),
        });
      vb(function (q, z, L, la) {
        0 < ve.length && !z && (q.av(la, 'dCN', ve.join(',')), (ve = []));
        0 < Fd.length && !z && (q.av(la, 'eCC', Fd.join(',')), (Fd = []));
      });
    }
    function be(q) {
      var z = q,
        L = Math.pow(2, 32);
      return function () {
        z = (1664525 * z + 1013904223) % L;
        return z / L;
      };
    }
    function Zc(q, z) {
      return isNaN(q) || isNaN(z)
        ? Math.floor(33 * lf())
        : Math.floor(lf() * (z - q + 1)) + q;
    }
    function ke(q) {
      if (!q) return '';
      var z = ub.crypto || ub.msCrypto;
      if (z && -1 === lb(navigator.userAgent, 'Googlebot'))
        z = z.getRandomValues(new Uint8Array(q));
      else {
        z = [];
        for (var L = 0; L < q; L++) z.push(Zc(0, 32));
      }
      q = [];
      for (L = 0; L < z.length; L++) {
        var la = Math.abs(z[L] % 32);
        q.push(String.fromCharCode(la + (9 >= la ? 48 : 55)));
      }
      return q.join('');
    }
    function jd() {
      return Df;
    }
    function v(q, z) {
      if (!q || !q.length) return -1;
      if (q.indexOf) return q.indexOf(z);
      for (var L = q.length; L--; ) if (q[L] === z) return L;
      return -1;
    }
    function t(q) {
      q &&
        (null === q || void 0 === q ? 0 : q.configurable) &&
        q.set &&
        q.get &&
        Object.defineProperty(document, 'cookie', {
          get: function () {
            return q.get.call(document);
          },
          set: function (z) {
            var L = z.split('=')[0];
            q.set.call(document, z);
            rh
              ? 1 < Ve(L) && ve.push(L)
              : -1 < v(dg, L) &&
                (Fd.push(L),
                -1 === v(Ef, L) &&
                  (Ca(Ef, L),
                  Ca(jf, {
                    severity: 'Error',
                    type: 'ecm',
                    text:
                      'Invalid modification of agent cookie ' +
                      L +
                      ' detected. Modifying Dynatrace cookies may result in missing or invalid data.',
                  })));
          },
        });
    }
    function u(q) {
      void 0 === q && (q = !0);
      Fg = q;
    }
    function V(q) {
      if (1 <= q.length && !isNaN(q[0].rb)) return q[0].rb;
      q = Ya('rxec') || '';
      q = zb(q);
      return isNaN(q) ? (2 <= Vb('vs') ? 0 : -1) : q;
    }
    function oa(q) {
      if ((q = q || bd())) {
        var z = q.charAt(0);
        return 'v' === z || '=' === z ? Sa(q) : Jb(q);
      }
      return { sessionId: '', $a: '', za: 0 };
    }
    function Xa(q) {
      return oa(q).$a;
    }
    function fb(q) {
      return oa(q).sessionId;
    }
    function nb(q, z, L, la) {
      var gb = Vb('pcl');
      gb = q.length - gb;
      0 < gb && q.splice(0, gb);
      gb = Xa(S('dtCookie', la));
      for (var Eb = [], ic = gb ? gb + '$' : '', mc = 0; mc < q.length; mc++) {
        var uc = q[mc];
        '-' !== uc.D && Eb.push(ic + uc.frameId + 'h' + uc.D);
      }
      Eb = Eb.join('p');
      Eb || (Fg && (jb(!0, 'a', !1, la), u(!1)), (Eb += gb + '$' + Df + 'h-'));
      Eb += 'v' + (z || Qc(la));
      q = null !== L && void 0 !== L ? L : V(q);
      0 <= q && (Eb += 'e' + q);
      yb('dtPC', Eb, void 0, Lb('ssc'));
    }
    function Cb(q, z) {
      void 0 === z && (z = document.cookie);
      var L = S('dtPC', z);
      z = [];
      if (L && '-' !== L) {
        var la = '';
        var gb = null;
        var Eb = 0;
        for (L = L.split('p'); Eb < L.length; Eb++) {
          var ic = L[Eb],
            mc = q;
          var uc = lb(ic, '$');
          var Ba = lb(ic, 'h'),
            Mc = lb(ic, 'v'),
            pd = lb(ic, 'e');
          uc = ic.substring(uc + 1, Ba);
          Ba = -1 !== Mc ? ic.substring(Ba + 1, Mc) : ic.substring(Ba + 1);
          la =
            la || -1 !== Mc
              ? -1 !== pd
                ? ic.substring(Mc + 1, pd)
                : ic.substring(Mc + 1)
              : '';
          gb = gb || -1 !== pd ? ic.substring(pd + 1) : null;
          ic = null;
          mc ||
            ((mc = zb(uc.split('_')[0])),
            (Mc = $c() % eg),
            Mc < mc && (Mc += eg),
            (mc = mc + 9e5 > Mc));
          mc &&
            (ic = {
              frameId: uc,
              D: '-' === Ba ? '-' : zb(Ba),
              rb: -1,
              visitId: '',
            });
          (uc = ic) && z.push(uc);
        }
        for (q = 0; q < z.length; q++) {
          Eb = z[q];
          Eb.visitId = la;
          L = zb(gb || '');
          isNaN(L) && (L = zb(Ya('rxec') || ''));
          if (isNaN(L) || -1 > L || L > Vb('mel')) L = 2 <= Vb('vs') ? 0 : -1;
          Eb.rb = L;
        }
      }
      return z;
    }
    function Db() {
      var q = document.cookie,
        z = Vb('vs'),
        L = Cb(!0, q),
        la = V(L);
      2 <= z && -1 === la ? (la = 0) : 1 === z && -1 < la && (la = -1);
      nb(L, void 0, la, q);
    }
    function Pb(q, z) {
      var L = document.cookie;
      z = Cb(z, L);
      for (var la = !1, gb = 0; gb < z.length; gb++) {
        var Eb = z[gb];
        Eb.frameId === Df && ((Eb.D = q), (la = !0));
      }
      la || Ca(z, { frameId: Df, D: q, rb: -1, visitId: '' });
      nb(z, void 0, void 0, L);
    }
    function Qc(q) {
      return w(q) || jb(!0, 'c', !1, q);
    }
    function w(q) {
      if (kd(q) <= $c()) return jb(!0, 't', !1, q);
      var z = H(q);
      if (!z) return jb(!0, 'c', !1, q);
      var L = sh.exec(z);
      if (!L || 3 !== L.length || 32 !== L[1].length || isNaN(zb(L[2])))
        return jb(!0, 'i', !1, q);
      ib('rxvisitid', z);
      return z;
    }
    function C(q, z) {
      var L = $c();
      z = Gd(z).ic;
      q && (z = L);
      qd(L + Ff + '|' + z);
      fc();
    }
    function H(q) {
      var z, L;
      return null !==
        (L =
          null === (z = Cb(!0, q)[0]) || void 0 === z ? void 0 : z.visitId) &&
        void 0 !== L
        ? L
        : Ya('rxvisitid');
    }
    function aa(q, z) {
      if (
        q &&
        (q = H(z)) &&
        (q = sh.exec(q)) &&
        3 === q.length &&
        isFinite(Number(q[2]))
      )
        return q[1] + '-' + (Number(q[2]) + 1);
      q = ke(32);
      q = q.replace(/[0-9]/g, function (L) {
        L = 0.1 * zb(L);
        return String.fromCharCode(Math.floor(25 * L + 65));
      });
      return q + '-0';
    }
    function va(q, z) {
      var L = Cb(!1, z),
        la = 2 <= Vb('vs') ? 0 : -1;
      nb(L, q, la, z);
      ib('rxvisitid', q);
      ib('rxec', String(la));
      C(!0);
    }
    function Ua(q, z, L, la) {
      return jb(z, L, la);
    }
    function cb(q, z, L, la) {
      return jb(q, z, L, la);
    }
    function jb(q, z, L, la) {
      q && (th = !0);
      q = H(la);
      L = aa(L);
      va(L);
      Gb(L, z, q);
      return L;
    }
    function Gb(q, z, L) {
      for (var la = 0, gb = uh; la < gb.length; la++) (0, gb[la])(q, th, z, L);
    }
    function wb(q) {
      uh.push(q);
    }
    function fc(q) {
      Gg && Wa(Gg);
      Gg = ta(Dc, kd(q) - $c());
    }
    function Dc() {
      var q = document.cookie;
      if (kd(q) <= $c() && Na()) {
        var z = 't' + ($c() - kd(q)),
          L = H(q),
          la = aa(!1, q);
        va(la, q);
        Gb(la, z, L);
        return !0;
      }
      od(fc);
      return !1;
    }
    function qd(q) {
      yb('rxvt', q, void 0, Lb('ssc'));
      ib('rxvt', q);
    }
    function Vc(q, z) {
      (z = S(q, z)) || (z = Ya(q) || '');
      return z;
    }
    function Yd() {
      var q = w() || '';
      ib('rxvisitid', q);
      q = Vc('rxvt');
      qd(q);
      Ib();
    }
    function Gd(q) {
      var z = { ed: 0, ic: 0 };
      if ((q = Vc('rxvt', q)))
        try {
          var L = q.split('|');
          2 === L.length &&
            ((z.ed = parseInt(L[0], 10)), (z.ic = parseInt(L[1], 10)));
        } catch (la) {}
      return z;
    }
    function kd(q) {
      q = Gd(q);
      return Math.min(q.ed, q.ic + vh);
    }
    function ed(q) {
      Ff = q;
    }
    function we() {
      var q = th;
      th = !1;
      return q;
    }
    function Md() {
      Dc() || C(!1);
    }
    function xe() {
      var q = S('rxVisitor');
      (q && 45 === (null === q || void 0 === q ? void 0 : q.length)) ||
        ((q = Hc('rxVisitor') || Ya('rxVisitor')),
        45 !== (null === q || void 0 === q ? void 0 : q.length) &&
          ((wh = !0), (q = String($c())), (q += ke(45 - q.length))));
      Hd(q);
      return q;
    }
    function Hd(q) {
      if (Lb('dpvc') || Lb('pVO')) ib('rxVisitor', q);
      else {
        var z = new Date();
        var L = z.getMonth() + Math.min(24, Math.max(1, Vb('rvcl')));
        z.setMonth(L);
        ea(Lc, ['rxVisitor', q]);
      }
      yb('rxVisitor', q, z, Lb('ssc'));
    }
    function oi() {
      return wh;
    }
    function xh(q) {
      var z = S('rxVisitor');
      jc('rxVisitor');
      mb('rxVisitor');
      Zb('rxVisitor');
      rc('pVO', !0);
      Hd(z);
      q && ea(Lc, ['dt-pVO', '1']);
      Yd();
    }
    function pi() {
      Zb('dt-pVO');
      Lb('pVO') && (rc('pVO', !1), xe());
      mb('rxVisitor');
      Yd();
    }
    function Hg(q, z, L, la, gb) {
      var Eb = document.createElement('script');
      Eb.setAttribute('src', q);
      z && Eb.setAttribute('defer', 'defer');
      L && (Eb.onload = L);
      la && (Eb.onerror = la);
      gb && Eb.setAttribute('id', gb);
      Eb.setAttribute('crossorigin', 'anonymous');
      q = document.getElementsByTagName('script')[0];
      q.parentElement.insertBefore(Eb, q);
    }
    function Ig(q, z) {
      return (
        qi +
        '/' +
        (z || Nd) +
        '_' +
        q +
        '_' +
        (Vb('buildNumber') || ub.dT_.version) +
        '.js'
      );
    }
    function Gf(q) {
      q = Cb(!0, q);
      return V(q);
    }
    function gj() {
      var q,
        z,
        L = document.cookie,
        la = Gf(L);
      if (!(-1 === la || 2 > Vb('vs')))
        if (la >= Vb('mel')) jb(!1, 'e' + la, !0, L);
        else {
          la++;
          nb(Cb(!1, L), '', la);
          ib('rxec', String(la));
          try {
            null ===
              (z =
                null === (q = ub.MobileAgent) || void 0 === q
                  ? void 0
                  : q.incrementActionCount) || void 0 === z
              ? void 0
              : z.call(q);
          } catch (gb) {}
        }
    }
    function tk(q, z) {
      void 0 === z && (z = []);
      if (!q || ('object' !== typeof q && 'function' !== typeof q)) return !1;
      var L = 'number' !== typeof z ? z : [],
        la = null,
        gb = [];
      switch ('number' === typeof z ? z : 5) {
        case 0:
          la = 'Array';
          gb.push('push');
          break;
        case 1:
          la = 'Boolean';
          break;
        case 2:
          la = 'Number';
          break;
        case 3:
          la = 'String';
          break;
        case 4:
          la = 'Function';
          break;
        case 5:
          la = 'Object';
          break;
        case 6:
          la = 'Date';
          gb.push('getTime');
          break;
        case 7:
          la = 'Error';
          gb.push('name', 'message');
          break;
        case 8:
          la = 'Element';
          break;
        case 9:
          la = 'HTMLElement';
          break;
        case 10:
          la = 'HTMLImageElement';
          gb.push('complete');
          break;
        case 11:
          la = 'PerformanceEntry';
          break;
        case 12:
          la = 'PerformanceTiming';
          break;
        case 13:
          la = 'PerformanceResourceTiming';
          break;
        case 14:
          la = 'PerformanceNavigationTiming';
          break;
        case 15:
          la = 'CSSRule';
          gb.push('cssText', 'parentStyleSheet');
          break;
        case 16:
          la = 'CSSStyleSheet';
          gb.push('cssRules', 'insertRule');
          break;
        case 17:
          la = 'Request';
          gb.push('url');
          break;
        case 18:
          la = 'Response';
          gb.push('ok', 'status', 'statusText');
          break;
        case 19:
          la = 'Set';
          gb.push('add', 'entries', 'forEach');
          break;
        case 20:
          la = 'Map';
          gb.push('set', 'entries', 'forEach');
          break;
        case 21:
          la = 'Worker';
          gb.push('addEventListener', 'postMessage', 'terminate');
          break;
        case 22:
          la = 'XMLHttpRequest';
          gb.push('open', 'send', 'setRequestHeader');
          break;
        case 23:
          la = 'SVGScriptElement';
          gb.push('ownerSVGElement', 'type');
          break;
        case 24:
          la = 'HTMLMetaElement';
          gb.push('httpEquiv', 'content', 'name');
          break;
        case 25:
          la = 'HTMLHeadElement';
          break;
        case 26:
          la = 'ArrayBuffer';
      }
      z = la;
      if (!z) return !1;
      gb = gb.length ? gb : L;
      try {
        var Eb = !!ub[z] && q instanceof ub[z],
          ic = Object.prototype.toString.call(q);
        if (!L.length && (Eb || ic === '[object ' + z + ']')) return !0;
      } catch (mc) {}
      for (L = 0; L < gb.length; L++)
        if (
          ((Eb = gb[L]),
          ('string' !== typeof Eb &&
            'number' !== typeof Eb &&
            'symbol' !== typeof Eb) ||
            !(Eb in q))
        )
          return !1;
      return !!gb.length;
    }
    function fg() {
      var q,
        z = ub.dT_;
      ub.dT_ =
        ((q = {}),
        (q.di = 0),
        (q.version = '10219210628133341'),
        (q.cfg = z ? z.cfg : ''),
        (q.iCE = z
          ? z.iCE
          : function () {
              return navigator.cookieEnabled;
            }),
        (q.ica = 1),
        (q.disabled = !1),
        (q.overloadPrevention = !1),
        (q.mp = pb),
        (q.mtp = ja),
        (q.mi = na),
        (q.mw = Ta),
        (q.gAST = A),
        (q.ww = J),
        (q.stu = G),
        (q.nw = ua),
        (q.apush = Ca),
        (q.st = ta),
        (q.si = Oa),
        (q.aBPSL = vb),
        (q.rBPSL = Bb),
        (q.gBPSL = Wb),
        (q.aBPSCC = Q),
        (q.gBPSCC = x),
        (q.buildType = 'dynatrace'),
        (q.gSSV = Ya),
        (q.sSSV = ib),
        (q.rSSV = mb),
        (q.rvl = Zb),
        (q.pn = zb),
        (q.iVSC = Ic),
        (q.p3SC = Sa),
        (q.pLSC = Jb),
        (q.io = lb),
        (q.dC = jc),
        (q.sC = yb),
        (q.esc = Ea),
        (q.gSId = Xa),
        (q.gDtc = fb),
        (q.gSC = bd),
        (q.sSC = Uc),
        (q.gC = bb),
        (q.cRN = Zc),
        (q.cRS = ke),
        (q.gEL = Va),
        (q.gEBTN = Mb),
        (q.cfgO = zc),
        (q.pCfg = Ma),
        (q.pCSAA = eb),
        (q.cFHFAU = Xc),
        (q.sCD = xc),
        (q.bcv = Lb),
        (q.ncv = Vb),
        (q.scv = oc),
        (q.stcv = rc),
        (q.rplC = Gc),
        (q.cLSCK = Za),
        (q.gFId = jd),
        (q.gBAU = Ig),
        (q.iS = Hg),
        (q.eWE = od),
        (q.oEIE = Ue),
        (q.oEIEWA = ea),
        (q.eA = Ld),
        (q.dA = ue),
        (q.iNV = oi),
        (q.gVID = xe),
        (q.dPV = xh),
        (q.ePV = pi),
        (q.sVIdUP = u),
        (q.sVTT = ed),
        (q.sVID = va),
        (q.rVID = w),
        (q.gVI = Qc),
        (q.gNVIdN = cb),
        (q.gNVId = Ua),
        (q.gARnVF = we),
        (q.cAUV = Md),
        (q.uVT = C),
        (q.aNVL = wb),
        (q.gPC = Cb),
        (q.cPC = Pb),
        (q.sPC = nb),
        (q.clB = Ja),
        (q.ct = Wa),
        (q.aRI = Kb),
        (q.iXB = Nb),
        (q.gXBR = $a),
        (q.sXBR = sb),
        (q.de = La),
        (q.cCL = tb),
        (q.gEC = Gf),
        (q.iEC = gj),
        (q.rnw = Ia),
        (q.gto = db),
        (q.ael = qa),
        (q.rel = Y),
        (q.sup = ra),
        (q.cuel = P),
        (q.iAEPOO = Na),
        (q.iSM = hb),
        (q.aIOf = v),
        (q.gxwp = Qa),
        (q.iIO = tk),
        (q.prm = U),
        (q.cI = ba),
        (q.gidi = N),
        (q.iDCV = Pc),
        (q.gCF = S),
        q);
    }
    function yh() {
      od(function () {
        if (!fb()) {
          var q = -1 * Zc(2, 99),
            z = ke(32),
            L = Vb('ssv');
          Uc(
            4 === L
              ? 'v_4_srv_' + String(q).replace('-', '-2D') + '_sn_' + z
              : 3 === L
              ? '=3=srv=' + q + '=sn=' + z
              : q + '$' + z
          );
        }
      });
    }
    var ub = 'undefined' !== typeof window ? window : self,
      ef,
      zf,
      zh = setTimeout;
    ya.prototype['catch'] = function (q) {
      return this.then(null, q);
    };
    ya.prototype.then = function (q, z) {
      var L = new this.constructor(ka);
      Ka(this, new ha(q, z, L));
      return L;
    };
    ya.prototype['finally'] = function (q) {
      var z = this.constructor;
      return this.then(
        function (L) {
          return z.resolve(q()).then(function () {
            return L;
          });
        },
        function (L) {
          return z.resolve(q()).then(function () {
            return z.reject(L);
          });
        }
      );
    };
    ya.all = function (q) {
      return new ya(function (z, L) {
        function la(mc, uc) {
          try {
            if (uc && ('object' === typeof uc || 'function' === typeof uc)) {
              var Ba = uc.then;
              if ('function' === typeof Ba) {
                Ba.call(
                  uc,
                  function (Mc) {
                    la(mc, Mc);
                  },
                  L
                );
                return;
              }
            }
            gb[mc] = uc;
            0 === --Eb && z(gb);
          } catch (Mc) {
            L(Mc);
          }
        }
        if (!q || 'undefined' === typeof q.length)
          return L(new TypeError('Promise.all accepts an array'));
        var gb = Array.prototype.slice.call(q);
        if (0 === gb.length) return z([]);
        for (var Eb = gb.length, ic = 0; ic < gb.length; ic++) la(ic, gb[ic]);
      });
    };
    ya.allSettled = function (q) {
      return new this(function (z, L) {
        function la(ic, mc) {
          if (mc && ('object' === typeof mc || 'function' === typeof mc)) {
            var uc = mc.then;
            if ('function' === typeof uc) {
              uc.call(
                mc,
                function (Ba) {
                  la(ic, Ba);
                },
                function (Ba) {
                  gb[ic] = { status: 'rejected', reason: Ba };
                  0 === --Eb && z(gb);
                }
              );
              return;
            }
          }
          gb[ic] = { status: 'fulfilled', value: mc };
          0 === --Eb && z(gb);
        }
        if (!q || 'undefined' === typeof q.length)
          return L(
            new TypeError(
              typeof q +
                ' ' +
                q +
                ' is not iterable(cannot read property Symbol(Symbol.iterator))'
            )
          );
        var gb = Array.prototype.slice.call(q);
        if (0 === gb.length) return z([]);
        var Eb = gb.length;
        for (L = 0; L < gb.length; L++) la(L, gb[L]);
      });
    };
    ya.resolve = function (q) {
      return q && 'object' === typeof q && q.constructor === ya
        ? q
        : new ya(function (z) {
            z(q);
          });
    };
    ya.reject = function (q) {
      return new ya(function (z, L) {
        L(q);
      });
    };
    ya.race = function (q) {
      return new ya(function (z, L) {
        if (!q || 'undefined' === typeof q.length)
          return L(new TypeError('Promise.race accepts an array'));
        for (var la = 0, gb = q.length; la < gb; la++)
          ya.resolve(q[la]).then(z, L);
      });
    };
    ya.X =
      ('function' === typeof setImmediate &&
        function (q) {
          setImmediate(q);
        }) ||
      function (q) {
        zh(q, 0);
      };
    ya.na = function (q) {
      'undefined' !== typeof console &&
        console &&
        console.warn('Possible Unhandled Promise Rejection:', q);
    };
    var Ed,
      Wd,
      Yf,
      Zf,
      yg = ub.attachEvent,
      Af = ub.Worker,
      zg = Af && Af.prototype.addEventListener,
      qe = [],
      Ag = ['touchstart', 'touchend', 'scroll'],
      re,
      Bg,
      $f =
        'abort getAllResponseHeaders getResponseHeader open overrideMimeType send setRequestHeader'.split(
          ' '
        ),
      Pe,
      ff = {
        '!': '%21',
        '~': '%7E',
        '*': '%2A',
        '(': '%28',
        ')': '%29',
        "'": '%27',
        $: '%24',
        ';': '%3B',
        ',': '%2C',
      },
      gf,
      id = ub.postMessage,
      ag = ub.Worker && ub.Worker.prototype.postMessage,
      ph = ub.parent.postMessage,
      Cg = ub.top.postMessage,
      zd = ub.Worker,
      Dg = ub.Blob,
      qh = ub.URL && ub.URL.createObjectURL,
      se,
      cg,
      bg,
      hf,
      Bf = !1,
      Cf,
      fj = [],
      jf = [],
      Re,
      te,
      Qe = {},
      $c,
      Se,
      Te = {},
      kf,
      Ad,
      Eg = ((Ad = {}), (Ad.l = 'Lax'), (Ad.s = 'Strict'), (Ad.n = 'None'), Ad),
      qc = {},
      rh = !1,
      Kd = [],
      ve = [],
      Fd = [],
      lf,
      Hf,
      Df,
      eg = 6e8,
      dg = [],
      Ef = [],
      Fg = !1,
      sh = /([A-Z]+)-([0-9]+)/,
      uh = [],
      Ff,
      vh,
      th = !1,
      Gg,
      wh = !1,
      hj,
      qi,
      Nd;
    (function (q) {
      var z, L;
      q =
        q ||
        0 >
          (null === (z = navigator.userAgent) || void 0 === z
            ? void 0
            : z.indexOf('RuxitSynthetic'));
      if (
        !ub.dT_ ||
        !ub.dT_.cfg ||
        'string' !== typeof ub.dT_.cfg ||
        ('initialized' in ub.dT_ && ub.dT_.initialized)
      )
        null === (L = ub.console) || void 0 === L
          ? void 0
          : L.log(
              'InitConfig not found or agent already initialized! This is an injection issue.'
            ),
          ub.dT_ && (ub.dT_.di = 3);
      else if (q)
        try {
          if (!W()) throw Error('Error during initCode initialization');
          fg();
          try {
            te = ub.localStorage;
          } catch (Oc) {}
          K();
          Re = $c();
          Cf = [];
          jf = [];
          Qe = {};
          if (!Bf) {
            ub.clearTimeout = M(se);
            ub.clearInterval = M(cg);
            Bf = !0;
            try {
              gf = ub.sessionStorage;
            } catch (Oc) {}
          }
          var la = Math.random(),
            gb = Math.random();
          Hf = 0 !== la && 0 !== gb && la !== gb;
          if (-1 !== lb(navigator.userAgent, 'Googlebot')) {
            var Eb = performance.getEntriesByType('navigation')[0];
            z = 1;
            if (Eb) {
              for (var ic in Eb) {
                var mc = Eb[ic];
                'number' === typeof mc && mc && (z = 1 === z ? mc : z + mc);
              }
              var uc = Math.floor(1e4 * z);
            } else uc = z;
            lf = be(uc);
          } else Hf ? (lf = Math.random) : (lf = be($c()));
          Df = (Re % eg) + '_' + zb(Zc(0, 1e3) + '');
          var Ba;
          kf =
            ((Ba = {}),
            (Ba.ade = ''),
            (Ba.aew = !0),
            (Ba.agentLocation = ''),
            (Ba.agentUri = ''),
            (Ba.uana = 'data-dtname,data-dtName'),
            (Ba.app = ''),
            (Ba.async = !1),
            (Ba.ase = !1),
            (Ba.auto = !1),
            (Ba.bp1 = !1),
            (Ba.bp2 = !1),
            (Ba.bp = 1),
            (Ba.bs = !1),
            (Ba.buildNumber = 0),
            (Ba.csprv = !0),
            (Ba.cepl = 16e3),
            (Ba.cls = !0),
            (Ba.ccNcss = !1),
            (Ba.cg = !1),
            (Ba.coo = !1),
            (Ba.cooO = !1),
            (Ba.cssm = '0'),
            (Ba.cors = !1),
            (Ba.csu = ''),
            (Ba.cuc = ''),
            (Ba.cux = !1),
            (Ba.dataDtConfig = ''),
            (Ba.debugName = ''),
            (Ba.dvl = 500),
            (Ba.dASXH = !1),
            (Ba.disableCookieManager = !1),
            (Ba.disableLogging = !1),
            (Ba.dmo = !1),
            (Ba.doel = !1),
            (Ba.dpch = !1),
            (Ba.dpvc = !1),
            (Ba.disableXhrFailures = !1),
            (Ba.domain = ''),
            (Ba.domainOverride = ''),
            (Ba.doNotDetect = ''),
            (Ba.ds = !0),
            (Ba.dsndb = !1),
            (Ba.dsss = !1),
            (Ba.dssv = !0),
            (Ba.eni = !0),
            (Ba.euf = !1),
            (Ba.evl = ''),
            (Ba.extblacklist = ''),
            (Ba.exteventsoff = !1),
            (Ba.fau = !0),
            (Ba.fa = !1),
            (Ba.featureHash = ''),
            (Ba.ffi = !1),
            (Ba.hvt = 216e5),
            (Ba.lastModification = 0),
            (Ba.lupr = !0),
            (Ba.imm = !1),
            (Ba.iqvn = !1),
            (Ba.initializedModules = ''),
            (Ba.ign = ''),
            (Ba.instr = ''),
            (Ba.iub = ''),
            (Ba.lab = !1),
            (Ba.legacy = !1),
            (Ba.lt = !0),
            (Ba.mb = ''),
            (Ba.md = ''),
            (Ba.mdp = ''),
            (Ba.mdl = ''),
            (Ba.mdn = 5e3),
            (Ba.bismepl = 2e3),
            (Ba.mel = 200),
            (Ba.mepp = 10),
            (Ba.moa = 30),
            (Ba.mrt = 3),
            (Ba.mpl = 1024),
            (Ba.mmds = 2e4),
            (Ba.msl = 3e4),
            (Ba.mhl = 4e3),
            (Ba.ncw = !1),
            (Ba.ntd = !1),
            (Ba.oat = 180),
            (Ba.ote = !1),
            (Ba.owasp = !1),
            (Ba.perfbv = 1),
            (Ba.prfSmpl = 0),
            (Ba.pcl = 20),
            (Ba.pt = !0),
            (Ba.pui = !1),
            (Ba.pVO = !1),
            (Ba.raxeh = !0),
            (Ba.rdnt = 0),
            (Ba.reportUrl = 'dynaTraceMonitor'),
            (Ba.restoreTimeline = !1),
            (Ba.rid = ''),
            (Ba.ridPath = ''),
            (Ba.rpid = ''),
            (Ba.rcdec = 12096e5),
            (Ba.rt = 1e4),
            (Ba.rtl = 0),
            (Ba.rtp = 2),
            (Ba.rtt = 1e3),
            (Ba.rtu = 200),
            (Ba.rvcl = 24),
            (Ba.sl = 100),
            (Ba.spc = ''),
            (Ba.srbbv = 1),
            (Ba.srbw = !0),
            (Ba.srad = !0),
            (Ba.srmr = 100),
            (Ba.srms = '1,1,,,'),
            (Ba.srsr = 1e5),
            (Ba.srtbv = 3),
            (Ba.srtd = 1),
            (Ba.srtr = 500),
            (Ba.srvr = ''),
            (Ba.srvi = 0),
            (Ba.srwo = !1),
            (Ba.srre = ''),
            (Ba.ssc = !1),
            (Ba.st = 3e3),
            (Ba.svNB = !1),
            (Ba.syntheticConfig = !1),
            (Ba.tal = 0),
            (Ba.tp = '500,50,3'),
            (Ba.tt = 100),
            (Ba.tvc = 3e3),
            (Ba.uam = !1),
            (Ba.uxdce = !1),
            (Ba.uxdcw = 1500),
            (Ba.uxrgce = !0),
            (Ba.uxrgcm = '100,25,300,3;100,25,300,3'),
            (Ba.usrvd = !0),
            (Ba.vcfi = !0),
            (Ba.vcit = 1e3),
            (Ba.vct = 50),
            (Ba.vcx = 50),
            (Ba.vs = 1),
            (Ba.vncm = 1),
            (Ba.xb = ''),
            (Ba.chw = ''),
            (Ba.xt = 0),
            (Ba.srcss = !0),
            (Ba.srmcrl = 1),
            (Ba.srmcrv = 10),
            (Ba.ssv = 1),
            (Ba.nosr = !0),
            (Ba.bisaoi = !1),
            (Ba.bisCmE = ''),
            (Ba.mcepsl = 100),
            (Ba.erjdw = !0),
            (Ba.fvdi = !1),
            (Ba.srif = !1),
            (Ba.vscl = 0),
            (Ba.dsa = !1),
            (Ba.exp = !1),
            (Ba.vrt = !1),
            (Ba.peti = !1),
            (Ba.expw = !1),
            (Ba.earxa = !0),
            (Ba.srxcss = !1),
            (Ba.srxicss = !1),
            (Ba.srmrc = !1),
            Ba);
          a: {
            var Mc = ub.dT_.cfg;
            qc = {
              reportUrl: 'dynaTraceMonitor',
              initializedModules: '',
              csu: 'dtagent',
              dataDtConfig: 'string' === typeof Mc ? Mc : '',
            };
            ub.dT_.cfg = qc;
            qc.csu = 'ruxitagentjs';
            var pd = qc.dataDtConfig;
            pd &&
              -1 === lb(pd, '#CONFIGSTRING') &&
              (eb(pd, qc), Cc('domain'), Cc('auto'), Cc('app'), Xc(qc));
            var ce = Mb('script'),
              ri = Va(ce),
              ye =
                -1 === lb(qc.dataDtConfig || '', '#CONFIGSTRING') ? qc : null;
            if (0 < ri)
              for (uc = 0; uc < ri; uc++)
                b: {
                  Eb = void 0;
                  var Jg = ce[uc];
                  ic = ye;
                  if (Jg.attributes) {
                    var Ah = qc.csu + '_bootstrap.js';
                    mc = /.*\/jstag\/.*\/.*\/(.*)_bs(_dbg)?.js$/;
                    Ba = ic;
                    var mf = Jg.src,
                      ij =
                        null === mf || void 0 === mf ? void 0 : mf.indexOf(Ah),
                      si = Jg.attributes.getNamedItem('data-dtconfig');
                    if (si) {
                      Mc = void 0;
                      pd = mf;
                      var Kg = si.value;
                      z = {};
                      qc.legacy = '1';
                      L = /([a-zA-Z]*)_([a-zA-Z_0-9]*)_([0-9]+)/g;
                      pd &&
                        ((Mc = L.exec(pd)),
                        null === Mc || void 0 === Mc ? 0 : Mc.length) &&
                        ((z.csu = Mc[1]),
                        (z.featureHash = Mc[2]),
                        (z.agentLocation = pd.substr(0, lb(pd, Mc[1]) - 1)),
                        (z.buildNumber = Mc[3]));
                      if (Kg) {
                        eb(Kg, z, !0);
                        var ti = z.agentUri;
                        !pd &&
                          ti &&
                          ((Mc = L.exec(ti)),
                          null === Mc || void 0 === Mc ? 0 : Mc.length) &&
                          (z.csu = Mc[1]);
                      }
                      Yc(z);
                      Eb = z;
                      if (!ic) Ba = Eb;
                      else if (!Eb.syntheticConfig) {
                        ye = Eb;
                        break b;
                      }
                    }
                    Eb || (Eb = qc);
                    if (0 < ij) {
                      var jj = ij + Ah.length + 5;
                      Eb.app =
                        mf.length > jj
                          ? mf.substr(jj)
                          : 'Default%20Application';
                    } else if (mf) {
                      var gg = mc.exec(mf);
                      gg && (Eb.app = gg[1]);
                    }
                    ye = Ba;
                  } else ye = ic;
                }
            if (ye)
              for (var Bh in ye)
                ye.hasOwnProperty(Bh) && ((ce = Bh), (qc[ce] = ye[ce]));
            var Lg = Za();
            try {
              var de = (ye = te) && ye.getItem(Lg);
              if (de) {
                var hg = Ma(de),
                  We = eb(hg.config || ''),
                  Ch = qc.lastModification || '0',
                  vd = zb(
                    (We.lastModification || hg.lastModification || '0').substr(
                      0,
                      13
                    )
                  ),
                  uk = 'string' === typeof Ch ? zb(Ch.substr(0, 13)) : Ch;
                if (!Ch || vd >= uk)
                  if (
                    ((We.csu = hg.name),
                    (We.featureHash = hg.featureHash),
                    We.agentUri && Xc(We),
                    xc(We, !0),
                    Nb(We),
                    Kb(We),
                    vd > (qc.lastModification || 0))
                  ) {
                    var vk = qc.auto,
                      Mg = qc.legacy;
                    qc = Gc(We);
                    qc.auto = vk;
                    qc.legacy = Mg;
                  }
              }
            } catch (Oc) {}
            xc(qc);
            try {
              var rd = qc.ign;
              if (rd && new RegExp(rd).test(ub.location.href)) {
                document.dT_ = ub.dT_ = void 0;
                var Od = !1;
                break a;
              }
            } catch (Oc) {}
            if (hb()) {
              var kj = navigator.userAgent,
                Ng = lb(kj, 'RuxitSynthetic') + 14 + 5,
                Xe = kj.substring(Ng);
              if (-1 !== lb(Xe, ' c')) {
                Lg = 0;
                for (var If = Xe.split(' '); Lg < If.length; Lg++) {
                  var Dh = If[Lg];
                  if ('c' === Dh.charAt(0)) {
                    var Eh = Dh.substr(1),
                      Og = Eh.indexOf('='),
                      nf = Eh.substring(0, Og),
                      ig = Eh.substring(Og + 1);
                    nf && ig && (Te[nf] = ig);
                  }
                }
              }
              Gc(qc);
            }
            Od = !0;
          }
          if (!Od) throw Error('Error during config initialization');
          Xd();
          try {
            hj = ub.dT_.disabled || !!Ya('dtDisabled');
          } catch (Oc) {}
          var Fh;
          if (!(Fh = oc('agentLocation')))
            a: {
              var xb = oc('agentUri');
              if (xb || document.currentScript) {
                var Pd = xb || document.currentScript.src;
                if (Pd) {
                  Od = Pd;
                  var lj =
                      -1 === lb(Od, '_bs') &&
                      -1 === lb(Od, '_bootstrap') &&
                      -1 === lb(Od, '_complete')
                        ? 1
                        : 2,
                    ui = Pd.lastIndexOf('/');
                  for (Od = 0; Od < lj && -1 !== ui; Od++)
                    (Pd = Pd.substr(0, ui)), (ui = Pd.lastIndexOf('/'));
                  Fh = Pd;
                  break a;
                }
              }
              var Jf = location.pathname;
              Fh = Jf.substr(0, Jf.lastIndexOf('/'));
            }
          qi = Fh;
          Nd = oc('csu') || 'ruxitagentjs';
          'true' === S('dtUseDebugAgent') &&
            0 > Nd.indexOf('dbg') &&
            (Nd = oc('debugName') || Nd + 'dbg');
          if (!Lb('auto') && !Lb('legacy') && !hj) {
            var Zd = oc('agentUri') || Ig(oc('featureHash')),
              vi;
            if (!(vi = Lb('async') || 'complete' === document.readyState)) {
              var Gh = ub.navigator.userAgent,
                Bd = Gh.indexOf('MSIE ');
              vi =
                0 < Bd
                  ? 9 >= parseInt(Gh.substring(Bd + 5, Gh.indexOf('.', Bd)), 10)
                  : !1;
            }
            vi
              ? Hg(Zd, Lb('async'), void 0, void 0, 'dtjsagent')
              : (document.write(
                  '<script id="dtjsagentdw" type="text/javascript" src="' +
                    Zd +
                    '">\x3c/script>'
                ),
                document.getElementById('dtjsagentdw') ||
                  Hg(Zd, Lb('async'), void 0, void 0, 'dtjsagent'));
          }
          S('dtCookie') && rc('cooO', !0);
          yh();
          rc('pVO', !!Hc('dt-pVO'));
          od(xe);
          Ff = 18e5;
          vh = Vb('hvt') || 216e5;
          ea(Db);
          ea(Pb, [1]);
          Ef = [];
          dg = 'dtCookie dtLatC rxvt dtAdk dtAdkSettings dtPC'.split(' ');
          if (Lb('cg'))
            try {
              t(
                Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
                  Object.getOwnPropertyDescriptor(
                    HTMLDocument.prototype,
                    'cookie'
                  )
              );
            } catch (Oc) {}
        } catch (Oc) {
          try {
            delete ub.dT_;
          } catch (Hh) {
            ub.dT_ = void 0;
          }
          tb() && ub.console.log('JsAgent initCode initialization failed!');
        }
    })(!1);
  })();
}.call(this));