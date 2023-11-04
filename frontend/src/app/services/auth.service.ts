import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  dataSave(email:string){
    sessionStorage.setItem('email', email);
  }

  get(){
    return sessionStorage.getItem('email');
  }

  dataRemove(){
    sessionStorage.removeItem('email');
  }

  deleteAll(){
    sessionStorage.clear();
  }
}
