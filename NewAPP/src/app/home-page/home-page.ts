import { Component,OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar';
import { SideBar } from './side-bar/side-bar';
import { ContentPage } from './content-page/content-page';
import { error } from 'console';
import{Post} from '../models/curdtbl';
import { AngularTopics } from '../services/angular-topics';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true
})
export class HomePage implements OnInit {

Topic_List:Post[]=[];

constructor(public angularTopic :AngularTopics ,public sanitizer : DomSanitizer){}
ngOnInit(): void {
  this.angularTopic.getAll().subscribe({
    next:(response)=>{
      if(response.isSuccess){
            const rawData = JSON.parse(response.data);
        // Sanitize topic content
        this.Topic_List = rawData.map((item: any) => ({
          ...item,
          Answer: this.sanitizer.bypassSecurityTrustHtml(item.Answer)
        }));
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


