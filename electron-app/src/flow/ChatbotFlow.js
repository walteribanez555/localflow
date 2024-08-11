class ChatbotFlow {
    // setEmmiter(emmiter) {
    //   this.emmiter = emmiter;
    // }
  
    constructor(identifier, emmiter) {
      // this.state = "START_CONVERSATION";
      this.state = null;
      this.emmiter = emmiter;
      this.identifier = identifier;
      this.context = {
        currentStep: 0,
        steps: {
          START_CONVERSATION: {
            dataResponse: ["Hola, bienvenido a la tienda en línea."],
            type: "info",
            nextState: "INIT",
          },
          INIT: {
            dataResponse: [
              "Hola, bienvenido a la tienda en línea.",
              "Por favor, elige una opción (1: Comprar, 2: Ver carrito, 3: Salir):",
            ],
            type: "selection",
            validOptions: [1, 2, 3],
            nextState: {
              1: "ADD_ITEM",
              2: "VIEW_CART",
              3: "END",
            },
          },
          ADD_ITEM: {
            dataResponse: ["Elige un producto para comprar (1-3):"],
            type: "item-list-selection-add",
            validOptions: [1, 2, 3],
            nextState: "ADD_ANOTHER_PRODUCT",
            listname: "productos",
          },
          REMOVE_ITEM: {
            dataResponse: ["Elige un producto para eliminar (1-3):"],
            type: "item-list-selection-remove",
            validOptions: [1, 2, 3],
            nextState: "ADD_ANOTHER_PRODUCT",
            listname: "productos",
          },
          ADD_ANOTHER_PRODUCT: {
            dataResponse: [
              "¿Desea agregar otro producto o eliminar otro producto? (1.Agregar/2.Ver Carrito/3.Eliminar/4.Siguiente):",
            ],
            type: "selection",
            validOptions: [1, 2, 3, 4],
            nextState: {
              1: "ADD_ITEM",
              2: "VIEW_CART",
              3: "REMOVE_ITEM",
              4: "ADDRESS_STEP",
              verCarrito: "VIEW_CART",
              Siguiente: "ADDRESS_STEP",
              AGREGAR: "ADD_ITEM",
              ELIMINAR: "REMOVE_PRODUCT",
            },
          },
          ADDRESS_STEP: {
            dataResponse: ["Ingresa tu dirección de entrega:"],
            type: "input",
            nextState: "OBSERVATION_STEP",
            paramName: "address",
          },
          OBSERVATION_STEP: {
            dataResponse: ["Observaciones de tu pedido:"],
            type: "input",
            nextState: "CONFIRMATION_STEP",
            paramName: "observation",
          },
          CONFIRMATION_STEP: {
            dataResponse: ["Confirma si la información es correcta (1.sí/2.no):"],
            type: "confirmation",
            nextState: {
              sí: "END",
              no: "INIT",
              1: "END",
              2: "INIT",
            },
          },
          VIEW_CART: {
            dataResponse: [
              "Confirma si la informacion es correcta o deseas cambiar algo (1.sí/2.no):",
            ],
            type: "selection",
            validOptions: [1, 2],
            nextState: {
              1: "ADDRESS_STEP",
              2: "ADD_ANOTHER_PRODUCT",
            },
            listname: "productos",
          },
          END: {
            dataResponse: [
              "Conversacion terminada, gracias por usar el chatbot.",
            ],
            type: "end",
            nextState: null,
          },
        },
        collectedData: {},
        keyword: "soporte", // Palabra clave para soporte
      };
    }
  
    transitionTo(state) {
      if (!this.context.steps[state]) {
        console.log("Error: Estado no definido.", { state });
        return;
      }
  
      this.state = state;
  
      let addedResponses = [];
  
      if (
        this.context.steps[state].type === "item-list-selection-remove" ||
        this.context.steps[state].type === "info" ||
        this.context.steps[state].type === "selection"
      ) {
        //Mapear a strings
  
  
        addedResponses =
          this.context.collectedData[this.context.steps[state].listname];
  
        if (addedResponses) {
          addedResponses = addedResponses.map((item) => {
            return `Producto ${item}`;
          });
        }
      }
  
        console.log(this.context.steps[this.state].dataResponse.concat(addedResponses));
  
      this.emmiter.emit(
        "response-message",
        {
          responses :  this.context.steps[this.state].dataResponse.concat(addedResponses),
          identifier : this.identifier
        }
      );
  
      if (this.state === "END") {
        this.endConversation();
      }
    }
  
    handleMessage(dataResponse) {
      console.log("___________________________________");
      console.log("LLEGA AL FLOW");
      console.log({ dataResponse });
      console.log("___________________________________");
  
      // Imprime el mensaje recibido para depuración
      if (dataResponse && dataResponse.toLowerCase() === this.context.keyword) {
        this.handleSupportRequest();
        return;
      }
  
      if (!this.state) {
        this.transitionTo("INIT");
        return;
      }
  
      const step = this.context.steps[this.state];
      if (!step) {
        console.log("Error: Estado no definido.", { state: this.state });
        return;
      }
  
      if (step.type === "selection") {
        const choice = parseInt(dataResponse);
        if (isNaN(choice) || !step.validOptions.includes(choice)) {
          console.log("Entrada no válida. " + step.dataResponse);
          return;
        } else {
          // console.log({ choice });
          this.transitionTo(step.nextState[choice]);
        }
      }
  
      if (step.type === "item-list-selection-add") {
        const choice = parseInt(dataResponse);
        if (isNaN(choice) || !step.validOptions.includes(choice)) {
          console.log("Entrada no válida. " + step.dataResponse);
          return;
        } else {
          // this.context.collectedData["products"].push(choice);
          //add to a list of items on collectedData if the arr not exist  create
          if (!this.context.collectedData[step.listname]) {
            this.context.collectedData[step.listname] = [];
          }
          this.context.collectedData[step.listname].push(choice);
  
          console.log("____________________________________");
          console.log("Productos en el carrito: ");
          console.log(this.context.collectedData[step.listname]);
          console.log("____________________________________");
  
          this.transitionTo(step.nextState);
        }
      }
  
      if (step.type === "item-list-selection-remove") {
        const choice = parseInt(dataResponse);
        if (isNaN(choice) || !step.validOptions.includes(choice)) {
          console.log("Entrada no válida. " + step.dataResponse);
          return;
        } else {
          if (
            this.context.collectedData[step.listname] &&
            this.context.collectedData[step.listname].includes(choice)
          ) {
            console.log("Eliminando producto: " + choice);
            this.context.collectedData[step.listname].splice(
              this.context.collectedData[step.listname].indexOf(choice),
              1
            );
          }
          this.transitionTo(step.nextState);
        }
      }
  
      if (step.type === "confirmation") {
        const lowerMessage = dataResponse.toLowerCase();
        if (!step.nextState.hasOwnProperty(lowerMessage)) {
          console.log('Por favor responde con "sí" o "no". ' + step.dataResponse);
          return;
        } else {
          this.transitionTo(step.nextState[lowerMessage]);
        }
      }
      if (step.type === "input") {
        this.context.collectedData[step.paramName] = dataResponse;
        this.transitionTo(step.nextState);
      }
      if (step.type === "info") {
        console.log(step.dataResponse);
        this.transitionTo(step.nextState);
      }
      if (step.type === "end") {
        return;
      }
    }
  
    handleSupportRequest() {
      console.log(
        "Notificación: Usuario solicitó soporte. Terminando conversación."
      );
      this.transitionTo("END");
    }
  
    endConversation() {
      console.log("Conversación terminada.");
      console.log({ collectedData: this.context.collectedData });
  
      this.emmiter.emit("end-conversation", {
        
        
        collectedData : this.context.collectedData,
        identifier : this.identifier
      
      });
  
      // console.log(this.context.steps["END"].dataResponse);
    }
  }
  
  module.exports = ChatbotFlow;
  