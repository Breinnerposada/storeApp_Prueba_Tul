import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProducto, IProductoCarrito } from '../../interface/iproducto';
import {AngularFirestoreCollection} from '@angular/fire/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  @Output() solovista: EventEmitter<any> = new EventEmitter<any>() ;
  productos: Observable<any[]>;
  productosCarrito: Observable<any[]>;
  carts: Observable<IProducto[]>;

  productoCarritoCollection;
  private productoCollection: AngularFirestoreCollection<IProducto>
  private cartsCollection: AngularFirestoreCollection

  constructor(private firestore: AngularFirestore) { 

    this.productoCollection = this.firestore.collection<IProducto>("products");
    this.productoCarritoCollection = this.firestore.collection<IProductoCarrito>("product_carts");
    this.cartsCollection = this.firestore.collection("carts");
    this.getProducts();
    this.getCarrito();
    this.getCarritoProducto();
    console.log(this.productos);
  }

  //PETICION DE LA DATA
  public getProducts(){
    return this.productoCollection.valueChanges();
  }
  
  public getCarrito(){
    return this.cartsCollection.valueChanges();
  }
  public getCarritoProducto(){
      return  this.productoCarritoCollection.valueChanges()
    }

//creacion del acrrito producto
  crearCarritoProducto(carritoId: string,productoId:string,quantity:number,productos:IProducto[]):Promise<void> {
  return new Promise(async(resolve,rejects)  =>  {
      try {
        const id = this.firestore.createId();
        const data = {id, productoId, quantity, ...productos}
        const resultado = await this.productoCarritoCollection.doc(id).set(data);
        console.log(resultado);
        resolve(resultado)
      } catch (error) {
        rejects(error.message )
      }
  })
}



crearCarrito( idCarrito:string, productos:IProducto ):Promise<void>{
  return new Promise(async(resolve,rejects)  =>  {
    try {
      const id = idCarrito || Date.now().toString();
      const estado = false;
      const data = {id, estado, ...productos}
      const resultado = await this.cartsCollection.doc(id).set(data)
      resolve(resultado)
    } catch (error) {
      rejects(error.message )
    }
})
}

deleteCarritoProducto(  productoId:string  ):Promise<void> {
  return new Promise(async (resolve,reject)  => {

  try {
    const resultado = await this.productoCarritoCollection.doc(productoId).delete()
  } catch (error) {
    reject(error.message)
  }


  })



}

}
