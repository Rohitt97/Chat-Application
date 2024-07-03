import { matchPath, useLocation } from "react-router-dom";

export const useRouteMatch = (routes: string[]) => {
  const location = useLocation();
  return routes.some((route) => matchPath(route, location.pathname));
};
