import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="message-input">
      <input [(ngModel)]="message" (keyup.enter)="send()" placeholder="Type a message...">
      <button (click)="send()">Send</button>
    </div>
  `,
  styles: [`
    .message-input {
      margin-top: 10px;
    }
    input {
      width: 80%;
      padding: 5px;
    }
    button {
      width: 18%;
      padding: 5px;
    }
  `]
})
export class MessageInputComponent {
  @Output() sendMessage = new EventEmitter<string>();
  message: string = '';

  send() {
    if (this.message.trim() !== '') {
      this.sendMessage.emit(this.message);
      this.message = '';
    }
  }
}