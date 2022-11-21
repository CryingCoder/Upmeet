import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EventComponent } from './event/event.component';
import { LocationComponent } from './location/location.component';
import { SearchComponent } from './search/search.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormatterService } from './formatter.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    EventComponent,
    LocationComponent,
    SearchComponent,
    SearchPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'location/:state/:city', component: LocationComponent },
    ]),
    FontAwesomeModule
  ],
  providers: [
    FormatterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
