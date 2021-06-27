import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProducto, IProductoCarrito } from '../../interface/iproducto';
import {AngularFirestoreCollection} from '@angular/fire/firestore'
import { map } from 'rxjs/operators';
import { createHostListener } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  @Output() solovista: EventEmitter<any> = new EventEmitter<any>() ;
  @Output() productoSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  productos: Observable<any[]>;
  productosCarrito: Observable<any[]>;
  carts: Observable<IProducto[]>;
  resultado;
  productoEmitido:any[] = []

  private productoCarritoCollection: AngularFirestoreCollection
  private productoCollection: AngularFirestoreCollection<IProducto>
  private cartsCollection: AngularFirestoreCollection

  constructor(private firestore: AngularFirestore) { 

    this.productoCollection = this.firestore.collection<IProducto>("products");
    this.productoCarritoCollection = this.firestore.collection<IProductoCarrito>("product_carts");
    this.cartsCollection = this.firestore.collection("cart");
    this.getProducts();
    this.getCarrito();
    this.getCarritoProducto();
  }

  //PETICION DE LA DATA
  public getProducts(){
    return this.productoCollection.valueChanges();
  }
   
  
  public getCarrito(){
    return this.cartsCollection.valueChanges();
  }
  public getCarritoProducto(){
    return this.productoCarritoCollection.valueChanges()
  }

//creacion del carrito producto
  createCarritoProducto(carritoId: string,productoId:string,quantity:number,productos:IProducto[]):Promise<void> {
  return new Promise(async(resolve,rejects)  =>  {
      try {
        const id = productoId || this.firestore.createId();
        const data = {id,carritoId, productoId, quantity, ...productos}
        const resultado = await this.productoCarritoCollection.doc(id).set(data);
        console.log(resultado);
        resolve(resultado)
      } catch (error) {
        rejects(error.message )
      }
  })
}



createCarrito( idCarrito:string):Promise<void>{
  return new Promise(async(resolve,rejects)  =>  {
    try {
      const id = idCarrito || Date.now().toString();
      const estado = false;
      const data = {id, estado}
      const resultado = await this.cartsCollection.doc(id).set(data)
      resolve(resultado)
    } catch (error) {
      rejects(error.message )
    }
})
}

  //ELIMINACION DE LOS PRODUCTOS
deleteCarritoProducto(  productoId:string  ):Promise<void> {
  console.log(productoId);
  return new Promise(async (resolve,reject)  => {
  try {
    this.resultado = await this.productoCarritoCollection.doc(productoId).delete()
    .then( () => {
    resolve(this.resultado)
    console.log(this.resultado);
    }
    )
  } catch (error) {
    reject(error.message)
    console.log(this.resultado);
  }
  })
}


  //EDICION DEL CARRITO (CAMBIO DE ESTADO) 

  updateCarrito(idCarrito){
    console.log(idCarrito);
    return new Promise(async(resolve,rejects)  =>  {
      try {
        const id = idCarrito;
        const estado = true;
        const data = {id, estado}
        const resultado = await this.cartsCollection.doc(id).update(data); 
        resolve(resultado)
      } catch (error) {
        rejects(error.message )
      }
  })
  }


}
