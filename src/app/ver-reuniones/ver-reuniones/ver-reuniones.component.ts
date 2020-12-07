import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular';
import { createEventId } from 'src/app/event-utils';
import {  EventInput } from '@fullcalendar/core';
import { ReunionDto } from 'src/app/common/reunion.dto';
import { ReunionService } from 'src/app/services/reunion.service';

@Component({
  selector: 'app-ver-reuniones',
  templateUrl: './ver-reuniones.component.html',
  styleUrls: ['./ver-reuniones.component.css']
})
export class VerReunionesComponent implements OnInit {
  deleteboolean: boolean = false;

  constructor(
    private reunionService: ReunionService,
  ) { }

  reuniones: ReunionDto[];
  nombreUsuario = localStorage.getItem("name");
  loading=false;
  eventGuid = 0;
  eventosReuniones: EventInput[] = [];
  TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
  calendarOptions: CalendarOptions
  currentEvents: EventApi[]
  calendarVisible: boolean;

  ngOnInit(): void {

    this.reunionService
     .getByAsistentes(localStorage.getItem("name"))
     .subscribe({
      next: (reunionesReceived: ReunionDto[]) => {
        this.reuniones = reunionesReceived;
        console.log(this.reuniones);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => (this.updateCalendar()),
    });

    
  }
  

  updateCalendar(): void {
    this.reuniones.forEach(reunion => {
      console.log(reunion.titulo);
      let evento: EventInput = 
        {
          id: createEventId(),
          title: reunion.titulo,
          start: new Date(reunion.mes+"/"+reunion.dia+"/"+reunion.ano+" "+reunion.hora),
          end: new Date(reunion.mes+"/"+reunion.dia+"/"+reunion.ano+" "+reunion.hora),
        }
      this.eventosReuniones.push(evento);
      console.log(this.eventosReuniones);
    });
    this.calendarVisible = true;
    this.calendarOptions= {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      buttonText:{
        'today': 'Hoy',
        'dayGridMonth': 'Mes',
        'timeGridWeek': 'Semana'
      },
      locale: 'es',
      initialView: 'dayGridMonth',
      initialEvents: this.eventosReuniones, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      
      */
    };
    this.currentEvents = [];
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    //Metodo que se ejecuta al hacer click en un dia en el calendario
  }





  handleEventClick(clickInfo: EventClickArg) {
    //Implementar si queremos que haga algo al hacer click en la reunion en el calendario.    
    

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  onClickMe() {
    
    if(this.deleteboolean==false){
      this.deleteboolean = true
      alert("Haz click en alguna reunion del calendario para borrarla")
    }else{
      this.deleteboolean = false
      alert("Borrado en click desactivado")
    }

    
  }

}
