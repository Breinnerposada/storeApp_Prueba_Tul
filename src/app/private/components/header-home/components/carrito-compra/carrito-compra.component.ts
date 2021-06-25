import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';
import { IProducto } from '../../../../../interface/iproducto';
import { ModalProductoComponent } from '../../../carrousel-secciones/components/modal-producto/modal-producto.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.scss']
})
export class CarritoCompraComponent implements OnInit {
  @Input() visible:any;
  @Input() productos :any;
  
  constructor(private firestoreService: FirestoreService,private modalNgz: NzModalService) { }

  ngOnInit(): void {
    console.log(this.productos);
  }

  close(): void {
    this.visible = false;
  }

  editarProducto(item:any){
    const modal = this.modalNgz.create({
      nzBodyStyle: {height: '500px', width: '1100px'},
      nzStyle: {height: '500px', width: '1100px'},
      nzTitle: item.nombre,
      nzContent: ModalProductoComponent,
      nzComponentParams: {
        producto:  item
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
  }

  eliminarProducto(item:IProducto){
    this.firestoreService.deleteCarrito(item)
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err))
  }


  
}
