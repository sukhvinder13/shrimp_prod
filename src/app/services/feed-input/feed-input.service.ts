import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FeedInputService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  // Create feed
  createFeeds(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/feed', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Create checknet
  createCheckNet(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/checknet', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Create water medicine
  createWaterMedicine(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/waterMedicine', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Create water rep
  createWaterReport(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/waterReport', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Create shrimp observation
  createShrimpObv(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/shrimpObservation', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Create water observation
  createWaterObv(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/waterObservation', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
   // Create count
   createCount(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/count', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
   // Create half Harvest
   createHalfHarvest(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/halfHarvest', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Create Full Harvest
  createFullHarvest(data): Observable<any> {
    return this.http.post(environment.baseUrl + '/i/DataInput/fullHarvest', data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    if(error.status === 400){
      alert('Feed `this.feedInput` already added for Date `this.farm_Date`');
    }
    return throwError(errorMessage);
  }
}
