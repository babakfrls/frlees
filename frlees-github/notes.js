/* frlees app — Notes · dev by : frlees */
(function () {
  const ID = "notes", KEY = "fr_notes";
  const COLORS = ["#fde68a", "#bfdbfe", "#fbcfe8", "#bbf7d0", "#ddd6fe", "#fed7aa"];
  const st = document.createElement("style");
  st.textContent = `
  #notes .nt{max-width:560px;margin:0 auto;position:relative;min-height:100%}
  #notes .nt-h{display:flex;align-items:center;gap:10px;margin:6px 0 14px}
  #notes .nt-h h2{font-size:26px;font-weight:800}
  #notes .nt-h span{margin-left:auto;color:var(--muted);font-size:13px}
  #notes .nt-s{width:100%;padding:13px 16px;border-radius:16px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-size:15px;outline:none;backdrop-filter:blur(10px);margin-bottom:14px}
  #notes .nt-s:focus{border-color:var(--accent)}
  #notes .nt-g{columns:2;column-gap:12px}
  #notes .nt-c{break-inside:avoid;margin-bottom:12px;padding:14px;border-radius:18px;color:#1e293b;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.08);transition:transform .15s}
  #notes .nt-c:active{transform:scale(.97)}
  #notes .nt-c b{display:block;font-size:15px;margin-bottom:4px;word-break:break-word}
  #notes .nt-c p{font-size:13px;opacity:.85;white-space:pre-wrap;word-break:break-word;max-height:150px;overflow:hidden}
  #notes .nt-c small{display:block;margin-top:8px;font-size:11px;opacity:.6}
  #notes .nt-e{text-align:center;color:var(--muted);padding:50px 10px;font-size:14px;column-span:all}
  #notes .nt-fab{position:fixed;right:22px;bottom:calc(24px + env(safe-area-inset-bottom));width:60px;height:60px;border-radius:20px;border:0;color:#fff;font-size:32px;cursor:pointer;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 10px 24px rgba(47,140,255,.4);z-index:5}
  #notes .nt-ed{display:flex;flex-direction:column;gap:12px}
  #notes .nt-ed input,#notes .nt-ed textarea{width:100%;border:0;border-radius:18px;padding:14px 16px;font:inherit;color:#1e293b;outline:none}
  #notes .nt-ed input{font-size:19px;font-weight:700}
  #notes .nt-ed textarea{min-height:46vh;font-size:15px;resize:none;line-height:1.5}
  #notes .nt-cols{display:flex;gap:10px}
  #notes .nt-cols i{width:32px;height:32px;border-radius:50%;cursor:pointer;border:3px solid transparent}
  #notes .nt-cols i.on{border-color:var(--text)}
  #notes .nt-row{display:flex;gap:10px}
  #notes .nt-b{flex:1;padding:13px;border-radius:14px;border:0;font-weight:700;font-size:15px;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2))}
  #notes .nt-b.del{flex:none;background:rgba(239,68,68,.12);color:#ef4444;padding:13px 18px}
  #notes .nt-b.alt{background:var(--card);color:var(--text);border:1px solid var(--cardBorder)}
  `;
  document.head.appendChild(st);

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const save = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} };
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = t => { const d = new Date(t); return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " · " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); };
  let q = "";
  const root = () => document.getElementById(ID);

  function list() {
    const all = load().sort((a, b) => b.t - a.t);
    const f = all.filter(n => (n.h + " " + n.b).toLowerCase().includes(q.toLowerCase()));
    root().innerHTML = `<div class="nt">
      <div class="nt-h"><h2>Notes</h2><span>${all.length} note${all.length > 1 ? "s" : ""}</span></div>
      <input class="nt-s" placeholder="9alleb..." value="${esc(q)}">
      <div class="nt-g">${f.map(n => `<div class="nt-c" data-id="${n.id}" style="background:${n.c}"><b>${esc(n.h || "Bla 3onwan")}</b><p>${esc(n.b)}</p><small>${fmt(n.t)}</small></div>`).join("") ||
        `<div class="nt-e">${all.length ? "Ma l9it walo" : "Mazal ma ktebti walo.<br>Brek 3la + bach tbda."}</div>`}</div>
      <button class="nt-fab" aria-label="Note jdida">+</button></div>`;
    const s = root().querySelector(".nt-s");
    s.oninput = () => { q = s.value; const p = s.selectionStart; list(); const n = root().querySelector(".nt-s"); n.focus(); n.setSelectionRange(p, p); };
    root().querySelector(".nt-fab").onclick = () => edit(null);
    root().querySelectorAll(".nt-c").forEach(c => c.onclick = () => edit(c.dataset.id));
  }

  function edit(id) {
    const all = load();
    const n = all.find(x => x.id === id) || { id: Date.now().toString(36), h: "", b: "", c: COLORS[Math.floor(Math.random() * COLORS.length)], t: Date.now() };
    root().innerHTML = `<div class="nt"><div class="nt-ed">
      <div class="nt-cols">${COLORS.map(c => `<i data-c="${c}" style="background:${c}" class="${c === n.c ? "on" : ""}"></i>`).join("")}</div>
      <input placeholder="3onwan" value="${esc(n.h)}" style="background:${n.c}">
      <textarea placeholder="Kteb hna..." style="background:${n.c}">${esc(n.b)}</textarea>
      <div class="nt-row">${id ? '<button class="nt-b del">Ms7</button>' : ""}<button class="nt-b alt" id="ntX">Rje3</button><button class="nt-b" id="ntS">Sjjel</button></div>
    </div></div>`;
    const r = root(), h = r.querySelector("input"), b = r.querySelector("textarea");
    r.querySelectorAll(".nt-cols i").forEach(i => i.onclick = () => {
      n.c = i.dataset.c; h.style.background = b.style.background = n.c;
      r.querySelectorAll(".nt-cols i").forEach(x => x.classList.toggle("on", x === i));
    });
    r.querySelector("#ntX").onclick = list;
    r.querySelector("#ntS").onclick = () => {
      n.h = h.value.trim(); n.b = b.value; n.t = Date.now();
      const rest = all.filter(x => x.id !== n.id);
      if (n.h || n.b.trim()) rest.push(n);
      save(rest); list();
    };
    const d = r.querySelector(".del");
    if (d) d.onclick = () => { if (d.dataset.ok) { save(all.filter(x => x.id !== n.id)); list(); } else { d.dataset.ok = 1; d.textContent = "Mt2kked?"; } };
    if (!id) b.focus();
  }

  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) list(); };
})();
