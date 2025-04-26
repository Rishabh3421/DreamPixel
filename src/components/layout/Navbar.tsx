import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/button";
import { AuthModal } from "../auth/AuthModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "../ThemeToggle";
import { supabase } from "@/lib/supabaseClient"; // Make sure this path is correct

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/pricing", label: "Pricing" }
];

export const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-dreamdark backdrop-blur supports-[backdrop-filter]:bg-dreamdark/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-2 flex items-center space-x-2">
            <span className="font-bold text-xl text-gradient">DreamPixel</span>
          </Link>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors hover:text-foreground/80 ${
                  isActive(link.href) ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.user_metadata?.avatar_url}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-white">{user.user_metadata?.name}</span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={openAuthModal}>
                  Login
                </Button>
                <AuthModal isOpen={authModalOpen} onOpenChange={closeAuthModal} />
              </>
            )}

            {isMobile && <MobileNav />}
          </nav>
        </div>
      </div>
    </header>
  );
};
