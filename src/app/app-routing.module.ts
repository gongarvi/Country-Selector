import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { PreloadService } from './services/preload.service';

const routes: Routes = [
  {path:"", resolve: {data:PreloadService}, component: HomeComponent},
  {path: "mapa", resolve: {data:PreloadService}, component: MapaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
