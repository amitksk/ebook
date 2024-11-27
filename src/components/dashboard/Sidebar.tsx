'use client'

import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LayoutDashboard,  X } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard }, // Default route
  { href: '/books', label: 'Books', icon: LayoutDashboard },
];


interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation()
  const pathname = location.pathname

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex items-center justify-between p-6 bg-muted">
          <h2 className="text-lg font-semibold">Navigation</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)] pb-10">
          <nav className="space-y-2 p-6">
            {navItems.map((item) => (


              <Link key={item.href} to={item.href}>
                <Button
                  variant="outline"
                  className={`w-full justify-start ${
                    pathname === item.href ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>


            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}