# Matematik Ceria 🎈

Aplikasi web (PWA) latihan Matematik KSSR (Semakan 2017) untuk murid Tahun 1 hingga Tahun 6 sekolah rendah Malaysia.

**👉 Buka aplikasi: https://semanjohn.github.io/matematik-ceria/**

## Ciri-ciri

Soalan dijana secara automatik dan rawak — tidak akan berulang. Setiap topik ikut bidang DSKP KSSR: Nombor & Operasi, Pecahan, Perpuluhan, Peratus, Wang, Masa, Ukuran, Ruang/Geometri, Koordinat, Nisbah & Kadaran, dan Pengurusan Data. Tiga tahap kesukaran (Mudah, Sederhana, Sukar) bagi setiap topik — 64 topik kesemuanya.

Gamifikasi: kumpul bintang setiap kuiz, buka topik seterusnya bila lulus (peta pengembaraan), 12 lencana pencapaian, streak harian 🔥, Cabaran Masa 60 saat, dan Kedai Avatar (beli maskot guna bintang).

Semua grafik dilukis sebagai SVG dalam kod — maskot, lencana, ikon topik dan rajah soalan. Tiada fail imej langsung, jadi aplikasi ringan, tajam pada skrin bersaiz apa pun, dan berfungsi tanpa internet.

Setiap tahun ada warna tersendiri (Tahun 1 merah hingga Tahun 6 ungu) supaya anak mudah membezakannya. Ada animasi ringan: kad melantun masuk, bintang mengisi satu demi satu, dan confetti bila dapat 3 bintang. Jika peranti ditetapkan untuk mengurangkan gerakan, semua animasi dimatikan secara automatik.

Berfungsi 100% tanpa internet selepas dibuka kali pertama.

## Cara pasang di telefon anak

- **Android (Chrome):** buka pautan di atas → menu ⋮ → *Add to Home screen*
- **iPhone (Safari):** buka pautan di atas → butang Kongsi → *Add to Home Screen*

Ikon akan muncul di skrin utama seperti aplikasi biasa dan dibuka skrin penuh tanpa bar pelayar.

## Kemas kini automatik

Aplikasi menyemak fail terbaharu setiap kali dibuka semasa ada internet, jadi telefon anak sentiasa mendapat versi terkini dengan sendirinya. Tiada apa-apa perlu ditekan.

Nombor versi dipaparkan di bahagian bawah skrin utama (contoh `Versi 1.2.0`). Bandingkan dengan nilai `APP_VERSION` dalam `config.js` untuk mengesahkan telefon sudah dikemas kini.

Setiap kali anda mengubah aplikasi, naikkan `APP_VERSION` dalam `config.js` supaya perubahan itu boleh dilihat.

**Berapa lama?** CDN GitHub Pages menyimpan fail selama 10 minit (`max-age=600`). Jadi selepas anda muat naik perubahan, telefon akan dapat versi baharu dalam masa kira-kira 10 minit — automatik, tetapi bukan serta-merta.

**Cara penerbitan.** Repo ini menerbitkan melalui GitHub Actions (`.github/workflows/deploy.yml`), bukan saluran Pages klasik. Saluran klasik pernah tersekat berjam-jam dengan ralat dalaman GitHub; saluran Actions siap dalam kira-kira 20 saat dan memaparkan sebab kegagalan dengan jelas. Setiap tolakan ke `main` mencetuskannya secara automatik. Anda boleh melihat statusnya di tab **Actions**.

## Log masuk dan simpan kemajuan (pilihan)

Tanpa log masuk, kemajuan disimpan dalam peranti itu sahaja. Dengan log masuk (**nama + PIN 4 angka**), kemajuan mengikut anak ke telefon, tablet atau komputer mana-mana.

Data disimpan dalam **Google Sheet milik anda sendiri** — bukan pelayan orang lain.

### Pemasangan (sekali sahaja, lebih kurang 5 minit)

1. Buka https://sheets.new dan namakan hamparan itu **Matematik Ceria**.
2. Menu **Extensions → Apps Script**.
3. Padam kod contoh, tampal seluruh isi fail [`apps-script/Code.gs`](apps-script/Code.gs), tekan **Save**.
4. Tekan **Deploy → New deployment**.
5. Klik ikon gear di sebelah "Select type" → pilih **Web app**.
6. Isi: *Execute as* = **Me**, *Who has access* = **Anyone**.
   (Mesti "Anyone", bukan "Anyone with Google account" — jika tidak, aplikasi tidak dapat menyambung.)
7. **Deploy** → **Authorize access** → pilih akaun Google anda → **Advanced** → **Go to … (unsafe)** → **Allow**.
   Amaran itu normal; Google memaparkannya bagi semua skrip peribadi yang belum melalui semakan rasmi. Ini skrip anda sendiri.
8. Salin **Web app URL** yang berakhir dengan `/exec`.
9. Buka `config.js` dalam repo ini dan tampal URL itu:

   ```js
   export const SHEET_URL = "https://script.google.com/macros/s/……/exec";
   ```

Butang **Log masuk** akan muncul di penjuru atas kiri sebaik sahaja URL itu diisi.

Untuk repo ini, langkah-langkah di atas sudah siap dan diuji.

### Bagaimana kemajuan digabungkan

Jika anak bermain pada dua peranti berasingan, kedua-dua kemajuan **bercantum**, bukan saling menimpa. Bagi setiap topik, bilangan bintang tertinggi diambil; avatar dan lencana daripada kedua-dua peranti disatukan; baki bintang dikira semula supaya kekal tepat. Logik yang sama digunakan di aplikasi dan di Google Sheet, dan telah diuji dengan 5,000 kes rawak untuk memastikan keputusannya sentiasa serupa.

### Nota keselamatan

Nama + PIN 4 angka ialah kunci mudah supaya kanak-kanak boleh ingat, bukan keselamatan sebenar. Sesiapa yang tahu nama dan PIN boleh melihat kemajuan itu. Gunakan nama panggilan sahaja dan jangan simpan maklumat peribadi di dalam Sheet.

Jika PIN terlupa, ia tidak boleh dipulihkan — tetapi kemajuan pada peranti itu sendiri tetap selamat kerana ia disimpan secara berasingan.

## Struktur fail

| Fail | Fungsi |
|---|---|
| `index.html` | Rangka aplikasi |
| `config.js` | Nombor versi dan alamat Google Sheet |
| `art.js` | Semua grafik SVG: 9 maskot, 12 lencana, 16 ikon topik, ikon antara muka, palet warna setiap tahun |
| `engine.js` | Penjana soalan + senarai topik silibus KSSR |
| `store.js` | Simpanan kemajuan, lencana, kedai avatar, logik gabungan |
| `sync.js` | Log masuk dan penyegerakan dengan Google Sheet |
| `visuals.js` | Lukisan SVG: jam, pai pecahan, bentuk, carta bar, satah koordinat, syiling |
| `app.js` | Navigasi dan semua skrin |
| `styles.css` | Gaya paparan |
| `sw.js` | Service worker — kemas kini automatik + guna tanpa internet |
| `manifest.webmanifest` | Tetapan PWA (nama, ikon, warna) |
| `apps-script/Code.gs` | Kod untuk Google Apps Script (bukan sebahagian laman web) |

## Ubah suai soalan

Semua penjana soalan dan senarai topik ada dalam `engine.js`. Objek `Syllabus` di bahagian atas fail mengandungi senarai topik setiap tahun — anda boleh tambah topik, ubah julat nombor, atau tambah jenis soalan baharu di situ.

## Cuba di komputer

Perlukan server tempatan (modul JavaScript tidak berfungsi melalui `file://`):

```
python -m http.server 8000
```

Kemudian layari `http://localhost:8000`.
