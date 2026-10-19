/* frlees app — Mo7awwil · dev by : frlees */
(function () {
  const ID = "conv";
  const st = document.createElement("style");
  st.textContent = `
  #conv .cv{max-width:480px;margin:0 auto}
  #conv .cv-h{margin:6px 0 14px}
  #conv .cv-h h2{font-size:26px;font-weight:800}
  #conv .cv-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:5px;border-radius:16px;background:var(--card);border:1px solid var(--cardBorder);margin-bottom:18px;backdrop-filter:blur(10px)}
  #conv .cv-tabs button{border:0;background:none;color:var(--muted);font-weight:700;font-size:13px;padding:10px 4px;border-radius:12px;cursor:pointer}
  #conv .cv-tabs button.on{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff}
  #conv .cv-box{padding:16px;border-radius:20px;background:var(--card);border:1px solid var(--cardBorder);backdrop-filter:blur(10px);box-shadow:var(--shadow)}
  #conv .cv-box small{font-size:12px;color:var(--muted);font-weight:700;letter-spacing:1px}
  #conv .cv-row{display:flex;align-items:center;gap:10px;margin-top:8px}
  #conv .cv-row input,#conv .cv-row output{flex:1;min-width:0;font-size:30px;font-weight:800;border:0;background:none;color:var(--text);outline:none;font-family:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  #conv .cv-row output{color:var(--accent)}
  #conv .cv-row select{flex:none;max-width:46%;padding:10px 12px;border-radius:12px;border:1px solid var(--cardBorder);background:var(--bg);color:var(--text);font-weight:700;font-size:14px;outline:none}
  #conv .cv-sw{display:flex;justify-content:center;margin:-10px 0;position:relative;z-index:2}
  #conv .cv-sw button{width:48px;height:48px;border-radius:50%;border:4px solid var(--bg);color:#fff;cursor:pointer;background:linear-gradient(135deg,var(--accent),var(--accent2));display:grid;place-items:center;transition:transform .3s}
  #conv .cv-sw button svg{width:20px;height:20px}
  #conv .cv-note{font-size:12px;color:var(--muted);margin:14px 4px;text-align:center}
  #conv .cv-all{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
  #conv .cv-all div{padding:10px 12px;border-radius:14px;background:var(--card);border:1px solid var(--cardBorder);font-size:13px;cursor:pointer}
  #conv .cv-all b{display:block;font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  #conv .cv-all span{color:var(--muted);font-size:12px}
  `;
  document.head.appendChild(st);

  // taux ta9ribi (1 USD = ...). Ila kan internet kaytbddlo b taux d lyouma.
  const RATES0 = { USD: 1, MAD: 9.1, EUR: 0.86, GBP: 0.75, SAR: 3.75, AED: 3.6725, CAD: 1.38, CHF: 0.8, TRY: 41, CNY: 7.15, JPY: 148, EGP: 48, DZD: 130, TND: 2.95 };
  const CUR_N = { MAD: "Dirham (MAD)", EUR: "Euro (€)", USD: "Dollar ($)", GBP: "Livre (£)", SAR: "Riyal (SAR)", AED: "Dirham Emirati", CAD: "Dollar CA", CHF: "Franc Suisse", TRY: "Lira Turki", CNY: "Yuan", JPY: "Yen", EGP: "Jneh Masri", DZD: "Dinar DZ", TND: "Dinar TN" };
  let rates = RATES0, rateInfo = "Taux ta9ribi (bla internet)";
  try { const c = JSON.parse(localStorage.getItem("fr_rates")); if (c && c.r) { rates = Object.assign({}, RATES0, c.r); rateInfo = "Taux d " + c.d; } } catch (e) {}
  let fetched = false;
  function fetchRates() {
    if (fetched || !navigator.onLine) return; fetched = true;
    fetch("https://open.er-api.com/v6/latest/USD").then(r => r.json()).then(j => {
      if (!j || !j.rates || !j.rates.MAD) return;
      const r = {}; Object.keys(RATES0).forEach(k => { if (j.rates[k]) r[k] = j.rates[k]; });
      const d = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
      rates = Object.assign({}, RATES0, r); rateInfo = "Taux d " + d;
      try { localStorage.setItem("fr_rates", JSON.stringify({ r, d })); } catch (e) {}
      if (cat === "cur") calc();
    }).catch(() => {});
  }

  const CATS = {
    cur: { n: "3omla", u: () => Object.keys(CUR_N).map(k => [k, CUR_N[k]]), f: "MAD", t: "EUR",
      conv: (v, a, b) => v / rates[a] * rates[b] },
    len: { n: "Toul", u: () => [["mm", "Millimètre"], ["cm", "Centimètre"], ["m", "Mètre"], ["km", "Kilomètre"], ["in", "Inch"], ["ft", "Pied (ft)"], ["yd", "Yard"], ["mi", "Mile"]], f: "m", t: "cm",
      k: { mm: .001, cm: .01, m: 1, km: 1000, in: .0254, ft: .3048, yd: .9144, mi: 1609.344 } },
    wt: { n: "Wazn", u: () => [["mg", "Milligramme"], ["g", "Gramme"], ["kg", "Kilo"], ["t", "Tonne"], ["oz", "Once (oz)"], ["lb", "Livre (lb)"]], f: "kg", t: "g",
      k: { mg: 1e-6, g: .001, kg: 1, t: 1000, oz: .028349523125, lb: .45359237 } },
    tmp: { n: "°C", u: () => [["C", "Celsius °C"], ["F", "Fahrenheit °F"], ["K", "Kelvin K"]], f: "C", t: "F",
      conv: (v, a, b) => { const c = a === "C" ? v : a === "F" ? (v - 32) * 5 / 9 : v - 273.15; return b === "C" ? c : b === "F" ? c * 9 / 5 + 32 : c + 273.15; } }
  };
  Object.values(CATS).forEach(c => { if (!c.conv) c.conv = (v, a, b) => v * c.k[a] / c.k[b]; });

  let cat = "cur", val = "100";
  const sel = {}; Object.keys(CATS).forEach(k => sel[k] = [CATS[k].f, CATS[k].t]);
  const root = () => document.getElementById(ID);
  const nice = x => { if (!isFinite(x)) return "—"; const a = Math.abs(x); if (a !== 0 && (a < 1e-6 || a >= 1e12)) return x.toExponential(4); return (+x.toPrecision(10)).toLocaleString("fr-FR", { maximumFractionDigits: a < 1 ? 8 : 4 }); };
  const num = () => parseFloat(String(val).replace(",", ".").replace(/\s/g, ""));
  const SW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"/></svg>';

  function render() {
    const C = CATS[cat], U = C.u(), [a, b] = sel[cat];
    const opts = s => U.map(([k, n]) => `<option value="${k}"${k === s ? " selected" : ""}>${n}</option>`).join("");
    root().innerHTML = `<div class="cv">
      <div class="cv-h"><h2>Mo7awwil</h2></div>
      <div class="cv-tabs">${Object.keys(CATS).map(k => `<button data-c="${k}" class="${k === cat ? "on" : ""}">${CATS[k].n}</button>`).join("")}</div>
      <div class="cv-box"><small>MN</small><div class="cv-row"><input id="cvV" inputmode="decimal" value="${val}"><select id="cvA">${opts(a)}</select></div></div>
      <div class="cv-sw"><button id="cvS" aria-label="Bddel">${SW}</button></div>
      <div class="cv-box"><small>L</small><div class="cv-row"><output id="cvR"></output><select id="cvB">${opts(b)}</select></div></div>
      <div class="cv-note" id="cvN"></div>
      <div class="cv-all" id="cvAll"></div>
    </div>`;
    const r = root();
    r.querySelectorAll(".cv-tabs button").forEach(x => x.onclick = () => { cat = x.dataset.c; if (cat === "tmp" && val === "100") val = "25"; render(); });
    r.querySelector("#cvV").oninput = e => { val = e.target.value; calc(); };
    r.querySelector("#cvA").onchange = e => { sel[cat][0] = e.target.value; calc(); };
    r.querySelector("#cvB").onchange = e => { sel[cat][1] = e.target.value; calc(); };
    r.querySelector("#cvS").onclick = e => { sel[cat].reverse(); const btn = e.currentTarget; render(); const nb = root().querySelector("#cvS"); nb.style.transform = "rotate(180deg)"; };
    calc();
    if (cat === "cur") fetchRates();
  }
  function calc() {
    const r = root(); if (!r.querySelector("#cvR")) return;
    const C = CATS[cat], [a, b] = sel[cat], v = num();
    r.querySelector("#cvR").textContent = isNaN(v) ? "—" : nice(C.conv(v, a, b));
    r.querySelector("#cvN").textContent = cat === "cur" ? `1 ${a} = ${nice(C.conv(1, a, b))} ${b} · ${rateInfo}` : "";
    r.querySelector("#cvAll").innerHTML = isNaN(v) ? "" : C.u().filter(([k]) => k !== a).map(([k, n]) => `<div data-k="${k}"><b>${nice(C.conv(v, a, k))}</b><span>${n}</span></div>`).join("");
    r.querySelectorAll("#cvAll div").forEach(d => d.onclick = () => { sel[cat][1] = d.dataset.k; render(); });
  }

  const baseShow = window.show;
  window.show = function (id) { baseShow(id); if (id === ID) render(); };
})();
