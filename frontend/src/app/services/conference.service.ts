import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, catchError, map, retry, tap, throwError} from "rxjs";
import {environment} from "../environment";
import {DropdownValue} from "../../DropdownValue";
import { DayPilot } from "@daypilot/daypilot-lite-angular";
import {MyEventData} from "../calendar/data.service";


@Injectable({
    providedIn: 'root'
})
export class ConferenceService {
    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json',});
    events: MyEventData[] = [];
    constructor(private http: HttpClient) {
    }

    getConferences(confStatus: number, user: string): Observable<MyEventData[]> {
        return this.http.get<MyEventData[]>(environment.apiUrl + '/conference/' + confStatus + '/' + user).pipe(
            retry(3),
            tap(data => data),
            map(res => {
                console.log('conferences get res', res);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );

    }

    getUser(email:string):Observable<DropdownValue>
    {
        return this.http.get<DropdownValue>(environment.apiUrl + '/user/' + email).pipe(
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
    getDepartmentConfs(department:string):Observable<MyEventData[]>
    {
        return this.http.get<MyEventData[]>(environment.apiUrl + '/conference/' + department).pipe(
            retry(3),
            tap(data => data),
            map(res => {
                console.log('getDepartmentConfs', res);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }
    getPublicConferences(): Observable<MyEventData[]> {
        return this.http.get<MyEventData[]>(environment.apiUrl + '/conference').pipe(
            retry(3),
            tap(data => data),
            map(res => {
                console.log('getPublicConferences', res);
                return res;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

}
