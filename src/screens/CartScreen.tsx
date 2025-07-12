import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import * as Haptics from 'expo-haptics';

interface CartScreenProps {
  navigation: any;
}

export default function CartScreen({ navigation }: CartScreenProps) {
  const { state, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (user) {
      navigation.navigate('Checkout');
    } else {
      // Navigate to auth
      navigation.navigate('Auth');
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.image }}
        style={styles.itemImage}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.itemSize}>{item.product.size}</Text>
        <Text style={styles.itemPrice}>₹{item.product.price}</Text>
      </View>
      <View style={styles.itemActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.product.id, item.quantity - 1)}
            activeOpacity={0.8}
          >
            <Ionicons name="remove" size={16} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.product.id, item.quantity + 1)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.product.id)}
          activeOpacity={0.8}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (state.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={80} color="#D1D5DB" />
          <Text style={styles.emptyStateTitle}>Your cart is empty</Text>
          <Text style={styles.emptyStateSubtitle}>
            Add some delicious dairy products to get started!
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Products')}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>
          {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <FlatList
        data={state.items}
        keyExtractor={(item) => item.product.id}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>₹{getTotalPrice()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping:</Text>
            <Text style={styles.freeShipping}>Free</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>₹{getTotalPrice()}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            !user && styles.checkoutButtonDisabled
          ]}
          onPress={handleCheckout}
          disabled={!user}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutButtonText}>
            {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
          </Text>
        </TouchableOpacity>

        {/* Trust Badges */}
        <View style={styles.trustBadges}>
          <View style={styles.trustBadge}>
            <Ionicons name="shield-checkmark" size={16} color="#10B981" />
            <Text style={styles.trustBadgeText}>Secure Payment</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="car" size={16} color="#3B82F6" />
            <Text style={styles.trustBadgeText}>Free Delivery</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#D97706" />
            <Text style={styles.trustBadgeText}>Quality Guaranteed</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  itemCount: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  cartList: {
    padding: 20,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemSize: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D97706',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 12,
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 16,
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B7280',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: '#D97706',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalSection: {
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 16,
    color: '#1F2937',
  },
  freeShipping: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D97706',
  },
  checkoutButton: {
    backgroundColor: '#D97706',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trustBadges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustBadgeText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});