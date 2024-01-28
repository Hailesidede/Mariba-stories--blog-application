import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostPayLoad } from '../_model/postPayLoad';
import { AddPostService } from '../add-post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { UserService } from '../_services/userService';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  postForm!: FormGroup;

 postPayLoad! : PostPayLoad

 body = new FormControl('')
 title = new FormControl('')

  constructor (private addPostService : AddPostService,
    private router : Router,
    private sanitizer : DomSanitizer,
    public userService : UserService) {
    this.postForm = new FormGroup({

      title : this.title,
      body : this.body
    
    })
     

    this.postPayLoad = {
      content: '',
      title : '',
      postImage:[]
    }

  }
  
  
  ngOnInit(): void {
    
  }



  publishPost(postForm : FormGroup){
   // console.log(this.postPayLoad);

    this.postPayLoad.content = this.postForm.get('body')?.value;
    this.postPayLoad.title = this.postForm.get('title')?.value;
    


    if(this.postPayLoad != null){

      const postFormData = this.prepareFormData(this.postPayLoad);

      this.addPostService.addPost(postFormData).subscribe(
        (resp : any)=>{
          console.log(resp);
          console.log('post posted succesfully')
          this.router.navigate(['/'])
  
        },
        (err : HttpErrorResponse)=>{
          console.log(err);
          console.log(' error occured ')
        }
      );


    }
  }


  prepareFormData(postPayLoad : PostPayLoad): FormData{
    const formData = new FormData();
    formData.append(
      'post',
      new Blob([JSON.stringify(postPayLoad)],{type: 'application/json'})
    );

    for(var i =0; i<postPayLoad.postImage.length;i++){
      formData.append(
        'files',
        postPayLoad.postImage[i].file,
        postPayLoad.postImage[i].file.name
      );
    }

    return formData;
  }

  onFileSelect(event: any){
    if(event.target.files){
      const file : any = event.target.files[0];

      const fileHandle : FileHandle = {
        file : file,
        url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.postPayLoad.postImage.push(fileHandle);

  }


}

removeImage(i : number){
  this.postPayLoad.postImage.slice(i,1)

}

}
