# 📋 PANDUAN PENGISIAN WEBSITE OSIS

Website OSIS Anda sudah siap dengan struktur lengkap! Berikut panduan detail untuk mengisinya:

---

## 🎯 BAGIAN-BAGIAN YANG PERLU DIISI

### 1. **TENTANG OSIS**
**File:** index.html (Baris ~180-195)

Ganti placeholder berikut dengan konten Anda:
- `[MASUKKAN SEJARAH BERDIRINYA OSIS DI SINI]` → Tulis sejarah lengkap berdirinya OSIS Anda
- `[MASUKKAN VISI OSIS DI SINI]` → Visi organisasi
- `[MASUKKAN MISI 1-3]` → Misi-misi OSIS (minimal 3)

**Contoh:**
```
Sejarah: OSIS kami didirikan pada tahun 2020 sebagai wadah...
Visi: Menjadi organisasi yang...
Misi 1: Mengembangkan potensi siswa dalam bidang akademik
```

---

### 2. **STRUKTUR ORGANISASI**
**File:** index.html (Baris ~215-550)

#### Pembina (2 orang)
- `[NAMA PEMBINA PUTRI]` → Nama lengkap pembina putri
- `[NAMA PEMBINA PUTRA]` → Nama lengkap pembina putra

#### Pengurus Inti
- `[NAMA KETUA OSIS]` → Nama + Kelas ketua OSIS
- `[NAMA WAKIL KETUA]` → Nama + Kelas wakil ketua

#### Biro Administrasi & Keuangan
- `[NAMA SEKRETARIS 1]` → Nama + Kelas sekretaris 1
- `[NAMA SEKRETARIS 2]` → Nama + Kelas sekretaris 2
- `[NAMA BENDAHARA 1]` → Nama + Kelas bendahara 1
- `[NAMA BENDAHARA 2]` → Nama + Kelas bendahara 2

#### Bidang-Bidang (6 Bidang)
Untuk setiap bidang (Bidang 1-6), ganti:
- `[NAMA BIDANG]` → Nama bidang (misal: "Pendidikan", "Kesenian", "Olahraga", dll)
- `[NAMA KETUA BIDANG X]` → Nama ketua masing-masing bidang
- Untuk 4 anggota: `[NAMA ANGGOTA]` → Ganti dengan nama 4 anggota di setiap bidang

**Tips Bidang-Bidang yang Umum:**
1. Bidang Pendidikan & Sosial
2. Bidang Kesenian & Budaya
3. Bidang Komunikasi & Informasi
4. Bidang Olahraga & Kesehatan
5. Bidang Lingkungan & Kebersihan
6. Bidang Kepramukaan & Keterampilan

---

### 3. **GALERI FOTO**
**File:** index.html (Baris ~560-640)

Ada 6 placeholder foto yang bisa ditambah. Untuk setiap foto:

```html
<div class="galeri-item" data-category="kegiatan">
    <div class="galeri-photo">
        <div class="photo-placeholder">
            <i class="fas fa-image"></i>
        </div>
    </div>
    <h4>[JUDUL FOTO]</h4>
    <p class="galeri-desc">[DESKRIPSI FOTO]</p>
</div>
```

**Ganti:**
- `[JUDUL FOTO]` → Nama/Judul foto (misal: "Rapat Rutin OSIS")
- `[DESKRIPSI FOTO]` → Deskripsi singkat foto
- `data-category="kegiatan"` → Ubah ke: `kegiatan`, `profil`, atau `acara` untuk filter

**Untuk menambah foto ke data-uri or image URL:**
Ganti kode di dalam `<div class="galeri-photo">`:
```html
<img src="path/ke/foto.jpg" alt="Deskripsi" style="width: 100%; height: 100%; object-fit: cover;">
```

---

### 4. **FORM ASPIRASI**
**File:** index.html (Baris ~660-720)

Form sudah siap! User bisa langsung input:
- Nama Lengkap
- Email
- Kelas
- Kategori Aspirasi
- Pesan Aspirasi

**Untuk mengirim ke Email (opsional):**
Gunakan EmailJS library. Setup yang diperlukan:
1. Daftar di https://www.emailjs.com/
2. Dapatkan Service ID & Template ID
3. Tambahkan script di akhir file index.html

---

### 5. **KONTAK INFORMASI**
**File:** index.html (Baris ~760-795)

Ganti placeholder:
- `[MASUKKAN ALAMAT SEKOLAH]` → Alamat lengkap sekolah
- `osis@sekolah.sch.id` → Email OSIS Anda
- `(021) 1234-5678` → Nomor telepon OSIS/Sekolah

---

### 6. **FOTO ANGGOTA**
**File:** index.html (Banyak tempat)

Saat ini semua foto menggunakan placeholder icon. Untuk menambah foto:

**Ubah dari:**
```html
<div class="photo-placeholder">
    <i class="fas fa-user"></i>
</div>
```

**Menjadi:**
```html
<img src="path/ke/foto-anggota.jpg" alt="Nama Anggota" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
```

---

## 🎨 CARA MENAMBAH FOTO

### Metode 1: Upload ke folder
1. Buat folder `images` di dalam folder website osis
2. Upload foto ke folder `images`
3. Ganti path di HTML: `src="images/nama-foto.jpg"`

### Metode 2: Gunakan URL online
Jika foto sudah online, gunakan langsung:
```html
<img src="https://example.com/foto.jpg" alt="Deskripsi">
```

---

## 🌈 CUSTOMIZATION COLOR PALETTE

Jika ingin ganti warna, edit di **stylesheet.css** bagian `:root`:

**Warna Sekarang (Indigo-Purple):**
```css
--primary-color: #6366f1;      /* Indigo */
--secondary-color: #8b5cf6;    /* Purple */
--accent-color: #ec4899;       /* Pink */
```

**Pilihan Warna Lain:**

**Blue-Teal:**
```css
--primary-color: #0891b2;      /* Cyan */
--secondary-color: #06b6d4;    /* Light Cyan */
--accent-color: #f43f5e;       /* Rose */
```

**Green-Emerald:**
```css
--primary-color: #059669;      /* Emerald */
--secondary-color: #10b981;    /* Green */
--accent-color: #f59e0b;       /* Amber */
```

**Red-Orange:**
```css
--primary-color: #dc2626;      /* Red */
--secondary-color: #ea580c;    /* Orange */
--accent-color: #f59e0b;       /* Amber */
```

---

## 📄 TEMPLATE CONTOH (Copy-Paste)

### Contoh Struktur Organisasi
```
PEMBINA:
- Ibu [Nama Guru] (Pembina Putri)
- Bapak [Nama Guru] (Pembina Putra)

KETUA & WAKIL:
- [Nama Siswa] - Kelas 11 (Ketua OSIS)
- [Nama Siswa] - Kelas 11 (Wakil Ketua)

SEKRETARIS & BENDAHARA:
- [Nama Siswa] - Kelas 10 (Sekretaris 1)
- [Nama Siswa] - Kelas 10 (Sekretaris 2)
- [Nama Siswa] - Kelas 10 (Bendahara 1)
- [Nama Siswa] - Kelas 10 (Bendahara 2)

BIDANG 1 - Pendidikan:
- Ketua: [Nama] - Kelas 11
- Anggota: [Nama] - Kelas 10
- Anggota: [Nama] - Kelas 10
- Anggota: [Nama] - Kelas 9
- Anggota: [Nama] - Kelas 9
```

---

## 🚀 FITUR YANG SUDAH TERSEDIA

✅ **Responsive Design** - Berfungsi di desktop, tablet, mobile
✅ **Navegasi Hamburger** - Mobile-friendly menu
✅ **Filter Galeri** - Filter foto berdasarkan kategori
✅ **Form Aspirasi Interaktif** - Validasi form otomatis
✅ **Smooth Scrolling** - Scroll halus ke section
✅ **Dark Mode Ready** - Siap untuk implementasi dark mode
✅ **SEO Friendly** - Meta tags sudah ada

---

## 💡 TIPS TAMBAHAN

1. **Foto Anggota**: Gunakan foto dengan background solid untuk hasil terbaik
2. **Format Foto**: JPG atau PNG, ukuran optimal 300x300px untuk foto profil
3. **Font**: Sudah menggunakan Poppins & Inter (modern & clean)
4. **Loading**: Website akan lebih cepat jika foto di-compress terlebih dahulu
5. **Email Form**: Untuk fitur email, gunakan Firebase atau EmailJS

---

## 📧 SETUP EMAIL UNTUK FORM ASPIRASI (OPTIONAL)

### Menggunakan EmailJS:

1. Daftar di https://www.emailjs.com/ (gratis)
2. Buat template email
3. Dapatkan Service ID dan Template ID
4. Tambahkan script di akhir `</body>` index.html:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();
</script>
```

5. Update fungsi `sendAspirasi` di main.js untuk mengirim ke email

---

## ❓ PERTANYAAN UMUM

**Q: Bagaimana cara menambah anggota tambahan?**
A: Copy-paste card member dan ubah data-nya. Sudah responsive otomatis.

**Q: Bisa tambah bidang lebih dari 6?**
A: Ya, copy-paste section `bidang-section` dan ubah nomor bidang-nya.

**Q: Bagaimana cara custom domain?**
A: Upload ke hosting (Netlify, Vercel, atau hosting Indonesia seperti DomaiNesia)

**Q: Bisa pakai database?**
A: Ya, bisa integrate dengan Google Sheets / Firebase untuk data anggota

---

## 📞 SIAP DIGUNAKAN!

Website Anda sudah lengkap dengan:
- ✅ 6 Section utama
- ✅ Responsive design
- ✅ Interactivity & animations
- ✅ Form validation
- ✅ Modern design system

**Sekarang tinggal isi dengan data Anda! 🎉**

Jika ada yang kurang jelas, tanyakan ke saya! Saya siap membantu.
