import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import {HomeService} from './../../home.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit{
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver, private homeService: HomeService, private router: Router) {}

  disconnect(){
    this.homeService.closeConnection();
  }

  ngOnInit(){
  	this.homeService.socket.on("listenLogOutUser", (data)=>{
  		if(data.token == this.homeService.getToken()){
  			this.homeService.doLogout();
  			this.router.navigateByUrl('login');
  		}
  	});
  }

}
