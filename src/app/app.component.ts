import { Component } from '@angular/core';
import {FirebaseApp} from '@angular/fire/app';
import {AuthService} from './services/auth.service';
import {Channel} from './types/channel';
import {DatabaseService} from './services/database.service';
import {ChannelPage} from './channel/channel.page';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  channels: Channel[];
  /**
   * @param firebaseApp This service must be injected to trigger the lazy loaded instantiation of Firebase. Without this
   * injection, there is no Firebase instance and the authentication plug-in requires that Firebase is already instantiated.
   */
  constructor(public authService: AuthService, private dbService: DatabaseService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.dbService.getPublicChannelListInRealTime((channels1 => this.channels = channels1));
  }

}

