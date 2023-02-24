import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})

export class GoogleMapComponent implements OnInit,OnChanges {


  map:any;
  service:any;

  @Input() locList :any[] = [];
  constructor() { }

  ngOnInit(): void {

    this.initMap();
  }


  ngOnChanges(): void {

    this.initMap();
  }
   
  initMap(): void {
console.log("initMap",this.locList)
    /// Map Style
    let centerlat = 13.7611043;
    let centerlng =100.403087;
   
   
  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  center:  new google.maps.LatLng(centerlat, centerlng),
  });

  map.setCenter(new google.maps.LatLng(centerlat, centerlng));
  map.setZoom(6)

  var placList :any [] = []; 
  // this. search();
  for(let l of this.locList){
    var place = {position: new google.maps.LatLng(l.lat, l.lng)};
    placList.push(place);
  }

  var bounds = new google.maps.LatLngBounds();
  // Create markers.
  // const geocoder = new google.maps.Geocoder();

  for (let loc of placList) {
    const marker = new google.maps.Marker({
      position:loc.position,
      map: map,
    });

    const latlng = {
      lat: loc.latitude,
      lng: loc.longtitude,
    };
   
    //  bounds.extend(loc.getPosition());

  }
  map.setZoom(11)


  // this.createMarker(mark);

  }

  search(){
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement);
  this.service = new google.maps.places.PlacesService(map);
  const request = {
    query: "สยาม",
    fields: ["name", "geometry"],
  };

  this.service.findPlaceFromQuery(
    request,
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }

        map.setCenter(results[0].geometry!.location!);
      }
    }
  );
  }

  createMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) return;
    let map = this.map;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
    // google.maps.event.addListener(marker, "click", () => {
    //   infowindow.setContent(place.name || "");
    //   infowindow.open(map);
    // });
  }
  


}
