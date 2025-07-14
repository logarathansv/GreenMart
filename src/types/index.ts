export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  ecoScore: number;
  carbonImpact: number;
  description: string;
  sustainabilityHighlights: string[];
  category: string;
  alternative?: {
    id: string;
    name: string;
    carbonImpact: number;
    ecoScore: number;
    price?: number;
    image?: string;
    description?: string;
    sustainabilityHighlights?: string[];
    category?: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  totalCarbonSaved: number;
  filters: {
    search: string;
    minEcoScore: number;
    sortBy: 'carbon-asc' | 'carbon-desc' | 'eco-score' | 'name';
  };
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'carbon_saved' | 'products_bought' | 'eco_score' | 'streak' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface UserStats {
  totalCarbonSaved: number;
  totalProductsBought: number;
  averageEcoScore: number;
  shoppingStreak: number;
  badges: Badge[];
  level: number;
  xp: number;
  rank: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  carbonSaved: number;
  level: number;
  badges: number;
  rank: number;
}