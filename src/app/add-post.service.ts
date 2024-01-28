import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPayLoad } from './_model/postPayLoad';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient : HttpClient) { }


  public addPost (postPayLoad : FormData){
    return this.httpClient.post(`http://localhost:9190/api/posts/add`,postPayLoad);

  }


  public getAllPosts(){
    return this.httpClient.get<PostPayLoad[]>(`http://localhost:9190/api/posts/all`);
  }


  public getPostById(paramLink : number) : Observable<any>{
    return this.httpClient.get<any>(`http://localhost:9190/api/posts/get/`+paramLink)
  }


  public deletePost(paramLink : number){
    return this.httpClient.delete(`http://localhost:9190/api/posts/delete/`+paramLink);
  }
}
