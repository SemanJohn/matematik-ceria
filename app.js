/* Matematik Ceria — logik aplikasi web (port daripada MainActivity + Screens.kt) */

import { Syllabus, generate } from "./engine.js";
import { store, Badges, AvatarShop } from "./store.js";
import { renderVisual, esc } from "./visuals.js";

const app = document.getElementById("app");
const TOTAL_Q = 10;

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
    default: return "";
  }
}

window.addEventListener("popstate", (e) => {
  clearTimers();
  screen = e.state || { name: "home" };
  render();
});

function back() {
  history.back();
}

/* ---------- Komponen kongsi ---------- */

const chip = (t) => `<span class="chip">${esc(t)}</span>`;

const header = (title) => `
  <div class="hdr">
    <button class="back" data-act="back" aria-label="Kembali">←</button>
    <h2>${esc(title)}</h2>
  </div>`;

const bigBtn = (label, cls, act, extra = "") =>
  `<button class="big ${cls}" data-act="${act}" ${extra}>${esc(label)}</button>`;

function starRow(n, max = 3) {
  let s = "";
  for (let i = 0; i < max; i++) s += i < n ? "⭐" : "☆";
  return s;
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  later(() => el.remove(), 2200);
}

/* ---------- Skrin: Laman Utama ---------- */

function homeView() {
  return `
  <div class="wrap center">
    <div class="row spread">
      ${chip("🔥 " + store.streak() + " hari")}
      ${chip("⭐ " + store.balance())}
    </div>
    <div class="avatar">${store.equippedEmoji()}</div>
    <h1>Matematik Ceria</h1>
    <p class="sub">Jom belajar sambil bermain!</p>
    <div class="stack">
      ${bigBtn("📚  Mula Belajar", "green", "nav-belajar")}
      ${bigBtn("⚡  Cabaran Masa", "orange", "nav-cabaran")}
      ${bigBtn("🏅  Lencana Saya", "blue", "nav-lencana")}
      ${bigBtn("🛍️  Kedai Avatar", "red", "nav-kedai")}
    </div>
    <button class="link" data-act="pasang" hidden id="installBtn">📲 Pasang aplikasi ini</button>
  </div>`;
}

/* ---------- Skrin: Pilih Tahun ---------- */

function yearsView(forChallenge) {
  let rows = "";
  for (let y = 1; y <= 6; y++) {
    const topics = Syllabus.topics[y];
    const earned = topics.reduce((a, t) => a + store.stars(t.id), 0);
    rows += `
      <button class="card row spread" data-act="year" data-y="${y}">
        <span class="card-title">🎒 Tahun ${y}</span>
        <span class="card-meta">⭐ ${earned}/${topics.length * 3}</span>
      </button>`;
  }
  return `
  <div class="wrap">
    ${header(forChallenge ? "⚡ Cabaran Masa" : "📚 Pilih Tahun")}
    ${forChallenge ? `<p class="white-b">Skor terbaik: ${store.bestChallenge()} ⭐</p>` : ""}
    ${rows}
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
          <span class="t-emoji">${unlocked ? t.emoji : "🔒"}</span>
          <span class="t-body">
            <span class="card-title">${esc(t.name)}</span>
            <span class="t-stars">${starRow(s)}</span>
          </span>
        </button>
      </div>`;
    })
    .join("");
  return `<div class="wrap">${header("🗺️ Tahun " + year)}<div class="map">${items}</div></div>`;
}

function difficultyDialog(topic) {
  return `
  <div class="modal-bg" data-act="close-modal">
    <div class="modal" role="dialog" aria-modal="true">
      <h3>${topic.emoji} ${esc(topic.name)}</h3>
      <p>Pilih tahap kesukaran:</p>
      <div class="stack">
        ${bigBtn("🟢 Mudah", "green", "start", `data-id="${topic.id}" data-d="1"`)}
        ${bigBtn("🟡 Sederhana", "orange", "start", `data-id="${topic.id}" data-d="2"`)}
        ${bigBtn("🔴 Sukar", "red", "start", `data-id="${topic.id}" data-d="3"`)}
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
    const face = r.stars >= 3 ? "🏆" : r.stars === 2 ? "🎉" : r.stars === 1 ? "😊" : "💪";
    const msg =
      r.stars >= 3 ? "Hebat! Kamu memang juara!"
      : r.stars === 2 ? "Bagus sekali! Sikit lagi!"
      : r.stars === 1 ? "Usaha yang baik! Teruskan!"
      : "Jangan putus asa, cuba lagi!";
    return `
    <div class="wrap center mid">
      <div class="avatar">${face}</div>
      <div class="score">${quiz.correct} / ${TOTAL_Q}</div>
      <div class="big-stars">${starRow(r.stars)}</div>
      <p class="white-b">${esc(msg)}</p>
      ${badgePanel(r.newBadges)}
      <div class="stack">
        ${bigBtn("🔁 Main Lagi", "green", "quiz-retry")}
        ${bigBtn("🗺️ Kembali ke Peta", "blue", "quiz-exit")}
      </div>
    </div>`;
  }
  const pct = Math.round((quiz.qIndex / TOTAL_Q) * 100);
  const fb =
    quiz.selected === -1
      ? ""
      : quiz.selected === quiz.question.answerIndex
      ? `<p class="fb ok">🎉 Betul! Syabas!</p>`
      : `<p class="fb no">❌ Jawapan betul: ${esc(quiz.question.options[quiz.question.answerIndex])}</p>`;
  return `
  <div class="wrap">
    <div class="row spread qhead">
      <button class="back small" data-act="back" aria-label="Keluar kuiz">✕</button>
      <span class="qtopic">${quiz.topic.emoji} ${esc(quiz.topic.name)}</span>
      <span class="qcount">${quiz.qIndex + 1}/${TOTAL_Q}</span>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    ${questionCard(quiz.question, quiz.selected)}
    ${fb}
  </div>`;
}

function badgePanel(list) {
  if (!list || !list.length) return "";
  return `<div class="badge-panel"><strong>🎁 Lencana Baharu!</strong>${list
    .map((b) => `<div>${b.emoji} ${esc(b.name)}</div>`)
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
      const el = document.getElementById("timeChip");
      if (el) el.textContent = "⏱️ " + chal.timeLeft + " s";
    }
  }, 1000);
  timers.push(id);
}

function challengeView() {
  if (!chal) return homeView();
  if (chal.done && chal.outcome) {
    const o = chal.outcome;
    return `
    <div class="wrap center mid">
      <div class="avatar">⏱️</div>
      <h1>Masa Tamat!</h1>
      <p class="white-b big-txt">Skor: ${o.score}</p>
      <p class="white-b">Terbaik: ${o.best}</p>
      <p class="gold">⭐ +${o.gained} bintang</p>
      ${badgePanel(o.newBadges)}
      <div class="stack">
        ${bigBtn("🔁 Cuba Lagi", "green", "chal-retry")}
        ${bigBtn("🏠 Laman Utama", "blue", "nav-home")}
      </div>
    </div>`;
  }
  return `
  <div class="wrap">
    <div class="row spread">
      <button class="back small" data-act="back" aria-label="Keluar cabaran">✕</button>
      <span class="chip" id="timeChip">⏱️ ${chal.timeLeft} s</span>
      <span class="chip">⭐ ${chal.score}</span>
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
      const label = equipped ? "Dipakai ✓" : owned ? "Pakai" : "⭐ " + item.cost;
      return `
      <button class="shop-item ${equipped ? "eq" : ""}" data-act="shop" data-id="${item.id}">
        <span class="s-emoji">${item.emoji}</span>
        <span class="s-name">${esc(item.name)}</span>
        <span class="s-cost">${esc(label)}</span>
      </button>`;
    })
    .join("");
  return `
  <div class="wrap">
    ${header("🛍️ Kedai Avatar")}
    <p class="white-b">Baki bintang: ⭐ ${store.balance()}</p>
    <div class="grid3">${grid}</div>
  </div>`;
}

/* ---------- Skrin: Lencana ---------- */

function badgesView() {
  const earned = Badges.all.filter((b) => store.hasBadge(b.id)).length;
  const grid = Badges.all
    .map(
      (b) => `
      <div class="badge ${store.hasBadge(b.id) ? "" : "off"}">
        <span class="b-emoji">${b.emoji}</span>
        <span class="b-name">${esc(b.name)}</span>
        <span class="b-desc">${esc(b.desc)}</span>
      </div>`
    )
    .join("");
  return `
  <div class="wrap">
    ${header("🏅 Lencana Saya")}
    <p class="white-b">${earned} / ${Badges.all.length} diperoleh</p>
    <div class="grid2">${grid}</div>
  </div>`;
}

/* ---------- Render ---------- */

let modal = null;

function render() {
  let html;
  switch (screen.name) {
    case "years": html = yearsView(screen.forChallenge); break;
    case "map": html = mapView(screen.year); break;
    case "quiz": html = quizView(); break;
    case "challenge": html = challengeView(); break;
    case "shop": html = shopView(); break;
    case "badges": html = badgesView(); break;
    default: html = homeView();
  }
  app.innerHTML = html + (modal ? difficultyDialog(modal) : "");
  if (screen.name === "home") setupInstallButton();
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
      if (store.owns(item.id)) store.equip(item.id);
      else if (!store.buy(item)) toast("Bintang tidak mencukupi! Main kuiz untuk kumpul ⭐");
      render();
      break;
    }
    case "pasang": doInstall(); break;
  }
});

/* ---------- PWA: pasang ---------- */

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setupInstallButton();
});

function setupInstallButton() {
  const btn = document.getElementById("installBtn");
  if (btn && deferredPrompt) btn.hidden = false;
}

async function doInstall() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  const btn = document.getElementById("installBtn");
  if (btn) btn.hidden = true;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

/* ---------- Mula ---------- */

function screenFromHash() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (h === "belajar") return { name: "years", forChallenge: false };
  if (h === "cabaran") return { name: "years", forChallenge: true };
  if (h === "kedai") return { name: "shop" };
  if (h === "lencana") return { name: "badges" };
  const m = h.match(/^tahun\/([1-6])$/);
  if (m) return { name: "map", year: +m[1] };
  return { name: "home" };
}

screen = screenFromHash();
history.replaceState(screen, "", "#" + hashOf(screen));
render();

// Untuk ujian automatik
window.__MC__ = { Syllabus, generate, store };
