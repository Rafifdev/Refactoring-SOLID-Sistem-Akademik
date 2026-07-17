import { INotificationService } from "../interfaces/INotificationService";

export class WhatsappNotificationService implements INotificationService {
  /**
   * Mengirim notifikasi via WhatsApp
   * @param recipient - Nomor WhatsApp penerima
   * @param message - Isi pesan WhatsApp
   */
  send(recipient: string, message: string): void {
    console.log(`[WhatsApp] Mengirim pesan ke: ${recipient}`);
    console.log(`[WhatsApp] Isi pesan: ${message}`);
    console.log(`[WhatsApp]   Pesan WhatsApp berhasil dikirim.`);
  }

  /**
   * Mendapatkan tipe notifikasi
   * @returns "WhatsApp"
   */
  getType(): string {
    return "WhatsApp";
  }
}
