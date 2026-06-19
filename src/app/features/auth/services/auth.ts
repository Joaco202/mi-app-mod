import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public isAutenticated = signal<boolean>(false);
  private http = inject(HttpClient); // Inyección moderna
  private router = inject(Router);

  constructor() {
    const token = typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
      ? localStorage.getItem('token')
      : null;
    this.isAutenticated.set(!!token);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.isAutenticated.set(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']);
  }

  login(email: string, password: string) {
    let userLogin = { email: email, password: password };
    return this.http.post(`http://localhost:3000/login`, userLogin).pipe(
      map((resp: any) => {
        console.log('Login successful:', resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.isAutenticated.set(true); // Actualizar el estado de autenticación
        this.router.navigate(['/home']);
      })
    );
  }
}
