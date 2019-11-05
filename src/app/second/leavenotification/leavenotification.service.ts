import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import leavenotification from './leavenotification';

@Injectable({
    providedIn: 'root'
  })
  export class Addleaveservice {
    navigate(arg0: any[]): any {
      throw new Error("Method not implemented.");
    }
    baseUrl = 'http://localhost/advocate_api';
  dashboards: any;
  leaveapply: any;
  leavenotification:any;

  constructor(private http: HttpClient) { }

  getAll(): Observable<leavenotification[]> {
    return this.http.get(`${this.baseUrl}/hr/leave_notification/list`).pipe(
      map((res) => {
        this.leavenotification = res['data'];
        return this.leavenotification;
      }),
      catchError(this.handleError));
  }

  statusupdate(id: number): Observable<leavenotification[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/hr/leave_notification/statusupdate`, { params: params })
      .pipe(map(res => {
        const filteredAdds = this.leavenotification.filter((car) => {
          return +car['id'] !== +id;
        });
        return this.leavenotification= filteredAdds;
      }),
      catchError(this.handleError));
  }

  deleteleavenotify(id: number): Observable<leavenotification[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/hr/leave_notification/delete`, { params: params })
      .pipe(map((res:any) => {
        const filteredAdds = this.leavenotification.filter((car) => {
          return +car['id'] !== +id;
        });
        return res;
      }),
      catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}