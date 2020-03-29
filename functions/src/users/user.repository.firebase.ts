import * as admin from 'firebase-admin';
import {UserRepository} from './user.repository';
import Timestamp = admin.firestore.Timestamp;

export class UserRepositoryFirebase implements UserRepository{

  usersPath = 'users/';

  deleteUserFromUsers(uid: string): Promise<any> {
    return this.db().doc(`${this.usersPath}/${uid}`).delete();
  }

  deleteUserFromAuth(uid: string): Promise<any> {
    return admin.auth().deleteUser(uid);
  }

  changeUserAccess(uid: string): Promise<any> {
    let isDisabled: boolean = false;
      admin.auth().getUser(uid).then(user => isDisabled = user.disabled).catch(error => console.log(error));
    if (isDisabled) {
      return admin.auth().updateUser(uid, {disabled: false});
    }
    else {
      return admin.auth().updateUser(uid, {disabled: true});
    }
  }

  timeStampForNewUser(userID: string): Promise<any> {
    return this.db().doc(`${this.usersPath}/${userID}`).update({
      creationDate: Timestamp.now()
    });
  }

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }
}
