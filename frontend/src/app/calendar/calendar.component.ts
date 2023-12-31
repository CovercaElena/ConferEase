import { Component, ViewChild, AfterViewInit } from "@angular/core";
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import { DataService, MyEventData } from "./data.service";

@Component({
  selector: 'calendar-component',
  template: `
    <div class="container">
      <div class="navigator">
        <daypilot-navigator [config]="configNavigator" [events]="events" [(date)]="date" (dateChange)="changeDate($event)" #navigator></daypilot-navigator>
      </div>
      <div class="content">
        <div class="buttons">
          <button (click)="viewDay()" [class]="this.configNavigator.selectMode == 'Day' ? 'selected' : ''">Day</button>
          <button (click)="viewWeek()" [class]="this.configNavigator.selectMode == 'Week' ? 'selected' : ''">Week</button>
          <button (click)="viewMonth()" [class]="this.configNavigator.selectMode == 'Month' ? 'selected' : ''">Month</button>
        </div>

        <daypilot-calendar [config]="configDay" [events]="events" #day></daypilot-calendar>
        <daypilot-calendar [config]="configWeek" [events]="events" #week></daypilot-calendar>
        <daypilot-month [config]="configMonth" [events]="events" #month></daypilot-month>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
    }

    .navigator {
      margin-right: 10px;
    }

    .content {
      flex-grow: 1;
    }

    .buttons {
      margin-bottom: 10px;
      display: inline-flex;
    }

    button {
      background-color: #9196cc;
      color: white;
      border: 0;
      padding: .5rem 1rem;
      width: 80px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      margin-right: 1px;
      transition: all 0.2s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
      box-sizing: border-box;
    }

    button:last-child {
      margin-right: 0;
    }

    button.selected {
      background-color: #353b81;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    }

    button:first-child {
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }

    button:last-child {
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }

    button:hover {
      background-color: #2f66c4;
      box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
    }

    button:active {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

  events: MyEventData[] = [];

  date = DayPilot.Date.today();
  options:string[]= ["Online","Hybrid","On site"];

  contextMenu = new DayPilot.Menu({
    items: [
      {
        text: "Delete",
        onClick: args => {
          const event = args.source;
          const dp = event.calendar;
          dp.events.remove(event);
        }
      },
      {
        text: "Edit...",
        onClick: async args => {
          const event = args.source;
          const dp = event.calendar;

          const modal = await DayPilot.Modal.prompt("Edit event text:", event.data.text);
          dp.clearSelection();
          if (!modal.result) { return; }
          event.data.text = modal.result;
          dp.events.update(event);
        }
      },
      {
        text: "-"
      },
      {
        text: "Red",
        onClick: args => {
          this.changeEventColor(args, DataService.colors.red);
        }
      },
      {
        text: "Green",
        onClick: args => {
          this.changeEventColor(args, DataService.colors.green);
        }
      },
      {
        text: "Blue",
        onClick: args => {
          this.changeEventColor(args, DataService.colors.blue);
        }
      },
      {
        text: "Yellow",
        onClick: args => {
          this.changeEventColor(args, DataService.colors.yellow);
        }
      },
      {
        text: "Gray",
        onClick: args => {
          this.changeEventColor(args, DataService.colors.gray);
        }
      }
    ]
  });

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: args => {
      this.loadEvents();
    }
  };

  changeEventColor(args: any, color: string): void {
    const event = args.source;
    const dp = event.calendar;
    event.data.backColor = color;
    dp.events.update(event);
  }

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
    durationBarVisible: false,
    contextMenu: this.contextMenu,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week",
    durationBarVisible: false,
    contextMenu: this.contextMenu,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onBeforeEventRender: this.onBeforeEventRender.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  configMonth: DayPilot.MonthConfig = {
    contextMenu: this.contextMenu,
    eventBarVisible: false,
    onTimeRangeSelected: this.onTimeRangeSelected.bind(this),
    onEventClick: this.onEventClick.bind(this),
  };

  constructor(private ds: DataService) {
    this.viewWeek();
    this.options = ["Online", "Hybrid", "On site"];

  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  viewDay(): void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  onBeforeEventRender(args: any) {
    const dp = args.control;
    args.data.areas = [
      {
        top: 3,
        right: 3,
        width: 20,
        height: 20,
        symbol: "assets/icons/daypilot.svg#minichevron-down-2",
        fontColor: "#fff",
        toolTip: "Show context menu",
        action: "ContextMenu",
      },
      {
        top: 3,
        right: 25,
        width: 20,
        height: 20,
        symbol: "assets/icons/daypilot.svg#x-circle",
        fontColor: "#fff",
        action: "None",
        toolTip: "Delete event",
        onClick: async (args: any) => {
          dp.events.remove(args.source);
        }
      }
    ];

    args.data.areas.push({
      bottom: 5,
      left: 5,
      width: 36,
      height: 36,
      action: "None",
      image: `https://picsum.photos/36/36?random=${args.data.id}`,
      style: `border-radius: 50%; border: 2px solid #fff; overflow: hidden; background-color: ${args.data.color};`,
    });
  }



  async onTimeRangeSelected(args: any) {
    const modal = await DayPilot.Modal.form([
      { name: "Text", id: "text" },
      // Remove the Start and End fields from the form
      { name: "Color", id: "backColor", type: "select", options: this.ds.getColors() },
      { name: "Location", id: "location" },
      { name: "Type", id: "type", type: "select", options: this.ds.getTypes() },
      { name: "Invitees", id: "invitees" },
    ]);

    if (modal.canceled) {
      return;
    }

    const dp = args.control;

    // Automatically use the start and end dates from the selection
    const newEvent: MyEventData = {
      id: DayPilot.guid(),
      start: args.start,
      end: args.end,
      text: modal.result.text,
      backColor: modal.result.backColor,
      location: modal.result.location,
      type: modal.result.type,
      invitees: modal.result.invitees.split(',').map((invitee: string) => invitee.trim()),
    };

    // Add the new event locally
    dp.events.add(newEvent);

    // Send a POST request to the API to create the new event
    this.ds.createEvent(newEvent).subscribe(
        response => {
          console.log('Event created successfully:', response);
        },
        error => {
          console.error('Error creating event:', error);
          // If there's an error, you might want to remove the event locally to keep the UI and server in sync
          dp.events.remove(newEvent);
        }
    );
  }


  async onEventClick(args: any) {
    const form = [
      { name: "Text", id: "text" },
      { name: "Start", id: "start", dateFormat: "MM/dd/yyyy", type: "datetime" },
      { name: "End", id: "end", dateFormat: "MM/dd/yyyy", type: "datetime" },
      { name: "Color", id: "backColor", type: "select", options: this.ds.getColors() },
      { name: "Location", id: "location" },
      { name: "Type", id: "type", type: "select", options: this.ds.getTypes() },
      { name: "Invitees", id: "invitees" },
    ];

    const data = args.e.data;

    const modal = await DayPilot.Modal.form(form, data);

    if (modal.canceled) {
      return;
    }

    const dp = args.control;

    const updatedEvent: MyEventData = {
      id: data.id,
      start: modal.result.start,
      end: modal.result.end,
      text: modal.result.text,
      backColor: modal.result.backColor,
      location: modal.result.location,
      type: modal.result.type,
      invitees: modal.result.invitees.split(',').map((invitee: string) => invitee.trim()),
    };

    // Update event locally
    dp.events.update(updatedEvent);

    // Update event on the server
    this.ds.updateEvent(updatedEvent).subscribe(
        () => {
          // Handle success
          console.log('Event updated successfully');
        },
        error => {
          // Handle error
          console.error('Error updating event', error);
        }
    );
  }

}
