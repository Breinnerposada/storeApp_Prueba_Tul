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

  crearCarritoProducto(carritoId: number,productoId:string,quantity:number,productos:[]) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection("product_carts")
      .add({carritoId,productoId,quantity,productos})
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err))
  })
}

  getCarritoProducto(){
    return this.firestore.collection("product_carts").valueChanges();
  }

  deleteCarritoProducto(productoId:any) {
    console.log(productoId);
   return this.firestore.collection("product_carts")
   .doc(productoId).delete()
   .then(() => console.log('Eliminado'))
   .catch((err) => console.log(err))
  }


  listarCarrito(){
     return this.firestore.collection("carts").valueChanges();
  }

  crearCarrito(){
    const id = Date.now()
    const status = false;
    return new Promise<any>((resolve,reject) => {
      this.firestore.collection("carts")
     .add({id,status})
     .then((resp) => console.log(resp))
     .catch((err) => console.log(err))
    })
  }
  

  updateCarritoCompra(data){
    return this.firestore.collection("carts")
    .doc(data.payload.doc.id)
    .set({status: true});
  }


}
