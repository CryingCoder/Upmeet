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



  constructor(private router: Router) {
      
     }

  ngOnInit(): void {
    

  }

  search(searchString:string){
    this.router.navigate([`/search-page/${searchString}`]);
    setTimeout(()=>{
      window.location.reload();
    }, 100);

  }
}
