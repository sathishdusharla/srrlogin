import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <LinearGradient
      colors={['#FEF3C7', '#FED7AA']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo and Title */}
          <View style={styles.header}>
            <Ionicons name="storefront" size={100} color="#D97706" />
            <Text style={styles.title}>SRR FARMS</Text>
            <Text style={styles.subtitle}>Pure A2 Dairy Products</Text>
          </View>

          {/* Hero Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=600'
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="shield-checkmark" size={24} color="#D97706" />
              <Text style={styles.featureText}>100% Pure & Natural</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="leaf" size={24} color="#D97706" />
              <Text style={styles.featureText}>Traditional Bilona Method</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="car" size={24} color="#D97706" />
              <Text style={styles.featureText}>Fresh Daily Delivery</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Signup')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heroImage: {
    width: width * 0.8,
    height: height * 0.25,
    borderRadius: 20,
  },
  features: {
    marginVertical: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#D97706',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#D97706',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#D97706',
    fontSize: 18,
    fontWeight: 'bold',
  },
});