import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {DropdownValue} from '../../DropdownValue';
import {ConferenceService} from '../services/conference.service';
import {MessageService} from 'primeng/api';
import {environment} from '../environment';
import {Router} from '@angular/router';
import {SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import {forkJoin, Observable} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    environment: any;
    pastConferences$!: Observable<DropdownValue[]>;
    futureConferences$!: Observable<DropdownValue[]>;
    pastConferences: DropdownValue[] = [];
    futureConferences: DropdownValue[] = [];
    user!: DropdownValue;
    email!: string;
    userId!: number;
    socialUser!: SocialUser;
    isLoggedin?: boolean;
  now = new Date();
  tmp=this.now.toString();


  constructor(
        private authService: AuthService,
        private conferenceService: ConferenceService,
        private messageService: MessageService,
        private router: Router,
        private socialAuthService: SocialAuthService
    ) {
        this.environment = environment;
    this.now = new Date();
    this.tmp=this.now.toString();


  }

    ngOnInit() {
        this.environment = environment;
      this.now = new Date();
      this.tmp=this.now.toString();
        this.socialAuthService.authState.subscribe(async (user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
            console.log(this.socialUser);

            if (user && user.email) {
                this.pastConferences$ = this.conferenceService.getConferences(
                    1,
                    user.email
                );
                this.futureConferences$ = this.conferenceService.getConferences(
                    2,
                    user.email
                );

                // Combine the two observables and subscribe to them separately
                forkJoin([
                    this.pastConferences$,
                    this.futureConferences$,
                ]).subscribe(
                    ([pastConferences, futureConferences]) => {
                        this.pastConferences = pastConferences;
                        this.futureConferences = futureConferences;
                    },
                    (error) => {
                        console.log(error);
                        this.messageService.add({
                            key: 'top-right',
                            severity: 'error',
                            summary: 'Error',
                            detail: 'There was an error trying to retrieve conferences',
                            life: 3000,
                        });
                    }
                );
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

    async getUserDetails(email: string) {
        return new Promise<void>((resolve, reject) => {
            this.conferenceService.getUser(email).subscribe({
                next: (data) => {
                    this.user = data;
                    console.log(this.user);
                    resolve();
                },
                error: (error) => {
                    console.log(error);
                    this.messageService.add({
                        key: 'top-right',
                        severity: 'error',
                        summary: 'Error',
                        detail: 'There was an error trying to retrieve the user details',
                        life: 3000,
                    });
                    reject();
                },
            });
        });
    }

    protected readonly SocialUser = SocialUser;
}
