import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function TextField({ placeholder = 'Enter text...', value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 50,
    width:350,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color:'#fff',
    backgroundColor: '#242C3B',
  },
});
