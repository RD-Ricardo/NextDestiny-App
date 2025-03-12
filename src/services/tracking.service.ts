import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private hubConnection!: signalR.HubConnection;
  public apiBaseUrl = `${environment.apiUrl}/orchestrator`;

  constructor() { }


  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiBaseUrl}/tracking`,
      ) // URL do backend SignalR
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.error('Error while starting connection:', err));
  }

  onPaymentUpdate(callback: (orderId: string, message: string) => void) {
    this.hubConnection.on('ReceiveTrackingEvent', (orderId, message) => {
      console.log(`Order ${orderId} updated: ${message}`);
      callback(orderId, message);
    });


    
  }
}
