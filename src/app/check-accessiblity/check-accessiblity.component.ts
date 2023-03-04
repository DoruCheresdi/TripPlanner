import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthenticateService} from "../services/authenticate.service";
import {ApiLoadingService} from "../services/api-loading.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-check-accessiblity',
  templateUrl: './check-accessiblity.component.html',
  styleUrls: ['./check-accessiblity.component.css']
})
export class CheckAccessiblityComponent {
  zoom = 12;
  center: google.maps.LatLngLiteral = {lat: 23, lng: 23};
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  public markers : any[] = [];

  locationName : string = "";

  lookingFor : string = "";

  selectedPlace : string = "";

  bucharestPos = {
    lat: 44.43,
    lng: 26.09
  };

  places : Place[] = [];

  isAccessible : boolean = false;

  latestReview : PlaceReview | null = null;

  userMessage : string = "";

  constructor(private auth: AuthenticateService, private http: HttpClient, private api: ApiLoadingService) {
  }

  isApiLoaded() : boolean {
    return this.api.isGoogleAPILoaded;
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("geolocation loaded lat" + position.coords.latitude + " lng: " + position.coords.longitude);
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.userMessage = 'An error occurred:' + error.error;
      console.error('An error occurred:', error.error);
    } else {
      this.userMessage = `Backend returned code ${error.status}, body was: ` + error.error;
      console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  showMarkers() {
    // send get request for the places, await response and redirect to results
    const params = new HttpParams()
        .set('landmarkName', this.locationName)
        .set('soughtPlaceName', this.lookingFor)
        .set('lat', this.bucharestPos.lat)
        .set('lng', this.bucharestPos.lng);

    this.places = [];
    this.http.get<Place[]>("/devapi/findplacesemantic", { params: params })
        .pipe(catchError(this.handleError.bind(this)))
        .subscribe((data : Place[]) => {
      this.places = data;

      if (this.places.length > 0) {
        this.center.lat = this.places[0].position.latitude;
        this.center.lng = this.places[0].position.longitude;
      }

      // set markers:
      this.markers = [];
      this.places.forEach(place => this.markers.push({
        position: { lat: place.position.latitude, lng: place.position.longitude },
        title: place.name,
        label: {
          color: 'blue',
          text: place.name,
        }
      }))
    });
  }

  clickedMarker(marker : any) {
    console.log("clicked marker: {}", marker);
    this.selectedPlace = marker.title;

    // send get request for latest review
    const params = new HttpParams()
        .set('placeName', this.selectedPlace);

    this.latestReview = null;
    // TODO: make sure placeName has no wierd letters (turkish, romanian):
    this.http.get<PlaceReview>("/devapi/getlatestreview", { params: params }).subscribe((data : PlaceReview) => {
      this.latestReview = data;
    });
  }

  hasSelectedPlace() : boolean {
    return this.selectedPlace !== "";
  }

  changeAccesssibility() {
    console.log("Changing accessiblity {} {}", this.selectedPlace, this.isAccessible);
    // send post request with review:
    let placeReview2 = new PlaceReview2();
    placeReview2.placeName = this.selectedPlace;
    placeReview2.isAccessible = this.isAccessible;

    this.http.post("/devapi/addreview", placeReview2).subscribe((response) => {
      // send get request for latest review
      const params = new HttpParams()
          .set('placeName', this.selectedPlace);
      this.latestReview = null;
      // TODO: make sure placeName has no wierd letters (turkish, romanian):
      this.http.get<PlaceReview>("/devapi/getlatestreview", { params: params }).subscribe((data : PlaceReview) => {
        this.latestReview = data;
      });
        });
  }

  hello() {
    console.log("hellofasd");
  }
}

class Place {
  name: string = "";

  position: {
    latitude: number,
    longitude: number
  } = {latitude: 1, longitude: 1}
}

class PlaceReview {
  placeName: string = "";

  createdAt: string = "";

  isAccessible: string = "";
}

class PlaceReview2 {
  placeName: string = "";

  isAccessible: boolean = false;
}
