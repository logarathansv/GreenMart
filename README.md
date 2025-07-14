# EcoCart 🌿 - Sustainable Shopping Advisor

A comprehensive, production-ready React application that helps users make environmentally conscious purchasing decisions. Built with modern web technologies and featuring a beautiful, accessible design.

## ✨ Features

### 🛍️ Core Shopping Experience
- **Product Discovery**: Browse eco-friendly products with detailed sustainability metrics
- **Smart Search & Filtering**: Find products by name, eco-score, and carbon impact
- **Intelligent Sorting**: Sort by carbon footprint, eco-score, or alphabetically
- **Product Details**: Comprehensive product information with sustainability highlights
- **Alternative Suggestions**: Get recommendations for greener alternatives

### 🛒 Cart & Wishlist
- **Persistent Cart**: Shopping cart saved to local storage
- **Quantity Management**: Easy quantity adjustments with smooth animations
- **Wishlist Functionality**: Save favorite products for later
- **Smart Alternatives**: Swap cart items for more sustainable options
- **Bulk Actions**: Clear cart or move all wishlist items to cart

### 📊 Environmental Impact Tracking
- **Carbon Footprint Calculator**: Real-time tracking of environmental impact
- **Savings Visualization**: Compare your choices vs. conventional products
- **Environmental Equivalents**: See impact in terms of trees planted or car miles
- **Achievement System**: Unlock badges for sustainable shopping
- **Shareable Reports**: Download or share your green achievements

### 💡 Educational Content
- **Sustainability Tips**: Curated advice for eco-conscious shopping
- **Impact Metrics**: Learn about carbon footprints and eco-scores
- **Product Insights**: Detailed sustainability information for informed decisions

### 🎨 Design & User Experience
- **Nature-Inspired Theme**: Beautiful green color palette with dark mode support
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Accessibility**: WCAG compliant with proper focus management
- **Modern UI**: Clean, professional design with thoughtful details

## 🚀 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **State Management**: React Context with useReducer
- **Persistence**: Local Storage with custom hooks
- **Build Tool**: Vite
- **Code Quality**: ESLint with TypeScript rules

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ecocart
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Navbar.tsx       # Navigation component
│   ├── ProductCard.tsx  # Product display card
│   ├── CartItem.tsx     # Cart item component
│   ├── ProductDetailModal.tsx
│   └── ThemeToggle.tsx  # Dark mode toggle
├── pages/              # Application pages
│   ├── Products.tsx    # Product listing page
│   ├── Cart.tsx        # Shopping cart page
│   ├── Wishlist.tsx    # Wishlist page
│   ├── CarbonReport.tsx # Environmental impact dashboard
│   └── Tips.tsx        # Sustainability tips page
├── context/            # Global state management
│   ├── AppContext.tsx  # Main application state
│   └── ThemeContext.tsx # Theme/dark mode state
├── data/               # Static data and mock content
│   ├── products.ts     # Product catalog
│   └── tips.ts         # Sustainability tips
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── main.tsx           # Application entry point
```

## 🌟 Key Features Explained

### Product Management
- **Eco-Score System**: 5-star rating system for environmental friendliness
- **Carbon Impact Tracking**: Measured in kg CO₂ equivalent
- **Alternative Recommendations**: Suggest greener alternatives for each product
- **Sustainability Highlights**: Detailed environmental benefits

### Smart Shopping Cart
- **Persistent Storage**: Cart contents saved across browser sessions
- **Real-time Calculations**: Automatic carbon footprint and pricing updates
- **Alternative Swapping**: One-click switching to more sustainable options
- **Quantity Controls**: Smooth increment/decrement with animations

### Environmental Dashboard
- **Impact Visualization**: Clear comparison between conventional and eco-friendly choices
- **Achievement System**: Badges and milestones for sustainable shopping
- **Environmental Equivalents**: Translate CO₂ savings into understandable metrics
- **Social Sharing**: Share achievements and encourage others

### Responsive Design
- **Mobile-First**: Optimized for smaller screens with touch-friendly interfaces
- **Adaptive Layouts**: Grid systems that adjust to screen size
- **Progressive Enhancement**: Works on all devices and browsers
- **Dark Mode**: System preference detection with manual toggle

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic chunking with Vite
- **Image Optimization**: Proper image loading and sizing
- **Lazy Loading**: Components and routes loaded on demand
- **Efficient Re-renders**: Optimized context updates and memoization
- **Local Storage**: Persistent data without server dependencies

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard accessibility throughout the app
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order
- **Alt Text**: Descriptive alternative text for all images

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real product database and user accounts
- **PWA Features**: Offline functionality and push notifications
- **Barcode Scanner**: Use device camera to scan product barcodes
- **Social Features**: User reviews, ratings, and community discussions
- **AI Recommendations**: Personalized product suggestions based on shopping history
- **Supplier Verification**: Real-time data from sustainability certification bodies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Product images from [Pexels](https://pexels.com)
- Icons from [Lucide React](https://lucide.dev)
- Sustainability data inspired by real environmental impact studies
- Design inspiration from leading e-commerce and sustainability platforms

---

**EcoCart** - Making sustainable shopping accessible, engaging, and impactful. 🌍💚