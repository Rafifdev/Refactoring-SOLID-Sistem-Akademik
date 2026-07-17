# PETUNJUK UMUM

1. Kerjakan setiap soal secara berkelompok 2-3 orang.
2. Setiap mahasiswa harus mengumpulkan Cover laporan pada dashboard.
3. Setiap soal harus menggunakan prinsip OOP yang baik.
4. Struktur folder dan kode harus rapi serta mudah dipahami.
5. Setiap soal wajib menggunakan:
   - Class dan Object
   - Constructor
   - Encapsulation
   - Namespace atau Module
   - Export dan Import
6. Dokumentasikan penerapan prinsip SOLID yang digunakan.

**Kumpulkan:**
- Source code (.ts)
- Laporan PDF
- Screenshot hasil program

---

# Refactoring Sistem Akademik Berdasarkan Prinsip SOLID

Perhatikan studi kasus berikut. Sistem akademik memiliki satu class bernama:

```typescript
class AcademicSystem {
  createStudent() {}
  updateStudent() {}
  deleteStudent() {}
  printTranscript() {}
  exportTranscriptPdf() {}
  sendEmailNotification() {}
  sendWhatsappNotification() {}
  saveToDatabase() {}
}
```

Dosen pengembang sistem mengeluhkan bahwa class tersebut semakin sulit dipelihara karena setiap perubahan fitur menyebabkan perubahan pada banyak bagian kode.

## Tugas

Lakukan analisis dan refactoring terhadap desain tersebut.

## Ketentuan

1. Identifikasi pelanggaran prinsip SOLID yang terjadi.
2. Buat desain ulang menggunakan Namespace atau Module serta Export dan Import.
3. Terapkan minimal:
   - SRP (Single Responsibility Principle)
   - ISP (Interface Segregation Principle)
   - DIP (Dependency Inversion Principle)
4. Buat diagram sederhana (UML Class Diagram) hasil refactoring.
5. Implementasikan sebagian fitur menggunakan TypeScript.

## Laporan Wajib Memuat (File md)

1. **Analisis Awal**: Permasalahan desain awal dan prinsip SOLID yang dilanggar.
2. **Desain Baru**: Struktur folder, penjelasan class dan interface.
3. **Implementasi**: Source code utama dan contoh penggunaan sistem.
4. **Kesimpulan**: Manfaat penerapan SOLID pada kasus tersebut.
