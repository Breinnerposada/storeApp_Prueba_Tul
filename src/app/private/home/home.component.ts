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

  constructor(public auth: AuthService, private fireDataBase: FirestoreService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.productos);
  }

    
  async getProducts(){
    await this.fireDataBase.getProducts().subscribe((resp) => {
      resp.forEach((prod: any) => {
       this.productos.push(...[prod])
      })
    })
  }
}
