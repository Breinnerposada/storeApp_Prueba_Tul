import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IProducto } from 'src/app/interface/iproducto';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos:any[] = [];
  carritoProducto:any[] = [];
  elementActive = false;

  constructor(public auth: AuthService, private fireDataBase: FirestoreService) { }

  ngOnInit(): void { 

    //CAPTURACION DE LOS PRODUCTOS
    this.fireDataBase.getProducts().subscribe((res:any) => {
      this.productos.push(...res)
    })

    //CAPTURA DE DATOS CARRITO PRODUCTOS
    this.fireDataBase.getCarritoProducto().subscribe((res) => {
      this.carritoProducto.push(...res)
    })
    console.log(this.carritoProducto);
  }
}
