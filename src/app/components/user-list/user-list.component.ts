import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/User';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  constructor(private authService: AuthService) {}

  users: User[] = [];

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users; // Assign the list of users to the userList variable
      },
      (error) => {
        console.error('Error fetching user list:', error);
      }
    );
  }
}
