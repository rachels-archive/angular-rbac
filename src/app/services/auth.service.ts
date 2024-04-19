import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/users';

  getAllUsers() {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: Number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUser(userData: any) {
    return this.http.post(this.apiUrl, userData);
  }

  updateUser(id: any, userData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  deleteUser() {}
}
