import {Component, OnInit} from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";
import { Loader } from "@googlemaps/js-api-loader"
import {apikey} from "./apikey";
import {ApiLoadingService} from "./services/api-loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private app: AuthenticateService, private http: HttpClient, private api: ApiLoadingService) {
  }

  ngOnInit() {
    // authenticate:
    this.app.authenticate(undefined, undefined);

    // Called after the constructor and called  after the first ngOnChanges()
    const loader = new Loader({
      apiKey: apikey,
      libraries: ["geometry"],
      version: "weekly"
      ,
    });

    loader.load().then(() => {
      console.log("Google maps api has been loaded!");
      this.api.setAPILoaded();
    });
  }
}
