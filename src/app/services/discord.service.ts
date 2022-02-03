import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'leaflet';
import { catchError, Observable } from 'rxjs';
import { DiscordUser, TokenResponse } from '../shared/interfaces/discordResponse';

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  private API_ENDPOINT = 'https://discord.com/api/v8'
  private CLIENT_ID = '906860823190831145'
  private CLIENT_SECRET = 'fLmGkDCCjCkG9LOaHQgHx9196lKjGPU4'
  private REDIRECT_URI = 'http://localhost:4200'

  constructor(
    private http:HttpClient
  ) { }

  hasSessionSaved():boolean{
    let session = sessionStorage.getItem("token");
    return session!=null;
  }

  changeCodeToken(code:string):Observable<TokenResponse>{
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    var params = new HttpParams();
    params = params.append("client_id", this.CLIENT_ID);
    params = params.append("client_secret", this.CLIENT_SECRET);
    params = params.append("grant_type", "authorization_code");
    params = params.append("code", code);
    params = params.append("redirect_uri", this.REDIRECT_URI);

    var request = this.http.post<TokenResponse>(this.API_ENDPOINT + "/oauth2/token", params, {headers: headers});
    request.subscribe(
      response=>{
        sessionStorage.setItem("token", response.access_token);
        sessionStorage.setItem("token_type", response.token_type)
      }
    );
    return request;
  }

  getCurrentUser():Observable<DiscordUser>|null{
    var token:string | null = sessionStorage.getItem("token"),
    token_type = sessionStorage.getItem("token_type"),
    headers = new HttpHeaders({'Authorization': `${token_type} ${token}`});
    if(headers){
      return this.http.get<DiscordUser>(this.API_ENDPOINT+"/users/@me", {headers: headers});
    }
    return null;
  }

  getUserAvatar(user_id:number, user_banner:string):Promise<string|ArrayBuffer>{
    return new Promise((resolve)=>{this.http.get(`https://cdn.discordapp.com/avatars/${user_id}/${user_banner}.png`, { responseType: 'blob' }).subscribe(
      async (image:Blob)=>{
        resolve(await this.blobToBase64(image));
      }
    )});
    
  }

  blobToBase64(blob:Blob):Promise<string|ArrayBuffer> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => {if(reader.result!=null )resolve(reader.result);}
      reader.readAsDataURL(blob);
    });
  }
}
