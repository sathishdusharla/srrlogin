import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

interface ProductsScreenProps {
  navigation: any;
}

export default function ProductsScreen({ navigation }: ProductsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showSortModal, setShowSortModal] = useState(false);

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { product });
  };

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'category', label: 'Category' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Premium Products</Text>
        <Text style={styles.headerSubtitle}>
          Choose from our range of pure A2 dairy products
        </Text>
        <SearchBar onProductSelect={handleProductPress} />
      </View>

      {/* Category Filter */}
      <View style={styles.categorySection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(item.id)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === item.id && styles.categoryButtonTextActive
              ]}>
                {item.name} ({item.count})
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Controls */}
      <View style={styles.controlsSection}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortModal(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="funnel-outline" size={20} color="#6B7280" />
          <Text style={styles.sortButtonText}>
            {sortOptions.find(option => option.value === sortBy)?.label}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>
        
        <Text style={styles.resultCount}>
          {sortedProducts.length} products
        </Text>
      </View>

      {/* Products Grid */}
      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        columnWrapperStyle={styles.productsRow}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
            style={styles.productCard}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No products found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try adjusting your filters
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setSelectedCategory('all')}
              activeOpacity={0.8}
            >
              <Text style={styles.resetButtonText}>View All Products</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort Products</Text>
              <TouchableOpacity
                onPress={() => setShowSortModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  sortBy === option.value && styles.sortOptionActive
                ]}
                onPress={() => {
                  setSortBy(option.value);
                  setShowSortModal(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortBy === option.value && styles.sortOptionTextActive
                ]}>
                  {option.label}
                </Text>
                {sortBy === option.value && (
                  <Ionicons name="checkmark" size={20} color="#D97706" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  categorySection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginHorizontal: 8,
  },
  resultCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  productsList: {
    padding: 20,
  },
  productsRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#D97706',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalCloseButton: {
    padding: 4,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sortOptionActive: {
    backgroundColor: '#FEF3C7',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  sortOptionTextActive: {
    color: '#D97706',
    fontWeight: '600',
  },
});