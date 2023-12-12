import React, { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);

  return (
    <>
      <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
        Login
      </button>
    </>
  );
};

export default Login;
