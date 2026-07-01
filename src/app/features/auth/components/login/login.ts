import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SocialAuthService, GoogleSigninButtonModule, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, GoogleSigninButtonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private formBuilder = inject(FormBuilder);    // Inyección moderna
  private loginService = inject(LoginService);          // Inyección moderna
  private socialAuthService = inject(SocialAuthService); // Inyección moderna

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser | null) => {
      if (user) {
        this.loginService.loginGoogle(user.idToken!).subscribe({
          next: (data)=>{
            console.log('Google login succesful',data);
          }
        })
      }
    });
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]]
  });

  login() {
    let email: any = this.loginForm.value.email;
    let password: any = this.loginForm.value.password;
    this.loginService.login(email, password).subscribe(
      data => {
        console.log('Login successful:', data);
      }
    );
  }
}
