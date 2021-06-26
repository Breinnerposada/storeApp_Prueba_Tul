import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FirestoreService } from '../../../services/firestore/firestore.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  visible = false;
  estado;
  contenidoCarrito :any;
  @Input() productos:any;
  @Input() carritoProducto:any[] = [];
  currentCarritoProducto:any[] = []
  constructor(public auth: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.solovista.subscribe((resp) => {
      this.visible = resp;
    })

    this.firestoreService.getCarrito().subscribe((res:any[]) => {
      res.forEach(r => {
        if(r.estado === false){
          this.estado = r
          this.carritoProducto.forEach((resp) => {
          if (this.estado.id === resp.carritoId){
            console.log(resp);
            this.currentCarritoProducto.push(...[resp])
          }
          })
        }
      })
  })

  }

  logout(){
    this.auth.logout();
  }



  open(): void {
    this.visible = true;
  }



}
