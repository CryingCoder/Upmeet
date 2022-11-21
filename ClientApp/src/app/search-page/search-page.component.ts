import { Component, OnInit } from '@angular/core';
import { DALService } from '../dal.service';
import { Evnt } from '../evnt';
import { FormatterService } from '../formatter.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(public fmtr:FormatterService, private eventDB:DALService) { }

  resultList:Evnt[] = [];
  ngOnInit(): void {
    

  }

}
