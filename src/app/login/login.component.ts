import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { SharedServiceService } from '../shared-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  githubUsers$: Observable<any>;
  constructor(private auth: AuthService, public sharedService: SharedServiceService) {

  }

  ngOnInit() {
  }

  login() {
    this.auth.login();
  }

}
