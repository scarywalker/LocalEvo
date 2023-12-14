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
      <h1>Dashboard of {name}</h1>
      <button className="btn btn-danger" onClick={(e) => logout(e)}>
        Logout
      </button>
        {" "}
        <Link  className="btn btn-primary m-2" to="/">My Restaurants</Link>
        <Link  className="btn btn-secondary m-2" to="/Search">Search Restaurants</Link>
        <div><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores officiis repellendus repudiandae saepe adipisci eveniet ut at fugiat error sed debitis esse, magnam asperiores odit nisi autem perspiciatis laboriosam. Accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dicta consequatur recusandae quia soluta sunt illum minus, cumque explicabo provident corrupti vitae laudantium mollitia doloremque! Suscipit possimus nostrum similique porro.</p></div>
    </>
  );
};

export default Dashboard;
