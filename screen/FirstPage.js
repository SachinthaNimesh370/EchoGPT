import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import Button from '../component/Button';
import TextField from '../component/TextField';
import ChatPage from './ChatPage';

export default function FirstPage({ navigation }) {
  const [apiKey, setApiKey] = useState('');

  // Function to validate the API key
  const validateAPIKey = async () => {
    const isValid = await checkAPIKey(apiKey);
    if (isValid) {
      // Navigate to the second page if the API key is valid
      navigation.navigate('ChatPage');
    } else {
      // Show an alert if the API key is invalid
      Alert.alert('Invalid API Key', 'Please enter a valid API key.');
    }
    setApiKey('');
  };

  // Function to check if the API key is valid by calling OpenAI API
  const checkAPIKey = async (key) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Replace with the model you want to use (e.g., 'gpt-4')
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Hello' },
          ],
        }),
      });

      // Check if the response is valid (status code 200)
      if (response.ok) {
        const data = await response.json();

        // If we get a valid response and choices are present, return true
        if (data.choices && data.choices.length > 0) {
            setApiKey('');
          console.log('API Key is valid:', data.choices[0].message.content);  // Log the response from GPT
          return true;
        }
      } else {
        // Handle errors based on OpenAI API error codes
        const errorData = await response.json();
        if (errorData.error && errorData.error.code === 'invalid_api_key') {
          console.log('Invalid API Key:', errorData.error.message);
        } else {
          console.log('Error:', errorData.error ? errorData.error.message : 'Unknown error');
        }
      }
      return false; // If invalid key or error occurs
    } catch (error) {
      console.error('Error validating API key:', error);
      return false; // In case of any error, return false
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextField
        placeholder="Enter your API key"
        value={apiKey}
        onChangeText={(val) => setApiKey(val)}
        secureTextEntry={true}  // Optional: To hide the API key for privacy
      />
      <Button text="Validate API Key" onPress={validateAPIKey} />
    </View>
  );
}
