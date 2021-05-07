import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin, AdminI } from 'src/app/model/admin';
import { Md5 } from 'ts-md5/dist/md5';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin: AdminI = new Admin();
  password: string = "";
  

  constructor(public servUsers:UsersService,private router:Router, private activatedRoute:ActivatedRoute) { 
  }

  sendForm(f:NgForm){
    if(this.password != ""){
      this.servUsers.patchPassword(this.admin._id, Md5.hashStr(this.password))
        this.password = "";
    }
    this.servUsers.patchAdmin(this.admin)
      .then(() => this.servUsers.getAdminFromBackById(history.state.data));
    
  }

  onSave() {
    this.admin._id = this.servUsers.admin._id;
    this.admin.firstname = this.servUsers.admin.firstname;
    this.admin.lastname = this.servUsers.admin.lastname;
    this.admin.email = this.servUsers.admin.email;
    this.admin.photo = this.servUsers.admin.photo;
  }

  deleteUser(){
    this.servUsers.deleteUserById(this.servUsers.admin._id)
      .then(() => this.router.navigateByUrl('/admin/usersList/3'));
    
  }

  ngOnInit(): void { 
    this.servUsers.getAdminFromBackById(history.state.data)
      .then(() => this.onSave());
  }

}
