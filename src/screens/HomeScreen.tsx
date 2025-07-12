import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const featuredProducts = products.slice(0, 6);

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logo}>
              <Ionicons name="storefront" size={32} color="#D97706" />
              <View style={styles.logoText}>
                <Text style={styles.logoTitle}>SRR FARMS</Text>
                <Text style={styles.logoSubtitle}>Est. 2025</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.cartButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Ionicons name="bag-outline" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <SearchBar onProductSelect={handleProductPress} />
        </View>

        {/* Hero Section */}
        <LinearGradient
          colors={['#FEF3C7', '#FED7AA']}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Pure <Text style={styles.heroHighlight}>A2 Dairy Products</Text>
              {'\n'}Made with Love
            </Text>
            <Text style={styles.heroSubtitle}>
              Experience the rich, authentic taste of traditionally made ghee and fresh farm milk
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.navigate('Products')}
              activeOpacity={0.8}
            >
              <Text style={styles.heroButtonText}>Shop Now</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Features */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresGrid}>
            {[
              { icon: 'shield-checkmark', title: '100% Pure', subtitle: 'No chemicals' },
              { icon: 'leaf', title: 'Traditional', subtitle: 'Bilona method' },
              { icon: 'car', title: 'Fresh Delivery', subtitle: 'Daily fresh milk' },
              { icon: 'star', title: 'Premium Quality', subtitle: 'A2 products' },
            ].map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon as any} size={24} color="#D97706" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Product Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Our Product Range</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Products')}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=600'
                }}
                style={styles.categoryImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.categoryOverlay}
              >
                <View style={styles.categoryContent}>
                  <Ionicons name="water" size={24} color="#FFFFFF" />
                  <Text style={styles.categoryTitle}>Premium Ghee</Text>
                  <Text style={styles.categorySubtitle}>Traditional Bilona Method</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Products')}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=600'
                }}
                style={styles.categoryImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.categoryOverlay}
              >
                <View style={styles.categoryContent}>
                  <Ionicons name="nutrition" size={24} color="#FFFFFF" />
                  <Text style={styles.categoryTitle}>Fresh Milk</Text>
                  <Text style={styles.categorySubtitle}>Daily Fresh Delivery</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Products')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => handleProductPress(product)}
                style={styles.productCard}
              />
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={['#D97706', '#F59E0B']}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to Experience Pure Dairy?</Text>
          <Text style={styles.ctaSubtitle}>
            Order now and taste the difference of traditionally made products
          </Text>
          <View style={styles.ctaButtons}>
            <TouchableOpacity
              style={styles.ctaPrimaryButton}
              onPress={() => navigation.navigate('Products')}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaPrimaryButtonText}>Shop Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ctaSecondaryButton}
              activeOpacity={0.8}
            >
              <Text style={styles.ctaSecondaryButtonText}>WhatsApp Order</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 12,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  cartButton: {
    padding: 8,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  heroHighlight: {
    color: '#D97706',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButton: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#FEF3C7',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  categoriesSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 2,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  categoryContent: {
    padding: 16,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#FEF3C7',
    marginTop: 4,
  },
  productsSection: {
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  viewAllText: {
    color: '#D97706',
    fontSize: 16,
    fontWeight: '600',
  },
  productsScroll: {
    paddingLeft: 20,
  },
  productCard: {
    marginRight: 16,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#FEF3C7',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButtons: {
    width: '100%',
  },
  ctaPrimaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  ctaPrimaryButtonText: {
    color: '#D97706',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaSecondaryButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaSecondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});