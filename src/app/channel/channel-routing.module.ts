import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelPage } from './channel.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelPage
  },  {
    path: 'new-channel',
    loadChildren: () => import('./new-channel/new-channel.module').then( m => m.NewChannelPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelPageRoutingModule {}
