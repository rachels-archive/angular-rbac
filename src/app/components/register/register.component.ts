import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  registrationForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    role: ['', Validators.required],
    isActive: [false],
  });

  confirmRegistration() {
    if (this.registrationForm) {
      //remove confirmation password before creatinf user
      const { confirmPassword, ...userDetails } = this.registrationForm.value;
      this.authService.createUser(userDetails).subscribe((res) => {
        this.snackBar.open('User registered successfully');
        this.router.navigate(['login']);
      });
    } else {
      this.snackBar.open('Please enter valid inputs');
    }
  }
}
