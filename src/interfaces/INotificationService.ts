export interface INotificationService {
  /**
   * Mengirim notifikasi ke penerima
   * @param recipient - Alamat/nomor tujuan (email, nomor HP, dll)
   * @param message - Isi pesan notifikasi
   */
  send(recipient: string, message: string): void;

  /**
   * Mendapatkan nama tipe/channel notifikasi
   * @returns Nama tipe notifikasi (Email, WhatsApp, dll)
   */
  getType(): string;
}
