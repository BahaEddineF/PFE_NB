import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modele } from 'app/models/Modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  apiUrl ="http://localhost:8001";
  constructor(public httpclient:HttpClient) { }

  AllModele()
  {
      return this.httpclient.get<Modele[]>(this.apiUrl+"/AllModele");
  }

  DeleteModele(id:number){
    
    return this.httpclient.delete<any>(this.apiUrl+"/deleteModele/"+id)
  }

  AddModele(config:Modele){
    return this.httpclient.post<any>(this.apiUrl+"/addModele", config);
  }

  UpdateModele(p:Modele)
  {
    return this.httpclient.put(this.apiUrl+"/updateModele", p);
  }

  getModele(id:number)
  {
    return this.httpclient.get<Modele>(this.apiUrl+"/getModeleById/"+id);
  }
}
