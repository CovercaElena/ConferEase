// public.component.ts

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConferenceService } from '../services/conference.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MyEventData ,DataService} from '../calendar/data.service';
// public.component.ts

// ... (existing imports)

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PublicComponent implements OnInit {
  publicConferences$!: Observable<MyEventData[]>;
  publicConferences: MyEventData[] = [];
  displayDetailsDialog: boolean = false;
  selectedConference: MyEventData | null = null;

  constructor(
    private conferenceService: ConferenceService,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Fetch public conferences
    this.publicConferences$ = this.conferenceService.getPublicConferences();

    this.publicConferences$.subscribe(
      (publicConferences) => {
        this.publicConferences = publicConferences;
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          key: 'top-right',
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error trying to retrieve public conferences',
          life: 3000,
        });
      }
    );
  }

  showDetailsDialog(conference: MyEventData) {
    this.selectedConference = conference;
    this.displayDetailsDialog = true;
  }

  approveConference(conference: MyEventData) {
    let newConference = conference;
    newConference.statusId = 1;
    console.log(newConference);
    this.changeStatus(newConference);
    this.displayDetailsDialog = false;
  }

  // Method to handle the decline of the conference
  declineConference(conference: MyEventData) {
    let newConference = conference;
    newConference.statusId = 2;
    console.log(newConference);
    this.changeStatus(newConference);
    this.displayDetailsDialog = false;
  }
  changeStatus(conference: MyEventData) {
    this.dataService.updateEvent(conference).subscribe(
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
}
