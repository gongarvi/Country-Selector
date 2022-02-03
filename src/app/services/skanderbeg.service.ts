import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'leaflet';
import { forkJoin, Observable } from 'rxjs';
import { Country } from '../shared/clases/Country';

@Injectable({
  providedIn: 'root'
})
export class SkanderbegService {

  private url = "https://skanderbeg.pm/api.php?";
  private initialSave = "7d6187";
  private key = "ae85ec2021cc9fe8a2040ae6b944a564"
  constructor(
    private http: HttpClient
  ) { }
  async initialData(){
    return new Promise((resolve, reject)=>{
      forkJoin(
        {
          provincesData : this.http.get<any>(`${this.url}?key=${this.key}&save=${this.initialSave}&type=provincesData&scope=getSaveDataDump`),
          countriesData : this.http.get<any>(`${this.url}?key=${this.key}&save=${this.initialSave}&type=countriesData&scope=getSaveDataDump`),
          provincesIds : this.http.get<any>(`assets/json/provinces.json`),
        }
      ).subscribe(
        data=>{
          var correctValues = new Array<any>();
          Object.keys(data.provincesData).forEach(key=>{
            if(Number.isInteger(parseInt(key))){
              correctValues.push({provinceId:key, owner:data.provincesData[key].owner})
            }
          })
          var countries = new Array<Country>();
          for(var key in data.countriesData){
            if(key.length==3){
              let country = new Country(key, data.countriesData[key]["hex"]);
              countries.push(country);
            }
          }
          console.log(data.provincesIds)
          localStorage.setItem("provincesData", JSON.stringify(correctValues))
          localStorage.setItem("countriesData", JSON.stringify(countries))
          localStorage.setItem("provincesIds", JSON.stringify(data.provincesIds))
          console.log
          resolve("");
        }
      )
    });
    
  }
  public getProvincesData():Array<Object>{
    let string = localStorage.getItem("provincesData");
    if(string){
      return JSON.parse(string);
    }
    return [];
  }

  public getCountriesData():Array<Country>{
    let string = localStorage.getItem("countriesData");
    if(string){
      var array : Array<any> = JSON.parse(string), def_array = new Array<Country>();
      array.forEach(country => def_array.push(new Country(country.tag, country.hexcolor)));
      return def_array;
    }
    return [];
  }

  public getPronvincesIds(){
    let string = localStorage.getItem("provincesIds");
    if(string){
      return JSON.parse(string);
    }
    return {};
  }
}
