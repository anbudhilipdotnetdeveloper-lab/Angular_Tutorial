import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-alert-message',
  imports: [FormsModule],
  templateUrl: './alert-message.html',
  styleUrl: './alert-message.css'
})
export class AlertMessage {

   @Input() message!: string;

   public data:any={};
   @Output() onSubmitData = new EventEmitter<any>();
    
    //@Input('alert-pop') public mg: string='';

    public showAlertMessage():void{
        alert(this.message);
    }
    public onSubmit():void{
        this.onSubmitData.emit(this.data);
    }
}
