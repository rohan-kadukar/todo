import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup;
  isLogin = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.authForm.valid) {
      const { email, password } = this.authForm.value;
      try {
        if (this.isLogin) {
          console.log('Logging in with email and password...');
          const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
          const token = await userCredential.user.getIdToken(); // Fetch token
          localStorage.setItem('auth_token', token); // Store token
          console.log('Logged in successfully!');
          this.router.navigate(['/']);
        } else {
          const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
          const token = await userCredential.user.getIdToken();
          localStorage.setItem('auth_token', token); // Store token
          this.router.navigate(['/']);
        }
      } catch (error: any) {
        console.error('Error:', error);
        this.errorMessage = this.getErrorMessage(error.code);
      }
    }
  }

  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      default:
        return 'An error occurred. Please try again.';
    }
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }
}
