import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { LoginService } from './features/auth/services/login.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Empresa ACME');
  public authService = inject(LoginService);
}
