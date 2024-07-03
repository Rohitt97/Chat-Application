export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  accessToken: string;
  verificationCode: string;
  isVerified: boolean;
};
