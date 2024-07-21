import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { SignalrService } from '../../services/signalr.service';
import { ChatMessage } from '../../models/chat-message.model';
import { MessageListComponent } from '../message-list/message-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, MessageListComponent, MessageInputComponent],
  template: `
    <app-message-list [messages]="messages"></app-message-list>
    <app-message-input (sendMessage)="sendMessage($event)"></app-message-input>
  `
})
export class ChatRoomComponent implements OnInit {
  messages: ChatMessage[] = [];
  currentUserId = 1; // This should be set dynamically based on the logged-in user
  currentChatId = 1; // This should be set dynamically based on the current chat

  constructor(
    private chatService: ChatService,
    private signalRService: SignalrService
  ) {}

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addMessageListener();
    this.loadMessages();
    this.signalRService.getMessages().subscribe((message: any) => {
      if (message) {
        this.messages.push({
          id: 0, // This will be set by the server
          senderId: 0, // This should be set correctly
          receiverId: this.currentUserId,
          content: message.message,
          timestamp: new Date(),
          chatId: this.currentChatId
        });
      }
    });
  }

  loadMessages() {
    this.chatService.getChatMessages(this.currentChatId).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }

  sendMessage(content: string) {
    const message: ChatMessage = {
      id: 0, // This will be set by the server
      senderId: this.currentUserId,
      receiverId: 0, // This should be set to the correct receiver ID
      content: content,
      timestamp: new Date(),
      chatId: this.currentChatId
    };

    this.chatService.sendMessage(message).subscribe(
      () => {
        this.signalRService.sendMessage(this.currentChatId, 'User', content);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }
}