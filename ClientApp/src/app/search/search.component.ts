import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString:string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(searchString:string){
    this.router.navigate([`/search-page/${searchString}`]);
  }
}
