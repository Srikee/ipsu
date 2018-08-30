import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
    selector: 'page-board',
    templateUrl: 'board.html',
})
export class BoardPage {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private platform: Platform,
        private modalCtrl: ModalController,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider
    ) {
    }
    ionViewDidEnter() {
        if (this.ipsu.auth == null) {
            this.functions.showConfirm('กรุณาเข้าสู่ระบบก่อนการใช้งาน').then(rs => {
                if (rs) {
                    let LoginPageModal = this.modalCtrl.create(LoginPage);
                    LoginPageModal.onDidDismiss(data => {
                        this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    });
                    LoginPageModal.present();
                } else {
                    this.navCtrl.parent.select(0);
                }
            });
            return;
        }
        console.log("OK");
    }
}
