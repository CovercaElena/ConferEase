// public.component.ts

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConferenceService } from '../services/conference.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { MyEventData } from '../calendar/data.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PublicComponent implements OnInit {
  publicConferences$!: Observable<MyEventData[]>;
  publicConferences: MyEventData[] = [];

  constructor(
    private conferenceService: ConferenceService,
    private messageService: MessageService
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
}
