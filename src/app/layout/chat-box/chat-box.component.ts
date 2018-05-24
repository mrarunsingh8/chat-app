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
  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.socket.on("onChatUpdate", (data)=>{
      if(this.isSend){
        data.type = 'snd';
      }
      this.chatData.push(data);
      this.isSend = false;
      this.scrollToElement();
    });
  }

  chatData:any = [
    /*{time: '1:30am', content: 'Chat 1', type: 'rcv'},
    {time: '1:30am', content: 'Hello', type: 'rcv'},
    {time: '1:30am', content: 'Hi', type: 'snd'},
    {time: '1:30am', content: 'Hey Whats upp', type: 'rcv'},
    {time: '1:30am', content: 'I`m fine and you' , type: 'snd'},
    {time: '1:30am', content: 'I`m also fine.', type: 'rcv'},
    {time: '1:30am', content: 'What are you doing now', type: 'snd'},
    {time: '1:30am', content: 'Nothing More special', type: 'rcv'},
    {time: '1:30am', content: 'I`m fine and you' , type: 'snd'},
    {time: '1:30am', content: 'I`m also fine.', type: 'rcv'},
    {time: '1:30am', content: 'What are you doing now', type: 'snd'},
    {time: '1:30am', content: 'Nothing More special', type: 'rcv'},*/
  ];

  ngAfterViewInit() {
    this.scrollToElement();
  }

  changeTextArea(evt){
    this.textValue = evt.target.value;
  }

  onClickSend(textArea){
    let data = {content: textArea.value, time: this.formatAMPM(), type: 'rcv'};
    this.isSend = true;
    this.homeService.socket.emit("sendChat", data);
    textArea.value = '';
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

}
