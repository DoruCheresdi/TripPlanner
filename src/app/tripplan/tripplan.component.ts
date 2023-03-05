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


  zoom = 11;
  center: google.maps.LatLngLiteral = {lat: 23, lng: 23};
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 30,
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
  routeDone: boolean = false;
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

    const metro = "//maps.gstatic.com/mapfiles/transit/iw2/6/subway2.png";
    const bus = "https://www.geocodezip.net/mapIcons/bus_blue.png";
    const st = "https://www.geocodezip.net/mapIcons/geolocation_marker.png";
    this.routeMarkers = [];

    this.http.get<RouteAttributes>("/devapi/findroute", {params: params}).subscribe( (data : RouteAttributes) => {
      this.route = data;
      this.vertices = google.maps.geometry.encoding.decodePath(this.route.path);


      this.routeMarkers.push({
        position: { lat: this.route.start.latitude, lng: this.route.start.longitude },
        icon : st
      });

      this.center.lat = (this.route.start.latitude + this.route.end.latitude)/2;
      this.center.lng = (this.route.start.longitude + this.route.end.longitude)/2;

        this.routeMarkers.push({
        position: { lat: this.route.end.latitude, lng: this.route.end.longitude },
        title: '',
      });
      this.route.stops.forEach((place) => {if (place.name === "BUS") {
        this.routeMarkers.push({
          position: { lat: place.position.latitude, lng: place.position.longitude },
          title: place.name,
          label: {
            color: 'blue',
            text: place.name
          },
          icon : bus})
      } else { this.routeMarkers.push({
        position: { lat: place.position.latitude, lng: place.position.longitude },
        title:  'Metro ' + place.name,
        label: {
          color: 'blue',
          text: 'Metro ' + place.name
        },
        icon : metro
      })}});

      this.routeDone = true;

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
      this.places.forEach((place) =>
      {if (place.name === "BUS") {

      } else {
        this.markers.push({
          position: {lat: place.position.latitude, lng: place.position.longitude},
          title: place.name,
          label: {
            color: 'red',
            text: 'Marker label ' + place.name,
          }
        })
      }})

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
  start: {
    latitude: number,
    longitude: number
  } = {latitude: 1, longitude: 1}

  end: {
    latitude: number,
    longitude: number
  } = {latitude: 1, longitude: 1}

  stops: Place[] = [];
}
