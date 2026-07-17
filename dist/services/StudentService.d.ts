import { Student } from "../models/Student";
import { IStudentRepository } from "../interfaces/IStudentRepository";
export declare class StudentService {
    private repository;
    /**
     * Constructor dengan Dependency Injection
     * @param repository - Implementasi IStudentRepository yang akan digunakan
     */
    constructor(repository: IStudentRepository);
    /**
     * Membuat dan menyimpan mahasiswa baru
     * @param id - NIM mahasiswa
     * @param name - Nama lengkap
     * @param email - Alamat email
     * @param phone - Nomor telepon
     * @param major - Program studi
     * @returns Object Student yang telah dibuat
     */
    createStudent(id: string, name: string, email: string, phone: string, major: string): Student;
    /**
     * Memperbarui data mahasiswa
     * @param id - ID mahasiswa yang akan diperbarui
     * @param updates - Object berisi field yang akan diperbarui
     * @returns Object Student yang telah diperbarui, atau null jika tidak ditemukan
     */
    updateStudent(id: string, updates: {
        name?: string;
        email?: string;
        phone?: string;
        major?: string;
    }): Student | null;
    /**
     * Menghapus mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang akan dihapus
     * @returns true jika berhasil dihapus
     */
    deleteStudent(id: string): boolean;
    /**
     * Mengambil data mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang dicari
     * @returns Object Student atau null
     */
    getStudent(id: string): Student | null;
    /**
     * Mengambil semua data mahasiswa
     * @returns Array dari semua Student
     */
    getAllStudents(): Student[];
}
//# sourceMappingURL=StudentService.d.ts.map