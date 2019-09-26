import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user); // Once user login is done, it updates our firebase database
        const returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl); // redirects to the page from were login button was clicked
      }
    });
  }
}
