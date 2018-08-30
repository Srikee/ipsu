import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events, Tab, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MessageTabsPage } from '../message-tabs/message-tabs';
import { BoardPage } from '../board/board';
import { UserPage } from '../user/user';
import { SettingPage } from '../setting/setting';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    tab1Root = HomePage;
    tab2Root = MessageTabsPage;
    tab3Root = BoardPage;
    tab4Root = UserPage;
    tab5Root = SettingPage;
    @ViewChild('myTab') tabRef: Tabs;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        public events: Events,
        private platform: Platform,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider
    ) {
        this.events.unsubscribe('TabsPage:reload');
        this.events.subscribe('TabsPage:reload', () => {
            this.reload();
        });
    }
    ngAfterViewInit() {
        this.reload();
    }
    async reload() {
        //https://stackoverflow.com/questions/42386672/ionic-2-use-picture-in-tab-button
        let auth: any = await this.functions.getStorage(this.ipsu.keyAuth);
        let tabbar = this.tabRef._tabbar.nativeElement;
        let element = tabbar.childNodes[4];
        element.removeChild(element.childNodes[1]);
        if (auth != null) {
            let img = document.createElement("img");
            let rs: any = await this.functions.getImageAndFixSizeFromUrl(this.ipsu.data.user.image, 25, 25, this.ipsu.defaultUserImage);
            let url = rs.url;
            img.setAttribute("class", "tab-icon-custom tab-button-icon icon icon-md");
            img.setAttribute("src", url);
            img.setAttribute("style", "width:25px; height:25px; min-width: 25px; min-height: 25px; border-radius: 5px;");
            element.insertBefore(img, element.childNodes[1]);
        } else {
            let cls = (this.platform.is("ios")) ? "tab-button-icon icon icon-ios ion-ios-contact-outline" : "tab-button-icon icon icon-md ion-md-contact";
            let icon = document.createElement("ion-icon");
            icon.setAttribute("class", cls);
            element.insertBefore(icon, element.childNodes[1]);
        }
    }
    /*
    checkAuth(index) {
        if (this.ipsu.auth == null) {
            this.functions.showConfirm('กรุณาเข้าสู่ระบบก่อนการใช้งาน').then(rs => {
                if (rs) {
                    let LoginPageModal = this.modalCtrl.create(LoginPage);
                    LoginPageModal.onDidDismiss(data => {
                        if (data) this.events.publish('TabsPage:reload');
                        this.navCtrl.getActiveChildNav().select(index);
                        this.checkAuth(index);
                    });
                    LoginPageModal.present();
                } else {
                    this.navCtrl.getActiveChildNav().select(0);
                }
            });
        }
        return false;
    }
    */
}
