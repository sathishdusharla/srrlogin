import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  addresses: Address[];
  orders: string[];
  createdAt: Date;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<any>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedProfile = await AsyncStorage.getItem('userProfile');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock authentication - replace with actual Firebase auth
    const mockUser: User = {
      uid: 'mock-uid-' + Date.now(),
      email,
      displayName: email.split('@')[0],
    };

    const mockProfile: UserProfile = {
      uid: mockUser.uid,
      email,
      displayName: email.split('@')[0],
      addresses: [],
      orders: [],
      createdAt: new Date(),
    };

    setUser(mockUser);
    setUserProfile(mockProfile);
    
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    await AsyncStorage.setItem('userProfile', JSON.stringify(mockProfile));
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    // Mock authentication - replace with actual Firebase auth
    const mockUser: User = {
      uid: 'mock-uid-' + Date.now(),
      email,
      displayName,
    };

    const mockProfile: UserProfile = {
      uid: mockUser.uid,
      email,
      displayName,
      addresses: [],
      orders: [],
      createdAt: new Date(),
    };

    setUser(mockUser);
    setUserProfile(mockProfile);
    
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    await AsyncStorage.setItem('userProfile', JSON.stringify(mockProfile));
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in - replace with actual implementation
    const mockUser: User = {
      uid: 'google-uid-' + Date.now(),
      email: 'user@gmail.com',
      displayName: 'Google User',
    };

    const mockProfile: UserProfile = {
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName || 'Google User',
      addresses: [],
      orders: [],
      createdAt: new Date(),
    };

    setUser(mockUser);
    setUserProfile(mockProfile);
    
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    await AsyncStorage.setItem('userProfile', JSON.stringify(mockProfile));
  };

  const signInWithPhone = async (phoneNumber: string) => {
    // Mock phone authentication - replace with actual implementation
    return {
      confirm: async (otp: string) => {
        const mockUser: User = {
          uid: 'phone-uid-' + Date.now(),
          email: '',
          phoneNumber,
          displayName: 'Phone User',
        };

        const mockProfile: UserProfile = {
          uid: mockUser.uid,
          email: '',
          displayName: 'Phone User',
          phone: phoneNumber,
          addresses: [],
          orders: [],
          createdAt: new Date(),
        };

        setUser(mockUser);
        setUserProfile(mockProfile);
        
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        await AsyncStorage.setItem('userProfile', JSON.stringify(mockProfile));
      }
    };
  };

  const logout = async () => {
    setUser(null);
    setUserProfile(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userProfile');
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    
    const updatedProfile = { ...userProfile, ...data };
    setUserProfile(updatedProfile);
    await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithPhone,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}