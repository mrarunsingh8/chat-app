import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  socket: any = null;
  url: string = 'http://localhost:3001';

  constructor() {
    this.socket = io(this.url);
  }
}
