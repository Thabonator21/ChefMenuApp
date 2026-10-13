import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
interface SummaryCardProps {
  label: string;
  value: string;
}
export default function SummaryCard({
  label,
  value,
}: SummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF4E6',
    borderColor: '#D9A066',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    minWidth: 100,
    padding: 12,
  },
  label: {
    color: '#6F4E37',
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: '#3D2817',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
