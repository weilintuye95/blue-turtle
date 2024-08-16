"use client";
import { createContext, type ReactNode, useContext, useState } from "react";
import { type Chat } from "~/server/api/routers/chat";

interface ChatContextType {
  chat: Chat | null;
  saveChat: (chat: Chat) => void;
}

interface ChatProviderProps {
  children: ReactNode;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chat, setChat] = useState<Chat | null>(null);

  const saveChat = (chatData: Chat) => {
    setChat(chatData);
  };

  return (
    <ChatContext.Provider value={{ chat, saveChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
