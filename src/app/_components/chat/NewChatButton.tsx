import React from "react";
import { FilePenIcon } from "~/app/_icons/icons";
import { Button } from "~/components/ui/button";
import type { User } from "~/server/api/routers/user";
import { trpc } from "~/utils/trpc";

const NewChatButton = (user: User) => {
  const useNewChatCreator = trpc.chat.newChat.useMutation();
  const handleClick = async () => {
    try {
      await useNewChatCreator.mutateAsync({
        userId: user.id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="p-0 hover:bg-white hover:text-slate-500"
    >
      <FilePenIcon className="h-6 w-6" />
    </Button>
  );
};

export default NewChatButton;
