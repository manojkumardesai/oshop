import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SharedServiceService } from '../shared-service.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(private auth: AuthService, public sharedService: SharedServiceService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser); // The detail is from DB whic we saved
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }
}
