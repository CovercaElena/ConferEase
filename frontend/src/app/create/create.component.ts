
import {DayPilot, DayPilotModule} from "@daypilot/daypilot-lite-angular";
import { Component, OnInit } from '@angular/core';
import { DataService, MyEventData } from '../calendar/data.service';
import { SelectItem } from 'primeng/api';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import { MessageService } from 'primeng/api';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import {ConferenceService} from "../services/conference.service";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
    providers:[MessageService]
})
export class CreateComponent implements OnInit {
  event!: MyEventData;
  showInvitees: boolean = false;
  types!: SelectItem[];
  users!: SelectItem[];
  departmentOptions!: SelectItem[];
  meetLink: string = '';
  showOnlineLink: boolean = false;
  createEvent:FormGroup;
    email!: string;
    userId!: number;
    socialUser!: SocialUser;
    isLoggedin?: boolean;

  constructor(private dataService: DataService,
              private fb:FormBuilder,
              private messageService: MessageService,
              private socialAuthService: SocialAuthService,
              private conferenceService:ConferenceService) {
    this.createEvent=this.fb.group({
      text:['',Validators.required],
      start:[''],
      end:[''],
      location:[''],
      type:['',Validators.required],
      meetLink:[''],
        visibility: ['', Validators.required], // Add a new control for visibility
        invitees: [''],
        departmentInvitees: ['']
    });
  }

  async ngOnInit() {
    this.types = this.dataService.getTypes().map(type => ({ label: type.name, value: type.id }));
    this.dataService.getUsers().subscribe(data => {
      this.users = data.map(user => ({ label: user.name, value: user.name }));
    });
    this.meetLink='link';
      this.socialAuthService.authState.subscribe(async (user) => {
          this.socialUser = user;
          this.isLoggedin = user != null;
          console.log(this.socialUser);

          if (user && user.email) {this.email=user.email}});
    // @ts-ignore
      this.loadDepartments();



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

  onTypeChange(event: any) {
    this.showOnlineLink = event.value === 'Online' || event.value === 'Hybrid';
    if (this.showOnlineLink) {
      this.meetLink = 'https://meet.google.com/generated-link'; // Your link generation logic
      this.createEvent.patchValue({ meetLink: this.meetLink }); // Update form group
    } else {
      this.meetLink = '';
      this.createEvent.patchValue({ meetLink: this.meetLink }); // Clear the field in form group
    }
  }


    submitEvent() {
        if (this.createEvent.valid) {
            const formValue = this.createEvent.value;


            const newEvent: MyEventData = {
                text: formValue.text,
                // @ts-ignore
                start: (new DayPilot.Date(formValue.start)).getDatePart(),
                // @ts-ignore
                end: (new DayPilot.Date(formValue.end)).getDatePart(),
                location: formValue.location,
                type: formValue.type,
                meetLink: this.showOnlineLink ? this.meetLink : '',
                invitees: formValue.invitees,
                id: "",
                isPublic: formValue.visibility === 'Private' ? false : true,
                owner:this.email,
                departments:formValue.departmentInvitees

            };
            console.log(newEvent);

            this.dataService.createEvent(newEvent).subscribe(response => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Event created successfully'});
            }, error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to create event'});
            });
        } else {
            this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Form is not valid'});
        }
    }
    onVisibilityChange(event: any) {
        // No need to manually show/hide the invitees field as it's handled by *ngIf in the template
    }

}
