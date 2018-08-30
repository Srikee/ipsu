import { Component } from '@angular/core';
import { NavController, NavParams, Platform, App } from 'ionic-angular';
import { NewsPage } from '../news/news';
import { IpsuProvider } from '../../providers/ipsu/ipsu';
import { FunctionsProvider } from '../../providers/functions/functions';
//import { LockScreenComponent } from 'ionic-simple-lockscreen';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    banner: any = [];
    news: any = [];
    lang: any;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private platform: Platform,
        private app: App,
        private ipsu: IpsuProvider,
        private functions: FunctionsProvider
    ) {
    }
    ionViewDidEnter() {
        //this.lang = this.translate.currentLang;
        this.functions.ajax(this.ipsu.apiServer + "get-home", {
        }, false).then((res: any) => {
            if (res.status == 'Y') {
                this.functions.setStorage(this.ipsu.keyBanner, res.banner);
                this.functions.setStorage(this.ipsu.keyNews, res.news);
                this.setBanner(res.banner);
                this.setNews(res.news);
            }
        }).catch((err: any) => {
            this.functions.showAlert('Error เนื่องจาก ' + err);
        });
    }
    setBanner(banner: any) {
        for (let i = 0; i < banner.length; i++) {
            let url = this.ipsu.apiServer + "fileupload/banner/" + banner[i].banner_img;
            banner[i].urlImage = url;
            banner[i].fixClass = "image-fix-height";
            this.functions.getImageAndFixSizeFromUrl(url, this.platform.width(), 200, this.ipsu.defaultUserBanner).then((rs: any) => {
                banner[i].urlImage = rs.url;
                banner[i].fixClass = rs.cls;
            });
            this.banner = banner;
        }
    }
    setNews(news: any) {
        this.news = news;
    }
    openNews() {
        //this.navCtrl.push(NewsPage);
        this.app.getRootNav().push(NewsPage);
    }
}
