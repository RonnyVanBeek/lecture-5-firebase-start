import {Component, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from '../services/database.service';

import {Message} from '../types/message';
import {Channel} from '../types/channel';
import {IonContent} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  channelName = 'General';
  newMessage: string;
  messages: Message[] = [];
  private floatLeft = true;
  private prevUser: string;

  constructor(private dbService: DatabaseService, public activatedRoute: ActivatedRoute) {
    //this.dbService.retrieveMessagesInRealTime(this.channelName, (messages) => this.messages = messages);
  }

  sendMessage(): void {
    this.dbService.sendMessage(this.channelName, this.newMessage);
    this.newMessage = '';
  }

  /**
   * Determine if a message should displayed on the left or the right.
   *
   * @param i     The index of the number in the array of messages.
   * @param user  The id of the user who wrote the message.
   */
  determineFloatLeft(i: number, user: string): boolean {
    // The first message is always displayed on the left.
    if (i === 0) {
      this.prevUser = user;
      this.floatLeft = true;
    }

    // As long as the user who wrote the message doesn't change,
    // the position doesn't change either.
    if (this.prevUser !== user) {
      this.prevUser = user;
      this.floatLeft = !this.floatLeft;
    }
    return this.floatLeft;
  }

  ngOnInit() {
    this.setData();
    this.dbService.retrieveMessagesInRealTime(this.channelName, (messages) => this.messages = messages);
  }

  setData(): void{
    const kanaal = this.activatedRoute.snapshot.paramMap.get('channelName');

    if (kanaal===null)
    {
      this.channelName = 'General';
      return;
    }

    this.channelName = kanaal;
  }
}
