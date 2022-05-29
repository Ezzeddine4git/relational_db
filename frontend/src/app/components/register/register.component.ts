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
  public profile_picture!: File | null;
  public cover_picture!: File | null;

  constructor(public authService: AuthServiceService) {}

  ngOnInit(): void {}

  async register(registerForm: NgForm) {
    this.statusCode = await this.authService.register(
      registerForm.value.email,
      registerForm.value.name,
      registerForm.value.password,
      registerForm.value.password_confirmation,
      this.profile_picture,
      this.cover_picture
    );
    // console.log(this.cover_picture);
    // console.log(this.profile_picture);
  }

  handleFileInput(event: any) {
    console.log(event.target.name === 'cover_picture');
    if (event.target.name === 'cover_picture') {
      this.cover_picture = event.target.files[0];
    } else {
      this.profile_picture = event.target.files[0];
    }
  }
}
