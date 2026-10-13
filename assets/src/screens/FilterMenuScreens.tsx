import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CourseSelector from '../components/CourseSelector';
import MenuItemCard from '../components/MenuItemCard';
import { useMenu } from '../context/MenuContext';
import { Course } from '../types';
import { filterItemsByCourse } from '../utils/menuCalculations';
export default function FilterMenuScreen() {
  const { menuItems } = useMenu();
  const [selectedCourse, setSelectedCourse] =
    useState<Course | 'All'>('All');
  const filteredItems = useMemo(
    () => filterItemsByCourse(menuItems, selectedCourse),
    [menuItems, selectedCourse]
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Guest Menu</Text>
            <Text style={styles.instructions}>
              Select a course to display matching dishes.
            </Text>
            <CourseSelector
              selectedCourse={selectedCourse}
              onSelectCourse={setSelectedCourse}
              includeAll
            />
            <Text style={styles.resultText}>
              Showing {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'dish' : 'dishes'}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <MenuItemCard item={item} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No dishes are available for {selectedCourse}.
            </Text>
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F4EE',
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  title: {
    color: '#3D2817',
    fontSize: 28,
    fontWeight: 'bold',
  },
  instructions: {
    color: '#6F6258',
    lineHeight: 21,
    marginBottom: 8,
    marginTop: 5,
  },
  resultText: {
    color: '#3D2817',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
  },
  emptyText: {
    color: '#777777',
    textAlign: 'center',
  },
});
