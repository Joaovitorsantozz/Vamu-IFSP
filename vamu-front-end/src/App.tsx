import './index.css'
import { Route, Routes } from "react-router-dom";
import Home from './pages/home';
import AboutUs from './pages/AboutUs';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
    </Routes>
  )
}

export default App;
