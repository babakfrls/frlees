/* frlees app — Chrono w Minuterie · dev by : frlees */
(function () {
  const ID = "chrono";
  const st = document.createElement("style");
  st.textContent = `
  #chrono .ch{max-width:460px;margin:0 auto;display:flex;flex-direction:column;align-items:center}
  #chrono .ch-tabs{display:flex;gap:6px;padding:5px;border-radius:16px;background:var(--card);border:1px solid var(--cardBorder);margin:6px 0 22px;backdrop-filter:blur(10px)}
  #chrono .ch-tabs button{border:0;background:none;color:var(--muted);font-weight:700;font-size:14px;padding:10px 22px;border-radius:12px;cursor:pointer}
  #chrono .ch-tabs button.on{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff}
  #chrono .ch-ring{position:relative;width:min(280px,72vw);aspect-ratio:1}
  #chrono .ch-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
  #chrono .ch-ring circle{fill:none;stroke-width:9}
  #chrono .ch-ring .bgc{stroke:rgba(47,140,255,.13)}
  #chrono .ch-ring .fg{stroke:url(#chG);stroke-linecap:round;transition:stroke-dashoffset .2s linear}
  #chrono .ch-t{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
  #chrono .ch-t b{font-size:clamp(38px,12vw,54px);font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:1px}
  #chrono .ch-t small{font-size:20px;color:var(--muted);font-variant-numeric:tabular-nums}
  #chrono .ch-btns{display:flex;gap:14px;margin:26px 0 18px}
  #chrono .ch-b{width:74px;height:74px;border-radius:50%;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-weight:700;font-size:14px;cursor:pointer;backdrop-filter:blur(10px)}
  #chrono .ch-b.go{width:86px;height:86px;border:0;color:#fff;font-size:16px;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 10px 24px rgba(47,140,255,.4)}
  #chrono .ch-b.go.stop{background:linear-gradient(135deg,#f97316,#fb923c);box-shadow:0 10px 24px rgba(249,115,22,.35)}
  #chrono .ch-b:disabled{opacity:.4}
  #chrono .ch-laps{width:100%;display:flex;flex-direction:column;gap:6px}
  #chrono .ch-lap{display:flex;justify-content:space-between;padding:11px 16px;border-radius:14px;background:var(--card);border:1px solid var(--cardBorder);font-variant-numeric:tabular-nums;font-size:14px}
  #chrono .ch-lap span{color:var(--muted)}
  #chrono .ch-pre{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:18px}
  #chrono .ch-pre button{border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-weight:700;padding:9px 14px;border-radius:12px;cursor:pointer}
  #chrono .ch-set{display:flex;align-items:center;gap:6px;margin-bottom:18px}
  #chrono .ch-set div{display:flex;flex-direction:column;align-items:center;gap:4px}
  #chrono .ch-set button{width:44px;height:34px;border-radius:10px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-size:18px;cursor:pointer}
  #chrono .ch-set b{font-size:30px;font-variant-numeric:tabular-nums;min-width:52px;text-align:center}
  #chrono .ch-set i{font-style:normal;font-size:11px;color:var(--muted)}
  #chrono .ch-done{color:#f97316;font-weight:800;font-size:18px;margin-top:-6px;animation:fade .3s}
  `;
  document.head.appendChild(st);

  const p2 = n => String(n).padStart(2, "0");
  const fmtC = ms => { const t = Math.floor(ms / 10), cs = t % 100, s = Math.floor(t / 100) % 60, m = Math.floor(t / 6000); return [p2(m) + ":" + p2(s), "." + p2(cs)]; };
  const fmtT = ms => { const s = Math.ceil(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60; return (h ? h + ":" : "") + p2(m) + ":" + p2(s % 60); };

  // state kayb9a 7ta ila khrjti mn l'page
  const C = { run: false, acc: 0, t0: 0, laps: [] };
  const T = { set: 5 * 60000, left: 5 * 60000, run: false, end: 0, done: false };
  let tab = "c", loop = 0;
  const cNow = () => C.acc + (C.run ? Date.now() - C.t0 : 0);
  const tNow = () => T.run ? Math.max(0, T.end - Date.now()) : T.left;
  const root = () => document.getElementById(ID);
  const R = 2 * Math.PI * 120;

  function beep() {
    try { navigator.vibrate && navigator.vibrate([300, 150, 300, 150, 300]); } catch (e) {}
    try {
      const A = window.AudioContext || window.webkitAudioContext, ac = new A();
      [0, .35, .7].forEach(d => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = 880; o.connect(g); g.connect(ac.destination);
        g.gain.setValueAtTime(.25, ac.currentTime + d); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + d + .3); o.start(ac.currentTime + d); o.stop(ac.currentTime + d + .3); });
    } catch (e) {}
  }
  // check l'minuterie 7ta ila ma knti f l'page
  setInterval(() => { if (T.run && tNow() <= 0) { T.run = false; T.left = 0; T.done = true; beep(); if (on()) render(); } }, 250);
  const on = () => { const v = root(); return v && v.classList.contains("on"); };

  function ring(frac) {
    return `<svg viewBox="0 0 260 260"><defs><linearGradient id="chG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent2)"/></linearGradient></defs>
      <circle class="bgc" cx="130" cy="130" r="120"/><circle class="fg" cx="130" cy="130" r="120" stroke-dasharray="${R}" stroke-dashoffset="${R * (1 - frac)}"/></svg>`;
  }

  function render() {
    cancelAnimationFrame(loop);
    const r = root();
    let h = `<div class="ch"><div class="ch-tabs"><button data-t="c" class="${tab === "c" ? "on" : ""}">Chrono</button><button data-t="t" class="${tab === "t" ? "on" : ""}">Minuterie</button></div>`;
    if (tab === "c") {
      const [a, b] = fmtC(cNow());
      h += `<div class="ch-ring">${ring((cNow() % 60000) / 60000)}<div class="ch-t"><b id="chA">${a}</b><small id="chB">${b}</small></div></div>
        <div class="ch-btns"><button class="ch-b" id="chR" ${!C.run && !cNow() ? "disabled" : ""}>${C.run ? "Tour" : "Reset"}</button>
        <button class="ch-b go ${C.run ? "stop" : ""}" id="chG">${C.run ? "Wa9ef" : cNow() ? "Kemmel" : "Bda"}</button></div>
        <div class="ch-laps">${C.laps.map((l, i) => `<div class="ch-lap"><span>Tour ${C.laps.length - i}</span><b>${fmtC(l).join("")}</b></div>`).join("")}</div>`;
    } else {
      const idle = !T.run && (T.left === T.set || T.done);
      const sm = Math.floor(T.set / 60000), ss = Math.floor(T.set / 1000) % 60;
      h += (idle ? `<div class="ch-pre">${[1, 3, 5, 10, 15, 30].map(m => `<button data-m="${m}">${m} min</button>`).join("")}</div>
        <div class="ch-set"><div><button data-d="60000">+</button><b>${p2(sm)}</b><button data-d="-60000">−</button><i>min</i></div><b>:</b>
        <div><button data-d="5000">+</button><b>${p2(ss)}</b><button data-d="-5000">−</button><i>sec</i></div></div>` : "") +
        `<div class="ch-ring">${ring(T.set ? tNow() / T.set : 0)}<div class="ch-t"><b id="chA">${fmtT(tNow())}</b></div></div>
        ${T.done ? '<div class="ch-done" style="margin-top:14px">Sala l\'w9t!</div>' : ""}
        <div class="ch-btns"><button class="ch-b" id="tR" ${idle && !T.done ? "disabled" : ""}>Reset</button>
        <button class="ch-b go ${T.run ? "stop" : ""}" id="tG" ${!T.set ? "disabled" : ""}>${T.run ? "Wa9ef" : idle || T.done ? "Bda" : "Kemmel"}</button></div>`;
    }
    r.innerHTML = h + "</div>";
    r.querySelectorAll(".ch-tabs button").forEach(b => b.onclick = () => { tab = b.dataset.t; render(); });
    if (tab === "c") {
      r.querySelector("#chG").onclick = () => { if (C.run) { C.acc += Date.now() - C.t0; C.run = false; } else { C.t0 = Date.now(); C.run = true; } render(); };
      r.querySelector("#chR").onclick = () => { if (C.run) C.laps.unshift(cNow()); else { C.acc = 0; C.laps = []; } render(); };
    } else {
      r.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { T.set = T.left = +b.dataset.m * 60000; T.done = false; render(); });
      r.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { T.set = Math.max(0, Math.min(99 * 60000 + 55000, T.set + +b.dataset.d)); T.left = T.set; T.done = false; render(); });
      r.querySelector("#tG").onclick = () => {
        if (T.run) { T.left = tNow(); T.run = false; }
        else { if (T.done || T.left <= 0) T.left = T.set; T.done = false; T.end = Date.now() + T.left; T.run = true; }
        render();
      };
      r.querySelector("#tR").onclick = () => { T.run = false; T.left = T.set; T.done = false; render(); };
    }
    tick();
  }

  function tick() {
    if (!on()) return;
    const A = document.getElementById("chA"), fg = root().querySelector(".fg");
    if (tab === "c") { const [a, b] = fmtC(cNow()); A.textContent = a; document.getElementById("chB").textContent = b; fg.style.strokeDashoffset = R * (1 - (cNow() % 60000) / 60000); }
    else { A.textContent = fmtT(tNow()); fg.style.strokeDashoffset = R * (1 - (T.set ? tNow() / T.set : 0)); }
    if (C.run || T.run) loop = requestAnimationFrame(tick);
  }

  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) render(); };
})();
