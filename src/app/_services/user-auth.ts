import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

    constructor () {}


    public setRoles (roles : []){
        localStorage.setItem('roles',JSON.stringify(roles));
    }

    public getRoles() : []{
        const rolesString = localStorage.getItem('roles');
        if (rolesString !== null) {
          return JSON.parse(rolesString);
        } else {
        
          return [];
        }
    }


    public setToken(jwtToken : string){
        localStorage.setItem("jwtToken",jwtToken);
    }

    public getToken(): string | null {
        return localStorage.getItem("jwtToken");
    }


    public clear (){
        localStorage.clear();
    }


    public isLoggedIn(){
        return this.getRoles() && this.getToken();
    }


    public isAdmin(){
        const roles : any [] = this.getRoles();
        // console.log(roles);
        return roles[0].roleName === 'Admin';
    }




    public isUser(){
        const roles : any[] = this.getRoles();
        return roles[0].roleName === 'User';
    }

   


}
