export interface UserRepository {
  deleteUserFromUsers(uid: string): Promise<any>;

  deleteUserFromAuth(uid: string): Promise<any>;

  changeUserAccess(uid: string): Promise<any>;

  timeStampForNewUser(userID: string): Promise<any>;
}
