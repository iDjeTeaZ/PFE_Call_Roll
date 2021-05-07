import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AbscenceComponent } from './abscence/abscence.component';
import { ProfilComponent } from './profil/profil.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes = [
    {path: '', component: HomeComponent, children:[
    {path:'abscence', component: AbscenceComponent},
    {path:'profil', component: ProfilComponent},
    {path:'calendar', component: CalendarComponent},
    {path:'', component: CalendarComponent},

    ]}
]

@NgModule({  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class StudentRoutingModule { }
