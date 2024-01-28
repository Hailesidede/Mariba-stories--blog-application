import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtAuthResponse } from './_model/jwtAuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://localhost:9190/"

  constructor(private httpClient : HttpClient ) { }


  register (registerForm: any) : Observable<any>{
    return this.httpClient.post<any>(`http://localhost:9190/api/auth/signup`,registerForm);
  }


  login(loginForm : any) : Observable<JwtAuthResponse>{
    return this.httpClient.post<JwtAuthResponse>(`http://localhost:9190/api/auth/login`,loginForm);
  }
}
