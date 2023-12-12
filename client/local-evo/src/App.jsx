import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./routes/HomePage";
import UpdateRestaurantPage from "./routes/UpdateRestaurantPage";
import BusinessPage from "./routes/BusinessPage";
import DashboardPage from "./routes/DashboardPage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import { RestaurantContext } from "./context/RestaurantContext";
import UserFinder from "./apis/UserFinder";


const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);

  const isAuth = async () => {
    try {
      const response = await UserFinder.get("/auth/is-verify", {
        headers: { token: localStorage.token },
      });
      setIsAuthenticated(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/restaurants/:id" element={<BusinessPage />} />
          <Route
            exact
            path="/restaurants/:id/update"
            element={<UpdateRestaurantPage />}
          />
          <Route
            exact
            path="/login"
            element={
              !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            exact
            path="/register"
            element={
              !isAuthenticated ? <RegisterPage /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
