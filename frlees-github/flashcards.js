/* frlees app — Flashcards · dev by : frlees */
(function () {
  const ID = "flash", KEY = "fr_flash";
  const st = document.createElement("style");
  st.textContent = `
  #flash .fc{max-width:500px;margin:0 auto}
  #flash .fc-h{display:flex;align-items:center;gap:10px;margin:6px 0 14px}
  #flash .fc-h h2{font-size:26px;font-weight:800;flex:1;word-break:break-word}
  #flash .fc-h .sm{border:0;background:none;color:var(--accent);font-weight:700;font-size:14px;cursor:pointer}
  #flash .fc-d{display:flex;align-items:center;gap:14px;padding:16px;border-radius:18px;background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(10px);margin-bottom:10px;cursor:pointer;box-shadow:var(--shadow)}
  #flash .fc-d i{width:46px;height:46px;border-radius:14px;flex:none;display:grid;place-items:center;color:#fff;font-style:normal;font-weight:800;font-size:18px}
  #flash .fc-d b{display:block;font-size:16px}
  #flash .fc-d span{font-size:12.5px;color:var(--muted)}
  #flash .fc-d em{margin-left:auto;font-style:normal;color:var(--muted);font-size:20px}
  #flash .fc-btn{width:100%;padding:14px;border:0;border-radius:16px;font-weight:700;font-size:15px;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 20px rgba(47,140,255,.3);margin-top:6px}
  #flash .fc-btn.alt{background:var(--card);color:var(--text);border:1px solid var(--cardBorder);box-shadow:none}
  #flash .fc-btn:disabled{opacity:.45}
  #flash .fc-in{width:100%;padding:13px 15px;border-radius:14px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-size:15px;outline:none;margin-bottom:8px}
  #flash .fc-in:focus{border-color:var(--accent)}
  #flash .fc-add{padding:14px;border-radius:18px;background:var(--card);border:1px dashed var(--cardBorder);margin:12px 0}
  #flash .fc-add small{display:block;color:var(--muted);font-size:12px;font-weight:700;letter-spacing:1px;margin-bottom:8px}
  #flash .fc-li{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:14px;background:var(--card);border:1px solid var(--cardBorder);margin-bottom:6px;font-size:14px}
  #flash .fc-li b{flex:1;word-break:break-word} #flash .fc-li span{flex:1;color:var(--muted);word-break:break-word}
  #flash .fc-li button{border:0;background:none;color:var(--muted);font-size:18px;cursor:pointer}
  #flash .fc-lv{width:8px;height:8px;border-radius:50%;flex:none}
  #flash .fc-prog{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);font-weight:600;margin-bottom:8px}
  #flash .fc-bar{height:8px;border-radius:99px;background:rgba(47,140,255,.14);overflow:hidden;margin-bottom:22px}
  #flash .fc-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:99px;transition:width .3s}
  #flash .fc-card{perspective:1200px;height:min(330px,52vh);cursor:pointer;margin-bottom:22px}
  #flash .fc-in3{position:relative;width:100%;height:100%;transition:transform .5s;transform-style:preserve-3d}
  #flash .fc-card.flip .fc-in3{transform:rotateY(180deg)}
  #flash .fc-f{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;box-shadow:var(--shadow)}
  #flash .fc-f.fr{background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(14px)}
  #flash .fc-f.bk{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;transform:rotateY(180deg)}
  #flash .fc-f b{font-size:clamp(26px,8vw,38px);word-break:break-word}
  #flash .fc-f small{position:absolute;bottom:18px;font-size:12px;opacity:.7}
  #flash .fc-ans{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  #flash .fc-ans button{padding:16px;border:0;border-radius:16px;font-weight:800;font-size:15px;cursor:pointer;color:#fff}
  #flash .fc-ans .no{background:linear-gradient(135deg,#ef4444,#f87171)} #flash .fc-ans .ok{background:linear-gradient(135deg,#10b981,#34d399)}
  #flash .fc-ans button:disabled{opacity:.35}
  #flash .fc-end{text-align:center;padding:30px 0}
  #flash .fc-end div{font-size:54px;font-weight:800;color:var(--accent)}
  #flash .fc-end p{color:var(--muted);margin:6px 0 20px}
  `;
  document.head.appendChild(st);

  const COL = ["#2f8cff", "#7c3aed", "#10b981", "#f97316", "#ec4899", "#0ea5e9"];
  const LVC = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#10b981"];
  const START = { id: "d0", n: "English — kalimat d kola nhar", c: 0, cards: [
    ["apple", "teffa7a"], ["house", "dar"], ["water", "lma"], ["book", "ktab"], ["friend", "sa7eb"], ["to learn", "t3llem"],
    ["tomorrow", "ghedda"], ["yesterday", "lbare7"], ["cheap", "rkhis"], ["expensive", "ghali"], ["to borrow", "tsellef"], ["neighbour", "jar"],
    ["kitchen", "kouzina"], ["to forget", "nsa"], ["early", "bekri"], ["late", "m3ettel"], ["weather", "ljaw"], ["to rent", "kra"],
    ["busy", "mchghoul"], ["tired", "3iyan"]].map((p, i) => ({ id: "s" + i, f: p[0], b: p[1], lv: 0 })) };

  const load = () => { try { const d = JSON.parse(localStorage.getItem(KEY)); if (d) return d; } catch (e) {} return [START]; };
  const save = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const root = () => document.getElementById(ID);
  let S = null; // session

  function decks() {
    const D = load();
    root().innerHTML = `<div class="fc"><div class="fc-h"><h2>Flashcards</h2></div>
      ${D.map(d => { const m = d.cards.filter(c => c.lv >= 4).length; return `<div class="fc-d" data-id="${d.id}"><i style="background:${COL[d.c % COL.length]}">${esc((d.n.trim()[0] || "?").toUpperCase())}</i><div><b>${esc(d.n)}</b><span>${d.cards.length} carte · ${m} 7fadtihom</span></div><em>›</em></div>`; }).join("")}
      <div class="fc-add"><small>PAQUET JDID</small><input class="fc-in" id="fcN" placeholder="Smiya (ex: Français — verbes)" maxlength="60"><button class="fc-btn" id="fcC">Zid</button></div></div>`;
    const r = root();
    r.querySelectorAll(".fc-d").forEach(x => x.onclick = () => deck(x.dataset.id));
    r.querySelector("#fcC").onclick = () => { const n = r.querySelector("#fcN").value.trim(); if (!n) return; const D2 = load(); const d = { id: uid(), n, c: D2.length, cards: [] }; D2.push(d); save(D2); deck(d.id); };
  }

  function deck(id) {
    const D = load(), d = D.find(x => x.id === id); if (!d) return decks();
    root().innerHTML = `<div class="fc"><div class="fc-h"><h2>${esc(d.n)}</h2><button class="sm" id="fcBk">Paquets</button></div>
      <button class="fc-btn" id="fcGo" ${d.cards.length ? "" : "disabled"}>Bda t9ra (${d.cards.length})</button>
      <div class="fc-add"><small>ZID CARTE</small><input class="fc-in" id="fcF" placeholder="L'kelma"><input class="fc-in" id="fcB" placeholder="L'ma3na"><button class="fc-btn alt" id="fcA">+ Zid</button></div>
      ${d.cards.map(c => `<div class="fc-li"><i class="fc-lv" style="background:${LVC[Math.min(4, c.lv)]}"></i><b>${esc(c.f)}</b><span>${esc(c.b)}</span><button data-x="${c.id}">×</button></div>`).join("")}
      <button class="fc-btn alt" id="fcDel" style="margin-top:18px;color:#ef4444">Ms7 had l'paquet</button></div>`;
    const r = root();
    r.querySelector("#fcBk").onclick = decks;
    r.querySelector("#fcGo").onclick = () => study(id);
    const add = () => { const f = r.querySelector("#fcF").value.trim(), b = r.querySelector("#fcB").value.trim(); if (!f || !b) return; d.cards.unshift({ id: uid(), f, b, lv: 0 }); save(D); deck(id); root().querySelector("#fcF").focus(); };
    r.querySelector("#fcA").onclick = add;
    r.querySelector("#fcB").onkeydown = e => { if (e.key === "Enter") add(); };
    r.querySelector("#fcF").onkeydown = e => { if (e.key === "Enter") r.querySelector("#fcB").focus(); };
    r.querySelectorAll("[data-x]").forEach(x => x.onclick = () => { d.cards = d.cards.filter(c => c.id !== x.dataset.x); save(D); deck(id); });
    const del = r.querySelector("#fcDel");
    del.onclick = () => { if (del.dataset.ok) { save(D.filter(x => x.id !== id)); decks(); } else { del.dataset.ok = 1; del.textContent = "Mt2kked? Brek mra khra"; } };
  }

  // L'cartat li ma 3reftihomch kayrj3o b zzerba (ba3d 2-3 cartat)
  function study(id) {
    const D = load(), d = D.find(x => x.id === id);
    const order = d.cards.slice().sort((a, b) => a.lv - b.lv || Math.random() - .5);
    S = { id, q: order.map(c => c.id), total: order.length, known: 0, miss: 0, flip: false };
    card();
  }
  function card() {
    const D = load(), d = D.find(x => x.id === S.id);
    if (!S.q.length) {
      root().innerHTML = `<div class="fc"><div class="fc-end"><div>${S.total}/${S.total}</div><b>Kmmlti l'paquet!</b><p>${S.miss ? `Ghlati ${S.miss} mra — ghadi yrj3o lik ktar mra jaya.` : "Ma ghlati f 7ta wa7da, bravo!"}</p>
        <button class="fc-btn" id="fcAg">3awd</button><button class="fc-btn alt" id="fcBk2">Rje3 l'paquet</button></div></div>`;
      root().querySelector("#fcAg").onclick = () => study(S.id);
      root().querySelector("#fcBk2").onclick = () => deck(S.id);
      return;
    }
    const c = d.cards.find(x => x.id === S.q[0]);
    if (!c) { S.q.shift(); return card(); }
    const pct = Math.round(S.known / S.total * 100);
    root().innerHTML = `<div class="fc"><div class="fc-h"><h2 style="font-size:18px">${esc(d.n)}</h2><button class="sm" id="fcQ">Khrej</button></div>
      <div class="fc-prog"><span>${S.known}/${S.total} 3reftihom</span><span>Ba9i ${S.q.length}</span></div>
      <div class="fc-bar"><i style="width:${pct}%"></i></div>
      <div class="fc-card" id="fcCard"><div class="fc-in3"><div class="fc-f fr"><b>${esc(c.f)}</b><small>Brek bach tchouf l'ma3na</small></div><div class="fc-f bk"><b>${esc(c.b)}</b><small>${esc(c.f)}</small></div></div></div>
      <div class="fc-ans"><button class="no" disabled>Ma 3reftch</button><button class="ok" disabled>3reftha</button></div></div>`;
    const r = root(), cd = r.querySelector("#fcCard"), no = r.querySelector(".no"), ok = r.querySelector(".ok");
    cd.onclick = () => { cd.classList.toggle("flip"); no.disabled = ok.disabled = false; };
    r.querySelector("#fcQ").onclick = () => deck(S.id);
    const ans = good => {
      const D2 = load(), d2 = D2.find(x => x.id === S.id), c2 = d2.cards.find(x => x.id === c.id);
      S.q.shift();
      if (good) { c2.lv = Math.min(4, c2.lv + 1); S.known++; }
      else { c2.lv = 0; S.miss++; S.q.splice(Math.min(S.q.length, 2 + (Math.random() * 2 | 0)), 0, c.id); }
      save(D2); card();
    };
    no.onclick = () => ans(false); ok.onclick = () => ans(true);
  }

  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) decks(); };
})();
