import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MenuItem } from '../types';
interface MenuItemCardProps {
  item: MenuItem;
  showRemoveButton?: boolean;
  onRemove?: (id: string) => void;
}
export default function MenuItemCard({
  item,
  showRemoveButton = false,
  onRemove,
}: MenuItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headingRow}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.price}>
          R{item.price.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.description}>
        {item.description}
      </Text>
      {showRemoveButton && onRemove && (
        <Pressable
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}
        >
          <Text style={styles.removeButtonText}>
            Remove item
          </Text>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dishName: {
    color: '#3D2817',
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
  },
  price: {
    color: '#8B5E3C',
    fontSize: 17,
    fontWeight: 'bold',
  },
  course: {
    color: '#B06D3B',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  description: {
    color: '#555555',
    lineHeight: 21,
    marginTop: 8,
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: '#B3261E',
    borderRadius: 8,
    marginTop: 14,
    padding: 10,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
