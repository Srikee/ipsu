import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tab } from 'ionic-angular';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
@IonicPage()
@Component({
    selector: 'page-message',
    templateUrl: 'message.html',
})
export class MessagePage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ipsu: IpsuProvider,
        private functions: FunctionsProvider,
    ) { }
    ionViewDidEnter() {
        let index = (<Tab>this.navCtrl).index;
        console.log(index);
    }
}
