# 🤖 EchoGPT – AI Chatbot Mobile App (React Native + OpenAI)

EchoGPT is a lightweight AI-powered mobile chatbot app built with **React Native (Expo)** and integrated with **OpenAI's GPT-4o-mini model**. It provides a conversational interface with clean UI, Markdown support, and role-based chat design.

---

## 📁 Folder Structure

EchoGPT/
├── .expo/
├── assets/ # App media, icons, etc.
├── component/ # Custom UI components like Button, TextField
├── node_modules/
├── screen/ # App screens (ChatPage, FirstPage)
│ ├── ChatPage.jsx
│ └── FirstPage.jsx
├── .gitignore
├── App.js # App root
├── app.json # Expo configuration
├── index.js
├── package.json
├── package-lock.json
└── README.md # ← You're here!

yaml
Copy
Edit

---

## 🚀 Features

- 💬 Chat with GPT-4o-mini via OpenAI API
- 👤 Role-based message styling (User & Assistant)
- ⏳ Async loading indicator while waiting for responses
- ✨ Markdown rendering for rich assistant replies
- 📱 Mobile-optimized keyboard handling
- 🧼 Clean and simple UI layout

---

## 🧠 Tech Stack

| Layer        | Technology                         |
| ------------ | ----------------------------------- |
| Mobile App   | React Native with Expo              |
| Language     | JavaScript (ES6+)                   |
| Chat API     | OpenAI GPT-4o-mini (Chat API)       |
| UI Elements  | Custom components + Flexbox layout  |
| Markdown     | [`@ronradtke/react-native-markdown-display`](https://www.npmjs.com/package/@ronradtke/react-native-markdown-display) |

---

## 📲 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/EchoGPT.git
cd EchoGPT
2. Install dependencies
bash
Copy
Edit
npm install
3. Start the Expo server
bash
Copy
Edit
npx expo start
4. Run on your device or emulator using Expo Go
🔐 API Key Configuration
Pass your OpenAI API key to ChatPage via navigation route.params.
Example:

js
Copy
Edit
<ChatPage route={{ params: { apiKey: 'your_openai_api_key_here' } }} />
⚠️ Avoid hardcoding API keys in production apps!

🖼 UI Preview
Add screenshots or a screen recording demo here for visual showcase.

🛠️ To-Do / Future Enhancements
🔤 Sinhala language support

💾 Save chat history locally

🌑 Light/Dark theme toggle

📍 Settings screen for API key entry

📱 Deploy to Play Store / App Store

🙋‍♂️ Author
Didula Wijesuriya
Student | Mobile Developer | AI Enthusiast
🔗 LinkedIn
📧 your.email@example.com

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgements
OpenAI

React Native

Expo

@ronradtke/react-native-markdown-display
