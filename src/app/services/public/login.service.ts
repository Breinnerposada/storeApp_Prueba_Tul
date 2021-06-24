import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output() login: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
}
