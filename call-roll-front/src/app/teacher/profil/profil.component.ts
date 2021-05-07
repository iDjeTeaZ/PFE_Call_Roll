import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher, TeacherI } from 'src/app/model/teacher';
import { Md5 } from 'ts-md5';
import { ConnectedUserService } from 'src/app/services/connectedUser/connected-user.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  teacher: TeacherI = new Teacher();
  password: string = "";
  

  constructor(public servUsers:UserService,private router:Router, private activatedRoute:ActivatedRoute, public connectedUserServ:ConnectedUserService) { 
  }

  sendForm(f:NgForm){
    if(this.password != ""){
      this.servUsers.patchPassword(this.teacher._id, Md5.hashStr(this.password))
        this.password = "";
    }
    this.servUsers.patchTeacher(this.teacher)
      .then(() => this.servUsers.getTeacherFromBackById(this.connectedUserServ.getId()));
    
  }

  onSave() {
    this.teacher._id = this.servUsers.teacher._id;
    this.teacher.firstname = this.servUsers.teacher.firstname;
    this.teacher.lastname = this.servUsers.teacher.lastname;
    this.teacher.email = this.servUsers.teacher.email;
    this.teacher.photo = this.servUsers.teacher.photo;
    this.teacher.classManager = this.servUsers.teacher.classManager;
  }

  deleteUser(){
    this.servUsers.deleteUserById(this.servUsers.teacher._id)
      .then(() => this.router.navigateByUrl('/admin/usersList/1'));
    
  }

  ngOnInit(): void { 
    this.servUsers.getTeacherFromBackById(this.connectedUserServ.getId())
      .then(() => this.onSave());
  }
}
