import {Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userListInput: any =[];
  chatBoxUserDetail: any = {};
  
  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    const self = this;
    this.homeService.socket.on('listenUserList', (data) => {
      this.userListInput = data;
      this.userListInput.map((user)=>{
        console.log(user);
      });
    });
  }

  ngOnDestroy(): void {
    this.homeService.socket.on("close", {currentUser: this.homeService.getToken()});
  }

  onClickUserOutput(user) {

  }

  onOpenChatBox(user){
    this.chatBoxUserDetail = user;
  }
}