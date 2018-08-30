import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    auth: any = {
        username: "5320310185",
        password: "1960500176116"
    };
    constructor(
        private navCtrl: NavController,
        private viewCtrl: ViewController,
        private events: Events,
        private translate: TranslateService,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider
    ) { }
    ionViewDidEnter() {
        this.functions.getStorage(this.ipsu.keyAuth).then((auth: any) => {
            if (auth != null && auth.username != null) {
                this.functions.showAlert("คุณได้ทำการเข้าสู่ระบบแล้ว").then((rs) => {
                    this.dismiss(true);
                });
            }
        });
    }
    async login() {
        let res: any = await this.functions.ajax(this.ipsu.apiServer + "login", {
            username: this.auth.username,
            password: this.auth.password
        }, true);
        if (res.status == 'Y') {
            this.ipsu.auth = this.auth;
            this.ipsu.data = res;
            await this.functions.setStorage(this.ipsu.keyAuth, this.auth);
            await this.functions.setStorage(this.ipsu.keyData, res);
            this.ipsu.language = res.user.language;
            this.translate.use(res.user.language);
            await this.functions.setStorage(this.ipsu.keyLanguage, res.user.language);
            this.ipsu.style = res.user.style;
            await this.functions.setStorage(this.ipsu.keyStyle, res.user.style);
            this.dismiss(true);
        } else if (res.status == 'N') {
            this.ipsu.auth = null;
            this.ipsu.data = null;
            await this.functions.removeStorage(this.ipsu.keyAuth);
            await this.functions.removeStorage(this.ipsu.keyData);
            await this.functions.showAlert('เข้าสู่ระบบไม่สำเร็จ');
        } else {
            await this.functions.showAlert('พบข้อผิดพลาดเนื่องจาก ' + res);
        }
        this.events.publish('TabsPage:reload');
    }
    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }
}
