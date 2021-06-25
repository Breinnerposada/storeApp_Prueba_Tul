import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: any = [];
  carritoProducto: any = []
   elementActive = false;

  constructor(public auth: AuthService, private fireDataBase: FirestoreService) { }

  ngOnInit(): void {
    this.getProducts();
    this.listarCarritoProducto()
    console.log(this.carritoProducto);
  }

    
  async getProducts(){
    await this.fireDataBase.getProducts().subscribe((resp) => {
      resp.forEach((prod: any) => {
        setTimeout(()=> {
          this.productos.push(...[prod])
        },1500)
      })
    })
  }

  
async listarCarritoProducto(){
  await this.fireDataBase.getCarritoProducto().subscribe((resp) => {
    resp.forEach((carritoProducto) => {
      this.carritoProducto.push(...[carritoProducto]);
      console.log(this.carritoProducto);
    })
  })
}
}
