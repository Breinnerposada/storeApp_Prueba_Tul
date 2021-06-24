import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoginService } from '../../../../services/public/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login: boolean = false;
  constructor(public auth: AuthService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  loginWithRedirect(){
    this.auth.loginWithRedirect();
  }

  logout(){
    this.auth.logout();
  }
}
