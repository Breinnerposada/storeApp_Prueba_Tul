import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalProductoComponent } from '../carrousel-secciones/components/modal-producto/modal-producto.component';

@Component({
  selector: 'app-cards-productos-rapidos',
  templateUrl: './cards-productos-rapidos.component.html',
  styleUrls: ['./cards-productos-rapidos.component.scss']
})
export class CardsProductosRapidosComponent implements OnInit {
  @Input() productos:any[];
  @Input() productosChatarra:any[];
  @Input() productosSaludable:any[];
  productosSaludables:any[] = []
  isVisible :boolean = false;
  elementActive = false;
  constructor(private modalNgz: NzModalService) { }

  ngOnInit(): void {

  }

  showModal(item:any): void {
    this.isVisible = true;
  }

  createComponentModal(item:any): void {
    const modal = this.modalNgz.create({
      nzBodyStyle: {height: '500px', width: '1100px'},
      nzStyle: {height: '500px', width: '1100px'},
      nzTitle: item.nombre,
      nzFooter: null,
      nzContent: ModalProductoComponent,
      nzComponentParams: {
        producto:  item
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });
  }

}
