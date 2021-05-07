import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilComponent } from './profil/profil.component';




@NgModule({
  declarations: [    
    HomeComponent,
    CalendarComponent,
    MenuComponent,
    ProfilComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule,
    NgbModalModule,
    FormsModule
  ]
})
export class TeacherModule { }
