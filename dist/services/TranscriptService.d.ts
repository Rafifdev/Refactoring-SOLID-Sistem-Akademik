import { Student } from "../models/Student";
import { ITranscriptService } from "../interfaces/ITranscriptService";
export declare class TranscriptService implements ITranscriptService {
    /**
     * Menghasilkan transkrip akademik dalam format teks
     * @param student - Mahasiswa yang transkripnya akan dibuat
     * @returns String transkrip yang terformat
     */
    generateTranscript(student: Student): string;
    /**
     * Mengekspor transkrip (dalam format teks/cetak)
     * @param student - Mahasiswa yang transkripnya akan diekspor
     * @returns String transkrip
     */
    exportTranscript(student: Student): string;
}
//# sourceMappingURL=TranscriptService.d.ts.map