import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import myleaves from './myleaves';

@Injectable({
    providedIn: 'root'
  })
  export class Myleaveservice {
    navigate(arg0: any[]): any {
      throw new Error("Method not implemented.");
    }
    baseUrl = 'http://localhost/advocate_api';
  dashboards: any;
  myleaves: any;
  myleavenotification:any;

  constructor(private http: HttpClient) { }

  getAll(id:number): Observable<myleaves[]> {
    const params = new HttpParams()
      .set('id', id.toString());
    return this.http.get(`${this.baseUrl}/hr/myleaves/list`, { params: params }).pipe(
      map((res) => {
        this.myleaves = res['data'];
        return this.myleaves;
    }),
    catchError(this.handleError));
  }

  deleteleavenotify(id: number): Observable<myleaves[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/hr/myleaves/delete`, { params: params })
      .pipe(map((res:any) => {
        const filteredAdds = this.myleaves.filter((car) => {
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