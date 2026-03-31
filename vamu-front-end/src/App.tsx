import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/aboutUs";
import Register from "./pages/register";
import UserLogin from "./pages/login";
import ProtectedRoute from "./features/protectedRoute";
import Dashboard from "./pages/dashboard";
import RidePage from "./pages/ridePage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<UserLogin></UserLogin>}></Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/offer-ride"
        element={
          <ProtectedRoute>
            <RidePage />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
