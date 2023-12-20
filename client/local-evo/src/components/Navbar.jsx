import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";

const Navbar = () => {
  const { setIsAuthenticated } = useContext(RestaurantContext);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                className="btn btn-sm btn-ghost place-content-center"
                to="/reviews"
              >
                My reviews
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-sm btn-ghost place-content-center"
                to="/restaurants"
              >
                My Restaurants
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-sm btn-ghost place-content-center"
                to="/search"
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-sm btn-ghost text-lg  " to="/">
          Dashboard
        </Link>
      </div>
      <div className="navbar-center hidden sm:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              className="btn btn-sm btn-ghost place-content-center"
              to="/reviews"
            >
              My reviews
            </Link>
          </li>
          <li>
            <Link
              className="btn btn-sm btn-ghost place-content-center"
              to="/restaurants"
            >
              My Restaurants
            </Link>
          </li>
          <li>
            <Link
              className="btn btn-sm btn-ghost place-content-center"
              to="/search"
            >
              Search
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-sm btn-outline btn-error"
          onClick={(e) => logout(e)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
