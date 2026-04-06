# 🎓 Website OSIS - Organisasi Siswa Intra Sekolah

Selamat datang! Website OSIS organisasi Anda sudah siap pakai dengan desain modern dan fitur lengkap. 

---

## 📁 STRUKTUR FILE

```
website osis/
├── index.html          (Halaman utama - struktur HTML)
├── stylesheet.css      (Desain & styling)
├── main.js            (Interaktivitas & function)
├── PANDUAN.md         (Panduan lengkap pengisian)
└── README.md          (File ini)
```

---

## 🚀 FITUR WEBSITE

### 1. **Navbar Responsif**
   - Menu navigasi yang rapi
   - Hamburger menu untuk mobile
   - Smooth scroll ke setiap section

### 2. **Hero Section**
   - Banner menarik dengan animasi
   - Call-to-action button

### 3. **Tentang OSIS**
   - Sejarah berdiri organisasi
   - Visi & Misi

### 4. **Struktur Organisasi (Lengkap!)**
   - 2 Pembina (Putri & Putra)
   - 1 Ketua & 1 Wakil Ketua
   - 2 Sekretaris & 2 Bendahara
   - 6 Bidang dengan:
     - 1 Ketua Bidang
     - 4 Anggota per bidang
   - Total: **44 anggota** yang bisa ditampilkan

### 5. **Galeri Foto**
   - Tampilan grid modern
   - Filter berdasarkan kategori
   - Smooth animations

### 6. **Form Aspirasi Siswa** ⭐
   - Input nama, email, kelas
   - Kategori aspirasi
   - Textarea untuk pesan (max 500 karakter)
   - Validasi otomatis
   - Bisa diintegrasikan dengan email

### 7. **Kontak & Social Media**
   - Informasi kontak sekolah
   - Link social media
   - Icon menarik

### 8. **Footer**
   - Copyright & credits

---

## 🎨 DESAIN FEATURES

### Color Palette (Modern)
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Background**: Light Blue (#f0f9ff)

### Typography
- **Heading**: Poppins (geometric, modern)
- **Body**: Inter (clean, readable)

### Responsive
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

### Animasi
- Smooth scroll
- Fade-in pada load
- Hover effects yang elegan
- Loading animations

---

## 📝 YANG PERLU ANDA ISI

**Placeholder dengan `[TANDA INI]` harus diganti dengan data asli Anda:**

1. **Sejarah OSIS** - [MASUKKAN SEJARAH BERDIRINYA OSIS DI SINI]
2. **Nama-nama Anggota** - 44 posisi berbeda
3. **Nama-nama Bidang** - 6 bidang dengan deskripsi
4. **Foto Anggota** - Ganti dengan foto real (optional tapi recommended!)
5. **Galeri Foto** - Upload foto kegiatan OSIS
6. **Email Kontak** - Ubah email OSIS Anda
7. **Kontak Informasi** - Alamat, telepon sekolah

**📄 LIHAT PANDUAN.md untuk penjelasan detail!**

---

## 🖼️ CARA MENAMBAH FOTO

### Untuk Foto Profil Anggota:
```html
<!-- Ganti ini -->
<div class="photo-placeholder">
    <i class="fas fa-user"></i>
</div>

<!-- Dengan ini -->
<img src="images/nama-anggota.jpg" alt="Nama Anggota">
```

### Untuk Galeri:
Buat folder `images/` dan upload foto, lalu:
```html
<img src="images/foto-kegiatan.jpg" alt="Deskripsi">
```

---

## 💻 CARA BUKA DI BROWSER

1. **Buka file** `index.html` dengan double-click, ATAU
2. **Drag & drop** `index.html` ke browser, ATAU
3. **Klik kanan** > Open with > Browser

Website akan langsung berjalan tanpa install apa-pun! (Sudah include semua library dari CDN)

---

## 🔧 TIPS DEVELOPMENT

### Edit File
- **Konten**: Edit `index.html`
- **Desain**: Edit `stylesheet.css`
- **Interaktif**: Edit `main.js`

### Preview Tanpa Upload
- Buka `index.html` langsung di browser
- Refresh (F5) setiap kali ada perubahan

### Untuk Live Server (Optional)
- Install VS Code extension "Live Server"
- Klik kanan > Open with Live Server
- Auto-refresh saat ada perubahan

---

## 📧 SETUP EMAIL UNTUK FORM ASPIRASI

Form sudah jadi, tapi belum terhubung email. Untuk email:

### Pilihan 1: EmailJS (Recommended)
1. Daftar gratis di https://www.emailjs.com/
2. Ikuti instruksi di PANDUAN.md
3. Setup API key

### Pilihan 2: Google Forms (Alternative)
- Buat form di Google Forms
- Embed di website

### Pilihan 3: Backend Server
- Upload ke hosting dengan PHP/Node.js
- Setup email di server

---

## 🎯 REKOMENDASI NEXT STEPS

- [ ] **Hari 1**: Isi semua nama & data anggota
- [ ] **Hari 2**: Kumpulkan foto anggota (JPG/PNG)
- [ ] **Hari 3**: Tulis sejarah & visi misi
- [ ] **Hari 4**: Setup email aspirasi
- [ ] **Hari 5**: Upload foto ke galeri
- [ ] **Hari 6**: Test semua fitur
- [ ] **Hari 7**: Publish ke domain!

---

## 🌐 HOSTING RECOMMENDATIONS

Untuk upload website ke internet:

### Gratis:
- **Netlify** (netlify.com) - Drag & drop mudah
- **Vercel** (vercel.com) - Optimal untuk static sites
- **GitHub Pages** (github.com) - Gratis & reliable

### Berbayar (Indonesia):
- **Niagahoster** - Hosting + domain
- **DomaiNesia** - Local, customer service bagus
- **Hostinger** - Murah & cepat

---

## ✅ CHECKLIST SEBELUM PUBLISH

- [ ] Semua nama sudah diisi dengan benar
- [ ] Email kontak sudah diganti dengan email asli
- [ ] Foto sudah ditambahkan (atau pakai placeholder dulu)
- [ ] Sejarah & visi misi sudah ditulis
- [ ] Form aspirasi sudah tested
- [ ] Links social media sudah diupdate  
- [ ] Website sudah ditest di mobile
- [ ] Tidak ada error di console (F12)

---

## 🆘 TROUBLESHOOTING

**Q: Website tidak tampil?**
A: Pastikan buka `index.html` langsung, bukan file CSS/JS

**Q: Foto tidak muncul?**
A: Pastikan path folder benar. Gunakan folder `images/` di folder yang sama dengan index.html

**Q: Form tidak bekerja?**
A: Normal! Form belum terhubung email. Lihat PANDUAN.md untuk setup email.

**Q: Mau ganti warna?**
A: Edit `:root` di stylesheet.css. Lihat PANDUAN.md untuk color codes.

---

## 📞 BANTUAN

Jika ada yang tidak jelas:
1. Baca **PANDUAN.md** (sudah sangat detail)
2. Lihat **comment di HTML** untuk penjelasan struktur
3. Tanyakan ke saya untuk custom features

---

## 📜 LISENSI & KREDIT

Website ini dibuat dengan:
- **HTML5** - Struktur
- **CSS3** - Styling modern
- **JavaScript** - Interaktivitas
- **FontAwesome** - Icons
- **Google Fonts** - Typography

**Made with ❤️ untuk OSIS Anda!**

---

**Status: ✅ READY TO USE!**

Selamat menggunakan website OSIS Anda! Semoga menjadi wadah organisasi yang hebat! 🎉
