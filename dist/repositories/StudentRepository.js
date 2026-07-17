"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
class StudentRepository {
    constructor() {
        this.storage = new Map();
    }
    /**
     * Menyimpan data mahasiswa baru ke database
     * @param student - Object Student yang akan disimpan
     * @throws Error jika mahasiswa dengan ID yang sama sudah ada
     */
    save(student) {
        if (this.storage.has(student.id)) {
            throw new Error(`Mahasiswa dengan ID ${student.id} sudah ada dalam database.`);
        }
        this.storage.set(student.id, student);
        console.log(`[Database] Mahasiswa ${student.name} berhasil disimpan.`);
    }
    /**
     * Memperbarui data mahasiswa yang sudah ada
     * @param student - Object Student dengan data terbaru
     * @throws Error jika mahasiswa tidak ditemukan
     */
    update(student) {
        if (!this.storage.has(student.id)) {
            throw new Error(`Mahasiswa dengan ID ${student.id} tidak ditemukan.`);
        }
        this.storage.set(student.id, student);
        console.log(`[Database] Data mahasiswa ${student.name} berhasil diperbarui.`);
    }
    /**
     * Menghapus data mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang akan dihapus
     * @throws Error jika mahasiswa tidak ditemukan
     */
    delete(id) {
        if (!this.storage.has(id)) {
            throw new Error(`Mahasiswa dengan ID ${id} tidak ditemukan.`);
        }
        const student = this.storage.get(id);
        this.storage.delete(id);
        console.log(`[Database] Mahasiswa ${student?.name} berhasil dihapus.`);
    }
    /**
     * Mencari mahasiswa berdasarkan ID
     * @param id - ID mahasiswa yang dicari
     * @returns Object Student jika ditemukan, null jika tidak
     */
    findById(id) {
        return this.storage.get(id) || null;
    }
    /**
     * Mengambil semua data mahasiswa dari database
     * @returns Array dari semua object Student
     */
    findAll() {
        return Array.from(this.storage.values());
    }
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=StudentRepository.js.map