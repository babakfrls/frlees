/* frlees app — Test lougha (A1 → C2) · dev by : frlees */
(function () {
  const ID = "testlougha", N = 20, LV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const LANGS = {
    en: { n: "English", s: "Anglais", c: "#2f8cff", t: "EN" },
    fr: { n: "Français", s: "Fransawiya", c: "#7c3aed", t: "FR" },
    es: { n: "Español", s: "Sbanyoliya", c: "#f97316", t: "ES" }
  };
  const LVN = {
    A1: ["Mobtadi", "Katfhm jomal sahlin w kalimat d kola nhar."],
    A2: ["Mobtadi motaqaddim", "Kat9der tdwi 3la 7wayj 3adiyin b jomal 9sar."],
    B1: ["Motawassit", "Kat9der tdbber rask f s-safar w t3awed 3la tajarib dyalek."],
    B2: ["Fo9 l'motawassit", "Katfhm nosos m3a9din w kathder b sohola m3a nas."],
    C1: ["Motaqaddim", "Katst3mel lougha b mourouna f l'khdma w l9raya."],
    C2: ["Mot9en", "Katfhm t9riban kolchi w kat3bber b d-di9a."]
  };
  const TN = { g: "Grammaire", v: "Vocabulaire", r: "Lecture" };
  const st = document.createElement("style");
  st.textContent = `
  #testlougha .tl{max-width:520px;margin:0 auto}
  #testlougha .tl-h{margin:6px 0 16px}
  #testlougha .tl-h h2{font-size:26px;font-weight:800}
  #testlougha .tl-h p{color:var(--muted);font-size:14px}
  #testlougha .tl-l{display:flex;align-items:center;gap:14px;padding:16px;border-radius:20px;background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(10px);box-shadow:var(--shadow);margin-bottom:12px;cursor:pointer;transition:transform .15s}
  #testlougha .tl-l:active{transform:scale(.98)}
  #testlougha .tl-l i{width:52px;height:52px;border-radius:16px;flex:none;display:grid;place-items:center;color:#fff;font-style:normal;font-weight:800;font-size:17px}
  #testlougha .tl-l b{display:block;font-size:17px} #testlougha .tl-l span{font-size:13px;color:var(--muted)}
  #testlougha .tl-l em{margin-left:auto;font-style:normal;font-weight:800;font-size:13px;padding:5px 10px;border-radius:99px;background:rgba(47,140,255,.13);color:var(--accent);white-space:nowrap}
  #testlougha .tl-box{padding:20px;border-radius:22px;background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(10px);box-shadow:var(--shadow)}
  #testlougha .tl-info{display:flex;flex-direction:column;gap:12px;margin:6px 0 18px}
  #testlougha .tl-info div{display:flex;align-items:center;gap:12px;font-size:14px}
  #testlougha .tl-info i{width:34px;height:34px;border-radius:11px;flex:none;background:rgba(47,140,255,.12);color:var(--accent);display:grid;place-items:center;font-style:normal;font-weight:800}
  #testlougha .tl-lvls{display:flex;gap:6px;margin:4px 0 18px}
  #testlougha .tl-lvls span{flex:1;text-align:center;padding:8px 0;border-radius:10px;font-weight:800;font-size:13px;background:rgba(47,140,255,.1);color:var(--accent)}
  #testlougha .tl-btn{width:100%;padding:15px;border:0;border-radius:16px;font-weight:800;font-size:16px;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 20px rgba(47,140,255,.3);margin-top:8px}
  #testlougha .tl-btn.alt{background:var(--card);color:var(--text);border:1px solid var(--cardBorder);box-shadow:none}
  #testlougha .tl-top{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700;color:var(--muted);margin:4px 0 8px}
  #testlougha .tl-top .lv{padding:4px 10px;border-radius:99px;background:rgba(47,140,255,.13);color:var(--accent)}
  #testlougha .tl-top button{margin-left:auto;border:0;background:none;color:var(--muted);font-weight:700;cursor:pointer;font-size:13px}
  #testlougha .tl-bar{height:8px;border-radius:99px;background:rgba(47,140,255,.13);overflow:hidden;margin-bottom:18px}
  #testlougha .tl-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .3s}
  #testlougha .tl-type{font-size:12px;font-weight:800;letter-spacing:1.2px;color:var(--muted);margin-bottom:8px}
  #testlougha .tl-p{padding:14px 16px;border-radius:16px;background:rgba(47,140,255,.07);border-left:4px solid var(--accent);font-size:14.5px;line-height:1.55;margin-bottom:14px;user-select:text}
  #testlougha .tl-q{font-size:19px;font-weight:700;line-height:1.4;margin-bottom:16px}
  #testlougha .tl-o{display:flex;flex-direction:column;gap:9px}
  #testlougha .tl-o button{display:flex;align-items:center;gap:12px;text-align:left;padding:14px;border-radius:15px;border:1.5px solid var(--cardBorder);background:var(--card);color:var(--text);font-size:15.5px;cursor:pointer;font-family:inherit;backdrop-filter:blur(10px)}
  #testlougha .tl-o button b{width:28px;height:28px;flex:none;border-radius:9px;display:grid;place-items:center;background:rgba(127,127,127,.12);font-size:13px}
  #testlougha .tl-o button.ok{border-color:#10b981;background:rgba(16,185,129,.12)} #testlougha .tl-o button.ok b{background:#10b981;color:#fff}
  #testlougha .tl-o button.no{border-color:#ef4444;background:rgba(239,68,68,.1)} #testlougha .tl-o button.no b{background:#ef4444;color:#fff}
  #testlougha .tl-o button:disabled{cursor:default}
  #testlougha .tl-x{margin-top:14px;padding:13px 15px;border-radius:15px;font-size:14px;line-height:1.45;animation:fade .25s}
  #testlougha .tl-x.ok{background:rgba(16,185,129,.12);color:#059669} #testlougha .tl-x.no{background:rgba(239,68,68,.1);color:#dc2626}
  .dk #testlougha .tl-x.ok{color:#34d399} .dk #testlougha .tl-x.no{color:#f87171}
  #testlougha .tl-res{text-align:center}
  #testlougha .tl-big{width:150px;height:150px;margin:6px auto 12px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:58px;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 16px 36px rgba(47,140,255,.4)}
  #testlougha .tl-res h3{font-size:22px} #testlougha .tl-res>p{color:var(--muted);font-size:14px;margin:4px 0 18px}
  #testlougha .tl-br{display:flex;flex-direction:column;gap:12px;text-align:left;margin-bottom:14px}
  #testlougha .tl-br div{font-size:13.5px;font-weight:700}
  #testlougha .tl-br span{float:right;color:var(--muted)}
  #testlougha .tl-br em{display:block;height:9px;border-radius:99px;background:rgba(47,140,255,.13);margin-top:6px;overflow:hidden}
  #testlougha .tl-br em i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--accent2))}
  #testlougha .tl-scale{display:flex;gap:5px;margin:4px 0 16px}
  #testlougha .tl-scale span{flex:1;padding:7px 0;border-radius:9px;font-size:12px;font-weight:800;background:rgba(127,127,127,.1);color:var(--muted)}
  #testlougha .tl-scale span.on{background:var(--accent);color:#fff}
  #testlougha .tl-note{font-size:12.5px;color:var(--muted);margin:14px 0 4px;padding:10px;border-radius:12px;background:rgba(127,127,127,.08)}
  `;
  document.head.appendChild(st);

  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuf = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const getLast = () => { try { return JSON.parse(localStorage.getItem("fr_tl")) || {}; } catch (e) { return {}; } };
  const root = () => document.getElementById(ID);
  let S = null;

  function home() {
    const last = getLast();
    root().innerHTML = `<div class="tl"><div class="tl-h"><h2>Test lougha</h2><p>3ref l'mostawa dyalek mn A1 7tta C2</p></div>
      ${Object.keys(LANGS).map(k => { const L = LANGS[k]; return `<div class="tl-l" data-l="${k}"><i style="background:${L.c}">${L.t}</i><div><b>${L.n}</b><span>${L.s}</span></div>${last[k] ? `<em>Akhir: ${last[k]}</em>` : ""}</div>`; }).join("")}
      <div class="tl-note">Natija ta9ribiya, machi chahada rasmiya.</div></div>`;
    root().querySelectorAll(".tl-l").forEach(x => x.onclick = () => intro(x.dataset.l));
  }

  function intro(l) {
    const L = LANGS[l];
    if (!window.TL_DATA || !TL_DATA[l]) { root().innerHTML = `<div class="tl"><div class="tl-box">Les questions ma t7mmlouch (tl-${l}.js). Sedd l'app w 3awd.</div></div>`; return; }
    root().innerHTML = `<div class="tl"><div class="tl-h"><h2>${L.n}</h2><p>Test kaytbddl 3la 7sabek</p></div>
      <div class="tl-box"><div class="tl-lvls">${LV.map(x => `<span>${x}</span>`).join("")}</div>
      <div class="tl-info">
        <div><i>20</i>So2al: grammaire, vocabulaire w lecture</div>
        <div><i>↕</i>Ila jawbti mzyan l'as2ila kat9wa, ila ghlati katshal</div>
        <div><i>~10</i>D9aye9 t9riban</div>
        <div><i>✓</i>Mor kola jawab katchouf wach s7i7 w 3lach</div>
      </div>
      <button class="tl-btn" id="tlGo">Bda t-test</button><button class="tl-btn alt" id="tlBk">Bdl lougha</button></div></div>`;
    root().querySelector("#tlGo").onclick = () => start(l);
    root().querySelector("#tlBk").onclick = home;
  }

  function start(l) {
    // 8 grammaire, 8 vocabulaire, 4 lecture — mkhltin
    const types = shuf([..."gggggggg", ..."vvvvvvvv", ..."rrrr"]);
    S = { l, lv: 1, streak: 0, i: 0, types, used: new Set(), hist: [], cur: null, picked: false };
    next();
  }

  function pick(l, lv, t) {
    const bank = TL_DATA[l][LV[lv]];
    let c = bank.filter((q, k) => q.t === t && !S.used.has(lv + ":" + k));
    if (!c.length) c = bank.filter((q, k) => !S.used.has(lv + ":" + k));
    const q = c[Math.random() * c.length | 0];
    S.used.add(lv + ":" + bank.indexOf(q));
    return q;
  }

  function next() {
    if (S.i >= N) return result();
    const q = pick(S.l, S.lv, S.types[S.i]);
    const order = shuf([0, 1, 2, 3]);
    S.cur = { q, order, lv: S.lv };
    const pct = S.i / N * 100;
    root().innerHTML = `<div class="tl">
      <div class="tl-top"><span>So2al ${S.i + 1}/${N}</span><span class="lv">${LV[S.lv]}</span><button id="tlQ">Khrej</button></div>
      <div class="tl-bar"><i style="width:${pct}%"></i></div>
      <div class="tl-type">${TN[q.t].toUpperCase()}</div>
      ${q.p ? `<div class="tl-p">${esc(q.p)}</div>` : ""}
      <div class="tl-q">${esc(q.q).replace(/_{3,}/g, '<u style="text-decoration:none;border-bottom:2px dashed var(--accent);padding:0 14px"></u>')}</div>
      <div class="tl-o">${order.map((k, n) => `<button data-k="${k}"><b>${"ABCD"[n]}</b><span>${esc(q.o[k])}</span></button>`).join("")}</div>
      <div id="tlX"></div></div>`;
    const r = root();
    r.querySelector("#tlQ").onclick = () => { if (confirmQuit()) intro(S.l); };
    r.querySelectorAll(".tl-o button").forEach(b => b.onclick = () => answer(+b.dataset.k));
  }
  let quitAsk = 0;
  function confirmQuit() {
    const b = root().querySelector("#tlQ");
    if (Date.now() - quitAsk < 2500) return true;
    quitAsk = Date.now(); b.textContent = "Mt2kked? brek 3awtani"; setTimeout(() => { if (b.isConnected) b.textContent = "Khrej"; }, 2500);
    return false;
  }

  function answer(k) {
    const { q, lv } = S.cur, ok = k === q.a, r = root();
    r.querySelectorAll(".tl-o button").forEach(b => {
      b.disabled = true; const kk = +b.dataset.k;
      if (kk === q.a) b.classList.add("ok"); else if (kk === k) b.classList.add("no");
    });
    S.hist.push({ lv, t: q.t, ok });
    // adaptive: 2 s7a7 mtab3in → tl3; ghalta → hbet
    if (ok) { S.streak++; if (S.streak >= 2 && S.lv < 5) { S.lv++; S.streak = 0; } }
    else { S.streak = 0; if (S.lv > 0) S.lv--; }
    S.i++;
    r.querySelector("#tlX").innerHTML = `<div class="tl-x ${ok ? "ok" : "no"}"><b>${ok ? "S7i7!" : "Ghalat — l'jawab: " + esc(q.o[q.a])}</b><br>${esc(q.x || "")}</div>
      <button class="tl-btn" id="tlN">${S.i >= N ? "Chouf n-natija" : "Kemmel"}</button>`;
    r.querySelector("#tlN").onclick = next;
    r.querySelector("#tlN").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function level() {
    // a3la mostawa fih 2 as2ila ola ktar w 60% s7a7
    const by = LV.map(() => ({ n: 0, ok: 0 }));
    S.hist.forEach(h => { by[h.lv].n++; if (h.ok) by[h.lv].ok++; });
    let best = -1;
    for (let i = 5; i >= 0; i--) if (by[i].n >= 2 && by[i].ok / by[i].n >= .6) { best = i; break; }
    if (best < 0) for (let i = 5; i >= 0; i--) if (by[i].ok && by[i].ok / by[i].n >= .5) { best = i; break; }
    return Math.max(0, best);
  }

  function result() {
    const L = LV[level()], last = getLast();
    last[S.l] = L; try { localStorage.setItem("fr_tl", JSON.stringify(last)); } catch (e) {}
    const tot = S.hist.filter(h => h.ok).length;
    const part = t => { const a = S.hist.filter(h => h.t === t); return a.length ? Math.round(a.filter(h => h.ok).length / a.length * 100) : 0; };
    root().innerHTML = `<div class="tl"><div class="tl-box tl-res">
      <div class="tl-type">${LANGS[S.l].n.toUpperCase()} · NATIJA</div>
      <div class="tl-big">${L}</div><h3>${LVN[L][0]}</h3><p>${LVN[L][1]}</p>
      <div class="tl-scale">${LV.map(x => `<span class="${x === L ? "on" : ""}">${x}</span>`).join("")}</div>
      <div class="tl-br">${["g", "v", "r"].map(t => `<div>${TN[t]}<span>${part(t)}%</span><em><i style="width:${part(t)}%"></i></em></div>`).join("")}</div>
      <div style="font-size:14px;color:var(--muted)">Jawbti s7i7 3la <b style="color:var(--text)">${tot}/${N}</b></div>
      <div class="tl-note">Natija ta9ribiya, machi chahada rasmiya.</div>
      <button class="tl-btn" id="tlR">3awd t-test</button><button class="tl-btn alt" id="tlH">Bdl lougha</button></div></div>`;
    root().querySelector("#tlR").onclick = () => start(S.l);
    root().querySelector("#tlH").onclick = home;
  }

  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) home(); };
})();
