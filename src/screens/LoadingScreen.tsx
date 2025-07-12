import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen() {
  return (
    <LinearGradient
      colors={['#FEF3C7', '#FED7AA']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name="storefront" size={80} color="#D97706" />
        <Text style={styles.title}>SRR FARMS</Text>
        <Text style={styles.subtitle}>Pure A2 Dairy Products</Text>
        <ActivityIndicator 
          size="large" 
          color="#D97706" 
          style={styles.loader}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});