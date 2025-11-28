import { Component, ViewChild  } from '@angular/core';
import { Calculator } from "../../calculator/calculator";

@Component({
  selector: 'app-calculator-templete',
  imports: [Calculator],
    standalone: true,
  templateUrl: './calculator-templete.html',
  styleUrls: ['./calculator-templete.css']
})
export class CalculatorTemplete {

   result:string='';

  @ViewChild(Calculator, { static: true }) _calculator!: Calculator;

   add(value:number):void{
    this.result='Addition Result ='+value;
  }
     sub(value:number):void{
    this.result='Subtraction Result ='+value;
  }
     mul(value:number):void{
    this.result='Multiply Result ='+value;
  }
     divide(value:number):void{
    this.result='Division Result ='+value;
  }
    
     reset(): void {  
        this.result = '';  
        this._calculator.clear();  
    }  

}
