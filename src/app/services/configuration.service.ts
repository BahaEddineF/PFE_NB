import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'app/models/Configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  apiUrl ="http://localhost:8001";
  constructor(public httpclient:HttpClient) { }

  AllConfiguration()
  {
      return this.httpclient.get<Configuration[]>(this.apiUrl+"/AllConfiguration");
  }

  DeleteConfiguration(id:number){
    
    return this.httpclient.delete<any>(this.apiUrl+"/deleteConfiguration/"+id)
  }

  AddConfiguration(config:Configuration){
    return this.httpclient.post<any>(this.apiUrl+"/addConfiguration", config);
  }

  UpdateConfiguration(p:Configuration)
  {
    return this.httpclient.put(this.apiUrl+"/updateConfiguration", p);
  }

  getConfiguration(id:number)
  {
    return this.httpclient.get<Configuration>(this.apiUrl+"/getConfigurationById/"+id);
  }
}
