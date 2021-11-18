import { Component } from '@angular/core';
import {FirebaseApp} from '@angular/fire/app';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  /**
   * @param firebaseApp This service must be injected to trigger the lazy loaded instantiation of Firebase. Without this
   * injection, there is no Firebase instance and the authentication plug-in requires that Firebase is already instantiated.
   */
  constructor(public authService: AuthService) {
  }
}
