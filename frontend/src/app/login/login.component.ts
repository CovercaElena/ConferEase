import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {SplitterModule} from 'primeng/splitter';
import {FormBuilder,FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private fb:FormBuilder) {
  }
  email!:String;
  loginFormGroup!:FormBuilder;


  dataSave(email: string) {
    return this.authService.dataSave(email);
  }

  get() {
    return this.authService.get();
  }

  dataRemove() {
    return this.authService.dataRemove();
  }

  deleteAll() {
    return this.authService.deleteAll();
  }

  Login()
  {

  }

}
