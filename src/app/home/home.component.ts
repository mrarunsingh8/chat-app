import { Component, OnInit, OnDestroy, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() socket:any;

  userList: any = [];
  constructor() {
    this.socket.emit("getUserList");
  }

  ngOnInit() {
    this.socket.emit("getUserList");
    /*this.socket.on('listenUserList', (data)=>{
      this.userList = data;
    });*/
  }

  ngOnDestroy(): void{
    /*this.socket.disconnect();*/
  }

  onClickUserOutput(user){
    console.log("OnclickUser");
  }

}
