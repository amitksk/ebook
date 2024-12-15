import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, UserCircle } from "lucide-react";
import useTokenStore from "@/store"
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


  const {token, setToken} = useTokenStore((state)=> state);
  if(token===''){
    return <Navigate to={'/auth/login'} replace/>
  }

  const logoutFn=()=>{
    setToken('');
  }


  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-4 lg"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/dashboard" className="text-2xl font-bold">
          Ebook
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative md:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-[300px]"
          />
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-3 rounded-full">
              <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />{" "}
              {/* Responsive sizes */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => console.log("Profile Clicked")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Settings Clicked")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                 logoutFn
              }}
              className="text-red-600"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
