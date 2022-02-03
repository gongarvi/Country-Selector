import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetsService {

  //We call to our backend that connect to google sheet. With that we hide our user credentials
  private API_URL:string = "http://localhost:8000/";
  constructor(
    private http:HttpClient
  ) { }


  establishClientComunication(documentId:string){
    
  }
  
  fetchAllData(){
    
  }
  
  selectCountry(TAG:string){
    this.http.post(this.API_URL+"",{headers:""}).subscribe
  }
}
