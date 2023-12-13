import React, { useContext, useEffect, useState } from "react";
import UserFinder from "../apis/UserFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { setIsAuthenticated } = useContext(RestaurantContext);

  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await UserFinder.get(`/dashboard`, {
        headers: { token: localStorage.token },
      });
      setName(response.data.user_name);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <h1>Dashboard {name}</h1>
      <button className="btn btn-danger" onClick={(e) => logout(e)}>
        Logout
      </button>
      <Link to="/">home</Link>
    </>
  );
};

export default Dashboard;
