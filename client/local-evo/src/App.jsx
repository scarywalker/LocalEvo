import React, { useContext } from "react";
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
const App = () => {
  const { isAuthenticated } = useContext(RestaurantContext);

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
