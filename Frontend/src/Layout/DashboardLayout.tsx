 import { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Link, Outlet } from "react-router-dom";
import {Footer} from "../components/dashboard/Footer";
import { Book, Home, PlusCircle } from "lucide-react";
 
export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Responsive Aside Section */}
        <aside
          className={`w-full md:w-64 bg-blue-100 shadow-md md:block ${
            isSidebarOpen ? "block" : "hidden"
          } md:relative fixed top-0 left-0 z-40`}
        >
          <nav className="mt-6">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              <Home className="inline-block w-5 h-5 mr-2" />
              Home
            </Link>
            <Link
              to="/books"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              <Book className="inline-block w-5 h-5 mr-2" />
              Books
            </Link>

            <Link
              to="/books/create"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              <PlusCircle className="inline-block w-5 h-5 mr-2" />
              Create
            </Link>

          </nav>
        </aside>

        {/* Main Outlet */}
        <main className="flex-1 p-6 bg-background">

          <Outlet /> {/* Dynamically renders child routes */}

        </main>
      </div>
      <Footer />
    </div>
  );
}
