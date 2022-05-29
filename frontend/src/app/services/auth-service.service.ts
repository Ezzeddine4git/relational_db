import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(public router: Router, public http: HttpClient) {}

  async login(email: string, password: string) {
    var codeStatus!: any;

    const promise = new Promise((resolve) => {
      this.http
        .post<any>(`${environment.apiUrl}/login`, {
          email: email,
          password: password,
        })
        .subscribe(
          (data) => {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('access_token', data.access_token);
            resolve(data.status);
            this.router.navigate(['/home']);
          },
          (error: HttpErrorResponse) => {
            resolve(error.status);
            throwError(error.error.message);
          }
        );
    });

    await promise.then((response) => {
      codeStatus = response;
    });

    return codeStatus;
  }

  async register(
    email: string,
    name: string,
    password: string,
    password_confirmation: string,
    profile_picture: File | null,
    cover_picture: File | null
  ) {
    var statusCode: any;
    const formData = new FormData();

    if (cover_picture) {
      formData.append('cover_picture', cover_picture);

      const upload$ = this.http.post('/api/thumbnail-upload', formData);
    }

    if (profile_picture) {
      formData.append('profile_picture', profile_picture);

      const upload$ = this.http.post('/api/thumbnail-upload', formData);
    }

    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    formData.append('name', name);
    const promise = new Promise((resolve) => {
      this.http.post<any>(`${environment.apiUrl}/register`, formData).subscribe(
        (data) => {
          console.log(data);
          this.login(email, password);
        },
        (error: HttpErrorResponse) => {
          resolve(error.status);
          throwError(error.error.message);
        }
      );
    });

    await promise.then((response) => {
      statusCode = response;
    });

    return statusCode;
  }

  isLoggedIn(): boolean {
    var user = localStorage.getItem('user');
    var access_token = localStorage.getItem('access_token');

    if (user && access_token) {
      return true;
    }

    return false;
  }

  logout() {
    this.http.post<any>(`${environment.apiUrl}/logout`, null).subscribe(
      (response) => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        throwError(error.message);
      }
    );
  }
}
