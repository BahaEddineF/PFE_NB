import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiUrl = "http://localhost:8001/api/auth";

    constructor(public httpclient: HttpClient) { }

    public login(user: any):Observable<any> {
        return this.httpclient.post(this.apiUrl + '/login', user);
    }
}