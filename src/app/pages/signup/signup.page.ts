/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validationFormUserSignup: FormGroup;
  loading: any;

  validationMessages = {
    names: [{ type: "required", message: "Please Enter your Full Names" }],
    phone: [{ type: "required", message: "Please Enter your Phone No." }],
    email: [
      { type: 'required', message: "Enter your Email Adress" },
      { type: "pattern", meesage: "Please the Email Entered is Incorrect. Try again.." }
    ],
    password: [
      { type: "required", message: "password is required here" },
      { type: "minlength", message: "Password must be at least 6 character" }
    ]
  };


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.validationFormUserSignup = this.formBuilder.group({
      names: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))


    });


  }

  registerUser(value) {
    this.showalert();
    try {
      this.authService.userRegistration(value).then(response => {
        console.log(response);
        if (response.user) {
          response.updateProfile({
            displayName: value.name,
            email: value.email,
            phoneNumber: value.phone,
          });

          this.loading.dismiss();
          this.router.navigate(['loginscreen'])
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async errorLoading(message: any) {
    const loading = await this.alertCtrl.crete({


    })


  }

  async showalert() {
    var load = await this.alertCtrl.create({
      message: "please wait...."
    })
    load.present();
  }



}
