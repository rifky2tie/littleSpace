# our little space ♡

Mini website personal, scrapbook digital diary LDR yang dibuat khusus untuk pacar yang sedang pergi selama 10 hari ke Universitas Indonesia (UI) untuk mengikuti lomba monolog.

---

## ✨ Fitur-Fitur Utama

1. **Surat Pembuka / Landing Page ("our little space ♡")**
   - Suasana malam berbintang dengan sentuhan grain tekstur & floating hearts.
   - Kata-kata pembuka personal dan tombol masuk dengan transisi halus.

2. **Dashboard LDR ("ldr survival kit 🫂")**
   - Header & subtitle: *"misi: bertahan sampai kita ketemu lagi."*
   - Countdown dinamis: **DAY X / 10** dan **X hari lagi sampai kita ketemu ❤️**.
   - Visual progress bar: `[██████░░░░]`.
   - Dynamic Random Status Ticker yang berganti otomatis setiap beberapa detik (*"masih kuat kok."*, *"bohong. aku kangen."*, dsb).
   - Card **"hari ini..."** dengan pesan berganti setiap hari dari Day 1 sampai Day 10.

3. **Fitur "🥺 aku kangen"**
   - Tombol interaktif dengan animasi bounce, suara pop halus, dan semburan hati (*heart particles*).
   - Respon acak yang manis (*"aku juga."*, *"UI ternyata jauh juga ya 😭"*, *"peluk virtual dulu sini 🫂"*).
   - Counter disimpan **strictly per-device** di `localStorage` dengan key unik: `our-little-space-kangen-count`.
   - Dimulai dari **0** pada perangkat/browser baru mana pun, tidak tersinkronisasi antar-device (personal untuk masing-masing yang membuka).
   - Counter bertambah setiap diklik dan tidak hilang saat di-refresh.
   - Fungsi reset hanya disediakan untuk keperluan testing/development (via panel simulasi atau `window.resetKangenCounter()`), tidak ditampilkan tombol reset di production UI.
   - Teks humoris di bawah counter: *"sepertinya kita punya masalah. 🫣"*.

4. **Tombol Darurat: "🚨 aku kangen parah"**
   - Modal dramatis bertema sirene darurat:
     - *KANGEN LEVEL: KRITIS*
     - *Jarak: jauh (Universitas Indonesia)*
     - *Kangen: tidak terukur*
     - *Status: tidak tertolong.*
   - Solusi sementara:
     - `[ 💬 buka chat ]` -> link WhatsApp langsung dari config
     - `[ 🫂 minta peluk ]` -> langsung beralih ke peluk virtual
     - `[ 📞 call dia ]` -> link telepon langsung

5. **10 Surat Harian ("letters for you 💌")**
   - 10 amplop surat yang terkunci dan hanya bisa dibuka saat harinya tiba.
   - Pesan peringatan jika dibuka sebelum waktunya: *"ehh belum boleh dibuka 😭 sabar dulu ya sayang."*
   - Modal surat bergaya kertas catatan pribadi dengan tulisan tangan.

6. **Monolog Survival Kit ("monolog survival kit 🎭")**
   - Interactive checklist 10 perlengkapan panggung (naskah, kostum, makeup, charger, powerbank, air minum, makan, tidur, jangan panik, percaya diri).
   - Status checklist tersimpan di `localStorage`.
   - Ledakan konfeti saat semua checklist selesai + *"MISSION READY 🎭🔥"*.
   - Tombol *"semangat lomba ❤️"* yang menampilkan pesan kebanggaan: *"aku bangga sama kamu. apapun hasilnya nanti, aku tetap bangga."*.
   - Evaluasi pasca lomba: *"HOW DID MY FAVORITE ACTRESS DO? 🎭"* dengan pilihan Juara 1, 2, 3, dan Juara di Hati Aku.

7. **Virtual Hug ("virtual hug 🫂")**
   - Karakter animasi pelukan lucu (bear cuddle).
   - Tombol `[ peluk aku ]`: karakter merapat memeluk, suara pelukan, efek getar layar (*screen shake*), dan letupan hati.
   - Pesan: *"peluk virtual berhasil dikirim 🫂 peluk ini berlaku sampai kamu pulang."*.
   - Counter pelukan disimpan **strictly per-device** di `localStorage` dengan key unik: `our-little-space-hug-count`.
   - Dimulai dari **0** pada perangkat/browser baru mana pun, tidak sinkron antar-device.
   - Fungsi reset hanya tersedia untuk dev test (`window.resetHugCounter()` atau panel simulasi), tidak tampil di production UI.

8. **Galeri Polaroid ("our little gallery 📸")**
   - Tampilan foto bergaya polaroid dengan solasi (*washi tape*) dan kemiringan acak.
   - Caption tulisan tangan yang manis.
   - Klik untuk membuka lightbox foto berukuran besar.

9. **Perayaan Hari ke-10 (Emotional Payoff)**
   - Saat mencapai Day 10: *"YOU MADE IT. 🥹 10 hari akhirnya selesai. sebentar lagi kita ketemu."*.
   - Tombol *"❤️ FINALLY, WE MEET"* -> *"come home, pretty girl."*.

10. **Simulasi Hari untuk Pengujian / Review**
    - Di bagian footer terdapat tombol kecil *"simulasi hari"* untuk mencoba Day 1 sampai Day 10 dengan 1 kali klik.

---

## 🛠️ Konfigurasi Mudah (Single Source of Truth)

Semua nama, tanggal, link WhatsApp, link telepon, foto kenangan, dan isi surat dapat diubah di satu file:

📁 **`src/config/loveConfig.js`**

```javascript
export const loveConfig = {
  name: "Nadine",
  nickname: "Sayang",
  myNickname: "Aku",
  startDate: "2026-10-08",
  endDate: "2026-10-17",
  chatLink: "https://wa.me/6281234567890?...",
  callLink: "tel:+6281234567890",
  // ...
};
```

---

## 🚀 Cara Menjalankan Project

1. Install dependensi:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka di browser:
   ```
   http://localhost:5173
   ```

4. Build production:
   ```bash
   npm run build
   ```
