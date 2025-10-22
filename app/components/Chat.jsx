"use client";
import { Box, Paper, Typography } from "@mui/material";
import { useChatStore } from "../store/Store";
import Message from "./Message";
import InputBox from "./InputBox";

export default function Chat() {
  const { messages, addMessage } = useChatStore();

  const sendMessage = async (text) => {
    addMessage({ sender: "user", text });

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("error");

      const data = await res.json();
      addMessage({ sender: "AI", text: data.reply });
    } catch {
      addMessage({ sender: "AI", text: "Error: API not found" });
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: { xs: "85vh", md: "80vh" },
        width: { xs: "95%", sm: "90%", md: "60%", lg: "40%" },
        mx: "auto",
        mt: 4,
        p: 2,
        borderRadius: 4,
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Chat here
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1, px: 1 }}>
        {messages.map((m, i) => (
          <Message key={i} sender={m.sender} text={m.text} />
        ))}
      </Box>

      <InputBox onSend={sendMessage} />
    </Paper>
  );
}
