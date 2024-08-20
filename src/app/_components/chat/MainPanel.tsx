"use client";

import React, { useEffect, useState } from "react";

import QueryTextBox from "./QueryTextBox";
import ReplyTextBox from "./ReplyTextBox";
import MessageInput from "./MessageInput";
import { useUserContext } from "~/app/context/UserContext";
import { useChatContext } from "~/app/context/ChatContext";
import { api } from "~/trpc/react";

const MainPanel = () => {
  const { user } = useUserContext();
  const { chat } = useChatContext();
  const [newMessage, setNewMessage] = useState<string | undefined>(undefined);

  const { data: allMessages, isLoading } = api.message.getAllMessages.useQuery(
    { chatId: chat?.id ?? "" },
    {
      enabled: !!chat?.id,
    },
  );

  api.message.onMessage.useSubscription(undefined, {
    onData: (message: { body: string }) => {
      // setNewMessage(message.body);
      console.log("Weirdllama", message.body);
    },
  });

  // api.message.randomNumber.useSubscription(undefined, {
  //   onData: (data) => {
  //     console.log("received", data);
  //   },
  //   onError: (err) => {
  //     console.error("error", err);
  //   },
  // });

  // console.log(subscription);

  // useEffect(() => {
  //   console.log("newMessage", newMessage);
  // }, [newMessage]);
  return (
    <main className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">Blue Turtle Chat Assistant</h1>
        <p className="font-semibold">Username: {user?.username}</p>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-4">
        <div className="flex flex-1 flex-col space-y-4 p-4">
          <div className="flex flex-col items-start space-y-2">
            {!isLoading &&
              allMessages?.map((message) =>
                message.sender === "user" ? (
                  <QueryTextBox key={message.id} text={message.body} />
                ) : (
                  <ReplyTextBox key={message.id} text={message.body} />
                ),
              )}
            {newMessage ? <QueryTextBox text={newMessage} /> : null}
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
