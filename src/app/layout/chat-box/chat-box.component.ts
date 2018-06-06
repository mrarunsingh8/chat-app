import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeService} from '../../home.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('chatToolbar', {read: ElementRef}) chatToolbar: ElementRef;
  @ViewChild('lastElm') lastElm: ElementRef;
  textValue: string = '';
  isSend: boolean = false;
  chatData:any = [];

  chatRoomId: number = 0;
  otherUserId: number = 0;

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.socket.on("listenOpenChatBox", (data)=>{
      if(data.token === this.homeService.getToken()){
        this.chatRoomId = data.chatRoomId;
        this.otherUserId = data.otherUser;
        this.loadChatRoom();
      }
    });
  }

  loadChatRoom(){
    const data = {chatRoomId: this.chatRoomId, currentUser: this.homeService.getToken(), chatRoom: this.chatRoomId, otherUser: this.otherUserId};
    this.homeService.socket.emit("loadChatRoom", data);
  }


  ngAfterViewInit() {
    this.scrollToElement();

    this.homeService.socket.on("onChatUpdate", (data)=>{
      if(data.chatRoomId === this.chatRoomId){
        if(data.token !== this.homeService.getToken()){
          data.chatData = data.chatData.filter((res)=>{
            res.type = (res.type !== 'snd')?'snd':'rcv';
            return res;
          });
        }
        this.chatData = data.chatData;
        this.scrollToElement();
      }
    });
  }

  changeTextArea(evt){
    this.textValue = evt.target.value;
  }

  onClickSend(textArea){
    let data = { chatRoomId: this.chatRoomId, currentUser: this.homeService.getToken(), otherUser: this.otherUserId, chatText: textArea.value, dateTime: this.curDateTime(new Date()), type: 'rcv'};
    this.homeService.socket.emit("sendChat", data);
    this.onTyping(false);
    textArea.value = '';
  }

  curDateTime(date){
    date = (typeof date == 'undefined')?new Date():date;
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  }

  formatAMPM(): string {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? parseInt('0' + minutes) : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  public scrollToElement() {
    var self = this;
    setTimeout(function () {
      self.chatToolbar.nativeElement.scrollTop=self.chatToolbar.nativeElement.scrollHeight;
    }, 1000);
  }

  onTyping(isTyping: boolean){
    let data = {showTypingForUser: this.otherUserId, whichUserTyping: this.homeService.getToken(), chatRoomId: this.chatRoomId, isTyping: isTyping};
    this.homeService.socket.emit("onUserTyping", data);
  }

}
