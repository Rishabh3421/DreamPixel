import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" }
];

export const MobileNav = ({ user, onLoginClick, onLogoutClick }: any) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="md:hidden">
      <button
        className="text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute right-4 top-16 z-50 w-48 rounded-md bg-dreamdark border border-white/10 p-4 shadow-lg">
          <nav className="flex flex-col space-y-4 text-sm text-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-white/20 pt-4">
              {user ? (
                <Button variant="outline" size="sm" onClick={() => { onLogoutClick(); setOpen(false); }}>
                  Logout
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => { onLoginClick(); setOpen(false); }}>
                  Login
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
