import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
  export class Reports {
    navigate(arg0: any[]): any {
      throw new Error("Method not implemented.");
    }
    baseUrl = 'http://localhost/advocate_api';
  dashboards: any;
  cases:any;
  list:any;noticelist:any;
  countavai:any;
  addcase2:any;
  constructor(private http: HttpClient) { }
    
  getdatapoints() {
      return this.http.get(`${this.baseUrl}/reports`).pipe(
        map((res) => {
          this.list = res;
          return this.list;
      }),
      catchError(this.handleError));
    }
   
    private handleError(error: HttpErrorResponse) {
      console.log(error);
  
      // return an observable with a user friendly message
      return throwError('Error! something went wrong.');
    }
  }
  