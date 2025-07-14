import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Product, CartItem } from '../types';
import { regularProducts, ecoProducts } from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from './ThemeContext';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_MIN_ECO_SCORE'; payload: number }
  | { type: 'SET_SORT_BY'; payload: AppState['filters']['sortBy'] }
  | { type: 'SWAP_TO_ALTERNATIVE'; payload: { originalId: string; alternative: Product } }
  | { type: 'SET_PRODUCTS'; payload: Product[] };

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  products: regularProducts,
  cart: [],
  wishlist: [],
  totalCarbonSaved: 0,
  filters: {
    search: '',
    minEcoScore: 0,
    sortBy: 'eco-score'
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case 'SET_SEARCH':
      return {
        ...state,
        filters: { ...state.filters, search: action.payload }
      };

    case 'SET_MIN_ECO_SCORE':
      return {
        ...state,
        filters: { ...state.filters, minEcoScore: action.payload }
      };

    case 'SET_SORT_BY':
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.payload }
      };

    case 'SWAP_TO_ALTERNATIVE': {
      const originalItem = state.cart.find(item => item.id === action.payload.originalId);
      if (!originalItem) return state;
      
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.originalId
            ? { 
                ...action.payload.alternative, 
                quantity: item.quantity,
                // Ensure we maintain the cart item structure
                price: action.payload.alternative.price || item.price,
                image: action.payload.alternative.image || item.image,
                description: action.payload.alternative.description || item.description,
                sustainabilityHighlights: action.payload.alternative.sustainabilityHighlights || item.sustainabilityHighlights,
                category: action.payload.alternative.category || item.category
              }
            : item
        ),
        totalCarbonSaved: state.totalCarbonSaved + 
          ((originalItem.carbonImpact - action.payload.alternative.carbonImpact) * originalItem.quantity)
      };
    }

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [persistedCart, setPersistedCart] = useLocalStorage<CartItem[]>('ecocart-cart', []);
  const [persistedWishlist, setPersistedWishlist] = useLocalStorage<Product[]>('ecocart-wishlist', []);
  const [persistedCarbonSaved, setPersistedCarbonSaved] = useLocalStorage<number>('ecocart-carbon-saved', 0);
  const { isGreenMode } = useTheme();

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    cart: persistedCart,
    wishlist: persistedWishlist,
    totalCarbonSaved: persistedCarbonSaved
  });

  // Persist cart, wishlist, and carbon savings to localStorage whenever they change
  React.useEffect(() => {
    setPersistedCart(state.cart);
  }, [state.cart, setPersistedCart]);

  React.useEffect(() => {
    setPersistedWishlist(state.wishlist);
  }, [state.wishlist, setPersistedWishlist]);

  React.useEffect(() => {
    setPersistedCarbonSaved(state.totalCarbonSaved);
  }, [state.totalCarbonSaved, setPersistedCarbonSaved]);

  // Switch products based on green mode
  React.useEffect(() => {
    const newProducts = isGreenMode ? ecoProducts : regularProducts;
    dispatch({ type: 'SET_PRODUCTS', payload: newProducts });
  }, [isGreenMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}