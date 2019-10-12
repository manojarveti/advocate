import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Addpermissionservice {
  navigate(arg0: any[]): any {
    throw new Error("Method not implemented.");
  }
  baseUrl = 'http://localhost/advocate_api';
addpermission:any;

constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/hr/permission/allusers`).pipe(
      map((res) => {
        this.addpermission = res['data'];
        return this.addpermission;
    }),
    catchError(this.handleError));
  }

  getcount() {
    return this.http.get(`${this.baseUrl}/hr/permission/count`).pipe(
      map((res) => {
        this.addpermission = res['data'];
        return this.addpermission;
    }),
    catchError(this.handleError));
  }

 
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
