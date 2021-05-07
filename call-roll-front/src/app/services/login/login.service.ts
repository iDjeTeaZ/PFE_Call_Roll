import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { ConnectedUserService } from '../connectedUser/connected-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, public connectedUserServ:ConnectedUserService, private router: Router) { }
  

  async postLogin(userLogin:{email:string, password:string | Int32Array}){
    this.connectedUserServ.setEmail(userLogin.email);
    await this.http.post<any>('http://0.0.0.0:5001/login', userLogin)
      .subscribe(
        data => {
          console.log(data);
          this.connectedUserServ.setConnection(true);
          this.connectedUserServ.setStatus(data.status);
          this.connectedUserServ.setToken(data.token);
          this.connectedUserServ.setId(data._id);
          if(this.connectedUserServ.getStatus() == 1) {
            this.router.navigateByUrl('/student');
        } else if(this.connectedUserServ.getStatus() == 2) {
            this.router.navigateByUrl('/teacher');
        } else if(this.connectedUserServ.getStatus() == 3) {
            this.router.navigateByUrl('/admin');
        } 
        },
        error => {
          console.log(error);
          this.connectedUserServ.setConnection(false);
          this.connectedUserServ.setStatus(0);
          this.connectedUserServ.setToken("");
        }
      )
  }
}
