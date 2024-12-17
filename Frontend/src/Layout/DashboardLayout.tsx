"use client";

import { useState } from "react";
import { Header } from "../components/dashboard/Header";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import useTokenStore from "@/store";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const accessToken = useTokenStore((state) => state.accessToken);
  // Redirect to /auth/login if accessToken is empty
  if (!accessToken) {
    return <Navigate to={"/auth/login"} replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-6 bg-background">
          <Outlet /> {/* Dynamically renders child routes */}
        </main>
      </div>
    </div>
  );
}
