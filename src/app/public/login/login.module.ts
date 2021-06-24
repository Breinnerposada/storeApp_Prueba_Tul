import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CardDestacadosComponent } from './components/card-destacados/card-destacados.component';

import { HeaderComponent } from './components/header/header.component';
import { HomeModule } from 'src/app/private/home/home.module';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';



@NgModule({
  declarations: [LoginComponent, CardDestacadosComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzMenuModule,
    HttpClientModule,
    SharedModuleModule,
    HomeModule
  ],
  exports: [LoginComponent,HeaderComponent,CardDestacadosComponent]
})
export class LoginModule { }
