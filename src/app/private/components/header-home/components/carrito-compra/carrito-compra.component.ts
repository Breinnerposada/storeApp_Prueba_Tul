import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';
import { IProducto } from '../../../../../interface/iproducto';
import { ModalProductoComponent } from '../../../carrousel-secciones/components/modal-producto/modal-producto.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

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
    
    constructor(private firestoreService: FirestoreService,private modalNgz: NzModalService) { }

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
      console.log(r);
      const precios = r.productos.precio * r.quantity;
      console.log(precios);
      this.precioTotal = this.precioTotal + precios; 
      console.log(this.precioTotal);
    })
  }


  updateCarrito(item){
  const id = item[0].carritoId;
  console.log(item);
  console.log(id);
  this.firestoreService.updateCarrito(id)
    .then(r => {
      this.close()
  })
  .catch(err => console.log(err));
  }



  
}
