import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher, TeacherI } from 'src/app/model/teacher';
import { Md5 } from 'ts-md5';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacher: TeacherI = new Teacher();
  password: string = "";
  

  constructor(public servUsers:UsersService,private router:Router, private activatedRoute:ActivatedRoute) { 
  }

  sendForm(f:NgForm){
    if(this.password != ""){
      this.servUsers.patchPassword(this.teacher._id, Md5.hashStr(this.password))
        this.password = "";
    }
    this.servUsers.patchTeacher(this.teacher)
      .then(() => this.servUsers.getTeacherFromBackById(history.state.data));
    
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
      .then(() => this.router.navigateByUrl('/admin/usersList/2'));
    
  }

  ngOnInit(): void { 
    this.servUsers.getTeacherFromBackById(history.state.data)
      .then(() => this.onSave());
  }

}
