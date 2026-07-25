/* Matematik Ceria — pustaka grafik SVG.
 *
 * Semua lukisan dijana sebagai SVG sebaris: tiada fail imej, tiada muat turun,
 * dan semuanya tajam pada skrin bersaiz apa pun. Setiap fungsi memulangkan
 * rentetan SVG supaya boleh terus disisipkan ke dalam HTML.
 */

/* ---------- Palet ---------- */

export const WARNA_TAHUN = {
  1: { a: "#FF5F6D", b: "#FF9E6D", nama: "merah" },
  2: { a: "#FF9A1F", b: "#FFD166", nama: "oren" },
  3: { a: "#12B76A", b: "#6EE7A8", nama: "hijau" },
  4: { a: "#00B5D8", b: "#67E8F9", nama: "biru laut" },
  5: { a: "#4C6FFF", b: "#93B0FF", nama: "biru" },
  6: { a: "#A855F7", b: "#E879F9", nama: "ungu" }
};

const WARNA_TOPIK = {
  NOMBOR: "#4C6FFF", TAMBAH: "#12B76A", TOLAK: "#FF9A1F", DARAB: "#A855F7",
  BAHAGI: "#00B5D8", OPERASI: "#EC4899", PECAHAN: "#F97316", PERPULUHAN: "#0EA5E9",
  PERATUS: "#EF4444", WANG: "#16A34A", MASA: "#8B5CF6", UKURAN: "#D97706",
  RUANG: "#06B6D4", KOORDINAT: "#3B82F6", NISBAH: "#DB2777", DATA: "#7C3AED"
};

export const warnaTopik = (kind) => WARNA_TOPIK[kind] || "#4C6FFF";

const svg = (inner, kelas = "", vb = "0 0 100 100") =>
  `<svg class="art ${kelas}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${inner}</svg>`;

/* Mata yang sama bagi semua maskot — inilah yang membuatkannya nampak comel. */
const mata = (x, y, r = 7) => `
  <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.1}" fill="#2B2B36"/>
  <circle cx="${x + r * 0.34}" cy="${y - r * 0.4}" r="${r * 0.34}" fill="#fff"/>
  <circle cx="${x - r * 0.3}" cy="${y + r * 0.35}" r="${r * 0.17}" fill="#fff" opacity=".7"/>`;

const pipi = (x, y, w = 7, warna = "#FF8FA3") =>
  `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * 0.62}" fill="${warna}" opacity=".45"/>`;

const senyum = (d, warna = "#2B2B36", tebal = 3) =>
  `<path d="${d}" fill="none" stroke="${warna}" stroke-width="${tebal}" stroke-linecap="round"/>`;

/* ---------- Maskot ---------- */

const MASKOT = {
  budak: () => `
    <circle cx="50" cy="86" r="26" fill="#5B8DEF"/>
    <circle cx="50" cy="52" r="30" fill="#FFC896"/>
    <path d="M20 46a30 30 0 0 1 60 0c0-6-8-22-30-22S20 40 20 46Z" fill="#5A3A29"/>
    <path d="M22 50c-4 0-6 4-4 8s7 4 8 1Z" fill="#FFC896"/>
    <path d="M78 50c4 0 6 4 4 8s-7 4-8 1Z" fill="#FFC896"/>
    ${mata(40, 54)}${mata(60, 54)}
    ${pipi(31, 65)}${pipi(69, 65)}
    ${senyum("M42 68q8 8 16 0")}`,

  kucing: () => `
    <path d="M24 34 26 12l19 12Z" fill="#FF9F45"/>
    <path d="M76 34 74 12 55 24Z" fill="#FF9F45"/>
    <path d="M28 30 29 19l10 7Z" fill="#FFC9A3"/>
    <path d="M72 30 71 19l-10 7Z" fill="#FFC9A3"/>
    <circle cx="50" cy="56" r="32" fill="#FFB05C"/>
    <ellipse cx="50" cy="68" rx="19" ry="14" fill="#FFF1E0"/>
    ${mata(38, 52)}${mata(62, 52)}
    <path d="M50 62 45 67h10Z" fill="#FF6B8A"/>
    ${senyum("M50 67v4M50 71q-5 5-9 1M50 71q5 5 9 1", "#B4642A", 2.4)}
    <g stroke="#E08C3C" stroke-width="2" stroke-linecap="round">
      <path d="M28 62 14 58M28 68 15 69M72 62 86 58M72 68 85 69"/>
    </g>
    ${pipi(28, 64, 6)}${pipi(72, 64, 6)}`,

  arnab: () => `
    <ellipse cx="36" cy="24" rx="9" ry="24" fill="#F7F3F0"/>
    <ellipse cx="64" cy="24" rx="9" ry="24" fill="#F7F3F0"/>
    <ellipse cx="36" cy="26" rx="4.5" ry="17" fill="#FFB3C6"/>
    <ellipse cx="64" cy="26" rx="4.5" ry="17" fill="#FFB3C6"/>
    <circle cx="50" cy="62" r="30" fill="#FDFBFA"/>
    ${mata(39, 58)}${mata(61, 58)}
    <path d="M50 66 45 71h10Z" fill="#FF7EA0"/>
    <path d="M50 71v5" stroke="#C9A9A0" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="45" y="76" width="4.4" height="8" rx="1.6" fill="#fff" stroke="#E4D7D2" stroke-width="1"/>
    <rect x="50.6" y="76" width="4.4" height="8" rx="1.6" fill="#fff" stroke="#E4D7D2" stroke-width="1"/>
    ${pipi(30, 68)}${pipi(70, 68)}`,

  panda: () => `
    <circle cx="24" cy="30" r="13" fill="#2B2B36"/>
    <circle cx="76" cy="30" r="13" fill="#2B2B36"/>
    <circle cx="50" cy="56" r="32" fill="#FFFDF8"/>
    <ellipse cx="37" cy="53" rx="11" ry="13" fill="#2B2B36" transform="rotate(-16 37 53)"/>
    <ellipse cx="63" cy="53" rx="11" ry="13" fill="#2B2B36" transform="rotate(16 63 53)"/>
    ${mata(37, 54, 5.4)}${mata(63, 54, 5.4)}
    <ellipse cx="50" cy="68" rx="6" ry="4.4" fill="#2B2B36"/>
    ${senyum("M50 73q-6 7-11 2M50 73q6 7 11 2", "#2B2B36", 2.6)}
    ${pipi(26, 64)}${pipi(74, 64)}`,

  singa: () => `
    <g fill="#E07B18">
      <circle cx="50" cy="12" r="14"/><circle cx="77" cy="21" r="14"/>
      <circle cx="88" cy="46" r="14"/><circle cx="88" cy="72" r="14"/>
      <circle cx="66" cy="88" r="14"/><circle cx="34" cy="88" r="14"/>
      <circle cx="12" cy="72" r="14"/><circle cx="12" cy="46" r="14"/>
      <circle cx="23" cy="21" r="14"/>
    </g>
    <g fill="#F5A23C">
      <circle cx="50" cy="20" r="11"/><circle cx="80" cy="50" r="11"/>
      <circle cx="50" cy="80" r="11"/><circle cx="20" cy="50" r="11"/>
    </g>
    <circle cx="50" cy="50" r="29" fill="#FFC46B"/>
    <ellipse cx="50" cy="62" rx="19" ry="14" fill="#FFEBC7"/>
    ${mata(39, 46)}${mata(61, 46)}
    <path d="M50 57 44 63h12Z" fill="#8C4A2F"/>
    ${senyum("M50 63v4M50 67q-6 6-10 1M50 67q6 6 10 1", "#8C4A2F", 2.6)}
    ${pipi(31, 58, 6)}${pipi(69, 58, 6)}`,

  robot: () => `
    <path d="M50 14V4" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="6" r="6" fill="#F43F5E" class="mc-kelip"/>
    <rect x="10" y="44" width="9" height="22" rx="4.5" fill="#94A3B8"/>
    <rect x="81" y="44" width="9" height="22" rx="4.5" fill="#94A3B8"/>
    <rect x="18" y="20" width="64" height="66" rx="20" fill="#CBD5E1"/>
    <rect x="26" y="30" width="48" height="34" rx="14" fill="#1E293B"/>
    <circle cx="40" cy="46" r="7" fill="#22D3EE"/>
    <circle cx="60" cy="46" r="7" fill="#22D3EE"/>
    <circle cx="42" cy="43.5" r="2.4" fill="#fff"/>
    <circle cx="62" cy="43.5" r="2.4" fill="#fff"/>
    <rect x="36" y="70" width="28" height="7" rx="3.5" fill="#94A3B8"/>
    <g fill="#64748B"><rect x="42" y="70" width="3" height="7"/><rect x="55" y="70" width="3" height="7"/></g>`,

  dino: () => `
    <g fill="#16A34A">
      <path d="M30 30 24 14l14 8Z"/><path d="M48 22 44 6l14 10Z"/><path d="M66 28 66 10l12 14Z"/>
    </g>
    <circle cx="50" cy="56" r="31" fill="#22C55E"/>
    <ellipse cx="66" cy="66" rx="22" ry="16" fill="#4ADE80"/>
    ${mata(42, 48)}${mata(64, 46)}
    <ellipse cx="80" cy="62" rx="3" ry="2.2" fill="#15803D"/>
    <ellipse cx="80" cy="70" rx="3" ry="2.2" fill="#15803D"/>
    ${senyum("M50 74q10 6 22 0", "#15803D", 3)}
    ${pipi(34, 64, 6, "#FCA5A5")}`,

  unikorn: () => `
    <path d="M50 6 58 34H42Z" fill="#FFD166"/>
    <g stroke="#F2A93B" stroke-width="2.2" fill="none" stroke-linecap="round">
      <path d="M45 30h10M46 24h8M47.5 18h5"/>
    </g>
    <path d="M22 34c-8 8-6 24 2 32 4-10 10-14 10-14s-4-12-12-18Z" fill="#FF8FA3"/>
    <path d="M78 34c8 8 6 24-2 32-4-10-10-14-10-14s4-12 12-18Z" fill="#7DD3FC"/>
    <path d="M74 38c6 8 5 20-1 27-3-8-7-11-7-11s3-10 8-16Z" fill="#C4B5FD"/>
    <circle cx="50" cy="58" r="30" fill="#FFFBFD"/>
    ${mata(39, 54, 6)}${mata(61, 54, 6)}
    <g stroke="#2B2B36" stroke-width="2" stroke-linecap="round">
      <path d="M33 45q6-4 12-1M55 44q6-3 12 1"/>
    </g>
    <ellipse cx="50" cy="70" rx="9" ry="6.5" fill="#FFE3EC"/>
    <ellipse cx="46.5" cy="69" rx="1.8" ry="2.4" fill="#E9A6BC"/>
    <ellipse cx="53.5" cy="69" rx="1.8" ry="2.4" fill="#E9A6BC"/>
    ${pipi(29, 64)}${pipi(71, 64)}`,

  naga: () => `
    <path d="M30 26 22 8l16 10Z" fill="#DC2626"/>
    <path d="M70 26 78 8 62 18Z" fill="#DC2626"/>
    <g fill="#16A34A">
      <path d="M44 20 50 4l6 16Z"/>
    </g>
    <circle cx="50" cy="54" r="31" fill="#15A34A"/>
    <path d="M20 54a30 30 0 0 0 60 0c0 8-14 16-30 16S20 62 20 54Z" fill="#22C55E" opacity=".55"/>
    <ellipse cx="50" cy="72" rx="21" ry="15" fill="#86EFAC"/>
    ${mata(38, 48)}${mata(62, 48)}
    <ellipse cx="43" cy="68" rx="3" ry="2.4" fill="#166534"/>
    <ellipse cx="57" cy="68" rx="3" ry="2.4" fill="#166534"/>
    ${senyum("M38 77q12 8 24 0", "#166534", 3)}
    <path d="M46 84q4 8 8 0" fill="#F97316"/>
    ${pipi(28, 62, 6, "#F87171")}${pipi(72, 62, 6, "#F87171")}`
};

/** Lukis maskot. `hidup` menambah animasi berayun lembut. */
export function maskot(id, hidup = true) {
  const f = MASKOT[id] || MASKOT.budak;
  return svg(f(), "maskot" + (hidup ? " mc-ayun" : ""));
}

/* ---------- Ikon topik ---------- */

const IKON = {
  NOMBOR: (c) => `
    <rect x="10" y="26" width="24" height="24" rx="7" fill="${c}"/>
    <rect x="38" y="26" width="24" height="24" rx="7" fill="${c}" opacity=".7"/>
    <rect x="66" y="26" width="24" height="24" rx="7" fill="${c}" opacity=".45"/>
    <text x="22" y="44" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">1</text>
    <text x="50" y="44" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">2</text>
    <text x="78" y="44" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">3</text>
    <rect x="10" y="58" width="80" height="10" rx="5" fill="${c}" opacity=".25"/>
    <rect x="10" y="74" width="52" height="10" rx="5" fill="${c}" opacity=".25"/>`,

  TAMBAH: (c) => `<circle cx="50" cy="50" r="38" fill="${c}"/>
    <path d="M50 28v44M28 50h44" stroke="#fff" stroke-width="11" stroke-linecap="round"/>`,

  TOLAK: (c) => `<circle cx="50" cy="50" r="38" fill="${c}"/>
    <path d="M28 50h44" stroke="#fff" stroke-width="11" stroke-linecap="round"/>`,

  DARAB: (c) => `<circle cx="50" cy="50" r="38" fill="${c}"/>
    <path d="M35 35 65 65M65 35 35 65" stroke="#fff" stroke-width="11" stroke-linecap="round"/>`,

  BAHAGI: (c) => `<circle cx="50" cy="50" r="38" fill="${c}"/>
    <path d="M28 50h44" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
    <circle cx="50" cy="33" r="6.5" fill="#fff"/><circle cx="50" cy="67" r="6.5" fill="#fff"/>`,

  OPERASI: (c) => `
    <rect x="18" y="12" width="64" height="76" rx="12" fill="${c}"/>
    <rect x="26" y="20" width="48" height="18" rx="6" fill="#fff" opacity=".9"/>
    <g fill="#fff">
      <circle cx="35" cy="52" r="6"/><circle cx="50" cy="52" r="6"/><circle cx="65" cy="52" r="6"/>
      <circle cx="35" cy="70" r="6"/><circle cx="50" cy="70" r="6"/><circle cx="65" cy="70" r="6"/>
    </g>`,

  PECAHAN: (c) => `
    <circle cx="50" cy="50" r="38" fill="#fff" stroke="${c}" stroke-width="5"/>
    <path d="M50 50 50 12A38 38 0 0 1 88 50Z" fill="${c}"/>
    <path d="M50 50 88 50A38 38 0 0 1 50 88Z" fill="${c}" opacity=".45"/>
    <path d="M50 12v76M12 50h76" stroke="${c}" stroke-width="4"/>`,

  PERPULUHAN: (c) => `
    <text x="50" y="62" font-size="40" font-weight="800" fill="${c}" text-anchor="middle">0.5</text>
    <circle cx="50" cy="80" r="6" fill="${c}" class="mc-denyut"/>`,

  PERATUS: (c) => `<circle cx="50" cy="50" r="38" fill="${c}"/>
    <circle cx="36" cy="36" r="9" fill="none" stroke="#fff" stroke-width="7"/>
    <circle cx="64" cy="64" r="9" fill="none" stroke="#fff" stroke-width="7"/>
    <path d="M68 30 32 70" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`,

  WANG: (c) => `
    <rect x="8" y="30" width="72" height="42" rx="8" fill="${c}" opacity=".35"/>
    <circle cx="66" cy="58" r="28" fill="#FFD166" stroke="${c}" stroke-width="4"/>
    <text x="66" y="70" font-size="28" font-weight="800" fill="${c}" text-anchor="middle">RM</text>`,

  MASA: (c) => `
    <circle cx="50" cy="50" r="38" fill="#fff" stroke="${c}" stroke-width="6"/>
    <g stroke="${c}" stroke-width="4" stroke-linecap="round">
      <path d="M50 20v6M80 50h-6M50 80v-6M20 50h6"/>
    </g>
    <g class="mc-putar" style="transform-origin:50px 50px">
      <path d="M50 50V28" stroke="${c}" stroke-width="5" stroke-linecap="round"/>
    </g>
    <path d="M50 50h20" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".55"/>
    <circle cx="50" cy="50" r="5" fill="${c}"/>`,

  UKURAN: (c) => `
    <rect x="6" y="34" width="88" height="32" rx="7" fill="${c}"/>
    <g stroke="#fff" stroke-width="4" stroke-linecap="round">
      <path d="M20 34v14M34 34v9M48 34v14M62 34v9M76 34v14"/>
    </g>`,

  RUANG: (c) => `
    <rect x="8" y="46" width="38" height="38" rx="7" fill="${c}"/>
    <path d="M70 12 94 54H46Z" fill="${c}" opacity=".55"/>
    <circle cx="30" cy="26" r="16" fill="${c}" opacity=".3"/>`,

  KOORDINAT: (c) => `
    <g stroke="${c}" stroke-width="2.5" opacity=".3">
      <path d="M28 12v76M50 12v76M72 12v76M12 28h76M12 50h76M12 72h76"/>
    </g>
    <path d="M12 88V12M12 88h76" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="72" cy="28" r="9" fill="${c}" class="mc-denyut"/>`,

  NISBAH: (c) => `
    <path d="M50 14v66M26 84h48" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <path d="M18 34h64" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
    <path d="M18 34 8 56h20Z" fill="${c}"/>
    <path d="M82 34 72 56h20Z" fill="${c}" opacity=".55"/>
    <circle cx="50" cy="20" r="7" fill="${c}"/>`,

  DATA: (c) => `
    <path d="M12 88V12M12 88h76" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
    <g fill="${c}">
      <rect x="24" y="54" width="14" height="30" rx="4"/>
      <rect x="44" y="34" width="14" height="50" rx="4" opacity=".75"/>
      <rect x="64" y="44" width="14" height="40" rx="4" opacity=".5"/>
    </g>`
};

export function ikonTopik(kind, kelas = "") {
  const c = warnaTopik(kind);
  const f = IKON[kind] || IKON.NOMBOR;
  return svg(f(c), "ikon " + kelas);
}

/** Ikon kunci untuk topik yang belum dibuka. */
export const ikonKunci = () => svg(`
  <rect x="24" y="44" width="52" height="42" rx="11" fill="#94A3B8"/>
  <path d="M34 44V32a16 16 0 0 1 32 0v12" fill="none" stroke="#94A3B8" stroke-width="9"/>
  <circle cx="50" cy="62" r="7" fill="#F1F5F9"/>
  <rect x="47" y="62" width="6" height="13" rx="3" fill="#F1F5F9"/>`, "ikon");

/* ---------- Lencana ---------- */

const GLIF = {
  first_quiz: (c) => `<circle cx="50" cy="50" r="19" fill="none" stroke="${c}" stroke-width="6"/>
    <circle cx="50" cy="50" r="8" fill="${c}"/>`,
  quiz_10: (c) => `<rect x="28" y="34" width="14" height="34" rx="3" fill="${c}"/>
    <rect x="44" y="30" width="14" height="38" rx="3" fill="${c}" opacity=".7"/>
    <rect x="60" y="38" width="12" height="30" rx="3" fill="${c}" opacity=".45"/>`,
  quiz_50: (c) => `<path d="M36 28h28v14a14 14 0 0 1-28 0Z" fill="${c}"/>
    <path d="M36 32H28a8 8 0 0 0 8 8M64 32h8a8 8 0 0 1-8 8" fill="none" stroke="${c}" stroke-width="4"/>
    <rect x="44" y="56" width="12" height="10" fill="${c}"/><rect x="36" y="66" width="28" height="6" rx="3" fill="${c}"/>`,
  perfect: (c) => `<text x="50" y="62" font-size="30" font-weight="800" fill="${c}" text-anchor="middle">100</text>`,
  perfect_10: (c) => `<path d="M50 26 57 44l19 1-15 12 5 19-16-11-16 11 5-19-15-12 19-1Z" fill="${c}"/>`,
  streak_3: (c) => `
    <path d="M50 22c3 10 9 13 13 21a16 16 0 0 1-13 25 16 16 0 0 1-13-25c3-5 6-6 8-11 2 4 3 6 5 7 0-6-1-11 0-17Z" fill="${c}"/>
    <path d="M50 48c2 5 6 7 6 12a6 6 0 0 1-12 0c0-4 4-7 6-12Z" fill="#FFD166"/>`,
  streak_7: (c) => `<path d="M56 22 34 54h12l-6 26 22-34H50Z" fill="${c}"/>`,
  stars_50: (c) => `<path d="M50 28 55 44l16 6-16 6-5 16-5-16-16-6 16-6Z" fill="${c}"/>
    <circle cx="72" cy="34" r="4" fill="${c}"/><circle cx="30" cy="66" r="3" fill="${c}"/>`,
  stars_150: (c) => `<path d="M28 62 24 34l14 10 12-16 12 16 14-10-4 28Z" fill="${c}"/>
    <rect x="28" y="64" width="44" height="8" rx="4" fill="${c}"/>`,
  challenge_10: (c) => `
    <path d="M50 20c9 9 13 21 13 33v9H37v-9c0-12 4-24 13-33Z" fill="${c}"/>
    <circle cx="50" cy="42" r="6" fill="#fff"/>
    <path d="M37 48 27 62v8l10-6ZM63 48l10 14v8l-10-6Z" fill="${c}" opacity=".65"/>
    <path d="M44 62h12l-6 14Z" fill="#FF8A3D"/>`,
  challenge_20: (c) => `
    <path d="M26 56h48l-8 10H34Z" fill="${c}" opacity=".55"/>
    <ellipse cx="50" cy="54" rx="30" ry="8" fill="${c}"/>
    <path d="M34 50a16 16 0 0 1 32 0Z" fill="#fff" stroke="${c}" stroke-width="3"/>
    <circle cx="36" cy="70" r="3.5" fill="${c}"/>
    <circle cx="50" cy="74" r="3.5" fill="${c}" opacity=".7"/>
    <circle cx="64" cy="70" r="3.5" fill="${c}"/>`,
  hard_master: (c) => `<path d="M38 30a12 12 0 0 1 24 0 12 12 0 0 1 8 20 12 12 0 0 1-14 18 12 12 0 0 1-12 0 12 12 0 0 1-14-18 12 12 0 0 1 8-20Z" fill="${c}"/>
    <path d="M50 32v34M40 42h20M42 56h16" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`
};

/** Lencana bentuk pingat. `dapat=false` memaparkannya kelabu dan pudar. */
export function lencana(id, dapat = true) {
  const c = dapat ? "#B45309" : "#94A3B8";
  const luar = dapat ? "#FFD166" : "#E2E8F0";
  const dalam = dapat ? "#FFF3D6" : "#F1F5F9";
  const g = (GLIF[id] || GLIF.first_quiz)(c);
  return svg(`
    <path d="M34 12h32l-6 20H40Z" fill="${dapat ? "#F97316" : "#CBD5E1"}"/>
    <circle cx="50" cy="54" r="38" fill="${luar}"/>
    <circle cx="50" cy="54" r="30" fill="${dalam}"/>
    ${g}
    ${dapat ? '<path d="M20 40a38 38 0 0 1 24-26" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".55"/>' : ""}
  `, "lencana" + (dapat ? " mc-kilau" : " pudar"));
}

/* ---------- Bintang ---------- */

const D_BINTANG = "M50 8 62 38l32 2-25 21 8 31-27-17-27 17 8-31L6 40l32-2Z";

export function bintang(penuh, kelas = "") {
  // Bintang kosong guna kelabu, bukan putih lut sinar: kad topik berlatar putih,
  // jadi bintang putih akan hilang terus daripada pandangan.
  return svg(
    penuh
      ? `<path d="${D_BINTANG}" fill="#FFC93C" stroke="#F0A500" stroke-width="4" stroke-linejoin="round"/>`
      : `<path d="${D_BINTANG}" fill="#E2E6F3" stroke="#BFC6DD" stroke-width="4" stroke-linejoin="round"/>`,
    "bintang " + kelas
  );
}

/** Barisan 3 bintang. Yang penuh muncul satu demi satu bila `animasi` benar. */
export function barisBintang(n, animasi = false) {
  let out = "";
  for (let i = 0; i < 3; i++) {
    const penuh = i < n;
    const kelas = penuh && animasi ? "mc-pop" : "";
    const gaya = penuh && animasi ? ` style="animation-delay:${0.15 + i * 0.22}s"` : "";
    out += `<span class="bintang-kotak"${gaya}>${bintang(penuh, kelas)}</span>`;
  }
  return `<span class="baris-bintang">${out}</span>`;
}

/* ---------- Ikon antara muka ---------- */

export const ICON = {
  belajar: (c = "#fff") => svg(`
    <path d="M14 24h28a10 10 0 0 1 8 5 10 10 0 0 1 8-5h28v50H58a10 10 0 0 0-8 5 10 10 0 0 0-8-5H14Z" fill="${c}"/>
    <path d="M50 29v50" stroke="rgba(0,0,0,.18)" stroke-width="3"/>`, "ui"),
  cabaran: (c = "#fff") => svg(`<path d="M56 8 26 56h18l-6 36 32-50H50Z" fill="${c}"/>`, "ui"),
  lencanaUi: (c = "#fff") => svg(`
    <circle cx="50" cy="58" r="28" fill="${c}"/>
    <path d="M36 12h28l-7 22H43Z" fill="${c}" opacity=".75"/>
    <circle cx="50" cy="58" r="14" fill="rgba(0,0,0,.15)"/>`, "ui"),
  kedai: (c = "#fff") => svg(`
    <path d="M18 30h64l-6 54H24Z" fill="${c}"/>
    <path d="M36 38V26a14 14 0 0 1 28 0v12" fill="none" stroke="${c}" stroke-width="7"/>`, "ui"),
  kunciUi: (c = "#fff") => svg(`
    <circle cx="42" cy="44" r="20" fill="none" stroke="${c}" stroke-width="9"/>
    <path d="M56 58 84 86M72 74l10-10" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`, "ui"),
  orang: (c = "#fff") => svg(`
    <circle cx="50" cy="34" r="18" fill="${c}"/>
    <path d="M16 88a34 34 0 0 1 68 0Z" fill="${c}"/>`, "ui"),
  api: (c = "#FF7A45") => svg(`
    <path d="M50 10c14 18 22 26 22 40a22 22 0 0 1-44 0c0-8 4-14 8-19 3 5 6 8 8 8 0-11 0-19 6-29Z" fill="${c}"/>`, "ui"),
  jam: (c = "#fff") => svg(`
    <circle cx="50" cy="50" r="36" fill="none" stroke="${c}" stroke-width="8"/>
    <path d="M50 28v24l16 10" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>`, "ui"),
  kembali: (c = "#fff") => svg(`
    <path d="M62 20 32 50l30 30" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`, "ui"),
  tutup: (c = "#fff") => svg(`
    <path d="M28 28 72 72M72 28 28 72" stroke="${c}" stroke-width="11" stroke-linecap="round"/>`, "ui"),
  betul: (c = "#fff") => svg(`
    <path class="mc-lukis" d="M24 52 42 70 78 32" fill="none" stroke="${c}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`, "ui"),
  salah: (c = "#fff") => svg(`
    <path d="M30 30 70 70M70 30 30 70" stroke="${c}" stroke-width="11" stroke-linecap="round"/>`, "ui"),
  ulang: (c = "#fff") => svg(`
    <path d="M78 50a28 28 0 1 1-9-20" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>
    <path d="M72 8v24H48" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`, "ui"),
  peta: (c = "#fff") => svg(`
    <path d="M12 24 36 14v62L12 86Zm24-10 28 10v62l-28-10Zm28 10 24-10v62l-24 10Z" fill="${c}"/>`, "ui"),
  rumah: (c = "#fff") => svg(`
    <path d="M50 12 88 46v42H60V62H40v26H12V46Z" fill="${c}"/>`, "ui"),
  simpan: (c = "#fff") => svg(`
    <path d="M20 16h50l14 14v54H20Z" fill="${c}"/>
    <rect x="34" y="16" width="26" height="22" rx="3" fill="rgba(0,0,0,.25)"/>
    <rect x="32" y="54" width="36" height="30" rx="3" fill="rgba(0,0,0,.18)"/>`, "ui"),
  keluar: (c = "#fff") => svg(`
    <path d="M40 20H18v60h22" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>
    <path d="M56 32 76 50 56 68M76 50H38" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`, "ui"),
  beg: (c = "#fff") => svg(`
    <path d="M22 34h56l-5 52H27Z" fill="${c}"/>
    <path d="M38 40V26a12 12 0 0 1 24 0v14" fill="none" stroke="${c}" stroke-width="7"/>`, "ui")
};

/* ---------- Latar hiasan ---------- */

/** Bentuk lembut di belakang skrin utama supaya tidak nampak kosong. */
/* Bulatan lembut sahaja — sebarang bentuk tajam di tengah akan kelihatan
   seperti kerosakan paparan di belakang maskot dan tajuk. */
export const latarHias = () => `
<svg class="hias" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <circle cx="46" cy="44" r="52" fill="rgba(255,255,255,.09)" class="mc-apung"/>
  <circle cx="368" cy="96" r="34" fill="rgba(255,255,255,.08)" class="mc-apung d2"/>
  <circle cx="330" cy="252" r="60" fill="rgba(255,255,255,.06)" class="mc-apung d3"/>
  <circle cx="70" cy="256" r="26" fill="rgba(255,255,255,.09)" class="mc-apung d4"/>
  <circle cx="378" cy="182" r="16" fill="rgba(255,255,255,.07)" class="mc-apung"/>
</svg>`;
