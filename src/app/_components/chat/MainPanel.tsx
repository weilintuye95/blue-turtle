"use client";

import React from "react";

import QueryTextBox from "./QueryTestBox";
import ReplyTextBox from "./ReplyTextBox";
import MessageInput from "./MessageInput";
import { useUser } from "~/app/context/UserContext";

const MainPanel = () => {
  const { user } = useUser();
  return (
    <main className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Blue Turtle Chat Assistant</h1>
        <p className="font-semibold">Username: {user?.username}</p>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-4">
        <div className="flex flex-1 flex-col space-y-4 p-4">
          <div className="flex flex-col items-start space-y-2">
            <QueryTextBox text="Hello" />
            <ReplyTextBox text="Hi, how are you?" />

            <QueryTextBox text="What's the weather today?" />
            <ReplyTextBox
              text="The weather today is sunny with a chance of meatballs, so
                prepare a big umbrella"
            />
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
