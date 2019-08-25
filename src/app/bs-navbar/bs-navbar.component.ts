import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  constructor(public auth: AuthService, public sharedService: SharedServiceService) {
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
