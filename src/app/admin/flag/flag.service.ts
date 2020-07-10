import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(private http: HttpClient, private platformLocation: PlatformLocation) { }

  getFlag() {
    // XXX: prefix is not required if this option is added https://github.com/angular/angular/pull/37539/files
    const {href, protocol, hostname, port} = this.platformLocation
    const urlPrefix = `${protocol}//${hostname}:${port}`
    const url = new URL('/api/flag', urlPrefix)
    return this.http.get(url.toString())
  }
}
