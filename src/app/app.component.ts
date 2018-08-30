import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { LoadingPage } from '../pages/loading/loading';
import { LockscreenPage } from '../pages/lockscreen/lockscreen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { IpsuProvider } from '../providers/ipsu/ipsu';
import { FunctionsProvider } from '../providers/functions/functions';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = LoadingPage;
    pages = [
        { icon: "home", title: 'tabs.menu1', component: TabsPage, index: 0 },//หน้าแรก
        { icon: "options", title: 'tabs.menu5', component: TabsPage, index: 4 },//ตั้งค่า
    ];
    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private events: Events,
        private translate: TranslateService,
        private functions: FunctionsProvider,
        private ipsu: IpsuProvider
    ) {
        this.initializeApp();
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.runApp();
        });
    }
    async runApp() {
        await this.getStorage();
        await this.getLanguage();
        await this.getLockscreen();
        await this.getAuth();
    }
    async getStorage() {
        let style = await this.functions.getStorage(this.ipsu.keyStyle);
        if (style != null) this.ipsu.style = style;
    }
    async getLanguage() {
        this.ipsu.language = "en";
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        let language = await this.functions.getStorage(this.ipsu.keyLanguage);
        if (language != null) {
            this.ipsu.language = language;
            this.translate.use(language);
        }
    }
    async getLockscreen() {
        let lockscreen: any = await this.functions.getStorage(this.ipsu.keyLockscreen);
        this.ipsu.lockscreen = lockscreen != null ? lockscreen : "";
    }
    async getAuth() {
        let auth: any = await this.functions.getStorage(this.ipsu.keyAuth);
        if (auth != null && auth.username != null) {
            let res: any = await this.functions.ajax(this.ipsu.apiServer + "starting", {
                username: auth.username,
            }, false);
            if (res.status == 'Y') {
                this.ipsu.auth = auth;
                this.ipsu.data = res;
                await this.functions.setStorage(this.ipsu.keyAuth, auth);
                await this.functions.setStorage(this.ipsu.keyData, res);
                this.ipsu.language = res.user.language;
                this.translate.use(res.user.language);
                await this.functions.setStorage(this.ipsu.keyLanguage, res.user.language);
                this.ipsu.style = res.user.style;
                await this.functions.setStorage(this.ipsu.keyStyle, res.user.style);
            } else if (res.status == 'N') {
                this.ipsu.auth = null;
                this.ipsu.data = null;
                await this.functions.removeStorage(this.ipsu.keyAuth);
                await this.functions.removeStorage(this.ipsu.keyData);
            } else {
                this.ipsu.auth = auth;
                this.ipsu.data = await this.functions.getStorage(this.ipsu.keyData);
                let a: any = this.translate.get('all.error');
                await this.functions.showAlert(a.value + res);
            }
        } else {
            this.ipsu.auth = null;
            this.ipsu.data = null;
            await this.functions.removeStorage(this.ipsu.keyAuth);
            await this.functions.removeStorage(this.ipsu.keyData);
        }
        /*if (this.ipsu.lockscreen == true) {
            this.rootPage = LockscreenPage;
        } else {
            this.rootPage = TabsPage;
        }*/
        this.rootPage = TabsPage;
        if (this.ipsu.lockscreen != "" && this.ipsu.auth!=null) {
            setTimeout(() => {
                this.openLockscreen(this.ipsu.lockscreen);
            }, 100);
        }
    }
    openPage(page) {
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        } else {
            this.nav.setRoot(page.component);
        }
    }
    login() {
        let LoginPageModal = this.modalCtrl.create(LoginPage);
        LoginPageModal.onDidDismiss(data => {

        });
        LoginPageModal.present();
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
        this.nav.getActiveChildNav().select(0);
    }
    openLockscreen(lockscreen) {
        this.nav.push(LockscreenPage, {
            code: lockscreen,
            ACDelbuttons: true,
            onCorrect: () => {
                let a: any = this.translate.get('all.toast-unlocked');
                let toast = this.toastCtrl.create({
                    message: a.value,
                    duration: 1000
                });
                toast.present();
            },
            onWrong: (attempts) => {
                let a: any = this.translate.get('all.toast-locked-wrong');
                let toast = this.toastCtrl.create({
                    message: "("+attempts+") " + a.value,
                    duration: 2000
                });
                toast.present();
            },
            onLogout: async () => {
                /*await this.logout();
                if( this.ipsu.auth==null ) {
                    this.nav.pop();
                }*/
                let a: any = this.translate.get('all.confirm-logout-lockscreen');
                let rs = await this.functions.showConfirm(a.value);
                if( rs ) {
                    await this.doLogout();
                    if( this.ipsu.auth==null ) {
                        this.nav.pop();
                    }
                }
            }
        });
    }
}
