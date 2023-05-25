import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from 'app/models/utilisateur';
import { UtilisateurInfo } from 'app/models/utilisateurInfo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:8001";

  constructor(public httpclient: HttpClient) { }

  getAllUser(): Observable<UtilisateurInfo[]> {
    return this.httpclient.get(this.apiUrl + "/getAllUser").pipe(
      map((response: any) => response as UtilisateurInfo[])
    );
  }

  deleteUser(id: number) {

    return this.httpclient.delete<any>(this.apiUrl + "/deleteUser/" + id)
  }

  addUser(user: Utilisateur) {
    return this.httpclient.post<any>(this.apiUrl + "/addUser", user);
  }

  updateUser(p: UtilisateurInfo) {
    return this.httpclient.put(this.apiUrl + "/updateUser", p);
  }

  getUserInfoById(id: number) {
    return this.httpclient.get<UtilisateurInfo>(this.apiUrl + "/getUserInfoById/" + id);
  }

  blockUser(id: number) {

    return this.httpclient.put<any>(this.apiUrl + "/blockUser/" + id, null)
  }

  unblockUser(id: number) {

    return this.httpclient.put<any>(this.apiUrl + "/unblockUser/" + id, null)
  }
  countUsers()
  {
    return this.httpclient.get<any>(this.apiUrl + "/countUsers")
  }

  getUserProfile() {
    return this.httpclient.get<UtilisateurInfo>(this.apiUrl + "/getUserProfile");
  }
}
