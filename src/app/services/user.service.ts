import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    // postURLEndPoint:string = 'https://quarkus-sso-2fa.herokuapp.com/api/v1/register';
    constructor(private http: HttpClient) {}

    getAllUsers() {
        return this.http.get<User[]>('/users');
    }
    onCreateUser(user:User){
        const obj = {
            email:user.email,
            firstname:user.firstName,
            lastname:user.lastName,
            password:user.password
        }
        return this.http.post(environment.SERVER_URL+'/register', obj);
    }
    onDeleteUser(id: number) {
        return this.http.delete(`/users/${id}`);
    }

    getQRUrl(email: string) {
        return this.http.get(`${environment.SERVER_URL}/get-qrcode/${email}`);
    }

    verify2FaPin(obj: any) {
        return this.http.post(`${environment.SERVER_URL}/verify-totp`, obj);
    }

    login(obj:any) {
        return this.http.post(`${environment.SERVER_URL}/login`, obj);
    }

    logout(email:string) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          };
        return this.http.get(`${environment.SERVER_URL}/logout?email=${email}`, httpOptions);
    }
}