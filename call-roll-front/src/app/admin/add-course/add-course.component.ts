import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  name = "";
  teacher = "";
  promotion = "CPI1";
  displayCPI = true;
  displayING = false;
  displayING3 = false;
  specialty = "1";
  group = "A";
  date = new FormControl(new Date());
  hour = "08"
  minute = "00";
  hourDuration = "00";
  minuteDuration = "00";
  courseWithGroupPayload: any = {
    name: "",
    teacher: "",
    promotion: "", 
    specialty: "",
    group: "",
    startDate: "",
    endDate: "",
  }
  courseWithoutGroupPayload: any = {
    name: "",
    teacher: "",
    promotion: "", 
    specialty: "",
    startDate: "",
    endDate: "",
  }

  constructor(public servUsers:UsersService) { }

  onChange() {
    if(this.promotion == "CPI1" || this.promotion == "CPI2" ) {
      this.displayCPI = true;
      this.displayING = false;
      this.displayING3 = false;
      this.specialty = "1";
    } else if(this.promotion == "ING1" || this.promotion == "ING2" ) {
      this.displayCPI = false;
      this.displayING = true;
      this.displayING3 = false;
      this.specialty = "GI";
    } else if(this.promotion == "ING3") {
      this.displayCPI = false;
      this.displayING = false;
      this.displayING3 = true;
      this.specialty = "ICC";
    }
  }

  sendForm(f: NgForm){
    var startDate = this.date.value.toISOString().substr(0,11) + this.hour + ":" + this.minute + ":00.000000Z";
    var resHour = parseInt(this.hour) + parseInt(this.hourDuration);
    var resMinute = (parseInt(this.minute) + parseInt(this.minuteDuration)) % 60;
    var endDate = this.date.value.toISOString().substr(0,11);
    if (resHour < 10) {
      endDate += "0" 
    }
    endDate += resHour + ":";
    if (resMinute < 10) {
      endDate += "0" 
    }
    endDate += resMinute + ":00.000000Z";
    if(this.promotion == "ING3") {
      this.courseWithoutGroupPayload = {
        name: this.name,
        teacher: this.teacher,
        promotion: this.promotion, 
        specialty: this.specialty,
        startDate: startDate,
        endDate: endDate,
      }
      this.servUsers.putCourse(this.courseWithoutGroupPayload)
    } else {
      this.courseWithGroupPayload = {
        name: this.name,
        teacher: this.teacher,
        promotion: this.promotion, 
        specialty: this.specialty,
        group: this.group,
        startDate: startDate,
        endDate: endDate,
      }
      this.servUsers.putCourse(this.courseWithGroupPayload)
    }
  }
  ngOnInit(): void {
  }

}
