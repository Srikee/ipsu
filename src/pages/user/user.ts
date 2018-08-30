import { Component } from '@angular/core';
import { NavController, Platform, IonicPage, ModalController } from 'ionic-angular';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage {
    user: any = {
        bannerUrl: "",
        bannerFixSizeClass: "",
        imageUrl: "",
        imageFixSizeClass: "",
    };
    constructor(
        private navCtrl: NavController,
        private platform: Platform,
        private modalCtrl: ModalController,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider,
    ) { }
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
        this.getData();
    }
    async getData() {
        let user: any = this.ipsu.data.user;
        await this.setUser(user);

        /*this.functions.getStorage(this.ipsu.keyUser).then((user: any) => {
            //this.setUser(user);
            this.functions.ajax(this.ipsu.apiServer + "get-user", {
                username: this.ipsu.auth.username
            }, false).then((res: any) => {
                if (res.status == 'Y') {
                    this.functions.setStorage(this.ipsu.keyUser, res.user);
                    this.setUser(res.user);
                }
            }).catch((err: any) => {
                this.functions.showAlert('Error เนื่องจาก ' + err);
            });
        });*/
    }
    async setUser(user) {
        if (user == null) {
            this.user = {};
            this.user = {
                bannerUrl: "assets/imgs/banner.jpg",
                bannerFixSizeClass: "image-fix-height",
                imageUrl: "assets/imgs/ipsu.png",
                imageFixSizeClass: "image-fix-height"
            };
            let rs: any;
            rs = this.functions.getImageAndFixSizeFromUrl('', this.platform.width(), 200, this.ipsu.defaultUserBanner);
            this.user.bannerUrl = rs.url;
            this.user.bannerFixSizeClass = rs.cls;
            rs = this.functions.getImageAndFixSizeFromUrl('', 100, 100, this.ipsu.defaultUserImage);
            this.user.imageUrl = rs.url;
            this.user.imageFixSizeClass = rs.cls;
        } else {
            this.user = user;
            this.user.bannerUrl = "assets/imgs/banner.jpg";
            this.user.bannerFixSizeClass = "image-fix-height";
            this.user.imageUrl = "assets/imgs/ipsu.png";
            this.user.imageFixSizeClass = "image-fix-height";
            let rs: any;
            rs = await this.functions.getImageAndFixSizeFromUrl(user.banner, this.platform.width(), 200, this.ipsu.defaultUserBanner);
            this.user.bannerUrl = rs.url;
            this.user.bannerFixSizeClass = rs.cls;
            rs = await this.functions.getImageAndFixSizeFromUrl(user.image, 100, 100, this.ipsu.defaultUserImage);
            this.user.imageUrl = rs.url;
            this.user.imageFixSizeClass = rs.cls;
        }
    }
    /*setFacebook() {
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
            .catch(e => console.log('Error logging into Facebook', e));
    }*/
}
