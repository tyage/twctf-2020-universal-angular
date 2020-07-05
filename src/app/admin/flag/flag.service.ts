import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(private http: HttpClient) { }

  getFlag() {
    return this.http.get('/admin-api/flag')
  }
}
