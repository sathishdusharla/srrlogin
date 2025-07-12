import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../data/products';

interface SearchBarProps {
  onProductSelect: (product: any) => void;
}

export default function SearchBar({ onProductSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.size.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleProductSelect = (product: any) => {
    setQuery('');
    setIsOpen(false);
    onProductSelect(product);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search for dairy products..."
          placeholderTextColor="#9CA3AF"
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.resultsContainer}>
            {filteredProducts.length > 0 ? (
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handleProductSelect(item)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.resultImage}
                    />
                    <View style={styles.resultContent}>
                      <Text style={styles.resultName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.resultSize}>{item.size}</Text>
                      <Text style={styles.resultPrice}>₹{item.price}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="search" size={48} color="#D1D5DB" />
                <Text style={styles.noResultsText}>
                  No products found for "{query}"
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  clearButton: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  resultImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  resultSize: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D97706',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
});