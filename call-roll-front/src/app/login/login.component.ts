import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { LoginService } from '../services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    /**
    * User declaration
    */
    user:any = {email:'', password:''};
    constructor(private loginService:LoginService) {
    }

    sendForm() {
        console.log(this.user);
        this.loginService.postLogin({email: this.user.email, password: Md5.hashStr(this.user.password)})         
    }

    ngOnInit(): void {
    }
}
