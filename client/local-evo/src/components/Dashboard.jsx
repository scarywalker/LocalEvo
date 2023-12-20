import React, { useEffect, useState } from "react";
import UserFinder from "../apis/UserFinder";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <h1 className="text-5xl text-center">Welcome {name}</h1>
      <div className=" flex flex-col p-8 gap-4">
        <button
          onClick={() => navigate("/restaurants")}
          className="btn btn-lg btn-outline btn-primary"
        >
          See Your Restaurants
        </button>
        <button
          onClick={() => navigate("/reviews")}
          className="btn btn-lg btn-outline btn-secondary"
        >
          See Your Reviews
        </button>
        <button
          onClick={() => navigate("/search")}
          className="btn btn-lg btn-outline btn-accent"
        >
          Search for Restaurants
        </button>
        <button onClick={() => navigate(`/user/${localStorage.userId}`)} className="btn btn-lg btn-outline">
          Change Your Nickname
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
