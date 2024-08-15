"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "~/app/context/UserContext";
import { Button } from "~/components/ui/button";
import { trpc } from "~/utils/trpc";
import NewChatButton from "./NewChatButton";

const Sidebar: React.FC = () => {
  const { user } = useUser();
  const [chatId, setChatId] = useState<string | null>(null);
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  // This component is gnarly, so providing some comments for understanding
  // Fetch all chats for the user and provide a refetch function
  const { data: allUserChats, refetch: refetchUserChats } =
    trpc.chat.getAllChats.useQuery(
      { userId: user?.id ?? "" },
      { enabled: !!user },
    );

  // define create mutation hook that can be used to create a new chat
  const useNewChatCreator = trpc.chat.newChat.useMutation({
    onSuccess: async (newChat) => {
      if (newChat) {
        setChatId(newChat.id);
        await refetchUserChats();
      }
    },
    onError: (error) => {
      console.error("Failed to create a new chat:", error);
    },
  });

  // Create a new chat on component mount if chatId is not set (so
  // users can start chatting immediately)
  useEffect(() => {
    const createNewChat = async () => {
      if (!chatId && user && !isCreatingChat) {
        setIsCreatingChat(true);
        try {
          await useNewChatCreator.mutateAsync({ userId: user.id });
        } catch (error) {
          console.error("Failed to create a new chat:", error);
        } finally {
          setIsCreatingChat(false);
        }
      }
    };

    void createNewChat();
  }, [chatId, user, isCreatingChat, useNewChatCreator]);

  return (
    <aside className="flex w-64 flex-col justify-between bg-gray-100 p-4">
      <div>
        <NewChatButton
          setChatId={async (newChatId: string) => {
            setChatId(newChatId);
            await refetchUserChats(); // Pass in functional parameter. When button is clicked, refetch all chats so we can update sidebar
          }}
        />
        <div className="mb-4 flex items-center justify-between"></div>
        <nav className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Recent Chats</h2>
            {allUserChats && (
              <ul className="space-y-1">
                {allUserChats.map((chat) => (
                  <li key={chat.id}>
                    <Button className="w-full bg-gray-100 text-black hover:bg-gray-200 focus:bg-gray-300">
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
