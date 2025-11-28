import { Component,OnInit,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {

  firstNumber!: number ;
   secondNumber!: number;
   result!: number;

  @Output()  addNumber:EventEmitter<number>= new EventEmitter<number>();
  @Output()  subNumber:EventEmitter<number>= new EventEmitter<number>();
  @Output()  mulNumber:EventEmitter<number>= new EventEmitter<number>();
  @Output()  divideNumber:EventEmitter<number>= new EventEmitter<number>();

  constructor(){}

  ngOnInit(): void {}

   add():void{
    this.result = this.firstNumber + this.secondNumber;
    this.addNumber.emit(this.result);
  }
   sub():void{
    this.result = this.firstNumber - this.secondNumber;
    this.subNumber.emit(this.result);
  }
   mul():void{
    this.result = this.firstNumber * this.secondNumber;
    this.mulNumber.emit(this.result);
  }

   divide():void{
    this.result= this.firstNumber/ this.secondNumber;
    this.divideNumber.emit(this.result)
  }
   clear():void{
    this.firstNumber=0;
    this.secondNumber=0;
    this.result=0;
  }
}
