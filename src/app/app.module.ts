import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import es from '@angular/common/locales/es';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthModule } from '@auth0/auth0-angular';
import { LoginModule } from './public/login/login.module';
import { Page404Component } from './public/page404/page404.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SharedModuleModule } from './shared/shared-module/shared-module.module';



registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-425e31fr.us.auth0.com',
      clientId: '8f7KyZ8PjAriNKVfWmhiK29tQKYHPztJ',
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    }),
    CommonModule,
    HttpClientModule,
    BrowserModule,
    SharedModuleModule,
    BrowserAnimationsModule,
    LoginModule,
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
