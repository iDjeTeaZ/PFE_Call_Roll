import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentI } from 'src/app/model/student';
import { UsersService } from '../services/users/users.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: StudentI = new Student();
  password: string = "";
  

  constructor(public servUsers:UsersService,private router:Router, private activatedRoute:ActivatedRoute) { 
  }

  sendForm(f:NgForm){
    if(this.password != ""){
      this.servUsers.patchPassword(this.student._id, Md5.hashStr(this.password))
        this.password = "";
    }
    this.servUsers.patchStudent(this.student)
      .then(() => this.servUsers.getStudentFromBackById(history.state.data));
    
  }

  onSave() {
    this.student._id = this.servUsers.student._id;
    this.student.firstname = this.servUsers.student.firstname;
    this.student.lastname = this.servUsers.student.lastname;
    this.student.email = this.servUsers.student.email;
    this.student.photo = this.servUsers.student.photo;
    this.student.promotion = this.servUsers.student.promotion;
    this.student.specialty = this.servUsers.student.specialty;
    this.student.group = this.servUsers.student.group;
  }

  deleteUser(){
    this.servUsers.deleteUserById(this.servUsers.student._id)
      .then(() => this.router.navigateByUrl('/admin/usersList/1'));
    
  }

  ngOnInit(): void { 
    this.servUsers.getStudentFromBackById(history.state.data)
      .then(() => 
        this.onSave()
      )
      .then(() => this.servUsers.getAbsByEmail(this.servUsers.student.email));
    
  }

}

