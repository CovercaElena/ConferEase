// future-conferences.component.ts

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DropdownValue } from '../../DropdownValue';
import { ConferenceService } from '../services/conference.service';
import { MessageService } from 'primeng/api';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';
import {DataService, MyEventData} from "../calendar/data.service";
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {Invitation} from "../../Invitation";

@Component({
  selector: 'app-future-conferences',
  templateUrl: './future-conferences.component.html',
  styleUrls: ['./future-conferences.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe,MessageService],

})
export class FutureConferencesComponent implements OnInit {
  environment: any;
  futureConferences$!: Observable<MyEventData[]>;
  futureConferences: MyEventData[] = [];
  user!: DropdownValue;
  email!: string;
  userId!: number;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  selectedConference!: MyEventData;
  displayPendingDialog: boolean = false;
  displayApprovedDialog: boolean = false;
  displayDeclinedDialog: boolean = false;
  selectedStatus: any;
  statusOptions: any[] = [

    { label: 'Approved', value: 1 },
    { label: 'Declined', value: 2 },
    // Add more options as needed
  ];

  @ViewChild('dt1') dt1!: Table;

  constructor(
    private authService: AuthService,
    private conferenceService: ConferenceService,
    private messageService: MessageService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private dataService: DataService,
  ) {
    this.environment = environment;
    this.statusOptions= [
      { label: 'Approved', value: 1 },
      { label: 'Declined', value: 2 },

    ];
  }

  filterTable(column: string, event: any) {
    const filterValue = event.target.value;
    this.dt1.filter(filterValue, column, 'contains');
  }



  changeStatusDialog(conference: MyEventData) {
    this.selectedConference = conference;

    // Show the appropriate dialog based on the status
    if (conference.statusId === 0) {
      this.displayPendingDialog = true;
    } else if (conference.statusId === 1) {
      this.displayApprovedDialog = true;
    } else if (conference.statusId === 2) {
      this.displayDeclinedDialog = true;
    }
  }

  // Method to handle the approval of the conference
  approveConference(conference: MyEventData) {
   let newConference = conference;
    newConference.statusId = 1;
    console.log(newConference);
    this.changeStatus(newConference);
    this.displayApprovedDialog = false;
  }

  // Method to handle the decline of the conference
  declineConference(conference: MyEventData) {
    let newConference = conference;
    newConference.statusId = 2;
    console.log(newConference);
    this.changeStatus(newConference);
    this.displayDeclinedDialog = false;
  }
  changeStatus2(conference: MyEventData, status: number) {
    console.log(status);
    let newConference = conference;
    newConference.statusId = status;
    this.changeStatus(newConference);
    this.cancelChangeStatus();
  }

  // Method to handle the cancellation of the status change
  cancelChangeStatus() {
    // Reset the selected status and close all dialogs
    this.selectedStatus = null;
    this.displayPendingDialog = false;
    this.displayApprovedDialog = false;
    this.displayDeclinedDialog = false;
  }

  changeStatus(conference: MyEventData) {
    let invite:Invitation=new Invitation();
    // @ts-ignore
    invite.meetId=conference.id as number;
    // @ts-ignore
    invite.statusId=conference.statusId;
    // @ts-ignore
    invite.email=this.socialUser.email;
    // @ts-ignore
    console.log(invite);
// @ts-ignore
    this.dataService.updateInvite(invite).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          key: 'top-right',
          severity: 'success',
          summary: 'Success',
          detail: 'Status updated successfully',
          life: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          key: 'top-right',
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error updating the status',
          life: 3000,
        });
      }
    );
  }

  ngOnInit(): void {
    this.environment = environment;
    this.socialAuthService.authState.subscribe(async (user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);

      if (user && user.email) {
        this.futureConferences$ = this.conferenceService.getConferences(2, user.email);

        this.futureConferences$.subscribe(
          (futureConferences) => {
            this.futureConferences = futureConferences;
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              key: 'top-right',
              severity: 'error',
              summary: 'Error',
              detail: 'There was an error trying to retrieve future conferences',
              life: 3000,
            });
          }
        );
      }
    });
  }
}
