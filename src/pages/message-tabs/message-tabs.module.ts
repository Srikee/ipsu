import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageTabsPage } from './message-tabs';

@NgModule({
  declarations: [
    MessageTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageTabsPage),
  ],
})
export class MessageTabsPageModule {}
