import React, { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);

  return (
    <>
      <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
        Dashboard
      </button>
    </>
  );
};

export default Dashboard;
