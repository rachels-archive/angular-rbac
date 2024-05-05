import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;

  private loginStatusSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {
    console.log(this.isLoggedIn);
  }

  logout() {
    console.log('Logout initiated'); // Check if this log appears in the console
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      },
    });
  }

  ngOnInit(): void {
    // Subscribe to login status changes
    this.loginStatusSubscription = this.authService.loginStatus$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        console.log('Login status updated:', this.isLoggedIn);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from login status changes to prevent memory leaks
    this.loginStatusSubscription?.unsubscribe();
  }
}
