import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  status = "Etudiant"
  firstname = "";
  lastname = "";
  email = "";
  password = "";
  photo = "";
  promotion = "";
  specialty = "";
  group = "";
  classManager = "";
  displayPromotion = true;
  displaySpecialty = true;
  displayGroup = true;
  displayClassManager = false;
  studentPayload: any = {
    firstname: "",
    lastname: "",
    email: "", 
    password: "",
    status: 1,
    photo: "",
    promotion: "",
    specialty: "",
    group: "",
  }
  teacherPayload: any = {
    firstname: "",
    lastname: "",
    email: "", 
    password: "",
    status: 2,
    photo: "",
    classManager: "",
  }
  adminPayload: any = {
    firstname: "",
    lastname: "",
    email: "", 
    password: "",
    status: 2,
    photo: "",
  }

  constructor(public servUsers:UsersService, private router: Router) { }

  onChange() {
    if(this.status == "Etudiant") {
      this.displayPromotion = true;
      this.displaySpecialty = true;
      this.displayGroup = true;
      this.displayClassManager = false;
    } else if(this.status == "Professeur") {
      this.displayPromotion = false;
      this.displaySpecialty = false;
      this.displayGroup = false;
      this.displayClassManager = true;
    } else if(this.status == "Administrateur") {
      this.displayPromotion = false;
      this.displaySpecialty = false;
      this.displayGroup = false;
      this.displayClassManager = false;
    }
  }

  sendForm(f: NgForm){
    if(this.status == "Etudiant") {
      this.studentPayload = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email, 
        password: Md5.hashStr(this.password),
        status: 1,
        photo: this.photo,
        promotion: this.promotion,
        specialty: this.specialty,
        group: this.group,
      }
      this.servUsers.putUser(this.studentPayload)
        .then(id => this.router.navigate(['/admin/student'], {state: {data: id}}))
    } else if(this.status == "Professeur") {
      this.teacherPayload = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email, 
        password: Md5.hashStr(this.password),
        status: 2,
        photo: this.photo,
        classManager: this.classManager,
      }
      this.servUsers.putUser(this.teacherPayload)
      .then(id => this.router.navigate(['/admin/teacher'], {state: {data: id}}))
    } else if(this.status == "Administrateur") {
      this.adminPayload = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email, 
        password: Md5.hashStr(this.password),
        status: 3,
        photo: this.photo,
        classManager: this.classManager,
      }
      this.servUsers.putUser(this.adminPayload)
        .then(id => this.router.navigate(['/admin/admin'], {state: {data: id}}))
    }
  }
  ngOnInit(): void {
  }

}
