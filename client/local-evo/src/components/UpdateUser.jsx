import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import UserFinder from "../apis/UserFinder";
import ReturnButton from "./ReturnButton";

const UpdateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState(localStorage.userName);
  const { setIsAuthenticated } = useContext(RestaurantContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserFinder.put(`/dashboard/${id}`, {
        name,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center">Update Username {name}</h1>
      <form className="form-control m-8" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          className="input input-bordered input-sm mb-2"
          type="text"
        />
        <button
          type="submit"
          className="btn btn-outline btn-sm btn-primary my-6"
        >
          Submit
        </button>
        <ReturnButton />
      </form>
    </div>
  );
};

export default UpdateUser;
