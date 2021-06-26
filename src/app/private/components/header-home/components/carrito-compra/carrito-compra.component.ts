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
  @Input() carritoProducto :any;
  productoCarrito:any[] = []
  update: boolean = false
  id;
  estado;
  precioTotal:number = 0;
  constructor(private firestoreService: FirestoreService,private modalNgz: NzModalService) { }

  ngOnInit(): void {

  this.firestoreService.getCarrito().subscribe((res:any[]) => {
      res.forEach(r => {
        if(r.estado === false){
          this.estado = r
          this.carritoProducto.forEach((resp) => {
            console.log(resp);
          if (this.estado.id === resp.carritoId){
            this.productoCarrito.push(...[resp])
            this.productoCarrito.forEach((r) => {
              this.precioTotal += r[0].precio * r.quantity;
            })
          }
            })
        }
      })
  })


    
  }

  close(): void {
    this.visible = false;
    this.firestoreService.solovista.emit(this.visible);
  }

  editarProducto(item:any){
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
    this.firestoreService.deleteCarritoProducto(id)
    .then(() => console.log('PRODUCTO ELIMINADO'))
    .catch((err) => console.log(err))
  }


  updateCarrito(id:any[]){
  id.forEach(res => this.id = res.carritoId);
    this.firestoreService.updateCarrito(this.id)
    .then(r => console.log('Carrito comprado'))
    .catch(err => console.log(err));
  }

  calcularPrecio(){

  }


  
}
