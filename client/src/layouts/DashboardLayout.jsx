import { Sidebar } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div>
            <Navbar/>
            <Sidebar/>

            <main>
                <Outlet/>gi 
            </main>
        </div>
    );
}

export default DashboardLayout;