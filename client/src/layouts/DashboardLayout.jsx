import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-[#F7F5F2]">

            {/* Sidebar */}

            <aside className="w-[280px] min-h-screen border-r border-gray-200">
                Sidebar
            </aside>

            {/* Main */}

            <div className="flex-1">

                {/* Navbar */}

                <header className="h-20 border-b border-gray-200">
                    Navbar
                </header>

                {/* Page */}

                <main className="p-8">
                    <Outlet/>
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;