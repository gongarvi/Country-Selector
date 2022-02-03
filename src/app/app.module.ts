import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: API_KEY,
      useValue: "AIzaSyBac6cRyIAyuGTX1RlPfHAAS4pMDLbAF6Q"
    },
    GoogleSheetsDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
