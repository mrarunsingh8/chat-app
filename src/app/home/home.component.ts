import { Component, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  socket = null;
  url: string = 'http://localhost:3001';

  userList: any = [];
  constructor() {
    this.socket = io(this.url);
    this.socket.emit("getUserList");
  }

  ngOnInit() {
    this.socket.on('listenUserList', (data)=>{
      this.userList = data;
    });
  }

  ngOnDestroy(): void{
    this.socket.disconnect();
  }

  onClickUserOutput(user){
    console.log("OnclickUser");
  }

}
