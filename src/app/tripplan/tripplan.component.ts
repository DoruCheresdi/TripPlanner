import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticateService} from "../services/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tripplan',
  templateUrl: './tripplan.component.html',
  styleUrls: ['./tripplan.component.css']
})
export class TripplanComponent {

  locationName : string = "";

  lookingFor : string = "";

  constructor(private auth: AuthenticateService, private http: HttpClient, private router: Router) {
  }

  plantrip() {
    // send get request for the places, await response and redirect to results
    const params = new HttpParams()
        .set('locationName', this.locationName)
        .set('lookingFor', this.lookingFor);

    this.http.get("/devapi/findplace", { params: params }).subscribe();
  }
}
