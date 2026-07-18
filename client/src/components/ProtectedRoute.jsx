import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

/**
 * ProtectedRoute (The Security Guard)
 * 
 * We wrap this around any page that should be hidden from the public.
 * It uses 'useSelector' (the food runner!) to check Redux to see if the user is logged in.
 */
function ProtectedRoute({ children }) {
  // Grab the isAuthenticated status from the redux vault
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  // Why this matters when the page refreshes app.jsx calls /auth/me. 
  // That api call takes `200ms. During that time loading=true.
  // without this check the security giard would see isauthenticated=false
  // and immediately kick the user to /login befine the check even finishes
  // so if were still checking show a spinner just wait
  
  if(loading){
    return (
      <div className="protected-route-loader flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent">
        </div>
      </div>
    )
  }

  // if they are not logged in, kick them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  //If they are logged in let them see the dashboard
  return children;
}

export default ProtectedRoute;