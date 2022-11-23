import { Injectable, Inject, ErrorHandler } from '@angular/core';
import { Evnt } from './evnt';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError,  } from 'rxjs';
import { inject } from '@angular/core/testing';
import { Fav } from './fav';
import { evntDTO } from './evntDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DALService {
  baseUrl:string = "";
  constructor(private http:HttpClient, 
    @Inject("BASE_URL") private url:string,
    public router:Router) { 
    this.baseUrl = url;
  }
  // Getting events
  GetEvnts():Observable<Evnt[]>{
    return this.http.get<Evnt[]>(this.baseUrl+"api/Events");
  }

  GetCertainEvent(id:number):Observable<Evnt>{
    return this.http.get<Evnt>(this.baseUrl+`api/Events/${id}`);
  }

  SearchForEvent(searchQuery:string):Observable<Evnt[]>{
    console.log(searchQuery);
    return this.http.get<Evnt[]>(this.baseUrl+`api/Events/search/${searchQuery}`);
  }

  //favoriting events
  isFavByUser(id:number, user:number):Observable<Fav[]>{
    let output:boolean = false;
    return this.http.get<Fav[]>(this.baseUrl+`api/FavEvents/${id}/${user}`)
    }
    
  makeFavorite(id:number, user:number):Observable<Fav>{
    let newFav:Fav = {eventId: id, userId: user};
    // see if its fav'd aleady
    let hasFavorited:boolean = false;
    return this.http.post<Fav>(this.baseUrl+`api/FavEvents`, newFav);
  }

  //Getting Favorited Events
  GetFavEvnts():Observable<Fav[]>{
    return this.http.get<Fav[]>(this.baseUrl+"api/FavEvents");
  }

  // searching events
  search(search:string):Observable<Evnt[]>{
    return this.http.get<Evnt[]>(this.baseUrl+`api/EventSearch/${search}`);
  }
  searchSpec(search:string, type:string){

  }

  //adding events
  AddEvent(name:string,description:string,address:string,city:string,state:string,ticketPrice:number,type:string,hostedBy:string,dateTime:string,availableTickets:number):void{
    console.log(name);
    let newEvent:evntDTO = {name:name,description:description,address:address,city:city,state:state,
      ticketPrice:ticketPrice,type:type,hostedBy:hostedBy,dateTime:dateTime,availableTickets:availableTickets};
      this.http.post<evntDTO>(this.baseUrl + "api/Events", newEvent).subscribe(data => {
      });
      console.log("Yo true");
      this.router.navigate(['/']);
  }

  //Removing bitches
  RmvEvent(eventId:number,userId:number):void{
    let rmvEvent:Fav = {eventId:eventId,userId:userId}
    this.http.delete<Fav>(this.baseUrl + `api/FavEvents/${eventId}/${userId}`).subscribe(data => {
    });
  }
  
}
