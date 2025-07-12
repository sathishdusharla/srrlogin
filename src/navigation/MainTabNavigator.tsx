import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ 
          title: 'Product Details',
          headerStyle: { backgroundColor: '#FEF3C7' },
          headerTintColor: '#D97706'
        }}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen}
        options={{ 
          title: 'About SRR Farms',
          headerStyle: { backgroundColor: '#FEF3C7' },
          headerTintColor: '#D97706'
        }}
      />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProductsMain" 
        component={ProductsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ 
          title: 'Product Details',
          headerStyle: { backgroundColor: '#FEF3C7' },
          headerTintColor: '#D97706'
        }}
      />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="CartMain" 
        component={CartScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{ 
          title: 'Checkout',
          headerStyle: { backgroundColor: '#FEF3C7' },
          headerTintColor: '#D97706'
        }}
      />
      <Stack.Screen 
        name="OrderSuccess" 
        component={OrderSuccessScreen}
        options={{ 
          title: 'Order Confirmed',
          headerStyle: { backgroundColor: '#FEF3C7' },
          headerTintColor: '#D97706',
          headerLeft: () => null
        }}
      />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'bag' : 'bag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D97706',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}