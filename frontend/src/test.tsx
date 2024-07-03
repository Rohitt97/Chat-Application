import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { axios } from "./config/axios";

interface Message {
  username: string;
  message: string;
}

const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const pusher = new Pusher("6ae19aaa21ca949c00b1", {
      cluster: "ap2",
      //   encrypted: true,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    if (username && message) {
      await axios.post("/message", {
        username,
        message,
      });
      setMessage("");
    }
  };

  return (
    <Container>
      <h1>Chat Application</h1>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${msg.username}: ${msg.message}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Chat;
