import { Component, OnInit } from '@angular/core';
import { AddPostService } from '../add-post.service';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { PostPayLoad } from '../_model/postPayLoad';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../_services/userService';
import { UserAuthService } from '../_services/user-auth';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts : any = [];
  
  constructor(private addPostService : AddPostService,
    private imageProcessingService : ImageProcessingService,
    private router : Router,
    private userAuthService : UserAuthService,
    private title : Title) {
      this.title.setTitle("Home")
    }
  
  
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.addPostService.getAllPosts()
    .pipe(
      map((x: PostPayLoad[],i)=> x.map((postPayLoad : PostPayLoad)=>this.imageProcessingService.createImages(postPayLoad)))
    ).subscribe(
      (resp : any[])=>{
        console.log(resp);
        console.log('successfully retrieved all the posts');
        this.posts = resp;
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
        console.log('failed to retrieve');
      }
    );
  }

  navigate(id : number){
    this.router.navigate(['post/:id'])
    

  }


  public isAdmin(){
    return this.userAuthService.isAdmin();
  }


  public isUser(){
    return this.userAuthService.isUser();
  }


  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

}
