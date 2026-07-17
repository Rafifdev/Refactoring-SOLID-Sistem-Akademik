import { Student } from "../models/Student";
export interface IStudentRepository {
    /**
     * Menyimpan data mahasiswa baru ke dalam storage
     * @param student - Object Student yang akan disimpan
     */
    save(student: Student): void;
    /**
     * Memperbarui data mahasiswa yang sudah ada
     * @param student - Object Student dengan data yang diperbarui
     */
    update(student: Student): void;
    /**
     * Menghapus data mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang akan dihapus
     */
    delete(id: string): void;
    /**
     * Mencari mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang dicari
     * @returns Object Student jika ditemukan, null jika tidak
     */
    findById(id: string): Student | null;
    /**
     * Mengambil semua data mahasiswa
     * @returns Array dari semua object Student
     */
    findAll(): Student[];
}
//# sourceMappingURL=IStudentRepository.d.ts.map