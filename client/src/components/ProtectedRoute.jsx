import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

/**
 * ProtectedRoute (The Security Guard)
 * 
 * We wrap this around any page that should be hidden from the public.
 * It uses 'useSelector' (the food runner!) to check Redux to see if the user is logged in.
 */
function ProtectedRoute ({children}){
    // Grab the isAuthenticated status from the redux vault
    const {isAuthenticated} = useSelector((state) => state.auth)

    // if they are not logged in, kick them to the login page
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    //If they are logged in let them see the dashboard
    return children;
}

export default ProtectedRoute;