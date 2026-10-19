/* =========================================================
   Blocks — frlees app
   dev by : frlees
   ========================================================= */
(function () {
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rnd = (n) => Math.floor(Math.random() * n);
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
const css2 = `
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
const stEl2 = document.createElement("style"); stEl2.textContent = css2; document.head.appendChild(stEl2);

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
  if (id === "blocks") bl.open();
};

})();
