/* Matematik Ceria — logik aplikasi web (port daripada MainActivity + Screens.kt) */

import { APP_VERSION } from "./config.js";
import { Syllabus, generate } from "./engine.js";
import { store, Badges, AvatarShop } from "./store.js";
import { renderVisual, esc } from "./visuals.js";
import * as sync from "./sync.js";
import {
  ICON, WARNA_TAHUN, barisBintang, bintang, ikonKunci, ikonTopik,
  latarHias, lencana, maskot, warnaTopik
} from "./art.js";

const app = document.getElementById("app");
const TOTAL_Q = 10;

/* ---------- Tema warna mengikut tahun ---------- */

const TEMA_ASAS = { a: "#6D5BF6", b: "#B06AF0" };

function setTema(year) {
  const c = year ? WARNA_TAHUN[year] : TEMA_ASAS;
  document.body.style.setProperty("--tema-a", c.a);
  document.body.style.setProperty("--tema-b", c.b);
}

/* ---------- Confetti ---------- */

const WARNA_CONFETTI = ["#FFC93C", "#FF5C74", "#16C172", "#29C5EC", "#A855F7", "#FF9A1F"];

function confetti(bilangan = 70) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const kotak = document.createElement("div");
  kotak.className = "confetti";
  let html = "";
  for (let i = 0; i < bilangan; i++) {
    const kiri = Math.random() * 100;
    const warna = WARNA_CONFETTI[i % WARNA_CONFETTI.length];
    const lama = 2.2 + Math.random() * 1.8;
    const tunda = Math.random() * 0.9;
    const lebar = 6 + Math.random() * 7;
    html += `<i style="left:${kiri.toFixed(1)}%;background:${warna};
      width:${lebar.toFixed(0)}px;height:${(lebar * 1.6).toFixed(0)}px;
      animation-duration:${lama.toFixed(2)}s;animation-delay:${tunda.toFixed(2)}s"></i>`;
  }
  kotak.innerHTML = html;
  document.body.appendChild(kotak);
  later(() => kotak.remove(), 4600);
}

/* ---------- Navigasi ---------- */

let screen = { name: "home" };
let timers = [];

function clearTimers() {
  timers.forEach((t) => clearTimeout(t) || clearInterval(t));
  timers = [];
}
const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

function go(s, push = true) {
  clearTimers();
  screen = s;
  if (push) history.pushState(s, "", "#" + hashOf(s));
  render();
}

function hashOf(s) {
  switch (s.name) {
    case "home": return "";
    case "years": return s.forChallenge ? "cabaran" : "belajar";
    case "map": return "tahun/" + s.year;
    case "quiz": return "kuiz/" + s.topicId + "/" + s.difficulty;
    case "challenge": return "cabaran/" + s.year;
    case "shop": return "kedai";
    case "badges": return "lencana";
    case "login": return "masuk";
    default: return "";
  }
}

window.addEventListener("popstate", (e) => {
  clearTimers();
  screen = e.state || { name: "home" };
  render();
});

/* Pintasan PWA (#belajar, #cabaran) hanya menukar hash. Jika aplikasi sudah
   terbuka, popstate tidak berlaku — jadi kita dengar hashchange juga. */
window.addEventListener("hashchange", () => {
  const s = screenFromHash();
  if (hashOf(s) === hashOf(screen)) return;
  clearTimers();
  screen = s;
  render();
});

function back() {
  history.back();
}

/* ---------- Komponen kongsi ---------- */

const chip = (isi) => `<span class="chip">${isi}</span>`;

const header = (title) => `
  <div class="hdr">
    <button class="back" data-act="back" aria-label="Kembali">${ICON.kembali()}</button>
    <h2>${esc(title)}</h2>
  </div>`;

const bigBtn = (label, cls, act, extra = "", ikon = "") =>
  `<button class="big ${cls}" data-act="${act}" ${extra}>${ikon}<span>${esc(label)}</span></button>`;

const kotakBintang = () => `<span class="bintang-kotak">${bintang(true)}</span>`;

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  later(() => el.remove(), 2200);
}

/* ---------- Skrin: Laman Utama ---------- */

/** Titik status kecil di sebelah nama: hijau = tersimpan, kuning = menunggu. */
const titik = (warna, denyut = false) =>
  `<svg class="art ui" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="${warna}"${
    denyut ? ' class="mc-denyut"' : ""
  }/></svg>`;

const IKON_SYNC = {
  selamat: titik("#4ADE80"),
  menghantar: titik("#FFD166", true),
  menunggu: titik("#FFD166"),
  "luar-talian": titik("#CBD5E1")
};

const LABEL_SYNC = {
  selamat: "Kemajuan tersimpan",
  menghantar: "Sedang menyimpan…",
  menunggu: "Menunggu untuk simpan",
  "luar-talian": "Luar talian — akan simpan nanti"
};

/** Butang akaun di penjuru atas kiri. */
function akaunChip() {
  if (!sync.syncEnabled()) return `<span class="chip kosong"></span>`;
  const a = sync.akaun();
  if (!a) {
    return `<button class="chip akaun masuk" data-act="nav-login">${ICON.kunciUi()} Log masuk</button>`;
  }
  const s = sync.status();
  return `<button class="chip akaun" id="akaunChip" data-act="nav-login"
    title="${esc(LABEL_SYNC[s.keadaan] || "")}">
    ${ICON.orang()} ${esc(a.nama)} <span class="state">${IKON_SYNC[s.keadaan] || ""}</span>
  </button>`;
}

function homeView() {
  return `
  ${latarHias()}
  <div class="wrap center">
    <div class="topbar">
      ${akaunChip()}
      <div class="topbar-kanan">
        ${chip(ICON.api() + " " + store.streak() + " hari")}
        ${chip(kotakBintang() + " " + store.balance())}
      </div>
    </div>
    <div class="maskot-kotak">${maskot(store.equipped())}</div>
    <h1>Matematik Ceria</h1>
    <p class="sub">Jom belajar sambil bermain!</p>
    <div class="stack">
      ${bigBtn("Mula Belajar", "green", "nav-belajar", "", ICON.belajar())}
      ${bigBtn("Cabaran Masa", "orange", "nav-cabaran", "", ICON.cabaran())}
      ${bigBtn("Lencana Saya", "blue", "nav-lencana", "", ICON.lencanaUi())}
      ${bigBtn("Kedai Avatar", "red", "nav-kedai", "", ICON.kedai())}
    </div>
    <p class="versi">Versi ${esc(APP_VERSION)}</p>
  </div>`;
}

/* ---------- Skrin: Log Masuk ---------- */

let loginRalat = "";
let loginSibuk = false;

function loginView() {
  const a = sync.akaun();
  if (a) {
    return `
    <div class="wrap">
      ${header("Akaun")}
      <div class="panel">
        <p class="p-besar">${ICON.orang()} ${esc(a.nama)}</p>
        <p class="p-kecil">Kemajuan disimpan secara automatik. Log masuk dengan nama
        dan PIN yang sama pada telefon atau tablet lain untuk teruskan di situ.</p>
      </div>
      <div class="stack">
        ${bigBtn("Simpan sekarang", "green", "sync-now", "", ICON.simpan())}
        ${bigBtn("Log keluar", "red", "logout", "", ICON.keluar())}
      </div>
      <p class="p-kecil pusat">Log keluar tidak memadam kemajuan pada peranti ini.</p>
    </div>`;
  }
  return `
  <div class="wrap">
    ${header("Log Masuk")}
    <div class="panel">
      <p class="p-kecil">Taip nama dan PIN 4 angka. Gunakan yang sama pada setiap
      peranti supaya bintang dan lencana ikut ke mana-mana. Kali pertama menaip
      nama baharu akan terus mendaftarkannya.</p>
    </div>
    <label class="medan">
      <span>Nama</span>
      <input id="inNama" type="text" autocomplete="off" placeholder="Contoh: Aisyah" maxlength="40">
    </label>
    <label class="medan">
      <span>PIN 4 angka</span>
      <input id="inPin" type="tel" inputmode="numeric" autocomplete="off" placeholder="Contoh: 2018" maxlength="4">
    </label>
    ${loginRalat ? `<p class="ralat">${esc(loginRalat)}</p>` : ""}
    <div class="stack">
      ${bigBtn(loginSibuk ? "Sila tunggu…" : "Masuk", "green", "do-login",
        loginSibuk ? "disabled" : "", loginSibuk ? "" : ICON.betul())}
    </div>
    <p class="p-kecil pusat">Ingat PIN itu. Tiada cara memulihkannya jika lupa —
    tetapi kemajuan pada peranti ini tetap selamat.</p>
  </div>`;
}

async function doLogin() {
  const nama = (document.getElementById("inNama") || {}).value || "";
  const pin = (document.getElementById("inPin") || {}).value || "";
  loginRalat = "";
  loginSibuk = true;
  render();
  try {
    const r = await sync.logMasuk(nama, pin);
    loginSibuk = false;
    go({ name: "home" });
    toast(r.baharu ? `Akaun ${r.nama} dicipta 🎉` : `Selamat kembali, ${r.nama}! 👋`);
  } catch (e) {
    loginSibuk = false;
    loginRalat = e && e.message ? e.message : "Gagal log masuk. Semak internet.";
    render();
  }
}

/* ---------- Skrin: Pilih Tahun ---------- */

function yearsView(forChallenge) {
  let rows = "";
  for (let y = 1; y <= 6; y++) {
    const topics = Syllabus.topics[y];
    const jum = topics.length * 3;
    const earned = topics.reduce((a, t) => a + store.stars(t.id), 0);
    const pct = Math.round((earned / jum) * 100);
    const c = WARNA_TAHUN[y];
    rows += `
      <button class="card kad-tahun" data-act="year" data-y="${y}"
        style="--ca:${c.a};--cb:${c.b}">
        <span class="lencana-tahun">${y}</span>
        <span class="t-body" style="flex:1">
          <span class="card-title">Tahun ${y}</span>
          <span class="tumbuh"><i style="width:${pct}%"></i></span>
        </span>
        <span class="card-meta">${kotakBintang()} ${earned}/${jum}</span>
      </button>`;
  }
  return `
  ${latarHias()}
  <div class="wrap">
    ${header(forChallenge ? "Cabaran Masa" : "Pilih Tahun")}
    ${forChallenge
      ? `<p class="white-b">Skor terbaik: ${store.bestChallenge()} ${kotakBintang()}</p>`
      : ""}
    <div class="senarai-tahun masuk-berperingkat">${rows}</div>
  </div>`;
}

/* ---------- Skrin: Peta Topik ---------- */

function mapView(year) {
  const topics = Syllabus.topics[year];
  const items = topics
    .map((t, i) => {
      const unlocked = i === 0 || store.stars(topics[i - 1].id) > 0;
      const s = store.stars(t.id);
      return `
      <div class="map-row ${i % 2 === 0 ? "left" : "right"}">
        <button class="card topic ${unlocked ? "" : "locked"}" data-act="topic" data-id="${t.id}" ${unlocked ? "" : "disabled"}>
          <span class="ikon-kotak">${unlocked ? ikonTopik(t.kind) : ikonKunci()}</span>
          <span class="t-body">
            <span class="card-title">${esc(t.name)}</span>
            ${barisBintang(s)}
          </span>
        </button>
      </div>`;
    })
    .join("");
  return `
  ${latarHias()}
  <div class="wrap">
    ${header("Tahun " + year)}
    <div class="map masuk-berperingkat">${items}</div>
  </div>`;
}

function difficultyDialog(topic) {
  return `
  <div class="modal-bg" data-act="close-modal">
    <div class="modal" role="dialog" aria-modal="true">
      <div class="ikon-kotak">${ikonTopik(topic.kind)}</div>
      <h3>${esc(topic.name)}</h3>
      <p>Pilih tahap kesukaran:</p>
      <div class="stack">
        ${bigBtn("Mudah", "green", "start", `data-id="${topic.id}" data-d="1"`)}
        ${bigBtn("Sederhana", "orange", "start", `data-id="${topic.id}" data-d="2"`)}
        ${bigBtn("Sukar", "red", "start", `data-id="${topic.id}" data-d="3"`)}
      </div>
      <button class="link" data-act="close-modal">Batal</button>
    </div>
  </div>`;
}

/* ---------- Kad soalan ---------- */

function questionCard(q, selected) {
  const opts = q.options
    .map((opt, i) => {
      let cls = "opt";
      if (selected !== -1) {
        if (i === q.answerIndex) cls += " correct";
        else if (i === selected) cls += " wrong";
        else cls += " dim";
      }
      return `<button class="${cls}" data-act="answer" data-i="${i}" ${selected !== -1 ? "disabled" : ""}>${esc(opt)}</button>`;
    })
    .join("");
  return `
    <div class="qcard">
      <p class="qtext">${esc(q.text)}</p>
      ${q.visual ? `<div class="vwrap">${renderVisual(q.visual)}</div>` : ""}
    </div>
    <div class="opts">${opts}</div>`;
}

/* ---------- Skrin: Kuiz ---------- */

let quiz = null;

function newQuizState(topic, difficulty) {
  return {
    topic,
    difficulty,
    qIndex: 0,
    correct: 0,
    selected: -1,
    question: generate(topic, difficulty),
    finished: false,
    outcome: null
  };
}

function startQuiz(topicId, difficulty) {
  const topic = Syllabus.byId(topicId);
  quiz = newQuizState(topic, difficulty);
  go({ name: "quiz", topicId, difficulty });
}

/** Main semula tanpa menambah entri sejarah baharu. */
function retryQuiz() {
  clearTimers();
  quiz = newQuizState(quiz.topic, quiz.difficulty);
  render();
}

function quizView() {
  if (!quiz) return homeView();
  if (quiz.finished && quiz.outcome) {
    const r = quiz.outcome;
    const msg =
      r.stars >= 3 ? "Hebat! Kamu memang juara!"
      : r.stars === 2 ? "Bagus sekali! Sikit lagi!"
      : r.stars === 1 ? "Usaha yang baik! Teruskan!"
      : "Jangan putus asa, cuba lagi!";
    return `
    ${latarHias()}
    <div class="wrap center mid">
      <div class="hasil-muka">${maskot(store.equipped())}</div>
      <div class="score">${quiz.correct} / ${TOTAL_Q}</div>
      <div class="baris-bintang besar">${barisBintang(r.stars, true)}</div>
      <p class="white-b">${esc(msg)}</p>
      ${badgePanel(r.newBadges)}
      <div class="stack">
        ${bigBtn("Main Lagi", "green", "quiz-retry", "", ICON.ulang())}
        ${bigBtn("Kembali ke Peta", "blue", "quiz-exit", "", ICON.peta())}
      </div>
    </div>`;
  }
  const pct = Math.round((quiz.qIndex / TOTAL_Q) * 100);
  const betul = quiz.selected === quiz.question.answerIndex;
  const fb =
    quiz.selected === -1
      ? ""
      : betul
      ? `<p class="fb ok">${ICON.betul("#8CF5B8")} Betul! Syabas!</p>`
      : `<p class="fb no">${ICON.salah("#FFB3BE")} Jawapan betul: ${esc(quiz.question.options[quiz.question.answerIndex])}</p>`;
  return `
  <div class="wrap">
    <div class="row spread qhead">
      <button class="back small" data-act="back" aria-label="Keluar kuiz">${ICON.tutup()}</button>
      <span class="qtopic">${esc(quiz.topic.name)}</span>
      <span class="qcount">${quiz.qIndex + 1}/${TOTAL_Q}</span>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    ${questionCard(quiz.question, quiz.selected)}
    ${fb}
  </div>`;
}

function badgePanel(list) {
  if (!list || !list.length) return "";
  return `<div class="badge-panel"><strong>Lencana Baharu!</strong>${list
    .map(
      (b) => `<div class="badge-baris">
        <span class="lencana-kotak">${lencana(b.id, true)}</span>
        <span>${esc(b.name)}</span>
      </div>`
    )
    .join("")}</div>`;
}

function answerQuiz(i) {
  if (quiz.selected !== -1) return;
  quiz.selected = i;
  if (i === quiz.question.answerIndex) quiz.correct++;
  render();
  later(() => {
    if (quiz.qIndex >= TOTAL_Q - 1) {
      quiz.finished = true;
      quiz.outcome = store.recordQuiz(quiz.topic.id, quiz.correct, quiz.difficulty, TOTAL_Q);
      if (quiz.outcome.stars >= 3) later(() => confetti(90), 350);
      else if (quiz.outcome.newBadges.length) later(() => confetti(50), 350);
    } else {
      quiz.qIndex++;
      quiz.question = generate(quiz.topic, quiz.difficulty);
      quiz.selected = -1;
    }
    render();
  }, 1000);
}

/* ---------- Skrin: Cabaran Masa ---------- */

let chal = null;

function newChalState(year) {
  const topics = Syllabus.topics[year];
  return {
    year,
    topics,
    timeLeft: 60,
    score: 0,
    selected: -1,
    question: generate(topics[Math.floor(Math.random() * topics.length)], 1),
    done: false,
    outcome: null
  };
}

function startChallenge(year) {
  chal = newChalState(year);
  go({ name: "challenge", year });
  tickChallenge();
}

/** Cuba lagi tanpa menambah entri sejarah baharu. */
function retryChallenge() {
  clearTimers();
  chal = newChalState(chal.year);
  render();
  tickChallenge();
}

function tickChallenge() {
  const id = setInterval(() => {
    if (!chal || chal.done) { clearInterval(id); return; }
    chal.timeLeft--;
    if (chal.timeLeft <= 0) {
      chal.timeLeft = 0;
      chal.done = true;
      chal.outcome = store.recordChallenge(chal.score);
      clearInterval(id);
      render();
    } else if (screen.name === "challenge") {
      const el = document.getElementById("masaTeks");
      if (el) el.textContent = chal.timeLeft + " s";
    }
  }, 1000);
  timers.push(id);
}

function challengeView() {
  if (!chal) return homeView();
  if (chal.done && chal.outcome) {
    const o = chal.outcome;
    return `
    ${latarHias()}
    <div class="wrap center mid">
      <div class="hasil-muka">${maskot(store.equipped())}</div>
      <h1>Masa Tamat!</h1>
      <p class="white-b big-txt">Skor: ${o.score}</p>
      <p class="white-b">Terbaik: ${o.best}</p>
      <p class="gold">${kotakBintang()} +${o.gained} bintang</p>
      ${badgePanel(o.newBadges)}
      <div class="stack">
        ${bigBtn("Cuba Lagi", "green", "chal-retry", "", ICON.ulang())}
        ${bigBtn("Laman Utama", "blue", "nav-home", "", ICON.rumah())}
      </div>
    </div>`;
  }
  return `
  <div class="wrap">
    <div class="row spread">
      <button class="back small" data-act="back" aria-label="Keluar cabaran">${ICON.tutup()}</button>
      <span class="chip">${ICON.jam()} <span id="masaTeks">${chal.timeLeft} s</span></span>
      <span class="chip">${kotakBintang()} ${chal.score}</span>
    </div>
    ${questionCard(chal.question, chal.selected)}
  </div>`;
}

function answerChallenge(i) {
  if (chal.selected !== -1 || chal.done) return;
  chal.selected = i;
  if (i === chal.question.answerIndex) chal.score++;
  render();
  later(() => {
    if (!chal || chal.done) return;
    const diff = chal.score < 5 ? 1 : chal.score < 10 ? 2 : 3;
    chal.question = generate(chal.topics[Math.floor(Math.random() * chal.topics.length)], diff);
    chal.selected = -1;
    render();
  }, 400);
}

/* ---------- Skrin: Kedai Avatar ---------- */

function shopView() {
  const grid = AvatarShop.all
    .map((item) => {
      const owned = store.owns(item.id);
      const equipped = store.equipped() === item.id;
      const label = equipped
        ? "Dipakai"
        : owned
        ? "Pakai"
        : `${kotakBintang()} ${item.cost}`;
      return `
      <button class="shop-item ${equipped ? "eq" : ""}" data-act="shop" data-id="${item.id}">
        <span class="maskot-kotak">${maskot(item.id, equipped)}</span>
        <span class="s-name">${esc(item.name)}</span>
        <span class="s-cost">${label}</span>
      </button>`;
    })
    .join("");
  return `
  ${latarHias()}
  <div class="wrap">
    ${header("Kedai Avatar")}
    <p class="white-b">Baki bintang: ${kotakBintang()} ${store.balance()}</p>
    <div class="grid3">${grid}</div>
  </div>`;
}

/* ---------- Skrin: Lencana ---------- */

function badgesView() {
  const earned = Badges.all.filter((b) => store.hasBadge(b.id)).length;
  const grid = Badges.all
    .map((b) => {
      const ada = store.hasBadge(b.id);
      return `
      <div class="badge ${ada ? "" : "off"}">
        <span class="lencana-kotak">${lencana(b.id, ada)}</span>
        <span class="b-name">${esc(b.name)}</span>
        <span class="b-desc">${esc(b.desc)}</span>
      </div>`;
    })
    .join("");
  return `
  ${latarHias()}
  <div class="wrap">
    ${header("Lencana Saya")}
    <p class="white-b">${earned} / ${Badges.all.length} diperoleh</p>
    <div class="grid2">${grid}</div>
  </div>`;
}

/* ---------- Render ---------- */

let modal = null;

/** Tukar warna latar mengikut skrin supaya setiap tahun ada identitinya. */
function temaUntukSkrin() {
  switch (screen.name) {
    case "map": return screen.year;
    case "challenge": return chal ? chal.year : null;
    case "quiz": return quiz ? quiz.topic.year : null;
    default: return null;
  }
}

function render() {
  let html;
  switch (screen.name) {
    case "years": html = yearsView(screen.forChallenge); break;
    case "map": html = mapView(screen.year); break;
    case "quiz": html = quizView(); break;
    case "challenge": html = challengeView(); break;
    case "shop": html = shopView(); break;
    case "badges": html = badgesView(); break;
    case "login": html = loginView(); break;
    default: html = homeView();
  }
  setTema(temaUntukSkrin());
  app.innerHTML = html + (modal ? difficultyDialog(modal) : "");
  window.scrollTo(0, 0);
}

/* ---------- Pengendali klik ---------- */

app.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const act = el.dataset.act;
  switch (act) {
    case "back": back(); break;
    case "nav-home": go({ name: "home" }); break;
    case "nav-belajar": go({ name: "years", forChallenge: false }); break;
    case "nav-cabaran": go({ name: "years", forChallenge: true }); break;
    case "nav-lencana": go({ name: "badges" }); break;
    case "nav-kedai": go({ name: "shop" }); break;
    case "nav-login": loginRalat = ""; go({ name: "login" }); break;
    case "do-login": doLogin(); break;
    case "logout":
      sync.logKeluar();
      go({ name: "home" });
      toast("Sudah log keluar. Kemajuan kekal di peranti ini.");
      break;
    case "sync-now":
      toast("Menyimpan…");
      sync.tolak()
        .then(() => toast("Kemajuan tersimpan ✅"))
        .catch(() => toast("Gagal menyimpan. Semak internet."));
      break;
    case "year": {
      const y = +el.dataset.y;
      if (screen.forChallenge) startChallenge(y);
      else go({ name: "map", year: y });
      break;
    }
    case "topic": modal = Syllabus.byId(el.dataset.id); render(); break;
    case "close-modal": {
      const inside = e.target.closest(".modal");
      const isCancel = e.target.closest("button.link");
      if (inside && !isCancel) return;
      modal = null;
      render();
      break;
    }
    case "start": modal = null; startQuiz(el.dataset.id, +el.dataset.d); break;
    case "answer":
      if (screen.name === "quiz") answerQuiz(+el.dataset.i);
      else if (screen.name === "challenge") answerChallenge(+el.dataset.i);
      break;
    case "quiz-retry": retryQuiz(); break;
    case "quiz-exit": back(); break;
    case "chal-retry": retryChallenge(); break;
    case "shop": {
      const item = AvatarShop.all.find((x) => x.id === el.dataset.id);
      const milikSebelum = store.owns(item.id);
      if (milikSebelum) store.equip(item.id);
      else if (!store.buy(item)) toast("Bintang tidak cukup! Main kuiz untuk kumpul bintang.");
      else { toast(`${item.name} kini milik kamu!`); confetti(45); }
      render();
      break;
    }
  }
});

/* ---------- PWA: kemas kini automatik ----------
 * Service worker mengambil fail dari rangkaian dahulu, jadi setiap kali ada
 * internet peranti terus dapat versi terbaharu. Di sini kita hanya memastikan
 * sw.js itu sendiri turut disemak — semasa dibuka dan setiap sejam selepas itu.
 */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("./sw.js");
      reg.update().catch(() => {});
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") reg.update().catch(() => {});
      });
    } catch (e) {
      /* luar talian atau tidak disokong — aplikasi tetap berjalan */
    }
  });
}

/* ---------- Mula ---------- */

function screenFromHash() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (h === "belajar") return { name: "years", forChallenge: false };
  if (h === "cabaran") return { name: "years", forChallenge: true };
  if (h === "kedai") return { name: "shop" };
  if (h === "lencana") return { name: "badges" };
  if (h === "masuk") return { name: "login" };
  const m = h.match(/^tahun\/([1-6])$/);
  if (m) return { name: "map", year: +m[1] };
  return { name: "home" };
}

// Setiap perubahan kemajuan dijadualkan untuk disimpan ke awan.
store.onChange = () => sync.jadualTolak();

// Kemas kini teks status tanpa melukis semula skrin (supaya taipan tidak hilang).
sync.bilaBerubah(() => {
  const el = document.getElementById("akaunChip");
  if (el && screen.name === "home") {
    const s = sync.status();
    const state = el.querySelector(".state");
    if (state) state.innerHTML = IKON_SYNC[s.keadaan] || "";
    el.title = LABEL_SYNC[s.keadaan] || "";
  }
});

sync.mulakan(() => {
  if (screen.name === "home" || screen.name === "map" || screen.name === "years") render();
});

screen = screenFromHash();
history.replaceState(screen, "", "#" + hashOf(screen));
render();

// Untuk ujian automatik
window.__MC__ = { Syllabus, generate, store };
