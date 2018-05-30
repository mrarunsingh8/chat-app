import {Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    const self = this;
  }

  ngOnDestroy(): void {
    this.homeService.socket("onClose", {currentUser: this.homeService.getToken()});
  }

  onClickUserOutput(user) {

  }
}