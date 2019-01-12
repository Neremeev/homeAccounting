import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AuthModule} from "./auth/auth.module";
import { AppComponent } from './app.component';
import {UserService} from "./shared/services/user.service";
import {AuthService} from "./shared/services/auth.service";
import {SystemModule} from "./system/system.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    AppRoutingModule,
    SystemModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, AuthService], // можно здесь написать провайдер
  bootstrap: [AppComponent]
})
export class AppModule { }