/**
 * =====================================================================
 * 💌 OUR LITTLE SPACE — CENTRAL CONFIGURATION
 * =====================================================================
 * Semua data personal dan teks website dapat diubah di sini.
 * Cukup edit file ini untuk mempersonalisasi website untuk pacarmu!
 */

export const loveConfig = {
  // Nama & Panggilan
  name: "Siti Meyla Bakti",
  nickname: "Sayang",
  myNickname: "Aku",

  // Detail Acara & Tujuan
  event: "Lomba Monolog",
  destination: "Universitas Indonesia (UI)",

  // Rentang Waktu LDR (Format: YYYY-MM-DD)
  // Default diatur mulai hari ini selama 10 hari.
  // Kamu bisa sesuaikan tanggal pastinya di bawah ini:
  startDate: "2026-10-10",
  endDate: "2026-10-19",
  totalDays: 10,

  // Tanggal Selesai Lomba Monolog (fitur hasil lomba muncul setelah tanggal 14)
  competitionEndDate: "2026-10-14",

  // Link Kontak Cepat untuk Tombol Darurat
  // Ganti nomor WhatsApp atau nomor telepon sesuai kebutuhan
  chatLink: "https://wa.me/6281234567890?text=halo%20sayang,%20aku%20lagi%20kangen%20banget%20sama%20kamu%20%F0%9F%A5%BA",
  callLink: "tel:+6281234567890",

  // Pesan Status Acak di bawah Countdown (berganti setiap beberapa detik)
  randomStatuses: [
    "masih kuat kok.",
    "bohong. aku kangen.",
    "hari ini harus semangat ya.",
    "sedikit lagi kita ketemu.",
    "aku tunggu kamu pulang.",
    "lagi mikirin kamu sekarang.",
    "jangan lupa makan ya cantikk.",
    "doa aku selalu nemenin kamu di UI.",
    "hitung mundur terus tiap menit.",
    "peluk virtual dulu dari jauh 🫂"
  ],

  // Pesan Khusus "Hari Ini..." berdasarkan Day 1 sampai Day 10
  dailyMessages: {
    1: "hari pertama. masih sok kuat.",
    2: "mulai kerasa nih kangennya.",
    3: "oke... ternyata 10 hari lama juga.",
    4: "aku mulai sering liatin foto kita.",
    5: "setengah perjalanan. jangan menyerah.",
    6: "aku masih nunggu kamu pulang.",
    7: "tinggal 3 hari lagi. 🥹",
    8: "TINGGAL DIKIT.",
    9: "besok.",
    10: "BESOK KITA KETEMU. 😭❤️"
  },

  // Balasan Acak saat tombol "🥺 aku kangen" ditekan
  kangenReplies: [
    "aku juga.",
    "jangan kangen sendirian.",
    "kalau bisa teleport udah aku samperin.",
    "UI ternyata jauh juga ya 😭",
    "aku lagi kangen kamu juga.",
    "peluk virtual dulu sini 🫂",
    "tahan ya sayang.",
    "sebentar lagi ya, aku tungguin kok.",
    "hatiku lagi terbang ke Depok sekarang.",
    "kangennya disimpan dulu, nanti pas ketemu aku peluk erat."
  ],

  // 10 Surat Pribadi untuk 10 Hari (Terkunci sampai hari yang bersangkutan)
  letters: [
    {
      day: 1,
      title: "Hari Pertama: Awal Petualanganmu",
      teaser: "buat kamu yang baru sampai...",
      content: "hari pertama nih. semangat ya buat lombanya. jangan lupa makan, minum, dan istirahat. aku tahu kamu bakal kasih yang terbaik. aku di sini tetap dukung kamu."
    },
    {
      day: 2,
      title: "Hari Kedua: Jangan Terlalu Lelah",
      teaser: "ingat jaga kesehatan ya...",
      content: "gimana hari ini? jangan terlalu capek ya. kalau capek, istirahat. aku mungkin nggak ada di sebelah kamu sekarang, tapi aku tetap di sini."
    },
    {
      day: 3,
      title: "Hari Ketiga: Dari Jauh, Aku Menemanimu",
      teaser: "jujur dari lubuk hati...",
      content: "andai aku bisa, aku pengen ada di samping kamu sekarang, nemenin kamu sampai rasa lelah itu sedikit mereda. tapi untuk saat ini, izinkan aku tetap jadi orang yang selalu menyemangati kamu dari jauh."
    },
    {
      day: 4,
      title: "Hari Keempat: Selalu Bangga",
      teaser: "kalau harimu terasa berat...",
      content: "aku seneng kamu lagi ngejalanin sesuatu yang penting buat kamu, jadi kasih yang terbaik ya, sayang. aku pengen kamu punya banyak alasan buat bangga sama diri kamu sendiri."
    },
    {
      day: 5,
      title: "Hari Kelima: Setengah Perjalanan",
      teaser: "separuh jalan terlewati...",
      content: "setengah perjalanan udah kita lewati, sayang. sedikit lagi, yaa. aku udah nggak sabar buat ketemu kamu lagi, meluk kamu, dan cerita banyak hal yang selama ini cuma bisa kita ceritain lewat chat."
    },
    {
      day: 6,
      title: "Hari Keenam: Jangan Telat Makan",
      teaser: "pengingat kecil dari aku...",
      content: "tinggal sedikit lagi, sayang. aku bangga banget sama kamu dan semua usaha yang udah kamu lakuin sejauh ini. apa pun hasilnya nanti, buat aku kamu tetap hebat. sebentar lagi kita ketemu lagi, ya. jaga diri baik-baik, cintaku. ❤️"
    },
    {
      day: 7,
      title: "Hari Ketujuh: Kamu Luar Biasa",
      teaser: "tinggal menghitung jari...",
      content: "jangan lupa makan yang cukup dan istirahat yang baik, ya, sayang. aku pengen kamu selalu sehat, karena masih banyak hari yang ingin aku habiskan sama kamu."
    },
    {
      day: 8,
      title: "Hari Kedelapan: Tak Sabar",
      teaser: "fokusku sudah mulai beda...",
      content: "akhir-akhir ini aku makin nggak sabar buat ketemu kamu lagi. tinggal sedikit lagi ya, sayang. aku tunggu kamu pulang, biar kita bisa punya waktu bersama lagi."
    },
    {
      day: 9,
      title: "Hari Kesembilan: H-1 Menuju Pulang",
      teaser: "satu tidur lagi...",
      content: "besok, akhirnya. setelah sekian hari cuma bisa merindukanmu dari jauh, akhirnya aku bisa ketemu kamu lagi. rasanya nggak sabar buat lihat kamu di hadapanku, sayang. ❤️"
    },
    {
      day: 10,
      title: "Hari Kesepuluh: Selamat Datang Kembali",
      teaser: "surat terakhir untuk ldr kita...",
      content: "selamat pulang, sayang. akhirnya penantian ini selesai, dan aku bisa ketemu kamu lagi. kamu nggak tahu seberapa kangennya aku selama ini."
    }
  ],

  // Checklist Perlengkapan Lomba Monolog
  monologChecklist: [
    { id: "naskah", label: "naskah monolog & hafalan", checked: false },
    { id: "kostum", label: "kostum & properti panggung", checked: false },
    { id: "makeup", label: "makeup & perlengkapan rias", checked: false },
    { id: "charger", label: "charger hp", checked: false },
    { id: "powerbank", label: "powerbank fully charged", checked: false },
    { id: "air_minum", label: "air minum hangat buat pita suara", checked: false },
    { id: "makan", label: "makan tepat waktu (wajib!)", checked: false },
    { id: "tidur", label: "tidur cukup semalam", checked: false },
    { id: "jangan_panik", label: "jangan panik (tarik nafas perlahan)", checked: false },
    { id: "percaya_diri", label: "percaya diri (you're the best actress!)", checked: false }
  ],

  // Galeri Foto Kenangan Polaroid
  // Kamu bisa ganti URL foto dengan foto pribadimu (taruh di public/photos/ atau URL eksternal)
  photoList: [
    {
      id: "photo-1",
      url: "/photos/foto1.JPG",
      caption: "ternyata jalan biasa bisa jadi kenangan luar biasa.",
      date: "23 September 2026",
      rotation: -2.5
    },
    {
      id: "photo-2",
      url: "/photos/foto2.JPG",
      caption: "hari itu sederhana, tapi orangnya istimewa.",
      date: "27 September 2026",
      rotation: 2.8
    },
    {
      id: "photo-3",
      url: "/photos/foto3.JPG",
      caption: "little things feel special when i'm with you.",
      date: "2 Oktober 2026",
      rotation: -1.8
    },
    {
      id: "photo-4",
      url: "/photos/foto4.JPG",
      caption: "di antara banyak hal, aku senang semesta mempertemukan kita.",
      date: "2 Oktober 2026",
      rotation: 2.2
    },
    {
      id: "photo-5",
      url: "/photos/foto5.JPG",
      caption: "salah satu hari yang pengen aku ulang berkali-kali.",
      date: "3 Oktober 2026",
      rotation: -3.0
    },
    {
      id: "photo-6",
      url: "/photos/foto6.JPG",
      caption: "aku tunggu senyuman ini lagi pas pulang nanti ya.",
      date: "4 Oktober 2026",
      rotation: 1.5
    }
  ],

  // Pesan Kebanggaan untuk Aktris Favorit
  actressQuote: "Apapun hasilnya, aku tetap bangga sama kamu. Kamu udah berani pergi jauh, tampil di depan orang-orang, dan memberikan yang terbaik. ❤️"
};
