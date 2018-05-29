import {Component, OnDestroy, OnInit, Renderer, HostListener} from '@angular/core';
import {HomeService} from '../../home.service';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit, OnDestroy {
  userListInput: any;

  isActive: boolean = false;

  constructor(private homeService: HomeService, private renderer: Renderer) {
    
  }

  ngOnInit() {
    this.homeService.socket.emit('getUserList');
    this.homeService.socket.on('listenUserList', (data) => {
      this.userListInput = data;
    });

    this.homeService.socket.on("listenUserSearch", (data)=>{
      if(this.homeService.getToken() == data.currentUser){
        this.userListInput = data.responce;
      }
    });
  }

  ngOnDestroy() {
    this.homeService.socket.emit('getUserList');
    this.homeService.socket.on('listenUserList', (data) => {
      this.userListInput = data;
    });
  }

  openUserChat(event, user) {
    let userlistArr = this.getClosest(event.target, 'user-list-container').querySelectorAll('mat-list-item');
    for(var i=0;i<userlistArr.length; i++){
      userlistArr[i].classList.remove("active");
    }
    this.getClosest(event.target, "user-list-item").classList.add('active');

    let data = {currentUser: this.homeService.getToken(), otherUser: user.username};
    this.homeService.socket.emit("openUserChatRoom", data);
  }

  private getClosest(el, cls):any {
      while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
      return el;
  }

  onSearchInput(event){
    this.homeService.socket.emit("onSearchuser", {terms: event.target.value, token: this.homeService.getToken()});
  }


}
