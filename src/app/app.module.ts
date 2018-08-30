import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { TouchID } from '@ionic-native/touch-id';

import { FunctionsProvider } from '../providers/functions/functions';
import { IpsuProvider } from '../providers/ipsu/ipsu';
import { PipesModule } from '../pipes/pipes.module';

import { MyApp } from './app.component';
import { LoadingPage } from '../pages/loading/loading';
import { LoginPage } from '../pages/login/login';
import { LockscreenPage } from '../pages/lockscreen/lockscreen';
import { LockscreenSetupPage } from '../pages/lockscreen-setup/lockscreen-setup';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { MessageTabsPage } from '../pages/message-tabs/message-tabs';
import { MessagePage } from '../pages/message/message';
import { BoardPage } from '../pages/board/board';
import { UserPage } from '../pages/user/user';
import { SettingPage } from '../pages/setting/setting';
import { NewsPage } from '../pages/news/news';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        MyApp,
        LoadingPage,
        LoginPage,
        LockscreenPage,
        LockscreenSetupPage,
        TabsPage,
        HomePage,
        MessageTabsPage,
        MessagePage,
        BoardPage,
        UserPage,
        SettingPage,
        NewsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        HttpModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoadingPage,
        LoginPage,
        LockscreenPage,
        LockscreenSetupPage,
        TabsPage,
        HomePage,
        MessageTabsPage,
        MessagePage,
        BoardPage,
        UserPage,
        SettingPage,
        NewsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        TouchID,
        FunctionsProvider,
        IpsuProvider
    ]
})
export class AppModule { }
