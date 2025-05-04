
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  sendOTP: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (using localStorage for demo)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll just check if email includes "@" and password is at least 6 chars
      if (!email.includes('@') || password.length < 6) {
        toast.error("Invalid credentials");
        return false;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success("Login successful");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to register
      // For demo purposes, we'll just check if email includes "@" and password is at least 6 chars
      if (!email.includes('@') || password.length < 6) {
        toast.error("Invalid credentials");
        return false;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: name || email.split('@')[0],
        email: email,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success("Registration successful");
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
  };

  const sendOTP = async (email: string): Promise<boolean> => {
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("OTP sent to your email");
      return true;
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Failed to send OTP");
      return false;
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    try {
      // Simulate verifying OTP - in a demo, any 6-digit code works
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (otp.length === 6 && /^\d+$/.test(otp)) {
        toast.success("OTP verified successfully");
        return true;
      } else {
        toast.error("Invalid OTP");
        return false;
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("OTP verification failed");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, sendOTP, verifyOTP }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
