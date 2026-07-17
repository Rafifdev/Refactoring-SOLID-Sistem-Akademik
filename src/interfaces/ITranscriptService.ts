import { Student } from "../models/Student";

export interface ITranscriptService {
  /**
   * Menghasilkan transkrip akademik mahasiswa dalam format teks
   * @param student - Object Student yang transkripnya akan dibuat
   * @returns String berisi transkrip yang diformat
   */
  generateTranscript(student: Student): string;

  /**
   * Mengekspor transkrip ke format tertentu (PDF, dll)
   * @param student - Object Student yang transkripnya akan diekspor
   * @returns String berisi path atau hasil ekspor
   */
  exportTranscript(student: Student): string;
}
