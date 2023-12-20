import React, { useContext, useState } from "react";
import UserFinder from "../apis/UserFinder";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";

const Register = () => {
  const { setIsAuthenticated } = useContext(RestaurantContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, name, password } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UserFinder.post(`/auth/register`, {
        name,
        password,
        email,
      });
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("userId", response.data.data.user_id);
      localStorage.setItem("userName", response.data.data.user_name);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto border-2 border-slate-800 rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-primary">
          Register
        </h1>
        <form className="space-y-4" onSubmit={onSubmitForm}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered input-primary"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <div>
            <button type="submit" className="btn btn-outline btn-primary btn-block">
              Submit
            </button>
          </div>
        </form>
        <Link
          to="/login"
          className="mt-2 flex items-center text-sm font-bold text-gray-600 hover:underline hover:text-blue-600"
        >
          <i className="fas fa-sign-in-alt mr-1"></i> Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
