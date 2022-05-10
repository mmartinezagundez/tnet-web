import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainlayoutRoutingModule } from './mainlayout-routing.module';
import { MainlayoutComponent } from './mainlayout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';


@NgModule({
  declarations: [MainlayoutComponent],
  imports: [
    CommonModule,
    MainlayoutRoutingModule,

    IconsProviderModule,

    NzLayoutModule,
    NzMenuModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [MainlayoutComponent]
})
export class MainlayoutModule { }
