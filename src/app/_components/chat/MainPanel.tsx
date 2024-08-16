"use client";

import React from "react";

import QueryTextBox from "./QueryTestBox";
import ReplyTextBox from "./ReplyTextBox";
import MessageInput from "./MessageInput";
import { useUserContext } from "~/app/context/UserContext";
import { useChatContext } from "~/app/context/ChatContext";
import { trpc } from "~/utils/trpc";
const MainPanel = () => {
  const { user } = useUserContext();
  const { chat } = useChatContext();

  const { data: allMessages } = trpc.message.getAllMessages.useQuery({
    chatId: chat?.id ?? "",
  });
  return (
    <main className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Blue Turtle Chat Assistant</h1>
        <p className="font-semibold">Username: {user?.username}</p>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-4">
        <div className="flex flex-1 flex-col space-y-4 p-4">
          <div className="flex flex-col items-start space-y-2">
            {allMessages?.map((message) =>
              message.sender === "user" ? (
                <QueryTextBox key={message.id} text={message.body} />
              ) : (
                <ReplyTextBox key={message.id} text={message.body} />
              ),
            )}
          </div>
        </div>
      </div>
      <footer className="flex items-center border-t p-4">
        <MessageInput />
      </footer>
    </main>
  );
};

export default MainPanel;
