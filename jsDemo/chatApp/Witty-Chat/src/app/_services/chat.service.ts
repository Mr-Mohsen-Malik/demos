import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
// import {} from ''


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:4000';
  private socket; // The client instance of socket.io

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }
  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
