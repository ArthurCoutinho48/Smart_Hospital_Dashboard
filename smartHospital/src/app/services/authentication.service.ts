import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private baseUrl = 'http://localhost:5000'; // endereço do seu Flask backend
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  register(email: string, password: string, name: string) {
    const data = { email, password, name };
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(email: string, password: string) {
    const data = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, data).subscribe({
      next: (response) => {
        this.isAuthenticatedSubject.next(true);
        this.currentUserName.next(response.name);
        localStorage.setItem('isLoggedIn', 'true');
      },
      error: () => {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.currentUserName.next('');
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn() {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUserName() {
    return this.currentUserName.asObservable();
  }
}
