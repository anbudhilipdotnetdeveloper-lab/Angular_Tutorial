import { Component } from '@angular/core';
import { ToastService } from '../services/toast-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {
 show=false;
 message='';
 type:string='info';

 constructor(private toastService:ToastService){

 }
  ngOnInit(){
    this.toastService.toastState.subscribe((toast)=>{
      this.message=toast.message;
      this.type=toast.type;
      this.show=true;

      setTimeout(()=>{
        this.show=false;
      },3000);
    });
  }
}
