import { Component,OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {CommonModule} from '@angular/common'
import { clear } from 'console';
import{ Router } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit {
constructor (private router:Router ){}
  searchControl = new FormControl('');
   Topics =[
    'Modules (NgModules)',
    'Components',
    'Templates & Data Binding',
    'Directives (Structural & Attribute)',
   ]
   filteredItems: string[]=[];
   ngOnInit(){
     this.searchControl.valueChanges
         .pipe(debounceTime(300))
         .subscribe((value)=>{
          this.filterItems(value||'' );
         });
   }
   filterItems(query:string){
    if(query != ''){
     this.filteredItems = this.Topics.filter(item =>
      item.toLowerCase().includes(query?.toLowerCase())
     );
    }else{
       this.filteredItems=[];
    }
   console.log('topics',this.filteredItems);
   }
   onSearch() {
  // Optional: handle when user presses Enter
  console.log('Search submitted:', this.searchControl.value);
}

}
