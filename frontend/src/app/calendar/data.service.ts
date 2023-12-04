import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry, tap, throwError } from "rxjs";
import { DayPilot } from "@daypilot/daypilot-lite-angular";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment";
import { DropdownValue } from "../../DropdownValue";

@Injectable()
export class DataService {
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', });

  static colors = {
    green: "#6aa84f",
    yellow: "#f1c232",
    red: "#cc4125",
    gray: "#808080",
    blue: "#2e78d6",
  };

  events: MyEventData[] = [];

  constructor(private http: HttpClient) { }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<MyEventData[]> {
    return this.http.get<MyEventData[]>(environment.apiUrl + '/conference').pipe(
        retry(3),
        tap(data => data),
        map(res => {
          console.log('events get res', res);
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
    );
  }

  getColors(): any[] {
    const colors = [
      { name: "Green", id: DataService.colors.green },
      { name: "Yellow", id: DataService.colors.yellow },
      { name: "Red", id: DataService.colors.red },
      { name: "Gray", id: DataService.colors.gray },
      { name: "Blue", id: DataService.colors.blue },
    ];
    return colors;
  }

  getTypes(): any[] {
    const types = ["Online", "Hybrid", "Onsite"];
    return types.map(type => ({ name: type, id: type }));
  }
  createEvent(event: MyEventData): Observable<any> {
    return this.http.post(environment.apiUrl + '/conference', event).pipe(
        tap(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error('Error creating event:', error);
          return throwError(() => error);
        })

    );
  }
  updateEvent(updatedEvent: MyEventData): Observable<any> {
    const url = `${environment.apiUrl}/conference/update/${updatedEvent.id}`;
    return this.http.put(url, updatedEvent, { headers: this.headers }).pipe(
        tap(response => response),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
    );
  }
}

export interface MyEventData extends DayPilot.EventData {
  location?: string;
  type?: any;
  invitees?: string[];
  color?: string;
  statusId?: number;
}
