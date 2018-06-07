import {Component, OnDestroy, OnInit, Renderer, HostListener, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {HomeService} from '../../home.service';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() userListInput: any = [];
  @Output() onOpenChatBox: EventEmitter<any> = new EventEmitter();

  isActive: boolean = false;
  isTyping: boolean = false;

  isUserTyping: any = [];
  constructor(private homeService: HomeService, private renderer: Renderer) {
    
  }

  ngOnChanges(){
    this.userListInput = this.userListInput;
  }

  ngOnInit() {
    const userData = {token: this.homeService.getToken()};
    this.homeService.socket.emit('getUserList', userData);    

    this.homeService.socket.on("listenUserSearch", (data)=>{
      if(this.homeService.getToken() == data.currentUser){
        this.userListInput = data.responce;
      }
    });

    this.homeService.socket.on("isUserTyping", (data)=>{
      if(data.isTyping === true){
        if(this.isUserTyping.indexOf(data.whichUserTyping) < 0){
          this.isUserTyping.push(data.whichUserTyping);
        }
      }else{
        const indx = this.isUserTyping.indexOf(data.whichUserTyping);
        if(indx > -1){
          this.isUserTyping = this.isUserTyping.filter((item)=>{
            return (item != data.whichUserTyping);
          });
        }
      }
    });
  }

  checkIsUserTyping(tokenId){
    return (this.isUserTyping).includes(tokenId);
  }

  ngOnDestroy() {
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
    this.onOpenChatBox.emit(user);
  }

  private getClosest(el, cls):any {
      while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
      return el;
  }

  onSearchInput(event){
    this.homeService.socket.emit("onSearchuser", {terms: event.target.value, token: this.homeService.getToken()});
  }
}
