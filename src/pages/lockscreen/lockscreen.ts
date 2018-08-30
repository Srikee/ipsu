import {Component, OnInit} from "@angular/core";
import {IonicPage, Events, NavParams, NavController} from "ionic-angular";
import { TouchID } from '@ionic-native/touch-id';
import { TranslateService } from "@ngx-translate/core";
@IonicPage()
@Component({
    selector: 'page-lockscreen',
    templateUrl: 'lockscreen.html',
})
export class LockscreenPage implements OnInit {
    _showLockScreen: boolean;
    ACDelbuttons: boolean;
    passcodeWrong: boolean;
    touchId: boolean;
    passcodeAttempts: number = 0;
    enteredPasscode: string = '';
    passcode: string;
    onCorrect: any;
    onWrong: any;
    onLogout: any;
    selected: any;
    constructor(
        public events: Events,
        private navCtrl: NavController,
        private navParams: NavParams,
        private touchIdx: TouchID,
        private translate: TranslateService,
    ) {
        this._showLockScreen = true;
        this.touchId = navParams.data.touchId || false;
        this.ACDelbuttons = navParams.data.ACDelbuttons || false;
        this.passcode = navParams.data.code;
        this.onCorrect = navParams.data.onCorrect || null;
        this.onWrong = navParams.data.onWrong || null;
        this.onLogout = navParams.data.onLogout || null;
    }
    ngOnInit() {
        setTimeout(() => {
            if (this.touchId) {
                /*TouchID.isAvailable().then(
                    res => {
                        TouchID.verifyFingerprint('Enter code').then(
                            res => {
                                this._showLockScreen = false;
                                this.onCorrect && this.onCorrect();
                                this.navCtrl.pop();
                            },
                            err => {
                                console.log("Unable to unlock the device with this fingerprint.");
                            }
                        )
                    },
                    err => {
                        console.log("Touch ID is not available.");
                    }
                )*/
                this.touchIdx.isAvailable().then(
                    res => {
                        let a: any = this.translate.get('lockscreen.title');
                        this.touchIdx.verifyFingerprint(a.value).then(
                            res => {
                                this._showLockScreen = false;
                                this.onCorrect && this.onCorrect();
                                this.navCtrl.pop();
                            },
                            err => {
                                console.log("Unable to unlock the device with this fingerprint.");
                            }
                        )
                    },
                    err => {
                        console.log("Touch ID is not available.");
                    }
                )
            }
        }, 50);
    }
    allClear(): void {
        this.enteredPasscode = "";
    }
    remove(): void {
        this.enteredPasscode = this.enteredPasscode.slice(0, -1);
    }
    digit(digit: any): void {
        this.selected = +digit;
        if (this.passcodeWrong) {
            return;
        }
        this.enteredPasscode += '' + digit;
        if (this.enteredPasscode.length >= 4) {
            if (this.enteredPasscode === '' + this.passcode) {
                this.enteredPasscode = '';
                this.passcodeAttempts = 0;
                this.onCorrect && this.onCorrect();
                this._showLockScreen = false;
                this.navCtrl.pop();
            } else {
                this.passcodeWrong = true;
                this.passcodeAttempts++;
                this.onWrong && this.onWrong(this.passcodeAttempts);
                setTimeout(() => {
                    this.enteredPasscode = '';
                    this.passcodeWrong = false;
                }, 800);
            }
        }
    }
    logout() {
        this.onLogout && this.onLogout();
    }
}
