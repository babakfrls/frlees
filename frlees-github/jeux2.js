/* =========================================================
   Chess, Parchis w Blocks — frlees app
   dev by : frlees
   (khass jeux.js ykoun t7mmel 9bel had l'fichier)
   ========================================================= */
(function () {

const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rnd = (n) => Math.floor(Math.random() * n);
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

/* ---------- STYLE ---------- */
const css = `
/* chess */
#chess .jx-ov,#parchis .jx-ov,#blocks .jx-ov{z-index:6}
.ch-wrap{display:flex;flex-direction:column;gap:6px}
.ch-board{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));border-radius:16px;overflow:hidden;border:1px solid var(--cardBorder);box-shadow:var(--shadow);touch-action:manipulation}
.ch-board button{aspect-ratio:1;min-width:0;border:0;padding:0;margin:0;display:grid;place-items:center;position:relative;cursor:pointer;font-family:"Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans",serif;font-size:clamp(22px,9vw,40px);line-height:1}
.ch-board .l{background:#eef5ff}.ch-board .d{background:#9cc8ff}
.dk .ch-board .l,[data-theme="dark"] .ch-board .l{background:#5d86c4}
.dk .ch-board .d,[data-theme="dark"] .ch-board .d{background:#33568f}
.ch-board .pw{color:#fff;text-shadow:0 0 1px #0d1b2e,0 0 1px #0d1b2e,0 1px 2px rgba(13,27,46,.7)}
.ch-board .pb{color:#0d1b2e;text-shadow:0 1px 1px rgba(255,255,255,.35)}
.dk .ch-board .pb,[data-theme="dark"] .ch-board .pb{color:#061024;text-shadow:0 0 1px rgba(255,255,255,.6)}
.ch-board .last::before{content:"";position:absolute;inset:0;background:rgba(255,197,49,.42)}
.ch-board .sel{box-shadow:inset 0 0 0 3px var(--accent)}
.ch-board .chk::before{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,60,90,.75),rgba(255,60,90,0) 70%)}
.ch-board .mv::after{content:"";position:absolute;width:28%;height:28%;border-radius:50%;background:rgba(47,140,255,.6)}
.ch-board .cap::after{content:"";position:absolute;inset:7%;border-radius:50%;box-shadow:inset 0 0 0 3px rgba(255,90,122,.85)}
.ch-board span{position:relative;z-index:1}
.ch-capt{display:flex;flex-wrap:wrap;gap:1px;min-height:20px;font-size:17px;color:var(--muted);font-family:"Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans",serif}
.ch-sw{font-size:16px;line-height:1}
/* parchis */
.pa{max-width:460px;margin:0 auto;display:flex;flex-direction:column;gap:12px;min-height:100%}
.pa-pl{display:flex;flex-direction:column;gap:9px;border-radius:16px;border:1px solid var(--cardBorder);background:var(--card);padding:12px}
.pa-pl .nm{display:flex;align-items:center;gap:10px}
.pa-pl .nm span{width:26px;height:26px;border-radius:9px;flex:none}
.pa-pl .nm input{flex:1;min-width:0;padding:10px 12px;border-radius:11px;border:1px solid var(--cardBorder);background:transparent;color:var(--text);font:inherit;font-size:15px;font-weight:600;outline:none}
.pa-pl .seg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.pa-pl .seg button{padding:9px;border-radius:10px;border:1px solid var(--cardBorder);background:transparent;color:var(--text);font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.pa-pl .seg button.on{color:#fff;border-color:transparent}
.pa-pl.off .nm input{opacity:.45}
.pa-svg{width:100%;display:block;filter:drop-shadow(0 12px 22px rgba(60,30,10,.28));touch-action:manipulation;user-select:none;-webkit-user-select:none}
.pa-svg .tok{cursor:pointer;transition:transform .25s}
.pa-svg .can circle.ring{display:block}
.pa-top{display:flex;gap:8px}
.pa-who{flex:1;min-width:0;display:flex;align-items:center;gap:7px;padding:7px 9px;border-radius:13px;border:1px solid var(--cardBorder);background:var(--card);font-size:12px}
.pa-who.on{box-shadow:0 0 0 2px var(--c);border-color:transparent}
.pa-who i{width:14px;height:14px;border-radius:5px;flex:none}
.pa-who b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pa-who small{color:var(--muted)}
.pa-bar{display:flex;align-items:center;gap:12px}
.pa-dice{display:flex;gap:6px;padding:6px;border-radius:15px;background:var(--c);box-shadow:0 6px 16px rgba(0,0,0,.18);cursor:pointer;border:0}
.pa-die{width:46px;height:46px;border-radius:11px;background:#fff;display:grid;grid-template-columns:repeat(3,1fr);padding:8px;gap:2px;transition:opacity .2s,transform .2s}
.pa-die b{border-radius:50%}.pa-die b.on{background:#1a1a22}
.pa-die.used{opacity:.3}.pa-die.act{transform:translateY(-3px);box-shadow:0 0 0 3px #fff,0 0 0 5px rgba(0,0,0,.25)}
.pa-die.roll{animation:paroll .45s ease}
@keyframes paroll{0%{transform:rotate(0) scale(.8)}50%{transform:rotate(200deg) scale(1.1)}100%{transform:rotate(360deg) scale(1)}}
.pa-bonus{padding:0 10px;height:46px;border-radius:11px;background:#fff;color:#1a1a22;display:grid;place-items:center;font-weight:800;font-size:16px}
.pa-msg{flex:1;min-width:0}.pa-msg b{display:block;font-size:15px}.pa-msg small{color:var(--muted);font-size:12.5px}
/* blocks */
.bl{max-width:460px;margin:0 auto;display:flex;flex-direction:column;gap:12px;min-height:100%;touch-action:none}
.bl-stat{display:flex;gap:8px}.bl-stat div{flex:1;text-align:center;border-radius:14px;border:1px solid var(--cardBorder);background:var(--card);padding:8px;font-size:12px;color:var(--muted)}
.bl-stat b{display:block;font-size:22px;color:var(--text);font-variant-numeric:tabular-nums}
.bl-grid{position:relative;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:4px;padding:8px;border-radius:18px;background:var(--card);border:1px solid var(--cardBorder);box-shadow:var(--shadow)}
.bl-grid i{aspect-ratio:1;border-radius:22%;background:rgba(47,140,255,.07);border:1px solid var(--cardBorder);transition:background .15s}
.bl-c{border:0!important;box-shadow:inset 0 -3px 0 rgba(0,0,0,.14),inset 0 2px 0 rgba(255,255,255,.35)}
.bl-c1{background:linear-gradient(135deg,#1f7bff,#7cc4ff)!important}.bl-c2{background:linear-gradient(135deg,#ff4d73,#ffa3b6)!important}
.bl-c3{background:linear-gradient(135deg,#16a34a,#4ade80)!important}.bl-c4{background:linear-gradient(135deg,#f59e0b,#fcd34d)!important}
.bl-c5{background:linear-gradient(135deg,#8b5cf6,#c4b5fd)!important}.bl-c6{background:linear-gradient(135deg,#06b6d4,#67e8f9)!important}
.bl-grid i.gh{background:rgba(47,140,255,.3)!important;border:1px dashed var(--accent)}
.bl-grid i.gh.bad{background:rgba(255,90,122,.25)!important;border-color:#ff5a7a}
.bl-grid i.hl{box-shadow:0 0 0 2px rgba(255,255,255,.9),0 0 14px 2px rgba(124,196,255,.9)}
.bl-grid i.clr{animation:blclr .35s ease forwards}
@keyframes blclr{to{transform:scale(.2);opacity:0}}
.bl-tray{display:grid;grid-template-columns:repeat(3,1fr);align-items:center;justify-items:center;padding:14px 6px;border-radius:18px;background:var(--card);border:1px solid var(--cardBorder);min-height:120px}
.bl-pz{display:grid;gap:3px;cursor:grab;touch-action:none;padding:6px}
.bl-pz i{width:min(5vw,20px);height:min(5vw,20px);border-radius:22%}
.bl-pz.no{opacity:.35}
.bl-pz.drag{opacity:0}
.bl-float{position:fixed;z-index:80;pointer-events:none;display:grid}
.bl-float i{border-radius:22%}
.bl-combo{position:absolute;left:50%;top:40%;transform:translate(-50%,-50%) rotate(-6deg);font-size:26px;font-weight:900;color:#fff;background:linear-gradient(135deg,#8b5cf6,#ff4d73);padding:6px 16px;border-radius:14px;box-shadow:0 10px 24px rgba(139,92,246,.45);animation:blpop .9s ease forwards;pointer-events:none;white-space:nowrap}
@keyframes blpop{0%{opacity:0;transform:translate(-50%,-50%) rotate(-6deg) scale(.5)}20%{opacity:1;transform:translate(-50%,-50%) rotate(-6deg) scale(1.1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-90%) rotate(-6deg)}}
`;
const stEl = document.createElement("style"); stEl.textContent = css; document.head.appendChild(stEl);

/* =========================================================
   CHESS
   ========================================================= */
const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
const GLYPH = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
const TXT = "︎"; // bach ma ybanch emoji f Android
const isW = (p) => p && p === p.toUpperCase();
const colorOf = (p) => !p ? -1 : (isW(p) ? 0 : 1);
const PST_N = [-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,5,5,0,-20,-40,-30,5,10,15,15,10,5,-30,-30,0,15,20,20,15,0,-30,-30,5,15,20,20,15,5,-30,-30,0,10,15,15,10,0,-30,-40,-20,0,0,0,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50];
const PST_P = [0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0];
const PST_B = [-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,10,10,5,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20];
const PST_K = [-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-20,-30,-30,-40,-40,-30,-30,-20,-10,-20,-20,-20,-20,-20,-20,-10,20,20,0,0,0,0,20,20,20,30,10,0,0,10,30,20];

function chInit() {
  const b = "rnbqkbnrpppppppp" + "".padEnd(32, ".") + "PPPPPPPPRNBQKBNR";
  return { b: b.split("").map(c => c === "." ? "" : c), cs: { K: 1, Q: 1, k: 1, q: 1 }, ep: -1, hm: 0 };
}
function attacked(st, sq, by) {
  const b = st.b, r = sq >> 3, c = sq & 7;
  // pawns
  const pr = by === 0 ? r + 1 : r - 1, pp = by === 0 ? "P" : "p";
  if (pr >= 0 && pr < 8) for (const dc of [-1, 1]) { const cc = c + dc; if (cc >= 0 && cc < 8 && b[pr * 8 + cc] === pp) return true; }
  const N = by === 0 ? "N" : "n", K = by === 0 ? "K" : "k", B = by === 0 ? "B" : "b", Rk = by === 0 ? "R" : "r", Q = by === 0 ? "Q" : "q";
  for (const [dr, dc] of [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]]) { const rr = r + dr, cc = c + dc; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === N) return true; }
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { if (!dr && !dc) continue; const rr = r + dr, cc = c + dc; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === K) return true; }
  for (const [dr, dc] of [[1,1],[1,-1],[-1,1],[-1,-1]]) { let rr = r + dr, cc = c + dc; while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) { const p = b[rr * 8 + cc]; if (p) { if (p === B || p === Q) return true; break; } rr += dr; cc += dc; } }
  for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) { let rr = r + dr, cc = c + dc; while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) { const p = b[rr * 8 + cc]; if (p) { if (p === Rk || p === Q) return true; break; } rr += dr; cc += dc; } }
  return false;
}
function kingSq(st, col) { const k = col === 0 ? "K" : "k"; return st.b.indexOf(k); }
function inCheck(st, col) { return attacked(st, kingSq(st, col), 1 - col); }
function pseudo(st, col) {
  const b = st.b, mv = [];
  for (let sq = 0; sq < 64; sq++) {
    const p = b[sq]; if (!p || colorOf(p) !== col) continue;
    const t = p.toLowerCase(), r = sq >> 3, c = sq & 7;
    const add = (to, extra) => mv.push(Object.assign({ from: sq, to }, extra || {}));
    if (t === "p") {
      const dir = col === 0 ? -1 : 1, start = col === 0 ? 6 : 1, last = col === 0 ? 0 : 7;
      const one = sq + dir * 8;
      if (r + dir >= 0 && r + dir < 8 && !b[one]) {
        add(one, (r + dir) === last ? { promo: "q" } : null);
        const two = sq + dir * 16;
        if (r === start && !b[two]) add(two, { dbl: 1 });
      }
      for (const dc of [-1, 1]) {
        const cc = c + dc, rr = r + dir; if (cc < 0 || cc > 7 || rr < 0 || rr > 7) continue;
        const to = rr * 8 + cc;
        if (b[to] && colorOf(b[to]) !== col) add(to, rr === last ? { promo: "q" } : null);
        else if (to === st.ep) add(to, { ep: 1 });
      }
    } else if (t === "n" || t === "k") {
      const ds = t === "n" ? [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]] : [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
      for (const [dr, dc] of ds) { const rr = r + dr, cc = c + dc; if (rr < 0 || rr > 7 || cc < 0 || cc > 7) continue; const to = rr * 8 + cc; if (!b[to] || colorOf(b[to]) !== col) add(to); }
      if (t === "k") {
        const home = col === 0 ? 60 : 4;
        if (sq === home && !inCheck(st, col)) {
          const Kc = col === 0 ? "K" : "k", Qc = col === 0 ? "Q" : "q";
          if (st.cs[Kc] && !b[home + 1] && !b[home + 2] && b[home + 3] === (col === 0 ? "R" : "r") && !attacked(st, home + 1, 1 - col) && !attacked(st, home + 2, 1 - col)) add(home + 2, { castle: "k" });
          if (st.cs[Qc] && !b[home - 1] && !b[home - 2] && !b[home - 3] && b[home - 4] === (col === 0 ? "R" : "r") && !attacked(st, home - 1, 1 - col) && !attacked(st, home - 2, 1 - col)) add(home - 2, { castle: "q" });
        }
      }
    } else {
      const ds = t === "b" ? [[1,1],[1,-1],[-1,1],[-1,-1]] : t === "r" ? [[1,0],[-1,0],[0,1],[0,-1]] : [[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
      for (const [dr, dc] of ds) { let rr = r + dr, cc = c + dc; while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) { const to = rr * 8 + cc; if (b[to]) { if (colorOf(b[to]) !== col) add(to); break; } add(to); rr += dr; cc += dc; } }
    }
  }
  return mv;
}
function make(st, m) {
  const b = st.b.slice(), cs = Object.assign({}, st.cs), p = b[m.from], col = colorOf(p);
  const cap = b[m.to];
  b[m.to] = m.promo ? (col === 0 ? m.promo.toUpperCase() : m.promo) : p; b[m.from] = "";
  if (m.ep) b[m.to + (col === 0 ? 8 : -8)] = "";
  if (m.castle) { const home = col === 0 ? 60 : 4; if (m.castle === "k") { b[home + 1] = b[home + 3]; b[home + 3] = ""; } else { b[home - 1] = b[home - 4]; b[home - 4] = ""; } }
  if (p === "K") { cs.K = 0; cs.Q = 0; } if (p === "k") { cs.k = 0; cs.q = 0; }
  if (m.from === 63 || m.to === 63) cs.K = 0; if (m.from === 56 || m.to === 56) cs.Q = 0;
  if (m.from === 7 || m.to === 7) cs.k = 0; if (m.from === 0 || m.to === 0) cs.q = 0;
  return { b, cs, ep: m.dbl ? (m.from + m.to) >> 1 : -1, hm: (p.toLowerCase() === "p" || cap || m.ep) ? 0 : st.hm + 1 };
}
function legal(st, col) { return pseudo(st, col).filter(m => !inCheck(make(st, m), col)); }
function evalSt(st) { // mn jiha dyal l'byad
  let s = 0; const b = st.b;
  for (let i = 0; i < 64; i++) {
    const p = b[i]; if (!p) continue; const t = p.toLowerCase(), w = isW(p), idx = w ? i : (56 ^ i);
    let v = VAL[t];
    if (t === "n") v += PST_N[idx]; else if (t === "p") v += PST_P[idx]; else if (t === "b") v += PST_B[idx]; else if (t === "k") v += PST_K[idx];
    s += w ? v : -v;
  }
  return s;
}
function order(st, ms) { return ms.map(m => ({ m, k: (st.b[m.to] ? VAL[st.b[m.to].toLowerCase()] * 10 - VAL[st.b[m.from].toLowerCase()] : 0) + (m.promo ? 800 : 0) })).sort((a, b) => b.k - a.k).map(x => x.m); }
function quiesce(st, col, a, b, d) {
  const stand = col === 0 ? evalSt(st) : -evalSt(st);
  if (stand >= b) return b; if (stand > a) a = stand; if (d <= 0) return a;
  for (const m of order(st, pseudo(st, col).filter(m => st.b[m.to]))) {
    const n = make(st, m); if (inCheck(n, col)) continue;
    const v = -quiesce(n, 1 - col, -b, -a, d - 1);
    if (v >= b) return b; if (v > a) a = v;
  }
  return a;
}
function search(st, col, depth, a, b) {
  if (depth === 0) return quiesce(st, col, a, b, 3);
  const ms = legal(st, col);
  if (!ms.length) return inCheck(st, col) ? -100000 - depth : 0;
  let best = -Infinity;
  for (const m of order(st, ms)) {
    const v = -search(make(st, m), 1 - col, depth - 1, -b, -a);
    if (v > best) best = v; if (v > a) a = v; if (a >= b) break;
  }
  return best;
}
function chBot(s) {
  const st = s.ch, col = s.turn, ms = legal(st, col);
  if (s.level === "easy") {
    if (Math.random() < 0.55) return ms[rnd(ms.length)];
    const caps = ms.filter(m => st.b[m.to]); if (caps.length && Math.random() < 0.7) return order(st, caps)[0];
    return ms[rnd(ms.length)];
  }
  const depth = s.level === "hard" ? 3 : 2;
  let best = -Infinity, list = [];
  for (const m of order(st, ms)) {
    let v = -search(make(st, m), 1 - col, depth - 1, -Infinity, Infinity);
    if (s.level === "mid") v += rnd(40) - 20;
    if (v > best) { best = v; list = [m]; } else if (v === best) list.push(m);
  }
  return list[rnd(list.length)];
}
function chResult(s) {
  const st = s.ch, next = 1 - s.turn;
  if (!legal(st, next).length) return inCheck(st, next) ? { side: s.turn, line: [] } : { side: -1, line: [] };
  if (st.hm >= 100) return { side: -1, line: [] };
  const left = st.b.filter(Boolean);
  if (left.length === 2) return { side: -1, line: [] };
  if (left.length === 3 && left.some(p => "nNbB".includes(p))) return { side: -1, line: [] };
  return null;
}
function captured(st) {
  const init = { P: 8, N: 2, B: 2, R: 2, Q: 1, p: 8, n: 2, b: 2, r: 2, q: 1 }, cnt = {};
  st.b.forEach(p => { if (p) cnt[p] = (cnt[p] || 0) + 1; });
  const w = [], bl = [];
  for (const k of "QRBNP") { for (let i = 0; i < Math.max(0, init[k] - (cnt[k] || 0)); i++) w.push(GLYPH[k.toLowerCase()]); }
  for (const k of "qrbnp") { for (let i = 0; i < Math.max(0, init[k] - (cnt[k] || 0)); i++) bl.push(GLYPH[k]); }
  return { lostW: w, lostB: bl };
}

if (window.frleesMakeGame) {
  const chess = window.frleesMakeGame({
    id: "chess", title: "Chess",
    colors: ["var(--accent)", "var(--accent)"],
    badge: (side) => `<span class="ch-sw">${side === 0 ? "♔" : "♚"}${TXT}</span>`,
    hint: (s) => s.ch && inCheck(s.ch, s.turn) ? "<b style='color:#ff5a7a'>Echec!</b>" : "",
    reset: (s) => { s.ch = chInit(); s.sel = -1; s.lastMv = null; },
    board: (s) => {
      const st = s.ch, flip = s.vsBot && s.first === 1;
      const targets = s.sel >= 0 ? legal(st, s.turn).filter(m => m.from === s.sel) : [];
      const chk = inCheck(st, s.turn) ? kingSq(st, s.turn) : -1;
      const cap = captured(st);
      let html = "";
      for (let i = 0; i < 64; i++) {
        const sq = flip ? 63 - i : i, r = sq >> 3, c = sq & 7, p = st.b[sq];
        const t = targets.find(m => m.to === sq);
        let cls = (r + c) % 2 ? "d" : "l";
        if (s.lastMv && (s.lastMv.from === sq || s.lastMv.to === sq)) cls += " last";
        if (sq === s.sel) cls += " sel";
        if (sq === chk) cls += " chk";
        if (t) cls += p || t.ep ? " cap" : " mv";
        html += `<button data-sq="${sq}" class="${cls}" aria-label="${"abcdefgh"[c]}${8 - r}">${p ? `<span class="${isW(p) ? "pw" : "pb"}">${GLYPH[p.toLowerCase()]}${TXT}</span>` : ""}</button>`;
      }
      const topLost = flip ? cap.lostW : cap.lostB, botLost = flip ? cap.lostB : cap.lostW;
      return `<div class="ch-wrap"><div class="ch-capt">${topLost.map(g => g + TXT).join("")}</div><div class="ch-board">${html}</div><div class="ch-capt" style="justify-content:flex-end">${botLost.map(g => g + TXT).join("")}</div></div>`;
    },
    bind: function bind(r, s, move) {
      const self = this;
      r.querySelectorAll(".ch-board button").forEach(btn => btn.onclick = () => {
        if (s.locked) return;
        const sq = +btn.dataset.sq, st = s.ch, p = st.b[sq];
        if (s.sel >= 0) {
          const m = legal(st, s.turn).find(x => x.from === s.sel && x.to === sq);
          if (m) { s.sel = -1; move(m); return; }
        }
        s.sel = (p && colorOf(p) === s.turn && sq !== s.sel) ? sq : -1;
        const b = r.querySelector("#jxBoard"); b.innerHTML = self.board(s); bind.call(self, r, s, move);
      });
    },
    apply: (s, m) => { s.ch = make(s.ch, m); s.lastMv = m; s.sel = -1; return true; },
    result: chResult,
    bot: chBot
  });
  window.frleesChess = chess;
}

/* =========================================================
   PARCHIS (2 d nred)
   ========================================================= */
const PC = {
  b: { name: "Zre9", a: "#1d6fe0", b2: "#5aa2ff", c: "#2b7cf0" },
  y: { name: "Sfer", a: "#e3a400", b2: "#ffd23f", c: "#f4bf1a" },
  g: { name: "Khder", a: "#16a34a", b2: "#4ade80", c: "#22b455" },
  r: { name: "7mer", a: "#d9362b", b2: "#ff6b5e", c: "#e8473b" }
};
const PORDER = ["r", "g", "y", "b"]; // tartib dyal l'adwar (b7al l'ar9am)
const START = { r: 1, g: 18, y: 35, b: 52 };
const SAFE = new Set([1, 8, 13, 18, 25, 30, 35, 42, 47, 52, 59, 64]);
const H = 105, A = 90, W = 300, LL = H / 8, CW = 30;
function armRect(kind, o, c) {
  if (kind === "top") return [H + c * CW, o * LL, CW, LL];
  if (kind === "bottom") return [H + c * CW, W - (o + 1) * LL, CW, LL];
  if (kind === "left") return [o * LL, H + c * CW, LL, CW];
  return [W - (o + 1) * LL, H + c * CW, LL, CW];
}
// ar9am dyal l'tri9 -> [kind, o, c]
const TRACK = {};
for (let o = 0; o < 8; o++) {
  TRACK[[65,66,67,68,1,2,3,4][o]] = ["left", o, 2]; TRACK[63 - o] = ["left", o, 0];
  TRACK[12 - o] = ["bottom", o, 0]; TRACK[14 + o] = ["bottom", o, 2];
  TRACK[31 + o] = ["right", o, 0]; TRACK[29 - o] = ["right", o, 2];
  TRACK[48 + o] = ["top", o, 0]; TRACK[46 - o] = ["top", o, 2];
}
TRACK[64] = ["left", 0, 1]; TRACK[13] = ["bottom", 0, 1]; TRACK[30] = ["right", 0, 1]; TRACK[47] = ["top", 0, 1];
const LANE = { r: "left", g: "bottom", y: "right", b: "top" };
const HOMEXY = { b: [0, 0], y: [H + A, 0], r: [0, H + A], g: [H + A, H + A] };
const center = (rc) => [rc[0] + rc[2] / 2, rc[1] + rc[3] / 2];
const trackNum = (col, p) => ((START[col] - 1 + p) % 68) + 1;
function posXY(col, p, idx) {
  if (p < 0) { const [x, y] = HOMEXY[col]; const d = [[-1,-1],[1,-1],[-1,1],[1,1]][idx]; return [x + H / 2 + d[0] * 19, y + H / 2 + d[1] * 19]; }
  if (p <= 63) return center(armRect(...TRACK[trackNum(col, p)]));
  if (p <= 70) return center(armRect(LANE[col], p - 63, 1));
  const m = W / 2, off = { b: [0, -24], y: [24, 0], g: [0, 24], r: [-24, 0] }[col], d = [[-6,-6],[6,-6],[-6,6],[6,6]][idx];
  return [m + off[0] + d[0], m + off[1] + d[1]];
}
function boardSVG() {
  const o = [`<svg viewBox="-10 -10 ${W + 20} ${W + 20}" class="pa-svg"><defs>`];
  for (const k in PC) {
    o.push(`<linearGradient id="pah${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PC[k].b2}"/><stop offset="1" stop-color="${PC[k].a}"/></linearGradient>`);
    o.push(`<radialGradient id="pat${k}" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="${PC[k].b2}"/><stop offset="1" stop-color="${PC[k].a}"/></radialGradient>`);
  }
  o.push(`<linearGradient id="pawood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3a46a"/><stop offset="1" stop-color="#b8743f"/></linearGradient><filter id="pash"><feDropShadow dx="0" dy="1.6" stdDeviation="1.2" flood-opacity=".35"/></filter></defs>`);
  o.push(`<rect x="-10" y="-10" width="${W + 20}" height="${W + 20}" rx="18" fill="url(#pawood)"/><rect x="-3" y="-3" width="${W + 6}" height="${W + 6}" rx="12" fill="#8a5428" opacity=".55"/><rect x="0" y="0" width="${W}" height="${W}" rx="8" fill="#f6f3ee"/>`);
  for (const k in HOMEXY) {
    const [x, y] = HOMEXY[k];
    o.push(`<rect x="${x}" y="${y}" width="${H}" height="${H}" fill="${PC[k].c}"/><rect x="${x + 10}" y="${y + 10}" width="${H - 20}" height="${H - 20}" rx="14" fill="url(#pah${k})"/>`);
    for (const d of [[-1,-1],[1,-1],[-1,1],[1,1]]) o.push(`<circle cx="${x + H / 2 + d[0] * 19}" cy="${y + H / 2 + d[1] * 19}" r="12.5" fill="${PC[k].a}" opacity=".6"/>`);
  }
  const star = (cx, cy) => { const p = []; for (let i = 0; i < 10; i++) { const a = (-90 + i * 36) * Math.PI / 180, r = i % 2 ? 2.2 : 5.2; p.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1)); } return `<polygon points="${p.join(" ")}" fill="#686872"/>`; };
  const cellR = (rc, fill) => `<rect x="${rc[0].toFixed(2)}" y="${rc[1].toFixed(2)}" width="${rc[2].toFixed(2)}" height="${rc[3].toFixed(2)}" fill="${fill}" stroke="#2d2d35" stroke-opacity=".3" stroke-width=".6"/>`;
  const startCol = { 1: "r", 18: "g", 35: "y", 52: "b" };
  for (let n = 1; n <= 68; n++) {
    const t = TRACK[n], rc = armRect(...t), vertical = t[0] === "top" || t[0] === "bottom";
    if (startCol[n]) { o.push(cellR(rc, PC[startCol[n]].c)); continue; }
    if (SAFE.has(n)) { o.push(cellR(rc, "#b9b9c2") + star(...center(rc))); continue; }
    o.push(cellR(rc, "#fff"));
    const ax = t[2] === 0 ? (vertical ? "end" : "middle") : (vertical ? "start" : "middle");
    const tx = vertical ? (t[2] === 0 ? rc[0] + rc[2] - 2 : rc[0] + 2) : rc[0] + rc[2] / 2;
    o.push(`<text x="${tx.toFixed(1)}" y="${(rc[1] + rc[3] - 2.5).toFixed(1)}" font-size="6.5" fill="#55555f" text-anchor="${ax}" font-family="Segoe UI,sans-serif">${n}</text>`);
  }
  for (const k in LANE) for (let i = 1; i <= 7; i++) o.push(cellR(armRect(LANE[k], i, 1), PC[k].c));
  const c0 = H, c1 = H + A, m = W / 2;
  const tri = { b: `${c0},${c0} ${c1},${c0} ${m},${m}`, y: `${c1},${c0} ${c1},${c1} ${m},${m}`, g: `${c1},${c1} ${c0},${c1} ${m},${m}`, r: `${c0},${c1} ${c0},${c0} ${m},${m}` };
  for (const k in tri) o.push(`<polygon points="${tri[k]}" fill="${PC[k].c}" stroke="#2d2d35" stroke-opacity=".25" stroke-width=".6"/>`);
  o.push(`<g id="paToks"></g></svg>`);
  return o.join("");
}

const pa = (() => {
  const st = { setup: [{ k: "b", name: "", mode: "j" }, { k: "y", name: "", mode: "r" }, { k: "g", name: "", mode: "x" }, { k: "r", name: "", mode: "j" }], g: null, rid: 0 };
  const root = () => document.getElementById("parchis");
  const render = (html, after) => { const r = root(); r.innerHTML = `<div class="pa">${html}</div>`; if (after) after(r); };
  const label = (p) => p.name.trim() || (p.mode === "r" ? "Robot" : "Joueur " + PC[p.k].name);

  function setup(err) {
    const G = (k) => `linear-gradient(135deg,${PC[k].a},${PC[k].b2})`;
    const rows = st.setup.map((p, i) => `<div class="pa-pl${p.mode === "x" ? " off" : ""}"><div class="nm"><span style="background:${G(p.k)}"></span><input id="paN${i}" data-i="${i}" value="${esc(p.name)}" placeholder="${p.mode === "r" ? "Robot" : "Joueur " + PC[p.k].name}" maxlength="14" autocomplete="off"></div>
      <div class="seg">${[["j","Joueur"],["r","Robot"],["x","Walo"]].map(([m,t]) => `<button data-i="${i}" data-m="${m}" class="${p.mode === m ? "on" : ""}" style="${p.mode === m ? "background:" + G(p.k) : ""}">${t}</button>`).join("")}</div></div>`).join("");
    render(`<div class="jx-title">Parchis</div><div class="jx-muted">Khtar chkoun ghadi yl3b (2 7tta 4)</div>${rows}
      <div class="jx-muted" style="color:#ff5a7a;min-height:18px">${err || ""}</div>
      <div class="jx-actions"><button class="jx-btn" id="paGo">Bda</button></div>`, r => {
      r.querySelectorAll("input[data-i]").forEach(inp => inp.oninput = () => st.setup[+inp.dataset.i].name = inp.value);
      r.querySelectorAll("button[data-m]").forEach(b => b.onclick = () => { st.setup[+b.dataset.i].mode = b.dataset.m; setup(); });
      r.querySelector("#paGo").onclick = () => {
        const act = st.setup.filter(p => p.mode !== "x");
        if (act.length < 2) return setup("Khass 2 d nas 3l l'a9all");
        if (!act.some(p => p.mode === "j")) return setup("Khass joueur wa7d 3l l'a9all");
        start();
      };
    });
  }

  function start() {
    st.rid++;
    const players = PORDER.map(k => st.setup.find(p => p.k === k)).filter(p => p.mode !== "x").map(p => ({ k: p.k, bot: p.mode === "r", name: label(p), pcs: [-1, -1, -1, -1] }));
    st.g = { players, turn: rnd(players.length), dice: null, used: [], bonus: 0, act: 0, msg: "", over: false, doubles: 0, rolling: false };
    st.g.msg = `${players[st.g.turn].name}: drb 3la nred`;
    draw(); maybeBot();
  }
  const cur = () => st.g.players[st.g.turn];

  // l'pions dyal l'khrin f chi khana dyal l'tri9
  function occupants(num) {
    const out = [];
    st.g.players.forEach((pl, pi) => pl.pcs.forEach((p, i) => { if (p >= 0 && p <= 63 && trackNum(pl.k, p) === num) out.push({ pi, i }); }));
    return out;
  }
  // wach had l'pion y9der yt7rk b n
  function canMove(pl, i, n) {
    const p = pl.pcs[i];
    if (p === 71) return false;
    if (p < 0) return n === 5 && occupants(START[pl.k]).filter(o => st.g.players[o.pi].k === pl.k).length < 2;
    const np = p + n; if (np > 71) return false;
    // ma t9derch tdouz 3la blocage (2 pions f nfs l'khana)
    for (let s = p + 1; s <= Math.min(np, 63); s++) { if (occupants(trackNum(pl.k, s)).length >= 2) return false; }
    return true;
  }
  function values() { // l'9iyam li mazal ma tst3mlouch
    const g = st.g, v = [];
    if (!g.dice) return v;
    g.dice.forEach((d, i) => { if (!g.used[i]) v.push({ n: d, src: [i] }); });
    if (g.dice && !g.used[0] && !g.used[1] && g.dice[0] + g.dice[1] === 5 && g.dice[0] !== 5 && g.dice[1] !== 5) v.push({ n: 5, src: [0, 1], exitOnly: true });
    if (g.bonus) v.push({ n: g.bonus, src: ["b"] });
    return v;
  }
  function movesFor(val) { const pl = cur(), out = []; pl.pcs.forEach((p, i) => { if (val.exitOnly && p >= 0) return; if (canMove(pl, i, val.n)) out.push(i); }); return out; }
  function anyMove() { return values().some(v => movesFor(v).length); }

  function roll() {
    const g = st.g; if (g.over || g.dice || g.rolling) return;
    g.rolling = true; g.dice = [1 + rnd(6), 1 + rnd(6)]; g.used = [false, false]; g.act = 0;
    const dbl = g.dice[0] === g.dice[1];
    g.doubles = dbl ? g.doubles + 1 : 0;
    g.msg = `${cur().name} jab ${g.dice[0]} w ${g.dice[1]}${dbl ? " (juj b7al b7al!)" : ""}`;
    draw(true);
    setTimeout(() => { g.rolling = false; afterRoll(); }, 480);
  }
  function afterRoll() {
    const g = st.g;
    if (!anyMove()) { g.msg += " · ma kayn ta l3ba"; draw(); setTimeout(endTurn, 1100); return; }
    pickAct(); draw(); maybeBot();
  }
  function pickAct() { const v = values(); const i = v.findIndex(x => movesFor(x).length); st.g.act = Math.max(0, i); }

  function doMove(i, val) {
    const g = st.g, pl = cur(); let p = pl.pcs[i];
    const np = p < 0 ? 0 : p + val.n;
    pl.pcs[i] = np;
    val.src.forEach(s => { if (s === "b") g.bonus = 0; else g.used[s] = true; });
    let extra = "";
    if (np <= 63) {
      const num = trackNum(pl.k, np);
      if (!SAFE.has(num)) {
        const victims = occupants(num).filter(o => st.g.players[o.pi].k !== pl.k);
        if (victims.length === 1) { const v = victims[0]; st.g.players[v.pi].pcs[v.i] = -1; g.bonus = 20; extra = ` · kla pion dyal ${st.g.players[v.pi].name}! +20`; }
      }
    }
    if (np === 71) { g.bonus = 10; extra = " · wsel l dar! +10"; }
    g.msg = `${pl.name}${extra || " l3eb"}`;
    if (pl.pcs.every(x => x === 71)) { g.over = true; g.winner = g.turn; draw(); return; }
    const left = values().filter(v => movesFor(v).length);
    if (!left.length) { draw(); setTimeout(endTurn, 600); return; }
    pickAct(); draw(); maybeBot();
  }
  function endTurn() {
    const g = st.g; if (g.over) return;
    const again = g.dice && g.dice[0] === g.dice[1] && g.doubles < 3;
    g.dice = null; g.used = []; g.bonus = 0;
    if (!again) { g.turn = (g.turn + 1) % g.players.length; g.doubles = 0; }
    g.msg = `${cur().name}${again ? " 3awd yl3b (juj b7al b7al)" : ""}: drb 3la nred`;
    draw(); maybeBot();
  }

  function botChoose() {
    const pl = cur(); let best = null;
    values().forEach(v => movesFor(v).forEach(i => {
      const p = pl.pcs[i], np = p < 0 ? 0 : p + v.n; let sc = 0;
      if (p < 0) sc += 60;
      if (np === 71) sc += 80;
      if (np <= 63) {
        const num = trackNum(pl.k, np);
        if (!SAFE.has(num) && occupants(num).some(o => st.g.players[o.pi].k !== pl.k)) sc += 100;
        if (SAFE.has(num)) sc += 20;
      } else sc += 30;
      sc += np / 4 + Math.random() * 5;
      if (!best || sc > best.sc) best = { sc, i, v };
    }));
    return best;
  }
  function maybeBot() {
    const g = st.g, rid = st.rid; if (!g || g.over || !cur().bot) return;
    setTimeout(() => {
      if (rid !== st.rid || !root().classList.contains("on") || g.over || !cur().bot) return;
      if (!g.dice) { roll(); return; }
      if (g.rolling) return;
      const b = botChoose(); if (b) doMove(b.i, b.v);
    }, g.dice ? 650 : 700);
  }

  function dieHTML(n, cls) { const on = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] }[n]; return `<div class="pa-die ${cls}">${Array.from({ length: 9 }, (_, k) => `<b class="${on.includes(k) ? "on" : ""}"></b>`).join("")}</div>`; }

  function draw(rolling) {
    const g = st.g, pl = cur();
    const vals = values(), act = vals[g.act];
    const movable = (!pl.bot && act && !g.rolling) ? movesFor(act) : [];
    const who = g.players.map((p, i) => `<div class="pa-who${i === g.turn && !g.over ? " on" : ""}" style="--c:${PC[p.k].a}"><i style="background:linear-gradient(135deg,${PC[p.k].a},${PC[p.k].b2})"></i><div style="min-width:0"><b>${esc(p.name)}</b><small>${p.pcs.filter(x => x === 71).length}/4 f dar</small></div></div>`).join("");
    let diceInner;
    if (g.dice) {
      diceInner = g.dice.map((d, i) => { const isAct = act && act.src.length === 1 && act.src[0] === i; return dieHTML(d, (g.used[i] ? "used " : "") + (isAct && !pl.bot ? "act " : "") + (rolling ? "roll" : "")).replace('class="pa-die', `data-v="${i}" class="pa-die`); }).join("");
      if (g.bonus) diceInner += `<div class="pa-bonus${act && act.src[0] === "b" ? " act" : ""}" data-v="b">+${g.bonus}</div>`;
    } else diceInner = dieHTML(6, "") + dieHTML(6, "");
    const canRoll = !g.dice && !g.over && !pl.bot;
    render(`
      <div class="pa-top">${who}</div>
      <div id="paBoard">${boardSVG()}</div>
      <div class="pa-bar">
        <button class="pa-dice" id="paDice" style="--c:linear-gradient(135deg,${PC[pl.k].a},${PC[pl.k].b2});background:linear-gradient(135deg,${PC[pl.k].a},${PC[pl.k].b2})" aria-label="Drb nred">${diceInner}</button>
        <div class="pa-msg"><b>${esc(g.msg)}</b><small>${g.over ? "" : pl.bot ? "L'robot kayfekker..." : canRoll ? "Drb 3la nred" : (act && act.exitOnly ? "Juj d nred = 5: khrj pion" : vals.length > 1 ? "Drb 3la nred bach tbddl, w khtar pion" : "Khtar pion bach t7rko")}</small></div>
      </div>
      <div class="jx-actions"><button class="jx-btn alt" id="paLeave">Leave Partie</button></div>
    `, r => {
      // pions
      const tg = r.querySelector("#paToks"); let svg = "";
      const stack = {};
      g.players.forEach((p, pi) => p.pcs.forEach((pos, i) => {
        let [x, y] = posXY(p.k, pos, i);
        const key = pos >= 0 && pos <= 70 ? x.toFixed(0) + "," + y.toFixed(0) : null;
        if (key) { const n = stack[key] = (stack[key] || 0) + 1; if (n > 1) { x += 5; y -= 4; } }
        const can = pi === g.turn && movable.includes(i);
        const rr = pos < 0 ? 11 : pos === 71 ? 5.5 : 7;
        svg += `<g class="tok" data-i="${pi === g.turn ? i : ""}">${can ? `<circle cx="${x}" cy="${y}" r="${rr + 3}" fill="none" stroke="#fff" stroke-width="2.2"><animate attributeName="r" values="${rr + 2};${rr + 6};${rr + 2}" dur="1.1s" repeatCount="indefinite"/></circle>` : ""}<circle cx="${x}" cy="${y}" r="${rr}" fill="url(#pat${p.k})" stroke="#fff" stroke-width="1.7" filter="url(#pash)"/>${can ? `<circle cx="${x}" cy="${y}" r="${rr + 8}" fill="transparent"/>` : ""}</g>`;
      }));
      tg.innerHTML = svg;
      tg.querySelectorAll(".tok").forEach(t => t.onclick = () => { const i = t.dataset.i; if (i === "" || !movable.includes(+i)) return; doMove(+i, act); });
      r.querySelector("#paDice").onclick = (e) => {
        if (canRoll) return roll();
        const v = e.target.closest("[data-v]"); if (!v || pl.bot || !g.dice) return;
        const key = v.dataset.v, idx = vals.findIndex(x => x.src.length === 1 && String(x.src[0]) === key && movesFor(x).length);
        const comb = vals.findIndex(x => x.exitOnly);
        if (idx >= 0 && idx !== g.act) g.act = idx; else if (comb >= 0 && movesFor(vals[comb]).length) g.act = g.act === comb ? Math.max(0, idx) : comb;
        draw();
      };
      r.querySelector("#paLeave").onclick = () => { st.rid++; show("home"); };
      if (g.over) {
        const b = r.querySelector("#paBoard"); b.style.position = "relative";
        b.insertAdjacentHTML("beforeend", `<div class="jx-ov"><h3>${esc(g.players[g.winner].name)} rbe7!</h3><button class="jx-btn" id="paAgain">3awd</button></div>`);
        b.querySelector("#paAgain").onclick = start;
      }
    });
  }
  return { open: () => { st.rid++; setup(); } };
})();

/* =========================================================
   BLOCKS
   ========================================================= */
const SHAPES = [
  [[0,0]], [[0,0],[0,1]], [[0,0],[1,0]], [[0,0],[0,1],[0,2]], [[0,0],[1,0],[2,0]],
  [[0,0],[0,1],[0,2],[0,3]], [[0,0],[1,0],[2,0],[3,0]], [[0,0],[0,1],[0,2],[0,3],[0,4]], [[0,0],[1,0],[2,0],[3,0],[4,0]],
  [[0,0],[0,1],[1,0],[1,1]], [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]],
  [[0,0],[1,0],[1,1]], [[0,1],[1,0],[1,1]], [[0,0],[0,1],[1,0]], [[0,0],[0,1],[1,1]],
  [[0,0],[1,0],[2,0],[2,1]], [[0,1],[1,1],[2,1],[2,0]], [[0,0],[0,1],[1,0],[2,0]], [[0,0],[0,1],[1,1],[2,1]],
  [[0,0],[0,1],[0,2],[1,1]], [[1,0],[1,1],[1,2],[0,1]], [[0,0],[1,0],[1,1],[2,0]], [[0,1],[1,0],[1,1],[2,1]],
  [[0,0],[0,1],[1,1],[1,2]], [[0,1],[0,2],[1,0],[1,1]],
  [[0,0],[1,0],[2,0],[2,1],[2,2]], [[0,2],[1,2],[2,0],[2,1],[2,2]]
];
const bl = (() => {
  const st = { grid: null, tray: [], score: 0, best: +store.get("blocksBest", 0), combo: 0, over: false };
  const root = () => document.getElementById("blocks");
  const fits = (sh, r, c) => sh.every(([dr, dc]) => { const rr = r + dr, cc = c + dc; return rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && !st.grid[rr][cc]; });
  const fitsAny = (sh) => { for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (fits(sh, r, c)) return true; return false; };
  function newPiece() { return { sh: SHAPES[rnd(SHAPES.length)], col: 1 + rnd(6) }; }
  function refill() {
    for (let t = 0; t < 30; t++) { st.tray = [newPiece(), newPiece(), newPiece()]; if (st.tray.some(p => fitsAny(p.sh))) return; }
  }
  function start() { st.grid = Array.from({ length: 8 }, () => Array(8).fill(0)); st.score = 0; st.combo = 0; st.over = false; refill(); draw(); }
  const dims = (sh) => [Math.max(...sh.map(p => p[0])) + 1, Math.max(...sh.map(p => p[1])) + 1];

  function draw() {
    const cells = st.grid.map((row, r) => row.map((v, c) => `<i data-r="${r}" data-c="${c}" class="${v ? "bl-c bl-c" + v : ""}"></i>`).join("")).join("");
    const tray = st.tray.map((p, i) => {
      if (!p) return "<div></div>";
      const [h, w] = dims(p.sh), set = new Set(p.sh.map(x => x[0] + "," + x[1]));
      let inner = ""; for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) inner += set.has(r + "," + c) ? `<i class="bl-c bl-c${p.col}"></i>` : "<i></i>";
      return `<div class="bl-pz${fitsAny(p.sh) ? "" : " no"}" data-i="${i}" style="grid-template-columns:repeat(${w},auto)">${inner}</div>`;
    }).join("");
    root().innerHTML = `<div class="bl">
      <div class="bl-stat"><div>Score<b id="blScore">${st.score}</b></div><div>Record<b>${st.best}</b></div></div>
      <div class="bl-grid" id="blGrid">${cells}</div>
      <div class="bl-tray" id="blTray">${tray}</div>
      <div class="jx-muted" style="text-align:center;font-size:13px">Jerr l'pièce l l'board · 3emmer stra wla 3amoud bach ttms7</div>
      <div class="jx-actions"><button class="jx-btn alt" id="blLeave">Leave Partie</button></div></div>`;
    root().querySelector("#blLeave").onclick = () => show("home");
    root().querySelectorAll(".bl-pz").forEach(el => el.addEventListener("pointerdown", e => startDrag(e, +el.dataset.i, el)));
    if (st.over) {
      const g = root().querySelector("#blGrid");
      g.insertAdjacentHTML("beforeend", `<div class="jx-ov"><h3>Salat!</h3><div class="jx-muted">Score: <b>${st.score}</b>${st.score && st.score >= st.best ? " · record jdid!" : ""}</div><button class="jx-btn" id="blAgain">3awd</button></div>`);
      g.querySelector("#blAgain").onclick = start;
    }
  }

  function startDrag(e, i, el) {
    if (st.over) return;
    const p = st.tray[i]; if (!p) return;
    e.preventDefault();
    const grid = root().querySelector("#blGrid"), gcell = grid.querySelector("i").getBoundingClientRect(), gap = 4;
    const size = gcell.width, [h, w] = dims(p.sh), set = new Set(p.sh.map(x => x[0] + "," + x[1]));
    const fl = document.createElement("div"); fl.className = "bl-float";
    fl.style.gridTemplateColumns = `repeat(${w},${size}px)`; fl.style.gap = gap + "px";
    let inner = ""; for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) inner += set.has(r + "," + c) ? `<i class="bl-c bl-c${p.col}" style="width:${size}px;height:${size}px"></i>` : `<i style="width:${size}px;height:${size}px"></i>`;
    fl.innerHTML = inner; document.body.appendChild(fl);
    el.classList.add("drag");
    const lift = e.pointerType === "touch" ? 90 : 20;
    const fw = w * size + (w - 1) * gap, fh = h * size + (h - 1) * gap;
    let target = null;
    const cellsEls = grid.querySelectorAll("i[data-r]");
    const clearGhost = () => cellsEls.forEach(c => c.classList.remove("gh", "bad", "hl"));
    function moveTo(x, y) {
      const left = x - fw / 2, top = y - fh - lift + fh / 2 - fh / 2;
      fl.style.left = left + "px"; fl.style.top = top + "px";
      const g0 = cellsEls[0].getBoundingClientRect(), step = size + gap;
      const c = Math.round((left - g0.left) / step), r = Math.round((top - g0.top) / step);
      clearGhost(); target = null;
      if (r > -h && r < 8 && c > -w && c < 8) {
        const ok = fits(p.sh, r, c);
        if (ok) {
          target = [r, c];
          p.sh.forEach(([dr, dc]) => { const ce = grid.querySelector(`i[data-r="${r + dr}"][data-c="${c + dc}"]`); if (ce) ce.classList.add("gh"); });
          // stour li ghadi ttms7
          const tmp = st.grid.map(row => row.slice()); p.sh.forEach(([dr, dc]) => tmp[r + dr][c + dc] = 1);
          for (let k = 0; k < 8; k++) {
            if (tmp[k].every(Boolean)) for (let cc = 0; cc < 8; cc++) grid.querySelector(`i[data-r="${k}"][data-c="${cc}"]`).classList.add("hl");
            if (tmp.every(row => row[k])) for (let rr = 0; rr < 8; rr++) grid.querySelector(`i[data-r="${rr}"][data-c="${k}"]`).classList.add("hl");
          }
        }
      }
    }
    moveTo(e.clientX, e.clientY);
    const mv = (ev) => { ev.preventDefault(); moveTo(ev.clientX, ev.clientY); };
    const up = () => {
      removeEventListener("pointermove", mv); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
      fl.remove(); clearGhost();
      if (target) place(i, target[0], target[1]); else el.classList.remove("drag");
    };
    addEventListener("pointermove", mv, { passive: false }); addEventListener("pointerup", up); addEventListener("pointercancel", up);
  }

  function place(i, r, c) {
    const p = st.tray[i];
    p.sh.forEach(([dr, dc]) => st.grid[r + dr][c + dc] = p.col);
    st.score += p.sh.length; st.tray[i] = null;
    const rows = [], cols = [];
    for (let k = 0; k < 8; k++) { if (st.grid[k].every(Boolean)) rows.push(k); if (st.grid.every(row => row[k])) cols.push(k); }
    const lines = rows.length + cols.length;
    let gained = 0;
    if (lines) { st.combo++; gained = lines * 10 * (lines > 1 ? lines : 1) * st.combo; st.score += gained; } else st.combo = 0;
    if (st.tray.every(x => !x)) refill();
    const doFinish = () => {
      rows.forEach(k => st.grid[k].fill(0)); cols.forEach(k => st.grid.forEach(row => row[k] = 0));
      if (!st.tray.some(x => x && fitsAny(x.sh))) { st.over = true; if (st.score > st.best) { st.best = st.score; store.set("blocksBest", st.best); } }
      draw();
      if (gained) { const g = root().querySelector("#blGrid"); g.insertAdjacentHTML("beforeend", `<div class="bl-combo">+${gained}${st.combo > 1 ? " · Combo x" + st.combo : ""}</div>`); }
    };
    if (lines) {
      draw();
      const g = root().querySelector("#blGrid");
      rows.forEach(k => { for (let cc = 0; cc < 8; cc++) g.querySelector(`i[data-r="${k}"][data-c="${cc}"]`).classList.add("clr"); });
      cols.forEach(k => { for (let rr = 0; rr < 8; rr++) g.querySelector(`i[data-r="${rr}"][data-c="${k}"]`).classList.add("clr"); });
      if (navigator.vibrate) try { navigator.vibrate(30); } catch (e) {}
      setTimeout(doFinish, 330);
    } else doFinish();
  }
  return { open: start };
})();

/* ---------- CONNECT M3A L'APP ---------- */
const baseShow = window.show;
window.show = function (id) {
  baseShow(id);
  if (id === "chess" && window.frleesChess) window.frleesChess.open();
  if (id === "parchis") pa.open();
  if (id === "blocks") bl.open();
};

})();
