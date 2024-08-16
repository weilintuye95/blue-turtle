"use client";

import React, { useEffect, useState } from "react";
import { useUserContext } from "~/app/context/UserContext";
import { useChatContext } from "~/app/context/ChatContext";
import { Button } from "~/components/ui/button";
import { trpc } from "~/utils/trpc";
import NewChatButton from "./NewChatButton";

const Sidebar: React.FC = () => {
  const { user } = useUserContext();
  const { chat, saveChat } = useChatContext();
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  // Fetch all chats for the user and provide a refetch function
  const { data: allUserChats, refetch: refetchUserChats } =
    trpc.chat.getAllChats.useQuery(
      { userId: user?.id ?? "" },
      { enabled: !!user },
    );

  // Define create mutation hook that can be used to create a new chat
  const useNewChatCreator = trpc.chat.createChat.useMutation({
    onSuccess: async (newChat) => {
      if (newChat) {
        saveChat(newChat);
        await refetchUserChats();
      }
    },
    onError: (error) => {
      console.error("Failed to create a new chat:", error);
    },
  });

  // Logic to handle the creation of a new chat or selecting the latest chat
  useEffect(() => {
    const handleChatLogic = async () => {
      if (user && !isCreatingChat && allUserChats?.length === 0) {
        setIsCreatingChat(true);
        try {
          await useNewChatCreator.mutateAsync({ userId: user.id });
        } catch (error) {
          console.error("Failed to handle chat logic:", error);
        } finally {
          setIsCreatingChat(false);
        }
      } else if (user && allUserChats && allUserChats.length > 0 && !chat) {
        if (allUserChats[0]) {
          saveChat(allUserChats[0]);
        }
      }
    };

    void handleChatLogic();
  }, [allUserChats, user, isCreatingChat, useNewChatCreator, saveChat, chat]);

  return (
    <aside className="flex w-64 flex-col justify-between bg-gray-100 p-4">
      <div>
        <NewChatButton refetchUserChats={refetchUserChats} />
        <div className="mb-4 flex items-center justify-between"></div>
        <nav className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Recent Chats</h2>
            {allUserChats && (
              <ul className="space-y-1">
                {allUserChats.map((chat) => (
                  <li key={chat.id}>
                    <Button
                      onClick={() => saveChat(chat)}
                      className="w-full bg-gray-100 text-black hover:bg-gray-200 focus:bg-gray-300"
                    >
                      {chat.createdAt.toUTCString().slice(0, -4)}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
