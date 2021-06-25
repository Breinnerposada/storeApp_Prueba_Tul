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
  contador = 0;
  contenidoCarrito :any;
  @Input() productos:any;
  constructor(public auth: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  console.log(this.productos);
  console.log(this.contador);
  }

  logout(){
    this.auth.logout();
  }



  open(): void {
    this.visible = true;
  }



}
