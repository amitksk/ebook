import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search } from 'lucide-react'

interface HeaderProps {
  toggleSidebar: () => void
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4 lg" aria-label="Toggle sidebar">
          <Menu className="h-6 w-6" />
        </Button>
        <Link to ="/dashboard" className="text-2xl font-bold">
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
        <Button variant="ghost">Logout</Button>
      </div>
    </header>
  )
}

