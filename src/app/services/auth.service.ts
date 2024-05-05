import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, throwError, of, map, Subject } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/users';

  // Define a subject to emit login/logout events
  private loginStatusSubject = new Subject<boolean>();

  // Expose an observable to subscribe to login/logout events
  loginStatus$ = this.loginStatusSubject.asObservable();

  // Method to update login status and emit events
  updateLoginStatus(isLoggedIn: boolean) {
    this.loginStatusSubject.next(isLoggedIn);
  }

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

  login(id: string, password: string): Observable<any> {
    return this.getUserById(id).pipe(
      map((res: any) => {
        if (res && res.password === password && res.isActive) {
          sessionStorage.setItem('username', res.id);
          sessionStorage.setItem('userrole', res.role);
          this.updateLoginStatus(true); // Emit login event

          return { success: true, role: res.role };
        } else {
          return {
            success: false,
            message: 'Invalid credentials or user inactive',
          };
        }
      }),
      catchError((error: any) => {
        return throwError('User Not Found.');
      })
    );
  }

  logout(): Observable<any> {
    console.log('session', sessionStorage);
    this.updateLoginStatus(false); // Emit logout event

    sessionStorage.clear();
    return of({ success: true, role: '' });
  }
}
