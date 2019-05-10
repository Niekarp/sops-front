import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getBaseUrl(): string {
    return 'http://localhost:56971/';
    // return 'http://sops2.azurewebsites.net/';
  }
}
