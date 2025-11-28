
import { Component, OnInit } from '@angular/core';
import{Post} from '../models/curdtbl';
import { Observable } from 'rxjs';
import { AngularTopics } from '../services/angular-topics';
import { error } from 'console';
import {Express} from 'express';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AddEdit } from './addedit/addedit';
import { ToastService } from '../services/toast-service';
import { AlertMessage } from "../alert-message/alert-message";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curdhttp',
  imports: [RouterLink,CommonModule,],
  templateUrl: './curdhttp.html',
  styleUrl: './curdhttp.css'
})
export class CURDHTTP implements OnInit {
 posts:Post[] =[];


constructor (private router: Router,
  public toastService:ToastService,
   public angularTopic :AngularTopics ){}

  ngOnInit(): void {
    this.angularTopic.getAll().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.posts = JSON.parse(response.data)
        }
        else {
          this.toastService.show(response.message,'error');
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // navigate to AddEdit and pass the selected post via navigation state to avoid another API call
  edit(post: Post) {
    // pass the whole post object in state so AddEdit can populate the form without calling API
    this.router.navigate(['/curds','AddEdit', post.Id],{ state: { topic: post } });
  }
  delete(id:string){
    if(confirm("Are you sure to Delete this record?")){
      this.angularTopic.delete(id).subscribe({
        next:(response)=>{
          if(response.isSuccess){
            alert("Record Deleted Successfully");
            this.ngOnInit();
          }else{
            alert(response.message??"Failed to delete record");
          }
        }
      })
    }
  }
}
