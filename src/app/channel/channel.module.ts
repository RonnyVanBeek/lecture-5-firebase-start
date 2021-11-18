import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelPageRoutingModule } from './channel-routing.module';

import { ChannelPage } from './channel.page';
import {MessageComponent} from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelPageRoutingModule
  ],
  declarations: [ChannelPage, MessageComponent]
})
export class ChannelPageModule {}
