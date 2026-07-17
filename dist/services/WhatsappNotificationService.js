"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappNotificationService = void 0;
class WhatsappNotificationService {
    /**
     * Mengirim notifikasi via WhatsApp
     * @param recipient - Nomor WhatsApp penerima
     * @param message - Isi pesan WhatsApp
     */
    send(recipient, message) {
        console.log(`[WhatsApp] Mengirim pesan ke: ${recipient}`);
        console.log(`[WhatsApp] Isi pesan: ${message}`);
        console.log(`[WhatsApp]   Pesan WhatsApp berhasil dikirim.`);
    }
    /**
     * Mendapatkan tipe notifikasi
     * @returns "WhatsApp"
     */
    getType() {
        return "WhatsApp";
    }
}
exports.WhatsappNotificationService = WhatsappNotificationService;
//# sourceMappingURL=WhatsappNotificationService.js.map