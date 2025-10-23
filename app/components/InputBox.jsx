"use client";
import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function InputBox({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f1f3f4",
        borderRadius: "24px",
        border: "1px solid #e0e0e0",
        px: 2,
        py: 0.5,
      }}
    >
      <TextField
        fullWidth
        placeholder="Send a message..."
        variant="standard"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        InputProps={{
          disableUnderline: true,
          style: { fontSize: "0.95rem", color: "#202124" },
        }}
        sx={{ mr: 1 }}
      />

      <IconButton
        onClick={handleSend}
        sx={{
          color: "#0078ff",
          "&:hover": { backgroundColor: "rgba(0,120,255,0.1)" },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}
