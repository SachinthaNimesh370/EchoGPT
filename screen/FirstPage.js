import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Button from '../component/Button';
import TextField from '../component/TextField';

export default function FirstPage({ navigation }) {
  const [apiKey, setApiKey] = useState('');

  const validateAPIKey = async () => {
    const isValid = await checkAPIKey(apiKey);
    if (isValid) {
      navigation.navigate('ChatPage', { apiKey: apiKey });
    } else {
      Alert.alert('Invalid API Key', 'Please enter a valid API key.');
    }
    setApiKey('');
  };

  const checkAPIKey = async (key) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Hello' },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          setApiKey('');
          console.log('API Key is valid:', data.choices[0].message.content);
          return true;
        }
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData?.error?.message || 'Unknown error');
      }
      return false;
    } catch (error) {
      console.error('Error validating API key:', error);
      return false;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Enter OpenAI API Key</Text>
            <TextField
              placeholder="Paste your API key here"
              value={apiKey}
              onChangeText={(val) => setApiKey(val)}
              secureTextEntry={true}
            />
            <View style={styles.buttonWrapper}>
              <Button text="Validate API Key" onPress={validateAPIKey} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2733',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#2C3748',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonWrapper: {
    marginTop: 15,
  },
});
