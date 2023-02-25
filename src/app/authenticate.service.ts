import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticateService {

    authenticated = false;

    constructor(private http: HttpClient) {
    }

    authenticate(credentials: { email: any; password: any; } | undefined,
                 callback: { (): void; (): any; } | undefined) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        } : {});

        this.http.get('devapi/user', {headers: headers}).subscribe((response: any) => {
            if (response['name']) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });
    }
}
