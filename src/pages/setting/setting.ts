import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
import { LockscreenSetupPage } from '../lockscreen-setup/lockscreen-setup';
import { MyApp } from '../../app/app.component';
@IonicPage()
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html',
})
export class SettingPage {
    style: string;
    language: string;
    lockscreen: boolean = false;
    aa: boolean = true;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private alertCtrl: AlertController,
        private events: Events,
        private translate: TranslateService,
        private modalCtrl: ModalController,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider
    ) {
    }
    ionViewDidEnter() {
        this.style = this.ipsu.style;
        this.language = this.ipsu.language;
        this.lockscreen = this.ipsu.lockscreen == "" ? false : true;
    }
    selectStyle(style) {
        this.ipsu.style = style;
    }
    okStyle() {
        this.functions.setStorage(this.ipsu.keyStyle, this.ipsu.style);
        this.updateData('style', this.ipsu.style);
    }
    cancelStyle() {
        this.ipsu.style = this.style;
    }
    selectLanguage(language) {
        this.ipsu.language = language;
    }
    okLanguage() {
        this.functions.setStorage(this.ipsu.keyLanguage, this.ipsu.language);
        this.translate.use(this.ipsu.language);
        this.updateData('language', this.ipsu.language);
    }
    cancelLanguage() {
        this.ipsu.language = this.language;
    }
    updateData(feild, value) {
        if (this.ipsu.auth == null) return;
        let username = this.ipsu.auth.username;
        this.functions.ajax(this.ipsu.apiServer + "setting", {
            username: username,
            feild: feild,
            value: value
        }, true).then((res: any) => {

        }).catch((err: any) => {

        });
    }
    changeLockscreen() {
        if (this.lockscreen == true) {
            this.setLockscreen();
        } else {
            this.resetLockscreen();
        }
    }
    setLockscreen() {
        const modal = this.modalCtrl.create(LockscreenSetupPage);
        modal.onDidDismiss(data => {
            this.lockscreen = this.ipsu.lockscreen == "" ? false : true;
        });
        modal.present();
    }
    resetLockscreen() {
        let a: any = this.translate.get('all.confirm-del');
        this.functions.showConfirm(a.value).then((rs: any) => {
            if (rs) {
                this.ipsu.lockscreen = "";
                this.functions.removeStorage(this.ipsu.keyLockscreen);
            } else {
                this.ionViewDidEnter();
            }
        });
    }
    async logout() {
        let a: any = this.translate.get('all.confirm-logout');
        let rs = await this.functions.showConfirm(a.value);
        if( rs ) {
            this.doLogout();
        }
    }
    private async doLogout() {
        this.ipsu.auth = null;
        this.ipsu.data = null;
        this.ipsu.lockscreen = "";
        this.functions.removeStorage(this.ipsu.keyAuth);
        this.functions.removeStorage(this.ipsu.keyData);
        this.functions.removeStorage(this.ipsu.keyLockscreen);
        this.events.publish('TabsPage:reload');
        this.navCtrl.parent.select(0);
    }
}
