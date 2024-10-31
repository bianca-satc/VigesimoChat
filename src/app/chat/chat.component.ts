import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatComponent {
  messages: { text: string, sender: 'sent' | 'received' }[] = [
    { text: 'Olá! Como posso ajudar você hoje?', sender: 'received' }
  ];

  userInput: string = '';
  step: number = 0;

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'sent' });
      this.handleResponse(this.userInput);
      this.userInput = '';
    }
  }

  handleResponse(input: string) {
    const responseDelay = 1000;
    let responseText = '';

    switch (this.step) {
      case 0:
        if (input.toLowerCase().includes('segunda via')) {
          responseText = 'Claro! Posso ajudar você a solicitar a segunda via da sua fatura. Você poderia me informar o seu nome completo?';
          this.step++;
        } else {
          responseText = 'Desculpe, não entendi. Você pode me falar sobre a segunda via da fatura?';
        }
        break;

      case 1:
        responseText = `Obrigado, ${input}. Por favor, informe o seu CPF para que eu possa localizar a sua fatura.`;
        this.step++;
        break;

      case 2:
        responseText = `Obrigado! Vou enviar a segunda via da sua fatura para o seu e-mail cadastrado.`;
        this.step++;
        break;

      case 3:
        responseText = 'Se precisar de mais alguma coisa, estou à disposição!';
        this.step = 0;
        break;

      default:
        responseText = 'Desculpe, não consegui entender sua solicitação.';
        break;
    }

    setTimeout(() => {
      this.messages.push({ text: responseText, sender: 'received' });
    }, responseDelay);
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
