import { useState } from "react";
import { Box } from "@mui/material";
import SideBar from "../../components/SideBar";
import ConversationForm from "../../components/ConversationPage";
import { getUserChat } from "../../services/chatService";

interface Chat {
  _id: string;
  name: string;
  message: string;
  avatar: string;
}

export default function ChatWindow() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleChatSelect = async (chat: Chat) => {
    console.log("chatId", chat._id);
    const userChat = await getUserChat(chat._id);
    console.log("userChat:", userChat);
    setSelectedChat(chat);
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <SideBar onChatSelect={handleChatSelect} />
      <ConversationForm selectedChat={selectedChat} />
    </Box>
  );
}
