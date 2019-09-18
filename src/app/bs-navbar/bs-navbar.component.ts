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
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.sharedService.githubUsers$.subscribe(resp => {
      console.log(resp);
    });
  }
}
