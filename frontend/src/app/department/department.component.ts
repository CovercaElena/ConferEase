// department-conferences.component.ts

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DropdownValue } from '../../DropdownValue';
import { ConferenceService } from '../services/conference.service';
import { MessageService } from 'primeng/api';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import { MyEventData } from "../calendar/data.service";
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class DepartmentComponent implements OnInit {
  environment: any;
  departmentConferences$!: Observable<MyEventData[]>;
  departmentConferences: MyEventData[] = [];
  user!: DropdownValue;
  email!: string;
  userId!: number;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  selectedConference: MyEventData | null = null; // Declare and initialize selectedConference

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
        // Retrieve user details including department
        this.conferenceService.getUser(user.email).subscribe(
            (userData) => {
              this.user = userData;
              // Fetch department conferences
              // @ts-ignore
              this.departmentConferences$ = this.conferenceService.getDepartmentConfs(this.user.department);

              this.departmentConferences$.subscribe(
                  (departmentConferences) => {
                    this.departmentConferences = departmentConferences;
                  },
                  (error) => {
                    console.log(error);
                    this.messageService.add({
                      key: 'top-right',
                      severity: 'error',
                      summary: 'Error',
                      detail: 'There was an error trying to retrieve department conferences',
                      life: 3000,
                    });
                  }
              );
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                key: 'top-right',
                severity: 'error',
                summary: 'Error',
                detail: 'There was an error trying to retrieve user details',
                life: 3000,
              });
            }
        );
      }
    });
  }
}
