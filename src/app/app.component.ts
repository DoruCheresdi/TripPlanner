import {Component, OnInit} from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";
import { Loader } from "@googlemaps/js-api-loader"
import {apikey} from "./apikey";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private app: AuthenticateService, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    // authenticate:
    this.app.authenticate(undefined, undefined);

    // Called after the constructor and called  after the first ngOnChanges()
    const loader = new Loader({
      apiKey: apikey,
      version: "weekly",
    });

    loader.load().then(() => {
      console.log("Google maps api has been loaded!")
    });
  }
}
