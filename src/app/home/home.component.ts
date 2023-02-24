import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    title = 'Demo';
    greeting : {id : string, content : string};

    constructor(private app: AppService, private http: HttpClient) {
        this.greeting = {id : "", content : ""};
        http.get('devapi/resource').subscribe((data : any) => this.greeting = data);
    }

    authenticated() { return this.app.authenticated; }

}
