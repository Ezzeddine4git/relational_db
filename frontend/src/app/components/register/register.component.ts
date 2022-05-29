import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public statusCode: any;

  constructor(public authService: AuthServiceService) {}

  ngOnInit(): void {}

  async register(registerForm: NgForm) {
    this.statusCode = await this.authService.register(
      registerForm.value.email,
      registerForm.value.name,
      registerForm.value.password,
      registerForm.value.password_confirmation
    );
  }
}
