import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthenticateService} from "../services/authenticate.service";
import {ApiLoadingService} from "../services/api-loading.service";


@Component({
  selector: 'app-tripplan',
  templateUrl: './tripplan.component.html',
  styleUrls: ['./tripplan.component.css']
})


export class TripplanComponent {


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

  bucharestPos = {
    lat: 44.43,
    lng: 26.09
  };

  places : Place[] = [];

  ///  var pt ruta
  routeFound : boolean = false;
  source : string = "";
  destination: string = "";
  path: string = "";
  vertices: any [] = [];
  routeMarkers: any[] = [];
  route : RouteAttributes | undefined;
  //-----

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


  findRoute() {

    const params = new HttpParams()
      .set('source', this.source)
      .set('destination', this.destination);

    this.http.get<RouteAttributes>("/devapi/findroute", {params: params}).subscribe( (data : RouteAttributes) => {
      this.route = data;
      this.vertices = google.maps.geometry.encoding.decodePath(this.route.path);
      this.routeMarkers = [];
      this.routeMarkers.push({
        position: { lat: this.route.src.latitude, lng: this.route.src.longitude },
        label: {
          color: 'blue',
          text: 'Marker label ',
        }
      });
    });
    this.routeFound = true;
  }

  plantrip() {
    // send get request for the places, await response and redirect to results
    const params = new HttpParams()
        .set('landmarkName', this.locationName)
        .set('soughtPlaceName', this.lookingFor)
        .set('lat', this.bucharestPos.lat)
        .set('lng', this.bucharestPos.lng);

    this.places = [];
    this.http.get<Place[]>("/devapi/findplacesemantic", { params: params }).subscribe((data : Place[]) => {
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
          color: 'red',
          text: 'Marker label ' + place.name,
        }
      }))
    });
  }
}

class Place {
  name: string = "";

  position: {
    latitude: number,
    longitude: number
  } = {latitude: 1, longitude: 1}
}

class RouteAttributes {
  path: string = "";
  src: {
    latitude: number,
    longitude: number
  } = {latitude: 1, longitude: 1}

  dest: {
    latitude: number,
    longitude: number
  } = {latitude: 1, longitude: 1}
}
