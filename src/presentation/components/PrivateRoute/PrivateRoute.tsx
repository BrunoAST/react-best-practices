import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import ApiContext from "../../context/api/api-context";

// Proxy pattern: It has the same behavior as react-router-dom Route, but it can decide if the pathname can be accessed
const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ?
    <Route {...props} /> :
    <Route {...props} component={() => <Redirect to="/login"/>}/>;
}

export default PrivateRoute;
