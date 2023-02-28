import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mygmap',
  templateUrl: './mygmap.component.html',
  styleUrls: ['./mygmap.component.css']
})
export class MygmapComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral = {lat: 23, lng: 23};
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers : any[] = [];

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("geolocation loaded lat" + position.coords.latitude + " lng: " + position.coords.longitude);
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  zoomIn() {
    if (this.options.maxZoom && (this.zoom < this.options.maxZoom)) this.zoom++;
  }

  zoomOut() {
    if (this.options.minZoom && (this.zoom > this.options.minZoom)) this.zoom--;
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }
}
