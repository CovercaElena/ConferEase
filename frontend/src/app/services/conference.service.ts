import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, catchError, map, retry, tap, throwError} from "rxjs";
import {environment} from "../environment";
import {DropdownValue} from "../../DropdownValue";

@Injectable({
    providedIn: 'root'
})
export class ConferenceService {
    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'aplication/json',});

    constructor(private http: HttpClient) {
    }

    getConferences(confStatus: number, userId: number): Observable<DropdownValue[]> {
        return this.http.get<DropdownValue[]>(environment.apiUrl + '/' + confStatus + '/' + userId).pipe(
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
}
