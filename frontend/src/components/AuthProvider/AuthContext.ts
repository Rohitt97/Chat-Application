import React from "react";
import { AuthUser } from "../../types/authUser";

export type AuthContextType = {
  loading: boolean;
  authUser: AuthUser | null;
  setAuthUser: (user?: AuthUser) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  loading: true,
  authUser: null,
  setAuthUser: (user?: AuthUser) => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};
