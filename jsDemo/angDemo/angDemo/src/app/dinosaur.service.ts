import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Dinosaur } from './dinosaur';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DinosaurService {
  private dinosaursUrl = 'http://localhost:4000/getData';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getDinosaurs(): Observable<Dinosaur[]> {
    this.messageService.add('DinosaurService: fetched dinosaurs');
    return this.http.get<Dinosaur[]>(this.dinosaursUrl)
      .pipe(tap(dinosaurs => this.log('fetched dinosaurs')),
        catchError(this.handleError('getDinosaurs', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  /* GET heroes whose name contains search term */
  searchDinosaurs(term: string): Observable<Dinosaur[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Dinosaur[]>(`${this.dinosaursUrl}/name?name=${term}`).pipe(
      tap(_ => this.log(`found dinosaurs matching "${term}"`)),
      catchError(this.handleError<Dinosaur[]>('searchDinosaurs', []))
    );
  }
  getDinosaur(id: number): Observable<Dinosaur> {
    const url = `${this.dinosaursUrl}/id?id=${id}`;
    this.messageService.add(`DinosaurService: fetched dinosaur id=${id}`);
    return this.http.get<Dinosaur>(url).pipe(
      tap(_ => this.log(`fetched dinosaur id=${id}`)),
      catchError(this.handleError<Dinosaur>(`getDinosaur id=${id}`))
    );
  }

  updateDinosaur(dinosaur: Dinosaur): Observable<any> {
    const httpOptions = {};
    return this.http.put(this.dinosaursUrl, dinosaur, httpOptions).pipe(
      tap(_ => this.log(`updated dinosaur id=${dinosaur.id}`)),
      catchError(this.handleError<any>('updateDinosaur'))
    );
  }


  private log(message: string) {
    this.messageService.add(`DinosaurService: ${message}`);
  }

}
