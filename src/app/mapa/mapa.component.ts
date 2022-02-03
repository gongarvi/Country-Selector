import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkanderbegService } from '../services/skanderbeg.service';
import { SpreadsheetsService } from '../services/spreadsheets.service';
import { Country } from '../shared/clases/Country';
declare var provinces:any;
declare var L:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  loading=true;
  
  provinces:Array<any> = [];
  countries:Array<Country> = [];
  provincesIds:any | undefined;

  map:any;

  constructor(
    private skanderbeg:SkanderbegService,
    private spreadSheet:SpreadsheetsService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  async ngOnInit(){
    this.provinces = this.skanderbeg.getProvincesData();
    this.countries = this.skanderbeg.getCountriesData();
    this.provincesIds = this.skanderbeg.getPronvincesIds();
    
    if(history.state.documentId === undefined || history.state.documentId == null){
      this.router.navigate([""]);
    }else{
      let documentId = history.state.documentId;
      
    }
    this.prepareMap();
  }


  prepareMap(){
    this.map = L.map('map', {
      zoomControl: false,
      attributionControl: false,
      maxZoom: 4,
      zoomSnap: 0.5,
      minZoom: -2,
      maxBoundsViscosity: 1,
      crs: L.CRS.Simple,
      wheelPxPerZoomLevel: 120,
      interactive: true
    }).setView([500, 3000], -1);
    var geojson = L.geoJSON(provinces).addTo(this.map);
    this.map.setMaxBounds(geojson.getBounds());
    geojson.eachLayer((layer:any)=>{
      if(this.provincesIds){
        let provinceId = Object.keys(this.provincesIds).find(key=>key===layer.feature.properties.hex);
        if(provinceId !== undefined){
          let string:string = provinceId;
          let province = this.provinces.find(province=>province.provinceId==this.provincesIds[string].id);
          switch(province.owner){
            case "SEAZONE":
              layer.setStyle({
                weight:1,
              });
              break;
            default:
              if(province.owner && province.owner.length === 3){
                var country = this.countries.find(country => country.tag === province.owner);
                if(country){
                  country.fillProvincesLayer(layer);
                  layer.setStyle({
                    fillColor:country.hexcolor,
                    fillOpacity:0.8,
                    weight:0.5,
                    color: country.hexcolor
                  });
                }
              }else{
                layer.setStyle({
                  weight:0.5,
                  fillColor:"rgb(68,107,163)",
                  color:"rgb(68,107,163)"
                });
              }
              
          }
        }
      }
    }
    );

    geojson.on("click", (event:any)=>{
      this.selectCountry(event.layer);
    });
  }


  selectCountry(layer:any){
    var selectedCountry:Country | undefined;
    this.countries.forEach(country=>{
      var exist_in_country = country.provinces.find(province=>province.feature.properties.hex === layer.feature.properties.hex);
      if(exist_in_country){
        selectedCountry = country;
        return;
      }
    });

    if(selectedCountry){
      if(selectedCountry.selected){
        console.log("Pais ya seleccionado");
        return;
      }
      selectedCountry.selected = true;
      selectedCountry.provinces.forEach(layer => {
        layer.setStyle({
            fillOpacity: 1,
            fillColor: "black"
        });
      });
    }
  }

}
