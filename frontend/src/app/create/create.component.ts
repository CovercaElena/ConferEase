
import {DayPilot, DayPilotModule} from "@daypilot/daypilot-lite-angular";
import { Component, OnInit } from '@angular/core';
import { DataService, MyEventData } from '../calendar/data.service';
import { SelectItem } from 'primeng/api';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
    providers:[MessageService]
})
export class CreateComponent implements OnInit {
  event!: MyEventData;

  types!: SelectItem[];
  users!: SelectItem[];
  meetLink: string = '';
  showOnlineLink: boolean = false;
  createEvent:FormGroup;

  constructor(private dataService: DataService,
              private fb:FormBuilder,
              private messageService: MessageService) {
    this.createEvent=this.fb.group({
      text:['',Validators.required],
      start:[''],
      end:[''],
      location:[''],
      type:['',Validators.required],
      meetLink:[''],
      invitees:['']
    });
  }

  async ngOnInit() {
    this.types = this.dataService.getTypes().map(type => ({ label: type.name, value: type.id }));
    this.dataService.getUsers().subscribe(data => {
      this.users = data.map(user => ({ label: user.name, value: user.id }));
    });
    this.meetLink='link';
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
                start: new DayPilot.Date(formValue.start),
                end: new DayPilot.Date(formValue.end),
                location: formValue.location,
                type: formValue.type,
                meetLink: this.showOnlineLink ? this.meetLink : '',
                invitees: formValue.invitees,
                id: ""
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

}
