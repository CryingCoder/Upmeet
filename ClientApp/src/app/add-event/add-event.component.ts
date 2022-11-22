import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { FormatterService } from '../formatter.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  name:string="";
  description:string="";
  address:string="";
  city:string="";
  state:string="";
  ticketPrice:number=0;
  type:string="";
  hostedBy:string="";
  dateTime:string="";
  availableTickets:number=0;
  constructor(private eventDB:DALService){}
  AddEvent(name:string,description:string,address:string,city:string,state:string,ticketPrice:number,type:string,hostedBy:string,dateTime:string,availableTickets:number):void{
    //let dateTime:string = `${date}T${time}:00`
    this.eventDB.AddEvent(name,description,address,city,state,ticketPrice,type,hostedBy,dateTime,availableTickets);
  }
}
