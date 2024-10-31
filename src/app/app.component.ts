import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ChatComponent, CommonModule] 
})
export class AppComponent {
  title = 'front-end';
}
