import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {

    credentials = {email: '', password: ''};

    constructor(private auth: AuthenticateService, private http: HttpClient, private router: Router) {
    }

    login() {
        this.auth.authenticate(this.credentials, () => {
            this.router.navigateByUrl('/');
        });
        return false;
    }

}
