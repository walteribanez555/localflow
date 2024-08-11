// src/main/interfaces/ChatConnector.js
const EventEmitter = require('events');

class ChatConnector extends EventEmitter {
    async initialize() {
        throw new Error("Method 'initialize()' must be implemented.");
    }

    async sendMessage(jid, message) {
        throw new Error("Method 'sendMessage()' must be implemented.");
    }
}

module.exports = ChatConnector;
