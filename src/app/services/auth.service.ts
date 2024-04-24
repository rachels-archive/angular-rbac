import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, of } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/users';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: any) => {
        return throwError('User Not Found.');
      })
    );
  }

  createUser(userData: User) {
    return this.http.post<User>(this.apiUrl, userData);
  }

  updateUser(id: any, userData: any) {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') !== null;
  }

  getUserRole() {
    const role = sessionStorage.getItem('userrole');
    return role !== null ? role.toString() : '';
  }

  logout() {
    sessionStorage.clear();
    return of({ success: false, role: '' });
  }
}
