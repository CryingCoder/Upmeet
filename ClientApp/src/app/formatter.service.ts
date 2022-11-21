import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor( @Inject(LOCALE_ID) public locale: string) { }

  dateFormatter(myDate:string):string{
    return formatDate(myDate, "MM/dd/YYYY", this.locale);
  }
  
  timeFormatter(myDate:string):string{
    return formatDate(myDate, "hh:mm", this.locale);
  }
}
