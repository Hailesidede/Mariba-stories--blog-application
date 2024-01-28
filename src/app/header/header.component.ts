import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private router : Router,
    private userAuthService : UserAuthService){

  }

  login(){
    this.router.navigate(["/login"])
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }


  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/'])
  }

}
