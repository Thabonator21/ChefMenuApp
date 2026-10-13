import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import MenuItemCard from '../components/MenuItemCard';
import SummaryCard from '../components/SummaryCard';
import { useMenu } from '../context/MenuContext';
import { RootStackParamList } from '../types';
import {
  calculateCourseAverages,
  countMenuItems,
} from '../utils/menuCalculations';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen({
  navigation,
}: Props) {
  const { menuItems } = useMenu();

  const totalItems = useMemo(
    () => countMenuItems(menuItems),
    [menuItems]
  );

  const courseAverages = useMemo(
    () => calculateCourseAverages(menuItems),
    [menuItems]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              Christoffel&apos;s Menu
            </Text>

            <Text style={styles.subtitle}>
              A personalised dining experience
            </Text>

            <View style={styles.navigationRow}>
              <Pressable
                style={styles.primaryButton}
                onPress={() =>
                  navigation.navigate('ManageMenu')
                }
              >
                <Text style={styles.buttonText}>
                  Manage Menu
                </Text>
              </Pressable>

              <Pressable
                style={styles.secondaryButton}
                onPress={() =>
                  navigation.navigate('FilterMenu')
                }
              >
                <Text
                  style={styles.secondaryButtonText}
                >
                  Filter Menu
                </Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>
              Menu summary
            </Text>

            <View style={styles.summaryGrid}>
              <SummaryCard
                label="Total items"
                value={totalItems.toString()}
              />

              {courseAverages.map((result) => (
                <SummaryCard
                  key={result.course}
                  label={`${result.course} average`}
                  value={`R${result.average.toFixed(2)}`}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>
              Complete menu
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <MenuItemCard item={item} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              There are no menu items yet.
            </Text>

            <Text style={styles.emptySubtext}>
              Open Manage Menu to add the first dish.
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
  listContent: {
    padding: 18,
    paddingBottom: 40,
  },
  title: {
    color: '#3D2817',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#7A6655',
    fontSize: 15,
    marginBottom: 20,
    marginTop: 4,
  },
  navigationRow: {
    gap: 10,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#8B5E3C',
    borderRadius: 10,
    padding: 14,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#8B5E3C',
    borderRadius: 10,
    borderWidth: 2,
    padding: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#8B5E3C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#3D2817',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 24,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
  },
  emptyText: {
    color: '#3D2817',
    fontSize: 17,
    fontWeight: 'bold',
  },
  emptySubtext: {
    color: '#777777',
    marginTop: 5,
    textAlign: 'center',
  },
});