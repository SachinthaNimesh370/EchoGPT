import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './component/Button';
import TextField from './component/TextField';


export default function App() {
  const [text, setText] = useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button text="Get Started" onPress={() => alert('Pressed!')} />
      <TextField
        placeholder="Your name"
        value={text}
        onChangeText={(val) => setText(val)}
      />
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