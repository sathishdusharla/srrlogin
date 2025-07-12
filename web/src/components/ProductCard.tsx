import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, onViewDetails, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
    } else {
      alert('Please sign in to add items to cart');
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex">
        {product.badge && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-full text-sm font-semibold z-10">
            {product.badge}
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-32 object-cover"
        />
        
        <div className="flex-1 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span className="text-gray-600 text-sm capitalize">{product.category}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-3">{product.size}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : i < product.rating
                      ? 'text-yellow-400 fill-current opacity-50'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-yellow-600">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || !user}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  product.inStock && user
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{!product.inStock ? 'Out of Stock' : !user ? 'Sign In' : 'Add to Cart'}</span>
              </button>
              
              <button
                onClick={() => onViewDetails(product)}
                className="flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors duration-300"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="relative">
        {product.badge && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-2 rounded-full text-sm font-semibold z-10">
            {product.badge}
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-gray-600 text-sm capitalize">{product.category}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.size}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : i < product.rating
                    ? 'text-yellow-400 fill-current opacity-50'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-yellow-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">₹{product.originalPrice}</span>
            )}
          </div>
          {product.originalPrice && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
              Save ₹{product.originalPrice - product.price}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || !user}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
              product.inStock && user
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{!product.inStock ? 'Out of Stock' : !user ? 'Sign In' : 'Add'}</span>
          </button>
          
          <button
            onClick={() => onViewDetails(product)}
            className="bg-yellow-100 text-yellow-700 p-2 rounded-lg hover:bg-yellow-200 transition-colors duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}