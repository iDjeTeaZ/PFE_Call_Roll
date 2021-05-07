import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { ConnectedUserService } from '../connectedUser/connected-user.service';




const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  constructor(private http:HttpClient, public connectedUserServ:ConnectedUserService) { }


    event : CalendarEvent[] = [];
    eventsWithStudent : any[] = [];

  getEventById(){

    var auth = this.connectedUserServ.getToken();
    console.log("email : " + this.connectedUserServ.getEmail);
    this.event = [];

    return new Promise<CalendarEvent<any>[]>((resolve, reject) => {

    this.http.get<any>('http://0.0.0.0:5001/allCourses/' + this.connectedUserServ.getEmail(), {headers: {Authorization: auth}})
      .subscribe(
        data => {


           for (let i=0; i< data.length ; i++){
            console.log("prof : " + data[i].classes.teacher);
            console.log("start : " + data[i].classes.rooms.startDate.$date);
            console.log("name : " + data[i].name);  
            this.event.push({
              start: this.addHours(new Date(data[i].classes.rooms.startDate.$date), -2),
              end: this.addHours(new Date(data[i].classes.rooms.endDate.$date), -2),
              title: data[i].name + "-" + data[i].classes.teacher ,
              color: this.getColorFromName(data[i].name)
              });

          } 

          for(let i = 0; i < this.event.length; i++){
            console.log(this.event[i].start + "  " + this.event[i].end + "  " + this.event[i].title );
            console.log(new Date(this.event[i].start).toString());

          }
          resolve(this.event);

        },
        error => {
          console.log(error);
          reject(this.event);

        }
      )

    });
  }

  getEventTeacherById(){

    var auth = this.connectedUserServ.getToken();
    this.event = [];
    this.eventsWithStudent = [];

    return new Promise<CalendarEvent<any>[]>((resolve, reject) => {

    this.http.get<any>('http://0.0.0.0:5001/GetListofcoursesByteacher/' + this.connectedUserServ.getEmail(), {headers: {Authorization: auth}})
      .subscribe(
        data => {

          console.log(data);




           for (let i=0; i< data.length ; i++){
            console.log("prof : " + data[i].classes.teacher);
            console.log("start : " + data[i].classes.rooms.startDate.$date);
            console.log("name : " + data[i].name);  
            this.event.push({
              start: this.addHours(new Date(data[i].classes.rooms.startDate.$date), -2),
              end: this.addHours(new Date(data[i].classes.rooms.endDate.$date), -2),
              title: data[i].name + "-" + data[i].classes.teacher ,
              color: this.getColorFromName(data[i].name)
              });

            var  EventStudentTmp = {
                nom: data[i].name + "-" + data[i].classes.teacher,
                start : this.addHours(new Date(data[i].classes.rooms.startDate.$date), -2),
                end: this.addHours(new Date(data[i].classes.rooms.endDate.$date), -2),
                students: data[i].classes.rooms.students
              };
            this.eventsWithStudent.push(EventStudentTmp);
          } 

          for(let i = 0; i < this.event.length; i++){
            console.log(this.event[i].start + "  " + this.event[i].end + "  " + this.event[i].title );
            console.log(new Date(this.event[i].start).toString());

          }
          resolve(this.event);

        },
        error => {
          console.log(error);
          reject(this.event);

        }
      )

      });


  }


  getCalendarfromTocken(){
  	  this.http.post<any>('http://0.0.0.0:5001/login', this.connectedUserServ.getToken())
      .subscribe(
        data => {
          console.log(data);
          this.connectedUserServ.setConnection(true);
          this.connectedUserServ.setStatus(data.status);
          this.connectedUserServ.setToken(data.token);
        },
        error => {
          console.log(error);
          this.connectedUserServ.setConnection(false);
          this.connectedUserServ.setStatus(0);
          this.connectedUserServ.setToken("");
        }
      )
  }


  getStudentsFromEvent(start: Date, end: any, nom : string){

      for (let i = 0; i < this.eventsWithStudent.length ; i++){

          if (this.eventsWithStudent[i].nom == nom && this.eventsWithStudent[i].start.getTime() == start.getTime()  && this.eventsWithStudent[i].end.getTime() == end.getTime()  ){
              return this.eventsWithStudent[i].students;
          }
      }

      var auth = this.connectedUserServ.getToken();


     /* this.http.get<any>('http://0.0.0.0:5001/GetListofStudentByTeacherCourse/' + nom.split("-")[1] + "/" + nom.split("-")[0] + "/" + this.makeDateFormatBDD(start), {headers: {Authorization: auth}})
      .subscribe(
        data => {
          console.log("passé");
          console.log(data);


        },
        error => {
          console.log(error);

        }
      ) */

      return [];
  }


  getColorFromName(name : string){
    if (name == "Open Cloud" || name == "Cloud Data"){
      return colors.red
    }

    if (name == "Cloud Front"){
      return colors.blue
    }

    else{
      return colors.yellow
    }
  }

  setPresent(name : string, teacher : string, startDate : Date){

    var auth = this.connectedUserServ.getToken();
      const payload = {
        name: name,
        teacher: teacher,
        startDate: this.makeDateFormatBDD(startDate)
      };

      let res = true;

      console.log(payload);

      this.http.patch('http://0.0.0.0:5001/bePresent/' + this.connectedUserServ.getEmail(), payload, {headers: {Authorization: auth}})
      .subscribe(() => {

      },
      (error) => {
        console.log('Erreur ! : ' + error);
        res = false;
      })

      return res;

  }


  makeDateFormatBDD(date : Date){
    let acc = "";

    acc += date.getFullYear();
    acc += "-";

    if (date.getMonth() < 9){
      acc += "0" + (date.getMonth() + 1);
    }
    else{
      acc += (date.getMonth() + 1);
    }
    acc += "-";

    if (date.getDate() < 10){
      acc += "0" + date.getDate();
    }
    else{
      acc += date.getDate();
    }

    acc += "T";

    if (date.getHours() < 10){
      acc += "0" + date.getHours();
    }
    else{
      acc += date.getHours();
    }

    acc += ":";

        if (date.getMinutes() < 10){
      acc += "0" + date.getMinutes();
    }
    else{
      acc += date.getMinutes();
    }

    acc += ":";

    if (date.getSeconds() < 10){
      acc += "0" + date.getSeconds();
    }
    else{
      acc += date.getSeconds();
    }

    acc += ".000000Z";

    console.log(typeof(acc));

    return acc;
  }

  addHours(date : Date, h : number) {
  let res = new Date (date.getTime() + (h*60*60*1000));
  return res;
}

}
