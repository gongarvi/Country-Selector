export class Country{
  tag:string;
  hexcolor:string;
  provinces:Array<any> = new Array();
  selected:boolean;
  constructor(tag:string, hexcolor:string){
    this.tag = tag;
    this.hexcolor = hexcolor;
    this.provinces = new Array();
    this.selected=false;
  }

   public fillProvincesLayer(province : any ): void{
    this.provinces.push(province);
  }
}