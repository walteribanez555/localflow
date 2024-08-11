// src/main/handler/ChatBotHandler.js
class ChatBotHandler {
    constructor(mainWindow) {
        this.connectors = new Map();
        this.chatFlows = new Map();
        this.mainWindow = mainWindow;
    }

    registerConnector(name, connector) {
        if (this.connectors.has(name)) {
            throw new Error(`Connector with name ${name} is already registered.`);
        }
        this.connectors.set(name, connector);
    }

    async initializeConnector(name) {
        if (!this.connectors.has(name)) {
            throw new Error(`Connector with name ${name} is not registered.`);
        }

        console.log("PASA POR AQUIIIII");
        const connector = this.connectors.get(name);
        await connector.initialize();

        // Crear el flujo de chat asociado al conector
        const ChatFlow = require('../flow/ChatFlow');
        const chatFlow = new ChatFlow(connector,name);
        this.chatFlows.set(name, chatFlow);
        

        // Inicializar el flujo de chat
        await chatFlow.initialize();

        chatFlow.on('parsedEvent', (eventObject) => {
            this.mainWindow.webContents.send('chat-event', eventObject);
        });
    }

    async sendMessage(connectorName, jid, message) {
        if (!this.chatFlows.has(connectorName)) {
            throw new Error(`ChatFlow for connector ${connectorName} is not initialized.`);
        }
        const chatFlow = this.chatFlows.get(connectorName);
        await chatFlow.sendMessage(jid, message);
    }
}

module.exports = ChatBotHandler;
