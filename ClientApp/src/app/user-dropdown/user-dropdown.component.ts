import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent {
  value:string = "1";
  loggedIn:number = -1;
  constructor(public userServ:UserService, private route: ActivatedRoute, private router: Router){
    
  }
  ngOnInit(){
    //see if there is a stored userID, if not, store user as 1
    if (this.userServ.getData("userID") != null){
      this.loggedIn = parseInt(this.userServ.getData("userID")!);
    } else {
      this.userServ.userChange("1");
    }
    // making the dropdown default value what is stored, 
    // if this doesnt end up working just set a p tag to this value lmao
    const select:HTMLSelectElement | null = document.querySelector(".userSelector");
    select!.value = this.loggedIn.toString();
  }
  toSave(id:string){
    var selector:HTMLSelectElement | null = document.getElementById("userSelector") as HTMLSelectElement;
    
    this.value = selector?.value;
    this.userServ.userChange(this.value);

    // refresh the page after????
  }
  



}
