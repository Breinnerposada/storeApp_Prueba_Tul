import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  //TRAER TODOS LOS PRODUCTOS
  public getProducts(){
    return this.firestore.collection('products').valueChanges();
  }

  


}
