import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const navigate = useNavigate();

  // Logout function
  const logoutFn = () => {
    clearTokens(); // Properly clears tokens
    navigate("/auth/login", { replace: true }); // Redirects to login page
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-background border-b">
      {/* Left Section - Sidebar Toggle & Logo */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button (Hidden on Large Screens) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold">
          Ebook
        </Link>
      </div>

      {/* Center Section - Search Input (Hidden on Small Screens) */}
      <div className="hidden md:flex md:flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-md"
          />
        </div>
      </div>

      {/* Right Section - Search Icon (Mobile) & User Dropdown */}
      <div className="flex items-center space-x-4">
        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2 rounded-full">
              <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => console.log("Profile Clicked")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Settings Clicked")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutFn} className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function clearTokens() {
  throw new Error("Function not implemented.");
}
