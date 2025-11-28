import { Component,signal } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar';
import { SideBar } from './side-bar/side-bar';
import { ContentPage } from './content-page/content-page';
import { error } from 'console';
import{Post} from '../models/curdtbl';
import { AngularTopics } from '../services/angular-topics';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MouseOverColorChange } from '../directives/mouse-over-color-change';
import { ProperCasePipePipe } from '../pipes/proper-case-pipe-pipe';

import { Toast } from '../toast/toast';
@Component({
  selector: 'app-home-page',
  imports: [CommonModule,NavBar,SideBar,Toast,RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true
})
export class HomePage  {
protected readonly title = signal('NewAPP');
}


