import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { ActivatedRoute } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { FormatterService } from '../formatter.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  cEventID:number = -1;
  private routeSub: Subscription;
  loggedIn:number = -1;
  faStar = faStar;

  constructor(private eventDB:DALService, public fmtr:FormatterService, private route: ActivatedRoute) {
    this.routeSub = route.params.subscribe(params => {
      this.cEventID = params['id'];
    });
    //this.loggedIn = currentUser;
  }


   currentEvent:Evnt = {} as Evnt;
   
   ngOnInit(): void {
    this.eventDB.GetCertainEvent(this.cEventID).subscribe((results:Evnt)=> {
      this.currentEvent = results;
      this.eventDB.isFavByUser(this.currentEvent.id, this.loggedIn).subscribe((results)=> {
        if(results[0].userId == this.loggedIn){
          this.favUpdate();
        }   
        });
      });
   }
  
  
  favorite(eventID:number, user:number):void{
    this.eventDB.makeFavorite(eventID, user)
    .subscribe(result => {
      if(result.userId === this.loggedIn){
        this.favUpdate();
      }else{
        alert("error!");
      }
    });
  }

  favUpdate(){
    document.getElementById('star')!.style.color = `gold`;
  }



  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
