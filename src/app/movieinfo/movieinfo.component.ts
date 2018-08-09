import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent implements OnInit {

  constructor() { }

  @Input() list : Subject<any>;

  @Output() MessageEvent = new EventEmitter();

  ngOnInit() {
  }

  sendmsg(name){
    this.MessageEvent.emit("Selected Movie "+name);
  }

}
