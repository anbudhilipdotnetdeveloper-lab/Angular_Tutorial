import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseOverColorChange } from '../../directives/mouse-over-color-change';
import { ProperCasePipePipe } from '../../pipes/proper-case-pipe-pipe';
import { AngularTopics } from '../../services/angular-topics';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import{Post} from '../../models/curdtbl';
interface Topics {
  topic: string;
  question: string;
  answer: string;
}
@Component({
  selector: 'app-content-page',
  imports: [CommonModule,MouseOverColorChange,ProperCasePipePipe],
  templateUrl: './content-page.html',
  styleUrl: './content-page.css',
   standalone: true
})
export class ContentPage implements OnInit {

  constructor(public angularTopic :AngularTopics ,public sanitizer : DomSanitizer){}
  Topic_List:Post[]=[];
Topiecs = [
    'Modules (NgModules)',
    'Components',
    'DataBinding',
    'Directives (Structural & Attribute)',
  ]
  dataBindingTypes = [
    'Interpolation (Bind component data to HTML) {{title}}',
    'Property Binding (Bind data to an element property) [src]=\"imageUrl\"',
    'Event Binding (Bind events to component) (click) =\"onClick()\"',
    'Two-way Binding (Bind data both ways) [(ngModel)]=\"username\"'
  ]
  topicList: Topics[] = [{
    topic: 'Components',
    question: 'What are Components in Angular ?',
    answer: 'A Components is the building block of any Angular application. It controls a part of the user interface(UI) -like a widget or a page section.'
  },
  {
    topic: 'DataBinding',
    question: 'What are Components in Angular ?',
    answer: 'A Components is the building block of any Angular application. It controls a part of the user interface(UI) -like a widget or a page section.'
  }
  ]
  selectedTopic: Topics | null = null;

  selectTopic(topic: string) {
    debugger;
    const found = this.topicList.find(element => element.topic === topic);
    if (found) {
      this.selectedTopic = found;
    } else {
      this.selectedTopic = null;
    }
  }
  


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
