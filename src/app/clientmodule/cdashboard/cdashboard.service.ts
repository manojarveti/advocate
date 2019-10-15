import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class cdashboard {
  navigate(arg0: any[]): any {
    throw new Error("Method not implemented.");
  }
  baseUrl = 'http://13.232.118.211/advocate_api';
dashboards: any;
constructor(private http: HttpClient) { }

getmycase(id:number) {
    const params = new HttpParams()
    .set('id', id.toString());
    return this.http.get(`${this.baseUrl}/cdashboard/mycase`, { params: params }).pipe(
      map((res) => {
        this.dashboards = res['data'];
        // console.log(res);
        return this.dashboards;
    }),
    catchError(this.handleError));
  }
 
  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
