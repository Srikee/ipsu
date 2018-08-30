import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class FunctionsProvider {
    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private http: Http,
        private storage: Storage,
        private translate: TranslateService,
    ) { }
    private getImageSizeFromUrl(url) {
        return new Promise((resolve) => {
            if (url != "") {
                let img: any = new Image();
                img.addEventListener("load", function () {
                    resolve({
                        width: this.naturalWidth,
                        height: this.naturalHeight
                    });
                });
                img.addEventListener("error", function () {
                    resolve(false);
                });
                img.src = url;
            } else {

            }
        });
    }
    async getImageAndFixSizeFromUrl(url, width, height, df) {
        let size: any = false;
        if (url != "") size = await this.getImageSizeFromUrl(url);
        if (size == false) {
            url = df;
            size = await this.getImageSizeFromUrl(url);
        }
        if (size == false) {
            return await {
                url: url,
                cls: 'image-fix-height'
            };
        } else {
            let w = size.width;
            let h = size.height;
            let cls = "";
            if (height > h * width / w) cls = 'image-fix-height';
            else cls = 'image-fix-width';
            return await {
                url: url,
                cls: cls
            };
        }
    }
    showAlert(message) {
        let msg: any = message;
        if (typeof message === 'object') msg = JSON.stringify(message);
        if (typeof message === 'string') msg = message;
        return new Promise(resolve => {
            let a: any = this.translate.get('all.alert');
            let b: any = this.translate.get('all.ok');
            const alert = this.alertCtrl.create({
                title: a.value,
                subTitle: msg,
                buttons: [
                    {
                        text: b.value,
                        handler: () => {
                            resolve(true);
                        }
                    },
                ]
            });
            alert.present();
        });
    }
    showConfirm(message) {
        return new Promise(resolve => {
            let a: any = this.translate.get('all.confirm');
            let b: any = this.translate.get('all.ok');
            let c: any = this.translate.get('all.cancel');
            let alert = this.alertCtrl.create({
                title: a.value,
                message: message,
                buttons: [
                    {
                        text: c.value,
                        role: 'cancel',
                        handler: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: b.value,
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });
            alert.present();
        });
    }
    ajax(url, data, isloading) {
        let loading: any;
        if (isloading == true) {
            let a: any = this.translate.get('all.processing');
            loading = this.loadingCtrl.create({
                content: a.value
            });
            loading.present();
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                this.http.post(url, JSON.stringify(data))
                    //.map(res=>res.json())
                    .subscribe((response: any) => {
                        if (isloading == true) { loading.dismiss(); }
                        var rs;
                        try {
                            rs = JSON.parse(response._body);
                        } catch (e) {
                            rs = response._body;
                        }
                        resolve(rs);
                    }, error => {
                        if (isloading == true) { loading.dismiss(); }
                        let b: any = this.translate.get('all.nonetwork');
                        resolve(b.value);
                    });
            }, 1000);
        });
    }
    setStorage(key, value) {
        return this.storage.set(key, value);
    }
    getStorage(key) {
        return this.storage.get(key);
    }
    removeStorage(key) {
        return this.storage.remove(key);
    }
}
