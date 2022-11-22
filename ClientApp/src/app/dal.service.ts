import { Injectable, Inject, ErrorHandler } from '@angular/core';
import { Evnt } from './evnt';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError,  } from 'rxjs';
import { inject } from '@angular/core/testing';
import { Fav } from './fav';

@Injectable({
  providedIn: 'root'
})
export class DALService {
  baseUrl:string = "";
  constructor(private http:HttpClient, @Inject("BASE_URL") private url:string) { 
    this.baseUrl = url;
  }
  // Getting events
  GetEvnts():Observable<Evnt[]>{
    return this.http.get<Evnt[]>(this.baseUrl+"api/Events");
  }

  GetCertainEvent(id:number):Observable<Evnt>{
    return this.http.get<Evnt>(this.baseUrl+`api/Events/${id}`);
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

  //


  // searching events
  search(search:string):Observable<Evnt[]>{
    return this.http.get<Evnt[]>(this.baseUrl+`api/EventSearch/${search}`);
  }
  searchSpec(search:string, type:string){

  }

  //

}
