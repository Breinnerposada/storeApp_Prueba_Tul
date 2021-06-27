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
  productosFormulario:any = [];
  carritoPendiente:any[] = [];
  currentCarritoPendiente :any = [];
  currentProducto :any[] = []
  suscribe: Subscriber<any>
  carrito :any = [];
  precioTotal = 0;
  constructor(private fb: FormBuilder, private firestoreService: FirestoreService,private modal: NzModalRef,private message: NzMessageService) {
   }

  ngOnInit(): void {
    console.log(this.productoEditar);

    if(this.producto){
      this.currentProducto.push(...[this.producto])
      this.producto = this.currentProducto
      console.log(this.producto);
    }

  this.initObservable()
    
    if(this.productoEditar){
      console.log('es igual');
      this.producto = this.productoEditar;
      console.log(this.producto);
    }
    
    this.buildFormulario();
    
    
  }

  ngOnChanges(): void {
    this.buildFormulario();
    this.firestoreService.getCarrito().subscribe((res) => {
      const filtrado = res.filter((r) => r.estado === false)
      this.carritoPendiente.push(...[filtrado])
    })
  }


 
  initObservable(){
    this.carritoPendiente = [];
    this.firestoreService.getCarrito().subscribe((res) => {
      this.filtrado = res.filter((r) => r.estado === false)
      if (this.filtrado.length === 0){
        this.firestoreService.createCarrito(null)
        .then(r => {
        })
        .catch((err) => console.log(err))
      }else if (this.filtrado.length > 0){
        this.carritoPendiente.push(...this.filtrado)
      }
    })
        
  }


  buildFormulario(){
    console.log(this.producto);
    if (this.producto){
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
  }

  calcularCantidad(){
    const resultado = this.producto[0].precio * this.cantidad;
    return resultado
  }

  sumarCantidad(){
    this.cantidad = this.cantidad + 1;
    this.calcularCantidad()
    console.log(this.cantidad); 
}
  restarCantidad(){
    this.cantidad = this.cantidad - 1;
    this.calcularCantidad()
    console.log(this.cantidad); 
}



  async crearProductoCarrito(){
    this.filtrado.forEach((res) => {
          if(res.estado === false){
          this.currentCarritoPendiente = res;
          console.log(this.productosFormulario);
        const productoCarrito = new CarritoProducto(
          this.currentCarritoPendiente.id,
          this.producto[0].id,
          this.cantidad,
          this.productosFormulario
        )
        console.log(productoCarrito);
        console.log(productoCarrito);
        this.firestoreService.createCarritoProducto(productoCarrito.carrito_Id,productoCarrito.productoId,productoCarrito.cantidad,productoCarrito.productos)
        .then((resp) => {
        this.firestoreService.getCarritoProducto().subscribe((r) => this.firestoreService.productoSeleccionado.emit(r));
        this.modal.destroy()
        window.location.reload()
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
        console.log('All completed!');
      });
  }


}
