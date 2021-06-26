import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from 'src/app/interface/iproducto';
import { CarritoProducto } from 'src/app/models/carrito-producto/carrito-producto.model';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';
import {map} from 'rxjs/operators'
import { ICarrito } from 'src/app/interface/carrito-interface';
import { Subscriber } from 'rxjs';

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
  cantidad:number = 0;
  curretCarrito:any[] = [];
  productosFormulario:any = [];
  carritoPendiente:any[] = [];
  currentCarritoPendiente :any = [];
  suscribe: Subscriber<any>
  carrito :any = [];
  precioTotal = 0;
  constructor(private fb: FormBuilder, private firestoreService: FirestoreService) {
   }

  ngOnInit(): void {
    this.buildFormulario();
    this.firestoreService.getCarrito().subscribe((res) => {
      this.filtrado = res.filter((r) => r.estado === false)
      if (this.filtrado.length === 0){
        console.log('Carrito a crear');
        this.firestoreService.createCarrito(null)
        .then(r => {
          console.log(r);
        })
        .catch((err) => console.log(err))
      }else if (this.filtrado.length > 0){
        console.log(this.filtrado);
        this.carritoPendiente.push(...this.filtrado)
      }
    })



  }

  ngOnChanges(): void {
    this.buildFormulario();
    this.firestoreService.getCarrito().subscribe((res) => {
      const filtrado = res.filter((r) => r.estado === false)
      this.carritoPendiente.push(...[filtrado])
    })
  }

  

  buildFormulario(){
    if (this.producto){
      this.validateForm = this.fb.group({
        id: [this.producto.id, Validators.required],
        descripcion:[this.producto.descripcion, Validators.required],
        nombre:[this.producto.nombre, Validators.required],
        precio:[this.producto.precio, Validators.required],
        seccion_Producto:[this.producto.seccion_Producto, Validators.required],
        sku:[this.producto.sku, Validators.required],
        url_image:[this.producto.url_image, Validators.required],
        cantidad:[this.cantidad, Validators.required]
    });
      this.productosFormulario.push(...[this.validateForm.value]);
      console.log(this.productosFormulario);
    }
  }

  calcularCantidad(){
    const resultado = this.producto.precio * this.cantidad;
    return resultado
  }

  async crearProductoCarrito(){
    console.log(this.filtrado);
    this.filtrado.forEach((res) => {
          if(res.estado === false){
          this.currentCarritoPendiente = res;
         const productoCarrito = new CarritoProducto(
           this.currentCarritoPendiente.id,
           this.producto.id,
           this.cantidad,
           this.productosFormulario
         )


         console.log(productoCarrito);

          // console.log(productoCarrito);
         this.firestoreService.createCarritoProducto(productoCarrito.carrito_Id,productoCarrito.productoId,productoCarrito.cantidad,productoCarrito.productos)
         .then(() => console.log('CREADO CON EXITO'))
         .catch((err) => console.log(err))
      }
    })
    }
  async editarProducto(){
  //  await this.firestoreService.createCarritoProducto(this.productoEditar.carrito_Id,this.productoEditar.productoId,this.productoEditar.cantidad,this.productoEditar[0])
  //  .then(() => console.log('CREADO CON EXITO'))
  //  .catch((err) => console.log(err))

    await this.firestoreService.getCarrito().subscribe((res) => console.log(res))
  }


}
