import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export function ProtectedRoute({children}:{children: React.ReactNode}){
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) return <Navigate to={"/login"} />

    return children   
}