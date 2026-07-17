"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptService = void 0;
class TranscriptService {
    /**
     * Menghasilkan transkrip akademik dalam format teks
     * @param student - Mahasiswa yang transkripnya akan dibuat
     * @returns String transkrip yang terformat
     */
    generateTranscript(student) {
        const separator = "=".repeat(60);
        const lines = [
            separator,
            "           TRANSKRIP AKADEMIK",
            separator,
            `NIM          : ${student.id}`,
            `Nama         : ${student.name}`,
            `Program Studi: ${student.major}`,
            `Email        : ${student.email}`,
            separator,
            "",
            "No  | Kode MK  | Mata Kuliah              | SKS | Nilai | Grade",
            "-".repeat(70),
        ];
        const grades = student.grades;
        if (grades.length === 0) {
            lines.push("  (Belum ada data nilai)");
        }
        else {
            grades.forEach((grade, index) => {
                const no = String(index + 1).padStart(2, " ");
                const code = grade.courseCode.padEnd(8, " ");
                const name = grade.courseName.padEnd(24, " ");
                const credits = String(grade.credits).padStart(3, " ");
                const score = grade.score.toFixed(2).padStart(5, " ");
                const gradeStr = grade.grade.padStart(5, " ");
                lines.push(`${no}  | ${code} | ${name} | ${credits} | ${score} | ${gradeStr}`);
            });
        }
        lines.push("-".repeat(70));
        lines.push(`Total SKS    : ${student.getTotalCredits()}`);
        lines.push(`IPK          : ${student.calculateGPA().toFixed(2)}`);
        lines.push(separator);
        const transcript = lines.join("\n");
        console.log("\n" + transcript);
        return transcript;
    }
    /**
     * Mengekspor transkrip (dalam format teks/cetak)
     * @param student - Mahasiswa yang transkripnya akan diekspor
     * @returns String transkrip
     */
    exportTranscript(student) {
        console.log(`[TranscriptService] Mencetak transkrip untuk ${student.name}...`);
        return this.generateTranscript(student);
    }
}
exports.TranscriptService = TranscriptService;
//# sourceMappingURL=TranscriptService.js.map