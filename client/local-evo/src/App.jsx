import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MyRestaurantsPage from "./routes/MyRestaurantsPage";
import UpdateRestaurantPage from "./routes/UpdateRestaurantPage";
import BusinessPage from "./routes/BusinessPage";
import DashboardPage from "./routes/DashboardPage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import { RestaurantContext } from "./context/RestaurantContext";
import UserFinder from "./apis/UserFinder";
import SearchPage from "./routes/SearchPage";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(true);

  const isAuth = async () => {
    try {
      const response = await UserFinder.get("/auth/is-verify", {
        headers: { token: localStorage.token },
      });
      setIsAuthenticated(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAuth();
  }, [localStorage.token]);

  if (loading) {
    // Render loading state or spinner while authentication check is in progress
    return <Loading/>
  }

  return (
    <div className="flex justify-center">
    <div className="mb-12 mx-0 sm:mx-4 max-w-5xl w-full">
      <Router>
        <Routes>
          <Route
            exact
            path="/restaurants"
            element={
              isAuthenticated ? <MyRestaurantsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/restaurants/:id"
            element={
              isAuthenticated ? <BusinessPage /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/search"
            element={
              isAuthenticated ? <SearchPage /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/restaurants/:id/update"
            element={
              isAuthenticated ? (
                <UpdateRestaurantPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
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
            path="/"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </Router>
      <Footer />
    </div></div>
  );
};

export default App;
