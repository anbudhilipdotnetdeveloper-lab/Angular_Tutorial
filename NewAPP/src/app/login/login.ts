import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router: Router) { }
  LoginForm!: any;
  captchaText: any = [];
   errorMsg: string ="";
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      UserName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      captcha: new FormControl('', Validators.required)
    });
    this.generateCaptcha();
  }

  onSubmit(): void {
    console.log("Login button clicked");
    if (this.LoginForm.valid) {
      if (this.validateCaptcha(this.captchaText, this.LoginForm.value.captcha)) {
        if (this.LoginForm.value.UserName === "admin" && this.LoginForm.value.Password === "admin") {
          this.router.navigateByUrl('dashboard');
          alert("Login Successfully.");
        } else {
    
          this.errorMsg = "* Invalid UserName or Password. Please try again.";
        this.captchaText = [];
        this.generateCaptcha();
        this.LoginForm.patchValue({ captcha: '' });
      }
      }
      else {
    
          this.errorMsg = "* Invalid Captcha. Please try again.";
        this.captchaText = [];
        this.generateCaptcha();
        this.LoginForm.patchValue({ captcha: '' });
      }

    } else {    

      this.errorMsg="* Please fill the form correctly.";
       this.captchaText = [];
        this.generateCaptcha();
        this.LoginForm.patchValue({ captcha: '' });
    }
  }
  generateCaptcha() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const lengthOfCode = 1;
    for (let i = 0; i < 4; i++) {
      let captchaText = this.makeRandom(lengthOfCode, possible);
      this.captchaText.push(captchaText);
    }
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }

  validateCaptcha(captchaText: string[], userCaptcha: string): boolean {
    for (let i = 0; i < captchaText.length; i++) {
      if (captchaText[i] != userCaptcha.charAt(i)) {
        return false;
      }
    }
    return true;
  }
  refreshCaptcha() {
    this.captchaText = [];
    this.generateCaptcha();
    this.LoginForm.patchValue({ captcha: '' });
  }

}
