/* Simpanan kemajuan murid — localStorage (port daripada ProgressStore.kt) */

export const Badges = {
  all: [
    { id: "first_quiz", emoji: "🎯", name: "Permulaan Hebat", desc: "Tamatkan kuiz pertama" },
    { id: "quiz_10", emoji: "📚", name: "Rajin Berlatih", desc: "Tamatkan 10 kuiz" },
    { id: "quiz_50", emoji: "🏆", name: "Juara Latihan", desc: "Tamatkan 50 kuiz" },
    { id: "perfect", emoji: "💯", name: "Skor Penuh", desc: "Dapat 10/10 dalam satu kuiz" },
    { id: "perfect_10", emoji: "🌟", name: "Sentiasa Tepat", desc: "Dapat 10 kali skor penuh" },
    { id: "streak_3", emoji: "🔥", name: "Streak 3 Hari", desc: "Bermain 3 hari berturut-turut" },
    { id: "streak_7", emoji: "⚡", name: "Streak 7 Hari", desc: "Bermain 7 hari berturut-turut" },
    { id: "stars_50", emoji: "✨", name: "Pengumpul Bintang", desc: "Kumpul 50 bintang" },
    { id: "stars_150", emoji: "👑", name: "Raja Bintang", desc: "Kumpul 150 bintang" },
    { id: "challenge_10", emoji: "🚀", name: "Pantas Kilat", desc: "Skor 10+ dalam Cabaran Masa" },
    { id: "challenge_20", emoji: "🛸", name: "Sepantas Cahaya", desc: "Skor 20+ dalam Cabaran Masa" },
    { id: "hard_master", emoji: "🧠", name: "Otak Bijak", desc: "Dapat 3 bintang pada tahap Sukar" }
  ],
  byId(id) {
    return this.all.find((b) => b.id === id) || null;
  }
};

export const AvatarShop = {
  all: [
    { id: "budak", emoji: "🧒", name: "Adik Comel", cost: 0 },
    { id: "kucing", emoji: "🐱", name: "Si Comel", cost: 10 },
    { id: "arnab", emoji: "🐰", name: "Arnab Lincah", cost: 15 },
    { id: "panda", emoji: "🐼", name: "Panda Manja", cost: 20 },
    { id: "singa", emoji: "🦁", name: "Raja Rimba", cost: 30 },
    { id: "robot", emoji: "🤖", name: "Robo Pintar", cost: 40 },
    { id: "dino", emoji: "🦖", name: "Dino Hebat", cost: 50 },
    { id: "unikorn", emoji: "🦄", name: "Unikorn Ajaib", cost: 75 },
    { id: "naga", emoji: "🐉", name: "Naga Sakti", cost: 100 }
  ]
};

const KEY = "matematik_ceria_progress";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    /* storan penuh / mod peribadi — abaikan senyap */
  }
}

const epochDay = () => Math.floor(Date.now() / 86400000 - new Date().getTimezoneOffset() / 1440);

class Store {
  constructor() {
    this.d = load();
    if (!this.d.stars) this.d.stars = {};
    if (!this.d.badges) this.d.badges = [];
    if (!this.d.owned) this.d.owned = [];
  }

  _flush() { save(this.d); }
  _num(k) { return this.d[k] || 0; }

  stars(topicId) { return this.d.stars[topicId] || 0; }

  streak() {
    const today = epochDay();
    const last = this.d.lastDay ?? -10;
    return last >= today - 1 ? this._num("streak") : 0;
  }

  balance() { return this._num("earned") - this._num("spent"); }

  bestChallenge() { return this._num("best_challenge"); }

  hasBadge(id) { return this.d.badges.includes(id); }

  owns(id) { return id === "budak" || this.d.owned.includes(id); }

  equipped() { return this.d.equipped || "budak"; }

  equippedEmoji() {
    const a = AvatarShop.all.find((x) => x.id === this.equipped());
    return a ? a.emoji : "🧒";
  }

  equip(id) {
    if (this.owns(id)) { this.d.equipped = id; this._flush(); }
  }

  buy(item) {
    if (this.owns(item.id)) { this.equip(item.id); return true; }
    if (this.balance() < item.cost) return false;
    this.d.owned.push(item.id);
    this.d.spent = this._num("spent") + item.cost;
    this.d.equipped = item.id;
    this._flush();
    return true;
  }

  recordQuiz(topicId, correct, difficulty, total) {
    const stars =
      correct >= total ? 3 : correct >= total - 2 ? 2 : correct >= total - 4 ? 1 : 0;
    if (stars > this.stars(topicId)) this.d.stars[topicId] = stars;
    this.d.earned = this._num("earned") + stars;
    this.d.quizzes = this._num("quizzes") + 1;
    if (correct >= total) this.d.perfects = this._num("perfects") + 1;
    if (difficulty === 3 && stars === 3) this.d.hard3 = true;
    this._flush();
    this._updateStreak();
    return { stars, newBadges: this._awardBadges() };
  }

  recordChallenge(score) {
    const gained = Math.trunc(score / 3);
    this.d.earned = this._num("earned") + gained;
    if (score > this.bestChallenge()) this.d.best_challenge = score;
    this._flush();
    this._updateStreak();
    return { score, best: this.bestChallenge(), gained, newBadges: this._awardBadges() };
  }

  _updateStreak() {
    const today = epochDay();
    const last = this.d.lastDay ?? -10;
    const cur = this._num("streak");
    this.d.streak = last === today ? Math.max(cur, 1) : last === today - 1 ? cur + 1 : 1;
    this.d.lastDay = today;
    this._flush();
  }

  _awardBadges() {
    const have = new Set(this.d.badges);
    const newOnes = [];
    const give = (id) => {
      if (!have.has(id)) {
        have.add(id);
        const b = Badges.byId(id);
        if (b) newOnes.push(b);
      }
    };
    const quizzes = this._num("quizzes");
    const perfects = this._num("perfects");
    const earned = this._num("earned");
    const streakNow = this._num("streak");
    const best = this.bestChallenge();
    if (quizzes >= 1) give("first_quiz");
    if (quizzes >= 10) give("quiz_10");
    if (quizzes >= 50) give("quiz_50");
    if (perfects >= 1) give("perfect");
    if (perfects >= 10) give("perfect_10");
    if (streakNow >= 3) give("streak_3");
    if (streakNow >= 7) give("streak_7");
    if (earned >= 50) give("stars_50");
    if (earned >= 150) give("stars_150");
    if (best >= 10) give("challenge_10");
    if (best >= 20) give("challenge_20");
    if (this.d.hard3) give("hard_master");
    if (newOnes.length) { this.d.badges = [...have]; this._flush(); }
    return newOnes;
  }

  reset() {
    this.d = { stars: {}, badges: [], owned: [] };
    this._flush();
  }
}

export const store = new Store();
