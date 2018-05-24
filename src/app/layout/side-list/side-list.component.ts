import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from '../../home.service';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit, OnDestroy {
  userListInput: any;

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.socket.emit('getUserList');
    this.homeService.socket.on('listenUserList', (data) => {
      this.userListInput = data;
    });
  }

  ngOnDestroy() {
    this.homeService.socket.emit('getUserList');
    this.homeService.socket.on('listenUserList', (data) => {
      this.userListInput = data;
    });
  }

  clickOnUser(user) {
    console.log('Emmited');
  }


}
