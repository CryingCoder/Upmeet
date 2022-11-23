import { Component, OnInit } from '@angular/core';
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { FormatterService } from '../formatter.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  loggedIn:number = -1;
    
  searchString:string = "";

  searchQuery:string = "";
  private routeSub: Subscription;

  constructor(private router: Router,
    private userServ:UserService, 
    public fmtr:FormatterService,
    private eventDB:DALService,
    private route: ActivatedRoute) {
      this.routeSub = route.params.subscribe(params => {
        this.searchQuery = params['searchString'];
        console.log(params['searchString']);
      });
    }
  resultList:Evnt[] = [];

  ngOnInit(): void {
    if (this.userServ.getData("userID") == ""){
      this.userServ.userChange("1");
    }
    this.loggedIn = parseInt(this.userServ.getData("userID")!); 
    this.eventDB.SearchForEvent(this.searchQuery).subscribe((results:Evnt[])=> {
      this.resultList = results;
    });

  }

  search(searchString:string){
    this.router.navigate([`/search-page/${searchString}`]);
  window.location.reload;
  }
  

}
