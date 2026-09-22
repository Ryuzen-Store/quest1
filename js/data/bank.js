/**
 * QuestionRy data source: subject taxonomy + local fallback question bank.
 *
 * The fallback bank keeps the game playable when every AI provider fails
 * (network, 429/5xx, invalid payloads). The curated DB table `questions`
 * (Supabase) is checked first at runtime; this static bank is the last line
 * of defence and also powers the offline/guest experience.
 */

export const SUBJECTS = [
  'Matematika',
  'IPA',
  'IPS',
  'Sejarah',
  'Informatika',
];

/** Full subject taxonomy (used for balanced generation prompts). */
export const SUBJECT_TAXONOMY = {
  'Matematika': [
    'Aritmetika', 'Bilangan', 'Aljabar', 'Persamaan', 'Pertidaksamaan', 'Fungsi',
    'Geometri', 'Pythagoras', 'Trigonometri', 'Statistika', 'Peluang', 'Perbandingan',
    'Bangun datar', 'Bangun ruang', 'Pola bilangan', 'Logika matematika',
  ],
  'IPA': [
    'Biologi: sel, genetika, ekologi, sistem organ, makhluk hidup, evolusi, bioteknologi',
    'Fisika: gerak, gaya, energi, usaha, suhu, kalor, gelombang, listrik, magnet, optik, fluida',
    'Kimia: atom, unsur, senyawa, ikatan, reaksi, stoikiometri, larutan, asam basa',
  ],
  'IPS': [
    'Geografi', 'Ekonomi', 'Sosiologi', 'Interaksi sosial', 'Aktivitas ekonomi',
    'Kependudukan', 'Keruangan', 'Sosial budaya', 'Perdagangan', 'Pembangunan',
  ],
  'Sejarah': [
    'Sejarah Indonesia', 'Sejarah dunia', 'Kerajaan Nusantara', 'Kolonialisme',
    'Imperialisme', 'Pergerakan nasional', 'Kemerdekaan', 'Perang dunia', 'Revolusi',
    'Perubahan sosial-politik', 'Tokoh dan peristiwa sejarah', 'Kronologi',
  ],
  'Informatika': [
    'Algoritma', 'Pemrograman', 'Variabel', 'Tipe data', 'Percabangan', 'Perulangan',
    'Function', 'Struktur data', 'Database', 'SQL', 'Jaringan komputer', 'Internet',
    'Sistem operasi', 'Keamanan digital', 'Cybersecurity', 'Teknologi informasi',
    'Computational thinking',
  ],
};

/** Level descriptors injected into the generation prompt. */
export const LEVEL_DESCRIPTORS = {
  easy: {
    label: 'Easy',
    instruction: 'Gunakan konsep dasar, ingatan langsung, dan perhitungan sederhana. Soal bersifat pengantar dan langsung pada inti materi.',
  },
  normal: {
    label: 'Normal',
    instruction: 'Gunakan penalaran sedang, penerapan konsep, dan soal bertingkat sederhana (maksimal 2 langkah).',
  },
  hard: {
    label: 'Hard',
    instruction: 'Mayoritas soal wajib menuntut penalaran lanjutan, analisis multi-langkah, dan penerapan konsep yang tidak sepele. Jangan hanya memperbesar angka. Sebagian kecil soal fundamental tetap boleh muncul.',
  },
  impossible: {
    label: 'Impossible',
    instruction: 'Soal sangat menantang: penalaran mendalam, analisis multi-langkah, menghubungkan beberapa konsep, kasus tepi (edge case), dan interpretasi konseptual yang sulit. Sebagian kecil soal fundamental tetap boleh muncul untuk penguatan.',
  },
};

/* ===================================================================
 * LOCAL FALLBACK QUESTION BANK
 * Every item: question, options[4], correct_index, explanation, subject,
 * topic, difficulty. Topics map to the taxonomy above.
 * =================================================================== */
export const QUESTION_BANK = [
  /* ============== MATEMATIKA ============== */
  { subject: 'Matematika', topic: 'Aritmetika', difficulty: 'Easy', question: 'Berapakah hasil dari 36 ÷ 6 × 2?', options: ['12', '3', '18', '6'], correct_index: 0, explanation: 'Operasi dilakukan dari kiri ke kanan: 36 ÷ 6 = 6, lalu 6 × 2 = 12.' },
  { subject: 'Matematika', topic: 'Aritmetika', difficulty: 'Easy', question: 'Bilangan prima terbesar di bawah 20 adalah ...', options: ['17', '19', '18', '15'], correct_index: 1, explanation: 'Bilangan prima di bawah 20 adalah 2, 3, 5, 7, 11, 13, 17, 19. Yang terbesar adalah 19.' },
  { subject: 'Matematika', topic: 'Aritmetika', difficulty: 'Easy', question: 'Hasil dari 3² + 4² adalah ...', options: ['25', '14', '49', '7'], correct_index: 0, explanation: '3² = 9 dan 4² = 16, sehingga 9 + 16 = 25.' },
  { subject: 'Matematika', topic: 'Bilangan', difficulty: 'Normal', question: 'FPB dari 36 dan 48 adalah ...', options: ['12', '6', '8', '18'], correct_index: 0, explanation: 'Faktor 36 = 2²×3², faktor 48 = 2⁴×3. FPB = 2²×3 = 12.' },
  { subject: 'Matematika', topic: 'Bilangan', difficulty: 'Normal', question: 'Jika KPK dari 12 dan n adalah 60 dan FPB-nya 4, maka nilai n adalah ...', options: ['20', '16', '24', '8'], correct_index: 0, explanation: 'Untuk dua bilangan berlaku a×b = KPK×FPB, maka 12×n = 60×4 = 240, sehingga n = 20.' },
  { subject: 'Matematika', topic: 'Aljabar', difficulty: 'Easy', question: 'Nilai dari 2x + 5 jika x = 3 adalah ...', options: ['11', '10', '16', '13'], correct_index: 0, explanation: 'Substitusi x = 3: 2(3) + 5 = 6 + 5 = 11.' },
  { subject: 'Matematika', topic: 'Aljabar', difficulty: 'Normal', question: 'Hasil pemfaktoran dari x² − 5x + 6 adalah ...', options: ['(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x − 1)(x − 6)', '(x + 1)(x + 6)'], correct_index: 0, explanation: 'Dua bilangan yang jumlahnya −5 dan hasil kalinya 6 adalah −2 dan −3, sehingga faktornya (x−2)(x−3).' },
  { subject: 'Matematika', topic: 'Aljabar', difficulty: 'Hard', question: 'Jika a + b = 7 dan a² + b² = 29, maka nilai ab adalah ...', options: ['10', '20', '14', '21'], correct_index: 0, explanation: '(a+b)² = a² + 2ab + b² → 49 = 29 + 2ab → 2ab = 20 → ab = 10.' },
  { subject: 'Matematika', topic: 'Persamaan', difficulty: 'Easy', question: 'Penyelesaian dari 2x − 4 = 10 adalah ...', options: ['7', '3', '6', '8'], correct_index: 0, explanation: '2x − 4 = 10 → 2x = 14 → x = 7.' },
  { subject: 'Matematika', topic: 'Persamaan', difficulty: 'Normal', question: 'Himpunan penyelesaian dari x² − x − 12 = 0 adalah ...', options: ['{ −3, 4 }', '{ 3, 4 }', '{ −4, 3 }', '{ −3, −4 }'], correct_index: 2, explanation: 'Faktor dari x²−x−12 adalah (x−4)(x+3), sehingga x = 4 atau x = −3.' },
  { subject: 'Matematika', topic: 'Pertidaksamaan', difficulty: 'Normal', question: 'Penyelesaian dari 3x + 1 ≥ 10 adalah ...', options: ['x ≥ 3', 'x > 3', 'x ≤ 3', 'x < 3'], correct_index: 0, explanation: '3x ≥ 9 → x ≥ 3. Tanda ketidaksamaan tidak berubah karena pembagian dengan bilangan positif.' },
  { subject: 'Matematika', topic: 'Fungsi', difficulty: 'Normal', question: 'Jika f(x) = 2x + 1 dan g(x) = x², maka f(g(2)) adalah ...', options: ['9', '5', '17', '7'], correct_index: 0, explanation: 'g(2) = 2² = 4, lalu f(4) = 2(4) + 1 = 9.' },
  { subject: 'Matematika', topic: 'Geometri', difficulty: 'Easy', question: 'Jumlah seluruh sudut pada sebuah segitiga adalah ...', options: ['180°', '90°', '360°', '270°'], correct_index: 0, explanation: 'Jumlah sudut dalam segitiga selalu 180°.' },
  { subject: 'Matematika', topic: 'Geometri', difficulty: 'Normal', question: 'Luas persegi panjang dengan panjang 12 cm dan lebar 5 cm adalah ...', options: ['60 cm²', '34 cm²', '17 cm²', '120 cm²'], correct_index: 0, explanation: 'Luas = p × l = 12 × 5 = 60 cm².' },
  { subject: 'Matematika', topic: 'Pythagoras', difficulty: 'Normal', question: 'Pada segitiga siku-siku dengan sisi tegak 6 cm dan 8 cm, panjang sisi miring adalah ...', options: ['10 cm', '14 cm', '12 cm', '9 cm'], correct_index: 0, explanation: 'c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm (triple 6-8-10).' },
  { subject: 'Matematika', topic: 'Pythagoras', difficulty: 'Hard', question: 'Tiga bilangan yang membentuk triple Pythagoras adalah ...', options: ['5, 12, 13', '5, 12, 14', '7, 24, 26', '9, 12, 14'], correct_index: 0, explanation: '5² + 12² = 25 + 144 = 169 = 13², sehingga 5, 12, 13 adalah triple Pythagoras.' },
  { subject: 'Matematika', topic: 'Trigonometri', difficulty: 'Normal', question: 'Pada segitiga siku-siku, nilai sin dari sudut adalah ...', options: ['sisi depan / sisi miring', 'sisi samping / sisi miring', 'sisi depan / sisi samping', 'sisi samping / sisi depan'], correct_index: 0, explanation: 'Definisi sinus: sin = sisi di depan sudut dibagi sisi miring.' },
  { subject: 'Matematika', topic: 'Trigonometri', difficulty: 'Hard', question: 'Nilai dari sin(30°) adalah ...', options: ['1/2', '√3/2', '√2/2', '1'], correct_index: 0, explanation: 'sin(30°) = 1/2, salah satu sudut istimewa.' },
  { subject: 'Matematika', topic: 'Statistika', difficulty: 'Easy', question: 'Nilai rata-rata (mean) dari data 4, 6, 8, 10 adalah ...', options: ['7', '6', '8', '9'], correct_index: 0, explanation: 'Jumlah = 28, banyak data = 4, mean = 28 ÷ 4 = 7.' },
  { subject: 'Matematika', topic: 'Statistika', difficulty: 'Normal', question: 'Median dari data 3, 7, 2, 9, 5 adalah ...', options: ['5', '7', '2', '9'], correct_index: 0, explanation: 'Urutkan: 2, 3, 5, 7, 9. Nilai tengah adalah 5.' },
  { subject: 'Matematika', topic: 'Statistika', difficulty: 'Hard', question: 'Data: 5, 5, 6, 7, 7, 7, 8. Modus data tersebut adalah ...', options: ['7', '5', '6', '8'], correct_index: 0, explanation: 'Modus adalah nilai yang paling sering muncul: angka 7 muncul 3 kali.' },
  { subject: 'Matematika', topic: 'Peluang', difficulty: 'Normal', question: 'Sebuah dadu dilempar sekali. Peluang muncul mata dadu genap adalah ...', options: ['1/2', '1/3', '1/6', '2/3'], correct_index: 0, explanation: 'Mata genap = 2, 4, 6 (3 dari 6), sehingga peluang = 3/6 = 1/2.' },
  { subject: 'Matematika', topic: 'Peluang', difficulty: 'Hard', question: 'Dua koin dilempar bersamaan. Peluang muncul keduanya angka adalah ...', options: ['1/4', '1/2', '1/3', '1/8'], correct_index: 0, explanation: 'Ruang sampel = {AA, AG, GA, GG}. Kejadian AA = 1 dari 4, peluang = 1/4.' },
  { subject: 'Matematika', topic: 'Perbandingan', difficulty: 'Normal', question: 'Perbandingan uang A : B = 2 : 3. Jika uang A Rp40.000, uang B adalah ...', options: ['Rp60.000', 'Rp50.000', 'Rp80.000', 'Rp30.000'], correct_index: 0, explanation: 'A : B = 2 : 3 → B = (3/2) × 40.000 = Rp60.000.' },
  { subject: 'Matematika', topic: 'Perbandingan', difficulty: 'Hard', question: 'Sebuah peta berskala 1 : 250.000. Jarak 5 cm di peta sama dengan ... di lapangan.', options: ['12,5 km', '1,25 km', '125 km', '0,5 km'], correct_index: 0, explanation: '5 cm × 250.000 = 1.250.000 cm = 12.500 m = 12,5 km.' },
  { subject: 'Matematika', topic: 'Bangun datar', difficulty: 'Easy', question: 'Luas persegi dengan sisi 9 cm adalah ...', options: ['81 cm²', '36 cm²', '18 cm²', '72 cm²'], correct_index: 0, explanation: 'Luas = s² = 9² = 81 cm².' },
  { subject: 'Matematika', topic: 'Bangun datar', difficulty: 'Normal', question: 'Luas lingkaran dengan jari-jari 7 cm (π = 22/7) adalah ...', options: ['154 cm²', '44 cm²', '308 cm²', '77 cm²'], correct_index: 0, explanation: 'L = πr² = (22/7) × 7 × 7 = 154 cm².' },
  { subject: 'Matematika', topic: 'Bangun ruang', difficulty: 'Normal', question: 'Volume kubus dengan rusuk 5 cm adalah ...', options: ['125 cm³', '25 cm³', '75 cm³', '150 cm³'], correct_index: 0, explanation: 'V = s³ = 5³ = 125 cm³.' },
  { subject: 'Matematika', topic: 'Bangun ruang', difficulty: 'Hard', question: 'Volume tabung dengan jari-jari 7 cm dan tinggi 10 cm (π = 22/7) adalah ...', options: ['1540 cm³', '154 cm³', '220 cm³', '770 cm³'], correct_index: 0, explanation: 'V = πr²t = (22/7) × 49 × 10 = 1540 cm³.' },
  { subject: 'Matematika', topic: 'Pola bilangan', difficulty: 'Normal', question: 'Suku berikutnya dari pola 2, 5, 10, 17, ... adalah ...', options: ['26', '24', '28', '30'], correct_index: 0, explanation: 'Selisih bertambah 3, 5, 7, lalu +9, sehingga 17 + 9 = 26.' },
  { subject: 'Matematika', topic: 'Pola bilangan', difficulty: 'Hard', question: 'Jumlah 10 suku pertama deret aritmetika 3, 7, 11, ... adalah ...', options: ['210', '200', '220', '180'], correct_index: 0, explanation: 'a = 3, b = 4. S10 = 10/2 × (2×3 + 9×4) = 5 × (6 + 36) = 210.' },
  { subject: 'Matematika', topic: 'Logika matematika', difficulty: 'Normal', question: 'Negasi dari pernyataan "Semua siswa hadir" adalah ...', options: ['Ada siswa tidak hadir', 'Semua siswa tidak hadir', 'Tidak ada siswa hadir', 'Beberapa siswa hadir'], correct_index: 0, explanation: 'Negasi dari "semua" adalah "ada/beberapa yang tidak".' },

  /* ============== IPA ============== */
  { subject: 'IPA', topic: 'Biologi', difficulty: 'Easy', question: 'Organel sel yang berfungsi sebagai tempat respirasi sel adalah ...', options: ['Mitokondria', 'Ribosom', 'Nukleus', 'Kloroplas'], correct_index: 0, explanation: 'Mitokondria menghasilkan energi (ATP) melalui respirasi sel.' },
  { subject: 'IPA', topic: 'Biologi', difficulty: 'Easy', question: 'Unit terkecil penyusun makhluk hidup adalah ...', options: ['Sel', 'Jaringan', 'Organ', 'Molekul'], correct_index: 0, explanation: 'Sel adalah unit struktural dan fungsional terkecil makhluk hidup.' },
  { subject: 'IPA', topic: 'Biologi', difficulty: 'Normal', question: 'Organel yang hanya dimiliki sel tumbuhan dan berperan dalam fotosintesis adalah ...', options: ['Kloroplas', 'Mitokondria', 'Lisosom', 'Sentriol'], correct_index: 0, explanation: 'Kloroplas mengandung klorofil untuk fotosintesis dan hanya ada pada sel tumbuhan.' },
  { subject: 'IPA', topic: 'Biologi', difficulty: 'Normal', question: 'Proses perpindahan zat dari larutan pekat ke larutan encer melalui membran semipermeabel disebut ...', options: ['Osmosis', 'Difusi', 'Fagositosis', 'Imbibisi'], correct_index: 0, explanation: 'Osmosis adalah perpindahan air dari konsentrasi tinggi (encer) ke rendah (pekat) melalui membran semipermeabel.' },
  { subject: 'IPA', topic: 'Genetika', difficulty: 'Normal', question: 'Jumlah kromosom pada sel tubuh manusia normal adalah ...', options: ['46', '23', '44', '48'], correct_index: 0, explanation: 'Sel tubuh manusia memiliki 46 kromosom (23 pasang).' },
  { subject: 'IPA', topic: 'Genetika', difficulty: 'Hard', question: 'Genotipe heterozigot untuk sifat tinggi (Tt) disilangkan dengan sesamanya. Rasio fenotipe keturunannya adalah ...', options: ['3 : 1', '1 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'], correct_index: 0, explanation: 'Persilangan Tt × Tt menghasilkan TT : Tt : Tt : tt = 3 dominan : 1 resesif.' },
  { subject: 'IPA', topic: 'Ekologi', difficulty: 'Easy', question: 'Dalam rantai makanan, organisme yang dapat membuat makanan sendiri disebut ...', options: ['Produsen', 'Konsumen', 'Dekomposer', 'Predator'], correct_index: 0, explanation: 'Produsen (tumbuhan) membuat makanannya sendiri melalui fotosintesis.' },
  { subject: 'IPA', topic: 'Ekologi', difficulty: 'Normal', question: 'Organisme yang menguraikan sisa makhluk hidup menjadi zat anorganik disebut ...', options: ['Dekomposer', 'Produsen', 'Konsumen tingkat I', 'Herbivora'], correct_index: 0, explanation: 'Dekomposer (bakteri, jamur) menguraikan sisa organisme.' },
  { subject: 'IPA', topic: 'Sistem organ', difficulty: 'Easy', question: 'Organ tubuh yang berfungsi memompa darah ke seluruh tubuh adalah ...', options: ['Jantung', 'Paru-paru', 'Hati', 'Ginjal'], correct_index: 0, explanation: 'Jantung memompa darah melalui pembuluh darah ke seluruh tubuh.' },
  { subject: 'IPA', topic: 'Sistem organ', difficulty: 'Normal', question: 'Pertukaran oksigen dan karbon dioksida pada manusia terjadi di ...', options: ['Alveolus', 'Bronkus', 'Trakea', 'Diafragma'], correct_index: 0, explanation: 'Alveolus adalah kantung udara di paru-paru tempat difusi O₂ dan CO₂.' },
  { subject: 'IPA', topic: 'Fisika', difficulty: 'Easy', question: 'Satuan gaya dalam Sistem Internasional (SI) adalah ...', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correct_index: 0, explanation: 'Gaya diukur dalam Newton (N).' },
  { subject: 'IPA', topic: 'Fisika', difficulty: 'Normal', question: 'Hubungan antara kecepatan (v), jarak (s), dan waktu (t) adalah ...', options: ['v = s / t', 'v = s × t', 'v = t / s', 's = v / t'], correct_index: 0, explanation: 'Kecepatan = jarak dibagi waktu (v = s/t).' },
  { subject: 'IPA', topic: 'Fisika', difficulty: 'Normal', question: 'Gaya yang menyebabkan benda dilempar ke atas selalu kembali jatuh adalah ...', options: ['Gaya gravitasi', 'Gaya magnet', 'Gaya gesek', 'Gaya pegas'], correct_index: 0, explanation: 'Gravitasi bumi menarik benda ke arah pusat bumi.' },
  { subject: 'IPA', topic: 'Energi', difficulty: 'Easy', question: 'Energi yang dimiliki benda karena posisinya disebut ...', options: ['Energi potensial', 'Energi kinetik', 'Energi kimia', 'Energi listrik'], correct_index: 0, explanation: 'Energi potensial berkaitan dengan ketinggian/posisi benda.' },
  { subject: 'IPA', topic: 'Energi', difficulty: 'Normal', question: 'Energi kinetik benda bergantung pada ...', options: ['Massa dan kecepatan', 'Massa dan ketinggian', 'Warna dan suhu', 'Panjang dan waktu'], correct_index: 0, explanation: 'Ek = ½mv², bergantung pada massa dan kuadrat kecepatan.' },
  { subject: 'IPA', topic: 'Usaha', difficulty: 'Normal', question: 'Usaha (W) secara fisika dirumuskan sebagai ...', options: ['W = F × s', 'W = F + s', 'W = F / s', 'W = s / F'], correct_index: 0, explanation: 'Usaha = gaya × perpindahan searah gaya: W = F · s.' },
  { subject: 'IPA', topic: 'Suhu', difficulty: 'Easy', question: 'Titik didih air pada tekanan 1 atm adalah ...', options: ['100 °C', '0 °C', '37 °C', '50 °C'], correct_index: 0, explanation: 'Air mendidih pada 100 °C pada tekanan normal.' },
  { subject: 'IPA', topic: 'Kalor', difficulty: 'Normal', question: 'Satuan kalor dalam SI adalah ...', options: ['Joule', 'Kalori', 'Watt', 'Kelvin'], correct_index: 0, explanation: 'Kalor merupakan bentuk energi sehingga satuannya Joule (1 kalori = 4,2 J).' },
  { subject: 'IPA', topic: 'Gelombang', difficulty: 'Normal', question: 'Bunyi termasuk jenis gelombang ...', options: ['Mekanik longitudinal', 'Elektromagnetik transversal', 'Mekanik transversal', 'Elektromagnetik longitudinal'], correct_index: 0, explanation: 'Bunyi adalah gelombang mekanik longitudinal yang memerlukan medium.' },
  { subject: 'IPA', topic: 'Listrik', difficulty: 'Easy', question: 'Satuan kuat arus listrik adalah ...', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], correct_index: 0, explanation: 'Kuat arus listrik diukur dalam ampere (A).' },
  { subject: 'IPA', topic: 'Listrik', difficulty: 'Hard', question: 'Hukum Ohm menyatakan hubungan V = ...', options: ['I × R', 'I + R', 'I / R', 'R / I'], correct_index: 0, explanation: 'Tegangan (V) = kuat arus (I) × hambatan (R).' },
  { subject: 'IPA', topic: 'Magnet', difficulty: 'Easy', question: 'Kutub magnet yang senama jika didekatkan akan ...', options: ['Tolak-menolak', 'Tarik-menarik', 'Diam', 'Berputar'], correct_index: 0, explanation: 'Kutub senama tolak-menolak, kutub berbeda tarik-menarik.' },
  { subject: 'IPA', topic: 'Optik', difficulty: 'Normal', question: 'Alat optik yang berfungsi mengamati benda-benda kecil adalah ...', options: ['Mikroskop', 'Teleskop', 'Periskop', 'Kamera'], correct_index: 0, explanation: 'Mikroskop memperbesar bayangan benda berukuran sangat kecil.' },
  { subject: 'IPA', topic: 'Kimia', difficulty: 'Easy', question: 'Lambang kimia untuk unsur oksigen adalah ...', options: ['O', 'Oks', 'Ox', 'O2'], correct_index: 0, explanation: 'Lambang unsur oksigen adalah O (O₂ adalah rumus molekulnya).' },
  { subject: 'IPA', topic: 'Kimia', difficulty: 'Normal', question: 'Nomor atom suatu unsur menyatakan jumlah ...', options: ['Proton', 'Neutron', 'Elektron + neutron', 'Nukleon saja'], correct_index: 0, explanation: 'Nomor atom sama dengan jumlah proton dalam inti.' },
  { subject: 'IPA', topic: 'Kimia', difficulty: 'Normal', question: 'pH larutan yang bersifat netral adalah ...', options: ['7', '0', '14', '1'], correct_index: 0, explanation: 'pH 7 menunjukkan larutan netral; < 7 asam, > 7 basa.' },
  { subject: 'IPA', topic: 'Asam basa', difficulty: 'Hard', question: 'Larutan asam jika diuji dengan kertas lakmus akan ...', options: ['Memerahkan lakmus biru', 'Membirukan lakmus merah', 'Tidak mengubah warna', 'Menetralkan lakmus'], correct_index: 0, explanation: 'Asam memerahkan lakmus biru; basa membirukan lakmus merah.' },
  { subject: 'IPA', topic: 'Ikatan', difficulty: 'Hard', question: 'Ik
