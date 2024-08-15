"use client";

import React, { useEffect, useState } from "react";
import { SendIcon } from "~/app/_icons/icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { trpc } from "~/utils/trpc";
import NewChatButton from "./NewChatButton";
import { useUser } from "~/app/context/UserContext";

const MessageInput = () => {
  const useMessageSender = trpc.chat.sendMessage.useMutation();
  const useNewChatCreator = trpc.chat.newChat.useMutation();
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const { user } = useUser();
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  useEffect(() => {
    const createNewChat = async () => {
      try {
        setIsCreatingChat(true);
        if (!chatId && user) {
          const newChat = await useNewChatCreator.mutateAsync({
            userId: user.id,
          });
          if (newChat) {
            setChatId(newChat.id);
          }
        }
      } catch (error) {
        console.error("Failed to create a new chat:", error);
      } finally {
        setIsCreatingChat(false);
      }
    };

    if (!chatId && user && !isCreatingChat) {
      void createNewChat();
    }
  }, [chatId, user, useNewChatCreator, isCreatingChat]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user && chatId) {
      await useMessageSender.mutateAsync({
        chatId: chatId,
        sender: "user",
        body: message,
        userId: user.id,
      });
      console.log(message);
    } else {
      // this would be handled more gracefully for prod (e.g. maybe a note saying something went wrong)
      throw Error("No user or chat id associated with the message");
    }
    setMessage("");
    const form = document.getElementById("messageForm") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    console.log(message);
  };

  return (
    <div className="flex w-full items-center">
      <NewChatButton setChatId={setChatId} />
      <form
        id="messageForm"
        onSubmit={handleSubmit}
        className="flex w-full items-center"
      >
        <Input
          type="text"
          name="message"
          placeholder="What can I help you with today?"
          className="mx-4 flex-1 focus-visible:ring-transparent"
          value={message}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="ghost"
          className="px-0 hover:bg-white"
          disabled={message.length < 1}
        >
          <SendIcon
            className={`h-6 w-6 ${message.length < 1 ? "text-gray-400" : "text-black"} hover:text-slate-500`}
          />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
