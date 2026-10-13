import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import CourseSelector from '../components/CourseSelector';
import MenuItemCard from '../components/MenuItemCard';
import { useMenu } from '../context/MenuContext';
import { Course, MenuItem } from '../types';

export default function ManageMenuScreen() {
  const {
    menuItems,
    addMenuItem,
    removeMenuItem,
  } = useMenu();

  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<Course>('Starter');
  const [price, setPrice] = useState<string>('');

  const clearForm = (): void => {
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  const validateForm = (): boolean => {
    if (dishName.trim() === '') {
      Alert.alert(
        'Missing dish name',
        'Enter the dish name.'
      );

      return false;
    }

    if (description.trim() === '') {
      Alert.alert(
        'Missing description',
        'Enter a description of the dish.'
      );

      return false;
    }

    if (price.trim() === '') {
      Alert.alert(
        'Missing price',
        'Enter the dish price.'
      );

      return false;
    }

    const numericPrice = Number(price);

    if (
      Number.isNaN(numericPrice) ||
      numericPrice <= 0
    ) {
      Alert.alert(
        'Invalid price',
        'Enter a valid price greater than zero.'
      );

      return false;
    }

    return true;
  };

  const handleAddItem = (): void => {
    if (!validateForm()) {
      return;
    }

    const newItem: MenuItem = {
      id: `${Date.now()}-${Math.random()}`,
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price),
    };

    addMenuItem(newItem);
    clearForm();

    Alert.alert(
      'Menu item added',
      `${newItem.dishName} was added successfully.`
    );
  };

  const confirmRemoveItem = (
    item: MenuItem
  ): void => {
    Alert.alert(
      'Remove menu item',
      `Are you sure you want to remove ${item.dishName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeMenuItem(item.id),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              Manage Menu
            </Text>

            <Text style={styles.instructions}>
              Enter the details of a dish and choose
              its course.
            </Text>

            <Text style={styles.label}>
              Dish name
            </Text>

            <TextInput
              value={dishName}
              onChangeText={setDishName}
              placeholder="Example: Grilled salmon"
              style={styles.input}
            />

            <Text style={styles.label}>
              Description
            </Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the dish"
              multiline
              numberOfLines={4}
              style={[
                styles.input,
                styles.descriptionInput,
              ]}
            />

            <Text style={styles.label}>
              Course
            </Text>

            <CourseSelector
              selectedCourse={course}
              onSelectCourse={(selectedCourse) => {
                if (selectedCourse !== 'All') {
                  setCourse(selectedCourse);
                }
              }}
            />

            <Text style={styles.label}>
              Price
            </Text>

            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Example: 150.00"
              keyboardType="decimal-pad"
              style={styles.input}
            />

            <Pressable
              style={styles.addButton}
              onPress={handleAddItem}
            >
              <Text style={styles.addButtonText}>
                Add Menu Item
              </Text>
            </Pressable>

            <Text style={styles.sectionTitle}>
              Current menu items
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            showRemoveButton
            onRemove={() =>
              confirmRemoveItem(item)
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No items have been added yet.
          </Text>
        }
      />
    </KeyboardAvoidingView>
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
    marginBottom: 18,
    marginTop: 5,
  },
  label: {
    color: '#3D2817',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBB9A8',
    borderRadius: 9,
    borderWidth: 1,
    fontSize: 16,
    padding: 12,
  },
  descriptionInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#3D2817',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 28,
  },
  emptyText: {
    color: '#777777',
    padding: 20,
    textAlign: 'center',
  },
});