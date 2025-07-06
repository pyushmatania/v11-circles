import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate: string;
  investmentCount: number;
  totalInvested: number;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    twoFactor: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for demonstration
  const mockUser: User = useMemo(() => ({
    id: '1',
    email: 'rahul.investor@gmail.com',
    name: 'Rahul Krishnan',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Passionate about supporting innovative entertainment projects. Film enthusiast and early investor in emerging talent.',
    location: 'Mumbai, India',
    joinDate: '2023-01-15',
    investmentCount: 12,
    totalInvested: 450000,
    socialLinks: {
      twitter: 'https://twitter.com/rahul_investor',
      linkedin: 'https://linkedin.com/in/rahul-krishnan',
      instagram: 'https://instagram.com/rahul.films'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      twoFactor: false
    }
  }), []);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('circles_token');
        
        if (token) {
          // In a real app, validate token with backend
          await new Promise(resolve => setTimeout(resolve, 1000));
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [mockUser]);

  const login = async (_email: string, _password: string, rememberMe = false) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (_email === 'demo@circles.com' && _password === 'password123') {
        const token = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('circles_token', token);
        
        if (rememberMe) {
          localStorage.setItem('circles_remember', 'true');
        }
        
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUser: User = {
        ...mockUser,
        id: Date.now().toString(),
        email,
        name,
        joinDate: new Date().toISOString(),
        investmentCount: 0,
        totalInvested: 0,
        bio: '',
        location: ''
      };
      
      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('circles_token', token);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('circles_token');
    localStorage.removeItem('circles_remember');
    setUser(null);
    window.location.href = '/';
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({ ...user, ...updates });
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resetPassword = async (_email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In real app, send reset email
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const changePassword = async (_currentPassword: string, _newPassword: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, validate current password and update
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};