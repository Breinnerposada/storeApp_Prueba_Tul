import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { LoginService } from '../../services/public/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  observadorLogin: any;
  constructor(public auth: AuthService, private fireDataBase: FirestoreService) {}

  ngOnInit(): void {

  }

    
  submitForm(): void {
    
  }

}
