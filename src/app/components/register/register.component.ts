import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  registrationForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.email, Validators.required]],
    role: ['', Validators.required],
    isActive: [false],
  });

  confirmRegistration() {
    if (this.registrationForm) {
    } else {
      this.snackBar.open('Please enter valid inputs');
    }
  }
}
