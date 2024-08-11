const EventEmitter = require('events');

class ChatFlow extends EventEmitter {
    constructor(connector, name) {
        super();  // Call the parent class's constructor
        this.connector = connector;
        this.name = name;
        this.flows = new Map();
        // this.chatbotFlow = chatbotFlow;
        // this.phoneNumber = phoneNumber;


        this.setupListeners();
    }

    

    async initialize() {
        try {
            await this.connector.initialize();
            console.log('Connector initialized');
        } catch (error) {
            console.error('Error initializing connector:', error);
        }
    }

    setupListeners() {
        const flowListener = new EventEmitter();

        // this.chatbotFlow.setEmmiter(flowListener);


        flowListener.on('response-message' , async (respObject) => {

            const { identifier, responses } = respObject;

            console.log('________________________________________________');
            console.log("RESPUESTAS A ENVIARRRRR");
            console.log('Responses:', responses);
            console.log('identifier', identifier);
            console.log('________________________________________________');



            // Use a for...of loop to await each sendMessage call
            for (const response of responses) {
                await this.sendMessage(identifier, response);
            }

           
        });

        flowListener.on('end-conversation' , (data) => {

            //collectedData : this.context.collectedData,
            //identifier : this.identifier
            console.log({data});
            //Eliminar la conversacion de la lista
            this.flows.delete(data.identifier);



            // this.connector.close();
        }) 

        this.connector.on('qr', (qr) => {
            const eventObject = { eventType: 'qr', data: qr };
            
            this.emit('parsedEvent', eventObject);
        });

        this.connector.on('connection-update', (update) => {
            // const eventObject = { eventType: 'connection-update', data: update };
            // console.log('Connection update:', update);
            // this.emit('parsedEvent', eventObject);
        });

        this.connector.on('message', (message) => {

            // console.log('Message received:', message);
            // console.log('key', message.key);


            console.log({message});


            if(message.message === undefined) {
                console.log("_______________________________");
                console.log("No es mensaje");
                console.log({message});
                console.log("________________________________");
                return;
            }


            
            
            
            const eventObject = { eventType: 'message', data: message };
            // // Do something with the message
            if (message.key.fromMe) return;
            const key = message.key.remoteJid;

            // De acuerdo al key en el listado de flows, comprobar que no existe en caso de que no exista crear uno nuevo
            if (!this.flows.has(key)) {
                console.log("_______________________________");
                console.log('Creando nuevo flujo para:', key);
                console.log("_______________________________");

                const ChatbotFlow = require('./ChatbotFlow');
                const chatbotFlow = new ChatbotFlow( key, flowListener);
                this.flows.set(key, chatbotFlow);
            }


            // Basado en este mensaje, manejar el flujo con el elemento text de extended text message

            // Message received: {
            //     response: Message {
            //       extendedTextMessage: ExtendedTextMessage { text: 'q', contextInfo: [ContextInfo] },
            //       messageContextInfo: MessageContextInfo {
            //         deviceListMetadata: [DeviceListMetadata],
            //         deviceListMetadataVersion: 2
            //       }
            //     }
            //   }
            // }

            console.log("__________________________________________________");
            console.log('details Message' , { message });
            console.log('Key:',{ key : message.key});
            console.log('Message received:', {response :  message.message});
            console.log("__________________________________________________");



            let messageChat;

            

            if(message.message.conversation!= null){
                messageChat = message.message.conversation;
            }


            //Si es indefinido tomar de message.message.conversation
            if (messageChat === undefined) {
                messageChat = message.message.extendedTextMessage.text ;
            } 

            if (messageChat === undefined || messageChat === null)   {
                console.log("_______________________________");
                console.log("FORMATO DIFERENTE");
                console.log({message});
                console.log("_______________________________");
                return;
            }

            console.log("__________________________________________________");
            console.log('Message Chat:', messageChat);
            console.log("__________________________________________________");

            //obtener el flujo ascoiado a la key y manejar el mensaje
            const chatbotFlow = this.flows.get(key);
            chatbotFlow.handleMessage( messageChat );
            // this.sendMessage(message.key.remoteJid, 'Hola, soy un bot');


            


            // this.chatbotFlow.handleMessage(message.message.conversation);

            // this.sendMessage(message.key.remoteJid, 'Hola, soy un bot');
            // this.emit('parsedEvent', eventObject);
        });

        this.connector.on('message-sent', (response) => {
            // const eventObject = { eventType: 'message-sent', data: response };
            // console.log('Message sent:', response);
            // this.emit('parsedEvent', eventObject);
        });

        this.connector.on('error', (error) => {
            const eventObject = { eventType: 'error', data: error };
            // console.error('Error:', error);
            // this.emit('parsedEvent', eventObject);
        });
    }

    async processResponses(identifier, responses) {
        for (const response of responses) {
            await this.sendMessage(identifier, response);
        }
    }

    async sendMessage(jid, message) {
        try {
            await this.connector.sendMessage(jid, message);
            console.log('________________________________________________');
            console.log('Message sent:', message);
            console.log('________________________________________________');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

module.exports = ChatFlow;
