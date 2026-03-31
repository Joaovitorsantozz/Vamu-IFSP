import {Navigate} from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";
import {jwtDecode} from "jwt-decode";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");  
  
    if (!token) {
      
        return <Navigate to="/login" replace />;
    }
    try{
        const {exp} = jwtDecode(token) as { exp: number };
        if(Date.now() >= exp * 1000){
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }

    }catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute