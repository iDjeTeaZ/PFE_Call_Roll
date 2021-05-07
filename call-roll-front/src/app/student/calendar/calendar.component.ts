import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
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
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import { CalendarService } from '../../services/calendar/calendar.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

 closeResult = '';
 isActually = false;
 call_check_progress = 0;

 selectedEvent: CalendarEvent = {
      start: new Date(),
      end: addDays(new Date(), 1),
      title: 'Now'
 };


  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();


  refresh: Subject<any> = new Subject();

  events :CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modalService: NgbModal, private calendarService : CalendarService) {
  }

    ngOnInit(): void {  
      this.calendarService.getEventById().then((eventsres) => this.events = eventsres );
    }



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    /*this.handleEvent('Dropped or resized', event);*/
  }



  eventClick(event : CalendarEvent, content : any){

     this.call_check_progress = 0;

        let now = new Date();

        this.isActually = (now.getDate() == event.start.getDate() && now.getFullYear() == event.start.getFullYear() && now.getMonth() == event.start.getMonth() && now.getHours() == event.start.getHours() && now.getMinutes() - event.start.getMinutes() >= 0 && now.getMinutes() - event.start.getMinutes() <= 10 );
        //this.isActually = true; 
        this.selectedEvent = event;

        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  Call_roll(){

     this.call_check_progress = 1;
     
     this.sleep(1000).then(() => {

     if( this.calendarService.setPresent(this.selectedEvent.title.split("-")[0], this.selectedEvent.title.split("-")[1], this.selectedEvent.start )){
      this.call_check_progress = 2;

     }
     else{
      this.call_check_progress = 3;

     }
   }
   );
  }

  closeModal(){
     this.modalService.dismissAll();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

sleep (time : number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
