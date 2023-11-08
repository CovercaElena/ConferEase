import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {DropdownValue} from "../../DropdownValue";
import {ConferenceService} from "../services/conference.service";
import {MessageService} from "primeng/api";
import {environment} from "../environment";
import {Router} from "@angular/router";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(private authService: AuthService, private conferenceService: ConferenceService, private messageService: MessageService, private router: Router, private socialAuthService: SocialAuthService) {
        this.environment = environment;
    }

    environment: any;
    pastConferences: DropdownValue[] = [];
    futureConferences: DropdownValue[] = [];
    user!: DropdownValue;
    email!: string;
    socialUser!: SocialUser;
    isLoggedin?: boolean;


    ngOnInit(): void {
        this.environment = environment;
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
            console.log(this.socialUser);
            if (user && user.email) {
                this.getCustomerDetails(user.email);
                this.getPastConferences();
                this.getFutureConferences();
            }
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

    getPastConferences() {

    }

    getFutureConferences() {

    }

    getCustomerDetails(email: string) {
        this.conferenceService.getUser(email).subscribe({
            next: data => {
                this.user = data;
                console.log(this.user);
            },
            error: error => {
                console.log(error);
                this.messageService.add({
                    key: 'top-right',
                    severity: 'error',
                    summary: 'Error',
                    detail: 'There was an error trying to retrieve the user details',
                    life: 3000,
                });
            },
        });

    }


}
