import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    public http: HttpClient,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getGithubUsers() {
     return this.http.get('https://api.github.com/users?since=135');
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap((user) => {
      if (user) {
        return this.userService.get(user.uid).valueChanges();
      } else {
        return of(null);
      }
    }));
  }
}
