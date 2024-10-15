import ChatMessage from "@/components/ChatMessage";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function Home() {
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        console.log("Received message:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [socket]);

  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  const sendMessage = () => {
    if (message && socket) {
      console.log("Sending message:", { username, message });
      const timestamp = new Date().toISOString();
      socket.emit("message", { username, message, timestamp });
      setMessage("");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      height="100vh"
    >
      {!isUsernameSet ? (
        <Card sx={{ minWidth: 300 }}>
          <CardHeader
            title={
              <Typography variant="h6" fontWeight="bold">
                Enter Your Username
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <TextField
              type="text"
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </CardContent>
          <Box p={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSetUsername}
            >
              <Typography fontWeight="bold">Join Chat</Typography>
            </Button>
          </Box>
        </Card>
      ) : (
        <Card
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            avatar={<Avatar />}
            title={
              <Typography variant="h6" fontWeight="bold">
                Group Chat
              </Typography>
            }
          />
          <Divider />
          <CardContent sx={{ flex: 1, overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                username={msg.username}
                message={msg.message}
                timestamp={msg.timestamp}
                isOwnMessage={msg.username === username}
              />
            ))}
          </CardContent>
          <Box display="flex" p={2} sx={{ borderTop: "1px solid #e0e0e0" }}>
            <TextField
              type="text"
              fullWidth
              label="Message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              sx={{ marginLeft: 2, borderRadius: "50%" }}
            >
              Send
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
}
