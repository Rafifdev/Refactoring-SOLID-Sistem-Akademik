export interface Grade {
    courseCode: string;
    courseName: string;
    credits: number;
    score: number;
    grade: string;
}
export declare class Student {
    private _id;
    private _name;
    private _email;
    private _phone;
    private _major;
    private _grades;
    /**
     * Constructor untuk membuat object Student baru
     * @param id - NIM/ID mahasiswa
     * @param name - Nama lengkap mahasiswa
     * @param email - Alamat email mahasiswa
     * @param phone - Nomor telepon mahasiswa
     * @param major - Program studi mahasiswa
     */
    constructor(id: string, name: string, email: string, phone: string, major: string);
    get id(): string;
    get name(): string;
    set name(value: string);
    get email(): string;
    set email(value: string);
    get phone(): string;
    set phone(value: string);
    get major(): string;
    set major(value: string);
    get grades(): Grade[];
    /**
     * Menambahkan nilai mata kuliah
     * @param grade - Object Grade yang akan ditambahkan
     */
    addGrade(grade: Grade): void;
    /**
     * Menghitung IPK (Indeks Prestasi Kumulatif)
     * @returns Nilai IPK (0.00 - 4.00)
     */
    calculateGPA(): number;
    /**
     * Mendapatkan total SKS yang telah ditempuh
     * @returns Jumlah total SKS
     */
    getTotalCredits(): number;
    /**
     * Representasi string dari object Student
     * @returns String informasi mahasiswa
     */
    toString(): string;
}
//# sourceMappingURL=Student.d.ts.map