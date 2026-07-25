/* Matematik Ceria — Enjin Soalan (port daripada QuestionEngine.kt)
   Silibus KSSR Semakan 2017, Tahun 1–6. Semua soalan dijana rawak. */

/* ---------- Silibus ---------- */

export const Syllabus = {
  topics: {
    1: [
      { id: "t1_nombor", name: "Nombor Hingga 100", emoji: "🔢", year: 1, kind: "NOMBOR" },
      { id: "t1_tambah", name: "Tambah Dalam 100", emoji: "➕", year: 1, kind: "TAMBAH" },
      { id: "t1_tolak", name: "Tolak Dalam 100", emoji: "➖", year: 1, kind: "TOLAK" },
      { id: "t1_pecahan", name: "Pecahan Asas", emoji: "🍕", year: 1, kind: "PECAHAN" },
      { id: "t1_wang", name: "Wang Hingga RM10", emoji: "💰", year: 1, kind: "WANG" },
      { id: "t1_masa", name: "Masa dan Waktu", emoji: "⏰", year: 1, kind: "MASA" },
      { id: "t1_ruang", name: "Bentuk dan Ruang", emoji: "🔷", year: 1, kind: "RUANG" }
    ],
    2: [
      { id: "t2_nombor", name: "Nombor Hingga 1 000", emoji: "🔢", year: 2, kind: "NOMBOR" },
      { id: "t2_tambah", name: "Tambah Dalam 1 000", emoji: "➕", year: 2, kind: "TAMBAH" },
      { id: "t2_tolak", name: "Tolak Dalam 1 000", emoji: "➖", year: 2, kind: "TOLAK" },
      { id: "t2_darab", name: "Darab (Sifir 2, 3, 4, 5, 10)", emoji: "✖️", year: 2, kind: "DARAB" },
      { id: "t2_bahagi", name: "Bahagi", emoji: "➗", year: 2, kind: "BAHAGI" },
      { id: "t2_pecahan", name: "Pecahan", emoji: "🍕", year: 2, kind: "PECAHAN" },
      { id: "t2_wang", name: "Wang Hingga RM100", emoji: "💰", year: 2, kind: "WANG" },
      { id: "t2_masa", name: "Masa dan Waktu", emoji: "⏰", year: 2, kind: "MASA" },
      { id: "t2_ukuran", name: "Panjang, Jisim, Isi Padu", emoji: "📏", year: 2, kind: "UKURAN" },
      { id: "t2_ruang", name: "Bentuk dan Ruang", emoji: "🔷", year: 2, kind: "RUANG" }
    ],
    3: [
      { id: "t3_nombor", name: "Nombor Hingga 10 000", emoji: "🔢", year: 3, kind: "NOMBOR" },
      { id: "t3_tambah", name: "Tambah Dalam 10 000", emoji: "➕", year: 3, kind: "TAMBAH" },
      { id: "t3_tolak", name: "Tolak Dalam 10 000", emoji: "➖", year: 3, kind: "TOLAK" },
      { id: "t3_darab", name: "Darab (Sifir 6, 7, 8, 9)", emoji: "✖️", year: 3, kind: "DARAB" },
      { id: "t3_bahagi", name: "Bahagi", emoji: "➗", year: 3, kind: "BAHAGI" },
      { id: "t3_pecahan", name: "Pecahan", emoji: "🍕", year: 3, kind: "PECAHAN" },
      { id: "t3_perpuluhan", name: "Perpuluhan", emoji: "🔟", year: 3, kind: "PERPULUHAN" },
      { id: "t3_wang", name: "Wang Hingga RM1 000", emoji: "💰", year: 3, kind: "WANG" },
      { id: "t3_masa", name: "Masa dan Waktu", emoji: "⏰", year: 3, kind: "MASA" },
      { id: "t3_ukuran", name: "Panjang, Jisim, Isi Padu", emoji: "📏", year: 3, kind: "UKURAN" },
      { id: "t3_ruang", name: "Bentuk dan Ruang", emoji: "🔷", year: 3, kind: "RUANG" },
      { id: "t3_data", name: "Pengurusan Data", emoji: "📊", year: 3, kind: "DATA" }
    ],
    4: [
      { id: "t4_nombor", name: "Nombor Hingga 100 000", emoji: "🔢", year: 4, kind: "NOMBOR" },
      { id: "t4_operasi", name: "Operasi Bergabung", emoji: "🧮", year: 4, kind: "OPERASI" },
      { id: "t4_pecahan", name: "Pecahan", emoji: "🍕", year: 4, kind: "PECAHAN" },
      { id: "t4_perpuluhan", name: "Perpuluhan", emoji: "🔟", year: 4, kind: "PERPULUHAN" },
      { id: "t4_peratus", name: "Peratus", emoji: "💯", year: 4, kind: "PERATUS" },
      { id: "t4_wang", name: "Wang Hingga RM100 000", emoji: "💰", year: 4, kind: "WANG" },
      { id: "t4_masa", name: "Masa dan Waktu", emoji: "⏰", year: 4, kind: "MASA" },
      { id: "t4_ukuran", name: "Panjang, Jisim, Isi Padu", emoji: "📏", year: 4, kind: "UKURAN" },
      { id: "t4_ruang", name: "Perimeter dan Luas", emoji: "🔷", year: 4, kind: "RUANG" },
      { id: "t4_koordinat", name: "Koordinat", emoji: "🗺️", year: 4, kind: "KOORDINAT" },
      { id: "t4_data", name: "Pengurusan Data", emoji: "📊", year: 4, kind: "DATA" }
    ],
    5: [
      { id: "t5_nombor", name: "Nombor Hingga 1 000 000", emoji: "🔢", year: 5, kind: "NOMBOR" },
      { id: "t5_operasi", name: "Operasi Bergabung", emoji: "🧮", year: 5, kind: "OPERASI" },
      { id: "t5_pecahan", name: "Pecahan", emoji: "🍕", year: 5, kind: "PECAHAN" },
      { id: "t5_perpuluhan", name: "Perpuluhan", emoji: "🔟", year: 5, kind: "PERPULUHAN" },
      { id: "t5_peratus", name: "Peratus", emoji: "💯", year: 5, kind: "PERATUS" },
      { id: "t5_wang", name: "Wang Hingga RM1 000 000", emoji: "💰", year: 5, kind: "WANG" },
      { id: "t5_masa", name: "Masa dan Waktu", emoji: "⏰", year: 5, kind: "MASA" },
      { id: "t5_ukuran", name: "Panjang, Jisim, Isi Padu", emoji: "📏", year: 5, kind: "UKURAN" },
      { id: "t5_ruang", name: "Luas dan Isi Padu", emoji: "🔷", year: 5, kind: "RUANG" },
      { id: "t5_koordinat", name: "Koordinat", emoji: "🗺️", year: 5, kind: "KOORDINAT" },
      { id: "t5_nisbah", name: "Nisbah", emoji: "⚖️", year: 5, kind: "NISBAH" },
      { id: "t5_data", name: "Pengurusan Data", emoji: "📊", year: 5, kind: "DATA" }
    ],
    6: [
      { id: "t6_nombor", name: "Nombor Hingga 10 Juta", emoji: "🔢", year: 6, kind: "NOMBOR" },
      { id: "t6_operasi", name: "Operasi Bergabung", emoji: "🧮", year: 6, kind: "OPERASI" },
      { id: "t6_pecahan", name: "Pecahan", emoji: "🍕", year: 6, kind: "PECAHAN" },
      { id: "t6_perpuluhan", name: "Perpuluhan", emoji: "🔟", year: 6, kind: "PERPULUHAN" },
      { id: "t6_peratus", name: "Peratus", emoji: "💯", year: 6, kind: "PERATUS" },
      { id: "t6_wang", name: "Pengurusan Kewangan", emoji: "💰", year: 6, kind: "WANG" },
      { id: "t6_masa", name: "Masa dan Waktu", emoji: "⏰", year: 6, kind: "MASA" },
      { id: "t6_ukuran", name: "Panjang, Jisim, Isi Padu", emoji: "📏", year: 6, kind: "UKURAN" },
      { id: "t6_ruang", name: "Luas dan Isi Padu", emoji: "🔷", year: 6, kind: "RUANG" },
      { id: "t6_koordinat", name: "Koordinat", emoji: "🗺️", year: 6, kind: "KOORDINAT" },
      { id: "t6_nisbah", name: "Nisbah dan Kadaran", emoji: "⚖️", year: 6, kind: "NISBAH" },
      { id: "t6_data", name: "Data dan Purata", emoji: "📊", year: 6, kind: "DATA" }
    ]
  },
  byId(id) {
    for (const y of Object.keys(this.topics)) {
      const t = this.topics[y].find((x) => x.id === id);
      if (t) return t;
    }
    return null;
  },
  all() {
    return Object.keys(this.topics).flatMap((y) => this.topics[y]);
  }
};

/* ---------- Alat bantu ---------- */

const NAMES = ["Ali", "Siti", "Ahmad", "Mei Ling", "Raju", "Aisyah", "Hafiz", "Devi", "Amir", "Kavita"];
const ITEMS = ["biji guli", "batang pensel", "keping pelekat", "biji gula-gula", "biji manik", "keping kad"];

const idiv = (a, b) => Math.trunc(a / b);
const rnd = (from, to) => (from >= to ? from : from + Math.floor(Math.random() * (to - from + 1)));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffled = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const fmt = (n) => {
  const neg = n < 0;
  const s = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return neg ? "−" + s : s;
};
const dec1 = (t) => (t / 10).toFixed(1);
const dec2 = (h) => (h / 100).toFixed(2);
const pad2 = (n) => String(n).padStart(2, "0");
const rm = (sen) => "RM" + fmt(idiv(sen, 100)) + "." + pad2(sen % 100);
const tm = (h, m) => `${h}:${pad2(m)}`;
const rep = (s, n) => (n > 0 ? s.repeat(n) : "");

function mcqInt(text, correct, spread, visual = null) {
  const s = Math.max(2, spread);
  const opts = [correct];
  let guard = 0;
  while (opts.length < 4 && guard < 300) {
    guard++;
    const v = correct + rnd(-s, s);
    if (v >= 0 && !opts.includes(v)) opts.push(v);
  }
  let pad = correct + s;
  while (opts.length < 4) {
    pad += 1;
    if (!opts.includes(pad)) opts.push(pad);
  }
  const list = shuffled(opts);
  return { text, options: list.map(fmt), answerIndex: list.indexOf(correct), visual };
}

function mcqStr(text, correct, distractors, visual = null) {
  const opts = [correct];
  for (const dd of distractors) {
    if (dd !== correct && !opts.includes(dd) && opts.length < 4) opts.push(dd);
  }
  let i = 2;
  while (opts.length < 4) {
    const filler = `${correct}${i}`;
    if (!opts.includes(filler)) opts.push(filler);
    i++;
  }
  const list = shuffled(opts);
  return { text, options: list, answerIndex: list.indexOf(correct), visual };
}

const yearMax = (year) =>
  ({ 1: 100, 2: 1000, 3: 10000, 4: 100000, 5: 1000000 }[year] ?? 10000000);

const placeName = (place) => (place === 10 ? "puluh" : place === 100 ? "ratus" : "ribu");

/* ---------- Penjana mengikut topik ---------- */

function emojiCount(d) {
  const emo = pick(["🍎", "⚽", "🌟", "🎈", "🐠"]);
  const n = rnd(3, d === 1 ? 9 : 18);
  const rows = [];
  let left = n;
  while (left > 0) {
    const take = Math.min(6, left);
    rows.push(rep(emo, take));
    left -= take;
  }
  return mcqInt("Berapakah bilangan objek di bawah?", n, 3, { t: "emojis", rows });
}

function nombor(year, d) {
  if (year === 1 && rnd(1, 10) <= 4) return emojiCount(d);
  const maxN = yearMax(year);
  switch (rnd(1, year === 1 ? 3 : 4)) {
    case 1: {
      const set = [];
      let guard = 0;
      while (set.length < 4 && guard < 500) {
        guard++;
        const v = rnd(idiv(maxN, 10), maxN - 1);
        if (!set.includes(v)) set.push(v);
      }
      const list = shuffled(set);
      const besar = rnd(0, 1) === 0;
      const correct = besar ? Math.max(...list) : Math.min(...list);
      return {
        text: `Nombor manakah yang paling ${besar ? "BESAR" : "KECIL"}?`,
        options: list.map(fmt),
        answerIndex: list.indexOf(correct),
        visual: null
      };
    }
    case 2: {
      const n = rnd(2, maxN - 2);
      return rnd(0, 1) === 0
        ? mcqInt(`Apakah nombor SELEPAS ${fmt(n)}?`, n + 1, 3)
        : mcqInt(`Apakah nombor SEBELUM ${fmt(n)}?`, n - 1, 3);
    }
    case 3: {
      const mult = year <= 2 ? 1 : 10;
      const step = (d === 1 ? rnd(1, 2) : d === 2 ? rnd(2, 5) : rnd(3, 10)) * mult;
      const start = rnd(1, Math.max(2, maxN - 4 * step));
      const ans = start + 3 * step;
      return mcqInt(
        `Lengkapkan pola nombor: ${fmt(start)}, ${fmt(start + step)}, ${fmt(start + 2 * step)}, ____`,
        ans,
        step * 2
      );
    }
    default: {
      const place = Math.min(d === 1 ? 10 : d === 2 ? 100 : 1000, idiv(maxN, 10));
      const n = rnd(place + 1, maxN - 1);
      const ans = idiv(n + idiv(place, 2), place) * place;
      const distract = [
        ans + place,
        ans - place >= 0 ? ans - place : ans + 3 * place,
        ans + 2 * place,
        idiv(n, place) * place
      ];
      return mcqStr(
        `Bundarkan ${fmt(n)} kepada ${placeName(place)} terdekat.`,
        fmt(ans),
        distract.map(fmt)
      );
    }
  }
}

const opCap = (year, d) => Math.max(10, idiv(yearMax(year), d === 1 ? 5 : d === 2 ? 2 : 1));

function tambah(year, d) {
  if (year === 1 && rnd(1, 10) <= 4) {
    const emo = pick(["🍎", "⚽", "🌟", "🎈"]);
    const a = rnd(2, 9);
    const b = rnd(1, 9);
    return mcqInt("Berapakah jumlah kesemua objek di bawah?", a + b, 3, {
      t: "emojis",
      rows: [rep(emo, a), "➕", rep(emo, b)]
    });
  }
  const cap = opCap(year, d);
  const a = rnd(1, cap - 2);
  const b = rnd(1, cap - a);
  const ans = a + b;
  const word = d >= 2 && rnd(0, 2) === 0;
  if (word) {
    const n1 = pick(NAMES);
    let n2 = pick(NAMES);
    while (n2 === n1) n2 = pick(NAMES);
    const item = pick(ITEMS);
    return mcqInt(
      `${n1} ada ${fmt(a)} ${item}. ${n2} memberinya ${fmt(b)} lagi. Berapakah jumlah ${item} ${n1} sekarang?`,
      ans,
      Math.max(3, idiv(ans, 8))
    );
  }
  if (d === 3 && year >= 3) {
    const c = rnd(1, Math.max(2, idiv(cap, 2)));
    return mcqInt(`${fmt(a)} + ${fmt(b)} + ${fmt(c)} = ?`, a + b + c, Math.max(4, idiv(a + b + c, 8)));
  }
  return mcqInt(`${fmt(a)} + ${fmt(b)} = ?`, ans, Math.max(3, idiv(ans, 8)));
}

function tolak(year, d) {
  const cap = opCap(year, d);
  const a = rnd(3, cap);
  const b = rnd(1, a - 1);
  const ans = a - b;
  const word = d >= 2 && rnd(0, 2) === 0;
  const spread = Math.max(3, idiv(Math.max(ans, 5), 8));
  if (word) {
    const n1 = pick(NAMES);
    const item = pick(ITEMS);
    return mcqInt(
      `${n1} ada ${fmt(a)} ${item}. Dia memberikan ${fmt(b)} kepada rakannya. Berapakah yang tinggal?`,
      ans,
      spread
    );
  }
  return mcqInt(`${fmt(a)} − ${fmt(b)} = ?`, ans, spread);
}

function darab(year, d) {
  if (year === 2 && d === 1 && rnd(0, 1) === 0) {
    const emo = pick(["🍎", "⚽", "🌟", "🍓"]);
    const a = rnd(2, 4);
    const b = rnd(2, 5);
    return mcqInt(`${a} kumpulan × ${b} objek. Berapakah jumlah kesemuanya?`, a * b, 4, {
      t: "emojis",
      rows: Array.from({ length: a }, () => rep(emo, b))
    });
  }
  let a, b;
  if (year === 2) {
    a = pick([2, 3, 4, 5, 10]);
    b = rnd(2, d === 1 ? 5 : 10);
  } else if (year === 3) {
    if (d <= 2) {
      a = rnd(2, 9);
      b = rnd(2, d === 1 ? 9 : 12);
    } else {
      a = rnd(11, 99);
      b = rnd(2, 9);
    }
  } else if (year === 4) {
    if (d === 1) { a = rnd(11, 99); b = rnd(2, 9); }
    else if (d === 2) { a = rnd(100, 999); b = rnd(2, 9); }
    else { a = rnd(11, 99); b = rnd(11, 99); }
  } else {
    if (d === 1) { a = rnd(100, 999); b = rnd(2, 9); }
    else if (d === 2) { a = rnd(11, 99); b = rnd(11, 99); }
    else { a = rnd(100, 999); b = rnd(11, 99); }
  }
  const ans = a * b;
  if (d >= 2 && rnd(0, 2) === 0 && ans <= 10000) {
    return mcqInt(
      `Sebuah kotak mengandungi ${fmt(b)} ${pick(ITEMS)}. Berapakah jumlahnya dalam ${fmt(a)} kotak?`,
      ans,
      Math.max(4, idiv(ans, 8))
    );
  }
  return mcqInt(`${fmt(a)} × ${fmt(b)} = ?`, ans, Math.max(4, idiv(ans, 8)));
}

function bahagi(year, d) {
  const divisor = year === 2 ? pick([2, 3, 4, 5, 10]) : rnd(2, 9);
  let q;
  if (year === 2) q = rnd(1, d === 1 ? 5 : 10);
  else if (year === 3) q = rnd(2, d === 1 ? 9 : 12);
  else q = d === 1 ? rnd(2, 12) : d === 2 ? rnd(11, 99) : rnd(100, 999);

  if (d === 3 && year >= 3 && rnd(0, 1) === 0) {
    const r = rnd(1, divisor - 1);
    const n = divisor * q + r;
    return mcqInt(`Apakah BAKI bagi ${fmt(n)} ÷ ${divisor}?`, r, 2);
  }
  const n = divisor * q;
  return mcqInt(`${fmt(n)} ÷ ${divisor} = ?`, q, Math.max(2, idiv(q, 6)));
}

function operasi(d) {
  const m = d === 1 ? 10 : d === 2 ? 20 : 50;
  switch (rnd(1, 4)) {
    case 1: {
      const a = rnd(2, m * 2), b = rnd(2, 9), c = rnd(2, m);
      return mcqInt(`${fmt(a)} + ${fmt(b)} × ${fmt(c)} = ?`, a + b * c, Math.max(4, idiv(a + b * c, 6)));
    }
    case 2: {
      const b = rnd(2, 9), c = rnd(2, m), a = b * c + rnd(1, m * 2);
      return mcqInt(`${fmt(a)} − ${fmt(b)} × ${fmt(c)} = ?`, a - b * c, Math.max(4, idiv(a, 6)));
    }
    case 3: {
      const a = rnd(2, m), b = rnd(2, m), c = rnd(2, 9);
      return mcqInt(`(${fmt(a)} + ${fmt(b)}) × ${fmt(c)} = ?`, (a + b) * c, Math.max(4, idiv((a + b) * c, 6)));
    }
    default: {
      const a = rnd(2, 9), b = rnd(2, m), c = rnd(2, m * 2);
      return mcqInt(`${fmt(a)} × ${fmt(b)} + ${fmt(c)} = ?`, a * b + c, Math.max(4, idiv(a * b + c, 6)));
    }
  }
}

function pecahan(year, d) {
  if (year === 1) {
    const n = pick([2, 4]);
    const others = ["1/2", "1/3", "1/4", "1/8"].filter((x) => x !== `1/${n}`);
    if (rnd(0, 1) === 0) {
      return mcqStr("Apakah pecahan kawasan yang BERLOREK?", `1/${n}`, others, { t: "pie", parts: n, shaded: 1 });
    }
    return mcqStr(
      `Sebiji kek dipotong kepada ${n} bahagian yang sama besar. Satu bahagian mewakili pecahan?`,
      `1/${n}`,
      others
    );
  }
  if (year <= 3 && rnd(1, 10) <= 4) {
    const parts = pick([3, 4, 6, 8]);
    const shaded = rnd(1, parts - 1);
    return mcqStr(
      "Apakah pecahan kawasan yang BERLOREK?",
      `${shaded}/${parts}`,
      [`${parts - shaded}/${parts}`, `${parts}/${shaded}`, `1/${parts}`, `${shaded}/${parts + 2}`],
      { t: "pie", parts, shaded }
    );
  }
  if (year <= 3) {
    switch (rnd(1, d === 3 ? 3 : 2)) {
      case 1: {
        const den = pick([4, 6, 8, 10]);
        const a = rnd(1, den - 2);
        const b = rnd(1, den - a - 1);
        return mcqStr(`${a}/${den} + ${b}/${den} = ?`, `${a + b}/${den}`, [
          `${a + b + 1}/${den}`,
          `${Math.max(1, a + b - 1)}/${den}`,
          `${a + b}/${den + 2}`,
          `${a + b}/${den * 2}`
        ]);
      }
      case 2: {
        const den = pick([3, 4, 5, 8]);
        const a = rnd(1, den - 1);
        let b = rnd(1, den - 1);
        while (b === a) b = rnd(1, den - 1);
        const besar = Math.max(a, b);
        return mcqStr(`Pecahan manakah lebih BESAR: ${a}/${den} atau ${b}/${den}?`, `${besar}/${den}`, [
          `${Math.min(a, b)}/${den}`,
          `1/${den}`,
          `${den}/${den}`
        ]);
      }
      default: {
        const k = rnd(2, 4);
        return mcqStr(`1/2 = ?/${2 * k}`, `${k}/${2 * k}`, [`${k + 1}/${2 * k}`, `1/${2 * k}`, `2/${2 * k}`]);
      }
    }
  }
  switch (rnd(1, 3)) {
    case 1: {
      const den = pick([2, 3, 4, 5, 8, 10]);
      const num = rnd(1, den - 1);
      const unit = rnd(2, d === 1 ? 5 : d === 2 ? 12 : 30);
      const total = den * unit;
      return mcqInt(`${num}/${den} daripada ${fmt(total)} = ?`, num * unit, Math.max(3, idiv(num * unit, 5)));
    }
    case 2: {
      const a = pick([2, 3, 4, 5]);
      const bden = a * 2;
      const x = rnd(1, a - 1);
      const y = rnd(1, bden - 1);
      const num = x * 2 + y;
      const g = gcd(num, bden);
      return mcqStr(`${x}/${a} + ${y}/${bden} = ? (dalam bentuk termudah)`, `${num / g}/${bden / g}`, [
        `${num}/${bden * 2}`,
        `${x + y}/${a + bden}`,
        `${num / g + 1}/${bden / g}`,
        `${num}/${bden}`
      ]);
    }
    default: {
      const k = pick([2, 3, 4, 5]);
      const bn = rnd(1, 5);
      const bd = rnd(bn + 1, 9);
      const g = gcd(bn, bd);
      const sn = bn / g;
      const sd = bd / g;
      return mcqStr(`Permudahkan ${sn * k}/${sd * k}.`, `${sn}/${sd}`, [
        `${sn * k}/${sd}`,
        `${sn}/${sd * k}`,
        `${sn + 1}/${sd}`
      ]);
    }
  }
}

function perpuluhan(d) {
  switch (rnd(1, 3)) {
    case 1: {
      if (d === 1) {
        const n = rnd(1, 9);
        return mcqStr(`Tukar ${n}/10 kepada perpuluhan.`, dec1(n), [dec1((n % 9) + 1), dec2(n), `${n}.0`]);
      }
      const n = rnd(1, 99);
      return mcqStr(`Tukar ${n}/100 kepada perpuluhan.`, dec2(n), [
        dec2(n + 10),
        dec2(n + 1),
        dec1((n % 9) + 1),
        dec2(Math.max(1, n - 10))
      ]);
    }
    case 2: {
      const minus = rnd(0, 1) === 1;
      if (d === 1) {
        const x = rnd(2, 89);
        const y = rnd(1, x - 1);
        if (minus)
          return mcqStr(`${dec1(x)} − ${dec1(y)} = ?`, dec1(x - y), [
            dec1(x - y + 1),
            dec1(Math.max(1, x - y - 1)),
            dec1(x + y)
          ]);
        return mcqStr(`${dec1(y)} + ${dec1(x - y)} = ?`, dec1(x), [
          dec1(x + 1),
          dec1(Math.max(1, x - 1)),
          dec1(x + 10)
        ]);
      }
      const x = rnd(50, 899);
      const y = rnd(10, x - 5);
      if (minus)
        return mcqStr(`${dec2(x)} − ${dec2(y)} = ?`, dec2(x - y), [
          dec2(x - y + 10),
          dec2(Math.max(1, x - y - 10)),
          dec2(x - y + 100)
        ]);
      return mcqStr(`${dec2(y)} + ${dec2(x - y)} = ?`, dec2(x), [
        dec2(x + 10),
        dec2(Math.max(1, x - 10)),
        dec2(x + 100)
      ]);
    }
    default: {
      if (d <= 2) {
        const t = rnd(2, 9);
        const k = rnd(2, 9);
        return mcqStr(`${dec1(t)} × ${k} = ?`, dec1(t * k), [
          dec1(t * k + 1),
          dec1(Math.max(1, t * k - 1)),
          dec1(t * k + 10)
        ]);
      }
      const h = rnd(101, 999);
      const k = rnd(2, 9);
      return mcqStr(`${dec2(h)} × ${k} = ?`, dec2(h * k), [
        dec2(h * k + 100),
        dec2(Math.max(1, h * k - 100)),
        dec2(h * k + 10)
      ]);
    }
  }
}

function peratus(d) {
  switch (rnd(1, d === 1 ? 2 : 3)) {
    case 1: {
      const p = d === 1 ? pick([10, 20, 25, 50, 100]) : rnd(1, 19) * 5;
      const n = rnd(1, d === 3 ? 50 : 10) * 20;
      const ans = idiv(p * n, 100);
      return mcqInt(`${p}% daripada ${fmt(n)} = ?`, ans, Math.max(3, idiv(ans, 5)));
    }
    case 2: {
      const pairs = [["1/2", 50], ["1/4", 25], ["3/4", 75], ["1/5", 20], ["1/10", 10], ["3/10", 30]];
      const [frac, p] = pick(pairs);
      return mcqStr(`Tukar ${frac} kepada peratus.`, `${p}%`, [
        `${p + 5}%`,
        `${Math.max(5, p - 5)}%`,
        `${p + 10}%`
      ]);
    }
    default: {
      const harga = rnd(1, 20) * 20;
      const disc = pick([10, 20, 25, 50]);
      const potongan = idiv(harga * disc, 100);
      const ans = harga - potongan;
      return mcqStr(
        `Harga sehelai baju ialah RM${fmt(harga)}. Diskaun ${disc}% diberikan. Berapakah harga selepas diskaun?`,
        `RM${fmt(ans)}`,
        [`RM${fmt(potongan)}`, `RM${fmt(ans + 10)}`, `RM${fmt(Math.max(1, ans - 10))}`]
      );
    }
  }
}

function randAmt(capRM, d, whole) {
  const capSen = capRM * 100;
  const hi = Math.max(500, d === 1 ? idiv(capSen, 5) : d === 2 ? idiv(capSen, 2) : capSen);
  const v = rnd(100, hi);
  return whole ? Math.max(100, idiv(v, 100) * 100) : Math.max(105, idiv(v, 5) * 5);
}

function wang(year, d) {
  if (year === 1 && rnd(0, 1) === 0) {
    const list = Array.from({ length: rnd(2, d === 1 ? 3 : 4) }, () => pick([5, 10, 20, 50]));
    const sum = list.reduce((a, b) => a + b, 0);
    return mcqInt("Berapakah jumlah wang ini dalam sen?", sum, 10, { t: "coins", sen: list });
  }
  if (year === 2 && rnd(1, 10) <= 4) {
    const list = [
      ...Array.from({ length: rnd(1, 2) }, () => pick([100, 500])),
      ...Array.from({ length: rnd(1, 2) }, () => pick([10, 20, 50]))
    ];
    const jum = list.reduce((a, b) => a + b, 0);
    return mcqStr("Berapakah jumlah wang ini?", rm(jum), [rm(jum + 10), rm(jum - 5), rm(jum + 100)], {
      t: "coins",
      sen: list
    });
  }
  const capRM = { 1: 10, 2: 100, 3: 1000, 4: 100000 }[year] ?? 1000000;
  if (year === 1 && d === 1) {
    const coins = [5, 10, 20, 50];
    const a = pick(coins);
    const b = pick(coins);
    return mcqStr(`${a} sen + ${b} sen = ? sen`, `${a + b}`, [
      `${a + b + 5}`,
      `${Math.max(5, a + b - 5)}`,
      `${a + b + 10}`
    ]);
  }
  const whole = year <= 2 && d === 1;
  if (rnd(0, 1) === 0) {
    const a = randAmt(capRM, d, whole);
    const b = randAmt(capRM, d, whole);
    return mcqStr(
      `${pick(NAMES)} membeli sebuah buku berharga ${rm(a)} dan sekotak pensel berharga ${rm(b)}. Berapakah jumlah harga?`,
      rm(a + b),
      [rm(a + b + 100), rm(Math.max(5, a + b - 100)), rm(a + b + 50)]
    );
  }
  const a = randAmt(Math.min(capRM, 1000), d, whole);
  const bayar = (idiv(idiv(a, 100), 10) + 1) * 10 * 100;
  const baki = bayar - a;
  return mcqStr(
    `Harga sebuah mainan ialah ${rm(a)}. ${pick(NAMES)} membayar ${rm(bayar)}. Berapakah baki yang diterima?`,
    rm(baki),
    [rm(baki + 100), rm(Math.max(5, baki - 100)), rm(baki + 50)]
  );
}

const HARI = ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"];

function jamAnalog(year, d) {
  const h = rnd(1, 12);
  const m =
    year === 1 ? 0 : year <= 3 ? (d === 1 ? pick([0, 30]) : pick([0, 15, 30, 45])) : rnd(0, 11) * 5;
  const ans = tm(h, m);
  const distract = [
    tm(h === 12 ? 1 : h + 1, m),
    tm(h, (m + 30) % 60),
    tm(h <= 1 ? 11 : h - 1, m),
    tm(h, (m + 5) % 60)
  ];
  return mcqStr("Pukul berapakah yang ditunjukkan pada muka jam ini?", ans, distract, {
    t: "clock",
    hour: h,
    minute: m
  });
}

function masa(year, d) {
  if (rnd(1, 10) <= 4) return jamAnalog(year, d);
  if (year === 1) {
    switch (rnd(1, 3)) {
      case 1: {
        const i = rnd(0, 6);
        const selepas = rnd(0, 1) === 0;
        const ans = selepas ? HARI[(i + 1) % 7] : HARI[(i + 6) % 7];
        return mcqStr(
          `Apakah hari ${selepas ? "SELEPAS" : "SEBELUM"} hari ${HARI[i]}?`,
          ans,
          shuffled(HARI.filter((x) => x !== ans && x !== HARI[i])).slice(0, 3)
        );
      }
      case 2:
        return mcqStr("1 minggu = ? hari", "7", ["5", "6", "10"]);
      default:
        return mcqStr("1 hari = ? jam", "24", ["12", "20", "60"]);
    }
  }
  if (year === 2 || (year === 3 && d === 1)) {
    if (rnd(1, 2) === 1) return mcqStr("1 jam = ? minit", "60", ["30", "100", "24"]);
    const j = rnd(1, d === 1 ? 3 : 8);
    return mcqInt(`${j} jam = ? minit`, j * 60, 45);
  }
  switch (rnd(1, 3)) {
    case 1: {
      const j = rnd(1, 5);
      const m = pick([0, 15, 30, 45]);
      const tot = j * 60 + m;
      const ans = m === 0 ? `${j} jam` : `${j} jam ${m} minit`;
      const distract =
        m === 0
          ? [`${j + 1} jam`, `${j} jam 30 minit`, `${j} jam 15 minit`]
          : [`${j + 1} jam ${m} minit`, `${j} jam ${m === 15 ? 45 : 15} minit`, `${j + 1} jam`];
      return mcqStr(`${fmt(tot)} minit = ?`, ans, distract);
    }
    case 2: {
      const h1 = rnd(7, 10);
      const m1 = pick([0, 15, 30]);
      const durM = rnd(1, 3) * 60 + pick([0, 15, 30, 45]);
      const endTot = h1 * 60 + m1 + durM;
      const dj = idiv(durM, 60);
      const dm = durM % 60;
      const ans = dm === 0 ? `${dj} jam` : `${dj} jam ${dm} minit`;
      const distract =
        dm === 0
          ? [`${dj + 1} jam`, `${dj} jam 30 minit`, `${dj} jam 15 minit`]
          : [`${dj + 1} jam ${dm} minit`, `${dj} jam ${dm === 15 ? 45 : 15} minit`, `${dj + 1} jam`];
      return mcqStr(
        `Satu aktiviti bermula pada ${tm(h1, m1)} pagi dan tamat pada ${tm(idiv(endTot, 60), endTot % 60)}. Berapakah tempoh aktiviti itu?`,
        ans,
        distract
      );
    }
    default: {
      if (year >= 5) {
        const h = rnd(1, 11);
        const pm = rnd(0, 1) === 1;
        const h24 = pm ? h + 12 : h;
        return mcqStr(
          `Tukar pukul ${h}:00 ${pm ? "petang/malam" : "pagi"} kepada sistem 24 jam.`,
          `${pad2(h24)}00`,
          [`${pad2((h24 + 2) % 24)}00`, `${pad2(pm ? h : Math.min(23, h + 12))}00`, `${pad2(h24)}30`]
        );
      }
      const m = rnd(1, 5);
      return mcqInt(`${m} minit = ? saat`, m * 60, 45);
    }
  }
}

const UNITS = [
  { kecil: "cm", besar: "m", faktor: 100 },
  { kecil: "m", besar: "km", faktor: 1000 },
  { kecil: "g", besar: "kg", faktor: 1000 },
  { kecil: "ml", besar: "ℓ", faktor: 1000 }
];

function ukuran(year, d) {
  const u = year === 2 ? (rnd(0, 1) === 0 ? UNITS[0] : UNITS[2]) : pick(UNITS);
  switch (rnd(1, 3)) {
    case 1: {
      const k = rnd(1, d === 1 ? 5 : 20);
      return mcqInt(`${k} ${u.besar} = ? ${u.kecil}`, k * u.faktor, idiv(u.faktor, 2));
    }
    case 2: {
      const k = rnd(1, 9);
      return mcqInt(`${fmt(k * u.faktor)} ${u.kecil} = ? ${u.besar}`, k, 3);
    }
    default: {
      if (d >= 2 && year >= 4) {
        const whole = rnd(1, 9);
        const dc = pick([1, 2, 5]);
        const ans = whole * u.faktor + idiv(dc * u.faktor, 10);
        return mcqStr(`${whole}.${dc} ${u.besar} = ? ${u.kecil}`, fmt(ans), [
          fmt(whole * u.faktor + dc),
          fmt(ans + idiv(u.faktor, 10)),
          fmt(whole * u.faktor)
        ]);
      }
      const a = rnd(2, 9);
      const b = rnd(1, u.faktor - 1);
      return mcqStr(`${a} ${u.besar} ${b} ${u.kecil} = ? ${u.kecil}`, fmt(a * u.faktor + b), [
        fmt(a * u.faktor - b),
        fmt(a + b),
        fmt(a * u.faktor + b + 10)
      ]);
    }
  }
}

function ruang(year, d) {
  if (year <= 2) {
    const named = [
      ["bulatan", 0],
      ["segi tiga", 3],
      ["segi empat sama", 4],
      ["segi empat tepat", -4],
      ["pentagon", 5],
      ["heksagon", 6]
    ];
    switch (rnd(1, 3)) {
      case 1: {
        const p = pick(named);
        const others = shuffled(
          named.filter(
            (it) =>
              it[0] !== p[0] &&
              !(p[1] === 4 && it[1] === -4) &&
              !(p[1] === -4 && it[1] === 4)
          )
        )
          .slice(0, 3)
          .map((it) => it[0]);
        return mcqStr("Apakah nama bentuk ini?", p[0], others, { t: "shape", sides: p[1] });
      }
      case 2: {
        const p = pick(named.filter((it) => it[1] !== 0));
        const sides = p[1] === -4 ? 4 : p[1];
        return mcqInt("Berapakah bilangan SISI bentuk ini?", sides, 2, { t: "shape", sides: p[1] });
      }
      default: {
        const shapes = [
          ["segi tiga", 3],
          ["segi empat sama", 4],
          ["pentagon", 5],
          ["heksagon", 6]
        ];
        const s = pick(shapes);
        return mcqInt(`Berapakah bilangan BUCU bagi sebuah ${s[0]}?`, s[1], 2);
      }
    }
  }
  if (year === 3) {
    const p = rnd(2, d === 1 ? 10 : 20);
    const l = rnd(2, p);
    return mcqInt(
      `Sebuah segi empat tepat berukuran panjang ${p} cm dan lebar ${l} cm. Berapakah PERIMETERNYA dalam cm?`,
      2 * (p + l),
      6
    );
  }
  if (year === 4) {
    const p = rnd(2, d === 1 ? 9 : 15);
    const l = rnd(2, p);
    if (rnd(0, 1) === 0)
      return mcqInt(
        `Sebuah segi empat tepat berukuran panjang ${p} cm dan lebar ${l} cm. Berapakah PERIMETERNYA dalam cm?`,
        2 * (p + l),
        6
      );
    return mcqInt(
      `Sebuah segi empat tepat berukuran panjang ${p} cm dan lebar ${l} cm. Berapakah LUASNYA dalam cm²?`,
      p * l,
      Math.max(4, idiv(p * l, 4))
    );
  }
  if (year === 5) {
    if (rnd(0, 1) === 0) {
      const tapak = rnd(1, 10) * 2;
      const tinggi = rnd(2, 12);
      return mcqInt(
        `Sebuah segi tiga mempunyai tapak ${tapak} cm dan tinggi ${tinggi} cm. Berapakah LUASNYA dalam cm²?`,
        idiv(tapak * tinggi, 2),
        Math.max(3, idiv(tapak * tinggi, 6))
      );
    }
    const a = rnd(2, 8), b = rnd(2, 8), c = rnd(2, 8);
    return mcqInt(
      `Sebuah kuboid berukuran ${a} cm × ${b} cm × ${c} cm. Berapakah ISI PADUNYA dalam cm³?`,
      a * b * c,
      Math.max(4, idiv(a * b * c, 5))
    );
  }
  switch (rnd(1, 3)) {
    case 1: {
      const s = rnd(3, 12);
      return mcqInt(`Berapakah isi padu sebuah kubus yang bersisi ${s} cm, dalam cm³?`, s * s * s, Math.max(5, s * s));
    }
    case 2: {
      const tapak = rnd(2, 12) * 2;
      const tinggi = rnd(3, 15);
      return mcqInt(
        `Sebuah segi tiga mempunyai tapak ${tapak} cm dan tinggi ${tinggi} cm. Berapakah LUASNYA dalam cm²?`,
        idiv(tapak * tinggi, 2),
        Math.max(4, idiv(tapak * tinggi, 6))
      );
    }
    default: {
      const p = rnd(5, 20);
      const l = rnd(3, p);
      return mcqInt(
        `Sebuah segi empat tepat berukuran panjang ${p} m dan lebar ${l} m. Berapakah LUASNYA dalam m²?`,
        p * l,
        Math.max(4, idiv(p * l, 5))
      );
    }
  }
}

function koordinat(d) {
  const m = d === 1 ? 8 : 10;
  switch (rnd(1, 4)) {
    case 1: {
      const x = rnd(1, m);
      let y = rnd(1, m);
      while (y === x) y = rnd(1, m);
      return mcqStr(
        "Apakah koordinat titik P pada rajah?",
        `(${x}, ${y})`,
        [`(${y}, ${x})`, `(${x + 1}, ${y})`, `(${x}, ${y + 1})`],
        { t: "coord", x, y, maxN: 10 }
      );
    }
    case 2: {
      const x = rnd(1, m), y = rnd(1, m);
      return mcqInt("Lihat rajah. Apakah nilai koordinat-x bagi titik P?", x, 3, { t: "coord", x, y, maxN: 10 });
    }
    case 3: {
      const x = rnd(1, m), y = rnd(1, m);
      return mcqInt(`Titik Q terletak pada koordinat (${x}, ${y}). Apakah nilai koordinat-y titik Q?`, y, 3);
    }
    default:
      return mcqStr("Apakah koordinat bagi titik ASALAN?", "(0, 0)", ["(1, 1)", "(0, 1)", "(1, 0)"]);
  }
}

function nisbah(d) {
  if (rnd(0, 1) === 0) {
    const k = rnd(2, d === 1 ? 4 : 9);
    const a = rnd(1, 9);
    let b = rnd(1, 9);
    while (b === a) b = rnd(1, 9);
    const g = gcd(a, b);
    return mcqStr(`Nyatakan nisbah ${a * k}:${b * k} dalam bentuk termudah.`, `${a / g}:${b / g}`, [
      `${a * k}:${b}`,
      `${a}:${b * k}`,
      `${a / g + 1}:${b / g}`
    ]);
  }
  const unit = rnd(2, d === 1 ? 5 : 12);
  const k = rnd(2, 6);
  const m = rnd(2, 9);
  return mcqStr(
    `${k} buah buku berharga RM${fmt(k * unit)}. Berapakah harga ${m} buah buku yang sama?`,
    `RM${fmt(m * unit)}`,
    [`RM${fmt(m * unit + unit)}`, `RM${fmt(Math.max(1, m * unit - unit))}`, `RM${fmt(k * unit * m)}`]
  );
}

function dataQ(year, d) {
  if ((year >= 5 && d >= 2) || year === 6) {
    const n = d === 3 ? 4 : 3;
    const avg = rnd(3, 20);
    const vals = Array.from({ length: n }, () => avg);
    for (let i = 0; i < idiv(n, 2); i++) {
      const delta = rnd(1, 2);
      vals[i] += delta;
      vals[n - 1 - i] -= delta;
    }
    return mcqInt(`Carta menunjukkan markah ${n} ujian. Berapakah PURATA markahnya?`, avg, 4, {
      t: "bars",
      labels: Array.from({ length: n }, (_, i) => `Ujian ${i + 1}`),
      values: vals
    });
  }
  const picks = shuffled(NAMES).slice(0, 4);
  const counts = shuffled([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 4);
  const visual = { t: "bars", labels: picks, values: counts };
  switch (rnd(1, d >= 2 ? 3 : 2)) {
    case 1: {
      const maxI = counts.indexOf(Math.max(...counts));
      return {
        text: "Carta menunjukkan bilangan buku yang dibaca. Siapakah yang membaca paling BANYAK buku?",
        options: picks,
        answerIndex: maxI,
        visual
      };
    }
    case 2:
      return mcqInt(
        "Carta menunjukkan bilangan buku yang dibaca. Berapakah JUMLAH semua buku?",
        counts.reduce((a, b) => a + b, 0),
        5,
        visual
      );
    default:
      return mcqInt(
        "Carta menunjukkan bilangan buku yang dibaca. Berapakah BEZA antara yang paling banyak dengan paling sedikit?",
        Math.max(...counts) - Math.min(...counts),
        4,
        visual
      );
  }
}

/* ---------- API awam ---------- */

export function generate(topic, difficulty) {
  const d = Math.min(3, Math.max(1, difficulty));
  switch (topic.kind) {
    case "NOMBOR": return nombor(topic.year, d);
    case "TAMBAH": return tambah(topic.year, d);
    case "TOLAK": return tolak(topic.year, d);
    case "DARAB": return darab(topic.year, d);
    case "BAHAGI": return bahagi(topic.year, d);
    case "OPERASI": return operasi(d);
    case "PECAHAN": return pecahan(topic.year, d);
    case "PERPULUHAN": return perpuluhan(d);
    case "PERATUS": return peratus(d);
    case "WANG": return wang(topic.year, d);
    case "MASA": return masa(topic.year, d);
    case "UKURAN": return ukuran(topic.year, d);
    case "RUANG": return ruang(topic.year, d);
    case "KOORDINAT": return koordinat(d);
    case "NISBAH": return nisbah(d);
    case "DATA": return dataQ(topic.year, d);
    default: return nombor(topic.year, d);
  }
}

export const _internal = { rnd, fmt, rm, dec1, dec2, pick, shuffled };
