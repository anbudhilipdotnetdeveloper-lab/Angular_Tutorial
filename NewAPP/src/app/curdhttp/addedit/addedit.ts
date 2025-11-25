import { ChangeDetectorRef,Component,inject,OnInit } from '@angular/core';
import { Post } from '../../models/curdtbl';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AngularTopics} from '../../services/angular-topics'
import { response } from 'express';
import { error } from 'console';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast-service';
@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addedit.html',
  styleUrl: './addedit.css'
})
export class AddEdit implements OnInit {

  private  router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor(public angulartopicService :AngularTopics,
    public toastService : ToastService
   ){}

  PostFrom!:FormGroup;
  currentId: string | null = null;

  ngOnInit(): void {
    this.PostFrom = new FormGroup({
      id:new FormControl(0),
      topic:new FormControl('',[Validators.required,Validators.minLength(5)]),
      question: new FormControl('',Validators.required),
      answer:new FormControl('',Validators.required),
    });

    // Try to read the passed post object from navigation state so we don't need an API call
    // First try Router.getCurrentNavigation (works during router.navigate), then fallback to history.state
    let stateTopic: any = null;
    try {
      const nav = (this.router as any).getCurrentNavigation ? (this.router as any).getCurrentNavigation() : null;
      stateTopic = nav && nav.extras && nav.extras.state ? nav.extras.state['topic'] : null;
    } catch (e) {
      stateTopic = null;
    }

    if (!stateTopic && typeof window !== 'undefined') {
      // history.state is available after navigation; this is the most reliable fallback for template navigation
      const hs: any = (window as any).history && (window as any).history.state ? (window as any).history.state : null;
      stateTopic = hs && hs.topic ? hs.topic : null;
    }

    if (stateTopic) {
      // populate the form from the passed object
      this.currentId = stateTopic.Id ??  null;
      this.PostFrom.patchValue({
        id: this.currentId ?? 0,
        topic: stateTopic.Topic ??  '',
        question: stateTopic.Question ??  '',
        answer: stateTopic.Answer ??  ''
      });
      // no API call required
      return;
    }

    // Fallback: if user reached the page directly with a URL containing TopicId, load from API
    this.route.paramMap.subscribe(params => {
      const id = params.get('TopicId');
      if (id) {
        this.currentId = id;
        this.loadTopic(id);
      }
    });
  }
  onSubmit(){
    if(this.PostFrom.valid){
      const newPost:Post = this.PostFrom.value;
      // If editing an existing topic, call update; otherwise create
      if (this.currentId) {
        this.angulartopicService.update(this.currentId, newPost).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.router.navigate(['/curds']);
            } else {
              alert('Unable to update Angular Topic');
            }
          },
          error: (err) => alert(err)
        });
      } else {
        const PostList:Post[] =[newPost];
        this.angulartopicService.create(PostList).subscribe({
          next :(response)=>{
            if(response.isSuccess){
              this.toastService.show("New Angular Topic Created Succesfully",'success');
              this.router.navigate(['/curds']);
            }else{
               this.toastService.show("Unable to Create Angular Topic",'error');
            }
          },error:(error)=>{
            this.toastService.show(error);
          }
        })
      }
    }else{
      alert("Invalid Form");
    }
  }
  cancel(){
    this.PostFrom.clearValidators();
    // navigate back to the list
    this.router.navigate(['/curds']);
    
  }
  
  private loadTopic(id: string) {
    // fallback API call only if navigation state wasn't provided
    this.angulartopicService.getById(id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
          const topic = Array.isArray(data) ? data[0] : data;
          if (topic) {
            this.PostFrom.patchValue({
              id: topic.Id ?? topic.id ?? id,
              topic: topic.Topic ?? topic.topic ?? '',
              question: topic.Question ?? topic.question ?? '',
              answer: topic.Answer ?? topic.answer ?? ''
            });
          }
        } else {
          alert(response.message || 'Unable to load topic');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error loading topic');
      }
    });
  }

}
