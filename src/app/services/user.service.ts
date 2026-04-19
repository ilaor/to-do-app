import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRest = 'https://localhost:4100/api/auth';
  private currentUser: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    console.log('UserService Constructor');
    this.currentUser = this.getUser();
  }

  signIn(userLogin: any) {
    return this.http.post<any>(`${this.apiRest}/login`, userLogin)
      .pipe(map(res => {
        this.currentUser = res.usuario.displayName;
        this.setToken(res.token);
        return res;
      }));
  }

  signOut() {
    this.currentUser = null;
    this.removeToken();
    this.router.navigateByUrl('/login');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    return sessionStorage.removeItem('token');
  }

  getUser() {
    return this.http.get<any>(`${this.apiRest}/me`)
      .pipe(map(res => res.usuario));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuth() {
    return this.currentUser !== null && this.getToken();
  }
}