/* frlees app — Prv (blassa m9fola b code) · dev by : frlees
   Kolchi kayt-chiffra b l'code (AES-GCM + PBKDF2) w kayb9a f tlifoun ghir. */
(function () {
  const ID = "prv", PIN = 4, IT = 150000;
  const st = document.createElement("style");
  st.textContent = `
  #prv .pv{max-width:520px;margin:0 auto}
  #prv .pv-lock{display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:10px}
  #prv .pv-ic{width:76px;height:76px;border-radius:24px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#0f172a,#475569);box-shadow:0 14px 30px rgba(15,23,42,.3);margin-bottom:16px}
  .dk #prv .pv-ic{background:linear-gradient(135deg,#1e293b,#64748b)}
  #prv .pv-ic svg{width:36px;height:36px}
  #prv .pv-lock h2{font-size:24px;font-weight:800}
  #prv .pv-lock p{color:var(--muted);font-size:14px;margin-top:4px;min-height:20px}
  #prv .pv-lock p.err{color:#ef4444;font-weight:700}
  #prv .pv-dots{display:flex;gap:18px;margin:26px 0 30px}
  #prv .pv-dots i{width:18px;height:18px;border-radius:50%;border:2px solid var(--muted);transition:background .15s,border-color .15s}
  #prv .pv-dots i.on{background:var(--text);border-color:var(--text)}
  #prv .pv-dots.bad i{border-color:#ef4444;background:#ef4444}
  #prv .pv-dots.bad{animation:pvSh .4s}
  @keyframes pvSh{20%,60%{transform:translateX(-10px)}40%,80%{transform:translateX(10px)}}
  #prv .pv-pad{display:grid;grid-template-columns:repeat(3,76px);gap:14px 22px}
  #prv .pv-pad button{width:76px;height:76px;border-radius:50%;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-size:28px;font-weight:600;cursor:pointer;backdrop-filter:blur(10px);transition:transform .08s}
  #prv .pv-pad button:active{transform:scale(.9);background:rgba(127,127,127,.2)}
  #prv .pv-pad button.nb{border:0;background:none;font-size:22px}
  #prv .pv-pad button:disabled{opacity:.35}
  #prv .pv-warn{margin-top:26px;font-size:12.5px;color:var(--muted);padding:12px 14px;border-radius:14px;background:rgba(239,68,68,.08);max-width:340px;line-height:1.5}
  #prv .pv-top{display:flex;align-items:center;gap:10px;margin:6px 0 14px}
  #prv .pv-top h2{font-size:26px;font-weight:800;display:flex;align-items:center;gap:8px}
  #prv .pv-top h2 svg{width:22px;height:22px}
  #prv .pv-top .sp{flex:1}
  #prv .pv-sm{border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-weight:700;font-size:13px;padding:9px 13px;border-radius:12px;cursor:pointer}
  #prv .pv-sm.dark{background:#0f172a;color:#fff;border:0}
  .dk #prv .pv-sm.dark{background:#e2e8f0;color:#0f172a}
  #prv .pv-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:5px;border-radius:16px;background:var(--card);border:1px solid var(--cardBorder);margin-bottom:16px;backdrop-filter:blur(10px)}
  #prv .pv-tabs button{border:0;background:none;color:var(--muted);font-weight:700;font-size:12.5px;padding:9px 2px;border-radius:12px;cursor:pointer}
  #prv .pv-tabs button.on{background:#0f172a;color:#fff}
  .dk #prv .pv-tabs button.on{background:#e2e8f0;color:#0f172a}
  #prv .pv-tabs small{display:block;font-size:11px;opacity:.7}
  #prv .pv-it{display:flex;align-items:center;gap:12px;padding:14px;border-radius:16px;background:var(--card);border:1px solid var(--cardBorder);margin-bottom:9px;cursor:pointer;backdrop-filter:blur(10px)}
  #prv .pv-it i{width:40px;height:40px;border-radius:12px;flex:none;display:grid;place-items:center;background:rgba(127,127,127,.12);font-style:normal}
  #prv .pv-it i svg{width:20px;height:20px}
  #prv .pv-it div{flex:1;min-width:0}
  #prv .pv-it b{display:block;font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  #prv .pv-it span{display:block;font-size:12.5px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  #prv .pv-pics{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
  #prv .pv-pics div{aspect-ratio:1;border-radius:12px;overflow:hidden;background:rgba(127,127,127,.15);cursor:pointer}
  #prv .pv-pics img{width:100%;height:100%;object-fit:cover;display:block}
  #prv .pv-e{text-align:center;color:var(--muted);font-size:14px;padding:40px 10px;line-height:1.6}
  #prv .pv-fab{position:fixed;right:22px;bottom:calc(24px + env(safe-area-inset-bottom));width:60px;height:60px;border-radius:20px;border:0;color:#fff;font-size:32px;cursor:pointer;background:linear-gradient(135deg,#0f172a,#475569);box-shadow:0 10px 24px rgba(15,23,42,.35);z-index:5}
  #prv .pv-sheet{position:fixed;inset:0;z-index:61;display:flex;align-items:flex-end;justify-content:center;background:rgba(3,10,25,.45);padding:16px}
  #prv .pv-sheet>div{width:100%;max-width:420px;border-radius:24px;padding:20px;background:var(--bg);border:1px solid var(--cardBorder);box-shadow:var(--shadow);animation:fade .25s ease}
  #prv .pv-sheet h3{font-size:18px;margin-bottom:12px}
  #prv .pv-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  #prv .pv-opts button{display:flex;flex-direction:column;align-items:center;gap:8px;padding:18px 8px;border-radius:18px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font-weight:700;font-size:14px;cursor:pointer}
  #prv .pv-opts svg{width:26px;height:26px;color:var(--accent)}
  #prv .pv-f{display:flex;flex-direction:column;gap:10px}
  #prv .pv-f label{font-size:12px;font-weight:700;color:var(--muted);letter-spacing:.8px;margin-bottom:-4px}
  #prv .pv-f input,#prv .pv-f textarea{width:100%;padding:13px 15px;border-radius:14px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);font:inherit;font-size:15px;outline:none;user-select:text}
  #prv .pv-f input:focus,#prv .pv-f textarea:focus{border-color:var(--accent)}
  #prv .pv-f textarea{min-height:40vh;resize:none;line-height:1.5}
  #prv .pv-row{display:flex;gap:10px}
  #prv .pv-b{flex:1;padding:14px;border-radius:14px;border:0;font-weight:700;font-size:15px;cursor:pointer;color:#fff;background:linear-gradient(135deg,var(--accent),var(--accent2))}
  #prv .pv-b.alt{background:var(--card);color:var(--text);border:1px solid var(--cardBorder)}
  #prv .pv-b.del{flex:none;background:rgba(239,68,68,.12);color:#ef4444;padding:14px 16px}
  #prv .pv-pw{display:flex;gap:8px;align-items:center}
  #prv .pv-pw input{flex:1}
  #prv .pv-pw button{flex:none;padding:12px;border-radius:12px;border:1px solid var(--cardBorder);background:var(--card);color:var(--text);cursor:pointer;font-weight:700;font-size:12px}
  #prv .pv-view{position:fixed;inset:0;z-index:62;background:rgba(0,0,0,.92);display:flex;flex-direction:column}
  #prv .pv-view img{flex:1;min-height:0;object-fit:contain;width:100%}
  #prv .pv-view .pv-row{padding:14px;padding-bottom:max(14px,env(safe-area-inset-bottom))}
  #prv .pv-note{font-size:12px;color:var(--muted);margin-top:10px;line-height:1.5}
  #prv .pv-busy{text-align:center;color:var(--muted);padding:40px}
  `;
  document.head.appendChild(st);

  const I = {
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h10l4 4v14H5z"/><path d="M15 3v4h4M8 12h8M8 16h5"/></svg>',
    pic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/></svg>'
  };

  /* ---------- IndexedDB ---------- */
  let dbp = null;
  const db = () => dbp || (dbp = new Promise((ok, ko) => {
    const r = indexedDB.open("frlees_prv", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("kv");
    r.onsuccess = () => ok(r.result); r.onerror = () => ko(r.error);
  }));
  const tx = (mode, fn) => db().then(d => new Promise((ok, ko) => { const t = d.transaction("kv", mode), s = t.objectStore("kv"); const r = fn(s); t.oncomplete = () => ok(r && r.result); t.onerror = () => ko(t.error); }));
  const kget = k => tx("readonly", s => s.get(k));
  const kput = (k, v) => tx("readwrite", s => s.put(v, k));
  const kdel = k => tx("readwrite", s => s.delete(k));

  /* ---------- crypto ---------- */
  const enc = new TextEncoder(), dec = new TextDecoder();
  const C = () => window.crypto && crypto.subtle;
  async function derive(pin, salt) {
    const base = await crypto.subtle.importKey("raw", enc.encode(pin), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: IT, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  }
  async function seal(key, buf) { const iv = crypto.getRandomValues(new Uint8Array(12)); return { iv, ct: await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, buf) }; }
  const open_ = (key, o) => crypto.subtle.decrypt({ name: "AES-GCM", iv: o.iv }, key, o.ct);
  const sealJ = (key, obj) => seal(key, enc.encode(JSON.stringify(obj)));
  const openJ = async (key, o) => JSON.parse(dec.decode(await open_(key, o)));

  /* ---------- state ---------- */
  let K = null, IDX = null, tab = "notes", urls = [], picking = false;
  const empty = () => ({ notes: [], pics: [], files: [], codes: [] });
  const root = () => document.getElementById(ID);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const size = n => n < 1024 ? n + " o" : n < 1048576 ? (n / 1024).toFixed(0) + " Ko" : (n / 1048576).toFixed(1) + " Mo";
  const day = t => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const saveIdx = async () => kput("idx", await sealJ(K, IDX));
  const fails = () => { try { return JSON.parse(localStorage.getItem("fr_prv_f")) || { n: 0, u: 0 }; } catch (e) { return { n: 0, u: 0 }; } };
  const setFails = f => { try { localStorage.setItem("fr_prv_f", JSON.stringify(f)); } catch (e) {} };
  function freeUrls() { urls.forEach(u => URL.revokeObjectURL(u)); urls = []; }
  function lockNow() { K = null; IDX = null; freeUrls(); }

  /* ---------- lock / setup ---------- */
  async function enter() {
    if (!C() || !window.indexedDB) { root().innerHTML = `<div class="pv"><div class="pv-e">Prv ma khddamach f had l'navigateur (khass https w IndexedDB).</div></div>`; return; }
    if (K) return vault();
    root().innerHTML = `<div class="pv"><div class="pv-busy">...</div></div>`;
    let meta = null; try { meta = await kget("meta"); } catch (e) {}
    pad(meta ? "unlock" : "new");
  }

  function pad(mode, first) {
    let code = "", busy = false, timer = 0;
    const T = { unlock: ["Prv", "Dkhel l'code dyalek"], new: ["Code jdid", `Khtar code dyal ${PIN} ar9am`], again: ["3awd l'code", "Kteb nfs l'code mra khra"], old: ["Bddel l'code", "Dkhel l'code l9dim"], new2: ["Code jdid", `Khtar code jdid dyal ${PIN} ar9am`], again2: ["3awd l'code", "Kteb l'code jdid mra khra"] }[mode];
    root().innerHTML = `<div class="pv"><div class="pv-lock">
      <div class="pv-ic">${I.lock}</div><h2>${T[0]}</h2><p id="pvMsg">${T[1]}</p>
      <div class="pv-dots" id="pvD">${"<i></i>".repeat(PIN)}</div>
      <div class="pv-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button data-n="${n}">${n}</button>`).join("")}
        <button class="nb" data-n="x">${mode === "old" || mode === "new2" || mode === "again2" ? "✕" : ""}</button><button data-n="0">0</button><button class="nb" data-n="b">⌫</button></div>
      ${mode === "new" ? `<div class="pv-warn"><b>Rdd lbal:</b> ila nsiti l'code, ma kayn 7tta tari9a bach trj3 dakchi li khbbiti. Kteb l'code f chi blassa m2mmna.</div>` : ""}
    </div></div>`;
    const r = root(), D = r.querySelector("#pvD"), M = r.querySelector("#pvMsg");
    const dots = () => D.querySelectorAll("i").forEach((d, i) => d.classList.toggle("on", i < code.length));
    const bad = msg => { D.classList.add("bad"); M.textContent = msg; M.className = "err"; try { navigator.vibrate && navigator.vibrate(200); } catch (e) {} setTimeout(() => { D.classList.remove("bad"); code = ""; dots(); }, 450); };
    const setDis = v => r.querySelectorAll(".pv-pad button").forEach(b => b.disabled = v);
    const wait = () => {
      const f = fails(), left = Math.ceil((f.u - Date.now()) / 1000);
      if (left > 0) { setDis(true); M.className = "err"; M.textContent = `Bzzaf d l'ghalat. Tsenna ${left}s`; clearTimeout(timer); timer = setTimeout(wait, 500); return true; }
      setDis(false); return false;
    };
    if (mode === "unlock" || mode === "old") wait();
    async function done() {
      busy = true;
      if (mode === "new" || mode === "new2") return pad(mode === "new" ? "again" : "again2", code);
      if (mode === "again" || mode === "again2") {
        if (code !== first) { busy = false; return bad("Ma tchabhoch, 3awd"); }
        M.className = ""; M.textContent = "...";
        if (mode === "again") {
          const salt = crypto.getRandomValues(new Uint8Array(16));
          K = await derive(code, salt); IDX = empty();
          await kput("meta", { salt, it: IT, v: 1 }); await saveIdx();
          return vault();
        }
        return rekey(code);
      }
      // unlock / old
      if (wait()) { busy = false; return; }
      M.className = ""; M.textContent = "...";
      try {
        const meta = await kget("meta"), key = await derive(code, meta.salt), idx = await openJ(key, await kget("idx"));
        setFails({ n: 0, u: 0 });
        if (mode === "old") { busy = false; return pad("new2"); }
        K = key; IDX = Object.assign(empty(), idx); vault();
      } catch (e) {
        const f = fails(); f.n++; if (f.n >= 5) { f.n = 0; f.u = Date.now() + 30000; } setFails(f);
        busy = false; bad(f.u > Date.now() ? "Code ghalat" : `Code ghalat · ba9i lik ${5 - f.n} mo7awalat`);
        setTimeout(() => { if (root().querySelector("#pvD") === D) wait(); }, 460);
      }
    }
    r.querySelectorAll(".pv-pad button").forEach(b => b.onclick = () => {
      if (busy) return; const n = b.dataset.n;
      if (n === "x") { if (mode === "old" || mode === "new2" || mode === "again2") vault(); return; }
      if (n === "b") code = code.slice(0, -1); else if (code.length < PIN) code += n;
      dots(); if (code.length === PIN) setTimeout(done, 120);
    });
  }

  async function rekey(pin) {
    root().innerHTML = `<div class="pv"><div class="pv-busy">Kanbddel l'code... ma tsdch l'app</div></div>`;
    const salt = crypto.getRandomValues(new Uint8Array(16)), nk = await derive(pin, salt);
    for (const it of [...IDX.pics, ...IDX.files]) {
      for (const p of ["b:", "t:"]) { const o = await kget(p + it.id); if (o) await kput(p + it.id, await seal(nk, await open_(K, o))); }
    }
    K = nk; await kput("meta", { salt, it: IT, v: 1 }); await saveIdx();
    vault("Tbddel l'code");
  }

  /* ---------- vault ---------- */
  function vault(toast) {
    if (!K) return enter();
    freeUrls();
    const L = { notes: "Notes", pics: "Tsawer", files: "Fichiers", codes: "Codes" };
    let body = "";
    const list = IDX[tab].slice().sort((a, b) => b.t - a.t);
    if (!list.length) body = `<div class="pv-e">Mazal ma khbbiti walo hna.<br>Brek 3la + bach tzid.</div>`;
    else if (tab === "notes") body = list.map(n => `<div class="pv-it" data-id="${n.id}"><i>${I.note}</i><div><b>${esc(n.h || "Bla 3onwan")}</b><span>${esc((n.b || "").slice(0, 80))}</span></div></div>`).join("");
    else if (tab === "codes") body = list.map(n => `<div class="pv-it" data-id="${n.id}"><i>${I.key}</i><div><b>${esc(n.n || "Code")}</b><span>${esc(n.u || "")} · ••••••</span></div></div>`).join("");
    else if (tab === "files") body = list.map(n => `<div class="pv-it" data-id="${n.id}"><i>${I.file}</i><div><b>${esc(n.name)}</b><span>${size(n.size)} · ${day(n.t)}</span></div></div>`).join("");
    else body = `<div class="pv-pics">${list.map(n => `<div data-id="${n.id}"></div>`).join("")}</div>`;
    root().innerHTML = `<div class="pv">
      <div class="pv-top"><h2>${I.lock} Prv</h2><div class="sp"></div><button class="pv-sm" id="pvCh">Bddel code</button><button class="pv-sm dark" id="pvX">Sedd</button></div>
      <div class="pv-tabs">${Object.keys(L).map(k => `<button data-t="${k}" class="${k === tab ? "on" : ""}">${L[k]}<small>${IDX[k].length}</small></button>`).join("")}</div>
      ${toast ? `<div class="pv-note" style="text-align:center;margin:-6px 0 12px;color:#10b981;font-weight:700">${toast}</div>` : ""}
      ${body}
      ${tab === "pics" && list.length ? `<div class="pv-note">Tsawer li zedti ma kaytms7ouch mn l'galerie dyal tlifoun — ms7hom nta mn tma.</div>` : ""}
      <button class="pv-fab" aria-label="Zid">+</button><div id="pvSheet"></div></div>`;
    const r = root();
    r.querySelector("#pvX").onclick = () => { lockNow(); show("home"); };
    r.querySelector("#pvCh").onclick = () => pad("old");
    r.querySelectorAll(".pv-tabs button").forEach(b => b.onclick = () => { tab = b.dataset.t; vault(); });
    r.querySelector(".pv-fab").onclick = sheet;
    if (tab === "notes") r.querySelectorAll(".pv-it").forEach(x => x.onclick = () => editNote(x.dataset.id));
    if (tab === "codes") r.querySelectorAll(".pv-it").forEach(x => x.onclick = () => editCode(x.dataset.id));
    if (tab === "files") r.querySelectorAll(".pv-it").forEach(x => x.onclick = () => viewFile(x.dataset.id));
    if (tab === "pics") r.querySelectorAll(".pv-pics div").forEach(async x => {
      x.onclick = () => viewPic(x.dataset.id);
      try { const o = await kget("t:" + x.dataset.id); if (!o || !K) return; const u = URL.createObjectURL(new Blob([await open_(K, o)], { type: "image/jpeg" })); urls.push(u); x.innerHTML = `<img src="${u}" alt="">`; } catch (e) {}
    });
  }

  function sheet() {
    const s = root().querySelector("#pvSheet");
    s.innerHTML = `<div class="pv-sheet"><div><h3>Zid f Prv</h3><div class="pv-opts">
      <button data-a="note">${I.note}Note</button><button data-a="pic">${I.pic}Tswira</button>
      <button data-a="code">${I.key}Code</button><button data-a="file">${I.file}Fichier</button></div>
      <input type="file" id="pvIn" hidden multiple></div></div>`;
    const sh = s.querySelector(".pv-sheet"), inp = s.querySelector("#pvIn");
    sh.onclick = e => { if (e.target === sh) s.innerHTML = ""; };
    s.querySelectorAll("[data-a]").forEach(b => b.onclick = () => {
      const a = b.dataset.a;
      if (a === "note") return editNote(null);
      if (a === "code") return editCode(null);
      inp.accept = a === "pic" ? "image/*" : ""; inp.dataset.k = a; picking = true; inp.click();
    });
    inp.onchange = () => { picking = false; addFiles([...inp.files], inp.dataset.k); };
  }

  function thumb(file) {
    return new Promise(ok => {
      const u = URL.createObjectURL(file), im = new Image();
      im.onload = () => { const m = 320, sc = Math.min(1, m / Math.max(im.width, im.height)), c = document.createElement("canvas");
        c.width = Math.round(im.width * sc); c.height = Math.round(im.height * sc); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(u); c.toBlob(b => ok(b), "image/jpeg", .8); };
      im.onerror = () => { URL.revokeObjectURL(u); ok(null); };
      im.src = u;
    });
  }

  async function addFiles(files, kind) {
    if (!files.length) return;
    root().innerHTML = `<div class="pv"><div class="pv-busy">Kankhbbi ${files.length} ${kind === "pic" ? "tswira" : "fichier"}...</div></div>`;
    let skipped = 0;
    for (const f of files) {
      try {
        if (f.size > 60 * 1048576) { skipped++; continue; }
        const id = uid();
        await kput("b:" + id, await seal(K, await f.arrayBuffer()));
        if (kind === "pic") { const t = await thumb(f); if (t) await kput("t:" + id, await seal(K, await t.arrayBuffer())); }
        IDX[kind === "pic" ? "pics" : "files"].push({ id, name: f.name, type: f.type, size: f.size, t: Date.now() });
        await saveIdx();
      } catch (e) { skipped++; }
    }
    tab = kind === "pic" ? "pics" : "files";
    vault(skipped ? `${skipped} ma t-zadouch (kbar bzzaf ola blassa sallat)` : "Tkhbbaw");
  }

  async function blobOf(it) { const o = await kget("b:" + it.id); return new Blob([await open_(K, o)], { type: it.type || "application/octet-stream" }); }
  function download(blob, name) { const u = URL.createObjectURL(blob), a = document.createElement("a"); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); }
  async function delItem(kind, id) { IDX[kind] = IDX[kind].filter(x => x.id !== id); await kdel("b:" + id); await kdel("t:" + id); await saveIdx(); }
  function confirmBtn(b, fn) { b.onclick = () => { if (b.dataset.ok) fn(); else { b.dataset.ok = 1; b.textContent = "Mt2kked?"; } }; }

  async function viewPic(id) {
    const it = IDX.pics.find(x => x.id === id); if (!it) return;
    const s = root().querySelector("#pvSheet");
    s.innerHTML = `<div class="pv-view"><div class="pv-busy" style="flex:1;color:#fff">...</div></div>`;
    const blob = await blobOf(it), u = URL.createObjectURL(blob); urls.push(u);
    s.innerHTML = `<div class="pv-view"><img src="${u}" alt=""><div class="pv-row"><button class="pv-b del">Ms7</button><button class="pv-b alt" id="pvDl">Telecharger</button><button class="pv-b" id="pvC">Sedd</button></div></div>`;
    s.querySelector("#pvC").onclick = () => s.innerHTML = "";
    s.querySelector("#pvDl").onclick = () => download(blob, it.name || "tswira.jpg");
    confirmBtn(s.querySelector(".del"), async () => { await delItem("pics", id); vault(); });
  }

  function viewFile(id) {
    const it = IDX.files.find(x => x.id === id); if (!it) return;
    root().querySelector("#pvSheet").innerHTML = `<div class="pv-sheet"><div><h3 style="word-break:break-all">${esc(it.name)}</h3>
      <div class="pv-note" style="margin:-6px 0 14px">${size(it.size)} · ${day(it.t)}</div>
      <div class="pv-row"><button class="pv-b del">Ms7</button><button class="pv-b alt" id="pvC">Sedd</button><button class="pv-b" id="pvDl">Telecharger</button></div></div></div>`;
    const s = root().querySelector("#pvSheet");
    s.querySelector("#pvC").onclick = () => s.innerHTML = "";
    s.querySelector("#pvDl").onclick = async () => download(await blobOf(it), it.name);
    confirmBtn(s.querySelector(".del"), async () => { await delItem("files", id); vault(); });
  }

  function editNote(id) {
    const n = IDX.notes.find(x => x.id === id) || { id: uid(), h: "", b: "", t: Date.now() };
    root().innerHTML = `<div class="pv"><div class="pv-top"><h2>${I.lock} Note</h2></div><div class="pv-f">
      <input id="pvH" placeholder="3onwan" value="${esc(n.h)}"><textarea id="pvB" placeholder="Kteb hna...">${esc(n.b)}</textarea>
      <div class="pv-row">${id ? '<button class="pv-b del">Ms7</button>' : ""}<button class="pv-b alt" id="pvBk">Rje3</button><button class="pv-b" id="pvSv">Sjjel</button></div></div></div>`;
    const r = root();
    r.querySelector("#pvBk").onclick = () => vault();
    r.querySelector("#pvSv").onclick = async () => {
      n.h = r.querySelector("#pvH").value.trim(); n.b = r.querySelector("#pvB").value; n.t = Date.now();
      IDX.notes = IDX.notes.filter(x => x.id !== n.id); if (n.h || n.b.trim()) IDX.notes.push(n);
      await saveIdx(); tab = "notes"; vault();
    };
    const d = r.querySelector(".del"); if (d) confirmBtn(d, async () => { IDX.notes = IDX.notes.filter(x => x.id !== n.id); await saveIdx(); vault(); });
    if (!id) r.querySelector("#pvB").focus();
  }

  function editCode(id) {
    const n = IDX.codes.find(x => x.id === id) || { id: uid(), n: "", u: "", p: "", x: "", t: Date.now() };
    root().innerHTML = `<div class="pv"><div class="pv-top"><h2>${I.key} Code</h2></div><div class="pv-f">
      <label>SMIYA</label><input id="pvN" placeholder="ex: Instagram, Wifi, Banque" value="${esc(n.n)}">
      <label>USER / EMAIL</label><input id="pvU" value="${esc(n.u)}" autocomplete="off">
      <label>MOT DE PASSE / CODE</label><div class="pv-pw"><input id="pvP" type="password" value="${esc(n.p)}" autocomplete="off"><button id="pvEye">Chouf</button><button id="pvCp">Copier</button></div>
      <label>MOLA7ADA</label><input id="pvXn" value="${esc(n.x || "")}">
      <div class="pv-row" style="margin-top:6px">${id ? '<button class="pv-b del">Ms7</button>' : ""}<button class="pv-b alt" id="pvBk">Rje3</button><button class="pv-b" id="pvSv">Sjjel</button></div></div></div>`;
    const r = root(), P = r.querySelector("#pvP");
    r.querySelector("#pvEye").onclick = e => { const v = P.type === "password"; P.type = v ? "text" : "password"; e.target.textContent = v ? "Khbbi" : "Chouf"; };
    r.querySelector("#pvCp").onclick = e => { try { navigator.clipboard.writeText(P.value).then(() => { e.target.textContent = "Tcopia"; setTimeout(() => e.target.textContent = "Copier", 1500); }); } catch (er) {} };
    r.querySelector("#pvBk").onclick = () => vault();
    r.querySelector("#pvSv").onclick = async () => {
      n.n = r.querySelector("#pvN").value.trim(); n.u = r.querySelector("#pvU").value.trim(); n.p = P.value; n.x = r.querySelector("#pvXn").value; n.t = Date.now();
      IDX.codes = IDX.codes.filter(x => x.id !== n.id); if (n.n || n.u || n.p) IDX.codes.push(n);
      await saveIdx(); tab = "codes"; vault();
    };
    const d = r.querySelector(".del"); if (d) confirmBtn(d, async () => { IDX.codes = IDX.codes.filter(x => x.id !== n.id); await saveIdx(); vault(); });
  }

  // kat-tsedd wa7dha mlli tkhrej mn Prv ola tkhbbi l'app
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) { if (picking) setTimeout(() => picking = false, 1500); return; }
    if (K && !picking) { lockNow(); const v = root(); if (v && v.classList.contains("on")) enter(); } });
  const baseShow = window.show;
  window.show = function (id) { const was = root() && root().classList.contains("on"); baseShow(id); if (id === ID) enter(); else if (was) { lockNow(); root().innerHTML = ""; } };
})();
