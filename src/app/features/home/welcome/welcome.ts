import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome-container">
      <h1>Bienvenido a Empresa ACME</h1>
      <p>Seleccioná una opción del menú para comenzar.</p>
    </div>
  `,
  styles: [`
    .welcome-container {
      padding: 2rem;
      text-align: center;
    }
    h1 { margin-bottom: 1rem; }
  `]
})
export class Welcome {}
