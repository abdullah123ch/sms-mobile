// components/results/DetailedHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface DetailedHeaderProps {
  onBack: () => void;
}

const DetailedHeader: React.FC<DetailedHeaderProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      {/* White static header */}
      <View style={styles.header} />
      
      {/* Back button below header */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ArrowLeft size={24} color="#374151" />
        <Text style={styles.backText}>Back to Grades</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  header: {
    height: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default DetailedHeader;