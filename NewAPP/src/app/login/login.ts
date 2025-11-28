import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router: Router) {}
   LoginForm!:any;
   captchaText:any=[];
 ngOnInit(): void {
    this.LoginForm = new FormGroup({
      UserName:new FormControl('',[Validators.required,Validators.minLength(5)]),
      Password:new FormControl('',[Validators.required,Validators.minLength(5)]),
      ConfrimPassword: new FormControl('',Validators.required)
    });
     this.generateCaptcha();
   }
  
   onSubmit(): void {
    console.log("Login button clicked");
     this.router.navigateByUrl('dashboard');
    }
    generateCaptcha(){
      let possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const lengthOfCode=1;
      for(let i=0;i<4;i++){
        let captchaText= this.makeRandom(lengthOfCode,possible);
        this.captchaText.push(captchaText);
      }
    }
   makeRandom(lengthOfCode: number,possible:string){
      let text="";
      for(let i=0;i<lengthOfCode;i++){
        text+=possible.charAt(Math.floor(Math.random()*possible.length))
      }
      return text;
   }

}
