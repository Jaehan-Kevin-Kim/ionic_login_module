import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit, DoCheck {
  validationFormUser: FormGroup;

  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your Email' },
      { type: 'pattern', message: 'The Email entered is Incorrect.Try again' }
    ],
    password: [
      { type: 'required', message: 'Please enter your password!' },
      { type: 'minlength', message: 'The password must be at least 5 characters or more' }
    ]
  };


  constructor(public formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  ngDoCheck(): void {
    console.log(this.validationFormUser);
    console.log('email', this.validationFormUser.get('email'))
    console.log('password', this.validationFormUser.get('password'))
    // console.log('password error', this.validationFormUser.get('password').hasError);
    console.log('password error', this.validationFormUser.get('password').hasError('minlength'));
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  LoginUser(value) {
    console.log("Am logged in");
    try {
      this.authService.loginFireauth(value).then(resp => {
        console.log(resp);
      });
    } catch (err) {
      console.log(err);
    }
  }



}
