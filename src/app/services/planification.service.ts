import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planification } from 'app/models/Planification';

@Injectable({
  providedIn: 'root'
})
export class PlanificationService {
  apiUrl ="http://localhost:8001";
  constructor (public httpclient:HttpClient) { }

  AllPlanification()
  {
      return this.httpclient.get<Planification[]>(this.apiUrl+"/AllPlanification");
  }

  DeletePlanification(id:number){
    
    return this.httpclient.delete<any>(this.apiUrl+"/deletePlanification/"+id)
  }

  AddPlanification(config:Planification){
    return this.httpclient.post<any>(this.apiUrl+"/addPlanification", config);
  }

  UpdatePlanification(p:Planification)
  {
    return this.httpclient.put(this.apiUrl+"/updatePlanification", p);
  }

  getPlanification(id:number)
  {
    return this.httpclient.get<Planification>(this.apiUrl+"/getPlanificationById/"+id);
  }

}
