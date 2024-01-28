import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    PATH_OF_API = "http://localhost:9190";
    requestHeader = new HttpHeaders(
        {"NO-AUTH": "true"}
    )

  constructor(private httpClient : HttpClient,
    private userAuthService : UserAuthService ) { }

  public login(loginData : any){
    return this.httpClient.post(this.PATH_OF_API+"/authenticate",loginData, {headers: this.requestHeader});
  }

  public roleMatch(allowedRoles : string []): boolean{
    let isMatched = false;
  const userRoles: any = this.userAuthService.getRoles();

  if (userRoles != null && userRoles) {
    for (let i = 0; i < userRoles.length; i++) {
      for (let j = 0; j < allowedRoles.length; j++) {
        if (userRoles[i].roleName === allowedRoles[j]) {
          isMatched = true;
          return isMatched;
        }
      }
    }
  }

  return isMatched; // this ensures a return statement outside the loops

  }


}
