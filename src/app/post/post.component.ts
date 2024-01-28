import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPostService } from '../add-post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from '../_services/user-auth';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  paramLink! : number;

  post: any;

  constructor ( private activatedRouter : ActivatedRoute,
    private postService : AddPostService,
    private router : Router,
    private userAuthService : UserAuthService,
    private titleService : Title) { 
      this.titleService.setTitle("Blog-post")
    }
 
 
 
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      params =>{
        this.paramLink = params['id']
      }
    );

   this.postService.getPostById(this.paramLink).subscribe(
    (resp : any)=>{
      console.log("success");
      this.post = resp;
    },
    (err: HttpErrorResponse)=>{
      console.log(err);
    }
   );

  }

  getPostById(){
    this.postService.getPostById(this.paramLink).subscribe(
      (resp : any)=>{
        console.log(resp);
        this.post = resp;
      },
      (error : HttpErrorResponse)=>{
        console.log(error)
      }
    );

  }


  deletePost(){
    this.postService.deletePost(this.paramLink).subscribe(
      (resp : any)=>{
        console.log('successfully deleted');
        this.router.navigate(['/'])
        
      },
      (err : HttpErrorResponse)=>{
        console.log(err)
      }
    )
  }


  updatePost(){
    
  }


  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();

  }

  public isUser(){
    return this.userAuthService.isUser();
  }

}
