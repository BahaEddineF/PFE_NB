import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'app/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl ="http://localhost:8001";
  constructor(public httpclient:HttpClient) { }

  getAllRoles()
  {
    return this.httpclient.get<Role[]>(this.apiUrl+"/AllRole");

  }
}
