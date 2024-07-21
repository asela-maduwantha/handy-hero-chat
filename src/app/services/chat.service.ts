import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:5200/api/chat';

  constructor(private http: HttpClient) { }

  getChatMessages(chatId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/${chatId}/messages`);
  }

  sendMessage(message: ChatMessage): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, message);
  }

  getMessagesBetweenUsers(senderId: number, receiverId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages?senderId=${senderId}&receiverId=${receiverId}`);
  }

  getLatestMessageBetweenUsers(senderId: number, receiverId: number): Observable<ChatMessage> {
    return this.http.get<ChatMessage>(`${this.apiUrl}/latestMessage?senderId=${senderId}&receiverId=${receiverId}`);
  }
}