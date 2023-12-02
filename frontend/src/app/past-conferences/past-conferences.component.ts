import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DropdownValue } from '../../DropdownValue';
import { ConferenceService } from '../services/conference.service';
import { MessageService } from 'primeng/api';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { forkJoin, Observable } from 'rxjs';
import { MyEventData } from "../calendar/data.service";
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-past-conferences',
  templateUrl: './past-conferences.component.html',
  styleUrls: ['./past-conferences.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class PastConferencesComponent implements OnInit {
  environment: any;
  pastConferences$!: Observable<MyEventData[]>;
  pastConferences: MyEventData[] = [];
  user!: DropdownValue;
  email!: string;
  userId!: number;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  selectedConference!: MyEventData;

  @ViewChild('dt1') dt1!: Table;
  constructor(
      private authService: AuthService,
      private conferenceService: ConferenceService,
      private messageService: MessageService,
      private router: Router,
      private socialAuthService: SocialAuthService

  ) {
    this.environment = environment;
  }
  filterTable(column: string, event: any) {
    const filterValue = event.target.value;
    this.dt1.filter(filterValue, column, 'contains');
  }

  ngOnInit(): void {
    this.environment = environment;
    this.socialAuthService.authState.subscribe(async (user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);

      if (user && user.email) {
        this.pastConferences$ = this.conferenceService.getConferences(1, user.email);

        this.pastConferences$.subscribe(
            (pastConferences) => {
              this.pastConferences = pastConferences;
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                key: 'top-right',
                severity: 'error',
                summary: 'Error',
                detail: 'There was an error trying to retrieve past conferences',
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
