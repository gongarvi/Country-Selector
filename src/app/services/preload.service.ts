import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SkanderbegService } from './skanderbeg.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadService implements Resolve<any>{

  constructor(
    private skanderbeg:SkanderbegService
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.skanderbeg.getCountriesData().length==0 || this.skanderbeg.getProvincesData().length == 0){
      await this.skanderbeg.initialData();
    }
  }
}
