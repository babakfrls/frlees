/* =========================================================
   XO w Connect 4 — frlees app
   dev by : frlees
   ========================================================= */
(function () {

/* ---------- STYLE ---------- */
const css = `
.jx{max-width:460px;margin:0 auto;display:flex;flex-direction:column;gap:14px;min-height:100%}
.jx-title{font-size:26px;font-weight:800}
.jx-muted{color:var(--muted);font-size:14px}
.jx-card{border-radius:20px;border:1px solid var(--cardBorder);background:var(--card);backdrop-filter:blur(14px);box-shadow:var(--shadow);padding:16px}
.jx-mode{display:flex;align-items:center;gap:14px;cursor:pointer;transition:transform .15s;text-align:left;font:inherit;color:var(--text);width:100%}
.jx-mode:active{transform:scale(.98)}
.jx-ic{width:50px;height:50px;border-radius:15px;display:grid;place-items:center;flex:none;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 20px rgba(47,140,255,.3)}
.jx-ic svg{width:26px;height:26px}
.jx-mode h3{font-size:18px}.jx-mode p{font-size:13px;color:var(--muted)}
.jx-lvl{display:flex;align-items:center;gap:14px;width:100%;padding:16px;border-radius:20px;border:1px solid var(--cardBorder);background:var(--card);backdrop-filter:blur(14px);box-shadow:var(--shadow);cursor:pointer;font:inherit;color:var(--text);text-align:left;transition:transform .15s}
.jx-lvl:active{transform:scale(.98)}
.jx-lvl h3{font-size:19px}
.jx-lvl p{font-size:13px;color:var(--muted);margin-top:2px}
.jx-lvl .em{width:50px;height:50px;border-radius:15px;display:grid;place-items:center;flex:none;color:#fff}
.jx-lvl .em svg{width:28px;height:28px}
.jx-lvl.easy .em{background:linear-gradient(135deg,#16a34a,#4ade80);box-shadow:0 8px 20px rgba(22,163,74,.3)}
.jx-lvl.mid .em{background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 20px rgba(47,140,255,.3)}
.jx-lvl.hard .em{background:linear-gradient(135deg,#dc2626,#ff6b6f);box-shadow:0 8px 20px rgba(220,38,38,.3)}
.jx-input{display:flex;align-items:center;gap:10px;padding:4px 14px;border-radius:13px;border:1px solid var(--cardBorder);background:var(--card)}
.jx-input b{color:var(--muted);font-size:13px;min-width:62px}
.jx-input input{flex:1;min-width:0;border:0;background:transparent;color:var(--text);font:inherit;font-size:15px;padding:11px 0;outline:none}
.jx-btn{display:block;width:100%;padding:15px;border:0;border-radius:15px;font:inherit;font-weight:700;font-size:15px;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 20px rgba(47,140,255,.35)}
.jx-btn.alt{background:var(--card);color:var(--text);border:1px solid var(--cardBorder);box-shadow:none}
.jx-actions{display:flex;flex-direction:column;gap:10px;margin-top:auto}
.jx-score{display:flex;gap:10px}
.jx-pl{flex:1;min-width:0;border-radius:14px;padding:10px 12px;border:1px solid var(--cardBorder);background:var(--card);font-size:13px;transition:box-shadow .2s,border-color .2s}
.jx-pl .n{display:flex;align-items:center;gap:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.jx-pl b{display:block;font-size:24px;font-variant-numeric:tabular-nums}
.jx-pl.on{border-color:var(--c);box-shadow:0 0 0 2px color-mix(in srgb,var(--c) 30%,transparent)}
.jx-sym{font-weight:800;color:var(--c)}
.jx-turn{text-align:center;font-weight:700;font-size:15px;min-height:22px}
.jx-board{position:relative;width:100%;max-width:380px;margin:0 auto}
.jx-xo{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;aspect-ratio:1}
.jx-xo button{border-radius:16px;background:var(--card);border:1px solid var(--cardBorder);display:grid;place-items:center;font:inherit;font-size:clamp(40px,14vw,64px);font-weight:800;cursor:pointer;color:var(--text);padding:0;line-height:1}
.jx-xo button.x{color:var(--accent)}.jx-xo button.o{color:#ff5a7a}
.jx-xo button.win{background:rgba(47,140,255,.16);border-color:var(--accent)}
.jx-xo button.o.win{background:rgba(255,90,122,.14);border-color:#ff5a7a}
.jx-xo button span{animation:jxpop .18s ease}
@keyframes jxpop{from{transform:scale(.4);opacity:0}to{transform:none;opacity:1}}
.jx-c4{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;padding:10px;border-radius:22px;background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(14px);box-shadow:var(--shadow);cursor:pointer;touch-action:manipulation}
.jx-c4 i{aspect-ratio:1;border-radius:30%;background:rgba(47,140,255,.06);border:1px solid var(--cardBorder);position:relative}
.jx-c4 i::after{content:"";position:absolute;inset:-1px;border-radius:30%;opacity:0}
.jx-c4 i.p0::after,.jx-c4 i.p1::after{opacity:1}
.jx-c4 i.p0::after{background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.55),transparent 48%),linear-gradient(135deg,#1f7bff,#7cc4ff);box-shadow:inset 0 -3px 0 rgba(0,0,0,.12),0 4px 12px rgba(47,140,255,.4)}
.jx-c4 i.p1::after{background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.55),transparent 48%),linear-gradient(135deg,#ff4d73,#ffa3b6);box-shadow:inset 0 -3px 0 rgba(0,0,0,.12),0 4px 12px rgba(255,90,122,.4)}
.jx-c4 i.drop::after{animation:jxdrop var(--t,.3s) cubic-bezier(.5,0,1,1)}
@keyframes jxdrop{from{transform:translateY(calc(var(--h,6) * -112%))}to{transform:none}}
.jx-c4 i.w::after{animation:jxwin .9s ease-in-out infinite alternate;outline:3px solid var(--text);outline-offset:2px}
@keyframes jxwin{from{transform:scale(1)}to{transform:scale(.86)}}
.jx-arrow{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;padding:0 11px;margin-bottom:6px;height:22px}
.jx-arrow span{justify-self:center;width:60%;aspect-ratio:1;max-width:22px;border-radius:30%;background:var(--c);opacity:0;transition:opacity .15s}
.jx-arrow span.on{opacity:1}
.jx-dot{width:12px;height:12px;border-radius:30%;background:var(--c);flex:none}
.jx-ov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-radius:18px;background:color-mix(in srgb,var(--bg) 40%,transparent);animation:jxfade .3s ease;padding:16px;text-align:center}
@keyframes jxfade{from{opacity:0}to{opacity:1}}
.jx-ov h3{font-size:28px;font-weight:800}
.jx-ov .jx-btn{max-width:240px}
.jx-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:99px;font-size:12px;font-weight:700;color:#fff;align-self:center}
.jx-badge.easy{background:#16a34a}.jx-badge.mid{background:var(--accent)}.jx-badge.hard{background:#dc2626}
`;
const st = document.createElement("style");
st.textContent = css;
document.head.appendChild(st);

/* ---------- HELPERS ---------- */
const P = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICON = {
  amis: '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-3 2-5 5-5s5 2 5 5M11 20c0-3 2-5 5-5s5 2 5 5"/>',
  bot: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 16h6"/>',
  easy: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  mid: '<circle cx="12" cy="12" r="9"/><path d="M8 15h8M9 9h.01M15 9h.01"/>',
  hard: '<circle cx="12" cy="12" r="9"/><path d="M8 16s1.5-2 4-2 4 2 4 2M7.5 8l3 1.5M16.5 8l-3 1.5"/>'
};
const LV = { easy: ["Sahel", "L'robot mazal kayt3allem"], mid: ["3adi", "Match zwin, ghadi t3re9 chwiya"], hard: ["S3ib", "Ghir l'abtal li kaywslo hna"] };
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rnd = (n) => Math.floor(Math.random() * n);
const pickRandom = (a) => a[rnd(a.length)];

/* ---------- SHARED SCREENS (mode, smiyat, mostawa) ---------- */
function makeGame(cfg) {
  const s = { vsBot: false, level: "mid", names: ["", ""], wins: [0, 0, 0], busy: false };
  const root = () => document.getElementById(cfg.id);
  const render = (html, after) => { const r = root(); r.innerHTML = `<div class="jx">${html}</div>`; if (after) after(r); };
  const nm = (i) => s.vsBot ? (i === 0 ? "Nta" : "Robot") : (s.names[i].trim() || `Joueur ${i + 1}`);

  function mode() {
    s.wins = [0, 0, 0];
    render(`
      <div class="jx-title">${cfg.title}</div>
      <div class="jx-muted">M3a chkoun bghiti tl3b?</div>
      <button class="jx-card jx-mode" id="jxA"><div class="jx-ic">${P(ICON.amis)}</div><div><h3>Vs Amis</h3><p>Nta w s7abek f nfs l'telephone</p></div></button>
      <button class="jx-card jx-mode" id="jxB"><div class="jx-ic">${P(ICON.bot)}</div><div><h3>Vs Robot</h3><p>Tl3b dd l'app</p></div></button>
    `, r => {
      r.querySelector("#jxA").onclick = () => { s.vsBot = false; names(); };
      r.querySelector("#jxB").onclick = () => { s.vsBot = true; if (cfg.fixedLevel) { s.level = cfg.fixedLevel; s.wins = [0, 0, 0]; newRound(); } else levels(); };
    });
  }

  function names() {
    render(`
      <div class="jx-title">Chkoun ghadi yl3b?</div>
      <div class="jx-muted">Tqder tbddl les smiyat, wla dir Bda direct.</div>
      <label class="jx-input"><b>Joueur 1</b><input id="jxN0" value="${esc(s.names[0])}" placeholder="Joueur 1" maxlength="16" autocomplete="off"></label>
      <label class="jx-input"><b>Joueur 2</b><input id="jxN1" value="${esc(s.names[1])}" placeholder="Joueur 2" maxlength="16" autocomplete="off"></label>
      <div class="jx-actions"><button class="jx-btn" id="jxGo">Bda</button></div>
    `, r => {
      r.querySelector("#jxGo").onclick = () => {
        s.names = [r.querySelector("#jxN0").value, r.querySelector("#jxN1").value];
        s.wins = [0, 0, 0]; newRound();
      };
    });
  }

  function levels() {
    const b = (k) => `<button class="jx-lvl ${k}" data-l="${k}"><span class="em">${P(ICON[k])}</span><div><h3>${LV[k][0]}</h3><p>${LV[k][1]}</p></div></button>`;
    render(`
      <div class="jx-title">Vs Robot</div>
      <div class="jx-muted">Khtar l'mostawa</div>
      ${b("easy")}${b("mid")}${b("hard")}
    `, r => r.querySelectorAll("[data-l]").forEach(x => x.onclick = () => { s.level = x.dataset.l; s.wins = [0, 0, 0]; newRound(); }));
  }

  /* kol partie: 3chwa2i chkoun ykhd l'awel (X / l'lon l'awel), w howa li kaybda */
  function newRound() {
    s.first = rnd(2);          // l'joueur (0 wla 1) li 3ndo X / l'lon l'awel
    s.turn = 0;                // 0 = l'awel (X), 1 = t-tani (O)
    s.over = false; s.busy = false; s.rid = (s.rid || 0) + 1;
    cfg.reset(s);
    play();
  }
  const playerOf = (side) => side === 0 ? s.first : 1 - s.first; // side -> joueur
  const isBotTurn = () => s.vsBot && playerOf(s.turn) === 1;

  function play() {
    const pl = (i) => {
      const side = i === s.first ? 0 : 1;
      return `<div class="jx-pl${!s.over && playerOf(s.turn) === i ? " on" : ""}" style="--c:${cfg.colors[side]}">
        <div class="n">${cfg.badge(side)} ${esc(nm(i))}</div><b>${s.wins[i]}</b></div>`;
    };
    const who = playerOf(s.turn);
    const turnTxt = s.over ? "&nbsp;" : isBotTurn() ? "L'robot kayfekker..." :
      `Dor dyal: <span style="color:${cfg.colors[s.turn]}">${esc(nm(who))}</span>${cfg.hint ? " · " + cfg.hint : ""}`;
    render(`
      ${s.vsBot && !cfg.fixedLevel ? `<span class="jx-badge ${s.level}">Robot · ${LV[s.level][0]}</span>` : ""}
      <div class="jx-score">${pl(0)}${pl(1)}</div>
      <div class="jx-turn">${turnTxt}</div>
      <div class="jx-board" id="jxBoard">${cfg.board(s)}</div>
      <div class="jx-actions"><button class="jx-btn alt" id="jxNew">Partie jdida</button></div>
    `, r => {
      r.querySelector("#jxNew").onclick = newRound;
      cfg.bind(r, s, move);
      if (s.over) showEnd(r);
    });
    if (!s.over && isBotTurn() && !s.busy) {
      s.busy = true; const rid = s.rid;
      setTimeout(() => {
        if (rid !== s.rid || !document.getElementById(cfg.id).classList.contains("on")) return;
        const m = cfg.bot(s); s.busy = false; move(m, true);
      }, 450);
    }
  }

  function move(m, fromBot) {
    if (s.over || (s.busy && !fromBot) || (isBotTurn() && !fromBot)) return;
    if (!cfg.apply(s, m)) return;
    const res = cfg.result(s);
    if (res) {
      s.over = true; s.res = res;
      if (res.side === -1) s.wins[2]++; else s.wins[playerOf(res.side)]++;
    } else s.turn = 1 - s.turn;
    play();
  }

  function showEnd(r) {
    const res = s.res;
    let t;
    if (res.side === -1) t = "T3adol!";
    else if (s.vsBot) t = playerOf(res.side) === 0 ? "Rb7ti!" : "L'robot rbe7!";
    else t = `${esc(nm(playerOf(res.side)))} rbe7!`;
    setTimeout(() => {
      const b = r.querySelector("#jxBoard"); if (!b) return;
      b.insertAdjacentHTML("beforeend", `<div class="jx-ov"><h3>${t}</h3><button class="jx-btn" id="jxAgain">3awd</button></div>`);
      b.querySelector("#jxAgain").onclick = newRound;
    }, 750);
  }

  return { open: mode };
}

/* =========================================================
   XO
   ========================================================= */
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function xoWinner(b) {
  for (const l of LINES) if (b[l[0]] !== null && b[l[0]] === b[l[1]] && b[l[1]] === b[l[2]]) return { side: b[l[0]], line: l };
  if (b.every(v => v !== null)) return { side: -1, line: [] };
  return null;
}
function minimax(b, side, me, depth) {
  const w = xoWinner(b);
  if (w) return { score: w.side === -1 ? 0 : (w.side === me ? 10 - depth : depth - 10) };
  let best = { score: side === me ? -99 : 99, m: -1 };
  for (let i = 0; i < 9; i++) if (b[i] === null) {
    b[i] = side;
    const r = minimax(b, 1 - side, me, depth + 1);
    b[i] = null;
    if (side === me ? r.score > best.score : r.score < best.score) best = { score: r.score, m: i };
  }
  return best;
}
function xoFind(b, side) { // kelma li katrbe7 direct
  for (const l of LINES) { const v = l.map(i => b[i]); if (v.filter(x => x === side).length === 2 && v.includes(null)) return l[v.indexOf(null)]; }
  return -1;
}
function xoBot(s) {
  const b = s.cells, me = s.turn, op = 1 - me;
  const free = b.map((v, i) => v === null ? i : -1).filter(i => i >= 0);
  const win = xoFind(b, me), block = xoFind(b, op);
  if (s.level === "hard") {
    // kayl3b perfect: kaydir l'9walb w kay7bs dyalk. l'awel l3ba 3chwa2iya mzyana bach ma yt3awdch
    if (free.length === 9) return pickRandom([0, 2, 6, 8, 4]);
    return minimax(b.slice(), me, me, 0).m;
  }
  if (s.level === "mid") {
    if (win >= 0) return win;
    if (block >= 0 && Math.random() < 0.9) return block;
    if (Math.random() < 0.6) return minimax(b.slice(), me, me, 0).m;
    if (b[4] === null && Math.random() < 0.5) return 4;
    return pickRandom(free);
  }
  // sahel: ma kaykounch sahel bzaf, walakin kayghlet
  if (win >= 0 && Math.random() < 0.75) return win;
  if (block >= 0 && Math.random() < 0.45) return block;
  return pickRandom(free);
}

const xo = makeGame({
  id: "xo", title: "XO",
  colors: ["var(--accent)", "#ff5a7a"],
  badge: (side) => `<span class="jx-sym">${side === 0 ? "X" : "O"}</span>`,
  reset: (s) => { s.cells = Array(9).fill(null); s.last = -1; },
  board: (s) => {
    const win = s.over && s.res ? s.res.line : [];
    return `<div class="jx-xo">${s.cells.map((v, i) =>
      `<button data-i="${i}" class="${v === 0 ? "x" : v === 1 ? "o" : ""}${win.includes(i) ? " win" : ""}" aria-label="Khana ${i + 1}">${v === null ? "" : i === s.last ? `<span>${v === 0 ? "X" : "O"}</span>` : (v === 0 ? "X" : "O")}</button>`).join("")}</div>`;
  },
  bind: (r, s, move) => r.querySelectorAll(".jx-xo button").forEach(b => b.onclick = () => move(+b.dataset.i)),
  apply: (s, i) => { if (s.cells[i] !== null) return false; s.cells[i] = s.turn; s.last = i; return true; },
  result: (s) => xoWinner(s.cells),
  bot: xoBot
});

/* =========================================================
   CONNECT 4
   ========================================================= */
const R = 6, C = 7;
function c4Drop(g, c) { for (let r = R - 1; r >= 0; r--) if (g[r][c] === null) return r; return -1; }
function c4Win(g) {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const v = g[r][c]; if (v === null) continue;
    for (const [dr, dc] of dirs) {
      const cells = [[r, c]];
      for (let k = 1; k < 4; k++) { const rr = r + dr * k, cc = c + dc * k; if (rr < 0 || rr >= R || cc < 0 || cc >= C || g[rr][cc] !== v) break; cells.push([rr, cc]); }
      if (cells.length === 4) return { side: v, line: cells };
    }
  }
  if (g[0].every(v => v !== null)) return { side: -1, line: [] };
  return null;
}
/* robot: negamax m3a alpha-beta */
function scoreWindow(w, me) {
  const op = 1 - me, m = w.filter(x => x === me).length, o = w.filter(x => x === op).length, e = w.filter(x => x === null).length;
  if (m === 4) return 1000;
  if (m === 3 && e === 1) return 6;
  if (m === 2 && e === 2) return 2;
  if (o === 3 && e === 1) return -8;
  if (o === 2 && e === 2) return -1;
  return 0;
}
function evalBoard(g, me) {
  let sc = 0;
  for (let r = 0; r < R; r++) sc += (g[r][3] === me ? 4 : g[r][3] === 1 - me ? -4 : 0);
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    if (c + 3 < C) sc += scoreWindow([g[r][c], g[r][c+1], g[r][c+2], g[r][c+3]], me);
    if (r + 3 < R) sc += scoreWindow([g[r][c], g[r+1][c], g[r+2][c], g[r+3][c]], me);
    if (r + 3 < R && c + 3 < C) sc += scoreWindow([g[r][c], g[r+1][c+1], g[r+2][c+2], g[r+3][c+3]], me);
    if (r + 3 < R && c - 3 >= 0) sc += scoreWindow([g[r][c], g[r+1][c-1], g[r+2][c-2], g[r+3][c-3]], me);
  }
  return sc;
}
const ORDER = [3, 2, 4, 1, 5, 0, 6];
function negamax(g, depth, a, b, side, me) {
  const w = c4Win(g);
  if (w) return w.side === -1 ? 0 : (w.side === side ? 100000 + depth : -100000 - depth);
  if (depth === 0) return side === me ? evalBoard(g, me) : -evalBoard(g, me);
  let best = -Infinity;
  for (const c of ORDER) {
    const r = c4Drop(g, c); if (r < 0) continue;
    g[r][c] = side;
    const v = -negamax(g, depth - 1, -b, -a, 1 - side, me);
    g[r][c] = null;
    if (v > best) best = v;
    if (best > a) a = best;
    if (a >= b) break;
  }
  return best;
}
function c4Best(g, me, depth) {
  let best = -Infinity, moves = [];
  for (const c of ORDER) {
    const r = c4Drop(g, c); if (r < 0) continue;
    g[r][c] = me;
    const v = -negamax(g, depth - 1, -Infinity, Infinity, 1 - me, me);
    g[r][c] = null;
    if (v > best) { best = v; moves = [c]; } else if (v === best) moves.push(c);
  }
  return moves[0];
}
function c4Immediate(g, side) {
  for (const c of ORDER) { const r = c4Drop(g, c); if (r < 0) continue; g[r][c] = side; const w = c4Win(g); g[r][c] = null; if (w && w.side === side) return c; }
  return -1;
}
function c4Bot(s) {
  const g = s.grid.map(r => r.slice()), me = s.turn, op = 1 - me;
  const free = ORDER.filter(c => c4Drop(g, c) >= 0);
  if (s.level === "hard") return c4Best(g, me, 7);
  if (s.level === "mid") {
    const w = c4Immediate(g, me); if (w >= 0) return w;
    const bl = c4Immediate(g, op); if (bl >= 0 && Math.random() < 0.9) return bl;
    if (Math.random() < 0.15) return pickRandom(free);
    return c4Best(g, me, 4);
  }
  const w = c4Immediate(g, me); if (w >= 0 && Math.random() < 0.8) return w;
  const bl = c4Immediate(g, op); if (bl >= 0 && Math.random() < 0.5) return bl;
  if (Math.random() < 0.4) return pickRandom(free);
  return c4Best(g, me, 2);
}

const c4 = makeGame({
  id: "c4", title: "Connect 4", hint: "drb 3la l'3amoud", fixedLevel: "mid",
  colors: ["var(--accent)", "#ff5a7a"],
  badge: (side) => `<span class="jx-dot" style="--c:${side === 0 ? "linear-gradient(135deg,#1f7bff,#7cc4ff)" : "linear-gradient(135deg,#ff4d73,#ffa3b6)"}"></span>`,
  reset: (s) => { s.grid = Array.from({ length: R }, () => Array(C).fill(null)); s.last = null; },
  board: (s) => {
    const win = s.over && s.res ? s.res.line : [];
    const isW = (r, c) => win.some(p => p[0] === r && p[1] === c);
    const col = ["var(--accent)", "#ff5a7a"];
    let cells = "";
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      const v = s.grid[r][c], drop = s.last && s.last[0] === r && s.last[1] === c;
      cells += `<i data-c="${c}" class="${v !== null ? "p" + v : ""}${drop ? " drop" : ""}${isW(r, c) ? " w" : ""}" style="${drop ? `--h:${r + 1};--t:${0.12 + r * 0.05}s` : ""}"></i>`;
    }
    const arrow = Array.from({ length: C }, (_, c) => `<span data-a="${c}"></span>`).join("");
    return `<div class="jx-arrow" style="--c:${col[s.turn]}">${arrow}</div><div class="jx-c4">${cells}</div>`;
  },
  bind: (r, s, move) => {
    const board = r.querySelector(".jx-c4");
    const arrows = r.querySelectorAll("[data-a]");
    const hl = (c) => arrows.forEach(a => a.classList.toggle("on", +a.dataset.a === c && !s.over));
    board.addEventListener("click", e => { const t = e.target.closest("[data-c]"); if (t) move(+t.dataset.c); });
    board.addEventListener("pointermove", e => { const t = e.target.closest("[data-c]"); if (t) hl(+t.dataset.c); });
    board.addEventListener("pointerleave", () => hl(-1));
  },
  apply: (s, c) => { const r = c4Drop(s.grid, c); if (r < 0) return false; s.grid[r][c] = s.turn; s.last = [r, c]; return true; },
  result: (s) => c4Win(s.grid),
  bot: c4Bot
});

/* ---------- CONNECT M3A L'APP ---------- */
const baseShow = window.show;
window.show = function (id) {
  baseShow(id);
  if (id === "xo") xo.open();
  if (id === "c4") c4.open();
};

})();
