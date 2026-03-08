import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/home';
import AboutUs from './pages/aboutUs';
import Register from "./pages/register";
import UserLogin from "./pages/login";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
       <Route path="/login" element={<UserLogin></UserLogin>}></Route>
    </Routes>
  );
}

export default App;
