import { Student } from "../models/Student";
import { IStudentRepository } from "../interfaces/IStudentRepository";
export declare class StudentRepository implements IStudentRepository {
    private storage;
    constructor();
    /**
     * Menyimpan data mahasiswa baru ke database
     * @param student - Object Student yang akan disimpan
     * @throws Error jika mahasiswa dengan ID yang sama sudah ada
     */
    save(student: Student): void;
    /**
     * Memperbarui data mahasiswa yang sudah ada
     * @param student - Object Student dengan data terbaru
     * @throws Error jika mahasiswa tidak ditemukan
     */
    update(student: Student): void;
    /**
     * Menghapus data mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang akan dihapus
     * @throws Error jika mahasiswa tidak ditemukan
     */
    delete(id: string): void;
    /**
     * Mencari mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang dicari
     * @returns Object Student jika ditemukan, null jika tidak
     */
    findById(id: string): Student | null;
    /**
     * Mengambil semua data mahasiswa dari database
     * @returns Array dari semua object Student
     */
    findAll(): Student[];
}
//# sourceMappingURL=StudentRepository.d.ts.map