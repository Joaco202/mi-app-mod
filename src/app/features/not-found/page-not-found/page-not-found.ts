import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <p>Página no encontrada.</p>
      <a [routerLink]="['/home']">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      padding: 2rem;
      text-align: center;
    }
    h1 { font-size: 5rem; margin-bottom: 0.5rem; }
    a { color: #0d6efd; }
  `]
})
export class PageNotFound {}
