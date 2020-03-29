import {UserController} from './user.controller';
import {Change, EventContext} from 'firebase-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {UserRecord} from 'firebase-functions/lib/providers/auth';
import {UserService} from './user.service';

export class UserControllerFirebase implements UserController{

  constructor(private service: UserService) {}

  changeUserAccess(change: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
    const uid = context.params.userID;
    return this.service.changeUserAccess(uid);
  }

  deleteUserFromAuth(userData: UserRecord, context: EventContext): Promise<void> {
    const uid = context.params.userID;
    return this.service.deleteUserFromAuth(uid);
  }

  deleteUserFromFirestoreUsers(snap: DocumentSnapshot, context: EventContext): Promise<void> {
    const uid = context.params.userID;
    return this.service.deleteUserFromDatabase(uid);
  }

  setCreationDate(snap: DocumentSnapshot, context: EventContext): Promise<void> {
    const uid = context.params.userID;
    return this.service.timeStampNewUser(uid);
  }

}
