import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor() { }
    
	public saveData(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	public getData(key: string) {
		return localStorage.getItem(key);
	}

	public removeData(key: string) {
		localStorage.removeItem(key);
	}

	public clearData() {
		localStorage.clear();
	}
	userChange(id:string){
		console.log("trying to save id: "+id)
		this.saveData("userID", `${id}`);
	  }
}
