/* Penyegerakan kemajuan dengan Google Sheet (melalui Google Apps Script).
 *
 * Prinsip: peranti dahulu (local-first). Semua kemajuan sentiasa disimpan
 * dalam peranti, jadi permainan tidak pernah terhenti walaupun tiada internet.
 * Penyegerakan berlaku di latar belakang; jika gagal, ia dicuba semula
 * kemudian tanpa mengganggu anak yang sedang bermain.
 */

import { SHEET_URL } from "./config.js";
import { store } from "./store.js";

const AKAUN_KEY = "matematik_ceria_akaun";
const TERTUNGGU_KEY = "matematik_ceria_tertunggu";

export const syncEnabled = () => typeof SHEET_URL === "string" && SHEET_URL.startsWith("http");

/* ---------- Akaun tersimpan pada peranti ---------- */

export function akaun() {
  try {
    const raw = localStorage.getItem(AKAUN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function simpanAkaun(a) {
  try {
    if (a) localStorage.setItem(AKAUN_KEY, JSON.stringify(a));
    else localStorage.removeItem(AKAUN_KEY);
  } catch (e) { /* abaikan */ }
}

const adaTertunggu = () => localStorage.getItem(TERTUNGGU_KEY) === "1";
const tandaTertunggu = (v) => {
  try {
    if (v) localStorage.setItem(TERTUNGGU_KEY, "1");
    else localStorage.removeItem(TERTUNGGU_KEY);
  } catch (e) { /* abaikan */ }
};

/* ---------- Panggilan ke Apps Script ---------- */

/**
 * Guna Content-Type text/plain supaya pelayar menghantar terus tanpa
 * permintaan preflight — Apps Script tidak menyokong preflight CORS.
 */
async function panggil(body, timeoutMs = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      redirect: "follow",
      signal: ctrl.signal
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!data || data.ok !== true) throw new Error((data && data.error) || "Gagal");
    return data;
  } finally {
    clearTimeout(t);
  }
}

/* ---------- Operasi utama ---------- */

const bersihNama = (s) => String(s || "").trim().replace(/\s+/g, " ").slice(0, 40);

/** Log masuk atau daftar. Kemajuan tempatan digabungkan dengan yang di awan. */
export async function logMasuk(nama, pin) {
  nama = bersihNama(nama);
  pin = String(pin || "").trim();

  if (nama.length < 2) throw new Error("Sila taip nama (sekurang-kurangnya 2 huruf).");
  if (!/^\d{4}$/.test(pin)) throw new Error("PIN mesti tepat 4 angka.");

  const res = await panggil({
    action: "masuk",
    nama,
    pin,
    data: store.snapshot()
  });

  store.applyRemote(res.data || {});
  simpanAkaun({ nama, pin });
  tandaTertunggu(false);
  return { nama, baharu: !!res.baharu };
}

/** Keluar dari akaun. Kemajuan kekal pada peranti ini. */
export function logKeluar() {
  simpanAkaun(null);
  tandaTertunggu(false);
}

/** Hantar keadaan semasa ke awan dan terima keadaan yang telah digabungkan. */
export async function tolak() {
  const a = akaun();
  if (!a || !syncEnabled()) return false;
  const res = await panggil({
    action: "simpan",
    nama: a.nama,
    pin: a.pin,
    data: store.snapshot()
  });
  store.applyRemote(res.data || {});
  tandaTertunggu(false);
  return true;
}

/* ---------- Penjadualan automatik ---------- */

let tunda = null;
let sedangHantar = false;
let pendengar = null;

/** Dipanggil setiap kali kemajuan berubah. Disatukan supaya tidak spam. */
export function jadualTolak(lengahMs = 2500) {
  if (!akaun() || !syncEnabled()) return;
  tandaTertunggu(true);
  lapor();
  clearTimeout(tunda);
  tunda = setTimeout(hantarSekarang, lengahMs);
}

async function hantarSekarang() {
  if (sedangHantar || !akaun() || !syncEnabled()) return;
  if (!navigator.onLine) return; // cuba lagi bila internet kembali
  sedangHantar = true;
  lapor();
  try {
    await tolak();
  } catch (e) {
    tandaTertunggu(true); // kekal tertunggu, cuba lagi nanti
  } finally {
    sedangHantar = false;
    lapor();
  }
}

function lapor() {
  if (pendengar) pendengar(status());
}

export function status() {
  if (!syncEnabled() || !akaun()) return { keadaan: "mati" };
  if (sedangHantar) return { keadaan: "menghantar" };
  if (adaTertunggu()) return { keadaan: navigator.onLine ? "menunggu" : "luar-talian" };
  return { keadaan: "selamat" };
}

export function bilaBerubah(fn) {
  pendengar = fn;
}

/**
 * Sambung semula bila internet kembali, dan cuba hantar yang tertunggu.
 * `onMasuk` dipanggil selepas kemajuan dari peranti lain berjaya ditarik,
 * supaya skrin boleh dilukis semula dengan bintang terkini.
 */
export function mulakan(onMasuk) {
  if (!syncEnabled()) return;
  window.addEventListener("online", () => {
    if (adaTertunggu()) hantarSekarang();
    else lapor();
  });
  window.addEventListener("offline", lapor);

  // Simpan sebelum tab ditutup, jika sempat.
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && adaTertunggu()) hantarSekarang();
  });

  if (akaun()) {
    // Tarik kemajuan terkini dari peranti lain sebaik sahaja dibuka.
    tolak()
      .then(() => { if (onMasuk) onMasuk(); })
      .catch(() => tandaTertunggu(true));
  }
}
