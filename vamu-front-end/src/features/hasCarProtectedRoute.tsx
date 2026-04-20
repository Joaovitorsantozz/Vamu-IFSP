import {Navigate} from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";

import { useContext } from "react";
import { UserContext } from "../context/userContext";
const HasCarProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const {car}= useContext(UserContext);
  
    if (!car) {
      
        return <Navigate to="/dashboard" replace />;
    }
 
    return children;
}

export default HasCarProtectedRoute;