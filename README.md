# Matematik Ceria 🎈

Aplikasi web (PWA) latihan Matematik KSSR (Semakan 2017) untuk murid Tahun 1 hingga Tahun 6 sekolah rendah Malaysia.

**👉 Buka aplikasi: https://semanjohn.github.io/matematik-ceria/**

## Ciri-ciri

Soalan dijana secara automatik dan rawak — tidak akan berulang. Setiap topik ikut bidang DSKP KSSR: Nombor & Operasi, Pecahan, Perpuluhan, Peratus, Wang, Masa, Ukuran, Ruang/Geometri, Koordinat, Nisbah & Kadaran, dan Pengurusan Data. Tiga tahap kesukaran (Mudah, Sederhana, Sukar) bagi setiap topik — 64 topik kesemuanya.

Gamifikasi: kumpul bintang setiap kuiz, buka topik seterusnya bila lulus (peta pengembaraan), 12 lencana pencapaian, streak harian 🔥, Cabaran Masa 60 saat, dan Kedai Avatar (beli maskot guna bintang).

Berfungsi 100% tanpa internet selepas dibuka kali pertama.

## Cara pasang di telefon anak

- **Android (Chrome):** buka pautan di atas → menu ⋮ → *Add to Home screen* / *Install app*
- **iPhone (Safari):** buka pautan di atas → butang Kongsi → *Add to Home Screen*

Ikon akan muncul di skrin utama seperti aplikasi biasa dan dibuka skrin penuh tanpa bar pelayar. Kemajuan murid disimpan dalam peranti itu sendiri.

## Struktur fail

| Fail | Fungsi |
|---|---|
| `index.html` | Rangka aplikasi |
| `engine.js` | Penjana soalan + senarai topik silibus KSSR |
| `store.js` | Simpanan kemajuan, lencana, kedai avatar (localStorage) |
| `visuals.js` | Lukisan SVG: jam, pai pecahan, bentuk, carta bar, satah koordinat, syiling |
| `app.js` | Navigasi dan semua skrin |
| `styles.css` | Gaya paparan |
| `sw.js` | Service worker — membolehkan penggunaan tanpa internet |
| `manifest.webmanifest` | Tetapan PWA (nama, ikon, warna) |

## Ubah suai soalan

Semua penjana soalan dan senarai topik ada dalam `engine.js`. Objek `Syllabus` di bahagian atas fail mengandungi senarai topik setiap tahun — anda boleh tambah topik, ubah julat nombor, atau tambah jenis soalan baharu di situ.

## Keluarkan versi baharu

Selepas mengubah mana-mana fail, naikkan nilai `VERSION` dalam `sw.js` (contoh `v1.0.0` → `v1.0.1`). Peranti akan memuat turun fail baharu secara automatik pada kali seterusnya ada internet.

## Cuba di komputer

Perlukan server tempatan (modul JavaScript tidak berfungsi melalui `file://`):

```
python -m http.server 8000
```

Kemudian layari `http://localhost:8000`.
