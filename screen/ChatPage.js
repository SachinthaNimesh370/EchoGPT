import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Markdown from 'react-native-markdown-display'; // ✅ Use maintained package

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

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user' ? styles.userMessage : styles.assistantMessage,
      ]}
    >
      {item.role === 'user' ? (
        <Text style={styles.userText}>{item.content}</Text>
      ) : (
        <Markdown style={markdownStyles}>{item.content}</Markdown>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={styles.chatContainer}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <View style={styles.inputRow}>
              <View style={styles.inputFlex}>
                <TextInput
                  placeholder="Type your message..."
                  placeholderTextColor="#ccc"
                  value={input}
                  onChangeText={setInput}
                  style={styles.input}
                  multiline
                />
              </View>
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="small" color="#00AFFF" style={{ margin: 10 }} />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
    backgroundColor: '#252D3C',
  },
  chatContainer: {
    padding: 10,
    marginTop:40,
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
  userText: {
    color: '#fff',
    fontSize: 16,
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
  input: {
    backgroundColor: '#2C3545',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#3C9EEA',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const markdownStyles = {
  body: {
    color: '#fff',
    fontSize: 16,
  },
  strong: {
    fontWeight: 'bold',
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
};
