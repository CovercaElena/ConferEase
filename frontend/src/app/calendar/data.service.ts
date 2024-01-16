import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry, tap, throwError } from "rxjs";
import { DayPilot } from "@daypilot/daypilot-lite-angular";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment";
import { DropdownValue } from "../../DropdownValue";
import {Invitation} from "../../Invitation";

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

  getEvents(from: DayPilot.Date, to: DayPilot.Date,email:string): Observable<MyEventData[]> {
    return this.http.get<MyEventData[]>(environment.apiUrl + '/conference/'+email).pipe(
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
    updateInvite(updatedEvent: Invitation): Observable<any> {
        const url = `${environment.apiUrl}/invite/${updatedEvent.meetId}`;
        return this.http.put(url, updatedEvent, { headers: this.headers }).pipe(
            tap(response => response),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }
    deleteEvent(eventId: number): Observable<any> {
        // Assuming eventId is the ID of the event you want to mark as cancelled
        const apiUrl = `${environment.apiUrl}/conference/${eventId}`;
        console.log("hello");
        // Set the request body to mark the event as cancelled
        const requestBody = {
            "cancelled": "true"
        };
       console.log(requestBody);
       console.log(apiUrl);
        return this.http.put(apiUrl, requestBody).pipe(
            tap(response => response),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);

            })
        );
        console.log("uraaa");
    }
    getUsers():Observable<DropdownValue[]>
    {
        return this.http.get<DropdownValue[]>(environment.apiUrl + '/user/').pipe(
            retry(3),
            tap(data => data),
            map(res => {
                console.log('getUser get res', res);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );

    }
}

export interface MyEventData extends DayPilot.EventData {
  location?: string;
  type?: any;
  invitees?: any[];
  color?: string;
  statusId?: number;
  cancelled?:boolean;
  meetLink?:string;
  isPublic?:boolean;
  owner?:string;
  departments?:any[];
}
