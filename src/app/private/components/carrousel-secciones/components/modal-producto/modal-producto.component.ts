import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from 'src/app/interface/iproducto';
import { CarritoProducto } from 'src/app/models/carrito-producto/carrito-producto.model';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';
import { Subscriber } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {
  @Input() productoEditar:any;
  @Input() producto:any;
  @Input() update:any;
  validateForm:FormGroup;
  isVisible = false;
  isConfirmLoading = false;
  filtrado:any[] = [];
  cantidad:number = 1;
  curretCarrito:any[] = [];
  carrito:any[] = [];
  productosFormulario:any = [];
  carritoPendiente:any[] = [];
  currentCarritoPendiente :any = [];
  currentProducto :any[] = []
  productos;
  filtradoEstado
  productoCarrito;
  resultado
  suscribe: Subscriber<any>
  precioTotal = 0;
  constructor(private fb: FormBuilder, private firestoreService: FirestoreService,private modal: NzModalRef,private message: NzMessageService) {
   }

  ngOnInit(): void {
    if(this.producto){
      this.currentProducto.push(...[this.producto])
      this.producto = this.currentProducto
    }
    if(this.productoEditar){
      this.producto = this.productoEditar;
      this.cantidad = this.producto.quantity
    }
    
    this.initObservable();
    this.buildFormulario();
    
    
  }

  ngOnChanges(): void {
   // this.buildFormulario();
  }


 
  initObservable(){
    this.firestoreService.getCarrito()
    .subscribe((res:any)=> {
      this.carrito = res.map((m) => {
          return {
            estado: m.payload.doc.data().estado,
            id: m.payload.doc.data().id
          }
        }) 
        this.filtradoEstado = this.carrito.filter((r) => r.estado === false);
        this.filtrado = this.carrito.filter((r) => r.estado === false)
      })
      

    


  }


  buildFormulario(){
    if (!this.productoEditar){
      this.validateForm = this.fb.group({
        id: [this.producto[0].id, Validators.required],
        descripcion:[this.producto[0].descripcion, Validators.required],
        nombre:[this.producto[0].nombre, Validators.required],
        precio:[this.producto[0].precio, Validators.required],
        seccion_Producto:[this.producto[0].seccion_Producto, Validators.required],
        sku:[this.producto[0].sku, Validators.required],
        url_image:[this.producto[0].url_image, Validators.required],
        cantidad:[this.cantidad, Validators.required]
    });
      this.productosFormulario.push(...[this.validateForm.value]);
    }
    if (this.productoEditar){
      this.validateForm = this.fb.group({
        id: [this.producto.productos.id, Validators.required],
        descripcion:[this.producto.productos.descripcion, Validators.required],
        nombre:[this.producto.productos.nombre, Validators.required],
        precio:[this.producto.productos.precio, Validators.required],
        seccion_Producto:[this.producto.productos.seccion_Producto, Validators.required],
        sku:[this.producto.productos.sku, Validators.required],
        url_image:[this.producto.productos.url_image, Validators.required],
        cantidad:[this.cantidad, Validators.required]
    });
      this.productosFormulario.push(...[this.validateForm.value]);
    }
  }

  calcularCantidad(){
    if(this.productoEditar)[
       this.resultado = this.producto.productos.precio * this.cantidad
    ]
    if(!this.productoEditar)[
       this.resultado = this.producto[0].precio * this.cantidad
      ]
      return this.resultado
  }
  sumarCantidad(){
    this.cantidad = this.cantidad + 1;
    this.calcularCantidad()
}
  restarCantidad(){
    this.cantidad = this.cantidad - 1;
    this.calcularCantidad()
}



  async crearProductoCarrito(){
    if (this.filtradoEstado.length === 0){
      this.firestoreService.createCarrito(null)
      .then(() =>{
      })
      this.filtrado = this.carrito.filter((r) => r.estado === false)
    }
      this.filtrado.forEach((res) => {
          if(res.estado === false){
          this.currentCarritoPendiente = res;
          if(this.productoEditar){
            this.productoCarrito = new CarritoProducto(
              this.currentCarritoPendiente.id,
              this.producto.productos.id,
              this.cantidad,
              this.productosFormulario[0]
            )
          }
          if(this.productoEditar === undefined){
            this.productoCarrito = new CarritoProducto(
              this.currentCarritoPendiente.id,
              this.producto[0].id,
              this.cantidad,
              this.productosFormulario[0]
            )
          }
        this.firestoreService.createCarritoProducto(this.productoCarrito.carrito_Id,this.productoCarrito.productoId,this.productoCarrito.cantidad,this.productoCarrito.productos)
        .then((resp) => {
        console.log(this.productosFormulario);
        this.modal.destroy()
      })
      .catch((err) => console.log(err))
        this.startShowMessages()
      }
    })
    }

  startShowMessages(): void {
    this.message
      .loading('Guardando Producto', { nzDuration: 50 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Loading finished', { nzDuration: 50 }).onClose!),
        concatMap(() => this.message.info('Loading finished is finished', { nzDuration: 50 }).onClose!)
      )
      .subscribe(() => {
      });
  }


}
