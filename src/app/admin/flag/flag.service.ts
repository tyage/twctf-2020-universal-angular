import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(private http: HttpClient, private platformLocation: PlatformLocation) { }

  getFlag() {
    return this.http.get('/api/test')
  }
}
