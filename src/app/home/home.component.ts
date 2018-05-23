import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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

  }

  ngOnDestroy(): void {
  }

  onClickUserOutput(user) {
  }
}
