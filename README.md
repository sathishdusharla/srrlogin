# SRR Farms Mobile App

A modern React Native mobile application for SRR Farms featuring pure A2 dairy products, built with Expo.

## Features

- 🔐 **User Authentication** (Email/Password, Google, Phone)
- 🛒 **Shopping Cart** with persistent storage
- 📱 **Fully Responsive** mobile-first design
- 🔍 **Product Search** functionality
- 👤 **User Profile Management**
- 🎨 **Modern UI/UX** with smooth animations
- ⚡ **Optimized Performance** for iOS and Android
- 🌟 **Touch-Optimized** interactions with haptic feedback

## Products

- **Premium A2 Cow Ghee** (Traditional Bilona Method)
- **Fresh A2 Cow Milk** (Daily Delivery)
- **Organic Buffalo Milk**
- **Flavored Milk** (Chocolate & Strawberry)

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **State Management**: React Context + Reducers
- **Storage**: AsyncStorage for persistence
- **UI Components**: Custom components with Expo Vector Icons
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler
- **Notifications**: React Native Toast Message

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd srrfarms-mobile
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Run on specific platforms
```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── context/           # React Context providers
├── data/              # Static data and mock data
└── types/             # TypeScript type definitions
```

## Key Features

### Mobile-Optimized Design
- Touch-friendly interface with proper touch targets
- Smooth scrolling and animations
- Platform-specific styling (iOS/Android)
- Responsive layout for different screen sizes

### Enhanced User Experience
- Haptic feedback for interactions
- Toast notifications for user feedback
- Loading states and error handling
- Offline-first cart persistence

### Performance Optimizations
- Lazy loading of images
- Optimized FlatList rendering
- Efficient state management
- Minimal re-renders

## Customization

### Colors
The app uses a consistent color scheme defined throughout the components:
- Primary: `#D97706` (Orange)
- Background: `#F9FAFB` (Light Gray)
- Text: `#1F2937` (Dark Gray)
- Accent: `#FEF3C7` (Light Orange)

### Typography
- Headers: Bold, larger sizes for hierarchy
- Body text: Regular weight, readable sizes
- Interactive elements: Semi-bold for emphasis

## Deployment

### Building for Production

1. **iOS**
```bash
expo build:ios
```

2. **Android**
```bash
expo build:android
```

### App Store Deployment
Follow Expo's documentation for submitting to app stores:
- [iOS App Store](https://docs.expo.dev/submit/ios/)
- [Google Play Store](https://docs.expo.dev/submit/android/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

*Built with ❤️ for SRR Farms Mobile Experience*