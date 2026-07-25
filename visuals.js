/* Pelukis gambar soalan — SVG (port daripada VisualView di Screens.kt) */

const BAR_COLORS = ["#7B4FD6", "#FB8C00", "#43A047", "#039BE5"];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const rad = (deg) => (deg * Math.PI) / 180;

function clockSvg(h, m) {
  const S = 170, c = S / 2, r = S / 2 - 4;
  let ticks = "";
  for (let i = 1; i <= 12; i++) {
    const a = rad(i * 30 - 90);
    const tx = c + (r - 20) * Math.cos(a);
    const ty = c + (r - 20) * Math.sin(a);
    ticks += `<text x="${tx.toFixed(1)}" y="${(ty + 6).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="#555">${i}</text>`;
  }
  const hA = rad((h % 12) * 30 + m * 0.5 - 90);
  const mA = rad(m * 6 - 90);
  return `<svg class="vis" viewBox="0 0 ${S} ${S}" width="180" height="180" role="img" aria-label="Muka jam">
    <circle cx="${c}" cy="${c}" r="${r}" fill="#FFF8E1" stroke="#333" stroke-width="4"/>
    ${ticks}
    <line x1="${c}" y1="${c}" x2="${(c + r * 0.45 * Math.cos(hA)).toFixed(1)}" y2="${(c + r * 0.45 * Math.sin(hA)).toFixed(1)}" stroke="#333" stroke-width="6" stroke-linecap="round"/>
    <line x1="${c}" y1="${c}" x2="${(c + r * 0.7 * Math.cos(mA)).toFixed(1)}" y2="${(c + r * 0.7 * Math.sin(mA)).toFixed(1)}" stroke="#E53935" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${c}" cy="${c}" r="5" fill="#333"/>
  </svg>`;
}

function pieSvg(parts, shaded) {
  const S = 150, c = S / 2, r = S / 2 - 4;
  const sweep = 360 / parts;
  let out = "";
  for (let i = 0; i < parts; i++) {
    const a0 = rad(-90 + i * sweep);
    const a1 = rad(-90 + (i + 1) * sweep);
    const x0 = c + r * Math.cos(a0), y0 = c + r * Math.sin(a0);
    const x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1);
    const large = sweep > 180 ? 1 : 0;
    const d =
      parts === 1
        ? `M ${c} ${c - r} A ${r} ${r} 0 1 1 ${c - 0.01} ${c - r} Z`
        : `M ${c} ${c} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
    out += `<path d="${d}" fill="${i < shaded ? "#7B4FD6" : "#FFFFFF"}" stroke="#333" stroke-width="2.5"/>`;
  }
  return `<svg class="vis" viewBox="0 0 ${S} ${S}" width="160" height="160" role="img" aria-label="Rajah pecahan">${out}</svg>`;
}

function shapeSvg(sides) {
  const S = 150, c = S / 2;
  if (sides === 0) {
    return `<svg class="vis" viewBox="0 0 ${S} ${S}" width="160" height="160" role="img" aria-label="Bentuk">
      <circle cx="${c}" cy="${c}" r="${c - 6}" fill="#64B5F6" stroke="#333" stroke-width="3"/></svg>`;
  }
  if (sides === -4) {
    const w = S * 0.85, hh = S * 0.5;
    return `<svg class="vis" viewBox="0 0 ${S} ${S}" width="160" height="160" role="img" aria-label="Bentuk">
      <rect x="${(S - w) / 2}" y="${(S - hh) / 2}" width="${w}" height="${hh}" fill="#64B5F6" stroke="#333" stroke-width="3"/></svg>`;
  }
  const r = c - 8;
  const startDeg = -90 + (sides % 2 === 0 ? 180 / sides : 0);
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const a = rad(startDeg + (360 * i) / sides);
    pts.push(`${(c + r * Math.cos(a)).toFixed(2)},${(c + r * Math.sin(a)).toFixed(2)}`);
  }
  return `<svg class="vis" viewBox="0 0 ${S} ${S}" width="160" height="160" role="img" aria-label="Bentuk">
    <polygon points="${pts.join(" ")}" fill="#64B5F6" stroke="#333" stroke-width="3"/></svg>`;
}

function barsSvg(labels, values) {
  const maxV = Math.max(1, ...values);
  const cols = labels
    .map((lb, i) => {
      const hpx = Math.round((110 * values[i]) / maxV);
      return `<div class="bar-col">
        <span class="bar-val">${esc(values[i])}</span>
        <div class="bar" style="height:${hpx}px;background:${BAR_COLORS[i % BAR_COLORS.length]}"></div>
        <span class="bar-lbl">${esc(lb)}</span>
      </div>`;
    })
    .join("");
  return `<div class="bars">${cols}</div>`;
}

function coordSvg(px, py, maxN) {
  const S = 210, pad = 26;
  const w = S - pad * 2;
  const cell = w / maxN;
  const oy = S - pad;
  let grid = "";
  for (let i = 0; i <= maxN; i++) {
    const x = pad + i * cell;
    const y = oy - i * cell;
    grid += `<line x1="${x.toFixed(1)}" y1="${pad}" x2="${x.toFixed(1)}" y2="${oy}" stroke="#DDD" stroke-width="1"/>`;
    grid += `<line x1="${pad}" y1="${y.toFixed(1)}" x2="${S - pad}" y2="${y.toFixed(1)}" stroke="#DDD" stroke-width="1"/>`;
  }
  let labels = "";
  for (let i = 0; i <= maxN; i += 2) {
    labels += `<text x="${(pad + i * cell).toFixed(1)}" y="${oy + 14}" font-size="10" fill="#555" text-anchor="middle">${i}</text>`;
    labels += `<text x="${pad - 8}" y="${(oy - i * cell + 4).toFixed(1)}" font-size="10" fill="#555" text-anchor="middle">${i}</text>`;
  }
  const ptx = pad + px * cell;
  const pty = oy - py * cell;
  return `<svg class="vis" viewBox="0 0 ${S} ${S}" width="215" height="215" role="img" aria-label="Satah koordinat">
    ${grid}
    <line x1="${pad}" y1="${oy}" x2="${S - pad}" y2="${oy}" stroke="#333" stroke-width="2.5"/>
    <line x1="${pad}" y1="${oy}" x2="${pad}" y2="${pad}" stroke="#333" stroke-width="2.5"/>
    ${labels}
    <circle cx="${ptx.toFixed(1)}" cy="${pty.toFixed(1)}" r="5" fill="#E53935"/>
    <text x="${(ptx + 9).toFixed(1)}" y="${(pty - 7).toFixed(1)}" font-size="14" font-weight="700" fill="#E53935">P</text>
  </svg>`;
}

function coinsHtml(sen) {
  return `<div class="coins">${sen
    .map((c) =>
      c >= 100
        ? `<span class="note ${c >= 500 ? "note5" : "note1"}">RM${Math.trunc(c / 100)}</span>`
        : `<span class="coin">${c} sen</span>`
    )
    .join("")}</div>`;
}

function emojisHtml(rows) {
  return `<div class="emojis">${rows.map((r) => `<div>${esc(r)}</div>`).join("")}</div>`;
}

export function renderVisual(v) {
  if (!v) return "";
  switch (v.t) {
    case "clock": return clockSvg(v.hour, v.minute);
    case "pie": return pieSvg(v.parts, v.shaded);
    case "shape": return shapeSvg(v.sides);
    case "bars": return barsSvg(v.labels, v.values);
    case "coord": return coordSvg(v.x, v.y, v.maxN);
    case "coins": return coinsHtml(v.sen);
    case "emojis": return emojisHtml(v.rows);
    default: return "";
  }
}

export { esc };
