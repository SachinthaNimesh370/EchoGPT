🤖 EchoGPT – AI Chatbot Mobile App (React Native + OpenAI)
EchoGPT is a lightweight AI-powered mobile chatbot app built with React Native (Expo) and integrated with OpenAI's GPT-4o-mini model. It provides a conversational interface with clean UI, Markdown support, and role-based chat design.

📁 Folder Structure

EchoGPT/
├── .expo/                      # Expo internal config
├── assets/                    # App media, icons, etc.
├── component/                 # Custom UI components like Button, TextField
├── node_modules/
├── screen/                    # App screens
│   ├── ChatPage.jsx
│   └── FirstPage.jsx
├── .gitignore
├── App.js                     # App root
├── app.json                   # Expo configuration
├── index.js
├── package.json
├── package-lock.json
└── README.md                  # ← You're here!

🚀 Features
  💬 Chat with GPT-4o-mini via OpenAI API
  
  ✨ Markdown rendering for rich assistant replies
  
  📱 Mobile-optimized keyboard handling
  
  🧼 Clean and simple UI layout

🧠 Tech Stack
  Mobile App	React Native with Expo
  Language	JavaScript (ES6+)
  Chat API	OpenAI GPT-4o-mini (Chat API)
  Markdown	@ronradtke/react-native-markdown-display

📲 Setup Instructions
1. Clone the repo
  git clone https://github.com/your-username/EchoGPT.git
  cd EchoGPT

2. Install dependencies
  npm install

3. Start the Expo server
  npx expo start

4. Run on your device or emulator using Expo Go
