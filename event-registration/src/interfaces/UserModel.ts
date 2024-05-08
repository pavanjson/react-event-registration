interface UserModel {
  userID?: number;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  otp?: string;
  isOrganizer?: boolean;
  isEmailVerified?: boolean;
}
export default UserModel;
