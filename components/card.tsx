import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  return (
    <View 
      style={[styles.card, style]} 
      {...props}
      // Important: Prevent children from overflowing
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        // You can log or use these dimensions if needed
      }}
    >
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden', // This prevents children from overflowing
  },
  cardContent: {
    flex: 1,
    overflow: 'hidden', // Additional safeguard
  },
});

export default Card;