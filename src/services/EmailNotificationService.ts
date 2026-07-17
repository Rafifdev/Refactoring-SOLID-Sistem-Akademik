import { INotificationService } from "../interfaces/INotificationService";

export class EmailNotificationService implements INotificationService {
  /**
   * Mengirim notifikasi via Email
   * @param recipient - Alamat email penerima
   * @param message - Isi pesan email
   */
  send(recipient: string, message: string): void {
    console.log(`[Email] Mengirim email ke: ${recipient}`);
    console.log(`[Email] Isi pesan: ${message}`);
    console.log(`[Email]   Email berhasil dikirim.`);
  }

  /**
   * Mendapatkan tipe notifikasi
   * @returns "Email"
   */
  getType(): string {
    return "Email";
  }
}
