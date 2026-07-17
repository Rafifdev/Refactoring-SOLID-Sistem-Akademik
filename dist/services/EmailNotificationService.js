"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotificationService = void 0;
class EmailNotificationService {
    /**
     * Mengirim notifikasi via Email
     * @param recipient - Alamat email penerima
     * @param message - Isi pesan email
     */
    send(recipient, message) {
        console.log(`[Email] Mengirim email ke: ${recipient}`);
        console.log(`[Email] Isi pesan: ${message}`);
        console.log(`[Email]   Email berhasil dikirim.`);
    }
    /**
     * Mendapatkan tipe notifikasi
     * @returns "Email"
     */
    getType() {
        return "Email";
    }
}
exports.EmailNotificationService = EmailNotificationService;
//# sourceMappingURL=EmailNotificationService.js.map