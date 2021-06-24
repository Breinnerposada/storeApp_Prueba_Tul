import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './login.component';
import { HeaderComponent } from './components/header/header.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CardDestacadosComponent } from './components/card-destacados/card-destacados.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';




@NgModule({
  declarations: [LoginComponent, HeaderComponent, CardDestacadosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzMenuModule,
    HttpClientModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCarouselModule

  ],
  exports: [LoginComponent,HeaderComponent,CardDestacadosComponent]
})
export class LoginModule { }
