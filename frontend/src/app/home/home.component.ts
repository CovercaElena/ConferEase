import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) {}
  dataSave(email:string){
    return this.authService.dataSave(email);
  }

  get(){
    return this.authService.get();
  }

  dataRemove(){
    return this.authService.dataRemove();
  }

  deleteAll(){
    return this.authService.deleteAll();
  }

}
