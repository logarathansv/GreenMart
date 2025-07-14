import { Product } from '../types';

// Regular Walmart-style products
export const regularProducts: Product[] = [
  // Electronics
  {
    id: 'reg-1',
    name: 'Samsung 55" 4K Smart TV',
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 45999,
    ecoScore: 2.8,
    carbonImpact: 85.2,
    description: 'Premium 4K Smart TV with HDR and built-in streaming apps. Crystal clear picture quality.',
    sustainabilityHighlights: [
      'Energy Star certified',
      'LED backlighting',
      'Sleep mode feature',
      'Recyclable packaging'
    ],
    category: 'electronics',
    alternative: {
      id: 'eco-12',
      name: 'Solar Power Bank',
      carbonImpact: 3.1,
      ecoScore: 4.6,
      price: 1999,
      image: 'https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Eco-friendly solar power bank with renewable energy charging.',
      sustainabilityHighlights: [
        'Solar charging capability',
        'Recycled materials',
        'Energy efficient',
        'Long-lasting battery'
      ],
      category: 'electronics'
    }
  },
  {
    id: 'reg-2',
    name: 'iPhone 15 Pro Max',
    image: 'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 134900,
    ecoScore: 3.2,
    carbonImpact: 65.8,
    description: 'Latest iPhone with titanium design, A17 Pro chip, and advanced camera system.',
    sustainabilityHighlights: [
      'Recycled aluminum frame',
      'Carbon neutral shipping',
      'Trade-in program',
      'Renewable energy manufacturing'
    ],
    category: 'electronics',
    alternative: {
      id: 'eco-13',
      name: 'Eco-Friendly Phone Case',
      carbonImpact: 0.7,
      ecoScore: 4.4,
      price: 699,
      image: 'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Biodegradable phone case made from plant-based materials.',
      sustainabilityHighlights: [
        'Plant-based materials',
        'Biodegradable design',
        'Drop protection',
        'Compostable packaging'
      ],
      category: 'electronics'
    }
  },

  // Clothing
  {
    id: 'reg-3',
    name: 'Nike Air Max Sneakers',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 8999,
    ecoScore: 2.5,
    carbonImpact: 12.4,
    description: 'Classic Nike Air Max sneakers with premium materials and iconic design.',
    sustainabilityHighlights: [
      'Recycled polyester laces',
      'Sustainable packaging',
      'Durable construction',
      'Nike Grind program'
    ],
    category: 'clothing',
    alternative: {
      id: 'eco-1',
      name: 'Organic Cotton Kurta',
      carbonImpact: 2.3,
      ecoScore: 4.5,
      price: 1299,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Handwoven organic cotton kurta made with natural dyes.',
      sustainabilityHighlights: [
        'GOTS certified organic cotton',
        'Natural plant-based dyes',
        'Handloom weaving process',
        'Fair trade certified'
      ],
      category: 'clothing'
    }
  },
  {
    id: 'reg-4',
    name: 'Levi\'s 501 Original Jeans',
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 4999,
    ecoScore: 2.8,
    carbonImpact: 15.6,
    description: 'Classic straight-leg jeans with authentic fit and timeless style.',
    sustainabilityHighlights: [
      'Water-saving techniques',
      'Cotton sourcing program',
      'Durable construction',
      'Recycling program'
    ],
    category: 'clothing',
    alternative: {
      id: 'eco-2',
      name: 'Sustainable Denim Jeans',
      carbonImpact: 8.7,
      ecoScore: 4.2,
      price: 2499,
      image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Premium jeans made from 85% recycled denim with water-saving production.',
      sustainabilityHighlights: [
        '85% recycled denim',
        'Water-saving production',
        'Circular fashion design',
        'Lifetime repair guarantee'
      ],
      category: 'clothing'
    }
  },

  // Personal Care
  {
    id: 'reg-5',
    name: 'Head & Shoulders Shampoo',
    image: 'https://images.pexels.com/photos/7262948/pexels-photo-7262948.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 299,
    ecoScore: 2.1,
    carbonImpact: 3.8,
    description: 'Anti-dandruff shampoo with zinc pyrithione for healthy scalp and hair.',
    sustainabilityHighlights: [
      'Recyclable bottle',
      'Dermatologist tested',
      'No parabens',
      'Cruelty-free'
    ],
    category: 'personal-care',
    alternative: {
      id: 'eco-7',
      name: 'Ayurvedic Shampoo Bar',
      carbonImpact: 0.6,
      ecoScore: 4.6,
      price: 449,
      image: 'https://images.pexels.com/photos/7262948/pexels-photo-7262948.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Solid shampoo bar made with traditional Ayurvedic herbs.',
      sustainabilityHighlights: [
        'Traditional Ayurvedic formula',
        'Zero plastic packaging',
        'Concentrated formula',
        'Sulfate-free'
      ],
      category: 'personal-care'
    }
  },
  {
    id: 'reg-6',
    name: 'Oral-B Electric Toothbrush',
    image: 'https://images.pexels.com/photos/3994840/pexels-photo-3994840.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 2999,
    ecoScore: 3.1,
    carbonImpact: 8.2,
    description: 'Rechargeable electric toothbrush with pressure sensor and timer.',
    sustainabilityHighlights: [
      'Rechargeable battery',
      'Replaceable brush heads',
      'Long-lasting motor',
      'Recyclable packaging'
    ],
    category: 'personal-care',
    alternative: {
      id: 'eco-5',
      name: 'Bamboo Toothbrush Set',
      carbonImpact: 0.5,
      ecoScore: 4.8,
      price: 299,
      image: 'https://images.pexels.com/photos/3994840/pexels-photo-3994840.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Set of 4 biodegradable bamboo toothbrushes with soft bristles.',
      sustainabilityHighlights: [
        '100% biodegradable bamboo',
        'Plastic-free packaging',
        'Compostable bristles',
        'Zero waste design'
      ],
      category: 'personal-care'
    }
  },

  // Home & Kitchen
  {
    id: 'reg-7',
    name: 'KitchenAid Stand Mixer',
    image: 'https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 32999,
    ecoScore: 3.4,
    carbonImpact: 45.7,
    description: 'Professional-grade stand mixer with 10 speeds and multiple attachments.',
    sustainabilityHighlights: [
      'Durable metal construction',
      'Energy efficient motor',
      'Long warranty',
      'Repairable design'
    ],
    category: 'home',
    alternative: {
      id: 'eco-10',
      name: 'Bamboo Kitchen Utensil Set',
      carbonImpact: 0.9,
      ecoScore: 4.8,
      price: 799,
      image: 'https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Complete kitchen utensil set made from sustainable bamboo.',
      sustainabilityHighlights: [
        'Sustainable bamboo',
        'Naturally antibacterial',
        'Lightweight and durable',
        'Plastic-free alternative'
      ],
      category: 'home'
    }
  },
  {
    id: 'reg-8',
    name: 'Dyson V15 Vacuum Cleaner',
    image: 'https://images.pexels.com/photos/4239040/pexels-photo-4239040.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 54999,
    ecoScore: 3.6,
    carbonImpact: 38.9,
    description: 'Cordless vacuum with laser dust detection and powerful suction.',
    sustainabilityHighlights: [
      'Energy efficient motor',
      'Washable filters',
      'Durable construction',
      'Recyclable components'
    ],
    category: 'home',
    alternative: {
      id: 'eco-9',
      name: 'Organic Cleaning Kit',
      carbonImpact: 1.8,
      ecoScore: 4.7,
      price: 899,
      image: 'https://images.pexels.com/photos/4239040/pexels-photo-4239040.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Complete cleaning kit with plant-based, non-toxic supplies.',
      sustainabilityHighlights: [
        'Plant-based ingredients',
        'Refillable containers',
        'Biodegradable formula',
        'Minimal packaging'
      ],
      category: 'home'
    }
  },

  // Food & Beverages
  {
    id: 'reg-9',
    name: 'Coca-Cola 12-Pack',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 480,
    ecoScore: 2.3,
    carbonImpact: 5.2,
    description: 'Classic Coca-Cola in convenient 12-pack cans for sharing.',
    sustainabilityHighlights: [
      'Recyclable aluminum cans',
      'PlantBottle technology',
      'Water stewardship',
      'Community programs'
    ],
    category: 'food',
    alternative: {
      id: 'eco-15',
      name: 'Herbal Tea Sampler',
      carbonImpact: 0.9,
      ecoScore: 4.7,
      price: 899,
      image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Collection of premium herbal teas including chamomile and peppermint.',
      sustainabilityHighlights: [
        'Organic herbs',
        'Biodegradable tea bags',
        'Sustainable sourcing',
        'Recyclable packaging'
      ],
      category: 'food'
    }
  },
  {
    id: 'reg-10',
    name: 'Lay\'s Potato Chips Variety Pack',
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 299,
    ecoScore: 2.0,
    carbonImpact: 4.1,
    description: 'Assorted flavors of crispy potato chips in convenient single-serve bags.',
    sustainabilityHighlights: [
      'Locally sourced potatoes',
      'Recyclable packaging',
      'Reduced sodium options',
      'No artificial preservatives'
    ],
    category: 'food',
    alternative: {
      id: 'eco-14',
      name: 'Organic Spice Collection',
      carbonImpact: 1.3,
      ecoScore: 4.8,
      price: 1499,
      image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Premium collection of organic spices sourced directly from farmers.',
      sustainabilityHighlights: [
        'Certified organic',
        'Direct from farmers',
        'Plastic-free packaging',
        'Fair trade certified'
      ],
      category: 'food'
    }
  }
];

// Eco-friendly products for GreenMart mode
export const ecoProducts: Product[] = [
  // Clothing Category
  {
    id: 'eco-1',
    name: 'Organic Cotton Kurta',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1299,
    ecoScore: 4.5,
    carbonImpact: 2.3,
    description: 'Handwoven organic cotton kurta made with natural dyes and traditional weaving techniques. Perfect for daily wear with comfort and style.',
    sustainabilityHighlights: [
      'GOTS certified organic cotton',
      'Natural plant-based dyes',
      'Handloom weaving process',
      'Fair trade certified'
    ],
    category: 'clothing',
    alternative: {
      id: 'eco-1a',
      name: 'Hemp Blend Kurta',
      carbonImpact: 1.8,
      ecoScore: 4.8,
      price: 1399,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Sustainable hemp blend kurta with superior comfort and durability.',
      sustainabilityHighlights: [
        'Hemp fiber blend',
        'Carbon negative crop',
        'Naturally antimicrobial',
        'Biodegradable'
      ],
      category: 'clothing'
    }
  },
  {
    id: 'eco-2',
    name: 'Sustainable Denim Jeans',
    image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 2499,
    ecoScore: 4.2,
    carbonImpact: 8.7,
    description: 'Premium jeans made from 85% recycled denim with water-saving production techniques and lifetime repair guarantee.',
    sustainabilityHighlights: [
      '85% recycled denim',
      'Water-saving production',
      'Circular fashion design',
      'Lifetime repair guarantee'
    ],
    category: 'clothing',
    alternative: {
      id: 'eco-2a',
      name: 'Tencel Blend Jeans',
      carbonImpact: 6.2,
      ecoScore: 4.6,
      price: 2799,
      image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Eco-friendly jeans made from Tencel and organic cotton blend.',
      sustainabilityHighlights: [
        'Tencel fiber blend',
        'Closed-loop production',
        'Biodegradable materials',
        'Water-efficient process'
      ],
      category: 'clothing'
    }
  },
  {
    id: 'eco-3',
    name: 'Khadi Cotton Saree',
    image: 'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 3999,
    ecoScore: 4.9,
    carbonImpact: 1.5,
    description: 'Beautiful handspun khadi cotton saree supporting rural artisans and traditional craftsmanship.',
    sustainabilityHighlights: [
      'Handspun khadi cotton',
      'Supports rural artisans',
      'Zero chemical processing',
      'Traditional craftsmanship'
    ],
    category: 'clothing'
  },
  {
    id: 'eco-4',
    name: 'Eco-Friendly T-Shirt',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 899,
    ecoScore: 4.3,
    carbonImpact: 2.1,
    description: 'Soft and comfortable t-shirt made from organic cotton with eco-friendly printing.',
    sustainabilityHighlights: [
      'Organic cotton fabric',
      'Water-based inks',
      'Plastic-free packaging',
      'Carbon neutral shipping'
    ],
    category: 'clothing'
  },

  // Personal Care Category
  {
    id: 'eco-5',
    name: 'Bamboo Toothbrush Set',
    image: 'https://images.pexels.com/photos/3994840/pexels-photo-3994840.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 299,
    ecoScore: 4.8,
    carbonImpact: 0.5,
    description: 'Set of 4 biodegradable bamboo toothbrushes with soft bristles. Plastic-free packaging.',
    sustainabilityHighlights: [
      '100% biodegradable bamboo',
      'Plastic-free packaging',
      'Compostable bristles',
      'Zero waste design'
    ],
    category: 'personal-care'
  },
  {
    id: 'eco-6',
    name: 'Natural Soap Bar Set',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 599,
    ecoScore: 4.7,
    carbonImpact: 0.8,
    description: 'Handmade natural soap bars with essential oils and herbs. Free from chemicals and preservatives.',
    sustainabilityHighlights: [
      'Natural ingredients only',
      'Handmade in small batches',
      'Biodegradable formula',
      'Minimal packaging'
    ],
    category: 'personal-care'
  },
  {
    id: 'eco-7',
    name: 'Ayurvedic Shampoo Bar',
    image: 'https://images.pexels.com/photos/7262948/pexels-photo-7262948.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 449,
    ecoScore: 4.6,
    carbonImpact: 0.6,
    description: 'Solid shampoo bar made with traditional Ayurvedic herbs and natural ingredients.',
    sustainabilityHighlights: [
      'Traditional Ayurvedic formula',
      'Zero plastic packaging',
      'Concentrated formula',
      'Sulfate-free'
    ],
    category: 'personal-care'
  },

  // Home & Kitchen Category
  {
    id: 'eco-8',
    name: 'Copper Water Bottle',
    image: 'https://images.pexels.com/photos/3682293/pexels-photo-3682293.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1199,
    ecoScore: 4.9,
    carbonImpact: 1.2,
    description: 'Pure copper water bottle with health benefits and lifetime durability. Naturally antimicrobial.',
    sustainabilityHighlights: [
      'Pure copper construction',
      'Lifetime durability',
      'Natural antimicrobial',
      'Plastic-free design'
    ],
    category: 'home',
    alternative: {
      id: 'eco-8a',
      name: 'Steel Water Bottle',
      carbonImpact: 0.8,
      ecoScore: 4.7,
      price: 899,
      image: 'https://images.pexels.com/photos/3682293/pexels-photo-3682293.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Durable stainless steel water bottle with excellent insulation.',
      sustainabilityHighlights: [
        'Food-grade steel',
        'Recyclable material',
        'Long-lasting design',
        'BPA-free'
      ],
      category: 'home'
    }
  },
  {
    id: 'eco-9',
    name: 'Organic Cleaning Kit',
    image: 'https://images.pexels.com/photos/4239040/pexels-photo-4239040.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 899,
    ecoScore: 4.7,
    carbonImpact: 1.8,
    description: 'Complete cleaning kit with plant-based, non-toxic cleaning supplies in refillable containers.',
    sustainabilityHighlights: [
      'Plant-based ingredients',
      'Refillable containers',
      'Biodegradable formula',
      'Minimal packaging'
    ],
    category: 'home'
  },
  {
    id: 'eco-10',
    name: 'Bamboo Kitchen Utensil Set',
    image: 'https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 799,
    ecoScore: 4.8,
    carbonImpact: 0.9,
    description: 'Complete kitchen utensil set made from sustainable bamboo. Includes spoons, forks, and chopsticks.',
    sustainabilityHighlights: [
      'Sustainable bamboo',
      'Naturally antibacterial',
      'Lightweight and durable',
      'Plastic-free alternative'
    ],
    category: 'home'
  },
  {
    id: 'eco-11',
    name: 'Clay Water Filter',
    image: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 2499,
    ecoScore: 4.9,
    carbonImpact: 2.1,
    description: 'Traditional clay water filter that naturally purifies water without electricity or chemicals.',
    sustainabilityHighlights: [
      'Natural clay construction',
      'No electricity required',
      'Chemical-free filtration',
      'Traditional craftsmanship'
    ],
    category: 'home'
  },

  // Electronics Category
  {
    id: 'eco-12',
    name: 'Solar Power Bank',
    image: 'https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1999,
    ecoScore: 4.6,
    carbonImpact: 3.1,
    description: 'Portable solar power bank with 20,000mAh capacity. Made from recycled materials.',
    sustainabilityHighlights: [
      'Solar charging capability',
      'Recycled plastic housing',
      'Energy-efficient design',
      'Long-lasting battery life'
    ],
    category: 'electronics'
  },
  {
    id: 'eco-13',
    name: 'Eco-Friendly Phone Case',
    image: 'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 699,
    ecoScore: 4.4,
    carbonImpact: 0.7,
    description: 'Biodegradable phone case made from plant-based materials. Provides excellent protection.',
    sustainabilityHighlights: [
      'Plant-based materials',
      'Biodegradable design',
      'Drop protection',
      'Compostable packaging'
    ],
    category: 'electronics'
  },

  // Food & Beverages Category
  {
    id: 'eco-14',
    name: 'Organic Spice Collection',
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1499,
    ecoScore: 4.8,
    carbonImpact: 1.3,
    description: 'Premium collection of organic spices sourced directly from farmers. Includes turmeric, cumin, and more.',
    sustainabilityHighlights: [
      'Certified organic',
      'Direct from farmers',
      'Plastic-free packaging',
      'Fair trade certified'
    ],
    category: 'food'
  },
  {
    id: 'eco-15',
    name: 'Herbal Tea Sampler',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 899,
    ecoScore: 4.7,
    carbonImpact: 0.9,
    description: 'Collection of premium herbal teas including chamomile, peppermint, and tulsi.',
    sustainabilityHighlights: [
      'Organic herbs',
      'Biodegradable tea bags',
      'Sustainable sourcing',
      'Recyclable packaging'
    ],
    category: 'food'
  },
  {
    id: 'eco-16',
    name: 'Cold-Pressed Coconut Oil',
    image: 'https://images.pexels.com/photos/2090903/pexels-photo-2090903.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 649,
    ecoScore: 4.6,
    carbonImpact: 1.1,
    description: 'Pure cold-pressed coconut oil from organic coconuts. Perfect for cooking and skincare.',
    sustainabilityHighlights: [
      'Cold-pressed extraction',
      'Organic coconuts',
      'Glass packaging',
      'Multi-purpose use'
    ],
    category: 'food'
  },

  // Lifestyle Category
  {
    id: 'eco-17',
    name: 'Jute Shopping Bag Set',
    image: 'https://images.pexels.com/photos/3737581/pexels-photo-3737581.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 499,
    ecoScore: 4.9,
    carbonImpact: 0.4,
    description: 'Set of 3 durable jute shopping bags in different sizes. Perfect replacement for plastic bags.',
    sustainabilityHighlights: [
      'Natural jute fiber',
      'Biodegradable material',
      'Reusable design',
      'Supports rural economy'
    ],
    category: 'lifestyle'
  },
  {
    id: 'eco-18',
    name: 'Yoga Mat - Cork & Rubber',
    image: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 2999,
    ecoScore: 4.5,
    carbonImpact: 2.8,
    description: 'Premium yoga mat made from natural cork and rubber. Non-slip surface with excellent grip.',
    sustainabilityHighlights: [
      'Natural cork surface',
      'Natural rubber base',
      'Biodegradable materials',
      'Non-toxic construction'
    ],
    category: 'lifestyle'
  },
  {
    id: 'eco-19',
    name: 'Wooden Laptop Stand',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 1799,
    ecoScore: 4.4,
    carbonImpact: 1.9,
    description: 'Ergonomic laptop stand made from sustainable bamboo wood. Improves posture and airflow.',
    sustainabilityHighlights: [
      'Sustainable bamboo',
      'Ergonomic design',
      'Natural finish',
      'Plastic-free construction'
    ],
    category: 'lifestyle'
  },
  {
    id: 'eco-20',
    name: 'Seed Paper Notebook',
    image: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 399,
    ecoScore: 4.8,
    carbonImpact: 0.3,
    description: 'Handmade notebook with seed paper cover that can be planted after use. Grows into wildflowers.',
    sustainabilityHighlights: [
      'Plantable seed paper',
      'Handmade production',
      'Recycled paper pages',
      'Zero waste concept'
    ],
    category: 'lifestyle'
  }
];

// Combined products array that switches based on mode
export const products = regularProducts;