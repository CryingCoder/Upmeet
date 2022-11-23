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
  isFavorited = false;

  constructor(private eventDB:DALService, 
    public fmtr:FormatterService, 
    private route: ActivatedRoute,
    private userServ:UserService) {
    this.routeSub = route.params.subscribe(params => {
      this.cEventID = params['id'];
    });



  }


  currentEvent:Evnt = {} as Evnt;
   
  dynamicCss:string = `url('/assets/${this.currentEvent.id}.jpg') !important`;

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
      this.isFavorited = true;
    }   
    });
  });
  // these are SUPPOSED to set the header to the picture but it isnt loading until too late like the event fav was 
  let header:HTMLElement  =  document.getElementById(`HSE`)!;

 header.style.backgroundImage = this.dynamicCss;

    
   }
  

  favorite(eventID:number, user:number):void{
    console.log("hey");
    if (this.isFavorited === false) {      
      this.eventDB.makeFavorite(eventID, user)
      .subscribe(result => {
        if(result.userId === this.loggedIn){
        this.favUpdate();
        this.isFavorited = true;
      }else{
        alert("error!");
      }
    });
    }
    else
    {
      console.log("Yo");
      this.isFavorited = false;
      this.eventDB.RmvEvent(eventID, user);
      document.getElementById('star')!.style.color = `black`;
    }
    
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
