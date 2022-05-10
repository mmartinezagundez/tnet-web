import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import es from '@angular/common/locales/es';
import { IAuthService } from './2-domain/service-contract/auth.service.contract';
import { AuthService } from './2-domain/service/auth.service';
import { IAuthRepository } from './2-domain/repository-contract/auth.repository.contract';
import { AuthRepository } from './3-data/repository/auth.repository';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,    
    
    MatRippleModule, NgbModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },

    { provide: IAuthRepository, useClass: AuthRepository },
    { provide: IAuthService, useClass: AuthService }

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
