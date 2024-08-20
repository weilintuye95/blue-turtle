import React from "react";
import { FilePenIcon } from "~/app/_icons/icons";
import { useChatContext } from "~/app/context/ChatContext";
import { useUserContext } from "~/app/context/UserContext";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
const NewChatButton: React.FC<{ refetchUserChats: () => void }> = ({
  refetchUserChats,
}) => {
  const { saveChat } = useChatContext();

  const { user } = useUserContext();
  const useNewChatCreator = api.chat.createChat.useMutation();
  const handleClick = async () => {
    if (user) {
      try {
        const newChat = await useNewChatCreator.mutateAsync({
          userId: user.id,
        });
        if (newChat) {
          saveChat(newChat);
          refetchUserChats();
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
