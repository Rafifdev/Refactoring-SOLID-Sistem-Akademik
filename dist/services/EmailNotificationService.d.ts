import { INotificationService } from "../interfaces/INotificationService";
export declare class EmailNotificationService implements INotificationService {
    /**
     * Mengirim notifikasi via Email
     * @param recipient - Alamat email penerima
     * @param message - Isi pesan email
     */
    send(recipient: string, message: string): void;
    /**
     * Mendapatkan tipe notifikasi
     * @returns "Email"
     */
    getType(): string;
}
//# sourceMappingURL=EmailNotificationService.d.ts.map