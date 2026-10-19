/* frlees app — Pomodoro · dev by : frlees */
(function () {
  const ID = "pomo";
  const st = document.createElement("style");
  st.textContent = `
  #pomo .pm{max-width:460px;margin:0 auto;display:flex;flex-direction:column;align-items:center}
  #pomo .pm-h{align-self:stretch;margin:6px 0 14px}
  #pomo .pm-h h2{font-size:26px;font-weight:800}
  #pomo .pm-h p{color:var(--muted);font-size:13px}
  #pomo .pm-tabs{display:flex;gap:6px;padding:5px;border-radius:16px;background:var(--card);border:1px solid var(--cardBorder);margin-bottom:22px;backdrop-filter:blur(10px)}
  #pomo .pm-tabs button{border:0;background:none;color:var(--muted);font-weight:700;font-size:13px;padding:9px 14px;border-radius:12px;cursor:pointer}
  #pomo .pm-tabs button.on{color:#fff;background:var(--pmc)}
  #pomo .pm-ring{position:relative;width:min(280px,72vw);aspect-ratio:1}
  #pomo .pm-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
  #pomo .pm-ring circle{fill:none;stroke-width:12}
  #pomo .pm-ring .bgc{stroke:rgba(127,127,127,.15)}
  #pomo .pm-ring .fg{stroke:var(--pmc);stroke-linecap:round}
  #pomo .pm-t{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
  #pomo .pm-t b{font-size:clamp(44px,14vw,60px);font-weight:800;font-variant-numeric:tabular-nums}
  #pomo .pm-t span{font-size:14px;color:var(--muted);font-weight:600}
  #pomo .pm-dots{display:flex;gap:10px;margin:22px 0}
  #pomo .pm-dots i{width:14px;height:14px;border-radius:50%;background:rgba(127,127,127,.2)}
  #pomo .pm-dots i.on{background:#ef4444}
  #pomo .pm-btns{display:flex;align-items:center;gap:16px}
  #pomo .pm-b{width:58px;height:58px;border-radius:50%;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);cursor:pointer;display:grid;place-items:center;backdrop-filter:blur(10px)}
  #pomo .pm-b svg{width:22px;height:22px}
  #pomo .pm-b.go{width:84px;height:84px;border:0;color:#fff;background:var(--pmc);box-shadow:0 10px 24px rgba(0,0,0,.18)}
  #pomo .pm-b.go svg{width:32px;height:32px}
  #pomo .pm-cfg{display:flex;gap:10px;margin-top:26px;width:100%}
  #pomo .pm-cfg div{flex:1;padding:10px;border-radius:14px;background:var(--card);border:1px solid var(--cardBorder);text-align:center}
  #pomo .pm-cfg small{display:block;font-size:11px;color:var(--muted);margin-bottom:4px}
  #pomo .pm-cfg span{display:flex;align-items:center;justify-content:center;gap:8px}
  #pomo .pm-cfg button{width:26px;height:26px;border-radius:8px;border:0;background:rgba(127,127,127,.15);color:var(--text);cursor:pointer;font-size:15px}
  #pomo .pm-cfg b{min-width:22px}
  #pomo .pm-n{margin-top:16px;font-size:13px;color:var(--muted)}
  `;
  document.head.appendChild(st);

  const MODES = {
    w: { n: "Khdma", s: "Rkkez...", c: "#ef4444" },
    s: { n: "Rta7a sghira", s: "Tnffes chwiya", c: "#10b981" },
    l: { n: "Rta7a kbira", s: "Nod t9add", c: "#2f8cff" }
  };
  let cfg = { w: 25, s: 5, l: 15 };
  try { Object.assign(cfg, JSON.parse(localStorage.getItem("fr_pomo")) || {}); } catch (e) {}
  const P = { m: "w", left: cfg.w * 60000, run: false, end: 0, done: 0, total: 0 };
  const R = 2 * Math.PI * 118;
  let loop = 0;
  const root = () => document.getElementById(ID);
  const on = () => { const v = root(); return v && v.classList.contains("on"); };
  const now = () => P.run ? Math.max(0, P.end - Date.now()) : P.left;
  const fmt = ms => { const s = Math.ceil(ms / 1000); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>';
  const PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>';
  const RESET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';
  const SKIP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l10 7-10 7zM19 5v14"/></svg>';

  function beep() {
    try { navigator.vibrate && navigator.vibrate([400, 200, 400]); } catch (e) {}
    try { const A = window.AudioContext || window.webkitAudioContext, ac = new A();
      [0, .3, .6].forEach((d, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = [660, 880, 990][i]; o.connect(g); g.connect(ac.destination);
        g.gain.setValueAtTime(.25, ac.currentTime + d); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d + .28); o.start(ac.currentTime + d); o.stop(ac.currentTime + d + .3); }); } catch (e) {}
  }
  function setMode(m) { P.m = m; P.run = false; P.left = cfg[m] * 60000; }
  function next(auto) {
    if (P.m === "w") { if (auto) { P.done++; P.total++; } setMode(P.done >= 4 ? "l" : "s"); }
    else { if (P.m === "l") P.done = 0; setMode("w"); }
  }
  setInterval(() => { if (P.run && now() <= 0) { P.run = false; beep(); next(true); if (on()) render(); } }, 250);

  function render() {
    cancelAnimationFrame(loop);
    const M = MODES[P.m], r = root();
    r.style.setProperty("--pmc", M.c);
    r.innerHTML = `<div class="pm">
      <div class="pm-h"><h2>Pomodoro</h2><p>${cfg.w} min khdma · ${cfg.s} min rta7a · kol 4 = ${cfg.l} min</p></div>
      <div class="pm-tabs">${Object.keys(MODES).map(k => `<button data-m="${k}" class="${k === P.m ? "on" : ""}">${MODES[k].n}</button>`).join("")}</div>
      <div class="pm-ring"><svg viewBox="0 0 260 260"><circle class="bgc" cx="130" cy="130" r="118"/><circle class="fg" cx="130" cy="130" r="118" stroke-dasharray="${R}" stroke-dashoffset="0"/></svg>
        <div class="pm-t"><b id="pmT">${fmt(now())}</b><span>${P.run ? M.s : M.n}</span></div></div>
      <div class="pm-dots">${[0, 1, 2, 3].map(i => `<i class="${i < P.done ? "on" : ""}"></i>`).join("")}</div>
      <div class="pm-btns"><button class="pm-b" id="pmR" aria-label="Reset">${RESET}</button><button class="pm-b go" id="pmG">${P.run ? PAUSE : PLAY}</button><button class="pm-b" id="pmS" aria-label="Skip">${SKIP}</button></div>
      <div class="pm-cfg">${["w", "s", "l"].map(k => `<div><small>${MODES[k].n}</small><span><button data-c="${k}" data-d="-1">−</button><b>${cfg[k]}</b><button data-c="${k}" data-d="1">+</button></span></div>`).join("")}</div>
      <div class="pm-n">Lyouma kmmlti <b>${P.total}</b> pomodoro</div>
    </div>`;
    r.querySelectorAll(".pm-tabs button").forEach(b => b.onclick = () => { setMode(b.dataset.m); render(); });
    r.querySelector("#pmG").onclick = () => { if (P.run) { P.left = now(); P.run = false; } else { if (P.left <= 0) P.left = cfg[P.m] * 60000; P.end = Date.now() + P.left; P.run = true; } render(); };
    r.querySelector("#pmR").onclick = () => { setMode(P.m); render(); };
    r.querySelector("#pmS").onclick = () => { next(false); render(); };
    r.querySelectorAll("[data-c]").forEach(b => b.onclick = () => {
      const k = b.dataset.c; cfg[k] = Math.max(1, Math.min(90, cfg[k] + +b.dataset.d));
      try { localStorage.setItem("fr_pomo", JSON.stringify(cfg)); } catch (e) {}
      if (!P.run && P.m === k) P.left = cfg[k] * 60000;
      render();
    });
    tick();
  }
  function tick() {
    if (!on()) return;
    const t = document.getElementById("pmT"), fg = root().querySelector(".fg");
    t.textContent = fmt(now());
    fg.style.strokeDashoffset = R * (1 - now() / (cfg[P.m] * 60000));
    if (P.run) loop = requestAnimationFrame(tick);
  }

  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) render(); };
})();
