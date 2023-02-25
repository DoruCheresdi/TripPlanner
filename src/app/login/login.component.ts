import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {

    credentials = {email: '', password: ''};

    constructor(private app: AuthenticateService, private http: HttpClient, private router: Router) {
    }

    login() {
        this.app.authenticate(this.credentials, () => {
            this.router.navigateByUrl('/');
        });
        return false;
    }

}
