import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  socket: any = null;
  url: string = 'http://192.168.3.20:3001';

  constructor() {
    this.socket = io(this.url);
  }

  private setToken(token: string){
  	localStorage.setItem('token', token);
  }

  closeConnection(){
    this.socket.emit("logoutUser", {token: this.getToken()});
  }

  getToken(): string{
    if(this.isLogin()){
      return this.getFromLocalStorage('token');
    }
    return null;
  }

  doLogin(token: string){
  	localStorage.setItem('isLogin', 'true');
  	this.setToken(token);
  }

  doLogout(){
    localStorage.removeItem('isLogin');
    this.setToken(null);
    localStorage.removeItem("token");
  }

  private getFromLocalStorage(key: string){
  	return localStorage.getItem(key);
  }

  isLogin(){
  	if(typeof this.getFromLocalStorage('token') == 'undefined' || this.getFromLocalStorage('token') == 'null'){
  		return false;
  	}
  	if(this.getFromLocalStorage('isLogin') != 'true'){
  		return false;
  	}
  	return true;
  }
}
