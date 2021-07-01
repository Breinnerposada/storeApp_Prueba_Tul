import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../../services/firestore/firestore.service';

@Component({
  selector: 'app-lista-carrito',
  templateUrl: './lista-carrito.component.html',
  styleUrls: ['./lista-carrito.component.scss']
})
export class ListaCarritoComponent implements OnInit {
  @Input() visibleCarrito;
  @Input() carrito;

  value = [4,3,5,7,8,7,10]
  constructor(private _fireStoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  close(){
  this.visibleCarrito = false
  this._fireStoreService.carritoVisible.emit(this.visibleCarrito)
  }
}
