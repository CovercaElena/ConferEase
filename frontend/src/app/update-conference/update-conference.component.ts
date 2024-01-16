import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService, MyEventData} from '../calendar/data.service';
import {SharedService} from '../services/shared.service'; // Assuming this is your shared service
import {SelectItem} from 'primeng/api';
import {Router} from "@angular/router";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {MessageService} from "primeng/api";
import {ConferenceService} from "../services/conference.service";


@Component({
  selector: 'app-update-conference',
  templateUrl: './update-conference.component.html',
  styleUrls: ['./update-conference.component.css'],
  providers:[MessageService]
})
export class UpdateConferenceComponent implements OnInit {
  updateEventForm: FormGroup;
  types!: SelectItem[];
  users!: SelectItem[];
  departmentOptions!: SelectItem[];
  meetLink: string = '';
  showOnlineLink: boolean = false;
  even!:MyEventData;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private sharedService: SharedService,
    private router:Router,
    private messageService: MessageService,
    private conferenceService:ConferenceService
  ) {
    this.updateEventForm = this.fb.group({
      text: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      location: [''],
      type: ['', Validators.required],
      meetLink: [''],
      invitees: [''],
      departmentInvitees: [''],
      visibility: ['', Validators.required]
    });
  }
  onVisibilityChange(event: any) {
    // You can implement additional logic here if needed when visibility changes
  }
  ngOnInit(): void {
    // Initialize types and users similar to the create component
    this.types = this.dataService.getTypes().map(type => ({label: type.name, value: type.id}));
    this.dataService.getUsers().subscribe(data => {
      this.users = data.map(user => ({label: user.name, value: user.name}));
    });
    this.loadDepartments();

    // Retrieve the event data from SharedService

    const event: MyEventData = this.sharedService.getSelectedEventData();
    console.log(event);
    this.even=event;
    this.updateEventForm.patchValue({
      ...event,
      start: event.start ? new DayPilot.Date(event.start).toDate() : '',
      end: event.end ? new DayPilot.Date(event.end).toDate() : '',
      // other fields
    });

    // Set up the Google Meet link and visibility
    this.showOnlineLink = event.type === 'Online' || event.type === 'Hybrid';
    this.meetLink = event.meetLink || '';
  }

  onTypeChange(event: any) {
    this.showOnlineLink = event.value === 'Online' || event.value === 'Hybrid';
    if (this.showOnlineLink && !this.meetLink) {
      this.meetLink = 'https://meet.google.com/generated-link'; // Example link
    } else if (!this.showOnlineLink) {
      this.meetLink = '';
    }
    this.updateEventForm.patchValue({meetLink: this.meetLink});
  }
  private loadDepartments() {
    this.conferenceService.getDepartments().subscribe(
        departments => {
          this.departmentOptions = departments.map(dept => ({
            label: dept, value: dept
          }));
        },
        error => console.error('Error loading departments:', error)
    );
  }

  onSubmit(): void {
    if (this.updateEventForm.valid) {
      const formValue = this.updateEventForm.value;

      const updatedEvent: MyEventData = {
        text: formValue.text,
        start: new DayPilot.Date(formValue.start),
        end: new DayPilot.Date(formValue.end),
        location: formValue.location,
        type: formValue.type,
        meetLink: this.showOnlineLink ? this.meetLink : '',
        invitees: formValue.invitees,
        id: this.even.id,
        departments:formValue.departmentInvitees,
        isPublic: formValue.visibility === 'Public',

      };
      console.log(updatedEvent);

      this.dataService.updateEvent(updatedEvent).subscribe(response => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Event updated successfully'});
        this.router.navigate(['/calendar']); // Redirect after success
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to update event'});
      });
    } else {
      this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Form is not valid'});
    }
  }
}
