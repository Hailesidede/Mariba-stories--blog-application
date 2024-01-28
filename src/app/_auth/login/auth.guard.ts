import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/_services/user-auth';
import { UserService } from 'src/app/_services/userService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  


  constructor (private userAuthService : UserAuthService,
    private router : Router,
    private userSevice : UserService) {}
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  | UrlTree | Observable<boolean 
  | UrlTree> | Promise<boolean | UrlTree> {


    


    if(this.userAuthService.getToken() !== null){
     const role =  route.data["roles"] as Array<string>

     if(role){
       const match = this.userSevice.roleMatch(role)
       if(match){
        return true;
       }else{
        this.router.navigate(['/forbidden'])
        return false;
       }

     }

    }
    this.router.navigate(['/login']);
    return false;
    
  }

}