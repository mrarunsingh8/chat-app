import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit, OnChanges {
  @Input('userListInput') userListInput:any;
  @Output() onClickUserOutput = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(){
  	console.log("In the On Changes", this.userListInput);
  }

  onClickUser(event){
  	this.onClickUserOutput.emit(event);
  	console.log("Emmited");
  }



}
