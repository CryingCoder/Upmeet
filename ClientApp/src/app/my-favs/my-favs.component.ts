import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { Fav } from '../fav';
import { FormatterService } from '../formatter.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-favs',
  templateUrl: './my-favs.component.html',
  styleUrls: ['./my-favs.component.css']
})
export class MyFavsComponent {
  resultList:Evnt[] = [];
  loggedIn:number = -1;
    
  constructor(public fmtr:FormatterService, 
    private userServ:UserService, 
    private eventDB:DALService,
    private router:Router){

  }

  //Fill results list with favorites from user - Find user and favorites to fill list
  ngOnInit(): void {
    
    let allFavorites:Fav[] = [];
    let usersFavorites:Fav[] =[];
    
    //Getting user ID
    if (this.userServ.getData("userID") == ""){
      this.userServ.userChange("1");
    }
    this.loggedIn = parseInt(this.userServ.getData("userID")!); 

    //Getting FavList
    this.eventDB.GetFavEvnts().subscribe((results:Fav[])=> {
      allFavorites = results;
      usersFavorites = allFavorites.filter(allFavorites => allFavorites.userId === this.loggedIn );
      let eventIDS:number[] = [];
      
      usersFavorites.forEach(f =>{ eventIDS.push(f.eventId) })
      console.log(eventIDS);
      
      eventIDS.forEach(e => {
        this.eventDB.GetCertainEvent(e).subscribe((results) => {
          this.resultList.push(results);
        });
      });
    });
  }

  search(searchString:string){
    this.router.navigate([`/search-page/${searchString}`]);
  }

  remvstr:string = "";

  RmvFav(eventID:number,user:number){
    this.eventDB.RmvEvent(eventID, user);
    this.remvstr = `event + ${eventID}`;
    document.getElementById(this.remvstr)?.remove();
  }

  rmvLocal(i:number){
    this.resultList.splice(i, 1);
  }


}

