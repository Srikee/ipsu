import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LockscreenSetupPage } from './lockscreen-setup';

@NgModule({
  declarations: [
    LockscreenSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(LockscreenSetupPage),
  ],
})
export class LockscreenSetupPageModule {}
