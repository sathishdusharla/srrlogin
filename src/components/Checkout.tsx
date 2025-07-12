import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CustomerInfo } from '../types';

interface CheckoutProps {
  onBack: () => void;
  onOrderComplete: (orderInfo: any) => void;
}

export default function Checkout({ onBack, onOrderComplete }: CheckoutProps) {
  const { state, getTotalPrice, clearCart } = useCart();
  const { user, userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: userProfile?.displayName || '',
    email: user?.email || '',
    phone: userProfile?.phone || '',
    address: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Process order
      const orderInfo = {
        id: Date.now().toString(),
        items: state.items,
        total: getTotalPrice(),
        customerInfo,
        status: 'confirmed',
        createdAt: new Date()
      };
      
      clearCart();
      onOrderComplete(orderInfo);
    }
  };

  const isFormValid = customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-yellow-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-yellow-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-yellow-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              /* Step 1: Customer Information */
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        disabled={!!userProfile?.displayName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        disabled={!!user?.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      disabled={!!userProfile?.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your complete address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="Any special instructions"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isFormValid
                        ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              /* Step 2: Payment */
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                
                {/* Payment Options */}
                <div className="space-y-4 mb-6">
                  <div className="border-2 border-yellow-600 rounded-lg p-4 bg-yellow-50">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-yellow-600" />
                      <div>
                        <h3 className="font-semibold text-gray-800">UPI Payment</h3>
                        <p className="text-gray-600 text-sm">Pay securely using UPI</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UPI Details */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-4">Payment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>UPI ID:</span>
                      <span className="font-semibold">9490507045-4@ybl</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-semibold">+91 9490507045</span>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center mb-6">
                  <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                    <img
                      src="https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300"
                      alt="Payment QR Code"
                      className="w-48 h-48 object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-gray-600 mt-2">Scan to pay instantly</p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700 transition-colors duration-300"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-4">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-gray-600 text-xs">{item.product.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.product.price * item.quantity}</p>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-yellow-600">₹{getTotalPrice()}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}