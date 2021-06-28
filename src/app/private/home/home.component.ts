import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { IProducto } from 'src/app/interface/iproducto';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos:any[] = [];
  carritoProducto:any[] = [];
  productosSaludables:any[] = []
  carrito:any[] = [];
  productoChatarra:any[] = []
  elementActive = false;

  constructor(public auth: AuthService, private fireDataBase: FirestoreService) { }

  ngOnInit(): void { 

    //CAPTURACION DE LOS PRODUCTOS
    this.fireDataBase.getProducts().subscribe((res:any) => {
      this.productos = res.map((m:any) => {
        return {
          descripcion : m.payload.doc.data().descripcion,
          id: m.payload.doc.data().id,
          nombre : m.payload.doc.data().nombre ,
          precio: m.payload.doc.data().precio,
          score: m.payload.doc.data().score,
          seccion_producto: m.payload.doc.data().seccion_producto,
          sku: m.payload.doc.data().sku,
          url_image: m.payload.doc.data().url_image
        }
      })
      console.log(this.productos);
     
      this.productosSaludables = this.productos.filter((r) => r.seccion_producto === 2);
      this.productoChatarra = this.productos.filter((m) => m.seccion_producto === 1);
      console.log('chatarra',this.productoChatarra);
      console.log('saludable',this.productosSaludables);

    })

    //CAPTURA DE DATOS CARRITO PRODUCTOS
    this.fireDataBase.getCarritoProducto()
    .subscribe((res:any) => {
      this.carritoProducto = res.map((m:any) => {
        return {
          carritoId: m.payload.doc.data().carritoId,
          productoId: m.payload.doc.data().productoId,
          quantity: m.payload.doc.data().quantity,
          productos: m.payload.doc.data().productos
        }

      })
      console.log(this.carritoProducto);

    })


    //CAPTURA DE LOS DATOS DEL CARRITO 

  }
}
