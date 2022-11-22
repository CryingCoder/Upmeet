import { Component, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from "@angular/common";
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { FormatterService } from '../formatter.service';

import { faSpaghettiMonsterFlying  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  workingList:Evnt[] =[];
  faSpaghettiMonsterFlying = faSpaghettiMonsterFlying;
  constructor(private eventDB:DALService, public fmtr:FormatterService) {
    this.eventDB.GetEvnts().subscribe((results:Evnt[])=> {
      this.workingList = results;
    });
   }

   
  
  


}
