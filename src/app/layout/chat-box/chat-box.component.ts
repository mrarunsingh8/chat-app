import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('chatToolbar', {read: ElementRef}) chatToolbar: ElementRef;
  @ViewChild('lastElm') lastElm: ElementRef;
  url: any = 'http://localhost:3001/';
  socket: any;
  constructor() {}

  ngOnInit() {
    this.socket = io(this.url);
  }

  ngOnDestroy(): void{
    this.socket.disconnect();
  }

  ngAfterViewInit() {
    this.scrollToElement();
  }


  public scrollToElement() {
    console.log('Scrolled', this.chatToolbar);
    this.chatToolbar.nativeElement.scrollTo(0, this.lastElm.nativeElement.offsetTop, 500);
  }

}
