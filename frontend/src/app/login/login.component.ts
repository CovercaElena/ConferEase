import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {SplitterModule} from 'primeng/splitter';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../environment";
import {Router} from "@angular/router";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private socialAuthService: SocialAuthService) {
        this.environment = environment;
    }


     ngOnInit() {
        this.environment = environment;
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
            console.log(this.socialUser);
            if (user && user.email) {
                // @ts-ignore
              this.router.navigate(['home']);
            }
        });
        this.initializeFormGroupLogin();


    }

    environment: any;
    email!: string;
    loginFormGroup!: FormGroup;
    socialUser!: SocialUser;
    isLoggedin?: boolean;

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
        console.log('Login button clicked');

        console.log(this.email);
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
            console.log(this.socialUser);
        });

        this.router.navigate(['home']);
    }

    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.login();
    }


}
