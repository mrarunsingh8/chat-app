import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  

  @ViewChild('chatToolbar', {read: ElementRef}) chatToolbar: ElementRef;
  @ViewChild('lastElm') lastElm: ElementRef;
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollToElement();

  }


  public scrollToElement() {
    console.log('Scrolled', this.chatToolbar);
    this.chatToolbar.nativeElement.scrollTo(0, this.lastElm.nativeElement.offsetTop, 500);
  }

}
