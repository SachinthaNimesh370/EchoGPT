import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstPage from './screen/FirstPage';
import ChatPage from './screen/ChatPage'; // Make sure to create this file

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen 
          name="FirstPage" 
          component={FirstPage} 
          options={{
            headerTitle: null,  // Removes the title
            headerShown: false, // Hides the entire header, including back button
          }} 
        />
        <Stack.Screen 
          name="ChatPage" 
          component={ChatPage} 
          options={{
            headerTitle: null,  // Removes the title
            headerShown: false, // Hides the entire header, including back button
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});