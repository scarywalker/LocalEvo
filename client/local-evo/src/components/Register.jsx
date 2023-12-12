import React, { useContext, useState } from "react";
import UserFinder from "../apis/UserFinder";
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
      const response = await UserFinder.post(`/register`, {
        name,
        password,
        email,
      });
      localStorage.setItem("token",response.data.data.token)
      setIsAuthenticated(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register </h1>
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
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </>
  );
};

export default Register;
