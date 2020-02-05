/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { FormsModule } from '@angular/forms';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { AuthwrapperComponent } from './authwrapper/authwrapper.component';
import { AuthGuard } from './auth-guard.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, LoginAuthComponent, AuthwrapperComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ThemeModule.forRoot(),
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'authToken'
          },
          baseEndpoint: 'http://10.60.19.46:8081/redmine-jbpm-intergration/api/v1/adm',
          login: {
            redirect: {
              success: '/pages/dashboard',
              failure: null
            },
            endpoint: '/login',
            
          },
          logout: {
            redirect: {
              success:'/auth/login',
              failure: null
            },
            endpoint: '/logout'
          }
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          
        }
      },
      
    }),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
