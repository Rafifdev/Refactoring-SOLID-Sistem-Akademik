import { Student } from "../models/Student";
import { ITranscriptService } from "../interfaces/ITranscriptService";
export declare class PdfTranscriptService implements ITranscriptService {
    /**
     * Menghasilkan konten transkrip untuk PDF
     * @param student - Mahasiswa yang transkripnya akan dibuat
     * @returns String konten transkrip
     */
    generateTranscript(student: Student): string;
    /**
     * Mengekspor transkrip ke file PDF (simulasi)
     * @param student - Mahasiswa yang transkripnya akan diekspor
     * @returns Path file PDF yang dihasilkan
     */
    exportTranscript(student: Student): string;
}
//# sourceMappingURL=PdfTranscriptService.d.ts.map