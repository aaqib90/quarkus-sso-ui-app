import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SessionService {
    constructor(private http: HttpClient) {}

    checkSession() {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          };
        return this.http.get(`${environment.SERVER_URL}/check-session`, httpOptions);
    }
}
