"use client";

import React from "react";
import { useUser } from "~/app/context/UserContext";
import { Button } from "~/components/ui/button";
import { trpc } from "~/utils/trpc";

const Sidebar: React.FC = () => {
  const { user } = useUser();

  const useGetAllChats = user
    ? trpc.chat.getAllChats.useQuery({ userId: user.id })
    : null;

  const allUserChats = useGetAllChats?.data;
  return (
    <aside className="flex w-64 flex-col justify-between bg-gray-100 p-4">
      <div>
        <div className="mb-4 flex items-center justify-between"></div>
        <nav className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Recent Chats</h2>
            {!allUserChats ? null : (
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
