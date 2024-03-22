import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import InitScreen from '../../auth/screens/InitScreen';
import LoginScreen from '../../auth/screens/LoginScreen';
import MainScreen from '../../main/screens/MainScreen';
import {StackParamList} from './types';

const Stack = createNativeStackNavigator<StackParamList>();

export const navigationRef =
  React.createRef<NavigationContainerRef<StackParamList>>();

export default function AppNavigation() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="InitScreen" component={InitScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
