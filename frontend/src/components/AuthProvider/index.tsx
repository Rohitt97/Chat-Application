import React from "react";
import { AuthContext } from "./AuthContext";
import { getAuthUser } from "../../services/authService";
import { AuthUser } from "../../types/authUser";

type AuthStateType = {
  loading: boolean;
  authUser: AuthUser | null;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthStateType>({
    loading: true,
    authUser: null,
  });

  React.useEffect(() => {
    //get loggedin user information from server
    //set that to the authUser
    (async () => {
      const user = await getAuthUser();
      if (user) {
        setState({
          authUser: user,
          loading: false,
        });
      } else {
        setState({
          authUser: null,
          loading: false,
        });
      }
    })();
  }, []);

  function setAuthUser(user?: AuthUser | null) {
    setState({
      authUser: user ?? null,
      loading: false,
    });
  }

  const contextValue = {
    ...state,
    setAuthUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
