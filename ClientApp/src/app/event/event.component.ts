import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { ActivatedRoute } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { FormatterService } from '../formatter.service';
import { faStar  } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
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

  constructor(private eventDB:DALService, 
    public fmtr:FormatterService, 
    private route: ActivatedRoute,
    private userServ:UserService) {
    this.routeSub = route.params.subscribe(params => {
      this.cEventID = params['id'];
    });


  }


  currentEvent:Evnt = {} as Evnt;
   
   ngOnInit(): void {

    // userID
    if (this.userServ.getData("userID") == ""){
      this.userServ.userChange("1");
    }
    this.loggedIn = parseInt(this.userServ.getData("userID")!);
    console.log("user id: "+this.loggedIn);

    // get this event
    this.eventDB.GetCertainEvent(this.cEventID).subscribe((results:Evnt)=> {
      this.currentEvent = results;
      // check if event if fav'd by user we got
      this.eventDB.isFavByUser(this.currentEvent.id, this.loggedIn).subscribe((results)=> {
        if(results[0].userId == this.loggedIn){
          this.favUpdate();
        }   
        });
      });
      // these are SUPPOSED to set the header to the picture but it isnt loading until too late like the event fav was 
      let header:HTMLElement  =  document.getElementById(`HSE`)!;
    let dynamicCss:string = `url('/assets/${this.currentEvent.id}.jpg') !important`;
    header.style.backgroundImage = dynamicCss;
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

  map(){
    // 
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
