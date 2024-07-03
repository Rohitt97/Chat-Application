import React from "react";
import { useRouteMatch } from "../../hooks";
import { anonymousRoutes, publicRoutes } from "../../utils/routes";
import { useAuth } from "../AuthProvider/AuthContext";
import { Navigate } from "react-router-dom";

export function Page({ PageComponent }: { PageComponent: any }) {
  const isPublic = useRouteMatch(publicRoutes);
  const isAnonymous = useRouteMatch(anonymousRoutes);
  const { authUser, loading } = useAuth();

  if (!isPublic) {
    if (isAnonymous) {
      if (authUser) {
        return <Navigate to="/dashboard/chat-window" />;
      }
    } else if (!authUser && loading) {
      return <div>Loading...</div>;
    } else if (!authUser && !loading) {
      return <Navigate to="/auth/signin" />;
    }
  }

  return (
    <React.Fragment>
      <PageComponent />
    </React.Fragment>
  );
}
