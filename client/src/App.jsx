import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return ( 
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/" element={<Register/>} />
      <Route path="/" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;