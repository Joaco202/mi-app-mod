import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isAutenticated = signal<boolean>(false);
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000';

  constructor() {
    const token = typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function'
      ? localStorage.getItem('token')
      : null;
    this.isAutenticated.set(!!token);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.isAutenticated.set(false);
    this.router.navigate(['/login']);
  }

  login(email: string, password: string) {
    let userLogin = { email: email, password: password };
    return this.http.post(`${this.apiUrl}/login`, userLogin).pipe(
      map((resp: any) => {
        console.log('Login successful:', resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.isAutenticated.set(true);
        this.router.navigate(['/home']);
      })
    );
  }

  public loginGoogle(token: string) {
    const header = { 'Content-Type': 'application/json' };
    let googleToken = { token: token };
    return this.http.post(`${this.apiUrl}/google-login`, googleToken, { headers: header }).pipe(
      map((resp: any) => {
        console.log('Login with Google successful:', resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.isAutenticated.set(true); // Actualizar el estado de autenticación
        this.router.navigate(['/home']);
      })
    );
  }
}
