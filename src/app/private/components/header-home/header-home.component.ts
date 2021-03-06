import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  visible = false;
  visibleCarrito = false;
  estado;
  contenidoCarrito :any;
  usuario: any[] = []
  @Input() productos:any;
  carrito:any[] = [];
  @Input() carritoProducto:any[] = [];
  currentCarritoProducto:any[] = []
  constructor(public auth: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  this.auth.user$.subscribe(r => {
    this.usuario.push(r)
  })

  
  this.firestoreService.solovista.subscribe((resp) => {
    this.visible = resp;
  })

  this.firestoreService.carritoVisible.subscribe((r) => this.visibleCarrito = r)
  
  this.firestoreService.getCarrito()
      .subscribe((res:any)=> {
        this.carrito = res.map((m) => {
            return {
              estado: m.payload.doc.data().estado,
              id: m.payload.doc.data().id
            }
          }
        )
        this.firestoreService.getCarritoProducto()
          .subscribe((r) => {
          this.carritoProducto = r.map((m) => {
          return{
            carritoId: m.payload.doc.data().carritoId, 
            productoId: m.payload.doc.data().productoId,
            quantity: m.payload.doc.data().quantity,
            productos: m.payload.doc.data().productos
            }
          })
          const filtradoEstado = this.carrito.filter((r) => r.estado === false)
          if(filtradoEstado.length > 0){
            this.currentCarritoProducto = this.carritoProducto.filter((r)=> r.carritoId === filtradoEstado[0].id)
          }
        }
        )
      })
  }

  logout(){
    this.auth.logout();
  }



  open(): void {
    this.visible = true;
  }

  openCarrito(): void {
    this.visibleCarrito = true;
  }



}
