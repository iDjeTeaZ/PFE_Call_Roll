import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { StudentRoutingModule } from './student-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilComponent } from './profil/profil.component';
import { AbscenceComponent } from './abscence/abscence.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 


@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    MenuComponent,
    ProfilComponent,
    AbscenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule,
    NgbModalModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class StudentModule {
}
