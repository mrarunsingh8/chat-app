import {Component, OnDestroy, OnInit, Renderer } from '@angular/core';
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
  }

  ngOnDestroy() {
    this.homeService.socket.emit('getUserList');
    this.homeService.socket.on('listenUserList', (data) => {
      this.userListInput = data;
    });
  }

  clickOnUser(event, user) {
    var userlistArr = this.getClosest(event.target, 'user-list-container').childNodes;
    /*for(var i=0;i<userlistArr.length; i++){
      userlistArr[i].classList.remove("active");
      //console.log(userlistArr[i].classList.remove("active"));
      //userlistArr[i].classList.remove('active');
    }*/
    this.getClosest(event.target, "user-list-item").classList.add('active');
  }

  getClosest(el, cls):any {
      while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
      return el;
  }


}
