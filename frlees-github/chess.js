/* =========================================================
   Chess — frlees app
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
.jx-xo{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:10px;aspect-ratio:1;padding:12px;border-radius:24px;background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(14px);box-shadow:var(--shadow)}
.jx-xo button{position:relative;width:100%;height:100%;min-width:0;min-height:0;aspect-ratio:1;border-radius:22%;background:rgba(47,140,255,.06);border:1px solid var(--cardBorder);display:grid;place-items:center;cursor:pointer;padding:0;overflow:hidden;transition:transform .12s,background .2s}
.jx-xo button:not(.x):not(.o):hover{background:rgba(47,140,255,.12)}
.jx-xo button:active{transform:scale(.95)}
.jx-xo button svg{width:58%;height:58%;overflow:visible}
.jx-xo button.x{background:linear-gradient(145deg,rgba(47,140,255,.16),rgba(124,196,255,.06))}
.jx-xo button.o{background:linear-gradient(145deg,rgba(255,90,122,.16),rgba(255,163,182,.06))}
.jx-xo button.win{border-color:var(--wc);box-shadow:inset 0 0 0 2px var(--wc);animation:jxglow .9s ease-in-out infinite alternate}
.jx-xo button.x.win{--wc:var(--accent)}.jx-xo button.o.win{--wc:#ff5a7a}
@keyframes jxglow{from{box-shadow:inset 0 0 0 2px var(--wc),0 0 0 0 transparent}to{box-shadow:inset 0 0 0 2px var(--wc),0 0 18px 2px color-mix(in srgb,var(--wc) 45%,transparent)}}
.jx-xo .drawn path,.jx-xo .drawn circle{stroke-dasharray:100;stroke-dashoffset:100;animation:jxdraw .35s ease forwards}
.jx-xo .drawn path:nth-child(2){animation-delay:.15s}
@keyframes jxdraw{to{stroke-dashoffset:0}}
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
    s.locked = s.over || isBotTurn();
    const pl = (i) => {
      const side = i === s.first ? 0 : 1;
      return `<div class="jx-pl${!s.over && playerOf(s.turn) === i ? " on" : ""}" style="--c:${cfg.colors[side]}">
        <div class="n">${cfg.badge(side)} ${esc(nm(i))}</div><b>${s.wins[i]}</b></div>`;
    };
    const who = playerOf(s.turn);
    const turnTxt = s.over ? "&nbsp;" : isBotTurn() ? "L'robot kayfekker..." :
      `Dor dyal: <span style="color:${cfg.colors[s.turn]}">${esc(nm(who))}</span>${(() => { const h = typeof cfg.hint === "function" ? cfg.hint(s) : cfg.hint; return h ? " · " + h : ""; })()}`;
    render(`
      ${s.vsBot && !cfg.fixedLevel ? `<span class="jx-badge ${s.level}">Robot · ${LV[s.level][0]}</span>` : ""}
      <div class="jx-score">${pl(0)}${pl(1)}</div>
      <div class="jx-turn">${turnTxt}</div>
      <div class="jx-board" id="jxBoard">${cfg.board(s)}</div>
      <div class="jx-actions"><button class="jx-btn alt" id="jxNew">Leave Partie</button></div>
    `, r => {
      r.querySelector("#jxNew").onclick = () => { s.rid++; show("home"); };
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

const css2 = `
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
`;
const stEl2 = document.createElement("style"); stEl2.textContent = css2; document.head.appendChild(stEl2);
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

{
  const chess = makeGame({
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

/* ---------- CONNECT M3A L'APP ---------- */
const baseShow = window.show;
window.show = function (id) {
  baseShow(id);
  if (id === "chess") window.frleesChess.open();
};

})();
