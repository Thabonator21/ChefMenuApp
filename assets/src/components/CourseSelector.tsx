import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Course } from '../types';
interface CourseSelectorProps {
  selectedCourse: Course | 'All';
  onSelectCourse: (course: Course | 'All') => void;
  includeAll?: boolean;
}
const courses: Course[] = ['Starter', 'Main', 'Dessert'];
export default function CourseSelector({
  selectedCourse,
  onSelectCourse,
  includeAll = false,
}: CourseSelectorProps) {
  const availableCourses: Array<Course | 'All'> = includeAll
    ? ['All', ...courses]
    : courses;
  return (
    <View style={styles.container}>
      {availableCourses.map((course) => {
        const isSelected = selectedCourse === course;
        return (
          <Pressable
            key={course}
            onPress={() => onSelectCourse(course)}
            style={[
              styles.button,
              isSelected && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                isSelected && styles.selectedButtonText,
              ]}
            >
              {course}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#E8E2D6',
    borderColor: '#8B5E3C',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  selectedButton: {
    backgroundColor: '#8B5E3C',
  },
  buttonText: {
    color: '#5A3825',
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
});
