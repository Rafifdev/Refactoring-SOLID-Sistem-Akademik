"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfTranscriptService = void 0;
class PdfTranscriptService {
    /**
     * Menghasilkan konten transkrip untuk PDF
     * @param student - Mahasiswa yang transkripnya akan dibuat
     * @returns String konten transkrip
     */
    generateTranscript(student) {
        const content = [
            `TRANSKRIP AKADEMIK (PDF)`,
            `========================`,
            `NIM: ${student.id}`,
            `Nama: ${student.name}`,
            `Program Studi: ${student.major}`,
            ``,
            `Daftar Nilai:`,
        ];
        const grades = student.grades;
        grades.forEach((grade, index) => {
            content.push(`${index + 1}. ${grade.courseCode} - ${grade.courseName} | SKS: ${grade.credits} | Nilai: ${grade.score} | Grade: ${grade.grade}`);
        });
        content.push(``);
        content.push(`Total SKS: ${student.getTotalCredits()}`);
        content.push(`IPK: ${student.calculateGPA().toFixed(2)}`);
        return content.join("\n");
    }
    /**
     * Mengekspor transkrip ke file PDF (simulasi)
     * @param student - Mahasiswa yang transkripnya akan diekspor
     * @returns Path file PDF yang dihasilkan
     */
    exportTranscript(student) {
        const content = this.generateTranscript(student);
        const filename = `transcript_${student.id}.pdf`;
        // Simulasi pembuatan file PDF
        console.log(`[PdfTranscriptService] Mengekspor transkrip ke ${filename}...`);
        console.log(`[PdfTranscriptService] Konten PDF:`);
        console.log(content);
        console.log(`[PdfTranscriptService] File ${filename} berhasil dibuat.`);
        return filename;
    }
}
exports.PdfTranscriptService = PdfTranscriptService;
//# sourceMappingURL=PdfTranscriptService.js.map