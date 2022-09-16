import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {
  private baseUrl = 'http://localhost:8086/'; // adjust port to match server
  private url = this.baseUrl + 'api/matsuris'; // change 'todos' to your API path
  constructor() { }
}
