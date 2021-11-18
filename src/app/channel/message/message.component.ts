import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../types/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input() message: Message = {content: '', user: '', profile: '', displayName: '', date: Date.now()};
  @Input() floatLeft: boolean;
  @Input() skeleton = false;

  constructor() { }

  ngOnInit() {
  }

}
