import { Injectable } from '@angular/core';
@Injectable()
export class IpsuProvider {
    public readonly apiServer = "http://DESKTOP-7IR60KP/ipsu/";
    public readonly defaultUserImage = "assets/imgs/ipsu.png";
    public readonly defaultUserBanner = "assets/imgs/banner.jpg";
    public readonly defaultNewsBanner = "assets/imgs/banner.jpg";
    public readonly keyStyle = "ipsu.style";
    public readonly keyLanguage = "ipsu.language";
    public readonly keyLockscreen = "ipsu.locksceen";
    public readonly keyAuth = "ipsu.auth";
    public readonly keyData = "ipsu.data";
    public readonly keyBanner = "ipsu.banner";
    public readonly keyNews = "ipsu.news";

    public style: string = "primary";
    public language: string = "en";
    public lockscreen: string = "";
    public auth: any = null;
    public data: any = null;
    //public banner:any = "";
}
