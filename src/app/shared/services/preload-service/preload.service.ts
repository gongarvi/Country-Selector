import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SkanderbergService } from 'src/app/shared/services/skanderberg/skanderberg.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadService implements Resolve<any>{

  constructor(
    private skanderbeg:SkanderbergService
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.skanderbeg.getCountriesData().length==0 || this.skanderbeg.getProvincesData().length == 0){
      await this.skanderbeg.initialData();
    }
  }
}
