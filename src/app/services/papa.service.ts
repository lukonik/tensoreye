import { Injectable } from '@angular/core';
import * as PapaParse from "papaparse"

@Injectable({
  providedIn:'root'
})
export class PapaService{
  parse(csv:string,config?:PapaParse.ParseConfig){
    return PapaParse.parse(csv,config)
  }
}
