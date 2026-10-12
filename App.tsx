import React, { useRef, useState } from 'react';
import {
View,
Text,
TextInput,
TouchableOpacity,
FlatList,
StyleSheet,
ToastAndroid,
Keyboard,
Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

// Describes the structure of one menu item
interface MenuItem {
id: string;
dishName: string;
description: string;
course: string;
price: number;
}

export default function App(): React.JSX.Element {
// State variables for the form
const [dishName, setDishName] = useState<string>('');
const [description, setDescription] = useState<string>('');
const [course, setCourse] = useState<string>('');
const [price, setPrice] = useState<string>('');

// Array that stores the menu items
const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

// Animation value
const fadeAnimation = useRef(new Animated.Value(1)).current;

// Adds a new item to the menu
const addMenuItem = (): void => {
const cleanedDishName = dishName.trim();
const cleanedDescription = description.trim();
const cleanedPrice = price.trim();
const numericPrice = Number(cleanedPrice);

// Validate empty fields
if (
cleanedDishName === '' ||
cleanedDescription === '' ||
course === '' ||
cleanedPrice === ''
) {
ToastAndroid.show(
'Please complete all the fields.',
ToastAndroid.SHORT
);
return;
}

// Validate the price
if (isNaN(numericPrice) || numericPrice <= 0) {
ToastAndroid.show(
'Please enter a valid price greater than zero.',
ToastAndroid.SHORT
);
return;
}

// Construct a new menu item object
const newMenuItem: MenuItem = {
id: Date.now().toString(),
dishName: cleanedDishName,
description: cleanedDescription,
course: course,
price: numericPrice,
};

// Add the new item without changing the original array
setMenuItems((currentItems) => [...currentItems, newMenuItem]);

// Display confirmation message
ToastAndroid.show('${cleanedDishName} was added to the menu',
ToastAndroid.SHORT
);

// Clear the input controls
clearForm();

// Run the animation
Animated.sequence([
Animated.timing(fadeAnimation, {
toValue: 0.4,
duration: 200,
useNativeDriver: true,
}),
Animated.timing(fadeAnimation, {
toValue: 1,
duration: 300,
useNativeDriver: true,
}),
]).start();

Keyboard.dismiss();
};

// Clears the form after an item has been added
const clearForm = (): void => {
setDishName('');
setDescription('');
setCourse('');
setPrice('');
};

// Displays one menu item in the FlatList
const renderMenuItem = ({
item,
}: {
item: MenuItem;
}): React.JSX.Element => {
return (
<View style={styles.menuCard}>
<View style={styles.menuCardHeader}>
<Text style={styles.dishName}>{item.dishName}</Text>

<Text style={styles.price}>
  R{item.price.toFixed(2)}
</Text>
</View>

<Text style={styles.course}>{item.course}</Text>

<Text style={styles.description}>
{item.description}
</Text>
</View>
);
};

return (
  <SafeAreaView style={styles.safeArea}>
    <FlatList
      data={menuItems}
      keyExtractor={(item: MenuItem) => item.id}
      renderItem={renderMenuItem}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <>
          {/* Application heading */}
          <View style={styles.header}>
            <Text style={styles.logo}>🍽️</Text>

            <Text style={styles.title}>
              Christoffel's Menu
            </Text>

            <Text style={styles.subtitle}>
              Create tonight's dining experience
            </Text>
          </View>

          {/* Menu item input form */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>
              Add a Menu Item
            </Text>

            <Text style={styles.label}>
              Dish name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="For example, Grilled Salmon"
              placeholderTextColor="#777777"
              value={dishName}
              onChangeText={(text: string) => {
                setDishName(text);
              }}
            />

            <Text style={styles.label}>
              Description
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
              ]}
              placeholder="Enter a description of the dish"
              placeholderTextColor="#777777"
              value={description}
              onChangeText={(text: string) => {
                setDescription(text);
              }}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.label}>
              Course
            </Text>

           <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(itemValue: string) => {
                  setCourse(itemValue);
                }}
                mode="dialog"
                prompt="Select a course"
                style={styles.picker}
                dropdownIconColor="#6D1F2A"
              >
                <Picker.Item
                  label="Select a course"
                  value=""
                  enabled={false}
                />

                <Picker.Item
                  label="Starter"
                  value="Starter"
                />

                <Picker.Item
                  label="Main"
                  value="Main"
                />

                <Picker.Item
                  label="Dessert"
                  value="Dessert"
                />
              </Picker>
            </View>

            <Text style={styles.label}>
              Price
            </Text>

            <TextInput
              style={styles.input}
              placeholder="For example, 150"
              placeholderTextColor="#777777"
              value={price}
              onChangeText={(text: string) => {
                setPrice(text);
              }}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addMenuItem}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>
                Add to Menu
              </Text>
            </TouchableOpacity>
          </View>

          {/* Menu item total */}
          <Animated.View
            style={[
              styles.summaryContainer,
              { opacity: fadeAnimation },
            ]}
          >
            <Text style={styles.summaryLabel}>
              Total menu items
            </Text>

            <Text style={styles.totalNumber}>
              {menuItems.length}
            </Text>
          </Animated.View>

          <Text style={styles.menuHeading}>
            Tonight's Menu
          </Text>
        </>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>

          <Text style={styles.emptyTitle}>
            The menu is empty
          </Text>

          <Text style={styles.emptyText}>
            Complete the form above to add the first dish.
          </Text>
        </View>
      }
    />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
safeArea: {
flex: 1,
backgroundColor: '#FFF8EE',
},

listContent: {
paddingBottom: 40,
},

header: {
backgroundColor: '#6D1F2A',
paddingHorizontal: 20,
paddingVertical: 28,
alignItems: 'center',
},

logo: {
fontSize: 42,
marginBottom: 5,
},

title: {
color: '#FFFFFF',
fontSize: 27,
fontWeight: 'bold',
},

subtitle: {
color: '#F4DAC3',
fontSize: 14,
marginTop: 6,
textAlign: 'center',
},

formContainer: {
backgroundColor: '#FFFFFF',
margin: 16,
padding: 18,
borderRadius: 14,
elevation: 4,
},

sectionTitle: {
color: '#6D1F2A',
fontSize: 21,
fontWeight: 'bold',
marginBottom: 16,
},

label: {
color: '#2F2F2F',
fontSize: 15,
fontWeight: '600',
marginBottom: 6,
},

input: {
borderWidth: 1,
borderColor: '#CCB9A8',
backgroundColor: '#FFFCF8',
borderRadius: 8,
paddingHorizontal: 12,
paddingVertical: 11,
fontSize: 16,
color: '#222222',
marginBottom: 16,
},

descriptionInput: {
minHeight: 90,
},

pickerContainer: {
borderWidth: 1,
borderColor: '#CCB9A8',
backgroundColor: '#FFFCF8',
borderRadius: 8,
marginBottom: 16,
overflow: 'hidden',
},

picker: {
  width: '100%',
  height: 55,
  color: '#222222',
},

addButton: {
backgroundColor: '#D99028',
paddingVertical: 14,
borderRadius: 8,
alignItems: 'center',
marginTop: 5,
},

addButtonText: {
color: '#FFFFFF',
fontSize: 17,
fontWeight: 'bold',
},

summaryContainer: {
backgroundColor: '#6D1F2A',
marginHorizontal: 16,
marginBottom: 20,
padding: 18,
borderRadius: 12,
alignItems: 'center',
},

summaryLabel: {
color: '#F4DAC3',
fontSize: 15,
},

totalNumber: {
color: '#FFFFFF',
fontSize: 36,
fontWeight: 'bold',
marginTop: 4,
},

menuHeading: {
color: '#6D1F2A',
fontSize: 23,
fontWeight: 'bold',
marginHorizontal: 16,
marginBottom: 12,
},

menuCard: {
backgroundColor: '#FFFFFF',
marginHorizontal: 16,
marginBottom: 12,
padding: 16,
borderRadius: 12,
borderLeftWidth: 5,
borderLeftColor: '#D99028',
elevation: 2,
},

menuCardHeader: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'flex-start',
},

dishName: {
color: '#2A2A2A',
fontSize: 19,
fontWeight: 'bold',
flex: 1,
marginRight: 10,
},

price: {
color: '#6D1F2A',
fontSize: 18,
fontWeight: 'bold',
},

course: {
color: '#D07919',
fontSize: 14,
fontWeight: '700',
marginTop: 5,
textTransform: 'uppercase',
},

description: {
color: '#555555',
fontSize: 15,
lineHeight: 21,
marginTop: 9,
},

emptyContainer: {
alignItems: 'center',
paddingHorizontal: 30,
paddingVertical: 35,
},

emptyIcon: {
fontSize: 45,
},

emptyTitle: {
color: '#333333',
fontSize: 19,
fontWeight: 'bold',
marginTop: 10,
},

emptyText: {
color: '#666666',
fontSize: 14,
textAlign: 'center',
marginTop: 6,
},
});
