import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
    selector: 'page-lockscreen-setup',
    templateUrl: 'lockscreen-setup.html',
})
export class LockscreenSetupPage {
    code: string = "";
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private viewCtrl: ViewController,
        private translate: TranslateService,
        private functions: FunctionsProvider,
        private ipsu: IpsuProvider,
    ) {
    }
    set(v) {
        if (this.code.length >= 4) return;
        this.code += v;
    }
    del() {
        let tmp = "";
        for (let i = 0; i < this.code.length - 1; i++) {
            tmp += this.code.charAt(i);
        }
        this.code = tmp;
    }
    clear() {
        this.code = "";
    }
    save() {
        if (this.code.length == 4) {
            this.ipsu.lockscreen = this.code;
            this.functions.setStorage(this.ipsu.keyLockscreen, this.code);
            this.dismiss();
        } else {
            let a: any = this.translate.get('lockscreen-setup.invalid');
            this.functions.showAlert(a.value);
        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
