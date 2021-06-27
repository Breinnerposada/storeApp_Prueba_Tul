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
  carritoProducto :any[] = [];
  productoCarrito:any[] = []
  currentProductoCarrito:any[] = []
  update: boolean = false
  id;
  estado;
  precioTotal:number = 0;
    
    constructor(private firestoreService: FirestoreService,private modalNgz: NzModalService) { }

  ngOnInit(): void {
  
    this.firestoreService.getCarritoProducto().subscribe(r => {
      this.carritoProducto.push(...r)
      this.firestoreService.productoSeleccionado.subscribe((r) => {
        console.log('suscripcion');
        console.log(r);
      })
    })

    this.initOberservable();



  }

  ngOnChanges(): void {
    //this.firestoreService.getCarritoProducto().subscribe(r => this.carritoProducto.push(...r))
  //  this.initOberservable();

    //console.log('soy el onchange');
  }

  initOberservable(){
    this.productoCarrito = [];
   this.carritoProducto = [];
    if(this.carritoProducto){
      this.firestoreService.getCarrito().subscribe((res:any[]) => {
        res.forEach(r => {
          if(r.estado === false){
            this.estado = r
            this.carritoProducto.forEach((resp) => {
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
    console.log(id);
    this.firestoreService.deleteCarritoProducto(id)
    .then((r) => {
      console.log(this.productoCarrito);
    })
    .catch((err) => console.log(err))

    
  }


  updateCarrito(id:any[]){
  id.forEach(res => this.id = res.carritoId);
    this.firestoreService.updateCarrito(this.id)
      .then(r => {
        this.close()
        window.location.reload()
      })
      .catch(err => console.log(err));
  }

  calcularPrecio(){

  }


  
}
