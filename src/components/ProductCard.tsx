import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface ProductCardProps {
  product: any;
  onPress: () => void;
  style?: any;
}

export default function ProductCard({ product, onPress, style }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (user) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      addToCart(product);
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={12} color="#F59E0B" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color="#F59E0B" />
      );
    }

    const remainingStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={12} color="#D1D5DB" />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Badge */}
      {product.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      )}

      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Product Info */}
      <View style={styles.content}>
        <View style={styles.categoryRow}>
          <Ionicons 
            name={product.category === 'ghee' ? 'water' : 'nutrition'} 
            size={14} 
            color="#D97706" 
          />
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text style={styles.size}>{product.size}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            {renderStars()}
          </View>
          <Text style={styles.reviews}>({product.reviews})</Text>
        </View>

        {/* Price */}
        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            )}
          </View>
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                Save ₹{product.originalPrice - product.price}
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.addButton,
              !product.inStock && styles.addButtonDisabled
            ]}
            onPress={handleAddToCart}
            disabled={!product.inStock || !user}
            activeOpacity={0.8}
          >
            <Ionicons 
              name="bag-add" 
              size={16} 
              color={product.inStock && user ? "#FFFFFF" : "#9CA3AF"} 
            />
            <Text style={[
              styles.addButtonText,
              (!product.inStock || !user) && styles.addButtonTextDisabled
            ]}>
              {!product.inStock ? 'Out of Stock' : !user ? 'Sign In' : 'Add'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.viewButton}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <Ionicons name="eye-outline" size={16} color="#D97706" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  size: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 6,
  },
  reviews: {
    fontSize: 11,
    color: '#6B7280',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D97706',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  discountBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 10,
    color: '#16A34A',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  addButtonTextDisabled: {
    color: '#9CA3AF',
  },
  viewButton: {
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 8,
  },
});