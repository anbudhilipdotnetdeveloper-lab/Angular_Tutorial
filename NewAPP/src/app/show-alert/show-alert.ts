import { Component } from '@angular/core';
import { AlertMessage } from "../alert-message/alert-message";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-alert',
  imports: [AlertMessage,FormsModule],
  templateUrl: './show-alert.html',
  styleUrl: './show-alert.css'
})
export class ShowAlert {
 mg :any;

 public onSub(event:any):void{
  let str = "Thank you for submitting the data: " +event.name+
  " withe Joke as: " +event.joke;
  alert(str);
 //this.mg=str;
 }
}