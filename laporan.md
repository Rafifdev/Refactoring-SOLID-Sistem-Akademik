  # Laporan UAS PBO - Refactoring Sistem Akademik Berdasarkan Prinsip SOLID

  ---

  ## 1. Analisis Awal

  ### 1.1 Desain Awal

  Sistem akademik memiliki satu class monolitik bernama `AcademicSystem`:

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

  ### 1.2 Permasalahan yang Ditemukan

  Class `AcademicSystem` memiliki **8 method** yang menangani **4 tanggung jawab berbeda** sekaligus:

  | No | Tanggung Jawab | Method Terkait |
  |----|----------------|----------------|
  | 1 | Manajemen Data Mahasiswa (CRUD) | `createStudent()`, `updateStudent()`, `deleteStudent()` |
  | 2 | Pembuatan Transkrip | `printTranscript()`, `exportTranscriptPdf()` |
  | 3 | Pengiriman Notifikasi | `sendEmailNotification()`, `sendWhatsappNotification()` |
  | 4 | Persistensi Database | `saveToDatabase()` |

  ### 1.3 Pelanggaran Prinsip SOLID

  #### ❌ SRP (Single Responsibility Principle) — DILANGGAR
  > "A class should have only one reason to change."

  Class `AcademicSystem` memiliki **4 alasan untuk berubah**:
  - Perubahan logika CRUD mahasiswa
  - Perubahan format transkrip
  - Perubahan channel notifikasi
  - Perubahan mekanisme penyimpanan database

  Setiap perubahan pada salah satu fitur berpotensi menyebabkan side-effect pada fitur lain.

  #### ❌ OCP (Open/Closed Principle) — DILANGGAR
  > "Software entities should be open for extension, but closed for modification."xxxzz

  Untuk menambahkan jenis notifikasi baru (misalnya Telegram atau SMS), kita harus **memodifikasi class AcademicSystem** yang sudah ada, bukan hanya menambahkan class baru.

  #### ❌ ISP (Interface Segregation Principle) — DILANGGAR
  > "Clients should not be forced to depend on interfaces they do not use."

  Client yang hanya membutuhkan fitur transkrip tetap harus bergantung pada seluruh `AcademicSystem`, termasuk method notifikasi dan database yang tidak diperlukan.

  #### ❌ DIP (Dependency Inversion Principle) — DILANGGAR
  > "High-level modules should not depend on low-level modules. Both should depend on abstractions."

  Class `AcademicSystem` bergantung langsung pada implementasi konkret (misalnya cara menyimpan ke database, cara mengirim email), tanpa ada lapisan abstraksi.

  ---

  ## 2. Desain Baru

  ### 2.1 Struktur Folder

  ```
  src/
  ├── interfaces/                          # Abstraksi (DIP & ISP)
  │   ├── IStudentRepository.ts           # Interface untuk operasi CRUD
  │   ├── ITranscriptService.ts           # Interface untuk layanan transkrip
  │   └── INotificationService.ts         # Interface untuk layanan notifikasi
  ├── models/                              # Entitas Data
  │   └── Student.ts                      # Model mahasiswa (Encapsulation)
  ├── repositories/                        # Lapisan Persistensi (SRP)
  │   └── StudentRepository.ts           # Implementasi penyimpanan data
  ├── services/                            # Lapisan Logika Bisnis (SRP)
  │   ├── StudentService.ts              # Service CRUD mahasiswa
  │   ├── TranscriptService.ts           # Service transkrip teks
  │   ├── PdfTranscriptService.ts        # Service transkrip PDF
  │   ├── EmailNotificationService.ts    # Service notifikasi email
  │   └── WhatsappNotificationService.ts # Service notifikasi WhatsApp
  └── main.ts                              # Entry point & Dependency Injection
  ```

  ### 2.2 UML Class Diagram

  ```mermaid
  classDiagram
      direction TB

      class Student {
          -_id: string
          -_name: string
          -_email: string
          -_phone: string
          -_major: string
          -_grades: Grade[]
          +constructor(id, name, email, phone, major)
          +get id(): string
          +get name(): string
          +set name(value: string)
          +get email(): string
          +set email(value: string)
          +get phone(): string
          +set phone(value: string)
          +get major(): string
          +get grades(): Grade[]
          +addGrade(grade: Grade): void
          +calculateGPA(): number
          +getTotalCredits(): number
          +toString(): string
      }

      class Grade {
          <<interface>>
          +courseCode: string
          +courseName: string
          +credits: number
          +score: number
          +grade: string
      }

      class IStudentRepository {
          <<interface>>
          +save(student: Student): void
          +update(student: Student): void
          +delete(id: string): void
          +findById(id: string): Student | null
          +findAll(): Student[]
      }

      class ITranscriptService {
          <<interface>>
          +generateTranscript(student: Student): string
          +exportTranscript(student: Student): string
      }

      class INotificationService {
          <<interface>>
          +send(recipient: string, message: string): void
          +getType(): string
      }

      class StudentRepository {
          -storage: Map~string, Student~
          +save(student: Student): void
          +update(student: Student): void
          +delete(id: string): void
          +findById(id: string): Student | null
          +findAll(): Student[]
      }

      class StudentService {
          -repository: IStudentRepository
          +constructor(repository: IStudentRepository)
          +createStudent(id, name, email, phone, major): Student
          +updateStudent(id, updates): Student | null
          +deleteStudent(id): boolean
          +getStudent(id): Student | null
          +getAllStudents(): Student[]
      }

      class TranscriptService {
          +generateTranscript(student: Student): string
          +exportTranscript(student: Student): string
      }

      class PdfTranscriptService {
          +generateTranscript(student: Student): string
          +exportTranscript(student: Student): string
      }

      class EmailNotificationService {
          +send(recipient: string, message: string): void
          +getType(): string
      }

      class WhatsappNotificationService {
          +send(recipient: string, message: string): void
          +getType(): string
      }

      Student *-- Grade : contains

      IStudentRepository <|.. StudentRepository : implements
      ITranscriptService <|.. TranscriptService : implements
      ITranscriptService <|.. PdfTranscriptService : implements
      INotificationService <|.. EmailNotificationService : implements
      INotificationService <|.. WhatsappNotificationService : implements

      StudentService --> IStudentRepository : depends on (DIP)
      StudentRepository --> Student : manages
      TranscriptService --> Student : uses
      PdfTranscriptService --> Student : uses
  ```

  ### 2.3 Penjelasan Class dan Interface

  #### Interfaces (Abstraksi)

  | Interface | Tanggung Jawab | Prinsip |
  |-----------|----------------|---------|
  | `IStudentRepository` | Mendefinisikan kontrak operasi CRUD data mahasiswa | ISP, DIP |
  | `ITranscriptService` | Mendefinisikan kontrak pembuatan dan ekspor transkrip | ISP, DIP |
  | `INotificationService` | Mendefinisikan kontrak pengiriman notifikasi | ISP, DIP |

  #### Models

  | Class | Tanggung Jawab | Prinsip OOP |
  |-------|----------------|-------------|
  | `Student` | Merepresentasikan entitas mahasiswa dengan data dan behaviour | Encapsulation, Constructor |

  #### Repositories

  | Class | Implements | Tanggung Jawab | Prinsip |
  |-------|------------|----------------|---------|
  | `StudentRepository` | `IStudentRepository` | Penyimpanan data mahasiswa (in-memory) | SRP, DIP |

  #### Services

  | Class | Implements | Tanggung Jawab | Prinsip |
  |-------|------------|----------------|---------|
  | `StudentService` | - | Logika bisnis CRUD mahasiswa | SRP, DIP |
  | `TranscriptService` | `ITranscriptService` | Pembuatan transkrip format teks | SRP, DIP |
  | `PdfTranscriptService` | `ITranscriptService` | Ekspor transkrip ke PDF | SRP, DIP, OCP |
  | `EmailNotificationService` | `INotificationService` | Notifikasi via email | SRP, DIP, OCP |
  | `WhatsappNotificationService` | `INotificationService` | Notifikasi via WhatsApp | SRP, DIP, OCP |

  ---

  ## 3. Implementasi

  ### 3.1 Interface - IStudentRepository

  ```typescript
  import { Student } from "../models/Student";

  export interface IStudentRepository {
    save(student: Student): void;
    update(student: Student): void;
    delete(id: string): void;
    findById(id: string): Student | null;
    findAll(): Student[];
  }
  ```

  ### 3.2 Interface - ITranscriptService

  ```typescript
  import { Student } from "../models/Student";

  export interface ITranscriptService {
    generateTranscript(student: Student): string;
    exportTranscript(student: Student): string;
  }
  ```

  ### 3.3 Interface - INotificationService

  ```typescript
  export interface INotificationService {
    send(recipient: string, message: string): void;
    getType(): string;
  }
  ```

  ### 3.4 Model - Student (Encapsulation & Constructor)

  ```typescript
  export interface Grade {
    courseCode: string;
    courseName: string;
    credits: number;
    score: number;
    grade: string;
  }

  export class Student {
    private _id: string;
    private _name: string;
    private _email: string;
    private _phone: string;
    private _major: string;
    private _grades: Grade[];

    constructor(id: string, name: string, email: string, phone: string, major: string) {
      this._id = id;
      this._name = name;
      this._email = email;
      this._phone = phone;
      this._major = major;
      this._grades = [];
    }

    // Getter & Setter dengan validasi (Encapsulation)
    get id(): string { return this._id; }
    get name(): string { return this._name; }
    set name(value: string) {
      if (!value || value.trim().length === 0) throw new Error("Nama tidak boleh kosong.");
      this._name = value.trim();
    }
    // ... getter/setter lainnya

    addGrade(grade: Grade): void {
      if (grade.credits !== 2 && grade.credits !== 4) {
        throw new Error("SKS tidak valid. SKS hanya boleh 2 atau 4.");
      }
      const validGrades = ["A", "B", "C", "D", "E"];
      if (!validGrades.includes(grade.grade)) {
        throw new Error("Grade tidak valid. Grade hanya boleh A, B, C, D, atau E.");
      }
      const gradeScores: { [key: string]: number } = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, E: 0.0 };
      grade.score = gradeScores[grade.grade];
      this._grades.push(grade);
    }

    calculateGPA(): number {
      if (this._grades.length === 0) return 0;
      let totalPoints = 0, totalCredits = 0;
      for (const grade of this._grades) {
        totalPoints += grade.score * grade.credits;
        totalCredits += grade.credits;
      }
      return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
    }
  }
  ```

  ### 3.5 Repository - StudentRepository (SRP)

  ```typescript
  import { Student } from "../models/Student";
  import { IStudentRepository } from "../interfaces/IStudentRepository";

  export class StudentRepository implements IStudentRepository {
    private storage: Map<string, Student>;

    constructor() {
      this.storage = new Map<string, Student>();
    }

    save(student: Student): void {
      if (this.storage.has(student.id)) {
        throw new Error(`Mahasiswa dengan ID ${student.id} sudah ada.`);
      }
      this.storage.set(student.id, student);
    }

    update(student: Student): void {
      if (!this.storage.has(student.id)) {
        throw new Error(`Mahasiswa dengan ID ${student.id} tidak ditemukan.`);
      }
      this.storage.set(student.id, student);
    }

    delete(id: string): void {
      this.storage.delete(id);
    }

    findById(id: string): Student | null {
      return this.storage.get(id) || null;
    }

    findAll(): Student[] {
      return Array.from(this.storage.values());
    }
  }
  ```

  ### 3.6 Service - StudentService (SRP & DIP)

  ```typescript
  import { Student } from "../models/Student";
  import { IStudentRepository } from "../interfaces/IStudentRepository";

  export class StudentService {
    private repository: IStudentRepository; // DIP: Bergantung pada abstraksi

    constructor(repository: IStudentRepository) { // Constructor Injection
      this.repository = repository;
    }

    createStudent(id: string, name: string, email: string, phone: string, major: string): Student {
      const student = new Student(id, name, email, phone, major);
      this.repository.save(student);
      return student;
    }

    updateStudent(id: string, updates: { name?: string; email?: string }): Student | null {
      const student = this.repository.findById(id);
      if (!student) return null;
      if (updates.name) student.name = updates.name;
      if (updates.email) student.email = updates.email;
      this.repository.update(student);
      return student;
    }

    deleteStudent(id: string): boolean {
      const student = this.repository.findById(id);
      if (!student) return false;
      this.repository.delete(id);
      return true;
    }
  }
  ```

  ### 3.7 Contoh Penggunaan (main.ts) - Dependency Injection

  ```typescript
  // Import semua modul (Export & Import)
  import { StudentRepository } from "./repositories/StudentRepository";
  import { StudentService } from "./services/StudentService";
  import { TranscriptService } from "./services/TranscriptService";
  import { PdfTranscriptService } from "./services/PdfTranscriptService";
  import { EmailNotificationService } from "./services/EmailNotificationService";
  import { WhatsappNotificationService } from "./services/WhatsappNotificationService";
  import { IStudentRepository } from "./interfaces/IStudentRepository";
  import { ITranscriptService } from "./interfaces/ITranscriptService";
  import { INotificationService } from "./interfaces/INotificationService";

  // Dependency Injection - high-level bergantung pada abstraksi
  const studentRepository: IStudentRepository = new StudentRepository();
  const studentService = new StudentService(studentRepository);
  const transcriptService: ITranscriptService = new TranscriptService();
  const pdfTranscriptService: ITranscriptService = new PdfTranscriptService();
  const notificationServices: INotificationService[] = [
    new EmailNotificationService(),
    new WhatsappNotificationService(),
  ];

  // Penggunaan
  const student = studentService.createStudent("24.01.5148", "Rafif Labied Alekhan", "rafiflabiedalekhan@amikom.ac.id", "081234567890", "Informatika");
  student.addGrade({ courseCode: "DT193", courseName: "Pemrograman Berorientasi Object", credits: 4, score: 4.00, grade: "A" });

  transcriptService.generateTranscript(student);
  pdfTranscriptService.exportTranscript(student);

  notificationServices.forEach(service => {
    service.send(student.email, `Transkrip diperbarui. IPK: ${student.calculateGPA()}`);
  });
  ```

  ---

  ## 4. Kesimpulan

  ### 4.1 Manfaat Penerapan SOLID

  | Aspek | Sebelum (Monolitik) | Sesudah (SOLID) |
  |-------|---------------------|-----------------|
  | **Maintainability** | Sulit — perubahan satu fitur berdampak ke fitur lain | Mudah — setiap class independen |
  | **Extensibility** | Harus modifikasi class yang ada | Cukup tambah class baru (OCP) |
  | **Testability** | Sulit di-unit test karena tightly coupled | Mudah di-mock menggunakan interface |
  | **Reusability** | Tidak bisa dipakai ulang secara terpisah | Setiap service bisa dipakai independen |
  | **Readability** | Class besar dan kompleks | Class kecil, fokus, dan mudah dibaca |

  ### 4.2 Prinsip SOLID yang Diterapkan

  1. **SRP (Single Responsibility Principle)**: Setiap class hanya memiliki satu tanggung jawab tunggal. `StudentService` hanya menangani logika bisnis mahasiswa, `TranscriptService` hanya menangani transkrip, `EmailNotificationService` hanya menangani email, dan `StudentRepository` hanya menangani penyimpanan data.

  2. **OCP (Open/Closed Principle)**: Sistem terbuka untuk ekstensi tanpa modifikasi. Untuk menambahkan notifikasi Telegram, cukup buat class `TelegramNotificationService` yang mengimplementasikan `INotificationService`. Tidak ada kode yang perlu diubah.

  3. **ISP (Interface Segregation Principle)**: Interface dipecah menjadi `IStudentRepository`, `ITranscriptService`, dan `INotificationService`. Setiap client hanya bergantung pada interface yang dibutuhkan, bukan pada satu interface besar.

  4. **DIP (Dependency Inversion Principle)**: High-level module (`StudentService`) bergantung pada abstraksi (`IStudentRepository`), bukan pada implementasi konkret (`StudentRepository`). Dependency disuntikkan melalui constructor injection.

  ### 4.3 Prinsip OOP yang Diterapkan

  - **Class dan Object**: Semua komponen dimodelkan sebagai class (`Student`, `StudentService`, `TranscriptService`, dll.)
  - **Constructor**: Setiap class memiliki constructor untuk inisialisasi state
  - **Encapsulation**: Class `Student` menggunakan private fields dengan getter/setter yang memiliki validasi
  - **Module (Export & Import)**: Setiap file adalah module terpisah yang di-export dan di-import sesuai kebutuhan
  - **Interface**: Digunakan sebagai kontrak abstraksi antar komponen

  ### 4.4 Ringkasan

  Refactoring dari class monolitik `AcademicSystem` menjadi desain modular dengan prinsip SOLID telah berhasil mengatasi masalah yang dikeluhkan dosen pengembang. Setiap perubahan fitur kini hanya berdampak pada class yang terkait, bukan pada seluruh sistem. Desain ini lebih mudah dipelihara, diuji, dan diperluas sesuai kebutuhan di masa mendatang.
