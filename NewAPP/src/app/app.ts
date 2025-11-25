import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppAppAppFormsComponent } from './app-forms/app-forms';
import { importProvidersFrom } from '@angular/core';
import {HomePage}from '../app/home-page/home-page';
import {RouterModule} from '@angular/router';
import {SearchBar} from '../app/home-page/search-bar/search-bar';
import { NavBar} from './home-page/nav-bar/nav-bar';
import { SideBar } from './home-page/side-bar/side-bar';
import { ContentPage } from './home-page/content-page/content-page';
import { Toast } from './toast/toast';
@Component({
  selector: 'app-root',
  imports: [RouterModule,NavBar,SideBar,Toast],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NewAPP');
}
