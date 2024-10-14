import { Box, Card, CardContent, Typography } from "@mui/material";
import { useMemo } from "react";

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
};

export default function ChatMessage({
  username,
  message,
  isOwnMessage,
  timestamp,
}) {
  const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const usernameColor = useMemo(() => stringToColor(username), [username]);

  return (
    <Box
      display="flex"
      justifyContent={isOwnMessage ? "flex-end" : "flex-start"}
      m={2}
    >
      <Card sx={{ backgroundColor: isOwnMessage ? "blue" : "black" }}>
        <CardContent>
          {!isOwnMessage && (
            <Typography variant="body2" sx={{ color: usernameColor }}>
              {username}
            </Typography>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Typography variant="body1" color="white">
              {message}
            </Typography>
            <Typography variant="caption" color="gray" sx={{ paddingLeft: 2 }}>
              {formattedTime}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
