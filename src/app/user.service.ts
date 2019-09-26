import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }


  /**
   * This method is used to save user details in our
   * Firebase database
   *
   */
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }


  /**
   * Takes uid from google signin and gets the users
   * properties from our firebase database like username, email and isAdmin
   */
  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid); // Data which we saved in our databse
  }
}
