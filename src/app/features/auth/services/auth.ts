import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient); // Inyección moderna

  isAutenticated = signal(false);

  login(email: string, password: string) {
    let userLogin = { email: email, password: password };
    return this.http.post(`http://localhost:3000/login`, userLogin).pipe(
      map((resp: any) => {
        console.log('Login successful:', resp);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.isAutenticated.set(true); // Actualizar el estado de autenticación
      })
    );
  }
}
