import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'mapa',
  templateUrl: 'mapa.html'
})
export class MapaComponent {

  text: string;

  yabusco: any = 0;

  ver:any = 0;

  coords:any;

  @ViewChild("map") mapElement;

  map: any;
  service: any;

  form: FormGroup;
  campos:any = {
    texto:null
  }

  resultado:any;

  constructor(private fb: FormBuilder,
              public navCtrl: NavController) {
    this.form = this.fb.group({
      texto: new FormControl(this.campos.texto)
    });
  }

  ngOnInit(){
    this.ver = 0;
    if(sessionStorage.getItem('tempLat') != 'null' || sessionStorage.getItem('tempLat') != '1'){
      this.ver =1;
      console.log('entro');
      this.coords = new google.maps.LatLng(
             parseFloat(sessionStorage.getItem('tempLat')),
             parseFloat(sessionStorage.getItem('tempLng'))
      );
      console.log(this.coords);
    }
    this.initMap();
  }

  initMap(){
    let coords = new google.maps.LatLng(7.1193,-73.1227)
    let mapOptions : google.maps.MapOptions = {
      center : coords,
      zoom : 14,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement,
      mapOptions)

      if(this.ver ==1){
        this.map.setCenter(this.coords);
        let marker: google.maps.Marker = new google.maps.Marker({
          map: this.map,
          position : this.coords
        })
        console.log(marker);
        sessionStorage.removeItem('tempLat');
        sessionStorage.removeItem('tempLng');
      }
  }

  ionViewWillLeave(){
  
  }

  createMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    console.log(marker);
  }

  buscar(){
    var request = {
      query: this.form.value.texto,
      fields: ['name', 'geometry'],
    };

     this.service = new google.maps.places.PlacesService(this.map);

        this.service.findPlaceFromQuery(request, (results, status)=> {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            /* for (var i = 0; i < results.length; i++) {
              this.createMarker(results[i]);
              console.log(results[i]);
            } */
            this.createMarker(results[0]);
            this.yabusco =1;
            this.resultado = {
              lat:  results[0].geometry.location.lat(),
              lng:  results[0].geometry.location.lng()
            };
            this.map.setCenter(results[0].geometry.location);
          }
        });
  }

  agregar(){
    sessionStorage.setItem('tempLat',`${this.resultado.lat}`);
    sessionStorage.setItem('tempLng',`${this.resultado.lng}`);
    this.navCtrl.pop();
  }

}
