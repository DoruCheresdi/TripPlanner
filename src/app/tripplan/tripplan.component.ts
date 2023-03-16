import {Component, QueryList, ViewChildren} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthenticateService} from "../services/authenticate.service";
import {ApiLoadingService} from "../services/api-loading.service";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-tripplan',
  templateUrl: './tripplan.component.html',
  styleUrls: ['./tripplan.component.css']
})
export class TripplanComponent {
  zoom = 12;
  center: google.maps.LatLngLiteral = {lat: 23, lng: 23};
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  public markers : any[] = [];

  @ViewChildren(MapInfoWindow) infoWindows?: QueryList<MapInfoWindow>;

  locationName : string = "";

  lookingFor : string = "";

  bucharestPos = {
    lat: 44.43,
    lng: 26.09
  };

  places : Place[] = [];

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

      // reset markers
      this.markers = [];
      // set markers:
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

  clickedMarker(marker : any) {
    console.log("clicked marker");
  }

  openInfoWindow(marker: MapMarker) {
    // find the info window for this marker:
    this.infoWindows?.forEach((infoWindow : MapInfoWindow) => infoWindow.close());
    this.infoWindows?.find((infoWindow : MapInfoWindow) => {
      return infoWindow.infoWindow?.getPosition()?.lng() === marker.marker?.getPosition()?.lng() &&
          infoWindow.infoWindow?.getPosition()?.lat() === marker.marker?.getPosition()?.lat();
    })?.open(marker);
  }
}

class Place {
  name: string = "";

  position: {
    latitude: number,
    longitude: number
  } = {latitude: 1, longitude: 1}
}
