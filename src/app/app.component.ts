import { Component, OnInit } from '@angular/core';
import { Resolve } from '@angular/router';
import { circle, latLng, LatLngExpression, polygon, tileLayer } from 'leaflet';
import { SkanderbegService } from './services/skanderbeg.service';
import { Country } from './shared/clases/Country';
declare var provinces:any;
declare var L:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(
    private skanderbeg:SkanderbegService
  ){}
  

}
