import { Course, MenuItem } from '../types';
export interface CourseAverage {
  course: Course;
  average: number;
  itemCount: number;
}
export const countMenuItems = (items: MenuItem[]): number => {
  let count = 0;
  let index = 0;
  while (index < items.length) {
    count++;
    index++;
  }
  return count;
};
export const calculateCourseAverages = (
  items: MenuItem[]
): CourseAverage[] => {
  const totals: Record<Course, number> = {
    Starter: 0,
    Main: 0,
    Dessert: 0,
  };
  const counts: Record<Course, number> = {
    Starter: 0,
    Main: 0,
    Dessert: 0,
  };
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    totals[item.course] += item.price;
    counts[item.course] += 1;
  }
  const averages: CourseAverage[] = [];
  for (const course in totals) {
    const typedCourse = course as Course;
    const count = counts[typedCourse];
    averages.push({
      course: typedCourse,
      itemCount: count,
      average: count === 0 ? 0 : totals[typedCourse] / count,
    });
  }
  return averages;
};
export const filterItemsByCourse = (
  items: MenuItem[],
  selectedCourse: Course | 'All'
): MenuItem[] => {
  if (selectedCourse === 'All') {
    return items;
  }
  return items.filter((item) => item.course === selectedCourse);
};
