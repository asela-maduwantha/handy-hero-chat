import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatRoomComponent],
  template: `
    <div class="container">
      <h1>HandyHero Chat</h1>
      <app-chat-room></app-chat-room>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'handy-hero-chat';
}