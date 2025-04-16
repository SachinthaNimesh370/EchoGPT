import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FirstPage from './screen/FirstPage';



export default function App() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FirstPage/>
      
    </View>
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