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
  }

  ngOnInit() {
  }

  ngOnDestroy(): void{
  }

  onClickUserOutput(user){
    console.log("OnclickUser");
  }

}
