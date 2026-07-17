// Import Models
import { Student, Grade } from "./models/Student";

// Import Interfaces (Abstraksi)
import { IStudentRepository } from "./interfaces/IStudentRepository";
import { ITranscriptService } from "./interfaces/ITranscriptService";
import { INotificationService } from "./interfaces/INotificationService";

// Import Implementasi Konkret
import { StudentRepository } from "./repositories/StudentRepository";
import { StudentService } from "./services/StudentService";
import { TranscriptService } from "./services/TranscriptService";
import { PdfTranscriptService } from "./services/PdfTranscriptService";
import { EmailNotificationService } from "./services/EmailNotificationService";
import { WhatsappNotificationService } from "./services/WhatsappNotificationService";


console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║       SISTEM AKADEMIK - Refactored dengan SOLID          ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");

// 1. Inisialisasi Repository (implementasi konkret)
const studentRepository: IStudentRepository = new StudentRepository();

// 2. Inisialisasi Services dengan Dependency Injection
const studentService = new StudentService(studentRepository);
const transcriptService: ITranscriptService = new TranscriptService();
const pdfTranscriptService: ITranscriptService = new PdfTranscriptService();

// 3. Inisialisasi Notification Services
const notificationServices: INotificationService[] = [
  new EmailNotificationService(),
  new WhatsappNotificationService(),
];

console.log("-".repeat(60));
console.log("1. MEMBUAT DATA MAHASISWA (Create)");
console.log("-".repeat(60));

const student1 = studentService.createStudent(
  "24.01.5148",
  "Rafif Labied Alekhan",
  "rafiflabiedalekhan@amikom.ac.id",
  "081234567890",
  "Teknik Informatika"
);

const student2 = studentService.createStudent(
  "24.01.5149",
  "Andi Wicaksono",
  "andiwicaksono@amikom.ac.id",
  "082345678901",
  "Teknik Informatika"
);

// Menambahkan nilai untuk mahasiswa 1 (Rafif Labied Alekhan)
const grades1: Grade[] = [
  { courseCode: "DT193", courseName: "Pemrograman Berorientasi Object", credits: 4, score: 4.00, grade: "A" },
  { courseCode: "DT194", courseName: "Big Data Fundamental", credits: 2, score: 3.00, grade: "B" },
  { courseCode: "DT206", courseName: "Development Operations", credits: 4, score: 4.00, grade: "A" },
  { courseCode: "DT157", courseName: "Manajemen Proyek", credits: 2, score: 2.00, grade: "C" },
  { courseCode: "DT032", courseName: "Metodologi Penelitian", credits: 2, score: 3.00, grade: "B" },
];

grades1.forEach((grade) => student1.addGrade(grade));

// Menambahkan nilai untuk mahasiswa 2 (Andi Wicaksono)
const grades2: Grade[] = [
  { courseCode: "DT193", courseName: "Pemrograman Berorientasi Object", credits: 4, score: 3.00, grade: "B" },
  { courseCode: "DT194", courseName: "Big Data Fundamental", credits: 2, score: 4.00, grade: "A" },
  { courseCode: "DT206", courseName: "Development Operations", credits: 4, score: 2.00, grade: "C" },
  { courseCode: "DT157", courseName: "Manajemen Proyek", credits: 2, score: 3.00, grade: "B" },
  { courseCode: "DT032", courseName: "Metodologi Penelitian", credits: 2, score: 4.00, grade: "A" },
];

grades2.forEach((grade) => student2.addGrade(grade));

console.log("");

// ============================================================
console.log("-".repeat(60));
console.log("2. MEMBACA DATA MAHASISWA (Read)");
console.log("-".repeat(60));

const allStudents = studentService.getAllStudents();
console.log(`\nJumlah mahasiswa terdaftar: ${allStudents.length}`);
allStudents.forEach((s) => console.log(` ${s.toString()}`));

console.log("");

// ============================================================
console.log("-".repeat(60));
console.log("3. MEMPERBARUI DATA MAHASISWA (Update)");
console.log("-".repeat(60));

studentService.updateStudent("24.01.5148", {
  email: "rafiflabiedalekhan@amikom.ac.id",
  phone: "089876543210",
});

console.log("");

// ============================================================
console.log("-".repeat(60));
console.log("4. MENCETAK TRANSKRIP (TranscriptService - SRP)");
console.log("-".repeat(60));

transcriptService.generateTranscript(student1);

console.log("");

// ============================================================
console.log("-".repeat(60));
console.log("5. EKSPOR TRANSKRIP PDF (PdfTranscriptService - SRP & OCP)");
console.log("-".repeat(60));

const pdfFile = pdfTranscriptService.exportTranscript(student1);
console.log(`\n File PDF dihasilkan: ${pdfFile}`);

console.log("");

// ============================================================
console.log("-".repeat(60));
console.log("6. MENGIRIM NOTIFIKASI (NotificationService - SRP & OCP)");
console.log("-".repeat(60));

const notificationMessage = `Halo ${student1.name}, transkrip akademik Anda telah diperbarui. IPK saat ini: ${student1.calculateGPA().toFixed(2)}`;

// Mengirim notifikasi melalui semua channel yang tersedia
notificationServices.forEach((service) => {
  console.log(`\n--- Notifikasi via ${service.getType()} ---`);
  const recipient =
    service.getType() === "Email" ? student1.email : student1.phone;
  service.send(recipient, notificationMessage);
});

console.log("");

// ============================================================
console.log("-".repeat(60));
console.log("7. MENGHAPUS DATA MAHASISWA (Delete)");
console.log("-".repeat(60));

studentService.deleteStudent("24.01.5149");

const remainingStudents = studentService.getAllStudents();
console.log(`\nJumlah mahasiswa tersisa: ${remainingStudents.length}`);
remainingStudents.forEach((s) => console.log(`${s.toString()}`));

console.log("");

console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║              Program selesai dijalankan.                ║");
console.log("╚══════════════════════════════════════════════════════════╝");
