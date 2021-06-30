import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-carrito',
  templateUrl: './lista-carrito.component.html',
  styleUrls: ['./lista-carrito.component.scss']
})
export class ListaCarritoComponent implements OnInit {
  @Input() visibleCarrito;
  @Input() carrito;

  constructor() { }

  ngOnInit(): void {
    console.log(this.carrito);
  }

  close(){

  }

}
