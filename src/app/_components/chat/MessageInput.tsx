"use client";

import React, { useState } from "react";
import { SendIcon } from "~/app/_icons/icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { User } from "~/server/api/routers/user";
import { trpc } from "~/utils/trpc";
import NewChatButton from "./NewChatButton";

const MessageInput = (user: User) => {
  const [message, setMessage] = useState("");
  const useMessageSender = trpc.chat.sendMessage.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await useMessageSender.mutateAsync({
      chatId: "1",
      sender: "user",
      body: message,
      userId: user.id,
    });
    setMessage(""); // Clear the input field
    event.currentTarget.reset();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className="flex w-full items-center">
      <NewChatButton user={user} />
      <form onSubmit={handleSubmit} className="flex w-full items-center">
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
          disabled={message.length < 1} // Disable if message length is less than 1
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
