import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public statusCode: any;
  constructor(public authService: AuthServiceService) {}

  ngOnInit(): void {}

  async login(loginForm: NgForm) {
    this.statusCode = await this.authService.login(
      loginForm.value.email,
      loginForm.value.password
    );
  }
}
