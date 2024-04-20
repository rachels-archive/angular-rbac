import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  confirmLogin() {
    if (this.loginForm.valid) {
      const loginId = this.loginForm.value.id!;
      const loginPassword = this.loginForm.value.password!;
      this.authService
        .getUserById(loginId)
        .pipe(
          map((res: any) => {
            return {
              id: res?.id,
              password: res?.password,
              isActive: res?.isActive,
              role: res?.role,
            };
          })
        )
        .subscribe(
          (res) => {
            if (loginPassword == res.password) {
              if (res.isActive) {
                sessionStorage.setItem('username', res.id);
                sessionStorage.setItem('userrole', res.role);
                this.router.navigate(['']);
              }
            } else {
              this.snackBar.open('Invalid credentials. Try again.', 'Dismiss', {
                duration: 3000,
              });
            }
          },
          (error) => {
            this.snackBar.open(error, 'Dismiss', {
              duration: 3000,
            });
          }
        );
    }
  }
}
