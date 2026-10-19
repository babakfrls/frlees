/* frlees app — Calculatrice scientifique · dev by : frlees */
(function () {
  const ID = "calc";
  const st = document.createElement("style");
  st.textContent = `
  #calc .ca{max-width:420px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
  #calc .ca-scr{border-radius:20px;padding:12px 16px 14px;background:#c9d8c5;color:#1b2a1b;box-shadow:inset 0 2px 8px rgba(0,0,0,.18);min-height:120px;display:flex;flex-direction:column;font-family:"Segoe UI",system-ui,sans-serif}
  .dk #calc .ca-scr{background:#1d2b22;color:#c8f3d2}
  #calc .ca-ind{display:flex;gap:10px;font-size:11px;font-weight:800;letter-spacing:.5px;min-height:15px}
  #calc .ca-ind span{opacity:.18} #calc .ca-ind span.on{opacity:1}
  #calc .ca-ind .sh.on{color:#ea7317}
  #calc .ca-ex{font-size:19px;margin-top:6px;min-height:26px;word-break:break-all;line-height:1.3;font-variant-numeric:tabular-nums}
  #calc .ca-ex i{display:inline-block;width:2px;height:20px;background:currentColor;vertical-align:-3px;animation:caB 1s steps(1) infinite}
  @keyframes caB{50%{opacity:0}}
  #calc .ca-res{margin-top:auto;text-align:right;font-size:clamp(28px,9vw,38px);font-weight:700;font-variant-numeric:tabular-nums;overflow-x:auto;white-space:nowrap}
  #calc .ca-res.err{font-size:24px}
  #calc .ca-modes{display:flex;gap:8px}
  #calc .ca-modes button{flex:1;padding:9px;border-radius:12px;border:1px solid var(--cardBorder);background:var(--card);color:var(--muted);font-weight:800;font-size:13px;cursor:pointer}
  #calc .ca-modes button b{color:var(--accent)}
  #calc .ca-k{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
  #calc .ca-k button{position:relative;border:0;border-radius:13px;cursor:pointer;font-family:inherit;font-weight:700;color:var(--text);background:var(--card);border:1px solid var(--cardBorder);padding:16px 2px 7px;font-size:15px;backdrop-filter:blur(8px);transition:transform .08s}
  #calc .ca-k button:active{transform:scale(.93)}
  #calc .ca-k button small{position:absolute;top:2px;left:0;right:0;font-size:9.5px;color:#ea7317;font-weight:800;white-space:nowrap}
  #calc .ca-k .fn{font-size:13.5px}
  #calc .ca-k .num{font-size:21px;padding:14px 2px;background:rgba(127,127,127,.08)}
  #calc .ca-k .op{font-size:21px;padding:14px 2px;color:var(--accent)}
  #calc .ca-k .shift{background:#ea7317;color:#fff;border:0}
  #calc .ca-k .shift.on{box-shadow:0 0 0 3px rgba(234,115,23,.35)}
  #calc .ca-k .del{background:#3b82f6;color:#fff;border:0;font-size:15px}
  #calc .ca-k .ac{background:#ef4444;color:#fff;border:0;font-size:15px}
  #calc .ca-k .eq{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:0;font-size:22px}
  #calc .ca-k .sm{padding:13px 2px 6px}
  `;
  document.head.appendChild(st);

  // token: [display, internal]
  const T = {
    sin: ["sin(", "sin("], cos: ["cos(", "cos("], tan: ["tan(", "tan("], asin: ["sin⁻¹(", "asin("], acos: ["cos⁻¹(", "acos("], atan: ["tan⁻¹(", "atan("],
    ln: ["ln(", "ln("], log: ["log(", "log("], exp: ["e^(", "exp("], tenp: ["10^(", "tenp("], sqrt: ["√(", "sqrt("], cbrt: ["∛(", "cbrt("], abs: ["Abs(", "abs("],
    sq: ["²", "²"], cube: ["³", "³"], inv: ["⁻¹", "⁻¹"], fact: ["!", "!"], pct: ["%", "%"], pow: ["^(", "^("], xrt: ["ˣ√(", "R("],
    lp: ["(", "("], rp: [")", ")"], pi: ["π", "π"], e: ["e", "e"], neg: ["(−", "(-"], ncr: ["C", "C"], npr: ["P", "P"],
    add: ["+", "+"], sub: ["−", "-"], mul: ["×", "*"], div: ["÷", "/"], frac: ["⌟", "/"], E: ["ᴇ", "E"], ans: ["Ans", "A"], dot: [".", "."]
  };
  for (let i = 0; i < 10; i++) T["n" + i] = [String(i), String(i)];

  const S = { toks: [], res: "0", shift: false, deg: true, sci: false, ans: 0, done: false, frac: false, val: 0, err: false };
  try { const m = JSON.parse(localStorage.getItem("fr_calc")); if (m) { S.deg = m.deg; S.sci = m.sci; S.ans = m.ans || 0; } } catch (e) {}
  const saveM = () => { try { localStorage.setItem("fr_calc", JSON.stringify({ deg: S.deg, sci: S.sci, ans: S.ans })); } catch (e) {} };

  /* ---------- parser ---------- */
  function evaluate(src, deg) {
    let i = 0;
    const peek = () => src[i];
    const D = deg ? Math.PI / 180 : 1;
    const fix = x => Math.abs(x) < 1e-13 ? 0 : x;
    const trig = (f, x) => {
      if (deg) { const m = ((x % 360) + 360) % 360;
        if (f === "sin" && m % 180 === 0) return 0; if (f === "cos" && (m + 90) % 180 === 0) return 0;
        if (f === "tan") { if (m % 180 === 0) return 0; if ((m + 90) % 180 === 0) throw "M"; } }
      return fix(Math[f](x * D));
    };
    const FN = {
      sin: x => trig("sin", x), cos: x => trig("cos", x), tan: x => trig("tan", x),
      asin: x => { if (x < -1 || x > 1) throw "M"; return Math.asin(x) / D; }, acos: x => { if (x < -1 || x > 1) throw "M"; return Math.acos(x) / D; }, atan: x => Math.atan(x) / D,
      ln: x => { if (x <= 0) throw "M"; return Math.log(x); }, log: x => { if (x <= 0) throw "M"; return Math.log10(x); },
      exp: x => Math.exp(x), tenp: x => Math.pow(10, x), sqrt: x => { if (x < 0) throw "M"; return Math.sqrt(x); }, cbrt: x => Math.cbrt(x), abs: x => Math.abs(x)
    };
    const fact = n => { if (n < 0 || n !== Math.floor(n) || n > 170) throw "M"; let r = 1; for (let k = 2; k <= n; k++) r *= k; return r; };
    const isStart = c => c !== undefined && (/[0-9.(πeAa-z]/.test(c));
    function add() { let v = mul(); while (peek() === "+" || peek() === "-") { const o = src[i++]; const r = mul(); v = o === "+" ? v + r : v - r; } return v; }
    function mul() {
      let v = comb();
      for (;;) {
        if (peek() === "*" || peek() === "/") { const o = src[i++]; const r = comb(); if (o === "/") { if (r === 0) throw "M"; v = v / r; } else v = v * r; }
        else if (isStart(peek()) && peek() !== "E") v = v * comb();
        else break;
      }
      return v;
    }
    function comb() {
      let v = unary();
      while (peek() === "C" || peek() === "P") {
        const o = src[i++], r = unary();
        if (v < 0 || r < 0 || v !== Math.floor(v) || r !== Math.floor(r) || r > v) throw "M";
        let p = 1; for (let k = 0; k < r; k++) p *= (v - k);
        v = o === "P" ? p : Math.round(p / fact(Math.min(r, 170)));
      }
      return v;
    }
    function unary() { if (peek() === "-") { i++; return -unary(); } if (peek() === "+") { i++; return unary(); } return pow(); }
    function pow() {
      let b = post();
      if (peek() === "^") { i++; const ex = unary(); const r = Math.pow(b, ex); if (isNaN(r)) throw "M"; return r; }
      if (peek() === "R") { i++; const x = unary(); if (b === 0) throw "M"; let r = Math.pow(Math.abs(x), 1 / b); if (x < 0) { if (Math.abs(b % 2) === 1) r = -r; else throw "M"; } return r; }
      return b;
    }
    function post() {
      let v = prim();
      for (;;) {
        const c = peek();
        if (c === "²") { i++; v = v * v; } else if (c === "³") { i++; v = v * v * v; }
        else if (c === "⁻") { i += 2; if (v === 0) throw "M"; v = 1 / v; }
        else if (c === "!") { i++; v = fact(v); } else if (c === "%") { i++; v = v / 100; }
        else break;
      }
      return v;
    }
    function num() {
      const m = /^(\d+\.?\d*|\.\d+)/.exec(src.slice(i));
      if (!m) throw "S"; i += m[0].length; let v = parseFloat(m[0]);
      if (peek() === "E") { i++; let sg = 1; if (peek() === "-") { sg = -1; i++; } const m2 = /^\d+/.exec(src.slice(i)); if (!m2) throw "S"; i += m2[0].length; v *= Math.pow(10, sg * +m2[0]); }
      return v;
    }
    function group() { const v = add(); if (peek() === ")") i++; else if (i < src.length) throw "S"; return v; }
    function prim() {
      const c = peek();
      if (c === undefined) throw "S";
      if (/[0-9.]/.test(c)) return num();
      if (c === "π") { i++; return Math.PI; }
      if (c === "A") { i++; return S.ans; }
      if (c === "(") { i++; return group(); }
      if (c === "E") { i++; let sg = 1; if (peek() === "-") { sg = -1; i++; } const m2 = /^\d+/.exec(src.slice(i)); if (!m2) throw "S"; i += m2[0].length; return Math.pow(10, sg * +m2[0]); }
      const m = /^([a-z]+)\(/.exec(src.slice(i));
      if (m && FN[m[1]]) { i += m[0].length; return FN[m[1]](group()); }
      if (c === "e") { i++; return Math.E; }
      throw "S";
    }
    const v = add();
    if (i < src.length) throw "S";
    if (!isFinite(v) || isNaN(v)) throw "M";
    return v;
  }

  function fmt(v) {
    if (v === 0) return "0";
    if (S.sci) { const [m, e] = v.toExponential(5).split("e"); return m + "×10" + sup(e.replace("+", "")); }
    const a = Math.abs(v);
    if (a >= 1e10 || a < 1e-9) { const [m, e] = v.toExponential(9).split("e"); return m.replace(/\.?0+$/, "") + "×10" + sup(e.replace("+", "")); }
    return String(+v.toPrecision(10));
  }
  const sup = s => s.replace(/[-0-9]/g, c => "⁻⁰¹²³⁴⁵⁶⁷⁸⁹"["-0123456789".indexOf(c)]);
  function toFrac(x) {
    if (x !== x || !isFinite(x) || Math.abs(x) > 1e9) return null;
    let h1 = 1, h0 = 0, k1 = 0, k0 = 1, b = x;
    for (let n = 0; n < 30; n++) {
      const a = Math.floor(b); [h1, h0] = [a * h1 + h0, h1]; [k1, k0] = [a * k1 + k0, k1];
      if (k1 > 100000) return null;
      if (Math.abs(x - h1 / k1) < 1e-10 * Math.max(1, Math.abs(x))) break;
      b = 1 / (b - a); if (!isFinite(b)) break;
    }
    if (k1 === 1 || Math.abs(x - h1 / k1) > 1e-9 * Math.max(1, Math.abs(x))) return null;
    return (h1 < 0 ? "−" : "") + Math.abs(h1) + "/" + k1;
  }

  function press(k) {
    const sh = S.shift; S.shift = false;
    const map = { sin: "asin", cos: "acos", tan: "atan", ln: "exp", log: "tenp", sqrt: "cbrt", sq: "cube", pow: "xrt", pi: "e", ncr: "npr" };
    if (sh && map[k]) k = map[k];
    if (k === "shift") { S.shift = !sh; return draw(); }
    if (k === "mdeg") { S.deg = !S.deg; saveM(); return draw(); }
    if (k === "msci") { S.sci = !S.sci; saveM(); if (S.done && !S.err) { S.res = S.frac ? S.res : fmt(S.val); } return draw(); }
    if (k === "ac") { S.toks = []; S.res = "0"; S.done = false; S.err = false; S.frac = false; return draw(); }
    if (k === "del") { if (S.done) { S.done = false; S.err = false; } else S.toks.pop(); return draw(); }
    if (k === "sd") { if (S.done && !S.err) { if (S.frac) { S.res = fmt(S.val); S.frac = false; } else { const f = toFrac(S.val); if (f) { S.res = f; S.frac = true; } } } return draw(); }
    if (k === "eq") {
      if (!S.toks.length) return draw();
      try {
        const v = evaluate(S.toks.map(t => T[t][1]).join(""), S.deg);
        S.val = v; S.ans = v; S.res = fmt(v); S.err = false; S.frac = false; saveM();
        if (S.toks.some(t => t === "frac")) { const f = toFrac(v); if (f) { S.res = f; S.frac = true; } }
      } catch (e) { S.res = e === "M" ? "Math ERROR" : "Syntax ERROR"; S.err = true; }
      S.done = true; return draw();
    }
    if (!T[k]) return;
    if (S.done) {
      // mor "=", ila bditi b operation kankemmel b Ans
      S.toks = ["add", "sub", "mul", "div", "sq", "cube", "inv", "fact", "pct", "pow", "ncr", "npr", "xrt"].includes(k) && !S.err ? ["ans"] : [];
      S.done = false; S.err = false;
    }
    if (S.toks.length < 120) S.toks.push(k);
    draw();
  }

  const B = (k, label, cls = "", sh = "") => `<button data-k="${k}" class="${cls}">${sh ? `<small>${sh}</small>` : ""}${label}</button>`;
  const root = () => document.getElementById(ID);
  function build() {
    root().innerHTML = `<div class="ca">
      <div class="ca-scr"><div class="ca-ind"><span class="sh" id="caS">S</span><span id="caD">D</span><span id="caR">R</span><span id="caSci">SCI</span><span id="caF">a⌟b</span></div>
        <div class="ca-ex" id="caEx"></div><div class="ca-res" id="caRes">0</div></div>
      <div class="ca-modes"><button data-k="mdeg" id="caM1"></button><button data-k="msci" id="caM2"></button></div>
      <div class="ca-k">
        ${B("shift", "SHIFT", "fn shift sm")}${B("inv", "x⁻¹", "fn sm")}${B("fact", "n!", "fn sm")}${B("abs", "|x|", "fn sm")}${B("pct", "%", "fn sm")}
        ${B("sin", "sin", "fn", "sin⁻¹")}${B("cos", "cos", "fn", "cos⁻¹")}${B("tan", "tan", "fn", "tan⁻¹")}${B("ln", "ln", "fn", "eˣ")}${B("log", "log", "fn", "10ˣ")}
        ${B("sqrt", "√", "fn", "∛")}${B("sq", "x²", "fn", "x³")}${B("pow", "xʸ", "fn", "ʸ√x")}${B("lp", "(", "fn")}${B("rp", ")", "fn")}
        ${B("pi", "π", "fn", "e")}${B("neg", "±", "fn")}${B("ncr", "nCr", "fn", "nPr")}${B("frac", "a b/c", "fn")}${B("sd", "S⇔D", "fn")}
        ${B("n7", "7", "num")}${B("n8", "8", "num")}${B("n9", "9", "num")}${B("del", "DEL", "del")}${B("ac", "AC", "ac")}
        ${B("n4", "4", "num")}${B("n5", "5", "num")}${B("n6", "6", "num")}${B("mul", "×", "op")}${B("div", "÷", "op")}
        ${B("n1", "1", "num")}${B("n2", "2", "num")}${B("n3", "3", "num")}${B("add", "+", "op")}${B("sub", "−", "op")}
        ${B("n0", "0", "num")}${B("dot", ".", "num")}${B("E", "×10ˣ", "fn")}${B("ans", "Ans", "fn")}${B("eq", "=", "eq")}
      </div></div>`;
    root().querySelectorAll("[data-k]").forEach(b => b.onclick = () => press(b.dataset.k));
    draw();
  }
  function draw() {
    const r = root(); if (!r.querySelector("#caEx")) return;
    r.querySelector("#caEx").innerHTML = S.toks.map(t => T[t][0]).join("").replace(/&/g, "&amp;").replace(/</g, "&lt;") + (S.done ? "" : "<i></i>");
    const res = r.querySelector("#caRes");
    res.textContent = S.done ? S.res : (S.toks.length ? "" : "0");
    res.classList.toggle("err", S.err);
    r.querySelector("#caS").classList.toggle("on", S.shift);
    r.querySelector(".shift").classList.toggle("on", S.shift);
    r.querySelector("#caD").classList.toggle("on", S.deg);
    r.querySelector("#caR").classList.toggle("on", !S.deg);
    r.querySelector("#caSci").classList.toggle("on", S.sci);
    r.querySelector("#caF").classList.toggle("on", S.done && S.frac);
    r.querySelector("#caM1").innerHTML = S.deg ? "<b>DEG</b> · RAD" : "DEG · <b>RAD</b>";
    r.querySelector("#caM2").innerHTML = S.sci ? "NORM · <b>SCI</b>" : "<b>NORM</b> · SCI";
  }

  // clavier f PC
  addEventListener("keydown", e => {
    const v = root(); if (!v || !v.classList.contains("on") || e.ctrlKey || e.metaKey) return;
    const m = { "+": "add", "-": "sub", "*": "mul", "/": "div", "(": "lp", ")": "rp", ".": "dot", ",": "dot", "^": "pow", "!": "fact", "%": "pct", Enter: "eq", "=": "eq", Backspace: "del", Delete: "ac" };
    let k = /^[0-9]$/.test(e.key) ? "n" + e.key : m[e.key];
    if (k) { e.preventDefault(); press(k); }
  });

  window.frCalcEval = (s, deg) => evaluate(s, deg); // l'test
  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) build(); };
})();
