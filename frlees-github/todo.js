/* frlees app — To-do · dev by : frlees */
(function () {
  const ID = "todo", KEY = "fr_todo";
  const st = document.createElement("style");
  st.textContent = `
  #todo .td{max-width:520px;margin:0 auto}
  #todo .td-h{display:flex;align-items:baseline;gap:10px;margin:6px 0 4px}
  #todo .td-h h2{font-size:26px;font-weight:800}
  #todo .td-h span{margin-left:auto;color:var(--muted);font-size:13px;font-weight:600}
  #todo .td-bar{height:10px;border-radius:99px;background:rgba(47,140,255,.14);overflow:hidden;margin:10px 0 18px}
  #todo .td-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .35s}
  #todo .td-add{display:flex;gap:10px;margin-bottom:16px}
  #todo .td-add input{flex:1;min-width:0;padding:14px 16px;border-radius:16px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-size:15px;outline:none;backdrop-filter:blur(10px)}
  #todo .td-add input:focus{border-color:var(--accent)}
  #todo .td-add button{width:52px;border:0;border-radius:16px;color:#fff;font-size:26px;cursor:pointer;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 8px 18px rgba(47,140,255,.35)}
  #todo .td-l{display:flex;flex-direction:column;gap:9px}
  #todo .td-i{display:flex;align-items:center;gap:12px;padding:14px;border-radius:16px;background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(10px);animation:fade .25s ease}
  #todo .td-ck{width:26px;height:26px;flex:none;border-radius:9px;border:2px solid var(--accent);display:grid;place-items:center;cursor:pointer;color:#fff}
  #todo .td-ck svg{width:16px;height:16px;opacity:0}
  #todo .td-i.ok .td-ck{background:var(--accent)} #todo .td-i.ok .td-ck svg{opacity:1}
  #todo .td-i p{flex:1;font-size:15px;word-break:break-word;cursor:pointer}
  #todo .td-i.ok p{text-decoration:line-through;color:var(--muted)}
  #todo .td-x{border:0;background:none;color:var(--muted);font-size:20px;cursor:pointer;padding:0 4px}
  #todo .td-sec{font-size:12px;font-weight:700;letter-spacing:1.2px;color:var(--muted);margin:18px 0 8px;display:flex;align-items:center}
  #todo .td-sec button{margin-left:auto;border:0;background:none;color:#ef4444;font-weight:700;font-size:12px;cursor:pointer}
  #todo .td-e{text-align:center;color:var(--muted);padding:40px 10px;font-size:14px}
  `;
  document.head.appendChild(st);

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const save = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} };
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const CK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const root = () => document.getElementById(ID);

  function item(t) {
    return `<div class="td-i${t.d ? " ok" : ""}" data-id="${t.id}"><span class="td-ck">${CK}</span><p>${esc(t.x)}</p><button class="td-x" aria-label="Ms7">×</button></div>`;
  }

  function render(focus) {
    const all = load(), done = all.filter(t => t.d), todo = all.filter(t => !t.d);
    const pct = all.length ? Math.round(done.length / all.length * 100) : 0;
    root().innerHTML = `<div class="td">
      <div class="td-h"><h2>To-do</h2><span>${done.length}/${all.length} · ${pct}%</span></div>
      <div class="td-bar"><i style="width:${pct}%"></i></div>
      <form class="td-add"><input placeholder="Zid chi 7aja..." maxlength="200"><button type="submit">+</button></form>
      <div class="td-l">${todo.map(item).join("")}</div>
      ${!all.length ? '<div class="td-e">Ma 3ndek walo daba. Zid awel 7aja lfo9!</div>' : !todo.length ? '<div class="td-e">Kolchi sali, bravo!</div>' : ""}
      ${done.length ? `<div class="td-sec">SALIN (${done.length})<button id="tdClr">Ms7 kolchi</button></div><div class="td-l">${done.map(item).join("")}</div>` : ""}
    </div>`;
    const r = root(), inp = r.querySelector(".td-add input");
    r.querySelector(".td-add").onsubmit = e => {
      e.preventDefault();
      const x = inp.value.trim(); if (!x) return;
      const a = load(); a.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), x, d: false });
      save(a); render(true);
    };
    r.querySelectorAll(".td-i").forEach(el => {
      const id = el.dataset.id;
      const tog = () => { const a = load(); const t = a.find(z => z.id === id); if (t) t.d = !t.d; save(a); render(); };
      el.querySelector(".td-ck").onclick = tog; el.querySelector("p").onclick = tog;
      el.querySelector(".td-x").onclick = () => { save(load().filter(z => z.id !== id)); render(); };
    });
    const c = r.querySelector("#tdClr");
    if (c) c.onclick = () => { if (c.dataset.ok) { save(load().filter(z => !z.d)); render(); } else { c.dataset.ok = 1; c.textContent = "Mt2kked?"; } };
    if (focus) inp.focus();
  }

  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) render(); };
})();
