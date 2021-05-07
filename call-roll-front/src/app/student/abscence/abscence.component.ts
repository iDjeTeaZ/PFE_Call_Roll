import { Component, OnInit } from '@angular/core';
import { ConnectedUserService } from '../../services/connectedUser/connected-user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence } from 'src/app/model/event';


@Component({
  selector: 'app-abscence',
  templateUrl: './abscence.component.html',
  styleUrls: ['./abscence.component.css']
})
export class AbscenceComponent implements OnInit {

  constructor(private http:HttpClient, public connectedUserServ:ConnectedUserService) { }

  absences : Absence[] = [];

  ngOnInit(): void {

  	this.getEventById();
  }


  getEventById(){

    var auth = this.connectedUserServ.getToken();

    this.http.get<any>('http://0.0.0.0:5001/AbsenceByEmail/' + this.connectedUserServ.getEmail(), {headers: {Authorization: auth}})
      .subscribe(
        data => {

          for(let i = 0 ; i < data.length ; i++){

          	let tmpAbsence  = {
          		nom : data[i].name,
          		start : new Date(data[i].classes.rooms.startDate.$date),
          		end : new Date(data[i].classes.rooms.endDate.$date)
          	}

          	this.absences.push(tmpAbsence);
          }



        },
        error => {
          console.log(error);

        }
      )

  }

}
