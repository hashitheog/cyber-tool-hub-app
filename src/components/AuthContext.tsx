
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in (simulated localStorage check)
    const storedUser = localStorage.getItem("cyber_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Invalid stored data
        localStorage.removeItem("cyber_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would call Firebase Auth
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password.length >= 6) {
        const user = { id: `user-${Date.now()}`, email };
        localStorage.setItem("cyber_user", JSON.stringify(user));
        setUser(user);
        toast.success("Login successful!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      // Simulate Google auth - in a real app, this would use Firebase Google auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockGoogleUser = {
        id: `google-user-${Date.now()}`,
        email: "google-user@example.com",
        displayName: "Google User",
        photoURL: "https://lh3.googleusercontent.com/a/default-user"
      };
      
      localStorage.setItem("cyber_user", JSON.stringify(mockGoogleUser));
      setUser(mockGoogleUser);
      toast.success("Google login successful!");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    // In a real app, this would call Firebase Auth
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password.length >= 6) {
        const user = { id: `user-${Date.now()}`, email };
        localStorage.setItem("cyber_user", JSON.stringify(user));
        setUser(user);
        toast.success("Registration successful!");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("cyber_user");
    setUser(null);
    toast.success("Logged out successfully.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
