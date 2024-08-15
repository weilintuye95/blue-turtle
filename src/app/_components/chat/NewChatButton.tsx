import React from "react";
import { FilePenIcon } from "~/app/_icons/icons";
import { useUser } from "~/app/context/UserContext";
import { Button } from "~/components/ui/button";
import { trpc } from "~/utils/trpc";

const NewChatButton = ({
  setChatId,
}: {
  setChatId: (id: string) => Promise<void>;
}) => {
  const { user } = useUser();
  const useNewChatCreator = trpc.chat.newChat.useMutation();
  const handleClick = async () => {
    if (user) {
      try {
        const newChat = await useNewChatCreator.mutateAsync({
          userId: user.id,
        });
        if (newChat) {
          await setChatId(newChat.id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="bg-gray-100 p-2 text-black hover:bg-gray-200"
      disabled={!user}
    >
      <FilePenIcon
        className={`${user ? "text-black" : "text-gray-400"} h-6 w-6`}
      />
    </Button>
  );
};

export default NewChatButton;
