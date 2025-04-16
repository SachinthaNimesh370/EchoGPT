import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';


export default function Button({ text = 'Click Me', onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#34C8E8', '#4E4AF2']} // You can change these colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
