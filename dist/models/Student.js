"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    /**
     * Constructor untuk membuat object Student baru
     * @param id - NIM/ID mahasiswa
     * @param name - Nama lengkap mahasiswa
     * @param email - Alamat email mahasiswa
     * @param phone - Nomor telepon mahasiswa
     * @param major - Program studi mahasiswa
     */
    constructor(id, name, email, phone, major) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._major = major;
        this._grades = [];
    }
    // ==================== Getter & Setter ====================
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (!value || value.trim().length === 0) {
            throw new Error("Nama mahasiswa tidak boleh kosong.");
        }
        this._name = value.trim();
    }
    get email() {
        return this._email;
    }
    set email(value) {
        if (!value || !value.includes("@")) {
            throw new Error("Format email tidak valid.");
        }
        this._email = value.trim();
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        if (!value || value.trim().length === 0) {
            throw new Error("Nomor telepon tidak boleh kosong.");
        }
        this._phone = value.trim();
    }
    get major() {
        return this._major;
    }
    set major(value) {
        this._major = value.trim();
    }
    get grades() {
        // Mengembalikan salinan array agar data internal tidak bisa dimodifikasi langsung
        return [...this._grades];
    }
    // ==================== Methods ====================
    /**
     * Menambahkan nilai mata kuliah
     * @param grade - Object Grade yang akan ditambahkan
     */
    addGrade(grade) {
        // Validasi SKS (hanya 2 dan 4)
        if (grade.credits !== 2 && grade.credits !== 4) {
            throw new Error(`SKS tidak valid: ${grade.credits}. SKS hanya boleh 2 atau 4.`);
        }
        // Validasi Grade (hanya A, B, C, D, E)
        const validGrades = ["A", "B", "C", "D", "E"];
        if (!validGrades.includes(grade.grade)) {
            throw new Error(`Grade tidak valid: ${grade.grade}. Grade hanya boleh A, B, C, D, atau E.`);
        }
        // Sinkronisasi score dengan grade jika tidak sesuai
        const gradeScores = {
            "A": 4.0,
            "B": 3.0,
            "C": 2.0,
            "D": 1.0,
            "E": 0.0
        };
        grade.score = gradeScores[grade.grade];
        this._grades.push(grade);
    }
    /**
     * Menghitung IPK (Indeks Prestasi Kumulatif)
     * @returns Nilai IPK (0.00 - 4.00)
     */
    calculateGPA() {
        if (this._grades.length === 0)
            return 0;
        let totalPoints = 0;
        let totalCredits = 0;
        for (const grade of this._grades) {
            totalPoints += grade.score * grade.credits;
            totalCredits += grade.credits;
        }
        return totalCredits > 0
            ? Math.round((totalPoints / totalCredits) * 100) / 100
            : 0;
    }
    /**
     * Mendapatkan total SKS yang telah ditempuh
     * @returns Jumlah total SKS
     */
    getTotalCredits() {
        return this._grades.reduce((sum, grade) => sum + grade.credits, 0);
    }
    /**
     * Representasi string dari object Student
     * @returns String informasi mahasiswa
     */
    toString() {
        return `[${this._id}] ${this._name} - ${this._major} (IPK: ${this.calculateGPA()})`;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map