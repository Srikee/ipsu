import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
@IonicPage()
@Component({
    selector: 'page-news',
    templateUrl: 'news.html',
})
export class NewsPage {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider
    ) {
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad NewsPage');
    }
}
