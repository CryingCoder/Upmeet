import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { FormatterService } from '../formatter.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  loggedIn:number = -1;
    
  searchString:string = "";

  searchQuery:string = "";
  private routeSub: Subscription;


  constructor(private router: Router,
    private userServ:UserService, 
    private fmtr:FormatterService,
    private eventDB:DALService,
    private route: ActivatedRoute) {
      this.routeSub = route.params.subscribe(params => {
        this.searchQuery = params['id'];
      });
     }

  ngOnInit(): void {
    if (this.userServ.getData("userID") == ""){
      this.userServ.userChange("1");
    }
    this.loggedIn = parseInt(this.userServ.getData("userID")!); 

    this.eventDB.SearchForEvent(this.searchQuery).subscribe((results:Evnt[])=> {

    });

  }

  search(searchString:string){
    this.router.navigate([`/search-page/${searchString}`]);
  }
}
