import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-recovery',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recovery.html',
  styleUrl: './recovery.css',
})
export class Recovery {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  codeSent = signal<boolean>(false);
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

  requestForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  resetForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    newPassword: ['', [Validators.required, Validators.minLength(10)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  sendResetCode() {
    if (this.requestForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set('');
    const email = this.requestForm.value.email!;

    this.loginService.forgotPassword(email).subscribe({
      next: (resp: any) => {
        this.loading.set(false);
        this.codeSent.set(true);
        if (resp.code) {
          console.log(`[DEV MODE] Código de recuperación recibido: ${resp.code}`);
        }
      },
      error: (err: any) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.mensaje || 'Error al solicitar el código. Inténtalo de nuevo.');
      }
    });
  }

  resetPassword() {
    if (this.resetForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set('');
    const email = this.requestForm.value.email!;
    const code = this.resetForm.value.code!;
    const newPassword = this.resetForm.value.newPassword!;

    this.loginService.resetPassword({ email, code, newPassword }).subscribe({
      next: (resp: any) => {
        this.loading.set(false);
        alert('Contraseña restablecida con éxito. Redirigiendo al login...');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.mensaje || 'Error al restablecer la contraseña.');
      }
    });
  }

  goBack() {
    this.codeSent.set(false);
    this.resetForm.reset();
    this.errorMessage.set('');
  }
}
