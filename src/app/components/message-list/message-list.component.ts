import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-list">
      <div *ngFor="let message of messages" class="message">
        <strong>{{ message.senderId }}:</strong> {{ message.content }}
      </div>
    </div>
  `,
  styles: [`
    .message-list {
      height: 300px;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 10px;
    }
    .message {
      margin-bottom: 10px;
    }
  `]
})
export class MessageListComponent {
  @Input() messages: ChatMessage[] = [];
}