import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  @Output() carritoActualizado: EventEmitter<any> = new EventEmitter<any>();

  constructor(private firestore: AngularFirestore) { }

  //TRAER TODOS LOS PRODUCTOS
  public getProducts(){
    return this.firestore.collection('products').valueChanges();
  }

  crearCarritoProducto(carrito: any) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection(" product_carts")
        .add(carrito)
        .then(resolve => console.log(resolve))
        .catch(reject => console.log(reject))
    });
    
  }


  getCarritoProducto(){
    return this.firestore.collection(" product_carts").valueChanges();
  }

  deleteCarrito(carrito: any) {
    console.log(carrito);
    return this.firestore
      .collection(" product_carts")
      .doc('/NFUIHDO806kh6qgEGiu3')
      .delete();
  }

  


}
