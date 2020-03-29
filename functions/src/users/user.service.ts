import {UserRepository} from './user.repository';

export class UserService {
  constructor(private repo: UserRepository) {}

  deleteUserFromDatabase(uid: string): Promise<any> {
    return this.repo.deleteUserFromUsers(uid);
  }

  deleteUserFromAuth(uid: string): Promise<any> {
    return this.repo.deleteUserFromAuth(uid);
  }

  changeUserAccess(uid: string): Promise<any> {
    return this.repo.changeUserAccess(uid);
  }

  timeStampNewUser(uid: string): Promise<any> {
    return this.repo.timeStampForNewUser(uid);
  }

}
