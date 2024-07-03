import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { axios } from "../../config/axios";
import React from "react";

export default function ConversationForm({ selectedChat }: any) {
  const [message, setMessage] = React.useState<string[]>([""]);
  const [chat, setChat] = React.useState("");

  if (!selectedChat) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Select a chat to start messaging</Typography>
      </Box>
    );
  }

  const handleSend = async () => {
    try {
      await axios.post("/message", {
        username: selectedChat.name,
        message: message,
      });
      console.log("Message sent:", message);
      setMessage([...message, chat]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              alt={selectedChat.name}
              src={selectedChat.name}
              sx={{ mr: 2 }}
            />
            <Typography variant="h6">{selectedChat.name}</Typography>
          </Box>
          <Typography variant="body1">{selectedChat.message}</Typography>
        </Box>
      </Box>
      {message.map((msg) => (
        <Box key={msg} sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Typography
            variant="h2"
            sx={{
              backgroundColor: "grey",
            }}
          >
            {msg}
          </Typography>
        </Box>
      ))}
      <TextField
        sx={{ width: "1000px", ml: 10, mb: 5 }}
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span style={{ paddingRight: 8 }}>|</span>
              <IconButton onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
