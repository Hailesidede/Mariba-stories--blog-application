import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User} from 'src/app/_model/User';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (
    private authService : AuthService,
    private router : Router){ }
  
  
    ngOnInit(): void {
    
  }

    
  user : User = {
      username: "",
      firstName:"",
      lastName:"",
      email:"",
      password:""
    }
    
    
    
    
    registerUser(userRegistration:NgForm ){

      // const registerForm  = {
      //   "username":userRegistration.value.username,
      //   "lastName":userRegistration.value.lastName,
      //   "firstName":userRegistration.value.firstName,
      //   "email":userRegistration.value.email,
      //   "password":userRegistration.value.password
      // }
      this.authService.register(userRegistration.value).subscribe(
        (response : any)=>{
          console.log(response);
          console.log("successful registation");
          if(response.httpStatus == 201){
            this.router.navigate(['/login'])
          }
          

        },
        (error : HttpErrorResponse)=>{
          console.log(error);
        }

      );
    

}


}
