import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import getAllChats from "../../services/chatService";

export default function SideBar({ onChatSelect }: any) {
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const data = await getAllChats();
      setChats(data.data);
    })();
  }, []);
  return (
    <Box sx={{ width: 300, borderRight: "1px solid #e0e0e0" }}>
      <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="h1">Chats</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Chats"
            inputProps={{ "aria-label": "search chats" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {chats.map((chat: any) => (
          <Box key={chat._id}>
            <ListItem
              alignItems="flex-start"
              button
              onClick={() => onChatSelect(chat)}
            >
              <ListItemAvatar>
                <Avatar alt={chat.name} src={chat.name} />
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {chat.message}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </Box>
  );
}
