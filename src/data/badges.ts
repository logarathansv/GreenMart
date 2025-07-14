import { Badge } from '../types';

export const availableBadges: Badge[] = [
  // Carbon Saved Badges
  {
    id: 'first_save',
    name: 'Eco Warrior',
    description: 'Save your first 1kg of CO₂',
    icon: '🌱',
    requirement: 1,
    type: 'carbon_saved',
    rarity: 'common'
  },
  {
    id: 'carbon_saver',
    name: 'Carbon Crusher',
    description: 'Save 10kg of CO₂',
    icon: '💚',
    requirement: 10,
    type: 'carbon_saved',
    rarity: 'rare'
  },
  {
    id: 'planet_protector',
    name: 'Planet Protector',
    description: 'Save 50kg of CO₂',
    icon: '🌍',
    requirement: 50,
    type: 'carbon_saved',
    rarity: 'epic'
  },
  {
    id: 'climate_champion',
    name: 'Climate Champion',
    description: 'Save 100kg of CO₂',
    icon: '🏆',
    requirement: 100,
    type: 'carbon_saved',
    rarity: 'legendary'
  },

  // Products Bought Badges
  {
    id: 'first_purchase',
    name: 'Green Shopper',
    description: 'Make your first eco-friendly purchase',
    icon: '🛒',
    requirement: 1,
    type: 'products_bought',
    rarity: 'common'
  },
  {
    id: 'eco_enthusiast',
    name: 'Eco Enthusiast',
    description: 'Buy 10 eco-friendly products',
    icon: '🌿',
    requirement: 10,
    type: 'products_bought',
    rarity: 'rare'
  },
  {
    id: 'sustainability_master',
    name: 'Sustainability Master',
    description: 'Buy 25 eco-friendly products',
    icon: '🎯',
    requirement: 25,
    type: 'products_bought',
    rarity: 'epic'
  },

  // Eco Score Badges
  {
    id: 'quality_seeker',
    name: 'Quality Seeker',
    description: 'Maintain 4+ average eco score',
    icon: '⭐',
    requirement: 4,
    type: 'eco_score',
    rarity: 'rare'
  },
  {
    id: 'perfectionist',
    name: 'Eco Perfectionist',
    description: 'Maintain 4.5+ average eco score',
    icon: '✨',
    requirement: 4.5,
    type: 'eco_score',
    rarity: 'epic'
  },

  // Special Badges
  {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'One of the first 100 users',
    icon: '🚀',
    requirement: 1,
    type: 'special',
    rarity: 'legendary'
  },
  {
    id: 'alternative_lover',
    name: 'Alternative Lover',
    description: 'Switch to 5 alternative products',
    icon: '🔄',
    requirement: 5,
    type: 'special',
    rarity: 'rare'
  }
];