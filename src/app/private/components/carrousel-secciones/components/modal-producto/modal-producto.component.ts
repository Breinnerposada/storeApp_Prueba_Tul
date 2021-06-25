import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from 'src/app/interface/iproducto';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {
  @Input() producto:any;
  validateForm!: FormGroup;
  isVisible = false;
  isConfirmLoading = false;
  cantidad = 1;
  precioTotal = 0;
  constructor(private fb: FormBuilder, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.agregarProducto();
    this.firestoreService.carritoActualizado.emit(this.producto);
  }
  ngOnChanges(): void {
    this.calcularPrecio()
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();} 
 }

 buildFormulario(){

 }


calcularPrecio(){
  if (this.producto){
    console.log('cambio');
     return this.precioTotal = this.cantidad * this.producto.precio;
  }
  return;
}

async agregarProducto(){
 await this.firestoreService.getCarritoProducto().subscribe((resp:any) => {
 });
}
async crearCarritoProducto(){
 await this.firestoreService.crearCarritoProducto(this.producto)
  .then((resp)=> console.log(resp))
 .catch((err) => console.log(err))
}

async borrarCarrito(){
  await this.firestoreService.deleteCarrito(this.producto)
  .then((resp)=> console.log(resp))
  .catch((err) => console.log(err))
}

}
