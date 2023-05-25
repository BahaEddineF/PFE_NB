import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampagneMailing } from 'app/models/CampagneMailing';

@Injectable({
  providedIn: 'root'
})
export class CompagnymailingService {
  apiUrl ="http://localhost:8001";

  constructor(public httpclient:HttpClient) { }
  
  AllCampagneMailing()
  {
      return this.httpclient.get<CampagneMailing[]>(this.apiUrl+"/AllCampagneMailing");
  }

  DeleteCampagneMailing(id:number){
    
    return this.httpclient.delete<any>(this.apiUrl+"/deleteCampagneMailing/"+id)
  }

  AddCampagneMailing(campagneMailing:CampagneMailing){
    return this.httpclient.post<any>(this.apiUrl+"/addCampagneMailing", campagneMailing);
  }

  UpdateCampagneMailing(p:CampagneMailing)
  {
    return this.httpclient.put(this.apiUrl+"/updateCampagneMailing", p);
  }

  getCampagneMailing(id:number)
  {
    return this.httpclient.get<CampagneMailing>(this.apiUrl+"/getCampagneMailingById/"+id);
  }


  AddCampagneMailingWithModeleAndConfig(config:CampagneMailing ){
    return this.httpclient.post<any>(this.apiUrl+"/addCampagneMailingWithConfigAndModele", config);
  }
  
  saveCampagneMailing(model:CampagneMailing){
    return this.httpclient.post<any>(this.apiUrl+"/saveCampagneMailing", model);
  }

  sendSynchronousMail(model:CampagneMailing)
  {
      return this.httpclient.post<any>(this.apiUrl+"/sendSynchronousMail",model);
  }
  countCampagneMailings()
  {
    return this.httpclient.get<any>(this.apiUrl+"/countCampagneMailings");
  }
}
