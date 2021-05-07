import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentI } from 'src/app/model/student';
import { UserService } from '../service/user.service';
import { ConnectedUserService } from 'src/app/services/connectedUser/connected-user.service';
import { Md5 } from 'ts-md5/dist/md5';




@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  student: StudentI = new Student();
  password : string = "";
  
  constructor(public servUsers:UserService,private router:Router, private activatedRoute:ActivatedRoute, public connectedUserServ:ConnectedUserService) { 
  }

  sendForm(f:NgForm){
    this.servUsers.patchPassword(this.connectedUserServ.getId(), Md5.hashStr(this.password));
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

  ngOnInit(): void { 
    console.log("id : " + this.connectedUserServ.getId());
    this.servUsers.getStudentFromBackById(this.connectedUserServ.getId())
      .then(() => this.onSave());
  }

}
