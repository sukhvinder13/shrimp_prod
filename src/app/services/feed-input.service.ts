import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FeedInputService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
    // Create feed
    createFeeds(data): Observable<any> {
      // let url = `${this.baseUri}/addLesson`;
      return this.http.post( environment.baseUrl + '/addlesson', data)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
      // Create checknet
      createCheckNet(data): Observable<any> {
        // let url = `${this.baseUri}/addLesson`;
        return this.http.post( environment.baseUrl + '/addlesson', data)
          .pipe(
            catchError(this.errorMgmt)
          )
      }
 // Create checknet
 createWaterMedicine(data): Observable<any> {
  // let url = `${this.baseUri}/addLesson`;
  return this.http.post( environment.baseUrl + '/addlesson', data)
    .pipe(
      catchError(this.errorMgmt)
    )
}
// Create water rep
createWaterReport(data): Observable<any> {
  // let url = `${this.baseUri}/addLesson`;
  return this.http.post( environment.baseUrl + '/addlesson', data)
    .pipe(
      catchError(this.errorMgmt)
    )
}
// Create shrimp observation
createShrimpObv(data): Observable<any> {
  // let url = `${this.baseUri}/addLesson`;
  return this.http.post( environment.baseUrl + '/addlesson', data)
    .pipe(
      catchError(this.errorMgmt)
    )
}
// Create shrimp observation
createWaterObv(data): Observable<any> {
  // let url = `${this.baseUri}/addLesson`;
  return this.http.post( environment.baseUrl + '/addlesson', data)
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
    return throwError(errorMessage);
  }
}
