import { Student } from "../models/Student";
import { IStudentRepository } from "../interfaces/IStudentRepository";

export class StudentService {
  private repository: IStudentRepository;

  /**
   * Constructor dengan Dependency Injection
   * @param repository - Implementasi IStudentRepository yang akan digunakan
   */
  constructor(repository: IStudentRepository) {
    this.repository = repository;
  }

  /**
   * Membuat dan menyimpan mahasiswa baru
   * @param id - NIM mahasiswa
   * @param name - Nama lengkap
   * @param email - Alamat email
   * @param phone - Nomor telepon
   * @param major - Program studi
   * @returns Object Student yang telah dibuat
   */
  createStudent(
    id: string,
    name: string,
    email: string,
    phone: string,
    major: string
  ): Student {
    const student = new Student(id, name, email, phone, major);
    this.repository.save(student);
    console.log(`[StudentService] Mahasiswa baru berhasil dibuat: ${student.toString()}`);
    return student;
  }

  /**
   * Memperbarui data mahasiswa
   * @param id - ID mahasiswa yang akan diperbarui
   * @param updates - Object berisi field yang akan diperbarui
   * @returns Object Student yang telah diperbarui, atau null jika tidak ditemukan
   */
  updateStudent(
    id: string,
    updates: { name?: string; email?: string; phone?: string; major?: string }
  ): Student | null {
    const student = this.repository.findById(id);
    if (!student) {
      console.log(`[StudentService] Mahasiswa dengan ID ${id} tidak ditemukan.`);
      return null;
    }

    if (updates.name) student.name = updates.name;
    if (updates.email) student.email = updates.email;
    if (updates.phone) student.phone = updates.phone;
    if (updates.major) student.major = updates.major;

    this.repository.update(student);
    console.log(`[StudentService] Data mahasiswa berhasil diperbarui: ${student.toString()}`);
    return student;
  }

  /**
   * Menghapus mahasiswa berdasarkan ID
   * @param id - ID mahasiswa yang akan dihapus
   * @returns true jika berhasil dihapus
   */
  deleteStudent(id: string): boolean {
    const student = this.repository.findById(id);
    if (!student) {
      console.log(`[StudentService] Mahasiswa dengan ID ${id} tidak ditemukan.`);
      return false;
    }

    this.repository.delete(id);
    console.log(`[StudentService] Mahasiswa berhasil dihapus.`);
    return true;
  }

  /**
   * Mengambil data mahasiswa berdasarkan ID
   * @param id - ID mahasiswa yang dicari
   * @returns Object Student atau null
   */
  getStudent(id: string): Student | null {
    return this.repository.findById(id);
  }

  /**
   * Mengambil semua data mahasiswa
   * @returns Array dari semua Student
   */
  getAllStudents(): Student[] {
    return this.repository.findAll();
  }
}
