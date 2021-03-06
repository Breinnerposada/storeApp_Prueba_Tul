import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderHomeComponent } from '../components/header-home/header-home.component';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { CarrouselSeccionesComponent } from '../components/carrousel-secciones/carrousel-secciones.component';
import { CardsProductosRapidosComponent } from '../components/cards-productos-rapidos/cards-productos-rapidos.component';
import { ModalProductoComponent } from '../components/carrousel-secciones/components/modal-producto/modal-producto.component';
import { DomSanatizerPipe } from 'src/app/pipes/dom-sanatizer.pipe';
import { FormsModule } from '@angular/forms';
import { CarritoCompraComponent } from 'src/app/private/components/header-home/components/carrito-compra/carrito-compra.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ListaCarritoComponent } from '../components/header-home/components/lista-carrito/lista-carrito.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderHomeComponent,
    CarrouselSeccionesComponent,
    CardsProductosRapidosComponent,
    ModalProductoComponent,
    CarritoCompraComponent,
    ListaCarritoComponent,
    DomSanatizerPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModuleModule,
  ],
  exports: [HeaderHomeComponent,HomeComponent,ListaCarritoComponent,CarrouselSeccionesComponent,CardsProductosRapidosComponent,ModalProductoComponent,CarritoCompraComponent]
})
export class HomeModule { }
