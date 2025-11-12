import { Component } from '@angular/core';
import { Post } from '../../models/curdtbl';
import {AngularTopics} from '../../services/angular-topics'
import { RouterLink } from "@angular/router";
import { response } from 'express';
import { Console, error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-side-bar',
  imports: [RouterLink,CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {

  constructor (public angularTopic :AngularTopics ){}
  posts:Post[]=[];

  getTopics() {
    this.angularTopic.getAll().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.posts = JSON.parse(response.data)
          console.log(this.posts);
        } else {
          alert(response.message)
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  trackByIndex(index: number, item: any) {
  return index;
}
onSelectItem(itemId: string): void {
  const element = document.getElementById(itemId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

}
