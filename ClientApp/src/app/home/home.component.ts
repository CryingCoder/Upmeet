import { Component, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from "@angular/common";
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { FormatterService } from '../formatter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  workingList:Evnt[] =[];

  constructor(private eventDB:DALService, public fmtr:FormatterService) {
    this.eventDB.GetEvnts().subscribe((results:Evnt[])=> {
      this.workingList = results;
      console.log(this.workingList);
    });
   }

   
  
  


}
