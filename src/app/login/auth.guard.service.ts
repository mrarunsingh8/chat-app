import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(){
  	if(!this.isAuthenticate()){
  		this.router.navigateByUrl('login');
  		return false;
  	}
  	return true;
  }

  private getFromLocalStorage(key: string){
  	return localStorage.getItem(key);
  }

  isLogin(){
  	if(typeof this.getFromLocalStorage('token') == 'undefined' || this.getFromLocalStorage('token') == 'null' || this.getFromLocalStorage('token') == ''){
  		return false;
  	}
  	if(this.getFromLocalStorage('isLogin') != 'true'){
  		return false;
  	}
  	return true;
  }

  private isAuthenticate(){
  	return this.isLogin();
  }
}
