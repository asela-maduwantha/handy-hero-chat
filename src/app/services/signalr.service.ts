import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private messageSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://your-backend-url/chathub')
      .build();
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (user, message) => {
      this.messageSubject.next({ user, message });
    });
  }

  public sendMessage = (chatId: number, user: string, message: string) => {
    this.hubConnection.invoke('SendMessage', chatId, user, message)
      .catch(err => console.error(err));
  }

  public getMessages = () => {
    return this.messageSubject.asObservable();
  }
}