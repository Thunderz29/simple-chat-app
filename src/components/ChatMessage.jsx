import { Box, Card, CardContent, Typography } from "@mui/material";

export default function ChatMessage({ username, message, isOwnMessage, timestamp }) {
    const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return (
        <Box display="flex" justifyContent={isOwnMessage ? "flex-end" : "flex-start"} m={2}>
            <Card sx={{ backgroundColor: isOwnMessage ? 'blue' : 'black' }}>
                <CardContent>
                    {!isOwnMessage && (
                        <Typography variant="body2" color="primary">
                            {username}
                        </Typography>
                    )}
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end">
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
