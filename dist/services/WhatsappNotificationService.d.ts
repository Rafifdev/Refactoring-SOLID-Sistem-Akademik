import { INotificationService } from "../interfaces/INotificationService";
export declare class WhatsappNotificationService implements INotificationService {
    /**
     * Mengirim notifikasi via WhatsApp
     * @param recipient - Nomor WhatsApp penerima
     * @param message - Isi pesan WhatsApp
     */
    send(recipient: string, message: string): void;
    /**
     * Mendapatkan tipe notifikasi
     * @returns "WhatsApp"
     */
    getType(): string;
}
//# sourceMappingURL=WhatsappNotificationService.d.ts.map