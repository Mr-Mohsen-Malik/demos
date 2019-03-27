import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:4000/login';
  constructor(private http: HttpClient, private router: Router) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  login(term: Object): Observable<Object> {
    console.log(term);
    return this.http.post(this.loginUrl, term, { responseType: 'json' }).pipe(
      tap(_ => {
        // this.router.navigate(['/chat']);
        console.log(`found user matching "${term}"`);
      }),
      catchError(this.handleError<Object>('login'))
    );
  }

  register(term: Object): Observable<Object> {
    console.log(term);
    return this.http.post(this.loginUrl, term, { responseType: 'json' }).pipe(
      tap(_ => console.log(`User "${term}" is registered!`)),
      catchError(this.handleError<Object>('register'))
    );
  }
}
