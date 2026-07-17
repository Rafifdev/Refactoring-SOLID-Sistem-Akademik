# Sistem Akademik - SOLID Refactoring (UAS PBO)

Repositori ini berisi hasil refactoring program **Sistem Akademik** untuk memenuhi tugas UAS pemrograman Berorientasi Objek (PBO). Desain baru telah menerapkan prinsip SOLID (**SRP, OCP, ISP, DIP**) menggunakan TypeScript.

## 👥 Profil Mahasiswa
1. **Rafif Labied Alekhan** (NIM: 24.01.5148)
2. **Andi Wicaksono** (NIM: 24.01.5149)

---

## 🛠️ Prasyarat (Prerequisites)
Pastikan komputer Anda sudah terinstall:
- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru)
- Git (opsional)

---

## 🚀 Cara Menjalankan Project

### 1. Clone atau Ekstrak Repositori
Jika menggunakan Git:
```bash
git clone <url-repositori-ini>
cd Refactoring-SOLID-Sistem-Akademik
```

### 2. Install Dependensi
Jalankan perintah berikut untuk menginstall dependensi TypeScript:
```bash
npm install
```

### 3. Compile Program (TypeScript ke JavaScript)
Jalankan compiler TypeScript (`tsc`) untuk menghasilkan build di folder `dist`:
```bash
npx tsc
```
*(Catatan: Perintah ini akan membaca konfigurasi dari `tsconfig.json` dan men-generate file `.js` di dalam folder `./dist`)*

### 4. Jalankan Program
Setelah proses kompilasi selesai, jalankan kode JavaScript yang dihasilkan menggunakan Node.js:
```bash
node dist/main.js
```

---

## 📁 Struktur Folder
* `src/interfaces/`: Definisi abstraksi kontrak (DIP & ISP).
* `src/models/`: Model entitas `Student` beserta enkapsulasi data dan logika validasi SKS (2/4) & Grade (A-E).
* `src/repositories/`: Logika penyimpanan/persistensi data (SRP).
* `src/services/`: Logika bisnis pemrosesan mahasiswa, pembuatan transkrip, dan pengiriman notifikasi.
* `src/main.ts`: Entry point program dan tempat dilakukannya Dependency Injection (DIP).
* `laporan.md`: Dokumen laporan lengkap analisis SOLID, UML class diagram (Mermaid), dan rincian implementasi.
