import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLoadingService {

  isGoogleAPILoaded = false;

  constructor() { }

  public setAPILoaded() {
    this.isGoogleAPILoaded = true;
  }
}
