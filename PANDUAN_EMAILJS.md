# Panduan Setup EmailJS untuk Fitur Aspirasi

## 📧 Cara Mengaktifkan Fitur Kirim Aspirasi ke Email

Fitur aspirasi sekarang dapat mengirim email langsung ke **osisosi@gmail.com** menggunakan layanan EmailJS. Ikuti panduan ini untuk mengaktifkan fitur tersebut.

### 📋 Langkah 1: Daftar Akun EmailJS

1. Kunjungi [EmailJS](https://www.emailjs.com/)
2. Klik **Sign Up** dan buat akun gratis
3. Verifikasi email Anda

### 📋 Langkah 2: Buat Email Service

1. Setelah login, klik **Email Services** di sidebar
2. Klik **Add New Service**
3. Pilih **Gmail** (atau provider email lainnya)
4. Ikuti instruksi untuk menghubungkan akun Gmail Anda
   - Anda perlu login ke akun Gmail yang akan mengirim email
   - EmailJS akan menggunakan akun ini untuk mengirim aspirasi
5. Beri nama service (misal: "OSIS Gmail")
6. Klik **Create Service**
7. **Catat Service ID** yang muncul (contoh: `service_abc123`)

### 📋 Langkah 3: Buat Email Template

1. Klik **Email Templates** di sidebar
2. Klik **Create New Template**
3. Pilih service yang baru dibuat
4. Isi template dengan format berikut:

**Subject:**
```
📬 Aspirasi Baru dari {{from_name}} - {{kategori}}
```

**To Email:**
```
osisosi@gmail.com
```

**Message (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; max-width: 600px; margin: 0 auto; }
        .info-row { margin: 15px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #667eea; }
        .info-label { font-weight: bold; color: #667eea; }
        .aspirasi-box { background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📬 Aspirasi Siswa Baru</h1>
        <p>Website OSIS - {{tanggal}}</p>
    </div>
    
    <div class="content">
        <h2>Detail Pengirim</h2>
        
        <div class="info-row">
            <p><span class="info-label">👤 Nama:</span> {{from_name}}</p>
        </div>
        
        <div class="info-row">
            <p><span class="info-label">📧 Email:</span> {{from_email}}</p>
        </div>
        
        <div class="info-row">
            <p><span class="info-label">🏫 Kelas:</span> {{kelas}}</p>
        </div>
        
        <div class="info-row">
            <p><span class="info-label">📝 Kategori:</span> {{kategori}}</p>
        </div>
        
        <h2>Isi Aspirasi</h2>
        <div class="aspirasi-box">
            <p>{{aspirasi}}</p>
        </div>
        
        <p><strong>Tanggal Pengiriman:</strong> {{tanggal}}</p>
    </div>
    
    <div class="footer">
        <p>Email ini dikirim otomatis dari Website OSIS</p>
        <p>Jangan balas email ini, hubungi osisosi@gmail.com untuk pertanyaan</p>
    </div>
</body>
</html>
```

5. Klik **Save** dan **Catat Template ID** (contoh: `template_xyz789`)

### 📋 Langkah 4: Dapatkan Public Key

1. Klik **Account** di sidebar (ikon user)
2. Di bagian **API Keys**, Anda akan melihat **Public Key**
3. **Salin Public Key** Anda (contoh: `user_abc123xyz`)

### 📋 Langkah 5: Update Kode Website

1. Buka file `index.html`
2. Cari baris berikut (di bagian `<head>`):
```html
<script type="text/javascript">
    (function() {
        // Initialize EmailJS with your public key
        // Ganti 'YOUR_PUBLIC_KEY' dengan public key dari EmailJS
        emailjs.init("YOUR_PUBLIC_KEY");
    })();
</script>
```

3. Ganti `YOUR_PUBLIC_KEY` dengan Public Key Anda:
```html
<script type="text/javascript">
    (function() {
        emailjs.init("user_abc123xyz"); // Ganti dengan public key Anda
    })();
</script>
```

4. Buka file `main.js`
5. Cari bagian `EMAILJS_CONFIG` (di sekitar baris 145):
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',      // Ganti dengan Public Key dari EmailJS
    serviceId: 'YOUR_SERVICE_ID',      // Ganti with Service ID dari EmailJS
    templateId: 'YOUR_TEMPLATE_ID'     // Ganti with Template ID from EmailJS
};
```

6. Ganti dengan kredensial Anda:
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'user_abc123xyz',       // Public Key Anda
    serviceId: 'service_abc123',       // Service ID Anda
    templateId: 'template_xyz789'      // Template ID Anda
};
```

### 📋 Langkah 6: Test Fitur Aspirasi

1. Buka website OSIS di browser
2. Scroll ke bagian **Aspirasi**
3. Isi form dengan data test:
   - Nama: Test User
   - Email: test@example.com
   - Kelas: Pilih salah satu
   - Kategori: Pilih salah satu
   - Aspirasi: Tulis pesan test
4. Centang checkbox persetujuan
5. Klik **Kirim Aspirasi Sekarang**
6. Tunggu beberapa detik
7. Periksa inbox **osisosi@gmail.com** untuk email yang masuk

### ✅ Selesai!

Fitur aspirasi sekarang aktif dan akan mengirim email ke osisosi@gmail.com setiap kali ada siswa yang mengirim aspirasi.

## 🔧 Troubleshooting

### Email tidak terkirim?

1. **Periksa kredensial EmailJS**
   - Pastikan Public Key, Service ID, dan Template ID benar
   - Cek di dashboard EmailJS

2. **Periksa Service Gmail**
   - Pastikan service Gmail aktif di EmailJS
   - Coba reconnect akun Gmail jika perlu

3. **Periksa Template**
   - Pastikan template menggunakan variable yang benar: `{{from_name}}`, `{{from_email}}`, dll
   - Pastikan To Email adalah `osisosi@gmail.com`

4. **Cek Console Browser**
   - Buka Developer Tools (F12)
   - Lihat tab Console untuk error messages
   - Error umum: "EmailJS belum diinisialisasi" berarti Public Key salah

5. **Batas Email Gratis**
   - Akun gratis EmailJS: 200 email/bulan
   - Jika melebihi batas, upgrade ke plan berbayar

### Alternatif jika EmailJS tidak bisa digunakan

Jika EmailJS tidak bisa digunakan, Anda bisa menggunakan alternatif:

1. **Formspree** (https://formspree.io/)
   - Gratis untuk 50 submissions/bulan
   - Lebih sederhana, tidak perlu JavaScript

2. **Google Forms**
   - Buat Google Form untuk aspirasi
   - Embed di website
   - Response langsung ke Google Sheets

3. **WhatsApp Direct Link**
   - Ganti form dengan link WhatsApp
   - Siswa langsung chat ke nomor OSIS

## 📊 Monitoring

Untuk melihat statistik pengiriman email:
1. Login ke dashboard EmailJS
2. Klik **Email History**
3. Lihat semua email yang terkirim
4. Filter berdasarkan status (sent, failed, etc.)

## 🔒 Keamanan

- Public Key aman untuk ditampilkan di client-side
- Jangan pernah share Private Key
- EmailJS menangani autentikasi dengan aman
- Data siswa dikirim langsung ke email OSIS

## 📞 Bantuan

Jika ada masalah:
1. Cek dokumentasi EmailJS: https://www.emailjs.com/docs/
2. Hubungi support EmailJS
3. Atau hubungi webmaster OSIS

---

**Catatan Penting:** Pastikan untuk mengganti semua placeholder (`YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`) dengan kredensial EmailJS Anda yang sebenarnya sebelum menggunakan fitur ini.