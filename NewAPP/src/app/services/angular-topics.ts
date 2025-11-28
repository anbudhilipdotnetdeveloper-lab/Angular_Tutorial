import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/curdtbl';

@Injectable({
  providedIn: 'root'
})
export class AngularTopics {
  private apiURL = 'https://localhost:44318/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL+'/AngularTutorial/GetAllTopics', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getById(id:string):Observable<any>{
    return this.httpClient.get(this.apiURL+"/AngularTutorial/GetTopicsById"+id)
    .pipe(catchError(this.errorHandler))
  }

  create(post:Post[]):Observable<any>{
    return this.httpClient.post(this.apiURL+"/AngularTutorial/Create",post,this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }
  update(id:string,post:Post):Observable<any>{
    return this.httpClient.put(this.apiURL+"/AngularTutorial/Update/"+id,post)
    .pipe(catchError(this.errorHandler))
  }
  delete(id:string):Observable<any>{
    return this.httpClient.delete(this.apiURL+"/AngularTutorial/Delete/"+id)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
