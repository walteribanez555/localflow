const { DisconnectReason, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys").default;
const ChatConnector = require('../interfaces/ChatConnector');
const path = require('path');

// Utility function to create a delay
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

class WhatsAppConnector extends ChatConnector {
    constructor() {
        super();
        this.state = null;
        this.saveCreds = null;
        this.socket = null;
    }

    async initialize() {
        const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
        this.state = state;
        this.saveCreds = saveCreds;
        await this.startSocket();
    }

    async startSocket() {
        const sock = makeWASocket({
            // printQRInTerminal: true,
            auth: this.state,
        });

        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                this.emit("qr", qr); // Emit QR code event
            }

            if (connection === "open") {
                // console.log(`\nLogged on ${sock.user!.name} ${sock.user!.id}`);
            }

            if (connection === "close") {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                if (shouldReconnect) {
                    console.log('Reconnecting...');
                    await this.startSocket(); // Restart the connection
                }
            }

            // this.emit("connection-update", update); // Emit connection update event
        });

        sock.ev.on("messages.upsert", async (notifyMessage) => {
            const { messages } = notifyMessage;
            const message = messages[0];
            this.emit("message", message); // Emit new message event
        });

        // sock.ev.on('creds.update', this.saveCreds); // Save updated credentials

        this.socket = sock;
    }

    async sendMessage(jid, message) {
        console.log("_________________________________");
        console.log('Sending message to', jid, message);
        console.log("_________________________________");

        if (this.socket) {
            await sleep(2500); // Wait to ensure socket is ready
            await this.socket.sendMessage(jid, { text: message });
        } else {
            console.error("WhatsApp socket is not initialized.");
            await this.initialize(); // Attempt to initialize and send the message again
            if (this.socket) {
                await sleep(2500); // Wait again to ensure socket is ready
                await this.socket.sendMessage(jid, { text: message });
            }
        }
    }
}

module.exports = WhatsAppConnector;
