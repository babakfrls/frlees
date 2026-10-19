/* =========================================================
   Parchis — frlees app
   dev by : frlees
   ========================================================= */
(function () {
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rnd = (n) => Math.floor(Math.random() * n);
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
const css2 = `
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
`;
const stEl2 = document.createElement("style"); stEl2.textContent = css2; document.head.appendChild(stEl2);

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
/* ---------- CONNECT M3A L'APP ---------- */
const baseShow = window.show;
window.show = function (id) {
  baseShow(id);
  if (id === "parchis") pa.open();
};

})();
