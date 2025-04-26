
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from "@/contexts/AppContext";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  initialView?: "login" | "signup";
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AuthModal({ initialView = "login", trigger, isOpen, onOpenChange }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialView);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { login, signup, googleLogin, isLoading } = useApp();
  const { toast } = useToast();

  // Use either controlled (from parent) or uncontrolled (internal) state
  const openState = isOpen !== undefined ? isOpen : internalIsOpen;
  const setOpenState = onOpenChange || setInternalIsOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === "login") {
        await login(email, password);
        setOpenState(false);
      } else {
        if (!name) {
          toast({
            title: "Name required",
            description: "Please enter your name to create an account",
            variant: "destructive"
          });
          return;
        }
        await signup(email, password, name);
        setOpenState(false);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setOpenState(false);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Log In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass border-white/10">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Log In" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Enter your email and password to log in to your account."
              : "Create a new account to get started with DreamPixel."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-dreamdark-lighter border-white/10"
                placeholder="Your name"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-dreamdark-lighter border-white/10"
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-dreamdark-lighter border-white/10"
              placeholder="••••••••"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={16} className="animate-spin mr-2" />
                {mode === "login" ? "Logging in..." : "Signing up..."}
              </>
            ) : (
              mode === "login" ? "Log In" : "Sign Up"
            )}
          </Button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-dreamdark px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          className="w-full border-white/10 hover:bg-white/5"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader size={16} className="animate-spin mr-2" />
          ) : (
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          Google
        </Button>
        
        <div className="text-center text-sm text-muted-foreground mt-2">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            onClick={toggleMode}
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
