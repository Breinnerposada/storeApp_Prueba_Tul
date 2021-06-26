import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from 'src/app/interface/iproducto';
import { CarritoProducto } from 'src/app/models/carrito-producto/carrito-producto.model';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';
import {map} from 'rxjs/operators'
import { ICarrito } from 'src/app/interface/carrito-interface';

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
  cantidad:number = 0;
  curretCarrito:any[] = [];
  productosFormulario:any = [];
  carritoPendiente:any[] = [];
  carrito :any = [];
  precioTotal = 0;
  constructor(private fb: FormBuilder, private firestoreService: FirestoreService) {
   }

  ngOnInit(): void {
    console.log(this.productoEditar);
    this.buildFormulario();
    this.firestoreService.getCarrito().subscribe((res) => {
      this.carritoPendiente.push(...res)
    })

    console.log(this.carritoPendiente);
  }

  ngOnChanges(): void {
    this.buildFormulario();
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
      if ((this.carritoPendiente.length === 0)){
            await  this.firestoreService.crearCarrito(null,this.productosFormulario)
            .then((resp) => {
              this.carritoPendiente = resp[0].id;
            })
            .catch((err) => console.log(err))

            if (this.carritoPendiente[0].estado === false){
              const productoCarrito = new CarritoProducto(
                this.carritoPendiente[0].id,
                this.producto.id,
                this.cantidad,
                this.productosFormulario
              )
              this.firestoreService.crearCarritoProducto(productoCarrito.carrito_Id,productoCarrito.productoId,productoCarrito.cantidad,productoCarrito.productos)
              .then((resp) => console.log(resp))
              .catch((err) => console.log(err))
            }
    }else {
        const productoCarrito = new CarritoProducto(
          this.carritoPendiente[0].id,
          this.producto.id,
          this.cantidad,
          this.productosFormulario
        )
        this.firestoreService.crearCarritoProducto(productoCarrito.carrito_Id,productoCarrito.productoId,productoCarrito.cantidad,productoCarrito.productos)
        .then(() => console.log('CREADO CON EXITO'))
        .catch((err) => console.log(err))
      }
        

  }


  async editarProducto(){
    await this.firestoreService.crearCarritoProducto(this.productoEditar.carrito_Id,this.productoEditar.productoId,this.productoEditar.cantidad,this.productoEditar[0])
    .then(() => console.log('CREADO CON EXITO'))
    .catch((err) => console.log(err))
  }


}
