import { Injectable, NgZone, EventEmitter } from '@angular/core';



declare global {
  interface Window {
      electron: any;
  }
}
@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  qrCodeEvent: EventEmitter<string> = new EventEmitter();
    connectionUpdateEvent: EventEmitter<any> = new EventEmitter();
    messageEvent: EventEmitter<any> = new EventEmitter();
    customEvent: EventEmitter<any> = new EventEmitter();
    sendMessageResponseEvent: EventEmitter<any> = new EventEmitter(); // Event for send message response

    constructor(private zone: NgZone) {
        if (window.electron) {
            window.electron.receive('chat-event', (body : any) => {
              console.log({body});
                if(body.data){

                  this.zone.run(() => {
                      this.qrCodeEvent.emit(body.data);
                  });
                }
            });

        }
    }

    sendMessage(message: string) {
        if (window.electron) {
            window.electron.send('load-data', message);
        }
    }


    requestQrWhatsapp() {
      if(window.electron){
        window.electron.send('qr-load', '');
      }
    }

    sendWhatsAppMessage(jid: string, message: string) {
        if (window.electron) {
            window.electron.send('send-whatsapp-message', { jid, message });
        }
    }

    handleResponse(data: any) {
        console.log('Received response from Electron:', data);
        // Handle the response data
    }

}
