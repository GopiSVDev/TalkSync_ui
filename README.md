# 🖥️ TalkSync UI

**TalkSync UI** is the React-based frontend for the TalkSync real-time chat application. Inspired by Telegram’s clean interface, it delivers a polished, responsive user experience, connecting to the TalkSync backend via REST and WebSocket.

---

## ✨ Key Features

- 🔐 **Auth Flows**: Sign-up, login, and one-click guest login with Faker-generated names
- 📋 **Chat List & Management**: Sidebar of recent chats with avatars and timestamps; create, search, and delete chats
- 💬 **Message Interface**: Telegram-style bubbles with date separators and avatars; send and receive text messages
- ⌨️ **Live Indicators**: “typing…” notifications and real-time online/offline status
- 🎨 **Theming & Layout**: Light/dark mode toggle and responsive design with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer             | Technology                                  |
| ----------------- | ------------------------------------------- |
| **Framework**     | React (Vite + `@vitejs/plugin-react`)       |
| **Language**      | TypeScript                                  |
| **Styling**       | Tailwind CSS (+ Tailwind-merge)             |
| **UI Components** | shadcn/ui, Radix UI (`@radix-ui/react-*`)   |
| **State**         | Zustand                                     |
| **Networking**    | Axios (REST), SockJS + STOMP.js (WebSocket) |
| **Emoji Picker**  | Emoji-Mart                                  |
| **Media**         | React-Player                                |
| **Notifications** | Sonner                                      |
| **Theming**       | next-themes                                 |

---

## 🗂️ Project Structure

```
TalkSync_ui/
├── public/             # Static assets & index.html
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── stores/         # Zustand state slices
│   ├── utils/          # Helpers & API clients (REST/WebSocket)
│   ├── pages/          # Login, ChatList, ChatWindow, Settings
│   ├── themes/         # Light/dark theme config
│   └── App.tsx         # Root component & router
├── tailwind.config.ts  # Tailwind CSS config
├── vite.config.ts      # Vite config
└── package.json        # Project metadata & scripts
```

---

## 🔙 Backend Overview

This frontend connects to the **TalkSync** backend built with Spring Boot (Java 21) and PostgreSQL. It exposes RESTful endpoints for authentication and user/chat management, and uses WebSocket/STOMP for real-time messaging and presence updates.

---

## 🔗 Links

- **Frontend Repository**: [https://github.com/GopiSVDev/TalkSync_ui](https://github.com/GopiSVDev/TalkSync_ui)
- **Backend Repository**: [https://github.com/GopiSVDev/TalkSync](https://github.com/GopiSVDev/TalkSync)
- **Live Demo**:
