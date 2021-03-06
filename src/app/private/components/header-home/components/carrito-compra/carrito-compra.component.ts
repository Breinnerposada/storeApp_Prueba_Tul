import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';
import { IProducto } from '../../../../../interface/iproducto';
import { ModalProductoComponent } from '../../../carrousel-secciones/components/modal-producto/modal-producto.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.scss']
})
export class CarritoCompraComponent implements OnInit {
  @Input() visible:any;
  @Input() carritoProducto:any[] ;
  productoCarrito:any[] = []
  currentProductoCarrito:any[] = []
  update: boolean = false
  id;
  estado;
  precioTotal:number = 0;
    
    constructor(private firestoreService: FirestoreService,private modalNgz: NzModalService,private message: NzMessageService) { }

  ngOnInit(): void {  
    console.log(this.carritoProducto);
    if (this.carritoProducto){
      this.calcularPrecioTotal();
    }

  }

  ngOnChanges(): void {
   //this.calcularPrecioTotal()    
  }

  close(): void {
    this.visible = false;
    this.firestoreService.solovista.emit(this.visible);
  }

  editarProducto(item:any){
    console.log(item);
    const modal = this.modalNgz.create({
      nzBodyStyle: {height: '500px', width: '1100px'},
      nzStyle: {height: '500px', width: '1100px'},
      nzTitle: item.nombre,
      nzContent: ModalProductoComponent,
      nzFooter: null,
      nzComponentParams: {
        productoEditar:  item,
        update: this.update = true
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
  }

  eliminarProducto(id){
    const idProducto = id.productoId;
    this.firestoreService.deleteCarritoProducto(idProducto)
    .then((r) => {
    })
    .catch((err) => console.log(err))

    
  }

  calcularPrecioTotal(){
    this.carritoProducto.forEach((r) => {
      const precios = r.productos.precio * r.quantity;
      this.precioTotal = this.precioTotal + precios; 
    })
  }


  updateCarrito(item){
  const id = item[0].carritoId;
  this.firestoreService.updateCarrito(id)
    .then(r => {
      this.message.create('success',`Orden Realizada Con Exito!!`);
      this.close()
  })
  .catch(err => this.message.create('warning',`Ups Ocurrido Un Error!!`));
  }



  
}
