import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private httpClient : HttpClient,
    private sanitizer : DomSanitizer) { }


  public createImages(postPayLoad : any){
    const postImage : any[] = postPayLoad.postImage;

    const postImagesToFileHandle : FileHandle[]= [];

    for(let i= 0; i < postImage.length;i++){
        const imageFileData = postImage[i];

        
        const imageBlob =this.dataURItoBLOB(imageFileData.imageByte,imageFileData.type);
        const imageFile = new File([imageBlob],imageFileData.name,{type: imageFileData.type});

        const finalFileHandle : FileHandle={
            file: imageFile,
            url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))

        };
        postImagesToFileHandle.push(finalFileHandle);
    }

    postPayLoad.postImages = postImagesToFileHandle;
    return postPayLoad;
  }


  public dataURItoBLOB(picByte: any , imageType: any){
    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length;i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array],{type: imageType});
    return blob;

  }
}
