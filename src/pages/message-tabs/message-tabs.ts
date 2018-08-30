import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { LoginPage } from '../login/login';
import { FunctionsProvider } from '../../providers/functions/functions';
@IonicPage()
@Component({
    selector: 'page-message-tabs',
    templateUrl: 'message-tabs.html',
})
export class MessageTabsPage {
    tabRoot = MessagePage;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private events: Events,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider,
    ) {
    }
    ionViewDidEnter() {
        if (this.ipsu.auth == null) {
            this.functions.showConfirm('กรุณาเข้าสู่ระบบก่อนการใช้งาน').then(rs => {
                if (rs) {
                    let LoginPageModal = this.modalCtrl.create(LoginPage);
                    LoginPageModal.onDidDismiss(data => {
                        //this.navCtrl.getActiveChildNav().select();
                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    });
                    LoginPageModal.present();
                } else {
                    this.navCtrl.parent.select(0);
                }
            });
        }
    }
}
