import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  connection;
  messages = [];
  message;
  @Input() users = {};

  constructor(private chatService: ChatService) { }
  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }
  sendMessage() {
    const msg = this.chatService.sendMessage(this.message);
    this.message = '';
    // this.messages.push(msg);

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
