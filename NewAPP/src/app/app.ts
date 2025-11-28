import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppAppAppFormsComponent } from './app-forms/app-forms';
import { importProvidersFrom } from '@angular/core';
import {HomePage}from '../app/home-page/home-page';
import {RouterModule} from '@angular/router';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [RouterModule,Login],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
