/**
 * Matematik Ceria — pelayan kemajuan murid di atas Google Sheets.
 *
 * PEMASANGAN (sekali sahaja, lebih kurang 5 minit):
 *
 *  1. Buka https://sheets.new  → namakan hamparan "Matematik Ceria".
 *  2. Menu Extensions → Apps Script.
 *  3. Padam semua kod contoh, tampal SELURUH fail ini, tekan Save (ikon disket).
 *  4. Tekan butang biru "Deploy" → "New deployment".
 *  5. Klik ikon gear di sebelah "Select type" → pilih "Web app".
 *  6. Isi:  Description : matematik-ceria
 *           Execute as  : Me
 *           Who has access : Anyone            ← MESTI "Anyone", bukan "Anyone with Google account"
 *  7. Tekan Deploy → "Authorize access" → pilih akaun Google anda →
 *     "Advanced" → "Go to ... (unsafe)" → "Allow".
 *     (Amaran itu normal: Google memaparkannya untuk semua skrip peribadi
 *      yang belum melalui semakan rasmi mereka. Ini skrip anda sendiri.)
 *  8. Salin "Web app URL" yang berakhir dengan /exec, dan letakkannya dalam
 *     fail config.js aplikasi:   export const SHEET_URL = "https://.../exec";
 *
 * NOTA KESELAMATAN: nama + PIN 4 angka ialah kunci mudah untuk kanak-kanak,
 * bukan keselamatan sebenar. Simpan hanya nama panggilan dan kemajuan
 * matematik di sini — jangan simpan maklumat peribadi.
 */

var NAMA_HELAIAN = 'murid';
var TAJUK = ['kunci', 'nama', 'pin', 'data', 'dikemas_kini'];

/* ---------- Titik masuk ---------- */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return json({ ok: false, error: 'Pelayan sibuk. Cuba lagi.' });
  }
  try {
    var req = JSON.parse(e.postData.contents);
    var nama = bersihNama(req.nama);
    var pin = String(req.pin || '').trim();

    if (nama.length < 2) return json({ ok: false, error: 'Nama terlalu pendek.' });
    if (!/^\d{4}$/.test(pin)) return json({ ok: false, error: 'PIN mesti 4 angka.' });

    if (req.action === 'masuk' || req.action === 'simpan') {
      return json(simpan(nama, pin, req.data || {}));
    }
    return json({ ok: false, error: 'Arahan tidak dikenali.' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json({ ok: true, mesej: 'Matematik Ceria — pelayan aktif.' });
}

/* ---------- Logik utama ---------- */

function simpan(nama, pin, masuk) {
  var sheet = helaian();
  var baris = cariBaris(sheet, kunci(nama));

  if (baris > 0) {
    var sedia = sheet.getRange(baris, 1, 1, TAJUK.length).getValues()[0];
    if (String(sedia[2]) !== pin) {
      return { ok: false, error: 'PIN salah untuk nama ini.' };
    }
    var lama = selamatParse(sedia[3]);
    var gabung = gabungkan(lama, masuk);
    sheet.getRange(baris, 1, 1, TAJUK.length).setValues([
      [kunci(nama), nama, pin, JSON.stringify(gabung), new Date()]
    ]);
    return { ok: true, baharu: false, data: gabung };
  }

  var bersih = gabungkan({}, masuk);
  sheet.appendRow([kunci(nama), nama, pin, JSON.stringify(bersih), new Date()]);
  return { ok: true, baharu: true, data: bersih };
}

/**
 * Gabungan yang sama seperti di dalam aplikasi: ambil nilai tertinggi bagi
 * setiap kiraan dan gabungan penuh bagi senarai. Dua peranti yang dimainkan
 * berasingan akan bercantum, bukan saling menimpa.
 */
function gabungkan(a, b) {
  a = a || {};
  b = b || {};
  function maxN(k) { return Math.max(Number(a[k]) || 0, Number(b[k]) || 0); }

  var stars = {};
  var sumber = [a.stars || {}, b.stars || {}];
  for (var i = 0; i < sumber.length; i++) {
    for (var id in sumber[i]) {
      if (!sumber[i].hasOwnProperty(id)) continue;
      stars[id] = Math.max(stars[id] || 0, Number(sumber[i][id]) || 0);
    }
  }

  var owned = kesatuan(a.owned, b.owned);
  var badges = kesatuan(a.badges, b.badges);

  var spent = 0;
  for (var j = 0; j < owned.length; j++) spent += HARGA[owned[j]] || 0;

  var aDay = a.lastDay === undefined ? -10 : Number(a.lastDay);
  var bDay = b.lastDay === undefined ? -10 : Number(b.lastDay);
  var baru = aDay >= bDay ? a : b;

  return {
    stars: stars,
    owned: owned,
    badges: badges,
    spent: spent,
    earned: maxN('earned'),
    quizzes: maxN('quizzes'),
    perfects: maxN('perfects'),
    best_challenge: maxN('best_challenge'),
    hard3: !!(a.hard3 || b.hard3),
    lastDay: Math.max(aDay, bDay),
    streak: aDay === bDay ? maxN('streak') : Number(baru.streak) || 0,
    equipped: baru.equipped || a.equipped || b.equipped || 'budak'
  };
}

var HARGA = {
  budak: 0, kucing: 10, arnab: 15, panda: 20, singa: 30,
  robot: 40, dino: 50, unikorn: 75, naga: 100
};

/* ---------- Alat bantu ---------- */

function helaian() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(NAMA_HELAIAN);
  if (!sh) {
    sh = ss.insertSheet(NAMA_HELAIAN);
    sh.appendRow(TAJUK);
    sh.setFrozenRows(1);
  }
  return sh;
}

function cariBaris(sheet, k) {
  var n = sheet.getLastRow();
  if (n < 2) return 0;
  var kunciSemua = sheet.getRange(2, 1, n - 1, 1).getValues();
  for (var i = 0; i < kunciSemua.length; i++) {
    if (String(kunciSemua[i][0]) === k) return i + 2;
  }
  return 0;
}

function bersihNama(s) {
  return String(s || '').trim().replace(/\s+/g, ' ').slice(0, 40);
}

function kunci(nama) {
  return bersihNama(nama).toLowerCase();
}

function kesatuan(x, y) {
  var out = [];
  var semua = [].concat(x || [], y || []);
  for (var i = 0; i < semua.length; i++) {
    if (out.indexOf(semua[i]) === -1) out.push(semua[i]);
  }
  return out;
}

function selamatParse(s) {
  try { return JSON.parse(s) || {}; } catch (e) { return {}; }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
