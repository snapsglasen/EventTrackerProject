import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Matsuri } from '../models/matsuri';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {
  private baseUrl = 'http://localhost:8086/'; // adjust port to match server
  private url = this.baseUrl + 'api/matsuris'; // change 'todos' to your API path

  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<Matsuri[]> {
    return this.http.get<Matsuri[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('FestivalService.index(): error retrieving matsuri: ' + err)
        );
      })
    );
  }


  create(matsuri: Matsuri): Observable<Matsuri> {
    return this.http.post<Matsuri>(this.url, matsuri).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'FestivalService.create(): error creating Matsuri: ' + err )
        );
      })
    );
  }

}
