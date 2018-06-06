import {Component, AfterContentChecked} from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked{
  title = 'app';
  constructor(private homeService: HomeService) {
  }

  ngAfterContentChecked(){
  	const self = this;
  	this.homeService.socket.on("connect", function(){
  		if(self.homeService.isLogin()){
  			console.log("Refereshed");
  			let data = {token: self.homeService.getToken()};
  			self.homeService.socket.emit("doConnect", data);
  		}
  	});
  }

}