// Electron
const { app, Menu, ipcMain } = require("electron");
const ChatBotHandler = require("./src/handler/ChatBotHandler");
const WhatsAppConnector = require("./src/connectors/WhatsAppConnector");
const ChatbotFlow = require("./src/flow/ChatbotFlow");



let mainWindow;

let FLAG_FIRSTLOADED = false;


app.whenReady().then(() => {
  // Main window
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);

  // Option 1: Uses Webtag and load a custom html file with external content
  mainWindow.loadFile("./locallyflow/index.html");


  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(builtMenu);


  // Print function (if enabled)
});

ipcMain.on("qr-load", (event, arg) => {

  if(FLAG_FIRSTLOADED) {
    return;
  }


  
  const chatbotHandler = new ChatBotHandler(mainWindow);
  chatbotHandler.registerConnector("whatsapp-default", new WhatsAppConnector());
  chatbotHandler.initializeConnector("whatsapp-default", new ChatbotFlow());

  FLAG_FIRSTLOADED = true;

});




// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
