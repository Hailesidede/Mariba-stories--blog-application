import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth';
import { UserService } from 'src/app/_services/userService';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor ( private userService : UserService,
    private router : Router,
    private userAuthService : UserAuthService
   
   ){ }
 
 
 
 
  ngOnInit(): void {
    
  }


  login(loginForm : NgForm){
    console.log(loginForm.value)
    this.userService.login(loginForm.value).subscribe(
      (resp : any)=>{
        console.log(resp)

        this.userAuthService.setRoles(resp.user.roles);
        this.userAuthService.setToken(resp.jwtToken);

        // const role = resp.user.role[0];
        this.router.navigate(['/'])
      },
      (err : HttpErrorResponse)=>{
        console.log(err)
      }
    );
  }


}
