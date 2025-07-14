import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false
};

// Dummy users for demonstration
const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    joinedDate: '2024-02-20'
  }
];

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [persistedUser, setPersistedUser] = useLocalStorage<User | null>('ecocart-user', null);
  const [state, dispatch] = useReducer(authReducer, {
    ...initialState,
    user: persistedUser,
    isAuthenticated: !!persistedUser
  });

  // Persist user to localStorage whenever it changes
  React.useEffect(() => {
    setPersistedUser(state.user);
  }, [state.user, setPersistedUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check dummy users or allow any email/password for demo
    const user = dummyUsers.find(u => u.email === email) || {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    if (password.length >= 6) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      toast.success(`Welcome back, ${user.name}! 🌿`);
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      toast.error('Invalid credentials. Password must be at least 6 characters.');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password.length >= 6 && name.length >= 2) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        joinedDate: new Date().toISOString().split('T')[0]
      };

      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      toast.success(`Welcome to EcoCart, ${name}! 🌱 Start your sustainable journey today.`);
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      toast.error('Please check your details. Name must be at least 2 characters and password at least 6.');
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully. See you soon! 👋');
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
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