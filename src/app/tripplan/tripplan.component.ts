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
  @ViewChild(google.maps.Map) googleMap!: google.maps.Map;
  polylineOptions: any;
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


  ngAfterViewInit() {

  }


  findRoute() {

    const params = new HttpParams()
      .set('source', this.source)
      .set('destination', this.destination);

    this.routeFound = true;
      this.http.get("/devapi/findroute", {params: params, responseType: 'text'}).subscribe( (data : string) => {this.path = data
        /////---------------------
          var polyline = new google.maps.Polyline({
            path: google.maps.geometry.encoding.decodePath("uiyqBfb~zQgGwAgCtM}DfVpDrBeBbFqDjFmHfXkOzh@cKxNuGlW_BzSiJxZcBfHuS~NqK`Ia@lFgIpC{fAoDcW~BmEbBeqAmIaEoBgB{KB}J}OoJcBwAeHuAwDaBkCnCwKjLcNgBkIc@oDtD}EhG{GjAgVcDsN{Bm@|FaAvOiE|Va`@xw@}Jh]dPhcArEzQuIpXkMna@sDbPb@fGdDxE|O~E~ZzH`ThQtdA|jA|NfRxC~Jc@p[iEd`@WbSvKza@rTlf@~ArMfFtJrChOjQfM~JzX@~VnOn]g@jMcBdLkGzHg@|DyGfEcEjLgEvHaKoAgNiEoLsCoKUkUz@_CtBqI?eDhAeGeDsIRyK`IqIfIkPtEuUbNcLpOuPpZ]rHpHtQpLnOlEvIEpJfId[pShc@z@th@cLx@yNnGk`@rVsLfLm|@v|@_VxKgZ`XmR~VeH~^~@jIsAvLeD~LiCre@mGhP}Eda@D`YqBt[aIna@iI|Db@pENpDtAzCc@pG{@bFuQlGcLxGuUz@}PhBUhIcD`Eof@rMwUfEk^|Ck}@tFcMjDiP~GeN`RcF]}CxBmEc@{BvAoGdCsKpFmOgEuB\\eEjKjB~GwGvBiDsDgEyGwD`JeDTgCyGuCOcGvFmGzJeC_DwCa@WvM{@rC_CJuHoIiFEgBwC{HeJuCm@sAxAf@fFoBvBmDx@iNm@mCxD{DkAwMrDcJrF}IhSsDbB{D{AyY_CoK~AuP`@uPm@eKbC}Lq@eNsCeDeC_Jj@wIb@mEr@eHgBiGoKiGyJeDgI}CmHG{KiCyO}P}IgNkNaUoKkCkDYiB{Bg@sFwAaDeDsSwT}PY{KaEeIBqTfEiEeEgDkLyUyIkT}BoP{DyGiGwHiW{Is^kOiScLmTeIqGsPcTqD_FgMaDwNqMwOuVqHy\\yFkMmGwEaHeAqBmCr@aU_CiBoSpDyHBkH}Kc[kTq[mPyYiOyVyR_Sc\\{ZsRwfA{]wh@oPaNVyIiFeHKmE~AqAhEwNgDiNmFgL~H}Cs@oIxH{DRsFqG_FoA}GfEgP~MuFi@}Sh@yDdDgInBaGh@w[cCwH~AeGeFeLcUD_LkAiDwUaJuMXaQuGyBgB|LkLhL{JnPoGhIuQfACz@kEqCgBF}F~@qL{AaHa@qJCcHiAsBeH]{PiHeJoCu@{BxCwC[cFiVePaGt@}KoH_NyMyNiGyWwMeIgFiLmIod@lEoSaf@eIrF{@oG}C_@{B{CsEmAmDgCcAoL_AaFs@oCl@mD\\eMkHkFaJqFkEiPN}HrBvKdEzExA|FJJ")
          });

          console.log(google.maps.geometry.encoding.decodePath(this.path));
          polyline.setMap(this.googleMap);
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
