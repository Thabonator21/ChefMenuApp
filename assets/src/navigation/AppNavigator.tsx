import React from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import FilterMenuScreen from '../screens/FilterMenuScreens';
import HomeScreen from '../screens/HomeScreen';
import ManageMenuScreen from '../screens/ManangeMenuScreen';
import { RootStackParamList } from '../types';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#8B5E3C',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Chef Menu',
        }}
      />
      <Stack.Screen
        name="ManageMenu"
        component={ManageMenuScreen}
        options={{
          title: 'Manage Menu',
        }}
      />
      <Stack.Screen
        name="FilterMenu"
        component={FilterMenuScreen}
        options={{
          title: 'Filter Menu',
        }}
      />
    </Stack.Navigator>
  );
}
