import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Button from '../component/Button';
import TextField from '../component/TextField';

export default function ChatPage({ route }) {
  const { apiKey } = route.params;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...updatedMessages],
        }),
      });

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || 'Something went wrong';

      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Error fetching response.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user' ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputRow}>
        <View style={styles.inputFlex}>
          <TextField
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
          />
        </View>
        <Button text="Send" onPress={sendMessage} />
      </View>

      {loading && <ActivityIndicator size="small" color="#00AFFF" style={{ marginBottom: 10 }} />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252D3C',
    paddingTop: 40,
  },
  chatContainer: {
    padding: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  messageContainer: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#3C9EEA',
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: '#3C4A5A',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#3B4455',
    backgroundColor: '#1F2733',
  },
  inputFlex: {
    flex: 1,
    marginRight: 10,
  },
});
