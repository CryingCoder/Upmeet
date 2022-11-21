import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  currentUser:number = -1;
  constructor(private user: UserService) {
    this.currentUser = parseInt(user.getData("user")!);
  }
}
