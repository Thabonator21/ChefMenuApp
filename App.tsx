import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from './assets/src/context/MenuContext';
import AppNavigator from './assets/src/navigation/AppNavigator';
export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </MenuProvider>
  );
}
