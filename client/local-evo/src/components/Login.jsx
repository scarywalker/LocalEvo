import React, { useContext, useState } from "react";
import UserFinder from "../apis/UserFinder";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";

const Login = () => {
  const { setIsAuthenticated, setUserInfo, userInfo } = useContext(RestaurantContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UserFinder.post(`/auth/login`, {
        password,
        email,
      });
      localStorage.setItem("token", response.data.data.token);
      setIsAuthenticated(true);
      setUserInfo({...userInfo,
        user_id: response.data.data.user_id,
        user_name: response.data.data.user_name,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <button className="btn btn-success btn-block">Login</button>
      </form>
      <Link to="/register">register</Link>
    </>
  );
};

export default Login;
