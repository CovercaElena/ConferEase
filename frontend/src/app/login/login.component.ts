import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {SplitterModule} from 'primeng/splitter';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../environment";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
        this.environment = environment;
    }


    ngOnInit(): void {
        this.environment = environment;
        this.initializeFormGroupLogin();
    }

    environment: any;
    email!: string;
    loginFormGroup!: FormGroup;

    private initializeFormGroupLogin() {
        this.loginFormGroup = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

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

    login() {
        this.email = this.loginFormGroup.controls['email'].value;
        console.log(this.email);
        this.dataSave(this.email);
        this.router.navigate(['home']);
    }


}
