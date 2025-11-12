import { Component,OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar';
import { SideBar } from './side-bar/side-bar';
import { ContentPage } from './content-page/content-page';
import { error } from 'console';
import{Post} from '../models/curdtbl';
import { AngularTopics } from '../services/angular-topics';
@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true
})
export class HomePage implements OnInit {

Topic_List:Post[]=[];

constructor(public angularTopic :AngularTopics ){}
ngOnInit(): void {
  this.angularTopic.getAll().subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.Topic_List=JSON.parse(response.data);
      }else{
        alert(response.message);
        console.log(response.message);
      }
    },
    error:(error)=>{
      console.log(error);
    }
  })
}
}


