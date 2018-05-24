import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  inputs: ['socket'],
})
export class AppComponent {
  title = 'app';
  socket: any;
  url: string = 'http://localhost:3001';

  userList: any = [];
  constructor() {
    this.socket = io(this.url);
    //this.socket.emit("getUserList");
  }

  ngOnInit() {
    /*this.socket.on('listenUserList', (data)=>{
      this.userList = data;
    });*/
  }

  ngOnDestroy(): void{
    this.socket.disconnect();
  }
}
